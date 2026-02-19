'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Leaderboard from '@/components/Leaderboard';
import { ArrowUpRight, Zap, Target, Star } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen relative pb-40">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="pt-32 pb-20 px-6 sm:px-12 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-start"
        >
          <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-12">
            <span className="w-2 h-2 bg-accent-lemon rounded-full animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Collective Data v2.0</span>
          </div>

          <h1 className="title-huge mb-16">
            DIAGNOSTICO<br />
            <span className="text-white/20">PERFORMANCE</span>
          </h1>

          <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center w-full justify-between">
            <p className="max-w-md subtitle leading-relaxed">
              Analítica avanzada para el seguimiento del fútbol amateur. Evaluamos cada pase, cada victoria y cada racha record.
            </p>

            <Link href="/players">
              <button className="btn-modern flex items-center gap-3">
                View Roster <ArrowUpRight size={20} />
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* 2. HIGHLIGHT HIGHLIGHTS */}
      <section className="px-6 sm:px-12 max-w-7xl mx-auto mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="glass-card p-10 flex flex-col justify-between h-[300px] border-l-4 border-accent-pink">
            <Star className="text-accent-pink" size={32} />
            <div>
              <p className="text-[10px] font-bold uppercase text-white/30 tracking-widest mb-3">Leaderboard MVP</p>
              <h3 className="text-4xl font-black">DIEGO B.</h3>
            </div>
          </div>

          <div className="glass-card p-10 flex flex-col justify-between h-[300px] border-l-4 border-accent-lemon">
            <Zap className="text-accent-lemon" size={32} />
            <div>
              <p className="text-[10px] font-bold uppercase text-white/30 tracking-widest mb-3">Highest Streak</p>
              <h3 className="text-4xl font-black">5 WINS</h3>
            </div>
          </div>

          <div className="glass-card p-10 flex flex-col justify-between h-[300px] border-l-4 border-accent-blue md:col-span-2 lg:col-span-1">
            <Target className="text-accent-blue" size={32} />
            <div>
              <p className="text-[10px] font-bold uppercase text-white/30 tracking-widest mb-3">Next Matchup</p>
              <h3 className="text-4xl font-black">28 JAN 21:00</h3>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TABLE SECTION */}
      <section className="px-6 sm:px-12 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="glass-card overflow-hidden"
        >
          <div className="p-10 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
            <h2 className="text-2xl font-black tracking-tight">TABLA GENERAL</h2>
            <Link href="/vs" className="text-xs font-bold text-white/30 hover:text-white transition-colors">Compare Players →</Link>
          </div>
          <Leaderboard />
        </motion.div>
      </section>
    </main>
  );
}
