'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { getMatchHistory } from '@/lib/stats';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, MessageSquare, Users, Video, X, Heart, Play } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function HistoryPage() {
    const [year, setYear] = useState<number>(2025);
    const [highlights, setHighlights] = useState<Record<string, any[]>>({});
    const [selectedVideos, setSelectedVideos] = useState<any[] | null>(null);
    const matches = getMatchHistory(year);

    useEffect(() => {
        async function fetchHighlights() {
            if (!supabase) return;
            const { data } = await supabase
                .from('player_highlights')
                .select('*')
                .order('likes', { ascending: false });

            if (data) {
                const grouped = data.reduce((acc: any, h: any) => {
                    const date = h.match_date;
                    if (!acc[date]) acc[date] = [];
                    acc[date].push(h);
                    return acc;
                }, {});
                setHighlights(grouped);
            }
        }
        fetchHighlights();
    }, []);

    // Helper to match local match date with supabase date (YYYY-MM-DD)
    const getHighlightsForMatch = (match: any) => {
        const [day, month] = match.date.split('/');
        const isoDate = `${match.year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        return highlights[isoDate] || [];
    };

    return (
        <main className="min-h-screen relative pb-60 px-6 sm:px-12">
            <Navbar />

            <div className="pwa-mesh">
                <div className="mesh-orb-1 opacity-20" />
                <div className="mesh-orb-2 opacity-20" />
            </div>

            <section className="pt-32 max-w-7xl mx-auto">
                <header className="mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
                    <div>
                        <p className="pwa-subtitle mb-4">Registro Histórico</p>
                        <h1 className="pwa-title mb-0">HISTORIAL DE<br /><span className="text-white/20">PARTIDOS</span></h1>
                    </div>

                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-1 flex gap-1">
                        {[2024, 2025, 2026].map(y => (
                            <button key={y} onClick={() => setYear(y)} className={`px-8 py-3 rounded-xl text-[10px] font-black tracking-widest transition-all ${year === y ? 'bg-accent-orange text-black' : 'text-white/40 hover:text-white/70'}`}>
                                {y}
                            </button>
                        ))}
                    </div>
                </header>

                <div className="space-y-6">
                    {matches.length > 0 ? matches.map((match, index) => {
                        const matchHighlights = getHighlightsForMatch(match);
                        return (
                            <motion.div
                                key={match.date + index + match.year}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="pwa-card p-8 sm:p-12 flex flex-col md:grid md:grid-cols-12 gap-8 items-start relative group"
                            >
                                <div className="md:col-span-3 flex flex-col gap-4 w-full">
                                    <div className="flex items-center gap-3 text-white/40">
                                        <Calendar size={16} />
                                        <span className="text-xs font-black uppercase tracking-widest">{match.date}/{match.year.toString().slice(-2)}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-white/40">
                                        <MapPin size={16} />
                                        <span className="text-xs font-black uppercase tracking-widest">{match.location}</span>
                                    </div>
                                    {matchHighlights.length > 0 && (
                                        <button
                                            onClick={() => setSelectedVideos(matchHighlights)}
                                            className="mt-2 pwa-pill !bg-accent-lemon !text-black border-none flex items-center gap-2 hover:scale-105 transition-transform"
                                        >
                                            <Video size={14} /> MIRAR VIDEOS ({matchHighlights.length})
                                        </button>
                                    )}
                                </div>

                                <div className="md:col-span-6 flex flex-col sm:flex-row items-center justify-between w-full gap-8">
                                    <div className="text-center flex-1">
                                        <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-4">Ganadores</p>
                                        <div className="flex flex-wrap justify-center gap-2">
                                            {match.winners.map(name => (
                                                <span key={name} className="px-3 py-1 bg-accent-orange/10 border border-accent-orange/30 text-accent-orange text-[10px] font-bold rounded-lg uppercase italic">{name}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="px-4 text-xl font-black italic text-white/10 hidden sm:block">VS</div>
                                    <div className="text-center flex-1">
                                        <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-4">Perdedores</p>
                                        <div className="flex flex-wrap justify-center gap-2">
                                            {match.losers.map(name => (
                                                <span key={name} className="px-3 py-1 bg-white/5 border border-white/10 text-white/40 text-[10px] font-bold rounded-lg uppercase italic">{name}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="md:col-span-3 flex flex-col items-end w-full text-right gap-4">
                                    <div className="flex items-center gap-3">
                                        <Users size={16} className="text-white/20" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{match.winners.length + match.losers.length} Jugadores</span>
                                    </div>
                                    <div className="pwa-pill border-accent-orange/20 text-accent-orange">
                                        Victoria {match.winners[0] || '---'}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    }) : (
                        <div className="pwa-card p-20 text-center text-white/20 uppercase tracking-widest font-black italic">No hay partidos registrados para {year}</div>
                    )}
                </div>
            </section>

            {/* VIDEO GALLERY MODAL */}
            <AnimatePresence>
                {selectedVideos && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6">
                        <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto p-4 custom-scrollbar">
                            <button onClick={() => setSelectedVideos(null)} className="fixed top-8 right-8 z-50 p-4 rounded-full bg-white/10 text-white hover:bg-accent-orange hover:text-black transition-all">
                                <X size={24} />
                            </button>
                            <h2 className="text-4xl font-black italic uppercase mb-12 text-center">Resumen del Martes</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {selectedVideos.map(vid => (
                                    <div key={vid.id} className="pwa-card !p-0 overflow-hidden relative group rounded-[32px]">
                                        <div className="aspect-[9/16] bg-black">
                                            <video src={vid.video_url} controls className="w-full h-full object-cover" />
                                        </div>
                                        <div className="p-6 bg-white/[0.02] flex justify-between items-center">
                                            <div>
                                                <span className="pwa-pill !text-[8px] border-accent-lemon/40 text-accent-lemon mb-2">{vid.category}</span>
                                                <p className="text-[10px] font-black text-white/30 uppercase items-center flex gap-1"><Heart size={10} className="fill-current" /> {vid.likes} Likes</p>
                                            </div>
                                            <Play size={20} className="text-white/10 group-hover:text-accent-orange transition-colors" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
