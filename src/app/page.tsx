import Navbar from '@/components/Navbar';
import Leaderboard from '@/components/Leaderboard';

export default function Home() {
  return (
    <main className="min-h-screen premium-gradient pb-20">
      <Navbar />

      <header className="px-6 py-20 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="inline-block px-4 py-1.5 mb-6 glass rounded-full text-xs font-bold text-primary tracking-widest uppercase">
          Temporada 2025
        </div>
        <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter title-gradient">
          EL PICADO DEL<br />MARTES
        </h1>
        <p className="max-w-xl text-gray-400 text-lg mb-10 leading-relaxed">
          Historial oficial, estadísticas avanzadas y el camino a los premios de fin de año.
          Solo para los que dejan el alma en la cancha.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-20 text-left">
          <div className="glass p-8 rounded-3xl">
            <h3 className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-2">Próximo Turno</h3>
            <p className="text-2xl font-bold">Martes 21:00hs</p>
            <p className="text-primary font-medium">Sede GRUN - Confirmados: 8/10</p>
          </div>
          <div className="glass p-8 rounded-3xl border-primary/20">
            <h3 className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-2">MVP Actual</h3>
            <p className="text-2xl font-bold">DIEGO</p>
            <p className="text-primary font-medium">92% Win Rate</p>
          </div>
          <div className="glass p-8 rounded-3xl">
            <h3 className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-2">Último Resultado</h3>
            <p className="text-2xl font-bold">Equipo A (1) - (1) Equipo B</p>
            <p className="text-gray-400 font-medium">Sede GRUN - 02/12/2025</p>
          </div>
        </div>

        <section className="w-full">
          <div className="flex justify-between items-end mb-8 text-left">
            <div>
              <h2 className="text-3xl font-bold mb-2">Tabla de Posiciones</h2>
              <p className="text-gray-400">Puntaje acumulado basado en victorias (+3 pts).</p>
            </div>
          </div>
          <Leaderboard />
        </section>
      </header>

      <footer className="px-6 mt-20 text-center text-gray-600 text-xs">
        <p>© 2026 Martes de Fútbol App. Designed for the boys.</p>
      </footer>
    </main>
  );
}
