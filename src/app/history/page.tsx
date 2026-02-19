'use client';

import Navbar from '@/components/Navbar';
import { getMatchHistory } from '@/lib/stats';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Trophy, Users } from 'lucide-react';

export default function HistoryPage() {
    const matches = getMatchHistory();

    return (
        <main className="min-h-screen relative pb-60 px-6 sm:px-12">
            <Navbar />

            {/* Background Orbs */}
            <div className="pwa-mesh">
                <div className="mesh-orb-1 opacity-20" />
                <div className="mesh-orb-2 opacity-20" />
            </div>

            <section className="pt-32 max-w-7xl mx-auto">
                <header className="mb-20">
                    <p className="pwa-subtitle mb-4">Registro Histórico</p>
                    <h1 className="pwa-title mb-6">HISTORIAL DE<br /><span className="text-white/20">PARTIDOS</span></h1>
                </header>

                <div className="space-y-6">
                    {matches.map((match, index) => (
                        <motion.div
                            key={match.date + index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="pwa-card p-8 sm:p-12 flex flex-col md:grid md:grid-cols-12 gap-8 items-center"
                        >
                            {/* Date & Location */}
                            <div className="md:col-span-3 flex flex-col gap-4 w-full">
                                <div className="flex items-center gap-3 text-white/40">
                                    <Calendar size={16} />
                                    <span className="text-xs font-black uppercase tracking-widest">{match.date}</span>
                                </div>
                                <div className="flex items-center gap-3 text-white/40">
                                    <MapPin size={16} />
                                    <span className="text-xs font-black uppercase tracking-widest">{match.location}</span>
                                </div>
                                <div className="mt-4">
                                    <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">
                                        Finalizado
                                    </span>
                                </div>
                            </div>

                            {/* Matchup */}
                            <div className="md:col-span-6 flex items-center justify-between w-full">
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

                                <div className="px-8 text-2xl font-black italic text-white/10">VS</div>

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
                            <div className="md:col-span-3 flex flex-col items-end w-full text-right">
                                <div className="flex items-center gap-3 mb-4">
                                    <Users size={16} className="text-white/20" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{match.winners.length + match.losers.length} Jugadores</span>
                                </div>
                                <div className="pwa-pill border-accent-orange/20 text-accent-orange">
                                    Victoria {match.winners[0]}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </main>
    );
}
