'use client';

import { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import { PLAYERS } from '@/data/historicalData';
import { getHeadToHead, getLeaderboard } from '@/lib/stats';
import { Swords, Zap, Activity, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VSPage() {
    const [p1, setP1] = useState(PLAYERS[0]);
    const [p2, setP2] = useState(PLAYERS[1]);

    const stats = useMemo(() => getHeadToHead(p1, p2), [p1, p2]);
    const leaderboard = getLeaderboard();
    const p1Stats = leaderboard.find(p => p.name === p1);
    const p2Stats = leaderboard.find(p => p.name === p2);

    const p1Prob = useMemo(() => {
        if (!p1Stats || !p2Stats) return 50;
        const total = p1Stats.winRate + p2Stats.winRate;
        return (p1Stats.winRate / total) * 100;
    }, [p1Stats, p2Stats]);

    return (
        <main className="min-h-screen relative pb-40 lg:pl-32">
            <Navbar />

            <section className="h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
                <div className="luxury-grid opacity-10" />

                {/* Background Accents */}
                <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 -translate-y-1/2 z-0" />
                <div className="absolute top-0 left-1/2 w-px h-full bg-white/5 -translate-x-1/2 z-0" />

                <div className="relative z-10 w-full max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 relative">

                        {/* Player 1 Side */}
                        <div className="flex flex-col items-center lg:items-end justify-center p-12 lg:pr-24 group">
                            <motion.div
                                key={p1}
                                initial={{ opacity: 0, x: -100 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-right"
                            >
                                <select
                                    value={p1}
                                    onChange={(e) => setP1(e.target.value)}
                                    className="bg-transparent text-[8vw] display-bold leading-none text-right focus:outline-none appearance-none cursor-pointer hover:text-accent transition-colors"
                                >
                                    {PLAYERS.map(p => <option key={p} value={p} className="bg-black">{p}</option>)}
                                </select>
                                <p className="text-accent text-sm font-black tracking-[0.5em] mt-4 uppercase">Rank Pro #{leaderboard.findIndex(p => p.name === p1) + 1}</p>
                            </motion.div>
                        </div>

                        {/* Separator VS */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                            <div className="w-20 h-20 rounded-full border border-accent bg-black flex items-center justify-center shadow-[0_0_50px_rgba(0,255,163,0.2)]">
                                <Swords className="text-accent" size={32} />
                            </div>
                        </div>

                        {/* Player 2 Side */}
                        <div className="flex flex-col items-center lg:items-start justify-center p-12 lg:pl-24 bg-white/[0.02]">
                            <motion.div
                                key={p2}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-left"
                            >
                                <select
                                    value={p2}
                                    onChange={(e) => setP2(e.target.value)}
                                    className="bg-transparent text-[8vw] display-bold leading-none text-left focus:outline-none appearance-none cursor-pointer hover:text-accent-secondary transition-colors"
                                >
                                    {PLAYERS.map(p => <option key={p} value={p} className="bg-black">{p}</option>)}
                                </select>
                                <p className="text-accent-secondary text-sm font-black tracking-[0.5em] mt-4 uppercase">Rank Pro #{leaderboard.findIndex(p => p.name === p2) + 1}</p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Comparison Grid */}
            <section className="px-6 sm:px-20 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Win Probability Card */}
                    <div className="lg:col-span-2 super-glass p-12">
                        <div className="flex justify-between items-end mb-12">
                            <div>
                                <h3 className="display-bold text-4xl mb-2">PROBABILIDAD<br />DE ÉXITO</h3>
                                <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">Basado en algoritmos de rendimiento 2025</p>
                            </div>
                            <div className="text-right">
                                <span className="text-6xl font-display italic">{p1Prob.toFixed(0)}%</span>
                            </div>
                        </div>

                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden flex">
                            <motion.div
                                initial={{ width: '50%' }}
                                animate={{ width: `${p1Prob}%` }}
                                className="h-full bg-accent shadow-[0_0_20px_var(--accent)]"
                            />
                            <div className="flex-1" />
                        </div>

                        <div className="flex justify-between mt-8 text-[10px] font-black uppercase text-gray-500 tracking-widest">
                            <span>Victoria {p1}</span>
                            <span>Victoria {p2}</span>
                        </div>
                    </div>

                    {/* Quick Stats Sidebar */}
                    <div className="space-y-6">
                        <div className="super-glass p-8 flex items-center gap-6">
                            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-accent">
                                <Activity size={24} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase text-gray-500">Historial Mutuo</p>
                                <p className="text-2xl font-bold">{stats.matchesTogether + stats.matchesAgainst} Partidos</p>
                            </div>
                        </div>
                        <div className="super-glass p-8 flex flex-col justify-center">
                            <p className="text-[10px] font-black uppercase text-gray-500 mb-6">Enfrentamientos Directos</p>
                            <div className="flex items-end gap-1 h-20">
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${(stats.p1WinsAgainst / (stats.matchesAgainst || 1)) * 100}%` }}
                                    className="flex-1 bg-accent/20 border-t-2 border-accent"
                                />
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${(stats.p2WinsAgainst / (stats.matchesAgainst || 1)) * 100}%` }}
                                    className="flex-1 bg-accent-secondary/20 border-t-2 border-accent-secondary"
                                />
                            </div>
                            <div className="flex justify-between mt-4 font-black text-xs uppercase italic">
                                <span>{p1}: {stats.p1WinsAgainst}</span>
                                <span>{p2}: {stats.p2WinsAgainst}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="fixed bottom-10 right-10 p-4 border border-white/5 rounded-full opacity-20 hover:opacity-100 transition-opacity cursor-pointer">
                <Info size={16} />
            </div>
        </main>
    );
}
