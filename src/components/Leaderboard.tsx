'use client';

import { getLeaderboard } from "@/lib/stats";
import { motion } from 'framer-motion';

export default function Leaderboard() {
    const stats = getLeaderboard();

    return (
        <div className="w-full">
            {/* Header */}
            <div className="hidden sm:grid grid-cols-12 px-10 py-6 text-white/20 text-[10px] font-black uppercase tracking-[0.2em]">
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
                        className="grid grid-cols-12 px-10 py-8 items-center group cursor-pointer hover:bg-white/[0.02] transition-all"
                    >
                        <div className="col-span-1 font-black text-white/10 group-hover:text-white transition-colors">
                            {(index + 1).toString().padStart(2, '0')}
                        </div>

                        <div className="col-span-11 sm:col-span-5 flex items-center gap-6">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center font-bold text-lg group-hover:bg-white group-hover:text-black transition-all">
                                {player.name[0]}
                            </div>
                            <div>
                                <h4 className="text-xl font-bold tracking-tight">{player.name}</h4>
                                <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mt-1">Verified Member</p>
                            </div>
                        </div>

                        <div className="hidden sm:block col-span-2 text-center text-2xl font-black">
                            {player.points}
                        </div>

                        <div className="hidden sm:block col-span-2 text-center text-sm font-semibold text-white/40">
                            {player.totalGames}
                        </div>

                        <div className="col-span-12 sm:col-span-2 flex flex-col items-end gap-3 mt-4 sm:mt-0">
                            <span className="text-sm font-black text-white">{player.winRate.toFixed(0)}%</span>
                            <div className="w-20 h-1 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${player.winRate}%` }}
                                    className="h-full bg-white"
                                />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
