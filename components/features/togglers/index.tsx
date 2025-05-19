"use client";

import { FC, useContext } from "react";
import {
  IconSun,
  IconMoon,
  IconLayoutSidebarRightExpand,
} from "@tabler/icons-react";

import { AppContext } from "@/components/shared/context/theme";
import { FastNavigation } from "@/components/features/navArrow";
import "@/components/features/button/style.css";
import "./style.css";

// Компонент для переключения темы
const ThemeToggle: FC = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("ThemeToggle must be used within ThemeProvider");

  const { isDarkMode, setIsDarkMode } = context;

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  return (
    <button className="toggle_theme" onClick={toggleTheme}>
      {isDarkMode ? <IconMoon stroke={2} /> : <IconSun stroke={2} />}
    </button>
  );
};

// Компонент для переключения боковой панели
const SidebarToggle: FC = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("SidebarToggle must be used within ThemeProvider");

  const { setIsSidebarHidden } = context;

  const toggleSidebar = () => setIsSidebarHidden((prev) => !prev);

  return (
    <button className="toggle_sidebar" onClick={toggleSidebar}>
      <IconLayoutSidebarRightExpand stroke={2} />
    </button>
  );
};

// Компонент обёртка для всех переключателей
export const Togglers: FC = () => {
  return (
    <section className="togglers">
      <ThemeToggle />
      <SidebarToggle />
      <FastNavigation />
    </section>
  );
};
