'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();

    const links = [
        { href: '/', label: 'Journal' },
        { href: '/players', label: 'Roster' },
        { href: '/vs', label: 'Vs Mode' },
        { href: '/admin', label: 'Console' },
    ];

    return (
        <>
            {/* Desktop Vertical Nav */}
            <nav className="fixed top-10 left-10 z-[100] hidden lg:block">
                <Link href="/" className="text-2xl display-bold tracking-tighter text-white mb-12 block">
                    FTBL<span className="text-accent underline">.</span>SYSTEM
                </Link>

                <div className="flex flex-col gap-6">
                    {links.map(({ href, label }) => (
                        <Link key={href} href={href} className="group relative">
                            <span className={`text-xs font-black uppercase tracking-[0.4em] transition-all duration-500 ${pathname === href ? 'text-accent pl-4' : 'text-gray-600 group-hover:text-white group-hover:pl-4'}`}>
                                {label}
                            </span>
                            {pathname === href && (
                                <motion.div
                                    layoutId="nav-line"
                                    className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-accent rounded-full"
                                />
                            )}
                        </Link>
                    ))}
                </div>
            </nav>

            {/* Mobile Bottom Nav */}
            <nav className="fixed bottom-0 left-0 right-0 z-[100] p-6 lg:hidden">
                <div className="super-glass flex justify-between items-center px-8 py-4 rounded-full">
                    {links.map(({ href, label }) => (
                        <Link key={href} href={href} className="relative">
                            <span className={`text-[10px] font-black uppercase tracking-widest ${pathname === href ? 'text-accent' : 'text-gray-500'}`}>
                                {label}
                            </span>
                            {pathname === href && (
                                <motion.div
                                    layoutId="nav-dot-mobile"
                                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full"
                                />
                            )}
                        </Link>
                    ))}
                </div>
            </nav>
        </>
    );
}
