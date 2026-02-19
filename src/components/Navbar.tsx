'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();

    const links = [
        { href: '/', label: 'HOME' },
        { href: '/players', label: 'ROSTER' },
        { href: '/vs', label: 'DUELS' },
        { href: '/admin', label: 'SYSTEM' },
    ];

    return (
        <nav className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-[400px]">
            <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-full px-4 py-3 flex justify-between items-center shadow-2xl">
                {links.map(({ href, label }) => (
                    <Link key={href} href={href} className="relative px-5 py-2 group">
                        <span className={`text-[9px] font-black tracking-[0.2em] transition-all duration-300 ${pathname === href ? 'text-white' : 'text-white/30 group-hover:text-white/60'}`}>
                            {label}
                        </span>
                        {pathname === href && (
                            <motion.div
                                layoutId="nav-pill-active"
                                className="absolute inset-0 bg-white/[0.08] rounded-full -z-10"
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            />
                        )}
                        {pathname === href && (
                            <motion.div
                                layoutId="nav-dot"
                                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"
                            />
                        )}
                    </Link>
                ))}
            </div>
        </nav>
    );
}
