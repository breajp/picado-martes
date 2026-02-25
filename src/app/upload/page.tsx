'use client';

import { useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { Camera, Loader2, Play, Users, Calendar, ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { PLAYERS } from '@/data/historicalData';
import { useRouter } from 'next/navigation';

export default function UploadPage() {
    const router = useRouter();
    const [videoUploading, setVideoUploading] = useState(false);
    const videoInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    // Form settings
    const [selectedCategory, setSelectedCategory] = useState('Magia');
    const [taggedPlayers, setTaggedPlayers] = useState<string[]>([]);
    const [matchDate, setMatchDate] = useState(new Date().toISOString().split('T')[0]);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleVideoUpload = async () => {
        if (!selectedFile || !supabase) {
            alert("No hay archivo o error de base de datos.");
            return;
        }

        if (taggedPlayers.length === 0) {
            alert("Por favor etiqueta al menos a 1 jugador.");
            return;
        }

        try {
            setVideoUploading(true);
            const fileExt = selectedFile.name.split('.').pop();
            const fileName = `highlight-${Date.now()}.${fileExt}`;
            const filePath = `highlights/${fileName}`;

            // 1. Storage Upload
            const { error: uploadError } = await supabase.storage
                .from('player-highlights')
                .upload(filePath, selectedFile);

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

            alert('¡Video subido con éxito!');
            router.push('/feed'); // Redirigir al feed para ver el video
        } catch (error: any) {
            console.error('Error:', error);
            const msg = error.message || 'Error desconocido';
            alert(`Error al subir: ${msg}`);
        } finally {
            setVideoUploading(false);
        }
    };

    return (
        <main className="min-h-screen relative pb-40 bg-[#0A0A0A] text-white">
            <Navbar />

            <div className="pwa-mesh pointer-events-none">
                <div className="mesh-orb-1 opacity-20" />
                <div className="mesh-orb-2 opacity-20" />
            </div>

            <section className="px-6 sm:px-12 max-w-2xl mx-auto pt-20">
                <div className="flex items-center gap-4 mb-10">
                    <button onClick={() => router.back()} className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-white/10 transition">
                        <ArrowLeft size={16} />
                    </button>
                    <div>
                        <p className="pwa-subtitle mb-1">Central de Subidas</p>
                        <h1 className="text-3xl font-black italic uppercase tracking-tighter">Subir Jugada</h1>
                    </div>
                </div>

                <div className="space-y-8">
                    {/* VIDEO PREVIEW OR SELECTION BOXY */}
                    <div
                        className="w-full aspect-[9/16] max-h-[50vh] bg-white/5 rounded-[40px] border-2 border-dashed border-white/20 flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer"
                        onClick={() => !previewUrl && videoInputRef.current?.click()}
                    >
                        {previewUrl ? (
                            <>
                                <video src={previewUrl} className="w-full h-full object-cover" controls autoPlay loop muted playsInline />
                                <div className="absolute top-4 right-4 z-20">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setPreviewUrl(null); setSelectedFile(null); }}
                                        className="bg-black/60 backdrop-blur-md p-3 rounded-full border border-white/20 text-white/60 hover:text-white"
                                    >
                                        Cambiar
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="text-center p-8">
                                <div className="w-20 h-20 bg-accent-orange/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                    <Camera size={32} className="text-accent-orange" />
                                </div>
                                <h3 className="text-xl font-black italic uppercase mb-2">Seleccionar Video</h3>
                                <p className="text-xs text-white/40 uppercase tracking-widest font-bold">MP4, MOV (Max 50MB)</p>
                            </div>
                        )}
                        <input type="file" ref={videoInputRef} onChange={handleFileSelect} className="hidden" accept="video/*" />
                    </div>

                    <div className="pwa-card p-8 bg-white/[0.04]">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase text-accent-orange tracking-widest flex items-center gap-2">
                                    <Play size={14} /> Categoría
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {['Puskas', 'Blooper', 'Magia', 'Asistencia', 'Atajada', 'Lujo'].map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => setSelectedCategory(cat)}
                                            className={`px-5 py-3 rounded-2xl text-[10px] font-black uppercase transition-all ${selectedCategory === cat ? 'bg-accent-orange text-black' : 'bg-white/5 text-white/40 border border-white/5 hover:bg-white/10'}`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase text-accent-lemon tracking-widest flex items-center gap-2">
                                    <Users size={14} /> Jugadores Etiquetados <span className="text-white/60">({taggedPlayers.length})</span>
                                </label>
                                <div className="max-h-[200px] overflow-y-auto p-3 bg-white/5 rounded-2xl custom-scrollbar border border-white/5 grid grid-cols-2 gap-2">
                                    {PLAYERS.map(p => {
                                        const isTagged = taggedPlayers.includes(p);
                                        return (
                                            <button
                                                key={p}
                                                onClick={() => isTagged ? setTaggedPlayers(taggedPlayers.filter(tp => tp !== p)) : setTaggedPlayers([...taggedPlayers, p])}
                                                className={`text-left px-4 py-3 rounded-xl text-[9px] font-black uppercase transition-all flex justify-between items-center ${isTagged ? 'bg-accent-lemon/10 text-accent-lemon border border-accent-lemon/20' : 'bg-white/5 text-white/40 hover:bg-white/10 border border-transparent'}`}
                                            >
                                                {p} {isTagged && <span>✓</span>}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase text-white/60 tracking-widest flex items-center gap-2">
                                    <Calendar size={14} /> Fecha del Partido
                                </label>
                                <input
                                    type="date"
                                    value={matchDate}
                                    onChange={(e) => setMatchDate(e.target.value)}
                                    className="pwa-input !py-4 text-sm font-bold bg-white/5 border-white/10"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleVideoUpload}
                        disabled={videoUploading || !selectedFile || taggedPlayers.length === 0}
                        className="w-full relative overflow-hidden group rounded-[32px] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-accent-orange to-accent-lemon opacity-90 group-hover:opacity-100 transition-opacity" />
                        <div className="relative z-10 py-6 px-8 flex items-center justify-center gap-4">
                            {videoUploading ? (
                                <>
                                    <Loader2 className="animate-spin text-black" size={24} />
                                    <span className="text-sm font-black italic uppercase text-black tracking-widest">SUBIENDO VIDEO...</span>
                                </>
                            ) : (
                                <span className="text-sm font-black italic uppercase text-black tracking-widest">
                                    PUBLICAR JUGADA
                                </span>
                            )}
                        </div>
                    </button>
                </div>
            </section>
        </main>
    );
}
