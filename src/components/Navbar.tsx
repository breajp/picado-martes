'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home as HomeIcon, Trophy, Users, Zap, Film } from 'lucide-react';

export default function Navbar() {
    const pathname = usePathname();

    const links = [
        { href: '/', label: 'Home', icon: HomeIcon },
        { href: '/leaderboard', label: 'Tabla', icon: Trophy },
        { href: '/feed', label: 'Videos', icon: Film },
        { href: '/players', label: 'Plantel', icon: Users },
        { href: '/vs', label: 'Duelos', icon: Zap },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-[100] bg-[#0A0A0A]/80 backdrop-blur-2xl border-t border-white/5 pb-safe">
            <div className="max-w-xl mx-auto flex justify-between items-center px-4 py-3">
                {links.map(({ href, label, icon: Icon }) => (
                    <Link key={href} href={href} className="relative flex flex-col items-center gap-1 group py-1 flex-1">
                        <div className={`relative p-1 rounded-xl transition-all duration-300 ${pathname === href ? 'text-accent-orange' : 'text-white/30 group-hover:text-white/60'}`}>
                            <Icon size={20} strokeWidth={pathname === href ? 2.5 : 2} />
                            {pathname === href && (
                                <motion.div
                                    layoutId="nav-glow"
                                    className="absolute inset-0 bg-accent-orange/20 blur-xl rounded-full -z-10"
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                            )}
                        </div>
                        <span className={`text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${pathname === href ? 'text-white' : 'text-white/20'}`}>
                            {label}
                        </span>
                        {pathname === href && (
                            <motion.div
                                layoutId="nav-dot"
                                className="absolute -bottom-1 w-1 h-1 bg-accent-orange rounded-full"
                            />
                        )}
                    </Link>
                ))}
            </div>
        </nav>
    );
}
