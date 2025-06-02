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
  // Вспомогательная функция для извлечения массива объектов
  const extractItems = (d: any[] | RawDetails): any[] => {
    if (Array.isArray(d)) return d;
    if (d.docs) return d.docs;
    if (d.data) return d.data;
    return [];
  };

  const [items, setItems] = useState<any[]>(extractItems(details));
  const [currentPagination, setCurrentPagination] = useState<
    PaginationMeta | undefined
  >(pagination ?? (details as RawDetails).pagination);

  const searchParams = useSearchParams();

  // При изменении incoming пропсов пересчитываем стейт
  useEffect(() => {
    setItems(extractItems(details));
    setCurrentPagination(pagination ?? (details as RawDetails).pagination);
  }, [details, pagination]);

  // Функция для загрузки следующей страницы (load more / infinite scroll)
  const loadMoreData = async (nextPage: number) => {
    if (!currentPagination) return;
    try {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", nextPage.toString());

      const url = `${window.location.pathname}/api/load-more?${params.toString()}`;
      const res = await fetch(url);
      const json = await res.json();

      const newDocs: any[] = Array.isArray(json.details)
        ? json.details
        : Array.isArray(json.docs)
          ? json.docs
          : [];

      if (newDocs.length) {
        const existingIds = new Set(items.map((it) => String(it.id)));
        const uniqueNewItems = newDocs.filter(
          (it) => !existingIds.has(String(it.id))
        );

        if (uniqueNewItems.length) {
          setItems((prev) => [...prev, ...uniqueNewItems]);
          setCurrentPagination((prev) =>
            prev
              ? { ...prev, page: nextPage }
              : { ...currentPagination!, page: nextPage }
          );
        }
      }
    } catch (err) {
      console.error("Ошибка при загрузке дополнительных данных:", err);
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
