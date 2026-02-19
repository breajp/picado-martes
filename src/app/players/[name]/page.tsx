'use client';

import { use, useMemo, useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import { getLeaderboard, getPlayerHistory, getPlayerSynergy, getHeadToHead } from '@/lib/stats';
import { getPlayerMetadata } from '@/data/playerMetadata';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, Activity, Target, Zap, Shield, Camera, Loader2, Utensils, Plus, Heart, Users, Skull, Trash2 } from 'lucide-react';
import Link from 'next/link';
import PerformanceChart from '@/components/PerformanceChart';
import { supabase } from '@/lib/supabase';

export default function PlayerProfile({ params }: { params: Promise<{ name: string }> }) {
    const { name } = use(params);
    const [year, setYear] = useState<number>(2025);
    const [displayPhoto, setDisplayPhoto] = useState<string>("");
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [highlights, setHighlights] = useState<any[]>([]);
    const [videoUploading, setVideoUploading] = useState(false);
    const [showUploadForm, setShowUploadForm] = useState(false);
    const videoInputRef = useRef<HTMLInputElement>(null);
    const [compareWith, setCompareWith] = useState<string>("");

    // Form settings for new video
    const [selectedCategory, setSelectedCategory] = useState('Magia');
    const [taggedPlayers, setTaggedPlayers] = useState<string[]>([name]);
    const [matchDate, setMatchDate] = useState(new Date().toISOString().split('T')[0]);

    const leaderboard = getLeaderboard(year);
    const playerStats = leaderboard.find(p => p.name === name);
    const metadata = getPlayerMetadata(name);
    const history = useMemo(() => getPlayerHistory(name, year), [name, year]);
    const synergy = useMemo(() => getPlayerSynergy(name, year), [name, year]);
    const h2h = useMemo(() => compareWith ? getHeadToHead(name, compareWith, year) : null, [name, compareWith, year]);

    useEffect(() => {
        async function fetchData() {
            if (!supabase) {
                setDisplayPhoto(metadata.photo);
                return;
            }

            // Photo
            const { data: photoData } = await supabase
                .from('player_profiles')
                .select('photo_url')
                .eq('name', name)
                .single();

            if (photoData?.photo_url) setDisplayPhoto(photoData.photo_url);
            else setDisplayPhoto(metadata.photo);

            // Highlights with Join
            const { data: videoData } = await supabase
                .from('highlight_players')
                .select(`
                    highlight_id,
                    player_highlights (
                        id,
                        video_url,
                        caption,
                        category,
                        match_date,
                        created_at
                    )
                `)
                .eq('player_name', name);

            if (videoData) {
                const formatted = videoData
                    .map((item: any) => item.player_highlights)
                    .filter(Boolean)
                    .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
                setHighlights(formatted);
            }
        }
        fetchData();
    }, [name, metadata.photo]);

    const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !supabase) return;

        try {
            setVideoUploading(true);
            const fileExt = file.name.split('.').pop();
            const fileName = `highlight-${Date.now()}.${fileExt}`;
            const filePath = `highlights/${fileName}`;

            // 1. Storage Upload
            const { error: uploadError } = await supabase.storage
                .from('player-highlights')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('player-highlights')
                .getPublicUrl(filePath);

            // 2. Insert Highlight Record
            const { data: highlight, error: hError } = await supabase
                .from('player_highlights')
                .insert({
                    video_url: publicUrl,
                    caption: `${selectedCategory} de ${taggedPlayers.join(', ')}`,
                    category: selectedCategory,
                    match_date: matchDate
                })
                .select()
                .single();

            if (hError) throw hError;

            // 3. Insert Players Links
            const playerLinks = taggedPlayers.map(p => ({
                highlight_id: highlight.id,
                player_name: p
            }));

            const { error: pError } = await supabase
                .from('highlight_players')
                .insert(playerLinks);

            if (pError) throw pError;

            setHighlights([{ ...highlight, likes: 0 }, ...highlights]);
            setShowUploadForm(false);
            alert('¡Video subido y etiquetado con éxito!');
        } catch (error: any) {
            console.error('Error:', error);
            const msg = error.message || 'Error desconocido';
            alert(`Error al subir: ${msg}. Revisá que el bucket 'player-highlights' sea público y tenga las políticas de INSERT configuradas.`);
        } finally {
            setVideoUploading(false);
        }
    };

    const handleLike = async (highlightId: string) => {
        if (!supabase) return;
        try {
            // Llamamos a la función RPC que creamos en el SQL
            const { error } = await supabase.rpc('increment_likes', { highlight_row_id: highlightId });
            if (error) throw error;

            // Actualizamos el estado local para feedback instantáneo
            setHighlights(prev => prev.map(h =>
                h.id === highlightId ? { ...h, likes: (h.likes || 0) + 1 } : h
            ));
        } catch (err) {
            console.error('Error liking:', err);
        }
    };

    const handleDeleteHighlight = async (highlight: any) => {
        if (!supabase || !confirm('¿Estás seguro de que querés borrar esta jugada?')) return;

        try {
            // 1. Delete from database (Cascade will handle highlight_players if set up, or we do it manually)
            // Manual delete of links first to avoid foreign key issues
            await supabase.from('highlight_players').delete().eq('highlight_id', highlight.id);
            const { error: dbError } = await supabase.from('player_highlights').delete().eq('id', highlight.id);
            if (dbError) throw dbError;

            // 2. Delete from storage
            const url = highlight.video_url;
            const path = url.split('/public/player-highlights/')[1];
            if (path) {
                const { error: storageError } = await supabase.storage
                    .from('player-highlights')
                    .remove([path]);
                if (storageError) console.error('Error deleting file:', storageError);
            }

            // 3. Update local state
            setHighlights(prev => prev.filter(h => h.id !== highlight.id));
            alert('Jugada eliminada con éxito');
        } catch (err: any) {
            console.error('Error deleting:', err);
            alert(`Error al borrar: ${err.message}`);
        }
    };

    const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !supabase) return;

        try {
            setUploading(true);
            const fileExt = file.name.split('.').pop();
            const fileName = `${name}-${Math.random()}.${fileExt}`;
            const filePath = `avatars/${fileName}`;
            await supabase.storage.from('player-photos').upload(filePath, file);
            const { data: { publicUrl } } = supabase.storage.from('player-photos').getPublicUrl(filePath);
            await supabase.from('player_profiles').upsert({ name, photo_url: publicUrl }, { onConflict: 'name' });
            setDisplayPhoto(publicUrl);
        } catch (error) {
            console.error('Error uploading photo:', error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <main className="min-h-screen relative pb-40">
            <Navbar />

            <div className="pwa-mesh">
                <div className="mesh-orb-1 opacity-20" />
                <div className="mesh-orb-2 opacity-20" />
            </div>

            <section className="relative h-[65vh] flex items-end p-6 sm:p-12 overflow-hidden group">
                <div className="absolute inset-0 z-0">
                    <img src={displayPhoto} alt={name} className="w-full h-full object-cover grayscale opacity-50 transition-all duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-transparent" />
                </div>

                <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-sm">
                    <input type="file" ref={fileInputRef} onChange={handlePhotoUpload} className="hidden" accept="image/*" />
                    <button type="button" onClick={() => fileInputRef.current?.click()} className="bg-white/10 hover:bg-white/20 border border-white/20 px-8 py-4 rounded-2xl flex items-center gap-3 text-xs font-black uppercase tracking-widest transition-all">
                        {uploading ? <Loader2 size={18} className="animate-spin" /> : <Camera size={18} />}
                        Cambiar Foto
                    </button>
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-start px-4">
                    <Link href="/players" className="mb-12 pwa-pill flex items-center gap-2 hover:bg-white/10 transition-all text-[10px]">
                        <ArrowLeft size={14} /> Volver al Plantel
                    </Link>
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full">
                        <div className="flex justify-between items-end w-full">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="pwa-pill text-accent-orange border-accent-orange/30">RANGO ÉLITE</span>
                                    <span className="text-white/40 text-[9px] font-black uppercase tracking-widest italic">Activo {year}</span>
                                </div>
                                <h1 className="pwa-title text-7xl sm:text-[10vw] leading-none mb-4">{name}</h1>
                                <p className="text-xs font-black text-white/30 uppercase tracking-[0.4em] italic leading-relaxed">
                                    ESTILO: <span className="text-white">{metadata.role}</span>
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="px-6 sm:px-12 max-w-7xl mx-auto mt-12 space-y-16">
                <div className="flex justify-center">
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-1 flex gap-1">
                        {[2024, 2025, 2026].map(y => (
                            <button key={y} onClick={() => setYear(y)} className={`px-6 py-3 rounded-xl text-[10px] font-black tracking-widest transition-all ${year === y ? 'bg-accent-orange text-black' : 'text-white/40 hover:text-white/70'}`}>
                                {y}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="pwa-card p-6 flex flex-col justify-between h-[160px]">
                        <Target size={20} className="text-accent-orange" />
                        <div>
                            <p className="pwa-subtitle">Rango Global</p>
                            <h4 className="text-4xl font-black italic">#{leaderboard.findIndex(p => p.name === name) !== -1 ? leaderboard.findIndex(p => p.name === name) + 1 : '--'}</h4>
                        </div>
                    </div>
                    <div className="pwa-card p-6 flex flex-col justify-between h-[160px]">
                        <Zap size={20} className="text-accent-lemon" />
                        <div>
                            <p className="pwa-subtitle">Eficacia {year}</p>
                            <h4 className="text-4xl font-black italic text-accent-lemon">{playerStats ? playerStats.winRate.toFixed(0) : '0'}%</h4>
                        </div>
                    </div>
                    <div className="pwa-card p-6 flex flex-col justify-between h-[160px]">
                        <Activity size={20} className="text-accent-blue" />
                        <div>
                            <p className="pwa-subtitle">Puntos</p>
                            <h4 className="text-4xl font-black italic">{playerStats ? playerStats.points : '0'}</h4>
                        </div>
                    </div>
                    <div className="pwa-card p-6 flex flex-col justify-between h-[160px]">
                        <Utensils size={20} className="text-accent-lemon" />
                        <div>
                            <p className="pwa-subtitle">Morfi Rate</p>
                            <h4 className="text-4xl font-black italic text-accent-lemon">{playerStats ? playerStats.morfiRate.toFixed(0) : '0'}%</h4>
                        </div>
                    </div>
                </div>

                {/* VERSUS / H2H TOOL */}
                <div className="pwa-card p-10 bg-white/[0.01] border-white/5 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent-lemon/5 blur-[80px] -z-10" />
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
                        <div>
                            <h3 className="text-2xl font-black italic uppercase tracking-tighter">Cara a Cara</h3>
                            <p className="pwa-subtitle">Compará tu rendimiento contra otros</p>
                        </div>
                        <select
                            onChange={(e) => setCompareWith(e.target.value)}
                            className="pwa-input !w-full md:!w-64 !bg-white/5 !border-white/10 text-xs font-black uppercase tracking-widest"
                        >
                            <option value="">Seleccionar Rival...</option>
                            {PLAYERS.filter(p => p !== name).map(p => (
                                <option key={p} value={p}>{p}</option>
                            ))}
                        </select>
                    </div>

                    {compareWith && h2h ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-8">
                                <div className="flex justify-between items-end">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Jugando Juntos</p>
                                    <p className="text-xs font-black text-accent-lemon">{h2h.togetherWins}W - {h2h.togetherLosses}L</p>
                                </div>
                                <div className="h-4 bg-white/5 rounded-full overflow-hidden flex">
                                    <div className="h-full bg-accent-lemon" style={{ width: `${(h2h.togetherWins / (h2h.matchesTogether || 1)) * 100}%` }} />
                                </div>
                                <p className="text-[9px] font-bold text-white/40 italic text-center uppercase tracking-widest">
                                    Efectividad como dupla: {h2h.matchesTogether > 0 ? ((h2h.togetherWins / h2h.matchesTogether) * 100).toFixed(0) : 0}%
                                </p>
                            </div>

                            <div className="space-y-8">
                                <div className="flex justify-between items-end">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Enfrentados</p>
                                    <div className="flex gap-4 text-xs font-black">
                                        <span className="text-accent-orange">{name}: {h2h.p1WinsAgainst}</span>
                                        <span className="text-white/20">vs</span>
                                        <span className="text-white">{compareWith}: {h2h.p2WinsAgainst}</span>
                                    </div>
                                </div>
                                <div className="h-4 bg-white/5 rounded-full overflow-hidden flex">
                                    <div className="h-full bg-accent-orange" style={{ width: `${(h2h.p1WinsAgainst / (h2h.matchesAgainst || 1)) * 100}%` }} />
                                    <div className="h-full bg-white/20" style={{ width: `${(h2h.p2WinsAgainst / (h2h.matchesAgainst || 1)) * 100}%` }} />
                                </div>
                                <p className="text-[9px] font-bold text-white/40 italic text-center uppercase tracking-widest">
                                    Dominio personal: {h2h.p1WinsAgainst > h2h.p2WinsAgainst ? name : h2h.p2WinsAgainst > h2h.p1WinsAgainst ? compareWith : 'Empate'}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="h-32 flex items-center justify-center border-2 border-dashed border-white/5 rounded-[32px]">
                            <p className="text-[10px] font-black text-white/10 uppercase tracking-[0.3em]">Elegí un jugador para empezar el duelo</p>
                        </div>
                    )}
                </div>

                {/* SYNERGY SECTION */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="pwa-card p-10 bg-gradient-to-br from-accent-orange/10 to-transparent border-accent-orange/20">
                        <div className="flex items-center gap-4 mb-8">
                            <Users className="text-accent-orange" size={24} />
                            <h3 className="text-xl font-black italic uppercase tracking-widest">Socios Ideales</h3>
                        </div>
                        <div className="space-y-6">
                            {synergy.bestPartners.length > 0 ? synergy.bestPartners.map((p, i) => (
                                <Link href={`/players/${p.name}`} key={p.name} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all border border-white/5 group">
                                    <div className="flex items-center gap-4">
                                        <span className="text-xs font-black text-white/20 italic">0{i + 1}</span>
                                        <span className="text-sm font-bold uppercase italic">{p.name}</span>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-accent-orange">{p.winRate.toFixed(0)}% WIN RATE</p>
                                        <p className="text-[8px] font-black text-white/20 uppercase tracking-widest">{p.games} Jugados</p>
                                    </div>
                                </Link>
                            )) : <p className="text-[10px] font-black text-white/20 uppercase tracking-widest italic py-4">Faltan datos para calcular química</p>}
                        </div>
                    </div>

                    <div className="pwa-card p-10 bg-gradient-to-br from-white/[0.02] to-transparent border-white/5">
                        <div className="flex items-center gap-4 mb-8">
                            <Skull className="text-white/40" size={24} />
                            <h3 className="text-xl font-black italic uppercase tracking-widest">Criptonita</h3>
                        </div>
                        <div className="space-y-6">
                            {synergy.worstRivals.length > 0 ? synergy.worstRivals.map((p, i) => (
                                <Link href={`/players/${p.name}`} key={p.name} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all border border-white/5">
                                    <div className="flex items-center gap-4">
                                        <span className="text-xs font-black text-white/20 italic">0{i + 1}</span>
                                        <span className="text-sm font-bold uppercase italic">{p.name}</span>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-white/60">{p.lossRate.toFixed(0)}% DERROTAS</p>
                                        <p className="text-[8px] font-black text-white/20 uppercase tracking-widest">{p.games} Enfrentamientos</p>
                                    </div>
                                </Link>
                            )) : <p className="text-[10px] font-black text-white/20 uppercase tracking-widest italic py-4">Sin rivales dominantes aún</p>}
                        </div>
                    </div>
                </div>

                {/* TAGGED HIGHLIGHTS SECTION */}
                <div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
                        <div>
                            <h3 className="text-3xl font-black italic uppercase tracking-tighter">Archivo de Jugadas</h3>
                            <p className="pwa-subtitle">Donde {name} fue protagonista</p>
                        </div>
                        <button
                            onClick={() => setShowUploadForm(!showUploadForm)}
                            className="pwa-btn bg-accent-lemon !py-4 !px-8 text-[11px] font-black italic flex items-center gap-3"
                        >
                            {showUploadForm ? 'CANCELAR' : 'SUBIR JUGADA'}
                        </button>
                    </div>

                    {showUploadForm && (
                        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="pwa-card p-8 mb-16 bg-white/[0.04]">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase text-white/30 tracking-widest">Categoría</label>
                                    <div className="flex flex-wrap gap-2">
                                        {['Puskas', 'Blooper', 'Magia', 'Asistencia'].map(cat => (
                                            <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${selectedCategory === cat ? 'bg-accent-orange text-black' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}>
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase text-white/30 tracking-widest">Fecha del Partido</label>
                                    <input type="date" value={matchDate} onChange={(e) => setMatchDate(e.target.value)} className="pwa-input !py-2" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase text-white/30 tracking-widest italic flex justify-between">
                                        Involucrados <span className="text-accent-lemon">({taggedPlayers.length})</span>
                                    </label>
                                    <div className="max-h-[120px] overflow-y-auto p-2 bg-white/5 rounded-2xl custom-scrollbar grid grid-cols-2 gap-2">
                                        {PLAYERS.map(p => (
                                            <button
                                                key={p}
                                                onClick={() => taggedPlayers.includes(p) ? setTaggedPlayers(taggedPlayers.filter(tp => tp !== p)) : setTaggedPlayers([...taggedPlayers, p])}
                                                className={`text-left px-3 py-2 rounded-lg text-[9px] font-black uppercase transition-all ${taggedPlayers.includes(p) ? 'bg-white/10 text-white' : 'text-white/20'}`}
                                            >
                                                {taggedPlayers.includes(p) ? '✔ ' : '+ '} {p}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <input type="file" ref={videoInputRef} onChange={handleVideoUpload} className="hidden" accept="video/*" />
                            <button
                                onClick={() => videoInputRef.current?.click()}
                                disabled={videoUploading}
                                className="w-full pwa-btn bg-white text-black !py-5 font-black flex items-center justify-center gap-4"
                            >
                                {videoUploading ? <Loader2 className="animate-spin" /> : <Plus />}
                                {videoUploading ? 'SUBIENDO Y ETIQUETANDO...' : 'SELECCIONAR VIDEO Y PUBLICAR'}
                            </button>
                        </motion.div>
                    )}

                    {highlights.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                            {highlights.map((h, i) => (
                                <motion.div key={h.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} className="pwa-card !p-0 !rounded-[40px] group overflow-hidden border-white/5 hover:border-white/20 relative">
                                    <div className="aspect-[9/16] relative bg-black/40">
                                        <div className="absolute top-6 left-6 z-20 flex gap-2">
                                            <span className="pwa-pill !bg-black/60 backdrop-blur-md text-accent-lemon border-accent-lemon/40 text-[9px]">{h.category}</span>
                                            {h.match_date && <span className="pwa-pill !bg-black/60 backdrop-blur-md text-white/60 border-white/10 text-[9px]">{h.match_date.split('-').reverse().slice(0, 2).join('/')}</span>}
                                        </div>

                                        {/* ACTION BUTTONS OVERLAY */}
                                        <div className="absolute top-6 right-6 z-20 flex flex-col gap-3">
                                            <button
                                                onClick={() => handleDeleteHighlight(h)}
                                                className="p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:bg-red-500/80 hover:border-red-500 transition-all text-white/40 hover:text-white"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleLike(h.id)}
                                                className="p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:scale-110 active:scale-95 transition-all text-white flex flex-col items-center gap-1 min-w-[50px]"
                                            >
                                                <Heart size={20} className={h.likes > 0 ? "fill-red-500 text-red-500" : "text-white"} />
                                                <span className="text-[10px] font-black">{h.likes || 0}</span>
                                            </button>
                                        </div>

                                        <video src={h.video_url} className="w-full h-full object-cover" controls playsInline />
                                    </div>
                                    <div className="p-8 bg-white/[0.01]">
                                        <div className="flex flex-wrap gap-2">
                                            {h.caption?.split(' de ')[1]?.split(', ').map((p: string) => (
                                                <Link href={`/players/${p}`} key={p} className={`text-[9px] font-black px-2 py-1 rounded-md transition-colors ${p === name ? 'text-accent-orange bg-accent-orange/10' : 'text-white/40 hover:text-white/80'}`}>@{p}</Link>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="pwa-card p-24 flex flex-col items-center justify-center text-center opacity-30 italic">
                            <Activity size={48} className="mb-6 opacity-10" />
                            <p className="text-xs uppercase tracking-widest font-black italic">Sin jugadas destacadas registradas</p>
                        </div>
                    )}
                </div>

                <div className="pwa-card p-10 bg-white/[0.01]">
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <h3 className="text-2xl font-black italic uppercase tracking-tighter">Tendencia de Eficacia</h3>
                            <p className="pwa-subtitle">Evolución de victorias en {year}</p>
                        </div>
                        <div className="pwa-pill text-accent-orange">Performance Chart</div>
                    </div>
                    {history.length > 0 ? <PerformanceChart data={history} /> : <div className="h-[300px] flex items-center justify-center text-white/5 uppercase tracking-widest font-black italic">No hay datos de {year}</div>}
                </div>
            </section>
        </main>
    );
}

import { PLAYERS } from '@/data/historicalData';
