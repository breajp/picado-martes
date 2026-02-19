'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Leaderboard from '@/components/Leaderboard';
import { ArrowUpRight, Zap, Trophy, Flame } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen relative p-6 sm:p-12 pb-40">
      {/* Background Orbs */}
      <div className="pwa-mesh">
        <div className="mesh-orb-1 opacity-20" />
        <div className="mesh-orb-2 opacity-20" />
      </div>

      <Navbar />

      <div className="max-w-7xl mx-auto">
        {/* PWA HEADER */}
        <section className="pt-20 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-6"
          >
            <div className="pwa-pill w-fit border-accent-orange/20 text-accent-orange">
              FULBITO 4 EVER // COLECTIVO 2025
            </div>
            <h1 className="pwa-title">
              RENDIMIENTO<br />
              <span className="text-white/20">OPERATIVO</span>
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
            whileHover={{ scale: 0.98 }}
            className="md:col-span-2 pwa-card p-12 relative flex flex-col justify-between min-h-[400px]"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-orange/10 blur-[80px] -z-10" />
            <div className="flex justify-between items-start">
              <Trophy className="text-accent-orange" size={40} strokeWidth={1.5} />
              <span className="pwa-pill">Rango 01</span>
            </div>
            <div>
              <p className="pwa-subtitle mb-3">Líder de la Temporada</p>
              <h2 className="text-7xl font-black italic tracking-tighter">DIEGO B.</h2>
            </div>
          </motion.div>

          {/* Stats Module (Blue inspired) */}
          <div className="pwa-card p-10 flex flex-col justify-between min-h-[400px]">
            <div className="flex justify-between items-start">
              <Flame className="text-accent-blue" size={32} />
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[10px] font-bold">5x</div>
            </div>
            <div>
              <p className="pwa-subtitle mb-2">Mejor Racha</p>
              <h3 className="text-5xl font-black italic leading-none">ESTADO<br />FUEGO</h3>
            </div>
          </div>

          {/* Matchup Module */}
          <div className="pwa-card p-10 flex flex-col justify-between min-h-[400px] bg-white/[0.01]">
            <Zap className="text-accent-lemon" size={32} />
            <div className="mt-8">
              <p className="pwa-subtitle mb-2">Próxima Batalla</p>
              <p className="text-3xl font-black mb-1 tracking-tight">MARTES</p>
              <p className="text-accent-lemon text-sm font-black tracking-widest leading-none">21:00 HS</p>
            </div>
          </div>

        </section>

        {/* DATA TABLE (OPTIMIZED FOR PWA) */}
        <section>
          <div className="pwa-card overflow-hidden">
            <div className="p-10 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
              <h2 className="text-xl font-black italic uppercase tracking-tighter">Métricas Globales</h2>
              <Link href="/history" className="pwa-pill hover:text-white transition-colors">Ver Historial →</Link>
            </div>
            <div className="overflow-x-auto">
              <Leaderboard />
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
