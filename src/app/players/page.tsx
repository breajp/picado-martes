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

            <section className="pt-32 pb-20 px-6 sm:px-12 max-w-7xl mx-auto">
                <header className="mb-24">
                    <motion.h1
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="title-huge mb-6"
                    >
                        ACTIVE<br /><span className="text-white/20">ROSTER</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="subtitle max-w-xl"
                    >
                        Listado completo de gladiadores registrados para la temporada 2025.
                    </motion.p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
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
