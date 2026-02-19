import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="glass sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold tracking-tighter title-gradient">
                MARTES DE FÚTBOL
            </Link>
            <div className="flex gap-6 items-center">
                <Link href="/players" className="text-sm font-medium hover:text-primary transition-colors">
                    Jugadores
                </Link>
                <Link href="/stats" className="text-sm font-medium hover:text-primary transition-colors">
                    Estadísticas
                </Link>
                <Link href="/vs" className="text-sm font-medium hover:text-primary transition-colors">
                    VS
                </Link>
                <Link href="/admin" className="text-sm font-medium hover:text-primary transition-colors">
                    Admin
                </Link>
                <button className="bg-primary hover:bg-emerald-600 text-black px-4 py-2 rounded-full text-sm font-bold transition-all transform hover:scale-105">
                    Login
                </button>
            </div>
        </nav>
    );
}
