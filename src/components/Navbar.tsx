'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home as HomeIcon, Trophy, Users, Zap, Film, Plus } from 'lucide-react';

export default function Navbar() {
    const pathname = usePathname();

    const mainLinks = [
        { href: '/', label: 'Home', icon: HomeIcon },
        { href: '/leaderboard', label: 'Tabla', icon: Trophy },
    ];

    const secondaryLinks = [
        { href: '/feed', label: 'Videos', icon: Film },
        { href: '/players', label: 'Plantel', icon: Users },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-[100] bg-[#0A0A0A]/90 backdrop-blur-2xl border-t border-white/5 pb-safe">
            <div className="max-w-xl mx-auto flex justify-between items-center px-6 py-2">
                {/* Left Links */}
                <div className="flex gap-6">
                    {mainLinks.map(({ href, label, icon: Icon }) => (
                        <Link key={href} href={href} className="relative flex flex-col items-center gap-1 group py-2">
                            <div className={`transition-all duration-300 ${pathname === href ? 'text-accent-orange' : 'text-white/30 group-hover:text-white/60'}`}>
                                <Icon size={22} strokeWidth={pathname === href ? 2.5 : 2} />
                            </div>
                            <span className={`text-[8px] font-black uppercase tracking-widest transition-all duration-300 ${pathname === href ? 'text-white' : 'text-white/20'}`}>
                                {label}
                            </span>
                        </Link>
                    ))}
                </div>

                {/* Center Upload Button */}
                <Link href="/upload" className="relative -top-5 group flex flex-col items-center">
                    <div className="w-14 h-14 bg-gradient-to-tr from-accent-orange to-accent-lemon rounded-full flex items-center justify-center shadow-lg shadow-black group-hover:scale-105 group-active:scale-95 transition-transform">
                        <Plus size={28} className="text-black" strokeWidth={3} />
                    </div>
                </Link>

                {/* Right Links */}
                <div className="flex gap-6">
                    {secondaryLinks.map(({ href, label, icon: Icon }) => (
                        <Link key={href} href={href} className="relative flex flex-col items-center gap-1 group py-2">
                            <div className={`transition-all duration-300 ${pathname === href ? 'text-accent-orange' : 'text-white/30 group-hover:text-white/60'}`}>
                                <Icon size={22} strokeWidth={pathname === href ? 2.5 : 2} />
                            </div>
                            <span className={`text-[8px] font-black uppercase tracking-widest transition-all duration-300 ${pathname === href ? 'text-white' : 'text-white/20'}`}>
                                {label}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
