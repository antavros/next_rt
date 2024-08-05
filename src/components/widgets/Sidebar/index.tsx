"use client";

import { usePathname } from "next/navigation";
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
import { Search } from "@/components/features/Search";
import { Togglers } from "@/components/features/Togglers";
import { UserCard } from "@/components/entities/User/Card";
import { Logo } from "@/components/features/Logo";
import { Button } from "@/components/features/Button";
import "./style.css";

export function Sidebar() {
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
      url: "/movie?page=1",
      className: isActive("/movie"),
      onClick: () => {},
      svg: <IconMovie stroke={2} />,
    },
    {
      name: "Сериалы",
      url: "/tv-series?page=1",
      className: isActive("/tv-series"),
      onClick: () => {},
      svg: <IconDeviceTvOld stroke={2} />,
    },
    {
      name: "Мультфильмы",
      url: "/cartoon?page=1",
      className: isActive("/cartoon"),
      onClick: () => {},
      svg: <IconMickey stroke={2} />,
    },
    {
      name: "Мультсериалы",
      url: "/animated-series?page=1",
      className: isActive("/animated-series"),
      onClick: () => {},
      svg: <IconHorseToy stroke={2} />,
    },
    {
      name: "Аниме",
      url: "/anime?page=1",
      className: isActive("/anime"),
      onClick: () => {},
      svg: <IconTorii stroke={2} />,
    },
    {
      name: "Коллекции",
      url: "/list?page=1",
      className: isActive("/list"),
      onClick: () => {},
      svg: <IconCards stroke={2} />,
    },
    {
      name: "Персоны",
      url: "/person?page=1",
      className: isActive("/person"),
      onClick: () => {},
      svg: <IconUsers stroke={2} />,
    },
  ];

  return (
    <header>
      <section className="sidebar">
        <Logo />
        <nav aria-label="Боковое меню навигации">
          <Search />
          <hr />
          <Button items={buttonItems} />
        </nav>
        <hr />
        <Togglers />
        <UserCard />
      </section>
    </header>
  );
}
