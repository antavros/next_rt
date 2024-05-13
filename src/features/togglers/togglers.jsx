'use client'

import { useState, useEffect, createContext, useContext, useMemo } from 'react';
import '../../entities/button/button.css';
import './togglers.css';

// Create contexts for each toggle
const ThemeContext = createContext();
const SidebarHideContext = createContext();
const SidebarPositionContext = createContext();


// Theme toggle component
function ThemeToggle() {
    const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);

    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    return (
        <button className="toggle_theme" onClick={toggleTheme}>
            <span className={isDarkMode ? 'symbols dark' : 'symbols light'}>
                {isDarkMode ? 'dark_mode' : 'light_mode'}
            </span>
        </button>
    );
}

// Sidebar toggle component
function SidebarToggle() {
    const { setIsSidebarHidden } = useContext(SidebarHideContext);

    const toggleSidebar = () => {
        setIsSidebarHidden(prevHidden => !prevHidden);
    };

    return (
        <button className="toggle_sidebar" onClick={toggleSidebar}>
            <span className="symbols">menu_open</span>
        </button>
    );
}

// Sidebar position toggle component
function SidebarPositionToggle() {
    const { setSidebarPosition } = useContext(SidebarPositionContext);

    const toggleSidebarPosition = () => {
        setSidebarPosition(prevPosition => prevPosition === 'right' ? 'left' : 'right');
    };

    return (
        <button className="move_sidebar" onClick={toggleSidebarPosition}>
            <span className="symbols">chrome_reader_mode</span>
        </button>
    );
}

export function Togglers() {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedDarkMode = localStorage.getItem('darkMode');
        return savedDarkMode ? JSON.parse(savedDarkMode) : false;
    });

    const [isSidebarHidden, setIsSidebarHidden] = useState(() => {
        const savedSidebarHidden = localStorage.getItem('sidebarHidden');
        return savedSidebarHidden ? JSON.parse(savedSidebarHidden) : false;
    });

    const [sidebarPosition, setSidebarPosition] = useState(() => {
        const savedSidebarPosition = localStorage.getItem('sidebarPosition');
        return savedSidebarPosition ? JSON.parse(savedSidebarPosition) : 'left';
    });

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
        const bodyElement = document.querySelector('body');
        if (bodyElement) {
            if (isDarkMode) {
                bodyElement.classList.add('dark_mode');
            } else {
                bodyElement.classList.remove('dark_mode');
            }
        }
    }, [isDarkMode]);

    useEffect(() => {
        localStorage.setItem('sidebarHidden', JSON.stringify(isSidebarHidden));
        // Применяем класс для скрытия боковой панели при изменении состояния
        const asideElement = document.querySelector('aside');
        const toggleElement = document.querySelector('.toggle_sidebar');
        if (asideElement) {
            if (isSidebarHidden) {
                asideElement.classList.add('sidebar_hide');
                toggleElement.classList.add('flipped');
            } else {
                asideElement.classList.remove('sidebar_hide');
                toggleElement.classList.remove('flipped');
            }
        }
    }, [isSidebarHidden]);

    useEffect(() => {
        localStorage.setItem('sidebarPosition', JSON.stringify(sidebarPosition));
        const asideElement = document.querySelector('aside');
        const toggleElement = document.querySelector('.move_sidebar');
        if (asideElement) {
            asideElement.style.float = sidebarPosition;
            toggleElement.classList.toggle('flipped');
            if (sidebarPosition === 'right') {
                asideElement.style.paddingRight = ('var(--block-gap)');
                asideElement.style.paddingLeft = ('0');
            } else {
                asideElement.style.paddingRight = ('0');
                asideElement.style.paddingLeft = ('var(--block-gap)');
            }
        }
    }, [sidebarPosition]);

    // Memoize the context value to prevent unnecessary re-renders
    const contextValue = useMemo(() => ({
        isDarkMode,
        setIsDarkMode,
        isSidebarHidden,
        setIsSidebarHidden,
        sidebarPosition,
        setSidebarPosition
    }), [isDarkMode, setIsDarkMode, isSidebarHidden, setIsSidebarHidden, sidebarPosition, setSidebarPosition]);

    return (
        <ThemeContext.Provider value={contextValue}>
            <SidebarHideContext.Provider value={{ isSidebarHidden, setIsSidebarHidden }}>
                <SidebarPositionContext.Provider value={{ sidebarPosition, setSidebarPosition }}>
                    <section className={`togglers`}>
                        <ThemeToggle />
                        <SidebarToggle />
                        <SidebarPositionToggle />
                    </section>
                </SidebarPositionContext.Provider>
            </SidebarHideContext.Provider>
        </ThemeContext.Provider>
    );
}
