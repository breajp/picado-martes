'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import PlayerCard from '@/components/PlayerCard';
import { getLeaderboard } from '@/lib/stats';
import { motion } from 'framer-motion';

export default function PlayersPage() {
    const [year, setYear] = useState<number>(2025);
    const stats = getLeaderboard(year);

    return (
        <main className="min-h-screen relative pb-60">
            <Navbar />

            {/* Background Orbs */}
            <div className="pwa-mesh">
                <div className="mesh-orb-1 opacity-20" />
                <div className="mesh-orb-2 opacity-20" />
            </div>

            <section className="pt-32 px-6 sm:px-12 max-w-7xl mx-auto">
                <header className="mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <p className="pwa-subtitle mb-4">Base de Datos Táctica</p>
                        <h1 className="pwa-title mb-0">
                            PLANTEL<br /><span className="text-white/20">OPERATIVO</span>
                        </h1>
                    </motion.div>

                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-1 flex gap-1">
                        {[2024, 2025, 2026].map(y => (
                            <button
                                key={y}
                                onClick={() => setYear(y)}
                                className={`px-8 py-3 rounded-xl text-[10px] font-black tracking-widest transition-all ${year === y ? 'bg-accent-orange text-black' : 'text-white/40 hover:text-white/70'}`}
                            >
                                {y}
                            </button>
                        ))}
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-12 gap-x-6">
                    {stats.length > 0 ? stats.map((player, index) => (
                        <motion.div
                            key={player.name + year}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <PlayerCard
                                name={player.name}
                                rank={index + 1}
                                stats={{
                                    points: player.points,
                                    winRate: player.winRate,
                                    totalGames: player.totalGames,
                                    wins: player.wins
                                }}
                            />
                        </motion.div>
                    )) : (
                        <div className="col-span-full p-20 text-center text-white/10 font-black uppercase tracking-widest italic">
                            Sin datos registrados en {year}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
