'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { PLAYERS } from '@/data/historicalData';
import { Save, Plus, Trash2, Shield } from 'lucide-react';

export default function AdminPage() {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [location, setLocation] = useState('GRUN');
    const [matchResults, setMatchResults] = useState<{ name: string, result: number }[]>([]);

    const addPlayer = (name: string) => {
        if (matchResults.find(p => p.name === name)) return;
        if (matchResults.length >= 10) {
            alert("Máximo 10 jugadores (5 vs 5)");
            return;
        }
        setMatchResults([...matchResults, { name, result: 1 }]);
    };

    const removePlayer = (name: string) => {
        setMatchResults(matchResults.filter(p => p.name !== name));
    };

    const toggleResult = (name: string) => {
        setMatchResults(matchResults.map(p =>
            p.name === name ? { ...p, result: p.result === 1 ? -1 : 1 } : p
        ));
    };

    return (
        <main className="min-h-screen premium-gradient">
            <Navbar />

            <div className="max-w-4xl mx-auto px-6 py-20">
                <header className="mb-12 flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl font-black title-gradient mb-2">PANEL DE ADMIN</h1>
                        <p className="text-gray-400 font-medium">Registra el resultado del partido del martes.</p>
                    </div>
                    <button className="bg-primary text-black px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-primary/20">
                        <Save size={20} /> Guardar Partido
                    </button>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Config */}
                    <div className="md:col-span-1 space-y-6">
                        <div className="glass p-6 rounded-3xl">
                            <label className="block text-gray-500 text-xs font-bold uppercase tracking-widest mb-4">Fecha</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-primary outline-none"
                            />
                        </div>

                        <div className="glass p-6 rounded-3xl">
                            <label className="block text-gray-500 text-xs font-bold uppercase tracking-widest mb-4">Lugar</label>
                            <select
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-primary outline-none"
                            >
                                <option value="GRUN">GRUN</option>
                                <option value="KDT">KDT</option>
                                <option value="EL POLI">EL POLI</option>
                                <option value="DISTRITO">DISTRITO</option>
                            </select>
                        </div>

                        <div className="glass p-6 rounded-3xl">
                            <label className="block text-gray-500 text-xs font-bold uppercase tracking-widest mb-4">Añadir Jugador</label>
                            <div className="grid grid-cols-2 gap-2">
                                {PLAYERS.map(p => (
                                    <button
                                        key={p}
                                        onClick={() => addPlayer(p)}
                                        disabled={matchResults.some(mr => mr.name === p)}
                                        className="text-[10px] font-bold p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                    >
                                        + {p}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Teams / Results */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="glass p-8 rounded-3xl min-h-[400px]">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-xl font-bold flex items-center gap-2"><Shield className="text-primary" /> Jugadores en el Partido</h3>
                                <span className="text-sm font-mono text-gray-500">{matchResults.length}/10</span>
                            </div>

                            {matchResults.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-64 text-gray-600 border-2 border-dashed border-white/5 rounded-2xl">
                                    <Plus size={48} className="mb-4 opacity-20" />
                                    <p>Selecciona a los 10 jugadores que jugaron</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {matchResults.map((player) => (
                                        <div key={player.name} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-all">
                                            <span className="font-bold text-lg">{player.name}</span>

                                            <div className="flex items-center gap-4">
                                                <button
                                                    onClick={() => toggleResult(player.name)}
                                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${player.result === 1
                                                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20'
                                                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/20'
                                                        }`}
                                                >
                                                    {player.result === 1 ? 'GANÓ' : 'PERDIÓ'}
                                                </button>

                                                <button
                                                    onClick={() => removePlayer(player.name)}
                                                    className="p-2 text-gray-500 hover:text-rose-400 transition-colors"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {matchResults.length > 0 && (
                                <div className="mt-8 pt-8 border-t border-white/5 flex justify-between text-sm">
                                    <span className="text-emerald-400 font-bold">Ganadores: {matchResults.filter(p => p.result === 1).length}</span>
                                    <span className="text-rose-400 font-bold">Perdedores: {matchResults.filter(p => p.result === -1).length}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
