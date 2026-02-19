'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();

    const links = [
        { href: '/', label: 'Home' },
        { href: '/players', label: 'Roster' },
        { href: '/vs', label: 'Matchup' },
        { href: '/admin', label: 'Console' },
    ];

    return (
        <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-[500px]">
            <div className="soft-glass pill-shape px-8 py-5 flex justify-between items-center bg-white/60">
                {links.map(({ href, label }) => (
                    <Link key={href} href={href} className="relative px-4">
                        <span className={`text-[11px] font-black uppercase tracking-widest transition-colors duration-300 ${pathname === href ? 'text-fg' : 'text-gray-400 hover:text-fg'}`}>
                            {label}
                        </span>
                        {pathname === href && (
                            <motion.div
                                layoutId="nav-pill"
                                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full"
                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                            />
                        )}
                    </Link>
                ))}
            </div>
        </nav>
    );
}
