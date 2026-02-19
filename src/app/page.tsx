'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Navbar from '@/components/Navbar';
import Leaderboard from '@/components/Leaderboard';
import { ArrowRight, Trophy, Zap, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <main ref={containerRef} className="relative min-h-[200vh]">
      <Navbar />

      {/* SECTION 1: HERO EDITORIAL */}
      <section className="h-screen flex flex-col justify-end p-6 sm:p-20 relative overflow-hidden">
        <div className="luxury-grid opacity-30" />

        <motion.div style={{ y: textY }} className="relative z-10 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="w-12 h-px bg-accent" />
            <span className="text-accent text-sm font-black uppercase tracking-[0.5em]">Season Two • 2025</span>
          </motion.div>

          <h1 className="text-[12vw] sm:text-[15vw] display-bold leading-none text-gradient mb-12">
            PROPIEDAD<br />DE LOS<br />MARTES
          </h1>

          <div className="flex flex-col sm:flex-row justify-between items-end gap-12">
            <p className="max-w-md text-gray-400 text-lg font-light leading-relaxed">
              La plataforma definitiva para el seguimiento de rendimiento, rivalidades y estadísticas del fútbol amateur más competitivo.
            </p>

            <Link href="/players">
              <button className="magnetic-btn">
                Explorar Plantel <ArrowRight size={18} />
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* SECTION 2: STATS OVERVIEW */}
      <section className="min-h-screen px-6 py-40 sm:px-20 bg-white/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-4">
              <h2 className="text-6xl display-bold mb-8">EL<br /><span className="text-accent italic">ESTADO</span><br />DE LA<br />CANCHA</h2>
              <p className="text-gray-500 font-medium mb-12">Datos en tiempo real sincronizados con cada victoria.</p>

              <div className="space-y-6">
                <div className="super-glass p-8 flex items-center justify-between group">
                  <div>
                    <p className="text-[10px] font-black uppercase text-gray-500 mb-1">Última Sede</p>
                    <p className="text-2xl font-black">GRUN STADIUM</p>
                  </div>
                  <MapPin className="text-accent opacity-20 group-hover:opacity-100 transition-opacity" size={32} />
                </div>
                <div className="super-glass p-8 flex items-center justify-between group border-accent/20">
                  <div>
                    <p className="text-[10px] font-black uppercase text-gray-500 mb-1">MVP de la Semana</p>
                    <p className="text-2xl font-black text-accent">DIEGO BREA</p>
                  </div>
                  <Trophy className="text-accent" size={32} />
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="flex justify-between items-end mb-12">
                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-accent">Global Leaderboard</h3>
                <Link href="/vs" className="text-xs font-bold text-gray-500 hover:text-white transition-colors">Ver Comparativo →</Link>
              </div>
              <div className="super-glass overflow-hidden">
                <Leaderboard />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="h-screen flex flex-col items-center justify-center text-center p-20">
        <h2 className="text-[10vw] display-bold text-white/5 absolute pointer-events-none">FOOTBALL CLUB</h2>
        <div className="relative z-10">
          <p className="text-gray-600 font-black uppercase tracking-[1em] text-[10px] mb-8">Designed for the boys</p>
          <div className="flex gap-4">
            <div className="w-12 h-px bg-white/10" />
            <Zap className="text-accent" />
            <div className="w-12 h-px bg-white/10" />
          </div>
        </div>
      </footer>
    </main>
  );
}
