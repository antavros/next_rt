"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IconSearch, IconX } from "@tabler/icons-react";
import { Button, Item } from "@/components/features/Button";

import "./style.css";

interface SearchProps {
  onSearch?: (value: string) => void;
}

export function Search({ onSearch }: SearchProps) {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchValue);
    }
    router.push(`/search?page=1&query=${searchValue}`);
  };

  const handleReset = () => {
    setSearchValue("");
  };

  const buttonItemsSubmit: Item[] = [
    {
      type: "submit",
      svg: <IconSearch stroke={2} />,
    },
  ];

    const buttonItemsReset: Item[] = [
      {
      type: "reset",
      svg: <IconX stroke={2} />,
      },
    ];
  return (
    <div className="searchContainer">
      <form
        className="search"
        id="search"
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
        <Button items={buttonItemsSubmit} />
        <input
          className="search_input"
          type="text"
          id="search_input"
          name="search"
          placeholder="ПОИСК"
          autoComplete="on"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          required
          minLength={1}
          maxLength={99}
          size={10}
        />
        <Button items={buttonItemsReset} />
      </form>
    </div>
  );
}
