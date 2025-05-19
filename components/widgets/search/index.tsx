import { useState, useEffect, useRef } from "react";
import { SearchForm } from "@/components/widgets/search/form";
import { IconSearch, IconX } from "@tabler/icons-react";
import { Button, Item } from "@/components/features/button";
import "./style.css";

export function Search() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null); // создаём ref

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
      // Ставим фокус на input после рендера модалки
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
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
    <>
      <dialog className="searchModal" open={isModalOpen}>
        <SearchForm onSearch={handleSearch} inputRef={inputRef} />
      </dialog>
      <div className="searchContainer">
        <Button items={buttonItemsSearch} />
      </div>
    </>
  );
}
