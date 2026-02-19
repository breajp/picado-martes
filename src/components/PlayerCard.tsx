'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { getPlayerMetadata } from '@/data/playerMetadata';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface PlayerCardProps {
    name: string;
    rank: number;
    stats: {
        points: number;
        winRate: number;
        totalGames: number;
        wins: number;
    };
}

export default function PlayerCard({ name, rank, stats }: PlayerCardProps) {
    const metadata = getPlayerMetadata(name);
    const [displayPhoto, setDisplayPhoto] = useState(metadata.photo);

    useEffect(() => {
        async function fetchPhoto() {
            if (!supabase) return;

            const { data, error } = await supabase
                .from('player_profiles')
                .select('photo_url')
                .eq('name', name)
                .single();

            if (data?.photo_url) {
                setDisplayPhoto(data.photo_url);
            }
        }
        fetchPhoto();
    }, [name]);

    return (
        <Link href={`/players/${name}`}>
            <motion.div
                whileHover={{ y: -10 }}
                className="pwa-card group aspect-[3/4] relative flex flex-col justify-end p-8"
            >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={displayPhoto}
                        alt={name}
                        className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110 opacity-40 group-hover:opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative z-10 space-y-4">
                    <div className="flex justify-between items-start">
                        <span className="text-[10px] font-black italic text-white/30 tracking-[0.3em]">
                            #{rank.toString().padStart(2, '0')}
                        </span>
                    </div>

                    <div>
                        <h3 className="text-6xl font-black italic tracking-tighter leading-none mb-2">{name}</h3>
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/40">{metadata.role}</p>
                    </div>

                    <div className="pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-[8px] font-bold text-white/20 uppercase tracking-widest mb-1">Eficacia</p>
                            <p className="text-xl font-black italic">{stats.winRate.toFixed(0)}%</p>
                        </div>
                        <div>
                            <p className="text-[8px] font-bold text-white/20 uppercase tracking-widest mb-1">Puntos</p>
                            <p className="text-xl font-black italic">{stats.points}</p>
                        </div>
                    </div>
                </div>

                {/* Hover Glow */}
                <div className="absolute -inset-1 bg-accent-orange/20 blur-2xl rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            </motion.div>
        </Link>
    );
}
