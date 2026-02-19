'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { PLAYERS } from '@/data/historicalData';
import { getHeadToHead } from '@/lib/stats';
import { Swords, Users, Trophy, TrendingUp } from 'lucide-react';

export default function VSPage() {
    const [p1, setP1] = useState(PLAYERS[0]);
    const [p2, setP2] = useState(PLAYERS[1]);

    const stats = getHeadToHead(p1, p2);

    return (
        <main className="min-h-screen premium-gradient">
            <Navbar />

            <div className="max-w-4xl mx-auto px-6 py-20">
                <header className="text-center mb-16">
                    <h1 className="text-5xl font-black title-gradient mb-4">CARA A CARA</h1>
                    <p className="text-gray-400 font-medium">Compara el historial entre dos leyendas del martes.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-12">
                    {/* Player 1 Selector */}
                    <div className="glass p-8 rounded-3xl text-center">
                        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-primary/20">
                            <span className="text-3xl font-black text-primary">{p1[0]}</span>
                        </div>
                        <select
                            value={p1}
                            onChange={(e) => setP1(e.target.value)}
                            className="bg-transparent text-xl font-bold text-center w-full focus:outline-none cursor-pointer"
                        >
                            {PLAYERS.map(p => <option key={p} value={p} className="bg-background">{p}</option>)}
                        </select>
                        <p className="text-gray-500 text-sm mt-2">Jugador A</p>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center border border-white/10 shadow-2xl">
                            <Swords className="text-primary w-8 h-8" />
                        </div>
                        <div className="h-20 w-px bg-gradient-to-b from-white/10 to-transparent mt-4" />
                    </div>

                    {/* Player 2 Selector */}
                    <div className="glass p-8 rounded-3xl text-center">
                        <div className="w-24 h-24 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-secondary/20">
                            <span className="text-3xl font-black text-secondary">{p2[0]}</span>
                        </div>
                        <select
                            value={p2}
                            onChange={(e) => setP2(e.target.value)}
                            className="bg-transparent text-xl font-bold text-center w-full focus:outline-none cursor-pointer"
                        >
                            {PLAYERS.map(p => <option key={p} value={p} className="bg-background">{p}</option>)}
                        </select>
                        <p className="text-gray-500 text-sm mt-2">Jugador B</p>
                    </div>
                </div>

                {/* Results */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                    <div className="glass p-8 rounded-3xl flex items-center gap-6">
                        <div className="p-4 bg-primary/10 rounded-2xl">
                            <Users className="text-primary w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">Jugaron Juntos</p>
                            <p className="text-3xl font-black">{stats.matchesTogether} PARTIDOS</p>
                        </div>
                    </div>

                    <div className="glass p-8 rounded-3xl flex items-center gap-6">
                        <div className="p-4 bg-accent/10 rounded-2xl">
                            <TrendingUp className="text-accent w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">Enfrentamientos</p>
                            <p className="text-3xl font-black">{stats.matchesAgainst} VECES</p>
                        </div>
                    </div>

                    <div className="md:col-span-2 glass p-10 rounded-3xl overflow-hidden relative">
                        <h3 className="text-center text-gray-400 text-sm font-bold uppercase tracking-[0.2em] mb-10">Historial de Duelos</h3>

                        <div className="flex justify-between items-end gap-4 h-40">
                            <div className="flex-1 flex flex-col items-center">
                                <span className="text-4xl font-black mb-4">{stats.p1WinsAgainst}</span>
                                <div
                                    className="w-full bg-primary rounded-t-xl transition-all duration-500"
                                    style={{ height: `${(stats.p1WinsAgainst / (stats.matchesAgainst || 1)) * 100}%` }}
                                />
                                <span className="mt-4 font-bold text-primary">{p1}</span>
                            </div>

                            <div className="flex-1 flex flex-col items-center">
                                <span className="text-4xl font-black mb-4">{stats.p2WinsAgainst}</span>
                                <div
                                    className="w-full bg-secondary rounded-t-xl transition-all duration-500"
                                    style={{ height: `${(stats.p2WinsAgainst / (stats.matchesAgainst || 1)) * 100}%` }}
                                />
                                <span className="mt-4 font-bold text-secondary">{p2}</span>
                            </div>
                        </div>

                        {stats.matchesAgainst === 0 && (
                            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                                <p className="text-gray-400 font-medium">Nunca se enfrentaron todavía.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
