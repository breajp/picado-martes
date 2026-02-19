'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { Save, Plus, Database, AlertCircle } from 'lucide-react';
import { PLAYERS } from '@/data/historicalData';

export default function AdminPage() {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [team1, setTeam1] = useState<string[]>([]);
    const [team2, setTeam2] = useState<string[]>([]);
    const [score1, setScore1] = useState(0);
    const [score2, setScore2] = useState(0);

    const togglePlayer = (name: string, team: 1 | 2) => {
        if (team === 1) {
            if (team1.includes(name)) setTeam1(team1.filter(p => p !== name));
            else {
                setTeam1([...team1, name]);
                setTeam2(team2.filter(p => p !== name));
            }
        } else {
            if (team2.includes(name)) setTeam2(team2.filter(p => p !== name));
            else {
                setTeam2([...team2, name]);
                setTeam1(team1.filter(p => p !== name));
            }
        }
    };

    return (
        <main className="min-h-screen relative pb-60 px-6 sm:px-12">
            <Navbar />

            {/* Background Orbs */}
            <div className="pwa-mesh">
                <div className="mesh-orb-1 opacity-20" />
                <div className="mesh-orb-2 opacity-20" />
            </div>

            <section className="pt-32 max-w-7xl mx-auto">
                <header className="mb-16">
                    <p className="pwa-subtitle mb-4">Master Console</p>
                    <h1 className="pwa-title mb-6">DATA RECEPTION</h1>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Entry Form */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="pwa-card p-10 bg-white/[0.02]">
                            <div className="flex items-center gap-4 mb-10">
                                <Database className="text-accent-orange" />
                                <h2 className="text-2xl font-black italic">NEW MATCH RECORD</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-6">
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-white/30">Match Date</label>
                                    <input
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-accent-orange transition-colors"
                                    />
                                </div>

                                <div className="flex gap-6">
                                    <div className="flex-1 space-y-6">
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-white/30">Team White</label>
                                        <input
                                            type="number"
                                            value={score1}
                                            onChange={(e) => setScore1(parseInt(e.target.value))}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-center text-4xl font-black italic"
                                        />
                                    </div>
                                    <div className="flex-1 space-y-6">
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-white/30">Team Black</label>
                                        <input
                                            type="number"
                                            value={score2}
                                            onChange={(e) => setScore2(parseInt(e.target.value))}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-center text-4xl font-black italic"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Roster Assignment */}
                        <div className="pwa-card p-10">
                            <h3 className="text-sm font-black uppercase tracking-widest text-white/30 mb-8">Squad Assignment</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {PLAYERS.map(player => (
                                    <button
                                        key={player}
                                        onClick={() => togglePlayer(player, team1.includes(player) ? 2 : 1)}
                                        className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-3 ${team1.includes(player) ? 'bg-accent-orange/20 border-accent-orange text-white' :
                                                team2.includes(player) ? 'bg-accent-blue/20 border-accent-blue text-white' :
                                                    'bg-white/5 border-white/10 text-white/40 hover:border-white/20'
                                            }`}
                                    >
                                        <span className="text-xs font-black uppercase italic">{player}</span>
                                        <span className="text-[8px] font-bold uppercase tracking-widest opacity-60">
                                            {team1.includes(player) ? 'T1' : team2.includes(player) ? 'T2' : 'Bench'}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Action Hub */}
                    <div className="space-y-8">
                        <div className="pwa-card p-10 bg-accent-orange text-black">
                            <p className="font-black uppercase tracking-[0.2em] text-[10px] mb-8">Status Check</p>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-sm font-bold">
                                    <span>Total Assigned</span>
                                    <span className="text-2xl font-black">{team1.length + team2.length}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm font-bold opacity-60">
                                    <span>Sync Ready</span>
                                    <span>YES</span>
                                </div>
                            </div>
                            <button className="w-full mt-10 bg-black text-white py-5 rounded-3xl font-black italic flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform">
                                <Save size={20} /> SYNC DATABASE
                            </button>
                        </div>

                        <div className="pwa-card p-8 border-dashed border-white/20">
                            <div className="flex gap-4 text-white/40">
                                <AlertCircle size={20} />
                                <p className="text-xs font-medium leading-relaxed">
                                    Este registro afectará directamente los coeficientes de eficacia y las rachas históricas de los jugadores.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
