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
        <span id="fastNav">
            <button>
                {showTopNav && <a href="#body" id="fastNavTop" className="symbols">expand_less</a>}
            </button>
            <button>
                {showBottomNav && <a href="#footer" id="fastNavBottom" className="symbols">expand_more</a>}
            </button>
        </span>
    );
};