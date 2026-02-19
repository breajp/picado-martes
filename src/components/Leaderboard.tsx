'use client';

import { getLeaderboard } from "@/lib/stats";
import { motion } from 'framer-motion';

export default function Leaderboard() {
    const stats = getLeaderboard();

    return (
        <div className="w-full">
            {/* Header - Hidden on small screens to prevent mess */}
            <div className="hidden sm:grid grid-cols-12 px-10 py-6 text-white/20 text-[10px] font-black uppercase tracking-[0.2em] bg-white/[0.02]">
                <div className="col-span-1">Rank</div>
                <div className="col-span-5">Identity</div>
                <div className="col-span-2 text-center">Score</div>
                <div className="col-span-2 text-center">Matches</div>
                <div className="col-span-2 text-right">Efficacy</div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-white/5">
                {stats.map((player, index) => (
                    <motion.div
                        key={player.name}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className="grid grid-cols-12 px-6 sm:px-10 py-8 items-center group hover:bg-white/[0.02] transition-colors"
                    >
                        {/* Rank - Stays 1 col */}
                        <div className="col-span-1 font-black text-white/10 group-hover:text-white transition-colors">
                            {(index + 1).toString().padStart(2, '0')}
                        </div>

                        {/* Name/Avatar - Takes more space on mobile if needed */}
                        <div className="col-span-7 sm:col-span-5 flex items-center gap-4 sm:gap-6">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/5 flex items-center justify-center font-bold text-base sm:text-lg group-hover:bg-accent-lemon group-hover:text-black transition-all duration-300">
                                {player.name[0]}
                            </div>
                            <div>
                                <h4 className="text-lg sm:text-xl font-bold tracking-tight group-hover:text-accent-lemon transition-colors">{player.name}</h4>
                                <p className="hidden sm:block text-[10px] font-bold text-white/20 uppercase tracking-widest mt-1">Legion Member</p>
                            </div>
                        </div>

                        {/* Score */}
                        <div className="col-span-2 text-center text-xl sm:text-2xl font-black italic">
                            {player.points}
                        </div>

                        {/* Matches - Hidden on mobile if needed */}
                        <div className="hidden sm:block col-span-2 text-center text-sm font-semibold text-white/40">
                            {player.totalGames}
                        </div>

                        {/* Win Rate */}
                        <div className="col-span-2 flex flex-col items-end gap-2">
                            <span className="text-xs sm:text-sm font-black text-white">{player.winRate.toFixed(0)}%</span>
                            <div className="hidden sm:block w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${player.winRate}%` }}
                                    className="h-full bg-white group-hover:bg-accent-lemon transition-colors"
                                />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
