'use client';

import { motion } from 'framer-motion';
import { getPlayerMetadata } from '@/data/playerMetadata';
import Link from 'next/link';

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
                whileHover={{ y: -10 }}
                className="group relative cursor-pointer"
            >
                <div className="soft-glass card-shape overflow-hidden flex flex-col h-[520px]">
                    {/* Rank Badge */}
                    <div className="absolute top-8 left-8 z-20 bg-white/80 backdrop-blur-md px-4 py-2 pill-shape border border-white shadow-sm font-black text-sm">
                        #{rank}
                    </div>

                    {/* Photo Section */}
                    <div className="relative h-[65%] w-full overflow-hidden">
                        <img
                            src={metadata.photo}
                            alt={name}
                            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Soft Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent opacity-60" />

                        {/* Accent Orange Sphere (Pinterest Reference Element) */}
                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-accent rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity" />
                    </div>

                    {/* Info Section */}
                    <div className="flex-1 p-10 bg-white/40 flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                                    {metadata.role} • {metadata.nationality}
                                </span>
                                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                            </div>
                            <h3 className="text-4xl font-black tracking-tight text-fg">
                                {name}
                            </h3>
                        </div>

                        {/* Quick Stats Grid */}
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Win Rate</p>
                                <p className="text-2xl font-black text-accent">{stats.winRate.toFixed(0)}%</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Points</p>
                                <p className="text-2xl font-black">{stats.points}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Shadow Hover Element */}
                <div className="absolute -inset-2 bg-gradient-to-br from-accent/10 to-transparent rounded-[52px] -z-10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
        </Link>
    );
}
