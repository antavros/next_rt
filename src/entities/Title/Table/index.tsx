import React from 'react';
import { TitleCard } from "@/entities/Title/Card";
import { Details } from '@/shared/api/lib';
import "./style.css";

export const TitleTable: React.FC<Details> = ({ details }) => {

  return (
    <section className="titles">
      {details.map((detail: any) => (
        <TitleCard
          key={detail.id}
          details={detail}
        />
      ))}
    </section>
  );
}
