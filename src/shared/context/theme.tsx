import React, { createContext, useState, useEffect, useMemo, useContext } from 'react';

interface ThemeContextProps {
    isDarkMode: boolean;
    setIsDarkMode: (value: boolean) => void;
    isSidebarHidden: boolean;
    setIsSidebarHidden: (value: boolean) => void;
    sidebarPosition: 'left' | 'right';
    setSidebarPosition: (position: 'left' | 'right') => void;
    hideButtonText: boolean;
    setHideButtonText: (value: boolean) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
        const savedDarkMode = localStorage.getItem('darkMode');
        return savedDarkMode ? JSON.parse(savedDarkMode) : false;
        }
        return false;
    });

    const [isSidebarHidden, setIsSidebarHidden] = useState(() => {
        if (typeof window !== 'undefined') {
        const savedSidebarHidden = localStorage.getItem('sidebarHidden');
        return savedSidebarHidden ? JSON.parse(savedSidebarHidden) : false;
        }
        return false;
    });

    const [sidebarPosition, setSidebarPosition] = useState<'left' | 'right'>(() => {
        if (typeof window !== 'undefined') {
        const savedSidebarPosition = localStorage.getItem('sidebarPosition');
        return savedSidebarPosition ? JSON.parse(savedSidebarPosition) : 'left';
        }
        return 'left';
    });

    const [hideButtonText, setHideButtonText] = useState(() => {
        if (typeof window !== 'undefined') {
        const savedHideButtonText = localStorage.getItem('hideButtonText');
        return savedHideButtonText ? JSON.parse(savedHideButtonText) : false;
        }
        return false;
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
        localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
        document.body.classList.toggle('dark_mode', isDarkMode);
        }
    }, [isDarkMode]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
        localStorage.setItem('sidebarHidden', JSON.stringify(isSidebarHidden));
        const asideElement = document.querySelector('aside');
        if (asideElement) {
            asideElement.classList.toggle('sidebar_hide', isSidebarHidden);
        }
        }
    }, [isSidebarHidden]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
        localStorage.setItem('sidebarPosition', JSON.stringify(sidebarPosition));
        const asideElement = document.querySelector('aside');
        if (asideElement) {
            asideElement.style.float = sidebarPosition;
        }
        }
    }, [sidebarPosition]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
        localStorage.setItem('hideButtonText', JSON.stringify(hideButtonText));
        }
    }, [hideButtonText]);

    const contextValue = useMemo(() => ({
        isDarkMode,
        setIsDarkMode,
        isSidebarHidden,
        setIsSidebarHidden,
        sidebarPosition,
        setSidebarPosition,
        hideButtonText,
        setHideButtonText,
    }), [isDarkMode, isSidebarHidden, sidebarPosition, hideButtonText]);

    return (
        <ThemeContext.Provider value={contextValue}>
        {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
