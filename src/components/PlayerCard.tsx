'use client';

import { motion } from 'framer-motion';
import { getPlayerMetadata } from '@/data/playerMetadata';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

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
    const metadata = getPlayerMetadata(name);

    return (
        <Link href={`/players/${name}`}>
            <motion.div
                whileHover={{ scale: 0.98 }}
                className="group relative cursor-pointer"
            >
                <div className="glass-card overflow-hidden h-[580px] flex flex-col relative">
                    {/* Header */}
                    <div className="p-8 pb-0 flex justify-between items-start z-10">
                        <div className="flex flex-col gap-1">
                            <span className="text-4xl font-black text-white/10 italic">#{rank.toString().padStart(2, '0')}</span>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">{metadata.role}</span>
                        </div>
                        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                            <ArrowUpRight size={18} />
                        </div>
                    </div>

                    {/* Image */}
                    <div className="flex-1 relative mt-4 overflow-hidden mask-fade-bottom">
                        <img
                            src={metadata.photo}
                            alt={name}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
                    </div>

                    {/* Stats & Name */}
                    <div className="p-10 pt-0 z-10">
                        <h3 className="text-5xl font-black tracking-tighter mb-8 leading-none">{name}</h3>

                        <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
                            <div>
                                <p className="text-[8px] font-black text-white/30 uppercase tracking-[0.2em] mb-2">Efficacy</p>
                                <p className="text-3xl font-black leading-none">{stats.winRate.toFixed(0)}%</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[8px] font-black text-white/30 uppercase tracking-[0.2em] mb-2">Score</p>
                                <p className="text-3xl font-black leading-none">{stats.points}</p>
                            </div>
                        </div>
                    </div>

                    {/* Accents Pink/Lemon Glow (based on layout metadata) */}
                    <div className={`absolute top-0 right-0 w-32 h-32 blur-[80px] opacity-20 -z-10 bg-accent-${rank % 2 === 0 ? 'pink' : 'lemon'}`} />
                </div>
            </motion.div>
        </Link>
    );
}
