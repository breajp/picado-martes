'use client';

import { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import { PLAYERS } from '@/data/historicalData';
import { getHeadToHead, getMergedHistory } from '@/lib/stats';
import { Swords, Activity, TrendingUp, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import MultiPerformanceChart from '@/components/MultiPerformanceChart';

export default function VSPage() {
    const [p1, setP1] = useState(PLAYERS[0]);
    const [p2, setP2] = useState(PLAYERS[1]);

    const h2h = useMemo(() => getHeadToHead(p1, p2), [p1, p2]);
    const combinedHistory = useMemo(() => getMergedHistory(p1, p2), [p1, p2]);

    const totalAgainst = h2h.matchesAgainst;
    const p1DomRate = totalAgainst > 0 ? (h2h.p1WinsAgainst / totalAgainst) * 100 : 50;

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
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-2xl font-black italic uppercase focus:outline-none focus:border-accent-orange transition-colors"
                            >
                                {PLAYERS.map(p => <option key={p} value={p} className="bg-[#111]">{p}</option>)}
                            </select>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* JUNTOS STATS */}
                    <div className="pwa-card p-10 bg-white/[0.02] border-white/5">
                        <div className="flex items-center gap-4 mb-10 text-white/40">
                            <Users size={24} />
                            <h3 className="text-sm font-black italic uppercase tracking-widest">Cuando Juegan Juntos</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <p className="pwa-subtitle mb-1 text-accent-lemon">Victorias</p>
                                <p className="text-5xl font-black italic tabular-nums">{h2h.togetherWins}</p>
                            </div>
                            <div>
                                <p className="pwa-subtitle mb-1 text-white/20">Derrotas</p>
                                <p className="text-5xl font-black italic tabular-nums opacity-40">{h2h.togetherLosses}</p>
                            </div>
                        </div>
                        <div className="mt-8 pt-8 border-t border-white/5 text-xs text-white/30 italic">
                            Total compartido: {h2h.matchesTogether} partidos
                        </div>
                    </div>

                    {/* CONTRA STATS */}
                    <div className="pwa-card p-10 bg-accent-orange text-black">
                        <div className="flex items-center gap-4 mb-10 opacity-60">
                            <Swords size={24} />
                            <h3 className="text-sm font-black italic uppercase tracking-widest text-black">Uno Contra el Otro</h3>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                            <div className="text-center flex-1">
                                <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-60">{p1}</p>
                                <p className="text-6xl font-black italic tabular-nums">{h2h.p1WinsAgainst}</p>
                            </div>
                            <div className="text-xl font-black italic opacity-20 mt-4">VS</div>
                            <div className="text-center flex-1">
                                <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-60">{p2}</p>
                                <p className="text-6xl font-black italic tabular-nums">{h2h.p2WinsAgainst}</p>
                            </div>
                        </div>
                        <div className="mt-8 pt-6 border-t border-black/10">
                            <div className="w-full h-2 bg-black/10 rounded-full overflow-hidden flex">
                                <motion.div initial={{ width: 0 }} animate={{ width: `${p1DomRate}%` }} className="h-full bg-black" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* CHART COMPARISON */}
                <div className="pwa-card p-10 bg-white/[0.01]">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                        <div className="flex items-center gap-4">
                            <TrendingUp className="text-accent-lemon" />
                            <h3 className="text-xl font-black italic uppercase tracking-tighter">Trayectoria Comparada</h3>
                        </div>
                        <div className="flex gap-6">
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-accent-orange" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{p1}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-accent-blue" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{p2}</span>
                            </div>
                        </div>
                    </div>

                    <MultiPerformanceChart data={combinedHistory} players={[p1, p2]} />
                </div>
            </section>
        </main>
    );
}
