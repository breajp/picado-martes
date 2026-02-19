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
                className="group relative cursor-pointer h-full"
            >
                <div className="glass-card h-[600px] flex flex-col relative group-hover:border-white/20">
                    {/* Rank Overlay */}
                    <div className="absolute top-8 left-8 z-30 flex flex-col">
                        <span className="text-4xl font-black text-white/10 group-hover:text-white/20 transition-colors italic leading-none">
                            #{rank.toString().padStart(2, '0')}
                        </span>
                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 mt-1">Legion Rank</span>
                    </div>

                    <div className="absolute top-8 right-8 z-30">
                        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                            <ArrowUpRight size={16} />
                        </div>
                    </div>

                    {/* Editorial Image with Sophisticated Mask */}
                    <div className="relative h-[65%] w-full overflow-hidden mask-fade-bottom mt-4">
                        <img
                            src={metadata.photo}
                            alt={name}
                            className="w-full h-full object-cover grayscale transition-all duration-[1.5s] ease-out group-hover:grayscale-0 group-hover:scale-110"
                        />
                        {/* Soft Overlay for text readability */}
                        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg via-bg/40 to-transparent" />

                        {/* Visual Flair: Floating Status */}
                        <div className="absolute bottom-10 left-8 flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent-lemon animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Verified {metadata.nationality}</span>
                        </div>
                    </div>

                    {/* Content Block */}
                    <div className="flex-1 p-8 pt-0 flex flex-col justify-between z-10">
                        <div>
                            <h3 className="text-5xl font-black tracking-tighter leading-none mb-2 group-hover:text-accent-lemon transition-colors">
                                {name}
                            </h3>
                            <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">{metadata.role}</p>
                        </div>

                        {/* Performance KPIs Section */}
                        <div className="grid grid-cols-2 gap-8 border-t border-white/5 pt-8">
                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <span className="text-[8px] font-bold text-white/30 uppercase tracking-widest">Intensity</span>
                                    <span className="text-xs font-black text-white/80">{metadata.intensity}%</span>
                                </div>
                                <div className="h-0.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${metadata.intensity}%` }}
                                        className="h-full bg-white group-hover:bg-accent-pink transition-colors"
                                    />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <span className="text-[8px] font-bold text-white/30 uppercase tracking-widest">Creativity</span>
                                    <span className="text-xs font-black text-white/80">{metadata.creativity}%</span>
                                </div>
                                <div className="h-0.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${metadata.creativity}%` }}
                                        className="h-full bg-white group-hover:bg-accent-blue transition-colors"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between items-end mt-4">
                            <div>
                                <p className="text-[8px] font-black text-white/20 uppercase tracking-widest mb-1">Success Rate</p>
                                <p className="text-3xl font-black italic text-accent-lemon leading-none">{stats.winRate.toFixed(0)}%</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[8px] font-black text-white/20 uppercase tracking-widest mb-1">Global Score</p>
                                <p className="text-3xl font-black text-white leading-none">{stats.points}</p>
                            </div>
                        </div>
                    </div>

                    {/* Background Glow specific to card */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
                    <div className={`absolute top-0 right-0 w-32 h-32 blur-[80px] opacity-10 -z-10 bg-accent-${rank % 2 === 0 ? 'pink' : 'lemon'}`} />
                </div>
            </motion.div>
        </Link>
    );
}
