'use client';

import { use } from 'react';
import Navbar from '@/components/Navbar';
import { getLeaderboard, getHeadToHead } from '@/lib/stats';
import { getPlayerMetadata } from '@/data/playerMetadata';
import { motion } from 'framer-motion';
import { Trophy, Target, Zap, Activity, ChevronRight, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function PlayerProfile({ params }: { params: Promise<{ name: string }> }) {
    const { name } = use(params);
    const stats = getLeaderboard().find(p => p.name === name);
    const metadata = getPlayerMetadata(name);

    if (!stats) return <div>Player not found</div>;

    return (
        <main className="min-h-screen relative pb-40 lg:pl-32">
            <Navbar />

            {/* Editorial Header */}
            <section className="relative h-[80vh] flex items-end p-6 sm:p-20 overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-full">
                    <img
                        src={metadata.photo}
                        alt={name}
                        className="w-full h-full object-cover grayscale opacity-40 mix-blend-overlay"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-start"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <span className="bg-accent text-black px-4 py-1 text-[10px] font-black uppercase tracking-widest">Profile No. {stats.name}</span>
                            <span className="text-white/40 text-[10px] font-black uppercase tracking-widest">Active Member Since Jan 2025</span>
                        </div>

                        <h1 className="text-[15vw] display-bold leading-none mb-4 -ml-2">{name}</h1>

                        <div className="flex gap-12 text-sm font-black uppercase tracking-widest text-gray-400 italic">
                            <p>Playstyle: <span className="text-white">{metadata.role}</span></p>
                            <p>Comparison: <span className="text-white">vs {metadata.famousCounterpart}</span></p>
                            <p>Region: <span className="text-white">{metadata.nationality}</span></p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Grid */}
            <section className="px-6 sm:px-20 max-w-7xl mx-auto -mt-20 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Primary Stats */}
                    <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-1">
                        {[
                            { label: 'Efectividad', value: `${stats.winRate.toFixed(1)}%`, icon: Target },
                            { label: 'Puntos Totales', value: stats.points, icon: Zap },
                            { label: 'Partidos Jugados', value: stats.totalGames, icon: Activity }
                        ].map((item, i) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="super-glass p-12 text-center"
                            >
                                <item.icon className="mx-auto mb-6 text-accent" size={32} />
                                <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-2">{item.label}</p>
                                <p className="text-5xl font-display text-white italic">{item.value}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Performance Card */}
                    <div className="lg:col-span-4 super-glass p-12">
                        <h3 className="display-bold text-3xl mb-8">RANKING<br />ANALYSIS</h3>
                        <div className="space-y-8">
                            <div className="flex justify-between items-end border-b border-white/5 pb-4">
                                <span className="text-[10px] font-black text-gray-500 uppercase">Season 2025 Rank</span>
                                <span className="text-3xl font-display text-accent italic">Elite tier</span>
                            </div>
                            <div className="flex justify-between items-end border-b border-white/5 pb-4">
                                <span className="text-[10px] font-black text-gray-500 uppercase">Win Streak</span>
                                <span className="text-3xl font-display text-white italic">🔥 3 LAPS</span>
                            </div>
                            <div className="flex justify-between items-end border-b border-white/5 pb-4">
                                <span className="text-[10px] font-black text-gray-500 uppercase">Trend</span>
                                <TrendingUp className="text-emerald-400" size={32} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Navigation */}
            <section className="mt-40 px-6 sm:px-20 max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row gap-8">
                    <Link href="/vs" className="flex-1">
                        <div className="super-glass p-12 group hover:border-accent transition-all">
                            <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mb-4">Go to Comparison</p>
                            <h4 className="text-4xl display-bold group-hover:text-accent transition-colors">COMPARE WITH OTHERS</h4>
                        </div>
                    </Link>
                    <Link href="/players" className="flex-1">
                        <div className="super-glass p-12 group hover:border-white transition-all">
                            <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mb-4">Back to List</p>
                            <h4 className="text-4xl display-bold">VIEW ALL ROSTER</h4>
                        </div>
                    </Link>
                </div>
            </section>
        </main>
    );
}
