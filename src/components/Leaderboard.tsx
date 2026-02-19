'use client';

import { getLeaderboard } from "@/lib/stats";
import { motion } from 'framer-motion';

export default function Leaderboard() {
    const stats = getLeaderboard();

    return (
        <div className="w-full">
            <div className="hidden sm:grid grid-cols-12 px-12 py-6 text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">
                <div className="col-span-1">#</div>
                <div className="col-span-5">Player</div>
                <div className="col-span-2 text-center">Pts</div>
                <div className="col-span-4 text-right">Win Rate</div>
            </div>

            <div className="space-y-4 px-4 pb-8">
                {stats.slice(0, 10).map((player, index) => (
                    <motion.div
                        key={player.name}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className="grid grid-cols-12 px-8 py-6 items-center bg-white/20 hover:bg-white/60 transition-all card-shape group cursor-pointer border border-white/40"
                    >
                        <div className="col-span-1 font-black text-gray-300 group-hover:text-accent transition-colors">
                            {(index + 1).toString().padStart(2, '0')}
                        </div>

                        <div className="col-span-11 sm:col-span-5 flex items-center gap-6">
                            <div className="w-10 h-10 pill-shape bg-accent-soft text-accent flex items-center justify-center font-black">
                                {player.name[0]}
                            </div>
                            <h4 className="text-lg font-black tracking-tight">{player.name}</h4>
                        </div>

                        <div className="hidden sm:block col-span-2 text-center text-xl font-black">
                            {player.points}
                        </div>

                        <div className="col-span-12 sm:col-span-4 text-right mt-4 sm:mt-0 flex flex-col items-end gap-2">
                            <span className="text-sm font-black text-accent">{player.winRate.toFixed(0)}%</span>
                            <div className="w-24 h-[6px] bg-white/40 pill-shape overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${player.winRate}%` }}
                                    className="h-full bg-accent"
                                />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
