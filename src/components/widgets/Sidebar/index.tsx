"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

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
import "./style.css";

export function Sidebar() {
  const pathname = usePathname();
  const isActive = (href: string) => {
    return pathname.startsWith(href) ? "active" : "";
  };

  return (
    <aside>
      <section className="Sidebar">
        <Logo />
        <nav id="Sidebar" aria-label="Боковое меню навигации">
          <hr />
          <UserCard />
          <hr />
          <Search />
          <hr />
          <ul>
            <li>
              <Link
                className={`button link ${pathname === "/" ? "active" : ""}`}
                href="/"
                prefetch={false}
              >
                <IconHome stroke={2} />
                <h6>Главная</h6>
              </Link>
            </li>
            <li>
              <Link
                className={`button link ${isActive("/movie")} `}
                href="/movie?page=1"
                prefetch={false}
              >
                <IconMovie stroke={2} />
                <h6>Фильмы</h6>
              </Link>
            </li>
            <li>
              <Link
                className={`button link ${isActive("/tv-series")}`}
                href="/tv-series?page=1"
                prefetch={false}
              >
                <IconDeviceTvOld stroke={2} />
                <h6>Сериалы</h6>
              </Link>
            </li>
            <li>
              <Link
                className={`button link ${isActive("/cartoon")}`}
                href="/cartoon?page=1"
                prefetch={false}
              >
                <IconMickey stroke={2} />
                <h6>Мультфильмы</h6>
              </Link>
            </li>
            <li>
              <Link
                className={`button link ${isActive("/animated-series")}`}
                href="/animated-series?page=1"
                prefetch={false}
              >
                <IconHorseToy stroke={2} />
                <h6>Мультсериалы</h6>
              </Link>
            </li>
            <li>
              <Link
                className={`button link ${isActive("/anime")}`}
                href="/anime?page=1"
                prefetch={false}
              >
                <IconTorii stroke={2} />
                <h6>Аниме</h6>
              </Link>
            </li>
            <li>
              <Link
                className={`button link ${isActive("/list")}`}
                href="/list?page=1"
                prefetch={false}
              >
                <IconCards stroke={2} />
                <h6>Коллекции</h6>
              </Link>
            </li>
            <li>
              <Link
                className={`button link ${isActive("/person")}`}
                href="/person?page=1"
                prefetch={false}
              >
                <IconUsers stroke={2} />
                <h6>Персоны</h6>
              </Link>
            </li>
          </ul>
          <hr />
          <Togglers />
        </nav>
      </section>
    </aside>
  );
}
