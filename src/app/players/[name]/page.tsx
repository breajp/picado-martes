'use client';

import { use, useMemo, useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import { getLeaderboard, getPlayerHistory } from '@/lib/stats';
import { getPlayerMetadata } from '@/data/playerMetadata';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, Activity, Target, Zap, Shield, Camera, Loader2 } from 'lucide-react';
import Link from 'next/link';
import PerformanceChart from '@/components/PerformanceChart';
import { supabase } from '@/lib/supabase';

export default function PlayerProfile({ params }: { params: Promise<{ name: string }> }) {
    const { name } = use(params);
    const [year, setYear] = useState<number>(2025);
    const [displayPhoto, setDisplayPhoto] = useState<string>("");
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const leaderboard = getLeaderboard(year);
    const playerStats = leaderboard.find(p => p.name === name);
    const metadata = getPlayerMetadata(name);
    const history = useMemo(() => getPlayerHistory(name, year), [name, year]);

    useEffect(() => {
        async function fetchPhoto() {
            if (!supabase) {
                setDisplayPhoto(metadata.photo);
                return;
            }

            const { data, error } = await supabase
                .from('player_profiles')
                .select('photo_url')
                .eq('name', name)
                .single();

            if (data?.photo_url) {
                setDisplayPhoto(data.photo_url);
            } else {
                setDisplayPhoto(metadata.photo);
            }
        }
        fetchPhoto();
    }, [name, metadata.photo]);

    const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !supabase) return;

        try {
            setUploading(true);

            // 1. Upload to Supabase Storage
            const fileExt = file.name.split('.').pop();
            const fileName = `${name}-${Math.random()}.${fileExt}`;
            const filePath = `avatars/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('player-photos')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // 2. Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('player-photos')
                .getPublicUrl(filePath);

            // 3. Update Database (Upsert)
            const { error: dbError } = await supabase
                .from('player_profiles')
                .upsert({ name, photo_url: publicUrl }, { onConflict: 'name' });

            if (dbError) throw dbError;

            setDisplayPhoto(publicUrl);
        } catch (error) {
            console.error('Error uploading photo:', error);
            alert('Error al subir la foto. Asegurate de tener configurado Supabase.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <main className="min-h-screen relative pb-40">
            <Navbar />

            {/* PWA Backdrop Orbs */}
            <div className="pwa-mesh">
                <div className="mesh-orb-1 opacity-20" />
                <div className="mesh-orb-2 opacity-20" />
            </div>

            {/* MOBILE-FIRST HEADER */}
            <section className="relative h-[65vh] flex items-end p-6 sm:p-12 overflow-hidden group">
                <div className="absolute inset-0 z-0">
                    <img
                        src={displayPhoto}
                        alt={name}
                        className="w-full h-full object-cover grayscale opacity-50 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-transparent" />
                </div>

                {/* Upload Button Overlay */}
                <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-sm">
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="bg-white/10 hover:bg-white/20 border border-white/20 px-8 py-4 rounded-2xl flex items-center gap-3 text-xs font-black uppercase tracking-widest transition-all scale-95 hover:scale-100 disabled:opacity-50"
                    >
                        {uploading ? <Loader2 size={18} className="animate-spin" /> : <Camera size={18} />}
                        {uploading ? 'Subiendo...' : 'Cambiar Foto de Perfil'}
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handlePhotoUpload}
                        className="hidden"
                        accept="image/*"
                    />
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-start">
                    <Link href="/players" className="mb-12 pwa-pill flex items-center gap-2 hover:bg-white/10 transition-all">
                        <ArrowLeft size={14} /> Volver al Plantel
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full"
                    >
                        <div className="flex justify-between items-end w-full">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="pwa-pill text-accent-orange border-accent-orange/30">RANGO ÉLITE</span>
                                    <span className="text-white/40 text-[9px] font-black uppercase tracking-widest italic">Activo {year}</span>
                                </div>
                                <h1 className="pwa-title text-8xl sm:text-[12vw]">{name}</h1>
                                <p className="text-sm font-black text-white/30 uppercase tracking-[0.4em] mt-4 italic">
                                    Estilo: <span className="text-white italic">{metadata.role}</span>
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* PERFORMANCE ANALYTICS SECTION */}
            <section className="px-6 sm:px-12 max-w-7xl mx-auto mt-12 space-y-8">
                {/* YEAR SELECTOR */}
                <div className="flex justify-center mb-12">
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-1 flex gap-1">
                        {[2024, 2025, 2026].map(y => (
                            <button
                                key={y}
                                onClick={() => setYear(y)}
                                className={`px-8 py-3 rounded-xl text-[10px] font-black tracking-widest transition-all ${year === y ? 'bg-accent-orange text-black' : 'text-white/40 hover:text-white/70'}`}
                            >
                                {y}
                            </button>
                        ))}
                    </div>
                </div>

                {/* KPI DASHBOARD */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="pwa-card p-8 flex flex-col justify-between h-[180px]">
                        <Target size={20} className="text-accent-orange" />
                        <div>
                            <p className="pwa-subtitle">Rango Global {year}</p>
                            <h4 className="text-4xl font-black italic">#{leaderboard.findIndex(p => p.name === name) !== -1 ? leaderboard.findIndex(p => p.name === name) + 1 : '--'}</h4>
                        </div>
                    </div>
                    <div className="pwa-card p-8 flex flex-col justify-between h-[180px]">
                        <Zap size={20} className="text-accent-lemon" />
                        <div>
                            <p className="pwa-subtitle">Eficacia</p>
                            <h4 className="text-4xl font-black italic text-accent-lemon">{playerStats ? playerStats.winRate.toFixed(0) : '0'}%</h4>
                        </div>
                    </div>
                    <div className="pwa-card p-8 flex flex-col justify-between h-[180px]">
                        <Activity size={20} className="text-accent-blue" />
                        <div>
                            <p className="pwa-subtitle">Puntos</p>
                            <h4 className="text-4xl font-black italic">{playerStats ? playerStats.points : '0'}</h4>
                        </div>
                    </div>
                    <div className="pwa-card p-8 flex flex-col justify-between h-[180px]">
                        <Shield size={20} className="text-white/20" />
                        <div>
                            <p className="pwa-subtitle">Partidos</p>
                            <h4 className="text-4xl font-black italic">{playerStats ? playerStats.totalGames : '0'}</h4>
                        </div>
                    </div>
                </div>

                {/* TIME SERIES CHART */}
                <div className="pwa-card p-10 bg-white/[0.01]">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="text-xl font-black italic uppercase tracking-tighter">Evolución {year}</h3>
                            <p className="pwa-subtitle">Seguimiento de % de victorias</p>
                        </div>
                        <div className="pwa-pill text-accent-orange">Eficacia x {year}</div>
                    </div>

                    {history.length > 0 ? (
                        <PerformanceChart data={history} />
                    ) : (
                        <div className="h-[300px] flex items-center justify-center text-white/10 font-black uppercase tracking-[0.2em] italic">
                            Sin actividad en {year}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
