"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import "./style.css";

export function TitleFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedRating, setSelectedRating] = useState("");

  useEffect(() => {
    setSelectedGenre(searchParams.get("genre") || "");
    setSelectedYear(searchParams.get("year") || "");
    setSelectedRating(searchParams.get("rating") || "");
  }, [searchParams]);

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

    selectedGenre ? params.set("genre", selectedGenre) : params.delete("genre");
    selectedYear ? params.set("year", selectedYear) : params.delete("year");
    selectedRating
      ? params.set("rating", selectedRating)
      : params.delete("rating");

    params.delete("page"); // сброс на первую страницу

    router.push(`?${params.toString()}`);
  };

  const resetFilters = () => {
    setSelectedGenre("");
    setSelectedYear("");
    setSelectedRating("");
    router.push("?");
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-100 rounded-xl shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="genre" className="block font-medium mb-1">
            Жанр:
          </label>
          <select
            id="genre"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">Все</option>
            {genreOptions.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="year" className="block font-medium mb-1">
            Год:
          </label>
          <select
            id="year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">Все</option>
            {yearOptions.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="rating" className="block font-medium mb-1">
            Рейтинг:
          </label>
          <select
            id="rating"
            value={selectedRating}
            onChange={(e) => setSelectedRating(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">Все</option>
            {ratingOptions.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-4">
        <button
          onClick={applyFilters}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Применить фильтр
        </button>
        <button
          onClick={resetFilters}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
        >
          Сбросить фильтр
        </button>
      </div>
    </div>
  );
}
