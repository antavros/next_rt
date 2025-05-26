"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { TitleCardSmall } from "@/components/entities/title/widgets/card/small";
import { PersonCard } from "@/components/entities/person/widgets/card";
import { Pagination } from "@/components/features/pagination";
import { TitleFilter } from "@/components/features/filter";

import "./style.css";

interface PaginationMeta {
  total: number;
  limit: number;
  page: number;
  pages: number;
}

interface RawDetails {
  docs?: any[];
  data?: any[];
  pagination?: PaginationMeta;
}

interface TitleTableProps {
  TableTitle: string;
  details: any[] | RawDetails;
  pagination?: PaginationMeta;
  paginationMode?: "classic" | "load-more" | "infinite-scroll";
}

export const TitleTable: React.FC<TitleTableProps> = ({
  TableTitle,
  details,
  pagination,
  paginationMode = "classic",
}) => {
  // Универсальное извлечение массива элементов
  const extractItems = (d: any[] | RawDetails): any[] => {
    if (Array.isArray(d)) return d;
    if (d.docs) return d.docs;
    if (d.data) return d.data;
    return [];
  };

  const [items, setItems] = useState<any[]>(extractItems(details));
  const [currentPagination, setCurrentPagination] = useState<
    PaginationMeta | undefined
  >(
    // при передаче pagination пропсом отдаём его, иначе из details.pagination
    pagination ?? (details as RawDetails).pagination
  );

  const searchParams = useSearchParams();

  useEffect(() => {
    setItems(extractItems(details));
    setCurrentPagination(pagination ?? (details as RawDetails).pagination);
  }, [details, pagination]);

  const loadMoreData = async (page: number) => {
    if (!currentPagination) return;
    try {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());

      const url = `${
        window.location.pathname
      }/api/load-more?${params.toString()}`;
      const res = await fetch(url);
      const json = await res.json();

      const newDocs: any[] = Array.isArray(json.details)
        ? json.details
        : Array.isArray(json.docs)
        ? json.docs
        : [];

      if (newDocs.length > 0) {
        const existingIds = new Set(items.map((it) => String(it.id)));
        const newItems = newDocs.filter(
          (it) => !existingIds.has(String(it.id))
        );

        if (newItems.length) {
          setItems((prev) => [...prev, ...newItems]);
          setCurrentPagination((prev) =>
            prev ? { ...prev, page } : { ...prev!, page }
          );
        }
      }
    } catch (err) {
      console.error("Ошибка при загрузке данных:", err);
    }
  };

  return (
    <section className="titles">
      <h1>{TableTitle}</h1>

      <div className="tableTitles">
        {items.length > 0 ? (
          items.map((item) =>
            TableTitle === "Персоны" ? (
              <PersonCard key={item.id} details={item} />
            ) : (
              <TitleCardSmall key={item.id} details={item} />
            )
          )
        ) : (
          <p>Нет данных для отображения</p>
        )}
      </div>

      <div className="config">
        <TitleFilter />

        {currentPagination && (
          <Pagination
            pagination={currentPagination}
            mode={paginationMode}
            onLoadMore={
              paginationMode === "load-more" ||
              paginationMode === "infinite-scroll"
                ? loadMoreData
                : undefined
            }
          />
        )}
      </div>
    </section>
  );
};
