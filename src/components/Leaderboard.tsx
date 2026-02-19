import { getLeaderboard, PlayerStats } from "@/lib/stats";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp } from "lucide-react";

interface LeaderboardProps {
    year?: number;
}

type SortKey = 'points' | 'winRate' | 'morfiRate' | 'totalGames' | 'wins' | 'losses';

export default function Leaderboard({ year }: LeaderboardProps) {
    const rawStats = getLeaderboard(year);
    const [sortConfig, setSortConfig] = useState<{ key: SortKey, direction: 'asc' | 'desc' }>({
        key: 'points',
        direction: 'desc'
    });

    const stats = useMemo(() => {
        return [...rawStats].sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }, [rawStats, sortConfig]);

    const handleSort = (key: SortKey) => {
        setSortConfig(prev => ({
            key,
            direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc'
        }));
    };

    const SortIcon = ({ column }: { column: SortKey }) => {
        if (sortConfig.key !== column) return <ChevronDown size={10} className="opacity-0 group-hover:opacity-100" />;
        return sortConfig.direction === 'desc' ? <ChevronDown size={10} className="text-accent-orange" /> : <ChevronUp size={10} className="text-accent-orange" />;
    };

    return (
        <div className="w-full">
            {/* Header - Ahora visible en mobile de forma simplificada */}
            <div className="grid grid-cols-12 px-6 sm:px-10 py-6 text-white/20 text-[9px] font-black uppercase tracking-[0.3em] bg-white/[0.01] border-b border-white/5">
                <div className="col-span-1">#</div>
                <div className="col-span-5 sm:col-span-3 cursor-pointer hover:text-white transition-colors flex items-center gap-1 group" onClick={() => handleSort('totalGames')}>
                    Jugador <SortIcon column="totalGames" />
                </div>
                <div className="col-span-2 sm:col-span-1 text-center cursor-pointer hover:text-white transition-colors flex items-center justify-center gap-1 group" onClick={() => handleSort('totalGames')}>
                    PJ <SortIcon column="totalGames" />
                </div>
                <div className="col-span-2 sm:col-span-1 text-center cursor-pointer hover:text-white transition-colors flex items-center justify-center gap-1 group" onClick={() => handleSort('points')}>
                    Pts <SortIcon column="points" />
                </div>
                <div className="hidden sm:flex col-span-1 text-center cursor-pointer hover:text-white transition-colors items-center justify-center gap-1 group" onClick={() => handleSort('wins')}>
                    W <SortIcon column="wins" />
                </div>
                <div className="hidden sm:flex col-span-1 text-center cursor-pointer hover:text-white transition-colors items-center justify-center gap-1 group" onClick={() => handleSort('losses')}>
                    L <SortIcon column="losses" />
                </div>
                <div className="col-span-2 text-center cursor-pointer hover:text-white transition-colors flex items-center justify-center gap-1 group" onClick={() => handleSort('winRate')}>
                    % <SortIcon column="winRate" />
                </div>
                <div className="hidden sm:flex col-span-2 text-right cursor-pointer hover:text-white transition-colors items-center justify-end gap-1 group" onClick={() => handleSort('morfiRate')}>
                    Morfi <SortIcon column="morfiRate" />
                </div>
            </div>

            <div className="divide-y divide-white/[0.03]">
                {stats.length > 0 ? stats.map((player, index) => (
                    <Link key={player.name} href={`/players/${player.name}`}>
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.01 }}
                            className="grid grid-cols-12 px-6 sm:px-10 py-6 sm:py-7 items-center group hover:bg-white/[0.02] transition-colors cursor-pointer relative"
                        >
                            <div className="col-span-1 font-black text-white/10 text-[10px] sm:text-xs italic tabular-nums">
                                {(index + 1).toString().padStart(2, '0')}
                            </div>

                            <div className="col-span-5 sm:col-span-3 flex items-center gap-3 sm:gap-5">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white/5 border border-white/5 flex items-center justify-center font-bold text-xs sm:text-sm group-hover:bg-white group-hover:text-black transition-all shrink-0">
                                    {player.name[0]}
                                </div>
                                <div className="min-w-0">
                                    <h4 className="text-sm sm:text-base font-black tracking-tight group-hover:text-white transition-colors uppercase italic truncate">{player.name}</h4>
                                    {/* Morfi Bar for mobile - absolute or relative below */}
                                    <div className="sm:hidden mt-1 w-12 h-0.5 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-accent-lemon" style={{ width: `${player.morfiRate}%` }} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-2 sm:col-span-1 text-center text-sm sm:text-lg font-black tabular-nums opacity-60 sm:opacity-100">
                                {player.totalGames}
                            </div>

                            <div className="col-span-2 sm:col-span-1 text-center text-sm sm:text-xl font-black tabular-nums italic">
                                {player.points}
                            </div>

                            <div className="hidden sm:block col-span-1 text-center text-sm font-bold tabular-nums opacity-40 group-hover:opacity-100 transition-opacity">
                                {player.wins}
                            </div>

                            <div className="hidden sm:block col-span-1 text-center text-sm font-bold tabular-nums opacity-40 group-hover:opacity-100 transition-opacity">
                                {player.losses}
                            </div>

                            <div className="col-span-2 text-center text-sm sm:text-xl font-black tabular-nums italic text-accent-orange">
                                {player.winRate.toFixed(0)}%
                            </div>

                            <div className="hidden sm:flex col-span-2 text-right flex-col items-end gap-1.5 font-black">
                                <div className="flex items-center gap-2">
                                    <span className={`text-xl tabular-nums italic ${player.morfiRate >= 70 ? 'text-accent-lemon' : player.morfiRate < 30 ? 'text-red-500' : 'text-white'}`}>
                                        {player.morfiRate.toFixed(0)}%
                                    </span>
                                </div>
                                <div className="w-24 h-1 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${player.morfiRate}%` }}
                                        className="h-full bg-accent-lemon"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </Link>
                )) : (
                    <div className="p-20 text-center text-white/20 text-xs font-black uppercase tracking-widest">
                        Sin registros para este periodo
                    </div>
                )}
            </div>
        </div>
    );
}
