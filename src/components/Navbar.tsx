'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home as HomeIcon, Trophy, Users, Zap, Film, Plus } from 'lucide-react';

export default function Navbar() {
    const pathname = usePathname();

    const links = [
        { href: '/', label: 'Home', icon: HomeIcon },
        { href: '/leaderboard', label: 'Tabla', icon: Trophy },
        { href: '/upload', label: 'Subir', icon: Plus },
        { href: '/feed', label: 'Videos', icon: Film },
        { href: '/players', label: 'Plantel', icon: Users },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-[100] bg-[#0A0A0A]/90 backdrop-blur-2xl border-t border-white/5 pb-safe">
            <div className="max-w-xl mx-auto flex justify-between items-center px-4 py-2">
                {links.map(({ href, label, icon: Icon }) => (
                    <Link key={href} href={href} className="relative flex flex-col items-center gap-1 group py-2 flex-1">
                        {href === '/upload' ? (
                            <div className="w-12 h-8 bg-gradient-to-tr from-accent-orange to-accent-lemon rounded-xl flex items-center justify-center group-hover:scale-105 active:scale-95 transition-transform mb-[2px]">
                                <Icon size={20} strokeWidth={3} className="text-black" />
                            </div>
                        ) : (
                            <div className={`transition-all duration-300 ${pathname === href ? 'text-accent-orange' : 'text-white/30 group-hover:text-white/60'}`}>
                                <Icon size={22} strokeWidth={pathname === href ? 2.5 : 2} />
                                {pathname === href && (
                                    <motion.div
                                        layoutId="nav-glow"
                                        className="absolute inset-0 bg-accent-orange/20 blur-xl rounded-full -z-10"
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    />
                                )}
                            </div>
                        )}
                        {href !== '/upload' && (
                            <span className={`text-[8px] font-black uppercase tracking-widest transition-all duration-300 ${pathname === href ? 'text-white' : 'text-white/20'}`}>
                                {label}
                            </span>
                        )}
                        {pathname === href && href !== '/upload' && (
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
