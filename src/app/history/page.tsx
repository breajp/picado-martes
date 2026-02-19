'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { getMatchHistory } from '@/lib/stats';
import { motion } from 'framer-motion';
import { Calendar, MapPin, MessageSquare, Users, Info } from 'lucide-react';

export default function HistoryPage() {
    const [year, setYear] = useState<number>(2025);
    const matches = getMatchHistory(year);

    return (
        <main className="min-h-screen relative pb-60 px-6 sm:px-12">
            <Navbar />

            {/* Background Orbs */}
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
                            <button
                                key={y}
                                onClick={() => setYear(y)}
                                className={`px-8 py-3 rounded-xl text-[10px] font-black tracking-widest transition-all ${year === y ? 'bg-accent-orange text-black' : 'text-white/40 hover:text-white/70'}`}
                            >
                                {y}
                            </button>
                        ))}
                    </div>
                </header>

                <div className="space-y-6">
                    {matches.length > 0 ? matches.map((match, index) => (
                        <motion.div
                            key={match.date + index + match.year}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="pwa-card p-8 sm:p-12 flex flex-col md:grid md:grid-cols-12 gap-8 items-start"
                        >
                            {/* Date & Location */}
                            <div className="md:col-span-3 flex flex-col gap-4 w-full">
                                <div className="flex items-center gap-3 text-white/40">
                                    <Calendar size={16} />
                                    <span className="text-xs font-black uppercase tracking-widest">{match.date}/{match.year.toString().slice(-2)}</span>
                                </div>
                                <div className="flex items-center gap-3 text-white/40">
                                    <MapPin size={16} />
                                    <span className="text-xs font-black uppercase tracking-widest">{match.location}</span>
                                </div>
                                {match.comments && (
                                    <div className="mt-4 flex gap-3 text-accent-lemon/60 italic text-[10px] leading-relaxed">
                                        <MessageSquare size={14} className="shrink-0 mt-0.5" />
                                        <span>{match.comments}</span>
                                    </div>
                                )}
                            </div>

                            {/* Matchup */}
                            <div className="md:col-span-6 flex flex-col sm:flex-row items-center justify-between w-full gap-8">
                                <div className="text-center flex-1">
                                    <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-4">Ganadores</p>
                                    <div className="flex flex-wrap justify-center gap-2">
                                        {match.winners.map(name => (
                                            <span key={name} className="px-3 py-1 bg-accent-orange/10 border border-accent-orange/30 text-accent-orange text-[10px] font-bold rounded-lg uppercase italic">
                                                {name}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="px-4 text-xl font-black italic text-white/10 hidden sm:block">VS</div>

                                <div className="text-center flex-1">
                                    <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-4">Perdedores</p>
                                    <div className="flex flex-wrap justify-center gap-2">
                                        {match.losers.map(name => (
                                            <span key={name} className="px-3 py-1 bg-white/5 border border-white/10 text-white/40 text-[10px] font-bold rounded-lg uppercase italic">
                                                {name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Result Summary */}
                            <div className="md:col-span-3 flex flex-col items-end w-full text-right gap-4">
                                <div className="flex items-center gap-3">
                                    <Users size={16} className="text-white/20" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{match.winners.length + match.losers.length} Jugadores</span>
                                </div>

                                {match.guests && match.guests.length > 0 && (
                                    <div className="flex flex-wrap justify-end gap-2">
                                        {match.guests.map(g => (
                                            <span key={g} className="text-[9px] font-black uppercase tracking-tighter px-2 py-0.5 border border-white/5 rounded text-white/20">+{g}</span>
                                        ))}
                                    </div>
                                )}

                                <div className="pwa-pill border-accent-orange/20 text-accent-orange">
                                    Victoria {match.winners[0] || '---'}
                                </div>
                            </div>
                        </motion.div>
                    )) : (
                        <div className="pwa-card p-20 text-center">
                            <p className="text-white/20 font-black uppercase tracking-widest text-sm">No hay partidos registrados para {year}</p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
