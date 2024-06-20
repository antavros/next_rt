'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { IconSearch } from '@tabler/icons-react';
import './style.css';

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

  return (
    <form className="search" id="search" onSubmit={handleSubmit}>
      <input
        className="search_input"
        type="text"
        id="search_input"
        name="search"
        placeholder="ПОИСК"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        required
        minLength={1}
        maxLength={99}
        size={10}
      />
      <button type="submit" title='Найти'>
        <IconSearch stroke={2} />
      </button>
    </form>
  );
}
