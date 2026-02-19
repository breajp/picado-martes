'use client';

import { getLeaderboard } from "@/lib/stats";
import { motion } from 'framer-motion';

export default function Leaderboard() {
    const stats = getLeaderboard();

    return (
        <div className="w-full overflow-x-auto">
            <table className="premium-table">
                <thead>
                    <tr className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">
                        <th className="text-center w-20">#</th>
                        <th className="text-left min-w-[200px]">Jugador</th>
                        <th className="text-center">Pts</th>
                        <th className="text-center">PJ</th>
                        <th className="text-center">G</th>
                        <th className="text-center">P</th>
                        <th className="text-right pr-8">Performance</th>
                    </tr>
                </thead>
                <tbody>
                    {stats.map((player, index) => (
                        <motion.tr
                            key={player.name}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="group"
                        >
                            <td className="text-center font-black text-gray-600 group-hover:text-primary transition-colors">
                                {(index + 1).toString().padStart(2, '0')}
                            </td>
                            <td className="text-left font-black text-lg">
                                <span className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xs text-primary group-hover:bg-primary group-hover:text-black transition-all">
                                        {player.name[0]}
                                    </div>
                                    {player.name}
                                </span>
                            </td>
                            <td className="text-center">
                                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-black border border-primary/20">
                                    {player.points}
                                </div>
                            </td>
                            <td className="text-center font-bold text-gray-400">{player.totalGames}</td>
                            <td className="text-center font-bold text-emerald-500">{player.wins}</td>
                            <td className="text-center font-bold text-rose-500">{player.losses}</td>
                            <td className="text-right pr-8">
                                <div className="flex items-center justify-end gap-3">
                                    <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${player.winRate}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1, ease: 'easeOut' }}
                                            className="h-full bg-gradient-to-r from-primary to-secondary"
                                        />
                                    </div>
                                    <span className="text-xs font-black text-gray-400 w-10">{player.winRate.toFixed(0)}%</span>
                                </div>
                            </td>
                        </motion.tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
