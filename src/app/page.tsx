'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Leaderboard from '@/components/Leaderboard';
import { Target, Trophy, Flame } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <div className="bg-stadium" />
      <div className="bg-mesh" />
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 pt-40 pb-20 sm:px-6">
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 py-1.5 mb-8 glass-card rounded-full text-[10px] font-black tracking-[0.3em] text-primary uppercase inline-flex items-center gap-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Season 2025 Live
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="title-hero"
          >
            Martes de<br />Fútbol
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 max-w-2xl text-gray-400 text-lg sm:text-xl font-light leading-relaxed"
          >
            Donde se forjan las leyendas y se pagan las birras. El seguimiento definitivo del picado más picante de la semana.
          </motion.p>
        </section>

        {/* Highlight Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {[
            { label: 'El que más sabe', val: 'DIEGO', sub: '92% Efectividad', icon: Trophy, color: 'text-accent' },
            { label: 'Próximo Combate', val: '21:00 HS', sub: 'Sede GRUN', icon: Target, color: 'text-primary' },
            { label: 'En Racha', val: 'KUKA', sub: '4 Ganados al hilo', icon: Flame, color: 'text-rose-500' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="glass-card p-8 group overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-500">
                <item.icon size={80} />
              </div>
              <p className="text-gray-500 text-xs font-black uppercase tracking-widest mb-4">{item.label}</p>
              <p className="text-3xl font-black mb-1">{item.val}</p>
              <p className={`${item.color} font-bold text-sm tracking-tight`}>{item.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="glass-card p-1 sm:p-4 overflow-hidden"
        >
          <div className="px-6 py-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black tracking-tight mb-1 uppercase">Tabla General</h2>
              <p className="text-gray-500 font-medium text-sm">Actualizado al último martes: <span className="text-white">02/12/2025</span></p>
            </div>
          </div>
          <Leaderboard />
        </motion.section>
      </div>

      <footer className="py-20 text-center text-gray-600 text-[10px] font-black uppercase tracking-[0.5em]">
        designed for the elite • 2026 FTBL.APP
      </footer>
    </main>
  );
}
