"use client"

import React, { useState, useEffect, useMemo, createContext, FC } from 'react';

interface ThemeContextProps {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SidebarHideContextProps {
  isSidebarHidden: boolean;
  setIsSidebarHidden: React.Dispatch<React.SetStateAction<boolean>>;
}

// Создание контекстов
export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);
export const SidebarHideContext = createContext<SidebarHideContextProps | undefined>(undefined);

// Функция для получения начальной темы
const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const savedDarkMode = localStorage.getItem('darkMode');
    return savedDarkMode !== null ? JSON.parse(savedDarkMode) : false;
  }
  return false;
};

const ThemeProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(getInitialTheme);
  const [isSidebarHidden, setIsSidebarHidden] = useState<boolean>(false);
  const [themeInitialized, setThemeInitialized] = useState<boolean>(false);
  const [lastScrollY, setLastScrollY] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSidebarHidden = localStorage.getItem('sidebarHidden');
      if (savedSidebarHidden !== null) setIsSidebarHidden(JSON.parse(savedSidebarHidden));
      setThemeInitialized(true); // Установка флага завершения инициализации темы

      // Снятие класса not_initialized после инициализации темы
      const bodyElement = document.querySelector('body');
      if (bodyElement) {
        bodyElement.classList.remove('not_initialized');
      }
    }
  }, []);

  useEffect(() => {
    if (themeInitialized && typeof window !== 'undefined') {
      localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
      const bodyElement = document.querySelector('body');
      if (bodyElement) {
        if (isDarkMode) {
          bodyElement.classList.add('dark_mode');
          bodyElement.classList.remove('light_mode');
        } else {
          bodyElement.classList.add('light_mode');
          bodyElement.classList.remove('dark_mode');
        }
      }
    }
  }, [isDarkMode, themeInitialized]);

  useEffect(() => {
    if (themeInitialized && typeof window !== 'undefined') {
      localStorage.setItem('sidebarHidden', JSON.stringify(isSidebarHidden));
      const headerElement = document.querySelector("header");
      const toggleElement = document.querySelector('.toggle_sidebar');
      if (headerElement) {
        if (isSidebarHidden) {
          headerElement.classList.add('sidebar_hide');
          if (toggleElement) toggleElement.classList.add('flipped');
        } else {
          headerElement.classList.remove('sidebar_hide');
          if (toggleElement) toggleElement.classList.remove('flipped');
        }
      }
    }
  }, [isSidebarHidden, themeInitialized]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        const bodyElement = document.querySelector('body');
        if (currentScrollY > lastScrollY) {
          // Скроллим вниз
          bodyElement?.classList.add('hidden');
          bodyElement?.classList.remove('visible');
        } else {
          // Скроллим вверх
          bodyElement?.classList.add('visible');
          bodyElement?.classList.remove('hidden');
        }
        setLastScrollY(currentScrollY);
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [lastScrollY]);

  const themeContextValue = useMemo(() => ({ isDarkMode, setIsDarkMode }), [isDarkMode]);
  const sidebarHideContextValue = useMemo(() => ({ isSidebarHidden, setIsSidebarHidden }), [isSidebarHidden]);

  if (!themeInitialized) {
    return null; // Не рендерим контент до завершения инициализации темы
  }

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <SidebarHideContext.Provider value={sidebarHideContextValue}>
          {children}
      </SidebarHideContext.Provider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
