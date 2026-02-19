'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import {
  Trophy,
  Users,
  History,
  Zap,
  LayoutDashboard,
  ChevronRight,
  Star,
  Activity,
  Calendar
} from 'lucide-react';
import Link from 'next/link';
import { getGlobalStats } from '@/lib/stats';

export default function Home() {
  const year = 2025;
  const stats = useMemo(() => getGlobalStats(year), [year]);

  const worlds = [
    {
      title: 'Ranking Anual',
      subtitle: 'La tabla de posiciones',
      href: '/leaderboard',
      icon: Trophy,
      color: 'text-accent-orange',
      bg: 'bg-accent-orange/10',
      border: 'border-accent-orange/20'
    },
    {
      title: 'El Plantel',
      subtitle: 'Perfiles e hitos',
      href: '/players',
      icon: Users,
      color: 'text-accent-blue',
      bg: 'bg-accent-blue/10',
      border: 'border-accent-blue/20'
    },
    {
      title: 'Modo Versus',
      subtitle: 'Duelos Cara a Cara',
      href: '/vs',
      icon: Zap,
      color: 'text-accent-lemon',
      bg: 'bg-accent-lemon/10',
      border: 'border-accent-lemon/20'
    },
    {
      title: 'Historial',
      subtitle: 'Registro de Martes',
      href: '/history',
      icon: History,
      color: 'text-white/40',
      bg: 'bg-white/5',
      border: 'border-white/10'
    },
  ];

  return (
    <main className="min-h-screen relative pb-80">
      {/* Background Orbs */}
      <div className="pwa-mesh fixed inset-0">
        <div className="mesh-orb-1 opacity-20" />
        <div className="mesh-orb-2 opacity-20" />
      </div>

      <Navbar />

      <div className="relative z-10 px-6 sm:px-12 pt-20 max-w-7xl mx-auto">

        {/* HEADER AREA */}
        <header className="flex justify-between items-center mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="pwa-subtitle mb-2"
            >
              ¡BIENVENIDO, CAMPEÓN!
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-black italic uppercase tracking-tighter"
            >
              FULBITO 4 EVER
            </motion.h1>
          </div>
          <Link href="/admin">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all cursor-pointer">
              <LayoutDashboard size={20} className="text-white/40" />
            </div>
          </Link>
        </header>

        {/* FEATURED SEASON CARD */}
        <section className="mb-12">
          <motion.div
            whileHover={{ scale: 0.99 }}
            className="pwa-card p-10 bg-gradient-to-br from-white/[0.03] to-transparent border-white/10 relative overflow-hidden flex flex-col md:flex-row gap-12 items-center"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-orange/10 blur-[100px] -z-10" />

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-6">
                <Star size={16} className="text-accent-orange fill-accent-orange" />
                <span className="text-[10px] font-black tracking-widest uppercase text-accent-orange">Temporada {year}</span>
              </div>
              <h2 className="text-5xl font-black italic uppercase tracking-tighter mb-4 leading-none">
                EL REINO DE<br />
                <span className="text-accent-orange">{stats.topPlayer?.name || '---'}</span>
              </h2>
              <p className="text-white/40 text-xs font-bold leading-relaxed max-w-md">
                Dominando la cima con un ratio de victoria del {stats.topPlayer?.winRate.toFixed(0)}%.
                Quedan {31 - stats.totalMatches} fechas para que termine el calendario oficial.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
              <div className="p-6 rounded-[32px] bg-white/5 border border-white/5 min-w-[140px]">
                <Activity size={20} className="text-accent-blue mb-4" />
                <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-1">Partidos</p>
                <h4 className="text-2xl font-black italic text-accent-blue">{stats.totalMatches}</h4>
              </div>
              <div className="p-6 rounded-[32px] bg-white/5 border border-white/5 min-w-[140px]">
                <Calendar size={20} className="text-accent-lemon mb-4" />
                <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-1">Día Fijo</p>
                <h4 className="text-2xl font-black italic text-accent-lemon">MARTES</h4>
              </div>
            </div>
          </motion.div>
        </section>

        {/* NAVIGATION WORLDS */}
        <section className="mb-12">
          <h3 className="text-[10px] font-black text-white/20 tracking-[0.4em] uppercase mb-8">Explorar el Ecosistema</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {worlds.map((world, i) => (
              <Link key={world.title} href={world.href}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className={`pwa-card p-8 group relative overflow-hidden h-full flex flex-col justify-between min-h-[180px] cursor-pointer ${world.bg} ${world.border}`}
                >
                  <div className="flex justify-between items-start">
                    <world.icon className={`${world.color}`} size={28} />
                    <ChevronRight size={16} className="text-white/10 group-hover:translate-x-1 group-hover:text-white transition-all" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black italic uppercase tracking-tighter mb-1">{world.title}</h4>
                    <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest">{world.subtitle}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>

        {/* QUICK STATS ROW */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="pwa-card p-8 bg-white/[0.01] border-white/5 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-2">Morfi Master</p>
              <h5 className="text-2xl font-black italic uppercase italic">{stats.morfiMaster?.name}</h5>
            </div>
            <div className="text-right">
              <p className="text-[20px] font-black text-accent-lemon italic">{stats.morfiMaster?.morfiRate.toFixed(0)}%</p>
              <p className="text-[8px] font-bold text-white/10 uppercase tracking-widest">Rate Semanal</p>
            </div>
          </div>
          <div className="pwa-card p-8 bg-white/[0.01] border-white/5 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-2">Plantel Total</p>
              <h5 className="text-2xl font-black italic uppercase italic">{stats.playerCount} Jugadores</h5>
            </div>
            <div className="text-right">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full bg-white/10 border-2 border-bg" />
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
