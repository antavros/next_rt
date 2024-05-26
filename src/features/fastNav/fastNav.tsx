'use client'

import { IconArrowBadgeUp, IconArrowBadgeDown, IconArrowBadgeDownFilled  } from '@tabler/icons-react';

import { useEffect, useState } from 'react';
import './fastNav.css';

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
        <button id="fastNav">
            {showTopNav && (
                <a href="#body" title="top">
                    <IconArrowBadgeUp stroke={2} />
                </a>
            )}
            {showBottomNav && (
                <a href="#footer" title="down">
                    <IconArrowBadgeDown stroke={2} />
                </a>
            )}
        </button>
    );
};
