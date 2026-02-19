'use client';

import Navbar from '@/components/Navbar';
import { getLeaderboard } from '@/lib/stats';
import { User, Shield, Zap, Target } from 'lucide-react';
import Link from 'next/link';

export default function PlayersPage() {
    const stats = getLeaderboard();

    return (
        <main className="min-h-screen premium-gradient">
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 py-20">
                <header className="mb-16">
                    <h1 className="text-5xl font-black title-gradient mb-4">PLANTEL 2025</h1>
                    <p className="text-gray-400 font-medium">Todos los guerreros que pisan la cancha los martes.</p>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {stats.map((player) => (
                        <div key={player.name} className="glass p-6 rounded-3xl hover:border-primary/50 transition-all group cursor-pointer">
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                                    <User className="text-primary w-8 h-8" />
                                </div>
                                <div className="text-right">
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Puntos</p>
                                    <p className="text-2xl font-black text-primary">{player.points}</p>
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{player.name}</h3>

                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500 flex items-center gap-2"><Shield size={14} /> Efectividad</span>
                                    <span className="font-mono">{player.winRate.toFixed(1)}%</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500 flex items-center gap-2"><Target size={14} /> Partidos</span>
                                    <span className="font-mono">{player.totalGames}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500 flex items-center gap-2"><Zap size={14} /> Victorias</span>
                                    <span className="font-mono text-emerald-400">{player.wins}</span>
                                </div>
                            </div>

                            <button className="w-full mt-6 py-3 bg-white/5 hover:bg-primary hover:text-black rounded-xl text-sm font-bold transition-all">
                                Ver Perfil
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
