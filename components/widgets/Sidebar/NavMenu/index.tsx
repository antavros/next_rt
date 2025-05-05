"use client";
import React from "react";
import * as JSX from "react";

import { usePathname } from "next/navigation";
import { Search } from "@/components/Widgets/Search";
import { Button } from "@/components/features/Button";

import {
  IconMovie,
  IconDeviceTvOld,
  IconMickey,
  IconHorseToy,
  IconTorii,
  IconUsers,
  IconCards,
  IconHeartDollar,
  IconHome,
} from "@tabler/icons-react";

import "./style.css";

export type Item = {
  name: string;
  url?: string;
  className?: string;
  svg?: JSX.Element;
};

export function NavMenu() {
  const pathname = usePathname();

  const isActive = (href: string, exact: boolean = false): string =>
    exact
      ? pathname === href
        ? "active"
        : ""
      : pathname.startsWith(href)
      ? "active"
      : "";

  const menuConfig: Item[] = [
    {
      name: "Главная",
      url: "/",
      className: isActive("/", true),
      svg: <IconHome />,
    },
    {
      name: "Фильмы",
      url: "/movie?page=1",
      className: isActive("/movie"),
      svg: <IconMovie />,
    },
    {
      name: "Мультфильмы",
      url: "/cartoon?page=1",
      className: isActive("/cartoon"),
      svg: <IconMickey />,
    },
    {
      name: "Сериалы",
      url: "/tv-series?page=1",
      className: isActive("/tv-series"),
      svg: <IconDeviceTvOld />,
    },
    {
      name: "Мультсериалы",
      url: "/animated-series?page=1",
      className: isActive("/animated-series"),
      svg: <IconHorseToy />,
    },
    {
      name: "Аниме",
      url: "/anime?page=1",
      className: isActive("/anime"),
      svg: <IconTorii />,
    },
    {
      name: "Коллекции",
      url: "/list?page=1",
      className: isActive("/list"),
      svg: <IconCards />,
    },
    {
      name: "Персоны",
      url: "/person?page=1",
      className: isActive("/person"),
      svg: <IconUsers />,
    },
  ];

  return (
    <nav aria-label="Боковое меню навигации">
      <Search />
      <Button items={menuConfig} />
    </nav>
  );
}
