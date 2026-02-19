'use client';

import { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import { PLAYERS } from '@/data/historicalData';
import { getHeadToHead, getLeaderboard } from '@/lib/stats';
import { Swords, Activity, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function VSPage() {
    const [p1, setP1] = useState(PLAYERS[0]);
    const [p2, setP2] = useState(PLAYERS[1]);

    const stats = useMemo(() => getHeadToHead(p1, p2), [p1, p2]);
    const leaderboard = getLeaderboard();
    const p1Global = leaderboard.find(p => p.name === p1);
    const p2Global = leaderboard.find(p => p.name === p2);

    const p1Prob = useMemo(() => {
        if (!p1Global || !p2Global) return 50;
        const total = p1Global.winRate + p2Global.winRate;
        return (p1Global.winRate / total) * 100;
    }, [p1Global, p2Global]);

    return (
        <main className="min-h-screen relative pb-60">
            <Navbar />

            {/* 1. SELECTION ENGINE */}
            <section className="h-[90vh] flex flex-col justify-center px-6 sm:px-12 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 relative">

                    {/* Player 1 Area */}
                    <motion.div
                        key={p1}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col items-center lg:items-start p-16 glass-card border-none bg-white/[0.02]"
                    >
                        <span className="text-accent-pink font-black text-[10px] tracking-[0.5em] uppercase mb-8">Challenger A</span>
                        <select
                            value={p1}
                            onChange={(e) => setP1(e.target.value)}
                            className="bg-transparent text-[10vw] font-black leading-none focus:outline-none appearance-none cursor-pointer hover:text-accent-pink transition-colors mb-8"
                        >
                            {PLAYERS.map(p => <option key={p} value={p} className="bg-bg text-white">{p}</option>)}
                        </select>
                        <div className="flex gap-8">
                            <div>
                                <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Rank</p>
                                <p className="text-2xl font-black">#{leaderboard.findIndex(p => p.name === p1) + 1}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Score</p>
                                <p className="text-2xl font-black">{p1Global?.points}</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Player 2 Area */}
                    <motion.div
                        key={p2}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col items-center lg:items-end p-16 glass-card border-none bg-white/[0.05] text-right"
                    >
                        <span className="text-accent-lemon font-black text-[10px] tracking-[0.5em] uppercase mb-8">Challenger B</span>
                        <select
                            value={p2}
                            onChange={(e) => setP2(e.target.value)}
                            className="bg-transparent text-[10vw] font-black leading-none text-right focus:outline-none appearance-none cursor-pointer hover:text-accent-lemon transition-colors mb-8"
                        >
                            {PLAYERS.map(p => <option key={p} value={p} className="bg-bg text-white">{p}</option>)}
                        </select>
                        <div className="flex gap-8">
                            <div>
                                <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Rank</p>
                                <p className="text-2xl font-black">#{leaderboard.findIndex(p => p.name === p2) + 1}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Score</p>
                                <p className="text-2xl font-black">{p2Global?.points}</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Central VS Icon */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_100px_rgba(255,255,255,0.2)]">
                            <Swords size={40} />
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. PROBABILITY ANALYSIS */}
            <section className="px-6 sm:px-12 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 glass-card p-12">
                        <div className="flex justify-between items-end mb-12">
                            <h3 className="text-4xl font-black tracking-tight uppercase">Outcome<br />Probability</h3>
                            <span className="text-6xl font-black text-accent-lemon italic">{p1Prob.toFixed(0)}%</span>
                        </div>
                        <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden flex p-1">
                            <motion.div
                                initial={{ width: '50%' }}
                                animate={{ width: `${p1Prob}%` }}
                                className="h-full bg-accent-pink rounded-full shadow-[0_0_30px_rgba(255,97,216,0.5)]"
                            />
                            <div className="flex-1" />
                        </div>
                        <div className="flex justify-between mt-6 text-[10px] font-black uppercase text-white/20 tracking-[0.3em]">
                            <span>Favor {p1}</span>
                            <span>Favor {p2}</span>
                        </div>
                    </div>

                    <div className="glass-card p-12 flex flex-col justify-center gap-10">
                        <div className="flex items-center gap-6">
                            <Activity className="text-white/20" />
                            <div>
                                <p className="text-[10px] font-bold text-white/30 uppercase mb-1">Direct Duels</p>
                                <p className="text-3xl font-black">{stats.matchesAgainst}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <Zap className="text-white/20" />
                            <div>
                                <p className="text-[10px] font-bold text-white/30 uppercase mb-1">Head-to-head Wins</p>
                                <p className="text-3xl font-black italic">{stats.p1WinsAgainst}<span className="text-white/10 mx-3">/</span>{stats.p2WinsAgainst}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
