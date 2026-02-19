'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Leaderboard from '@/components/Leaderboard';
import { ArrowRight, Star, Calendar, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden page-transition">
      {/* Background Blobs */}
      <div className="bg-blobs">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      <Navbar />

      {/* HERO SECTION */}
      <section className="pt-40 pb-20 px-6 sm:px-20 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-accent-soft text-accent px-6 py-2 pill-shape font-black text-xs uppercase tracking-[0.4em] mb-12 border border-accent/20"
        >
          Tuesday Football Collective
        </motion.div>

        <h1 className="text-[14vw] sm:text-[10vw] display-text text-gradient mb-12">
          SOFT<br />STADIUM
        </h1>

        <p className="max-w-xl text-gray-500 text-xl font-medium leading-relaxed mb-16">
          Un enfoque refinado para el seguimiento del fútbol amateur. Donde el rendimiento se encuentra con el diseño de vanguardia.
        </p>

        <Link href="/players">
          <button className="btn-pill shadow-xl shadow-gray-200 hover:shadow-gray-300">
            Explore Roster <ArrowRight size={18} className="inline ml-2" />
          </button>
        </Link>
      </section>

      {/* STATS HIGHLIGHTS */}
      <section className="py-20 px-6 sm:px-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          <div className="flex flex-col gap-12">
            <motion.div
              whileHover={{ scale: 0.98 }}
              className="soft-glass card-shape p-16 bg-white/70 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-12 opacity-10">
                <Star size={120} className="fill-accent text-accent" />
              </div>
              <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-4">Player of the Month</p>
              <h2 className="text-6xl font-black mb-4">DIEGO</h2>
              <p className="text-gray-500 font-medium">Liderando con una efectividad del 78% este trimestre.</p>
            </motion.div>

            <div className="grid grid-cols-2 gap-8">
              <div className="soft-glass card-shape p-10 bg-accent text-white border-none shadow-xl shadow-accent/20">
                <Calendar className="mb-6" />
                <h3 className="text-2xl font-black leading-tight">NEXT<br />GAME</h3>
                <p className="mt-4 text-[10px] font-black uppercase opacity-60">Tuesday 21:00</p>
              </div>
              <div className="soft-glass card-shape p-10 bg-white/40">
                <MapPin className="mb-6 text-accent" />
                <h3 className="text-2xl font-black leading-tight">GRUN<br />CLUB</h3>
                <p className="mt-4 text-[10px] font-black uppercase text-gray-400">Amsterdam 12B</p>
              </div>
            </div>
          </div>

          <div className="soft-glass card-shape px-4 py-8 bg-white/40">
            <div className="px-12 py-8 flex justify-between items-center mb-8">
              <h3 className="text-2xl font-black">LEADERBOARD</h3>
              <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Global Standings</span>
            </div>
            <Leaderboard />
          </div>

        </div>
      </section>

      <footer className="py-20 text-center">
        <p className="text-[11px] font-black uppercase tracking-[0.5em] text-gray-300">© 2026 Soft Stadium Collective</p>
      </footer>
    </main>
  );
}
