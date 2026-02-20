'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import {
  Trophy,
  Users,
  History,
  Zap,
  ChevronDown,
  Star,
  PlusSquare
} from 'lucide-react';
import Link from 'next/link';
import { getGlobalStats, getLeaderboard } from '@/lib/stats';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';

function PlayerBubble({ player, index }: { player: any, index: number }) {
  const [photo, setPhoto] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPhoto() {
      if (!supabase) return;
      const { data } = await supabase
        .from('player_profiles')
        .select('photo_url')
        .eq('name', player.name)
        .single();
      if (data?.photo_url) setPhoto(data.photo_url);
    }
    fetchPhoto();
  }, [player.name]);

  return (
    <Link href={`/players/${player.name}`}>
      <motion.div
        whileTap={{ scale: 0.9 }}
        className="flex flex-col items-center gap-3 min-w-[80px]"
      >
        <div className="w-20 h-20 rounded-full bg-gradient-to-b from-white/10 to-transparent border border-white/5 flex items-center justify-center relative overflow-hidden">
          {photo ? (
            <img src={photo} alt={player.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-2xl font-black italic text-white/20 uppercase">{player.name[0]}</span>
          )}
          {index < 3 && (
            <div className="absolute top-1 right-1 w-5 h-5 bg-accent-orange rounded-full flex items-center justify-center border-2 border-[#0A0A0A]">
              <span className="text-[8px] font-black text-black">{index + 1}</span>
            </div>
          )}
        </div>
        <span className="text-[10px] font-black italic uppercase truncate w-20 text-center">{player.name}</span>
      </motion.div>
    </Link>
  );
}

export default function Home() {
  const year = 2025;
  const stats = useMemo(() => getGlobalStats(year), [year]);
  const leaderboard = useMemo(() => getLeaderboard(year), [year]);

  const mainActions = [
    { title: 'Ranking', icon: Trophy, color: 'bg-orange-500', href: '/leaderboard' },
    { title: 'Plantel', icon: Users, color: 'bg-blue-500', href: '/players' },
    { title: 'Historial', icon: History, color: 'bg-zinc-600', href: '/history' },
    { title: 'Nuevo Partido', icon: PlusSquare, color: 'bg-green-500', href: '/admin' },
  ];

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white pb-32">
      {/* SIMPLE APP HEADER */}
      <header className="px-6 pt-14 pb-8 flex justify-between items-end">
        <div>
          <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1">FULBITO 4 EVER</p>
          <div className="flex items-center gap-1 group cursor-pointer">
            <span className="text-xl font-black italic uppercase">Grun Club, Núñez</span>
            <ChevronDown size={18} className="text-white/40 group-hover:text-white transition-all ml-1" />
          </div>
        </div>
      </header>

      <div className="px-6 space-y-8 overflow-x-hidden">

        {/* MAIN HERO CARD (Featured Player) */}
        <section>
          <motion.div
            whileTap={{ scale: 0.98 }}
            className="pwa-card p-8 bg-gradient-to-br from-accent-orange/20 to-transparent border-accent-orange/10 relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-orange/20 blur-[60px]" />
            <div className="flex items-center gap-2 mb-4">
              <Star size={12} className="text-accent-orange fill-accent-orange" />
              <span className="text-[10px] font-black tracking-widest uppercase text-accent-orange">MVP DE LA SEMANA</span>
            </div>
            <h2 className="text-4xl font-black italic tracking-tighter uppercase mb-2">
              {stats.topPlayer?.name || 'KAI'}
            </h2>
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <span className="text-[9px] text-white/30 font-bold uppercase">Victoria</span>
                <span className="text-lg font-black italic text-accent-orange">{stats.topPlayer?.winRate.toFixed(0) || 0}%</span>
              </div>
              <div className="w-[1px] h-8 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-[9px] text-white/30 font-bold uppercase">Puntos</span>
                <span className="text-lg font-black italic">{stats.topPlayer?.points || 0}</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* QUICK ACTIONS GRID */}
        <section>
          <div className="grid grid-cols-2 gap-4">
            {mainActions.map((action, i) => (
              <Link key={action.title} href={action.href} className="block">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/5 border border-white/5 rounded-[32px] p-6 flex flex-col items-center gap-3 transition-all active:bg-white/10"
                >
                  <div className={`${action.color} w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shadow-black/20`}>
                    <action.icon size={24} className="text-black" />
                  </div>
                  <span className="text-xs font-black italic uppercase tracking-wider text-center">{action.title}</span>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>

        {/* HORIZONTAL PLAYERS SCROLL (Favorite stores style) */}
        <section>
          <div className="flex justify-between items-end mb-4 px-1">
            <h3 className="text-sm font-black italic uppercase tracking-widest text-white/40">Los más pesados</h3>
            <Link href="/players" className="text-[10px] font-bold text-accent-orange uppercase tracking-widest">Ver todos</Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-6 px-6">
            {leaderboard.slice(0, 8).map((player, i) => (
              <PlayerBubble key={player.name} player={player} index={i} />
            ))}
          </div>
        </section>

        {/* SEASON TICKER (App stats style) */}
        <section className="bg-white/[0.02] border border-white/5 rounded-[40px] p-8 flex justify-around">
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] font-bold text-white/20 uppercase">Fechas</span>
            <span className="text-2xl font-black italic">{stats.totalMatches}</span>
          </div>
          <div className="w-[1px] h-10 bg-white/5" />
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] font-bold text-white/20 uppercase">Morfi</span>
            <span className="text-2xl font-black italic text-accent-lemon">{stats.morfiMaster?.name.split(' ')[0]}</span>
          </div>
          <div className="w-[1px] h-10 bg-white/5" />
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] font-bold text-white/20 uppercase">Sede</span>
            <span className="text-2xl font-black italic">GRUN</span>
          </div>
        </section>

      </div>

      <Navbar />
    </main>
  );
}
