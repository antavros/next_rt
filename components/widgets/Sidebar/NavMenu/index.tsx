"use client";

import { useState } from "react";
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
  IconHeartDollar,
  IconSpeakerphone,
  IconChevronDown,
  IconChevronRight,
} from "@tabler/icons-react";

import "./style.css";

export type Item = {
  name: string;
  url?: string;
  className?: string;
  svg?: JSX.Element;
};

export const NavSection: ({
  id,
  summary,
  detailsButtons,
  activeSection,
  setActiveSection,
}: {
  id: string;
  summary: Item[];
  detailsButtons?: Item[];
  activeSection: string;
  setActiveSection: (id: string) => void;
}) => JSX.Element = ({ id, summary, detailsButtons, activeSection, setActiveSection }) => {
  const isOpen = activeSection === id;

  return (
    <div className={`accordion-${summary[0]?.name?.toLowerCase() || "default"}`}>
      <div
        className={`summary-button ${isOpen ? "open" : ""}`}
        onClick={() => setActiveSection(isOpen ? "" : id)}
      >
        <Button
          items={[
            {
              ...summary[0],
              svg: isOpen ? <IconChevronDown /> : summary[0]?.svg,
            },
          ]}
        />
      </div>
      {isOpen && detailsButtons && (
        <div className="details-content">
          <Button items={detailsButtons} />
        </div>
      )}
    </div>
  );
};

export function NavMenu() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string>("");

  const isActive = (href: string, exact: boolean = false): string =>
    exact
      ? pathname === href
        ? "active"
        : ""
      : pathname.startsWith(href)
      ? "active"
      : "";

  const menuConfig = {
    top: [
      {
        name: "Главная",
        url: "/",
        className: isActive("/", true),
        svg: <IconHome />,
      },
      {
        name: "Популярно",
        url: "/popular?page=1",
        className: isActive("/popular"),
        svg: <IconHeartDollar />,
      },
    ],
    movies: {
      id: "movies",
      summary: [
        {
          name: "Фильмы",
          className: isActive("/movie"),
          svg: <IconChevronRight />,
        },
      ],
      buttons: [
        {
          name: "Популярно",
          url: "/popular?page=1",
          className: isActive("/popular"),
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
          name: "Коллекции",
          url: "/list?page=1",
          className: isActive("/list"),
          svg: <IconCards />,
        },
      ],
    },
    series: {
      id: "series",
      summary: [
        {
          name: "Сериалы",
          className: isActive("/tv-series"),
          svg: <IconChevronRight />,
        },
      ],
      buttons: [
        {
          name: "Популярно",
          url: "/popular?page=1",
          className: isActive("/popular"),
          svg: <IconHeartDollar />,
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
          name: "Коллекции",
          url: "/list?page=1",
          className: isActive("/list"),
          svg: <IconCards />,
        },
      ],
    },
    anime: {
      id: "anime",
      summary: [
        { name: "Аниме", className: isActive("/anime"), svg: <IconChevronRight /> },
      ],
      buttons: [
        {
          name: "Популярно",
          url: "/popular?page=1",
          className: isActive("/popular"),
          svg: <IconHeartDollar />,
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
      ],
    },
    bottom: [
      {
        name: "Анонсы",
        url: "/announced?page=1",
        className: isActive("/announced", true),
        svg: <IconSpeakerphone />,
      },
      {
        name: "Персоны",
        url: "/person?page=1",
        className: isActive("/person"),
        svg: <IconUsers />,
      },
    ],
  };

  return (
    <nav aria-label="Боковое меню навигации">
      <Search />
      <Button items={menuConfig.top} />

      <NavSection
        id={menuConfig.movies.id}
        summary={menuConfig.movies.summary}
        detailsButtons={menuConfig.movies.buttons}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <NavSection
        id={menuConfig.series.id}
        summary={menuConfig.series.summary}
        detailsButtons={menuConfig.series.buttons}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <NavSection
        id={menuConfig.anime.id}
        summary={menuConfig.anime.summary}
        detailsButtons={menuConfig.anime.buttons}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <Button items={menuConfig.bottom} />
    </nav>
  );
}
