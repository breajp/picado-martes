'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Leaderboard from '@/components/Leaderboard';
import { ArrowUpRight, Zap, Trophy, Flame, Calendar } from 'lucide-react';
import Link from 'next/link';
import { getLeaderboard } from '@/lib/stats';

export default function Home() {
  const [year, setYear] = useState<number>(2025);
  const stats = getLeaderboard(year);
  const topPlayer = stats[0];

  return (
    <main className="min-h-screen relative p-6 sm:p-12 pb-40">
      {/* Background Orbs */}
      <div className="pwa-mesh">
        <div className="mesh-orb-1 opacity-20" />
        <div className="mesh-orb-2 opacity-20" />
      </div>

      <Navbar />

      <div className="max-w-7xl mx-auto">
        {/* YEAR SELECTOR */}
        <div className="flex justify-end mb-8 relative z-50">
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
        </div>

        {/* PWA HEADER */}
        <section className="pt-10 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-6"
          >
            <div className="pwa-pill w-fit border-accent-orange/20 text-accent-orange">
              FULBITO 4 EVER // TEMPORADA {year}
            </div>
            <h1 className="pwa-title">
              FULBITO<br />
              <span className="text-white/20">FOR EVER</span>
            </h1>
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between mt-8">
              <p className="max-w-md text-white/50 text-base leading-relaxed">
                Sistema de análisis del picado de los martes. Seguimiento de eficacia, registros históricos y duelos directos.
              </p>
              <Link href="/players">
                <button className="pwa-btn">
                  VER PLANTEL <ArrowUpRight size={16} />
                </button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* BENTO GRID PWA SCREEN */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">

          {/* Primary MVP Module (Orange inspired) */}
          <motion.div
            key={year + (topPlayer?.name || '')}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 0.98 }}
            className="md:col-span-2 pwa-card p-12 relative flex flex-col justify-between min-h-[400px]"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-orange/10 blur-[80px] -z-10" />
            <div className="flex justify-between items-start">
              <Trophy className="text-accent-orange" size={40} strokeWidth={1.5} />
              <span className="pwa-pill">Rango 01</span>
            </div>
            <div>
              <p className="pwa-subtitle mb-3">Líder {year}</p>
              <h2 className="text-7xl font-black italic tracking-tighter uppercase">{topPlayer?.name || '---'}</h2>
            </div>
          </motion.div>

          {/* Stats Module (Blue inspired) */}
          <div className="pwa-card p-10 flex flex-col justify-between min-h-[400px]">
            <div className="flex justify-between items-start">
              <Flame className="text-accent-blue" size={32} />
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[10px] font-bold">5x</div>
            </div>
            <div>
              <p className="pwa-subtitle mb-2">Máxima Eficacia</p>
              <h3 className="text-5xl font-black italic leading-none">{topPlayer?.winRate.toFixed(0) || '0'}%<br />RATIO</h3>
            </div>
          </div>

          {/* Matchup Module */}
          <div className="pwa-card p-10 flex flex-col justify-between min-h-[400px] bg-white/[0.01]">
            <Zap className="text-accent-lemon" size={32} />
            <div className="mt-8">
              <p className="pwa-subtitle mb-2">Frecuencia Semanal</p>
              <p className="text-3xl font-black mb-1 tracking-tight">MARTES</p>
              <p className="text-accent-lemon text-sm font-black tracking-widest leading-none">19:00 HS</p>
            </div>
          </div>

        </section>

        {/* DATA TABLE (OPTIMIZED FOR PWA) */}
        <section>
          <div className="pwa-card overflow-hidden">
            <div className="p-10 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
              <h2 className="text-xl font-black italic uppercase tracking-tighter">Tabla {year}</h2>
              <Link href="/history" className="pwa-pill hover:text-white transition-colors">Ver Historial →</Link>
            </div>
            <div className="overflow-x-auto">
              <Leaderboard year={year} />
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
