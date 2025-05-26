"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import "./style.css";

export function TitleFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedGenre, setSelectedGenre] = useState<string>(
    searchParams.get("genre") || ""
  );
  const [selectedYear, setSelectedYear] = useState<string>(
    searchParams.get("year") || ""
  );
  const [selectedRating, setSelectedRating] = useState<string>(
    searchParams.get("rating") || ""
  );

  const genreOptions = [
    "драма",
    "комедия",
    "боевик",
    "аниме",
    "триллер",
    "мелодрама",
    "ужасы",
  ];

  const yearOptions = Array.from({ length: 2025 - 1950 + 1 }, (_, i) =>
    (1950 + i).toString()
  ).reverse();

  const ratingOptions = [
    { label: "8+", value: "8" },
    { label: "7+", value: "7" },
    { label: "6+", value: "6" },
    { label: "5+", value: "5" },
  ];

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (selectedGenre) {
      params.set("genre", selectedGenre);
    } else {
      params.delete("genre");
    }

    if (selectedYear) {
      params.set("year", selectedYear);
    } else {
      params.delete("year");
    }

    if (selectedRating) {
      params.set("rating", selectedRating);
    } else {
      params.delete("rating");
    }

    // Сброс страницы при фильтрации
    params.delete("page");

    router.push(`?${params.toString()}`);
  };

  const resetFilters = () => {
    setSelectedGenre("");
    setSelectedYear("");
    setSelectedRating("");
    router.push("?");
  };

  return (
    <div className="filter-dropdowns">
      <div className="dropdown">
        <label htmlFor="genre">Жанр:</label>
        <select
          id="genre"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="">Все</option>
          {genreOptions.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <div className="dropdown">
        <label htmlFor="year">Год:</label>
        <select
          id="year"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="">Все</option>
          {yearOptions.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="dropdown">
        <label htmlFor="rating">Рейтинг:</label>
        <select
          id="rating"
          value={selectedRating}
          onChange={(e) => setSelectedRating(e.target.value)}
        >
          <option value="">Все</option>
          {ratingOptions.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-buttons">
        <button className="apply-button" onClick={applyFilters}>
          Применить фильтр
        </button>
        <button className="reset-button" onClick={resetFilters}>
          Сбросить фильтр
        </button>
      </div>
    </div>
  );
}
