'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { Save, Plus, Database, AlertCircle, Calendar } from 'lucide-react';
import { PLAYERS } from '@/data/historicalData';
import CustomSelect from '@/components/CustomSelect';

const MORFI_LOCATIONS = [
    { value: 'Marucha', label: 'Marucha' },
    { value: 'Carmin', label: 'Carmin' },
    { value: 'Bouchardo', label: 'Bouchardo' },
    { value: 'Viejo Norton', label: 'Viejo Norton' },
    { value: 'Cantina Florida', label: 'Cantina Florida' },
    { value: 'Lo de Jose', label: 'Lo de Jose' },
    { value: 'San Genaro', label: 'San Genaro' },
    { value: 'Otro', label: 'Otro...' },
];

export default function AdminPage() {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [team1, setTeam1] = useState<string[]>([]);
    const [team2, setTeam2] = useState<string[]>([]);
    const [morfiPlayers, setMorfiPlayers] = useState<string[]>([]);
    const [morfiLocation, setMorfiLocation] = useState('Marucha');
    const [noMorfi, setNoMorfi] = useState(false);
    const [winner, setWinner] = useState<'blancos' | 'negros' | null>(null);

    const cyclePlayerTeam = (name: string) => {
        if (team1.includes(name)) {
            setTeam1(team1.filter(p => p !== name));
            setTeam2([...team2, name]);
        } else if (team2.includes(name)) {
            setTeam2(team2.filter(p => p !== name));
        } else {
            setTeam1([...team1, name]);
        }
    };

    const toggleMorfi = (name: string) => {
        if (morfiPlayers.includes(name)) {
            setMorfiPlayers(morfiPlayers.filter(p => p !== name));
        } else {
            setMorfiPlayers([...morfiPlayers, name]);
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
                    <p className="pwa-subtitle mb-4">Consola Maestra</p>
                    <h1 className="pwa-title mb-6">RECEPCIÓN DE<br /><span className="text-white/20">DATOS</span></h1>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Entry Form */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="pwa-card p-10 bg-white/[0.02]">
                            <div className="flex items-center gap-4 mb-10">
                                <Database className="text-accent-orange" />
                                <h2 className="text-2xl font-black italic uppercase">Nuevo Registro de Partido</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                                <div className="space-y-4">
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-white/30">Fecha del Encuentro</label>
                                    <div className="relative group">
                                        <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent-orange transition-colors pointer-events-none" size={16} />
                                        <input
                                            type="date"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                            className="pwa-input pl-14"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-white/30">Resultado</label>
                                    <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 w-full overflow-hidden">
                                        <button
                                            onClick={() => setWinner('blancos')}
                                            className={`flex-1 py-4 text-[10px] font-black uppercase transition-all ${winner === 'blancos' ? 'bg-accent-orange text-black' : 'text-white/40'}`}
                                        >
                                            Blanco
                                        </button>
                                        <button
                                            onClick={() => setWinner('negros')}
                                            className={`flex-1 py-4 text-[10px] font-black uppercase transition-all ${winner === 'negros' ? 'bg-accent-blue text-white' : 'text-white/40'}`}
                                        >
                                            Negro
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-white/30">Lugar del Morfi</label>
                                        <button
                                            onClick={() => setNoMorfi(!noMorfi)}
                                            className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-md border transition-all ${noMorfi ? 'bg-red-500/20 border-red-500 text-red-500' : 'border-white/10 text-white/40 hover:border-white/30'}`}
                                        >
                                            No hubo morfi
                                        </button>
                                    </div>
                                    <CustomSelect
                                        options={MORFI_LOCATIONS}
                                        value={morfiLocation}
                                        onChange={(val) => {
                                            setNoMorfi(false);
                                            setMorfiLocation(val);
                                        }}
                                        disabled={noMorfi}
                                        placeholder="Seleccionar lugar..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Roster Assignment */}
                        <div className="pwa-card p-10">
                            <h3 className="text-sm font-black uppercase tracking-widest text-white/30 mb-8">Asignación de Plantel</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {PLAYERS.map(player => (
                                    <div key={player} className="pwa-card p-3 relative space-y-3 bg-white/[0.01] border-white/5">
                                        <button
                                            onClick={() => cyclePlayerTeam(player)}
                                            className={`w-full p-4 rounded-xl border transition-all flex flex-col items-center gap-1 ${team1.includes(player) ? 'bg-accent-orange/20 border-accent-orange text-white' :
                                                team2.includes(player) ? 'bg-accent-blue/20 border-accent-blue text-white' :
                                                    'bg-white/5 border-white/10 text-white/40 hover:border-white/20'
                                                }`}
                                        >
                                            <span className="text-xs font-black uppercase italic">{player}</span>
                                            <span className="text-[7px] font-bold uppercase tracking-widest opacity-60">
                                                {team1.includes(player) ? 'BLANCO' : team2.includes(player) ? 'NEGRO' : 'BANCO'}
                                            </span>
                                        </button>

                                        <button
                                            disabled={noMorfi}
                                            onClick={() => toggleMorfi(player)}
                                            className={`w-full py-2 rounded-lg text-[8px] font-black uppercase tracking-widest border transition-all flex items-center justify-center gap-2 ${morfiPlayers.includes(player) ? 'bg-accent-lemon text-black border-accent-lemon' : 'bg-transparent border-white/10 text-white/20 hover:text-white/40 disabled:opacity-0'}`}
                                        >
                                            {morfiPlayers.includes(player) ? 'Comió ✔' : '¿Comió?'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Action Hub */}
                    <div className="space-y-8">
                        <div className="pwa-card p-10 bg-accent-orange text-black">
                            <p className="font-black uppercase tracking-[0.2em] text-[10px] mb-8">Estado de Carga</p>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-sm font-bold">
                                    <span>Total Asignados</span>
                                    <span className="text-2xl font-black">{team1.length + team2.length}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm font-bold opacity-60">
                                    <span>Sync Listo</span>
                                    <span>SÍ</span>
                                </div>
                            </div>
                            <button className="w-full mt-10 bg-black text-white py-5 rounded-3xl font-black italic flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform">
                                <Save size={20} /> SINCRONIZAR BASE
                            </button>
                        </div>

                        <div className="pwa-card p-8 border-dashed border-white/20">
                            <div className="flex gap-4 text-white/40">
                                <AlertCircle size={20} />
                                <p className="text-xs font-medium leading-relaxed">
                                    Esta operación afectará los coeficientes históricos y gráficos de rendimiento de todo el plantel.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
