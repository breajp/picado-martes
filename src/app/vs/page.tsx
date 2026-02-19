'use client';

import { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import { PLAYERS } from '@/data/historicalData';
import { getHeadToHead, getLeaderboard } from '@/lib/stats';
import { Swords, Activity, Zap, Shield, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getPlayerMetadata } from '@/data/playerMetadata';

export default function VSPage() {
    const [p1, setP1] = useState(PLAYERS[0]);
    const [p2, setP2] = useState(PLAYERS[1]);

    const stats = useMemo(() => getHeadToHead(p1, p2), [p1, p2]);
    const leaderboard = getLeaderboard();
    const p1Global = leaderboard.find(p => p.name === p1);
    const p2Global = leaderboard.find(p => p.name === p2);
    const m1 = getPlayerMetadata(p1);
    const m2 = getPlayerMetadata(p2);

    const p1Prob = useMemo(() => {
        if (!p1Global || !p2Global) return 50;
        const total = p1Global.winRate + p2Global.winRate;
        return (p1Global.winRate / total) * 100;
    }, [p1Global, p2Global]);

    return (
        <main className="min-h-screen relative pb-60 overflow-hidden">
            <Navbar />

            {/* BACKGROUND MESH GRADIENT */}
            <div className="fixed inset-0 -z-10 opacity-30">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent-pink/10 via-transparent to-accent-blue/10" />
                <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-accent-lemon/10 rounded-full blur-[150px]" />
            </div>

            {/* 1. SELECTION ENGINE */}
            <section className="min-h-screen px-6 sm:px-12 max-w-7xl mx-auto flex flex-col justify-center gap-12 pt-20">
                <div className="flex flex-col items-center mb-12">
                    <Swords size={32} className="text-white/20 mb-6" />
                    <h2 className="text-sm font-black uppercase tracking-[0.5em] text-white/40">Duel Diagnostic</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative items-stretch">

                    {/* Challenger A Area */}
                    <motion.div
                        layout
                        className="glass-card p-12 lg:p-20 relative group border-none bg-white/[0.02]"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={p1}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                className="flex flex-col h-full"
                            >
                                <div className="flex justify-between items-start mb-12">
                                    <div>
                                        <p className="text-[10px] font-black text-accent-pink uppercase tracking-widest mb-2">Challenger A</p>
                                        <p className="text-xs font-bold text-white/30 italic">vs {m1.famousCounterpart}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-4xl font-black italic text-white/5">#{leaderboard.findIndex(p => p.name === p1) + 1}</p>
                                    </div>
                                </div>

                                <div className="relative mb-12">
                                    <select
                                        value={p1}
                                        onChange={(e) => setP1(e.target.value)}
                                        className="w-full bg-transparent text-[8vw] lg:text-[6vw] font-black leading-none focus:outline-none appearance-none cursor-pointer hover:text-accent-pink transition-colors relative z-10"
                                    >
                                        {PLAYERS.map(p => <option key={p} value={p} className="bg-bg text-white">{p}</option>)}
                                    </select>
                                    <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-20 bg-accent-pink opacity-40" />
                                </div>

                                <div className="grid grid-cols-2 gap-12 mt-auto">
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Efficacy</p>
                                        <p className="text-4xl font-black">{p1Global?.winRate.toFixed(0)}%</p>
                                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-accent-pink" style={{ width: `${p1Global?.winRate}%` }} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Intensity</p>
                                        <p className="text-4xl font-black">{m1.intensity}%</p>
                                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-white" style={{ width: `${m1.intensity}%` }} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>

                    {/* Challenger B Area */}
                    <motion.div
                        layout
                        className="glass-card p-12 lg:p-20 relative group border-none bg-white/[0.04]"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={p2}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                className="flex flex-col h-full items-end text-right"
                            >
                                <div className="flex justify-between items-start mb-12 w-full">
                                    <div className="text-left">
                                        <p className="text-4xl font-black italic text-white/5">#{leaderboard.findIndex(p => p.name === p2) + 1}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-accent-lemon uppercase tracking-widest mb-2">Challenger B</p>
                                        <p className="text-xs font-bold text-white/30 italic">vs {m2.famousCounterpart}</p>
                                    </div>
                                </div>

                                <div className="relative mb-12">
                                    <select
                                        value={p2}
                                        onChange={(e) => setP2(e.target.value)}
                                        className="w-full bg-transparent text-[8vw] lg:text-[6vw] font-black leading-none text-right focus:outline-none appearance-none cursor-pointer hover:text-accent-lemon transition-colors relative z-10"
                                    >
                                        {PLAYERS.map(p => <option key={p} value={p} className="bg-bg text-white">{p}</option>)}
                                    </select>
                                    <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-1 h-20 bg-accent-lemon opacity-40" />
                                </div>

                                <div className="grid grid-cols-2 gap-12 mt-auto w-full">
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Intensity</p>
                                        <p className="text-4xl font-black">{m2.intensity}%</p>
                                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-white" style={{ width: `${m2.intensity}%` }} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Efficacy</p>
                                        <p className="text-4xl font-black">{p2Global?.winRate.toFixed(0)}%</p>
                                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-accent-lemon" style={{ width: `${p2Global?.winRate}%` }} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* 2. PROBABILITY ANALYSIS */}
            <section className="px-6 sm:px-12 max-w-7xl mx-auto mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    <div className="lg:col-span-2 glass-card p-12 overflow-hidden relative">
                        <div className="relative z-10">
                            <div className="flex justify-between items-end mb-16">
                                <h3 className="text-4xl font-black tracking-tight uppercase leading-none">Victory Outcome<br /><span className="text-white/20 text-xl font-medium tracking-normal lowercase">calculated probability</span></h3>
                                <div className="text-right">
                                    <span className="text-8xl font-black text-accent-lemon italic leading-none">{p1Prob.toFixed(0)}%</span>
                                </div>
                            </div>

                            <div className="relative h-6 w-full bg-white/5 rounded-full overflow-hidden flex items-center p-1.5 border border-white/5">
                                <motion.div
                                    initial={{ width: '50%' }}
                                    animate={{ width: `${p1Prob}%` }}
                                    className="h-full bg-gradient-to-r from-accent-pink to-accent-lemon rounded-full shadow-[0_0_40px_rgba(255,255,255,0.2)]"
                                />
                            </div>
                            <div className="flex justify-between mt-8 text-[10px] font-black uppercase text-white/30 tracking-[0.4em]">
                                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent-pink" /> Advantage {p1}</span>
                                <span className="flex items-center gap-2">Advantage {p2} <div className="w-1.5 h-1.5 rounded-full bg-accent-lemon" /></span>
                            </div>
                        </div>

                        {/* Decorative Mesh in Card */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-lemon/5 blur-[100px] rounded-full" />
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-1 gap-8">
                        <div className="glass-card p-10 flex flex-col justify-between">
                            <Shield className="text-white/10" size={24} />
                            <div>
                                <p className="text-[10px] font-bold text-white/20 uppercase mb-2">H2H Battles</p>
                                <div className="flex items-end gap-3">
                                    <p className="text-5xl font-black italic">{stats.matchesAgainst}</p>
                                    <span className="text-xs font-bold text-white/30 mb-2 uppercase">Matches</span>
                                </div>
                            </div>
                        </div>
                        <div className="glass-card p-10 flex flex-col justify-between bg-white/[0.05]">
                            <Target className="text-white/10" size={24} />
                            <div>
                                <p className="text-[10px] font-bold text-white/20 uppercase mb-2">Global Score Delta</p>
                                <p className="text-5xl font-black italic text-accent-lemon">
                                    {Math.abs((p1Global?.points || 0) - (p2Global?.points || 0))}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* 3. VERDICT SECTION */}
            <section className="py-40 px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-12"
                >
                    <div className="w-px h-20 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                    <h4 className="text-[15vw] font-black text-white/[0.02] absolute left-1/2 -translate-x-1/2 pointer-events-none uppercase italic">PROGNOSTIC</h4>
                    <div className="relative z-10 glass-pill px-12 py-6 border-accent-lemon/20">
                        <p className="text-lg font-bold">PREDICCIÓN: <span className="text-accent-lemon">{p1Prob > 50 ? p1 : p2}</span> TIENE LA VENTAJA TÁCTICA</p>
                    </div>
                </motion.div>
            </section>

        </main>
    );
}
