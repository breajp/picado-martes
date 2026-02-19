'use client';

import { getLeaderboard } from "@/lib/stats";
import { motion } from 'framer-motion';
import Link from 'next/link';

interface LeaderboardProps {
    year?: number;
}

export default function Leaderboard({ year }: LeaderboardProps) {
    const stats = getLeaderboard(year);

    return (
        <div className="w-full">
            <div className="hidden sm:grid grid-cols-12 px-10 py-6 text-white/20 text-[9px] font-black uppercase tracking-[0.3em] bg-white/[0.01]">
                <div className="col-span-1">Pos</div>
                <div className="col-span-6">Jugador</div>
                <div className="col-span-2 text-center">Puntos</div>
                <div className="col-span-3 text-right">Efectividad</div>
            </div>

            <div className="divide-y divide-white/[0.03]">
                {stats.length > 0 ? stats.map((player, index) => (
                    <Link key={player.name} href={`/players/${player.name}`}>
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="grid grid-cols-12 px-8 sm:px-10 py-7 items-center group hover:bg-white/[0.02] transition-colors cursor-pointer"
                        >
                            <div className="col-span-1 font-black text-white/10 text-xs italic">
                                {(index + 1).toString().padStart(2, '0')}
                            </div>

                            <div className="col-span-7 sm:col-span-6 flex items-center gap-5">
                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center font-bold text-sm group-hover:bg-white group-hover:text-black transition-all">
                                    {player.name[0]}
                                </div>
                                <div>
                                    <h4 className="text-base font-black tracking-tight group-hover:text-white transition-colors uppercase italic">{player.name}</h4>
                                    <p className="text-[8px] font-bold text-white/20 uppercase tracking-widest mt-0.5">Nivel Élite // Activo</p>
                                </div>
                            </div>

                            <div className="col-span-2 text-center text-xl font-black tabular-nums italic">
                                {player.points}
                            </div>

                            <div className="col-span-2 text-right">
                                <div className="flex flex-col items-end gap-1.5">
                                    <span className="text-xs font-black text-white/80 tabular-nums">{player.winRate.toFixed(0)}%</span>
                                    <div className="w-12 h-0.5 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${player.winRate}%` }}
                                            className="h-full bg-accent-orange"
                                        />
                                    </div>
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
