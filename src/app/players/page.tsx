'use client';

import Navbar from '@/components/Navbar';
import PlayerCard from '@/components/PlayerCard';
import { getLeaderboard } from '@/lib/stats';
import { motion } from 'framer-motion';

export default function PlayersPage() {
    const stats = getLeaderboard();

    return (
        <main className="min-h-screen relative pb-20">
            <div className="bg-stadium" />
            <div className="bg-mesh" />
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 pt-40">
                <header className="mb-20 text-center sm:text-left">
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-6xl font-black title-hero mb-4"
                    >
                        GLADIADORES
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 text-lg font-light tracking-wide"
                    >
                        Fichas técnicas y rendimiento histórico de los protagonistas del martes.
                    </motion.p>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 sm:gap-8">
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
            </div>
        </main>
    );
}
