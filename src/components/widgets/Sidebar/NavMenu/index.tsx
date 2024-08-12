"use client";

import { usePathname } from "next/navigation";

import { Search } from "@/components/features/Search";
import { Button } from "@/components/features/Button";

import {
  IconHome,
  IconMovie,
  IconDeviceTvOld,
  IconMickey,
  IconHorseToy,
  IconTorii,
  IconUsers,
  IconCards,
} from "@tabler/icons-react";
import "./style.css";

export function NavMenu() {
  const pathname = usePathname();
  const isActive = (href: string) => (pathname === href ? "active" : "");

  const buttonItems = [
    {
      name: "Главная",
      url: "/",
      className: isActive("/"),
      onClick: () => {},
      svg: <IconHome stroke={2} />,
    },
    {
      name: "Фильмы",
      url: "/title/movie?page=1",
      className: isActive("/title/movie"),
      onClick: () => {},
      svg: <IconMovie stroke={2} />,
    },
    {
      name: "Сериалы",
      url: "/title/tv-series?page=1",
      className: isActive("/title/tv-series"),
      onClick: () => {},
      svg: <IconDeviceTvOld stroke={2} />,
    },
    {
      name: "Мультфильмы",
      url: "/title/cartoon?page=1",
      className: isActive("/title/cartoon"),
      onClick: () => {},
      svg: <IconMickey stroke={2} />,
    },
    {
      name: "Мультсериалы",
      url: "/title/animated-series?page=1",
      className: isActive("/title/animated-series"),
      onClick: () => {},
      svg: <IconHorseToy stroke={2} />,
    },
    {
      name: "Аниме",
      url: "/title/anime?page=1",
      className: isActive("/title/anime"),
      onClick: () => {},
      svg: <IconTorii stroke={2} />,
    },
    {
      name: "Коллекции",
      url: "/title/list?page=1",
      className: isActive("/title/list"),
      onClick: () => {},
      svg: <IconCards stroke={2} />,
    },
    {
      name: "Персоны",
      url: "/title/person?page=1",
      className: isActive("/title/person"),
      onClick: () => {},
      svg: <IconUsers stroke={2} />,
    },
  ];

  return (
    <nav aria-label="Боковое меню навигации">
      <Search />
      <hr />
      <Button items={buttonItems} />
    </nav>
  );
}
