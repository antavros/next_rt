'use client'

import { useEffect, useState } from 'react';

import { IconChevronsUp, IconChevronsDown } from '@tabler/icons-react';

export const FastNavigation = () => {
    const [showTopNav, setShowTopNav] = useState(false);
    const [showBottomNav, setShowBottomNav] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const scrollPosition = window.scrollY;

            const showTop = scrollPosition >= windowHeight / 2;
            const showBottom = scrollPosition <= Math.round(windowHeight / 2);

            setShowTopNav(showTop);
            setShowBottomNav(showBottom);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            {showTopNav && (
                <a href="#body" title="top" className="button">
                    <IconChevronsUp stroke={2} />
                </a>
            )}
            {showBottomNav && (
                <a href="#footer" title="down" className="button">
                    <IconChevronsDown stroke={2} />
                </a>
            )}
        </>
    );
};
