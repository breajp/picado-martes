'use client';

import { getLeaderboard } from "@/lib/stats";
import { motion } from 'framer-motion';

export default function Leaderboard() {
    const stats = getLeaderboard();

    return (
        <div className="w-full">
            <div className="hidden sm:grid grid-cols-12 px-8 py-6 text-gray-600 text-[10px] font-black uppercase tracking-[0.2em] border-b border-white/5">
                <div className="col-span-1">#</div>
                <div className="col-span-5">Protagonista</div>
                <div className="col-span-2 text-center">Pts</div>
                <div className="col-span-2 text-center">G/P</div>
                <div className="col-span-2 text-right">Ratio</div>
            </div>

            <div className="divide-y divide-white/5">
                {stats.map((player, index) => (
                    <motion.div
                        key={player.name}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className="grid grid-cols-12 px-8 py-8 items-center group cursor-pointer hover:bg-white/[0.02] transition-colors"
                    >
                        <div className="col-span-1 font-display text-2xl text-white/10 group-hover:text-accent transition-colors">
                            {(index + 1).toString().padStart(2, '0')}
                        </div>

                        <div className="col-span-11 sm:col-span-5 flex items-center gap-6">
                            <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center font-black group-hover:border-accent group-hover:bg-accent group-hover:text-black transition-all">
                                {player.name[0]}
                            </div>
                            <div>
                                <h4 className="text-xl font-bold tracking-tight uppercase group-hover:text-accent transition-colors">{player.name}</h4>
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{player.totalGames} Partidos</p>
                            </div>
                        </div>

                        <div className="hidden sm:block col-span-2 text-center">
                            <span className="text-2xl font-display text-white italic">{player.points}</span>
                        </div>

                        <div className="hidden sm:block col-span-2 text-center">
                            <div className="flex justify-center items-center gap-3">
                                <span className="text-emerald-400 font-bold">{player.wins}</span>
                                <span className="text-gray-700">|</span>
                                <span className="text-rose-500 font-bold">{player.losses}</span>
                            </div>
                        </div>

                        <div className="col-span-12 sm:col-span-2 text-right mt-4 sm:mt-0">
                            <div className="flex flex-col items-end gap-2">
                                <span className="text-sm font-black group-hover:text-accent transition-colors">{player.winRate.toFixed(0)}%</span>
                                <div className="w-20 h-[2px] bg-white/5 relative">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${player.winRate}%` }}
                                        className="absolute inset-0 bg-accent shadow-[0_0_10px_var(--accent)]"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
