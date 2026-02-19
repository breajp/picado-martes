'use client';

import { use, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import { getLeaderboard, getPlayerHistory } from '@/lib/stats';
import { getPlayerMetadata } from '@/data/playerMetadata';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, Activity, Target, Zap, Shield } from 'lucide-react';
import Link from 'next/link';
import PerformanceChart from '@/components/PerformanceChart';

export default function PlayerProfile({ params }: { params: Promise<{ name: string }> }) {
    const { name } = use(params);
    const leaderboard = getLeaderboard();
    const playerStats = leaderboard.find(p => p.name === name);
    const metadata = getPlayerMetadata(name);
    const history = useMemo(() => getPlayerHistory(name), [name]);

    if (!playerStats) return <div className="p-20 text-white">Jugador no encontrado</div>;

    return (
        <main className="min-h-screen relative pb-40">
            <Navbar />

            {/* PWA Backdrop Orbs */}
            <div className="pwa-mesh">
                <div className="mesh-orb-1 opacity-20" />
                <div className="mesh-orb-2 opacity-20" />
            </div>

            {/* MOBILE-FIRST HEADER */}
            <section className="relative h-[65vh] flex items-end p-6 sm:p-12 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={metadata.photo}
                        alt={name}
                        className="w-full h-full object-cover grayscale opacity-50 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-transparent" />
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-start">
                    <Link href="/players" className="mb-12 pwa-pill flex items-center gap-2 hover:bg-white/10 transition-all">
                        <ArrowLeft size={14} /> Volver al Plantel
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full"
                    >
                        <div className="flex justify-between items-end w-full">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="pwa-pill text-accent-orange border-accent-orange/30">RANGO ÉLITE</span>
                                    <span className="text-white/40 text-[9px] font-black uppercase tracking-widest italic">Activo 2025</span>
                                </div>
                                <h1 className="pwa-title text-8xl sm:text-[12vw]">{name}</h1>
                                <p className="text-sm font-black text-white/30 uppercase tracking-[0.4em] mt-4 italic">
                                    Estilo: <span className="text-white italic">{metadata.role}</span>
                                </p>
                            </div>

                            <div className="hidden sm:block text-right">
                                <div className="pwa-card p-6 bg-white/5 border-none">
                                    <p className="pwa-subtitle mb-1">vs Arquetipo</p>
                                    <p className="text-xl font-black italic">{metadata.famousCounterpart}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* PERFORMANCE ANALYTICS SECTION */}
            <section className="px-6 sm:px-12 max-w-7xl mx-auto mt-12 space-y-8">

                {/* KPI DASHBOARD */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="pwa-card p-8 flex flex-col justify-between h-[180px]">
                        <Target size={20} className="text-accent-orange" />
                        <div>
                            <p className="pwa-subtitle">Rango Global</p>
                            <h4 className="text-4xl font-black italic">#{leaderboard.findIndex(p => p.name === name) + 1}</h4>
                        </div>
                    </div>
                    <div className="pwa-card p-8 flex flex-col justify-between h-[180px]">
                        <Zap size={20} className="text-accent-lemon" />
                        <div>
                            <p className="pwa-subtitle">Eficacia</p>
                            <h4 className="text-4xl font-black italic text-accent-lemon">{playerStats.winRate.toFixed(0)}%</h4>
                        </div>
                    </div>
                    <div className="pwa-card p-8 flex flex-col justify-between h-[180px]">
                        <Activity size={20} className="text-accent-blue" />
                        <div>
                            <p className="pwa-subtitle">Puntos</p>
                            <h4 className="text-4xl font-black italic">{playerStats.points}</h4>
                        </div>
                    </div>
                    <div className="pwa-card p-8 flex flex-col justify-between h-[180px]">
                        <Shield size={20} className="text-white/20" />
                        <div>
                            <p className="pwa-subtitle">Partidos</p>
                            <h4 className="text-4xl font-black italic">{playerStats.totalGames}</h4>
                        </div>
                    </div>
                </div>

                {/* TIME SERIES CHART */}
                <div className="pwa-card p-10 bg-white/[0.01]">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="text-xl font-black italic uppercase tracking-tighter">Evolución de Rendimiento</h3>
                            <p className="pwa-subtitle">Seguimiento de % de victorias - Temporada 2025</p>
                        </div>
                        <div className="pwa-pill text-accent-orange">Eficacia x Línea de Tiempo</div>
                    </div>

                    <PerformanceChart data={history} />
                </div>

                {/* ACTION / SHARE */}
                <div className="flex flex-col sm:flex-row gap-4 pt-12">
                    <button className="flex-1 pwa-btn">
                        <Share2 size={16} /> Exportar Reporte de Rendimiento
                    </button>
                    <Link href="/vs" className="flex-1">
                        <button className="w-full btn-modern-dark h-full py-5 rounded-full border border-white/10 text-xs font-black uppercase tracking-widest">
                            Modo Comparación de Duelos
                        </button>
                    </Link>
                </div>
            </section>
        </main>
    );
}
