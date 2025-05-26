"use client";

import React, { useState, useEffect } from "react";
import { TitleCardSmall } from "@/components/entities/title/widgets/card/small";
import { PersonCard } from "@/components/entities/person/widgets/card";
import { Pagination } from "@/components/features/pagination";
import { TitleFilter } from "@/components/features/filter";
import "./style.css";

export const TitleTable = ({ TableTitle, details, pagination }) => {
  const [items, setItems] = useState(details ?? []);
  const [currentPagination, setCurrentPagination] = useState(pagination);

  // 1) При изменении details/pagination сбрасываем стейт
  useEffect(() => {
    setItems(details ?? []);
    setCurrentPagination(pagination);
  }, [details, pagination]);

  // 2) Функция загрузки «load-more» для обоих режимов
  const loadMoreData = async (page) => {
    try {
      // Создаём новый набор query-параметров, меняем только page
      const params = new URLSearchParams(window.location.search);
      params.set("page", page.toString());
      const url = `${window.location.pathname}/api/load-more?${params.toString()}`;

      const response = await fetch(url);
      const json = await response.json();

      if (json.details && json.details.length > 0) {
        setItems((prev) => [...prev, ...json.details]);
        setCurrentPagination((prev) => ({ ...prev, page }));
      }
    } catch (error) {
      console.error("Ошибка при загрузке дополнительных данных", error);
    }
  };

  return (
    <section className="titles">
      <h1>{TableTitle}</h1>
      <div className="tableTitles">
        {items.length > 0 ? (
          items.map((detail) =>
            TableTitle === "Персоны" ? (
              <PersonCard key={detail.id} details={detail} />
            ) : (
              <TitleCardSmall key={detail.id} details={detail} />
            )
          )
        ) : (
          <p>Нет данных для отображения</p>
        )}
      </div>

      <div className="config">
        {/* Фильтры */}
        <TitleFilter />

        {/* Классическая пагинация */}
        <Pagination pagination={currentPagination} mode="classic" />

        {/* Кнопка «Показать ещё» */}
        <Pagination
          pagination={currentPagination}
          mode="load-more"
          onLoadMore={loadMoreData}
        />

        {/* Бесконечная прокрутка */}
        <Pagination
          pagination={currentPagination}
          mode="infinite-scroll"
          onLoadMore={loadMoreData}
        />
      </div>
    </section>
  );
};
