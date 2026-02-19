'use client';

import Navbar from '@/components/Navbar';
import PlayerCard from '@/components/PlayerCard';
import { getLeaderboard } from '@/lib/stats';
import { motion } from 'framer-motion';

export default function PlayersPage() {
    const stats = getLeaderboard();

    return (
        <main className="min-h-screen relative pb-60">
            <Navbar />

            {/* Background Orbs */}
            <div className="pwa-mesh">
                <div className="mesh-orb-1 opacity-20" />
                <div className="mesh-orb-2 opacity-20" />
            </div>

            <section className="pt-32 px-6 sm:px-12 max-w-7xl mx-auto">
                <header className="mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <p className="pwa-subtitle mb-4">Base de Datos Táctica</p>
                        <h1 className="pwa-title mb-6">
                            PLANTEL<br /><span className="text-white/20">OPERATIVO</span>
                        </h1>
                    </motion.div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-12 gap-x-6">
                    {stats.map((player, index) => (
                        <motion.div
                            key={player.name}
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
                    ))}
                </div>
            </section>
        </main>
    );
}
