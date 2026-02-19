'use client';

import { motion } from 'framer-motion';
import { getPlayerMetadata } from '@/data/playerMetadata';
import Image from 'next/image';
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
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group relative cursor-pointer"
            >
                <div className="absolute inset-0 bg-accent/10 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10 super-glass overflow-hidden h-[500px] flex flex-col">
                    {/* Header Info */}
                    <div className="p-6 flex justify-between items-start border-b border-white/5">
                        <div className="flex flex-col">
                            <span className="text-[40px] display-bold leading-none text-white/10 italic">#{rank.toString().padStart(2, '0')}</span>
                            <span className="text-accent text-[10px] font-black tracking-widest uppercase">{metadata.role}</span>
                        </div>
                        <div className="text-right">
                            <span className="block text-[8px] font-black text-gray-500 uppercase tracking-widest mt-1">Nationality</span>
                            <span className="text-lg font-display text-white italic">{metadata.nationality}</span>
                        </div>
                    </div>

                    {/* Photo Section */}
                    <div className="relative flex-1 grayscale group-hover:grayscale-0 transition-all duration-700 overflow-hidden">
                        <img
                            src={metadata.photo}
                            alt={name}
                            className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />

                        {/* Overlay Title */}
                        <div className="absolute bottom-6 left-6 right-6">
                            <h3 className="text-5xl display-bold leading-none group-hover:text-accent transition-colors">
                                {name}
                            </h3>
                            <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] mt-2">Professional Profile</p>
                        </div>
                    </div>

                    {/* Footer Stats */}
                    <div className="p-6 grid grid-cols-3 gap-2 bg-white/[0.03]">
                        <div className="text-center">
                            <p className="text-[8px] font-black text-gray-500 uppercase mb-1">Efectividad</p>
                            <p className="text-lg font-display text-accent italic">{stats.winRate.toFixed(0)}%</p>
                        </div>
                        <div className="text-center border-x border-white/10">
                            <p className="text-[8px] font-black text-gray-500 uppercase mb-1">Puntos</p>
                            <p className="text-lg font-display text-white italic">{stats.points}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-[8px] font-black text-gray-500 uppercase mb-1">Partidos</p>
                            <p className="text-lg font-display text-white italic">{stats.totalGames}</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
