'use client';

import { useEffect, useState } from 'react';

export default function Cursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const handleHover = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (['A', 'BUTTON', 'SELECT', 'INPUT'].includes(target.tagName) || target.closest('button')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleHover);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleHover);
        };
    }, []);

    return (
        <>
            <div
                className="cursor-dot"
                style={{ left: `${position.x}px`, top: `${position.y}px` }}
            />
            <div
                className="cursor-outline"
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
                    background: isHovering ? 'rgba(0, 255, 163, 0.1)' : 'transparent',
                    borderColor: isHovering ? 'transparent' : 'var(--accent)'
                }}
            />
        </>
    );
}
