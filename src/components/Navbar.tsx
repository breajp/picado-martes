'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Trophy, Users, Swords, Settings, LogIn } from 'lucide-react';

export default function Navbar() {
    const pathname = usePathname();

    const links = [
        { href: '/', label: 'Tabla', icon: Trophy },
        { href: '/players', label: 'Plantel', icon: Users },
        { href: '/vs', label: 'Duelos', icon: Swords },
        { href: '/admin', label: 'Panel', icon: Settings },
    ];

    return (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-2xl px-4 py-3 glass-card rounded-full flex justify-between items-center sm:px-8">
            <Link href="/" className="text-xl font-black tracking-tighter text-glow sm:text-2xl">
                MARTES<span className="text-primary">.FTBL</span>
            </Link>

            <div className="flex items-center gap-1 sm:gap-4">
                {links.map(({ href, label, icon: Icon }) => (
                    <Link key={href} href={href} className="relative px-3 py-2 rounded-full transition-colors hover:bg-white/5 group">
                        <span className={`hidden sm:inline text-xs font-bold uppercase tracking-wider ${pathname === href ? 'text-primary' : 'text-gray-400'}`}>
                            {label}
                        </span>
                        <Icon className={`sm:hidden w-5 h-5 ${pathname === href ? 'text-primary' : 'text-gray-400'}`} />
                        {pathname === href && (
                            <motion.div
                                layoutId="nav-pill"
                                className="absolute inset-0 bg-primary/10 rounded-full -z-10 border border-primary/20"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                    </Link>
                ))}

                <div className="w-px h-4 bg-white/10 mx-2 hidden sm:block" />

                <button className="flex items-center gap-2 bg-primary text-black px-4 py-2 rounded-full text-xs font-black uppercase hover:scale-105 transition-all">
                    <LogIn size={14} />
                    <span className="hidden sm:inline">Login</span>
                </button>
            </div>
        </nav>
    );
}
