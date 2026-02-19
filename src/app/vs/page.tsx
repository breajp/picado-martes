'use client';

import { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import { PLAYERS } from '@/data/historicalData';
import { getHeadToHead, getLeaderboard } from '@/lib/stats';
import { Swords, Users, Trophy, TrendingUp, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VSPage() {
    const [p1, setP1] = useState(PLAYERS[0]);
    const [p2, setP2] = useState(PLAYERS[1]);

    const stats = useMemo(() => getHeadToHead(p1, p2), [p1, p2]);
    const p1Global = useMemo(() => getLeaderboard().find(p => p.name === p1), [p1]);
    const p2Global = useMemo(() => getLeaderboard().find(p => p.name === p2), [p2]);

    const p1Prob = useMemo(() => {
        if (!p1Global || !p2Global) return 50;
        const total = p1Global.winRate + p2Global.winRate;
        return (p1Global.winRate / total) * 100;
    }, [p1Global, p2Global]);

    return (
        <main className="min-h-screen relative pb-20 overflow-hidden">
            <div className="bg-stadium" />
            <div className="bg-mesh" />
            <Navbar />

            <div className="max-w-6xl mx-auto px-6 pt-40">
                <header className="text-center mb-20">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/40 text-primary shadow-[0_0_30px_rgba(0,255,136,0.3)]"
                    >
                        <Swords size={40} />
                    </motion.div>
                    <h1 className="text-6xl font-black title-hero mb-4">DUELO DE TITANES</h1>
                    <p className="text-gray-400 font-medium tracking-widest uppercase text-xs">Análisis predictivo e historial de enfrentamientos</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-7 gap-6 items-center mb-20">
                    {/* Player 1 Selector */}
                    <motion.div
                        whileHover={{ x: 5 }}
                        className="md:col-span-3 glass-card p-10 text-center relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
                        <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-primary/20 shadow-2xl">
                            <span className="text-5xl font-black text-primary group-hover:scale-110 transition-transform">{p1[0]}</span>
                        </div>
                        <select
                            value={p1}
                            onChange={(e) => setP1(e.target.value)}
                            className="bg-transparent text-3xl font-black text-center w-full focus:outline-none cursor-pointer appearance-none hover:text-primary transition-colors mb-2"
                        >
                            {PLAYERS.map(p => <option key={p} value={p} className="bg-background">{p}</option>)}
                        </select>
                        <p className="text-primary text-xs font-black tracking-widest uppercase">Efectividad {p1Global?.winRate.toFixed(1)}%</p>
                    </motion.div>

                    {/* VS Icon */}
                    <div className="flex flex-col items-center justify-center py-4">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center bg-white/5 backdrop-blur-xl relative"
                        >
                            <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-ping scale-150 opacity-20" />
                            <span className="text-2xl font-black italic">VS</span>
                        </motion.div>
                    </div>

                    {/* Player 2 Selector */}
                    <motion.div
                        whileHover={{ x: -5 }}
                        className="md:col-span-3 glass-card p-10 text-center relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-2 h-full bg-secondary" />
                        <div className="w-32 h-32 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-secondary/20 shadow-2xl">
                            <span className="text-5xl font-black text-secondary">{p2[0]}</span>
                        </div>
                        <select
                            value={p2}
                            onChange={(e) => setP2(e.target.value)}
                            className="bg-transparent text-3xl font-black text-center w-full focus:outline-none cursor-pointer appearance-none hover:text-secondary transition-colors mb-2"
                        >
                            {PLAYERS.map(p => <option key={p} value={p} className="bg-background">{p}</option>)}
                        </select>
                        <p className="text-secondary text-xs font-black tracking-widest uppercase">Efectividad {p2Global?.winRate.toFixed(1)}%</p>
                    </motion.div>
                </div>

                {/* Prediction Bar */}
                <section className="mb-20">
                    <div className="flex justify-between items-end mb-4 px-2">
                        <div>
                            <p className="text-[10px] font-black tracking-[0.3em] uppercase text-gray-500 mb-1 flex items-center gap-2"><Sparkles size={12} className="text-accent" /> Win Probability</p>
                            <p className="text-xl font-black text-primary uppercase">{p1} <span className="text-gray-600">vs</span> {p2}</p>
                        </div>
                        <p className="text-4xl font-black italic">{p1Prob.toFixed(0)} <span className="text-gray-600 sm:text-lg sm:not-italic">%</span></p>
                    </div>
                    <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden flex border border-white/10 p-0.5">
                        <motion.div
                            initial={{ width: '50%' }}
                            animate={{ width: `${p1Prob}%` }}
                            className="h-full bg-gradient-to-r from-primary to-emerald-400 rounded-full shadow-[0_0_20px_rgba(0,255,136,0.3)]"
                        />
                        <div className="flex-1" />
                    </div>
                </section>

                {/* Detailed Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="glass-card p-10 flex items-center gap-8 relative overflow-hidden">
                        <div className="scanline" />
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-primary border border-white/10 shrink-0">
                            <Users size={32} />
                        </div>
                        <div>
                            <h4 className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Historias Cruzadas</h4>
                            <p className="text-4xl font-black">{stats.matchesTogether + stats.matchesAgainst}</p>
                            <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-tighter">Partidos en el mismo turno</p>
                        </div>
                    </div>

                    <div className="glass-card p-10 flex items-center gap-8 relative overflow-hidden">
                        <div className="scanline" />
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-accent border border-white/10 shrink-0">
                            <Swords size={32} />
                        </div>
                        <div>
                            <h4 className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Duelos Directos</h4>
                            <p className="text-4xl font-black">{stats.matchesAgainst}</p>
                            <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-tighter">Veces en equipos contrarios</p>
                        </div>
                    </div>

                    <div className="md:col-span-2 glass-card p-12 relative">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                            <div className="text-center md:text-left flex-1">
                                <p className="text-5xl font-black text-primary mb-2">{stats.p1WinsAgainst}</p>
                                <p className="text-sm font-black uppercase tracking-[0.2em] text-gray-500">Victorias {p1}</p>
                            </div>
                            <div className="flex-1 w-full max-w-sm h-32 flex items-end gap-2 px-10">
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${(stats.p1WinsAgainst / (stats.matchesAgainst || 1)) * 100}%` }}
                                    className="flex-1 bg-gradient-to-t from-emerald-900 to-primary rounded-t-2xl shadow-lg"
                                />
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${(stats.p2WinsAgainst / (stats.matchesAgainst || 1)) * 100}%` }}
                                    className="flex-1 bg-gradient-to-t from-blue-900 to-secondary rounded-t-2xl shadow-lg"
                                />
                            </div>
                            <div className="text-center md:text-right flex-1">
                                <p className="text-5xl font-black text-secondary mb-2">{stats.p2WinsAgainst}</p>
                                <p className="text-sm font-black uppercase tracking-[0.2em] text-gray-500">Victorias {p2}</p>
                            </div>
                        </div>

                        {stats.matchesAgainst === 0 && (
                            <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center rounded-[32px]">
                                <Users size={48} className="text-gray-700 mb-4" />
                                <p className="text-gray-500 font-black uppercase tracking-widest text-sm">Sin historial de duelos todavía</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
