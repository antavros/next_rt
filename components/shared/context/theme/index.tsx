"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
  FC,
} from "react";

interface AppContextProps {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  isSidebarHidden: boolean;
  setIsSidebarHidden: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

const getInitial = (key: string, defaultValue: boolean): boolean => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(key);
    return saved !== null ? JSON.parse(saved) : defaultValue;
  }
  return defaultValue;
};

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() =>
    getInitial("darkMode", false)
  );
  const [isSidebarHidden, setIsSidebarHidden] = useState<boolean>(() =>
    getInitial("sidebarHidden", false)
  );

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
    document.documentElement.style.setProperty(
      "--theme-back",
      isDarkMode
        ? " rgb(16, 18, 24)"
        : "linear-gradient(270deg, rgb(0, 0, 0) -7%, var(--color-purple) 15%, var(--color-orangered) 50%, var(--color-purple) 85%, rgb(0, 0, 0) 107%)"
    );
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem("sidebarHidden", JSON.stringify(isSidebarHidden));

    const header = document.querySelector("header");
    const toggle = document.querySelector(".toggle_sidebar");

    if (header) {
      header.classList.toggle("sidebar_hide", isSidebarHidden);
    }
    if (toggle) {
      toggle.classList.toggle("flipped", isSidebarHidden);
    }
  }, [isSidebarHidden]);

  // Удаляем класс инициализации при первом рендере
  useEffect(() => {
    document.body.classList.remove("not_initialized");
  }, []);

  const contextValue = useMemo(
    () => ({ isDarkMode, setIsDarkMode, isSidebarHidden, setIsSidebarHidden }),
    [isDarkMode, isSidebarHidden]
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
