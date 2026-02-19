'use client';

import { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import { PLAYERS } from '@/data/historicalData';
import { getHeadToHead, getMergedHistory } from '@/lib/stats';
import { Swords, Activity, Zap, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import MultiPerformanceChart from '@/components/MultiPerformanceChart';

export default function VSPage() {
    const [p1, setP1] = useState(PLAYERS[0]);
    const [p2, setP2] = useState(PLAYERS[1]);

    const h2h = useMemo(() => getHeadToHead(p1, p2), [p1, p2]);
    const combinedHistory = useMemo(() => getMergedHistory(p1, p2), [p1, p2]);

    const total = h2h.matchesAgainst;
    const p1Rate = total > 0 ? (h2h.p1WinsAgainst / total) * 100 : 50;

    return (
        <main className="min-h-screen relative pb-60 px-6 sm:px-12">
            <Navbar />

            {/* Background Orbs */}
            <div className="pwa-mesh">
                <div className="mesh-orb-1 opacity-20" />
                <div className="mesh-orb-2 opacity-20" />
            </div>

            <section className="pt-32 max-w-7xl mx-auto">
                <header className="mb-20">
                    <p className="pwa-subtitle mb-4">Análisis de Duelos</p>
                    <h1 className="pwa-title mb-6">MODO<br /><span className="text-white/20">COMPARACIÓN</span></h1>
                </header>

                {/* SELECTORS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    {[{ val: p1, set: setP1, label: "Jugador A" }, { val: p2, set: setP2, label: "Jugador B" }].map((sel, idx) => (
                        <div key={idx} className="pwa-card p-10 bg-white/[0.02]">
                            <p className="pwa-subtitle mb-4">{sel.label}</p>
                            <select
                                value={sel.val}
                                onChange={(e) => sel.set(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-2xl font-black italic uppercase italic focus:outline-none focus:border-accent-orange transition-colors"
                            >
                                {PLAYERS.map(p => <option key={p} value={p} className="bg-[#111]">{p}</option>)}
                            </select>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* H2H DATA */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="pwa-card p-10 bg-accent-orange text-black">
                            <div className="flex justify-between items-center mb-10">
                                <Swords size={32} />
                                <p className="font-black italic text-xl">H2H REAL</p>
                            </div>
                            <div className="space-y-6">
                                <div className="flex justify-between items-end">
                                    <span className="font-bold text-sm">Victorias {p1}</span>
                                    <span className="text-4xl font-black italic">{h2h.p1WinsAgainst}</span>
                                </div>
                                <div className="flex justify-between items-end">
                                    <span className="font-bold text-sm">Victorias {p2}</span>
                                    <span className="text-4xl font-black italic">{h2h.p2WinsAgainst}</span>
                                </div>
                                <div className="pt-6 border-t border-black/10">
                                    <p className="text-[10px] font-black uppercase tracking-widest mb-2">Dominancia Directa</p>
                                    <div className="w-full h-4 bg-black/10 rounded-full overflow-hidden flex">
                                        <motion.div initial={{ width: 0 }} animate={{ width: `${p1Rate}%` }} className="h-full bg-black" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pwa-card p-10 bg-white/[0.02]">
                            <div className="flex items-center gap-4 mb-6">
                                <Activity className="text-accent-blue" />
                                <h3 className="text-sm font-black italic">AFINIDAD COOPERATIVA</h3>
                            </div>
                            <p className="text-white/40 text-xs leading-relaxed">
                                Han compartido equipo en <span className="text-white font-bold">{h2h.matchesTogether}</span> ocasiones durante la temporada actual.
                            </p>
                        </div>
                    </div>

                    {/* CHART COMPARISON */}
                    <div className="lg:col-span-2 pwa-card p-10">
                        <div className="flex justify-between items-center mb-8">
                            <div className="flex items-center gap-4">
                                <TrendingUp className="text-accent-lemon" />
                                <h3 className="text-xl font-black italic uppercase tracking-tighter">Trayectoria Comparada</h3>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-accent-orange" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{p1}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-accent-blue" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{p2}</span>
                                </div>
                            </div>
                        </div>

                        <MultiPerformanceChart data={combinedHistory} players={[p1, p2]} />
                    </div>
                </div>
            </section>
        </main>
    );
}
