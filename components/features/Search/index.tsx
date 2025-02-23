"use client";

import { useState, useEffect } from "react";
import { SearchForm } from "@/components/features/Search/Form";
import { IconSearch, IconX } from "@tabler/icons-react";
import { Button, Item } from "@/components/features/Button";

import "./style.css";

export function Search() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  const handleSearch = () => {
    setIsModalOpen(false);
  };

  const buttonItemsSearch: Item[] = [
    {
      name: isModalOpen ? "Закрыть" : "Поиск",
      className: "buttonISearch",
      svg: isModalOpen ? <IconX stroke={2} /> : <IconSearch stroke={2} />,
      onClick: () => setIsModalOpen(!isModalOpen),
    },
  ];

  return (
    <div className="searchContainer">
      <Button items={buttonItemsSearch} />
      <dialog className="searchModal" open={isModalOpen}>
        <SearchForm onSearch={handleSearch} />
      </dialog>
    </div>
  );
}
