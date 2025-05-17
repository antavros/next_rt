"use client";

import { FC, useContext } from "react";
import {
  IconSun,
  IconMoon,
  IconLayoutSidebarRightExpand,
} from "@tabler/icons-react";

import {
  ThemeContext,
  SidebarHideContext,
} from "@/components/shared/context/theme";
import { FastNavigation } from "@/components/features/navArrow";
import "@/components/features/button/style.css";
import "./style.css";

// Компонент для переключения темы
const ThemeToggle: FC = () => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext)
    throw new Error("ThemeToggle must be used within a ThemeProvider");

  const { isDarkMode, setIsDarkMode } = themeContext;

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
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
  if (!sidebarHideContext)
    throw new Error("SidebarToggle must be used within a SidebarHideProvider");

  const { setIsSidebarHidden } = sidebarHideContext;

  const toggleSidebar = () => {
    setIsSidebarHidden((prevHidden) => !prevHidden);
  };

  return (
    <button className="toggle_sidebar" onClick={toggleSidebar}>
      <IconLayoutSidebarRightExpand stroke={2} />
    </button>
  );
};

// Компонент обертка для всех переключателей
export const Togglers: FC = () => {
  return (
    <section className="togglers">
      <ThemeToggle />
      <SidebarToggle />
      <FastNavigation />
    </section>
  );
};
