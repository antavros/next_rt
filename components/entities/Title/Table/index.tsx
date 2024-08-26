import React from 'react';

import { TitleCard } from "@/components/entities/Title/Card";
import { Pagination } from "@/components/features/Pagination";

import { Details } from "@/components/shared/api/next-title";
import "./style.css";

export const TitleTable: React.FC<Details> = ({ TableTitle, details, pagination }) => {

  const sortedDetails = details.sort((a: any, b: any) => b.year - a.year);

  return (
    <section className="titles">
      {TableTitle && (
        <h1>{TableTitle}</h1>
      )}
      <div className="tableTitles">
        {sortedDetails.map((detail: any) => (
          <TitleCard
            key={detail.id}
            details={detail}
          />
        ))}
      </div>
      <Pagination pagination={pagination} />
    </section>
  );
}
