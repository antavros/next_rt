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
import { Logo } from "@/components/entities/Logo";
import { Button } from "@/components/features/Button";

import "./style.css";

export function Sidebar() {
  const pathname = usePathname();
  const isActive = (href: string) => {
    return pathname.startsWith(href) ? "active" : "";
  };

  const buttonItems = [
    {
      url: "/",
      type: "button",
      className: `button link ${pathname === "/" ? "active" : ""}`,
      onClick: () => { },
      svg: <IconHome stroke={2} />,
      name: "Главная"
    },
    {
      url: "/movie?page=1",
      type: "button",
      className: `button link ${isActive("/movie")}`,
      onClick: () => { },
      svg: <IconMovie stroke={2} />,
      name: "Фильмы"
    },
    {
      url: "/tv-series?page=1",
      type: "button",
      className: `button link ${isActive("/tv-series")}`,
      onClick: () => { },
      svg: <IconDeviceTvOld stroke={2} />,
      name: "Сериалы"
    },
    {
      url: "/cartoon?page=1",
      type: "button",
      className: `button link ${isActive("/cartoon")}`,
      onClick: () => { },
      svg: <IconMickey stroke={2} />,
      name: "Мультфильмы"
    },
    {
      url: "/animated-series?page=1",
      type: "button",
      className: `button link ${isActive("/animated-series")}`,
      onClick: () => { },
      svg: <IconHorseToy stroke={2} />,
      name: "Мультсериалы"
    },
    {
      url: "/anime?page=1",
      type: "button",
      className: `button link ${isActive("/anime")}`,
      onClick: () => { },
      svg: <IconTorii stroke={2} />,
      name: "Аниме"
    },
    {
      url: "/list?page=1",
      type: "button",
      className: `button link ${isActive("/list")}`,
      onClick: () => { },
      svg: <IconCards stroke={2} />,
      name: "Коллекции"
    },
    {
      url: "/person?page=1",
      type: "button",
      className: `button link ${isActive("/person")}`,
      onClick: () => { },
      svg: <IconUsers stroke={2} />,
      name: "Персоны"
    }
  ];

  return (
    <aside>
      <section className="sidebar">
        <Logo />
        <hr />
        <UserCard />
        <hr />
        <Search />
        <hr />
        <nav aria-label="Боковое меню навигации">
          <Button items={buttonItems} />
        </nav>
        <hr />
        <Togglers />
      </section>
    </aside>
  );
}
