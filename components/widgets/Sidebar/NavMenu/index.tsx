"use client";
import React from "react";

import { usePathname } from "next/navigation";
import { Search } from "@/components/features/Search";
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
      name: "Популярно",
      url: "/",
      className: isActive("/", true),
      svg: <IconHeartDollar />,
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
