'use client'

import { IconSun, IconMoon, IconLayoutSidebarRightExpand } from '@tabler/icons-react';


import { useState, useEffect, createContext, useContext, useMemo, FC } from 'react';
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

// Создание контекстов
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);
const SidebarHideContext = createContext<SidebarHideContextProps | undefined>(undefined);

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
            {isDarkMode ? <IconMoon stroke={2} /> : <IconSun stroke={2} />}
        </button>
    );
};

// Компонент для переключения боковой панели
const SidebarToggle: FC = () => {
    const sidebarHideContext = useContext(SidebarHideContext);
    if (!sidebarHideContext) throw new Error("SidebarToggle must be used within a SidebarHideProvider");

    const { setIsSidebarHidden } = sidebarHideContext;

    const toggleSidebar = () => {
        setIsSidebarHidden(prevHidden => !prevHidden);
    };

    return (
        <button className="toggle_sidebar" onClick={toggleSidebar}>
            <IconLayoutSidebarRightExpand stroke={2} />
        </button>
    );
};

// Компонент обертка для всех переключателей
export const Togglers: FC = () => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    const [isSidebarHidden, setIsSidebarHidden] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedDarkMode = localStorage.getItem('darkMode');
            const savedSidebarHidden = localStorage.getItem('sidebarHidden');

            if (savedDarkMode !== null) setIsDarkMode(JSON.parse(savedDarkMode));
            if (savedSidebarHidden !== null) setIsSidebarHidden(JSON.parse(savedSidebarHidden));
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

    const contextValue = useMemo(() => ({
        isDarkMode,
        setIsDarkMode,
        isSidebarHidden,
        setIsSidebarHidden,
    }), [isDarkMode, isSidebarHidden]);

    return (
        <ThemeContext.Provider value={contextValue}>
            <SidebarHideContext.Provider value={contextValue}>
                <section className="togglers">
                    <ThemeToggle />
                    <SidebarToggle />
                </section>
            </SidebarHideContext.Provider>
        </ThemeContext.Provider>
    );
}