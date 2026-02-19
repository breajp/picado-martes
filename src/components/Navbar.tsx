'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();

    const links = [
        { href: '/', label: 'Journal' },
        { href: '/players', label: 'Roster' },
        { href: '/vs', label: 'VS Mode' },
        { href: '/admin', label: 'Console' },
    ];

    return (
        <nav className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-[440px]">
            <div className="glass-pill px-8 py-5 flex justify-between items-center text-white/50">
                {links.map(({ href, label }) => (
                    <Link key={href} href={href} className="relative px-3 py-1">
                        <span className={`text-xs font-semibold tracking-wide transition-all duration-300 ${pathname === href ? 'text-white' : 'hover:text-white'}`}>
                            {label}
                        </span>
                        {pathname === href && (
                            <motion.div
                                layoutId="nav-pill"
                                className="absolute inset-0 bg-white/10 rounded-full -z-10"
                                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                            />
                        )}
                    </Link>
                ))}
            </div>
        </nav>
    );
}
