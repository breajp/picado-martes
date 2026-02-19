'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();

    const links = [
        { href: '/', label: 'HOME' },
        { href: '/players', label: 'ROSTER' },
        { href: '/vs', label: 'VS MODE' },
        { href: '/admin', label: 'CONSOLE' },
    ];

    return (
        <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-[420px]">
            <div className="glass-pill px-6 py-4 flex justify-between items-center text-white/40">
                {links.map(({ href, label }) => (
                    <Link key={href} href={href} className="relative px-4 py-2 flex items-center justify-center">
                        <span className={`text-[10px] sm:text-[11px] font-black tracking-widest transition-all duration-300 ${pathname === href ? 'text-white' : 'hover:text-white'}`}>
                            {label}
                        </span>
                        {pathname === href && (
                            <motion.div
                                layoutId="nav-pill-bg"
                                className="absolute inset-0 bg-white/10 rounded-full -z-10"
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            />
                        )}
                    </Link>
                ))}
            </div>
        </nav>
    );
}
