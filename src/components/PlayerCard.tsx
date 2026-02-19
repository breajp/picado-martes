'use client';

import { motion } from 'framer-motion';
import { Shield, Zap, Target, Star } from 'lucide-react';

interface PlayerCardProps {
    name: string;
    stats: {
        points: number;
        winRate: number;
        totalGames: number;
        wins: number;
    };
    rank: number;
}

export default function PlayerCard({ name, stats, rank }: PlayerCardProps) {
    return (
        <motion.div
            whileHover={{ y: -10, rotateY: 5, rotateX: -5 }}
            className="relative w-full aspect-[2/3] max-w-[300px] mx-auto group"
            style={{ perspective: '1000px' }}
        >
            {/* Glow Effect behind card */}
            <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative h-full w-full glass-card border-2 border-white/5 group-hover:border-primary/50 overflow-hidden flex flex-col p-6 shadow-2xl">
                {/* Card Header: Rank and Icon */}
                <div className="flex justify-between items-start mb-4">
                    <div className="flex flex-col items-center">
                        <span className="text-4xl font-black text-white/20 italic group-hover:text-primary/40 transition-colors leading-none">#{rank}</span>
                        <div className="h-px w-8 bg-white/10 mt-1" />
                    </div>
                    <div className="bg-primary/10 p-2 rounded-xl border border-primary/20">
                        <Star className="text-primary w-5 h-5 fill-primary/20" />
                    </div>
                </div>

                {/* Player Avatar Placeholder */}
                <div className="flex-1 flex flex-col items-center justify-center -mt-4">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-white/5 to-white/10 border border-white/10 flex items-center justify-center relative group-hover:scale-110 transition-transform duration-500">
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl opacity-0 group-hover:opacity-40" />
                        <span className="text-6xl font-black text-white/10 tracking-tighter">{name.substring(0, 2)}</span>
                    </div>
                    <h3 className="mt-6 text-2xl font-black tracking-tight text-glow uppercase">{name}</h3>
                </div>

                {/* Stats Grid */}
                <div className="mt-auto pt-6 border-t border-white/5">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-gray-500 uppercase flex items-center gap-1"><Shield size={10} /> OVR</p>
                            <p className="text-xl font-black text-primary">{stats.winRate.toFixed(0)}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-gray-500 uppercase flex items-center gap-1"><Zap size={10} /> PTS</p>
                            <p className="text-xl font-black">{stats.points}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-gray-500 uppercase flex items-center gap-1"><Target size={10} /> PJ</p>
                            <p className="text-lg font-bold text-gray-400">{stats.totalGames}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">RANK</p>
                            <p className="text-lg font-bold text-accent italic">GOLD</p>
                        </div>
                    </div>
                </div>

                {/* Scanline Effect */}
                <div className="scanline opacity-20" />
            </div>
        </motion.div>
    );
}
