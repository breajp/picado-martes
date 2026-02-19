'use client';

import { motion } from 'framer-motion';

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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="group relative"
        >
            <div className="absolute -top-4 -left-4 text-[80px] font-black text-white/[0.03] display-bold z-0 pointer-events-none group-hover:text-accent/5 transition-colors">
                {rank.toString().padStart(2, '0')}
            </div>

            <div className="relative z-10 super-glass p-8 aspect-[4/5] flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <div className="w-16 h-px bg-white/20 group-hover:bg-accent group-hover:w-full transition-all duration-700" />
                    <span className="text-[10px] font-black uppercase text-gray-600 tracking-widest pl-4">Roster 2025</span>
                </div>

                <div className="flex flex-col items-center">
                    <div className="w-40 h-40 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-8 relative group-hover:scale-105 transition-transform duration-700">
                        <div className="absolute inset-0 border-[2px] border-accent/0 group-hover:border-accent/40 rounded-full animate-ping opacity-0 group-hover:opacity-100" />
                        <span className="text-6xl font-display text-white italic opacity-10 group-hover:opacity-100 transition-opacity">{name[0]}</span>
                    </div>
                    <h3 className="text-3xl display-bold tracking-tight text-white group-hover:text-accent transition-colors">{name}</h3>
                    <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] mt-2">Active Performer</p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-12 border-t border-white/5">
                    <div>
                        <p className="text-[8px] font-bold text-gray-600 uppercase tracking-widest mb-1">Efectividad</p>
                        <p className="text-xl font-display text-white italic">{stats.winRate.toFixed(1)}%</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[8px] font-bold text-gray-600 uppercase tracking-widest mb-1">Global Rank</p>
                        <p className="text-xl font-display text-accent italic">#{rank}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
