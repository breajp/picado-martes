'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Leaderboard from '@/components/Leaderboard';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { getLeaderboard } from '@/lib/stats';

export default function LeaderboardPage() {
    const [year, setYear] = useState<number>(2025);
    const stats = getLeaderboard(year);

    return (
        <main className="min-h-screen relative p-6 sm:p-12 pb-80">
            <div className="pwa-mesh">
                <div className="mesh-orb-1 opacity-20" />
                <div className="mesh-orb-2 opacity-20" />
            </div>

            <Navbar />

            <div className="max-w-7xl mx-auto">
                <header className="pt-20 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                    <div>
                        <Link href="/" className="mb-8 pwa-pill inline-flex items-center gap-2 hover:bg-white/10 transition-all text-[10px]">
                            <ArrowLeft size={14} /> Volver a Inicio
                        </Link>
                        <h1 className="pwa-title mb-0">TABLA DE<br /><span className="text-white/20">POSICIONES</span></h1>
                    </div>

                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-1 flex gap-1">
                        {[2024, 2025, 2026].map(y => (
                            <button
                                key={y}
                                onClick={() => setYear(y)}
                                className={`px-6 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all ${year === y ? 'bg-accent-orange text-black' : 'text-white/40 hover:text-white/70'}`}
                            >
                                {y}
                            </button>
                        ))}
                    </div>
                </header>

                <section className="pwa-card overflow-hidden">
                    <div className="overflow-x-auto">
                        <Leaderboard year={year} />
                    </div>
                </section>
            </div>
        </main>
    );
}
