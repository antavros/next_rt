import React from "react";

import { TitleCardSmall } from "@/components/entities/Title/Card/Small";
import { PersonCard } from "@/components/entities/Person/Card";

import { Pagination } from "@/components/features/Pagination";

import { Details } from "@/components/shared/api/next-title";
import "./style.css";

export const TitleTable: React.FC<Details> = ({
  TableTitle,
  details,
  pagination,
}) => {
  // const sortedDetails = details.sort((a: any, b: any) => b.year - a.year);

  return (
    <section className="titles">
      {TableTitle && <h1>{TableTitle}</h1>}
      <div className="tableTitles">
        {details?.length > 0 ? (
          details.map((detail: any) =>
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
      <Pagination pagination={pagination} />
    </section>
  );
};
