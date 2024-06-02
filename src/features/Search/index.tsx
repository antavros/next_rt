'use client'

import Link from 'next/link'
import { IconSearch } from '@tabler/icons-react';


import { useState } from 'react';
import './style.css';


export function Search({ onSearch }: any) {
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  return (
    <search className="search" id="search" onSubmit={handleSubmit}>
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
      <Link href={`/search/${searchValue}`}>
        <button type="submit" className="search_button" title='Найти'>
          <IconSearch stroke={2} />
        </button>
      </Link>
    </search>
  );
}