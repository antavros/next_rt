'use client'

import { useState, useEffect, createContext, useContext, useMemo, ReactNode, FC } from 'react';
import '@/features/Button/style.css';
import './style.css';

// Интерфейсы для контекстов
interface ThemeContextProps {
    isDarkMode: boolean;
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SidebarHideContextProps {
    isSidebarHidden: boolean;
    setIsSidebarHidden: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SidebarPositionContextProps {
    sidebarPosition: 'left' | 'right';
    setSidebarPosition: React.Dispatch<React.SetStateAction<'left' | 'right'>>;
}

// Создание контекстов
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);
const SidebarHideContext = createContext<SidebarHideContextProps | undefined>(undefined);
const SidebarPositionContext = createContext<SidebarPositionContextProps | undefined>(undefined);

// Компонент для переключения темы
const ThemeToggle: FC = () => {
    const themeContext = useContext(ThemeContext);
    if (!themeContext) throw new Error("ThemeToggle must be used within a ThemeProvider");

    const { isDarkMode, setIsDarkMode } = themeContext;

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
};

// Компонент для переключения боковой панели
const SidebarToggle: FC = () => {
    const sidebarHideContext = useContext(SidebarHideContext);
    if (!sidebarHideContext) throw new Error("SidebarToggle must be used within a SidebarHideProvider");

    const { isSidebarHidden, setIsSidebarHidden } = sidebarHideContext;

    const toggleSidebar = () => {
        setIsSidebarHidden(prevHidden => !prevHidden);
    };

    return (
        <button className="toggle_sidebar" onClick={toggleSidebar}>
            <span className="symbols">menu_open</span>
        </button>
    );
};

// Компонент для переключения позиции боковой панели
const SidebarPositionToggle: FC = () => {
    const sidebarPositionContext = useContext(SidebarPositionContext);
    if (!sidebarPositionContext) throw new Error("SidebarPositionToggle must be used within a SidebarPositionProvider");

    const { sidebarPosition, setSidebarPosition } = sidebarPositionContext;

    const toggleSidebarPosition = () => {
        setSidebarPosition(prevPosition => (prevPosition === 'right' ? 'left' : 'right'));
    };

    return (
        <button className="move_sidebar" onClick={toggleSidebarPosition}>
            <span className="symbols">chrome_reader_mode</span>
        </button>
    );
};

// Компонент обертка для всех переключателей
export const Togglers: FC = () => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    const [isSidebarHidden, setIsSidebarHidden] = useState<boolean>(false);
    const [sidebarPosition, setSidebarPosition] = useState<'left' | 'right'>('left');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedDarkMode = localStorage.getItem('darkMode');
            const savedSidebarHidden = localStorage.getItem('sidebarHidden');
            const savedSidebarPosition = localStorage.getItem('sidebarPosition');

            if (savedDarkMode !== null) setIsDarkMode(JSON.parse(savedDarkMode));
            if (savedSidebarHidden !== null) setIsSidebarHidden(JSON.parse(savedSidebarHidden));
            if (savedSidebarPosition !== null) setSidebarPosition(JSON.parse(savedSidebarPosition));
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
            const bodyElement = document.querySelector('body');
            if (bodyElement) {
                if (isDarkMode) {
                    bodyElement.classList.add('dark_mode');
                } else {
                    bodyElement.classList.remove('dark_mode');
                }
            }
        }
    }, [isDarkMode]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('sidebarHidden', JSON.stringify(isSidebarHidden));
            const asideElement = document.querySelector('aside');
            const toggleElement = document.querySelector('.toggle_sidebar');
            if (asideElement) {
                if (isSidebarHidden) {
                    asideElement.classList.add('sidebar_hide');
                    if (toggleElement) toggleElement.classList.add('flipped');
                } else {
                    asideElement.classList.remove('sidebar_hide');
                    if (toggleElement) toggleElement.classList.remove('flipped');
                }
            }
        }
    }, [isSidebarHidden]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('sidebarPosition', JSON.stringify(sidebarPosition));
            const asideElement = document.querySelector('aside');
            const toggleElement = document.querySelector('.move_sidebar');
            if (asideElement) {
                asideElement.style.float = sidebarPosition;
                if (toggleElement) toggleElement.classList.toggle('flipped');
                if (sidebarPosition === 'right') {
                    asideElement.style.paddingRight = 'var(--block-gap)';
                    asideElement.style.paddingLeft = '0';
                } else {
                    asideElement.style.paddingRight = '0';
                    asideElement.style.paddingLeft = 'var(--block-gap)';
                }
            }
        }
    }, [sidebarPosition]);

    // Мемоизация значений контекста для предотвращения ненужных перерисовок
    const contextValue = useMemo(() => ({
        isDarkMode,
        setIsDarkMode,
        isSidebarHidden,
        setIsSidebarHidden,
        sidebarPosition,
        setSidebarPosition
    }), [isDarkMode, isSidebarHidden, sidebarPosition]);

    return (
        <ThemeContext.Provider value={contextValue}>
            <SidebarHideContext.Provider value={{ isSidebarHidden, setIsSidebarHidden }}>
                <SidebarPositionContext.Provider value={{ sidebarPosition, setSidebarPosition }}>
                    <section className="togglers">
                        <ThemeToggle />
                        <SidebarToggle />
                        <SidebarPositionToggle />
                    </section>
                </SidebarPositionContext.Provider>
            </SidebarHideContext.Provider>
        </ThemeContext.Provider>
    );
};
