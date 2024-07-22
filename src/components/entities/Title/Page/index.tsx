"use client";

import { TitlePageHead } from './Head';
import { TitlePageBody } from './Body';
import {
  markTitleVisited,
  toggleFavourite,
  rateTitle
} from "@/components/shared/api/clientUtils";
import { TitleRate } from "@/components/entities/Title/Rate/";

import "./style.css"

export function TitlePage({ details }: { readonly details: any }) {
  markTitleVisited(details.id);
  const handleFavouriteClick = async () => {
    await toggleFavourite(details.id);
  };

  const handleRatingChange = async (newRating: number) => {
    await rateTitle(details.id, newRating);
  };
  return (
    <section className="titlePage">
      <TitlePageHead details={details} />
      <TitleRate
        personal={details.personal_rating}
        kp={details.kp_rating}
        imdb={details.imdb_rating}
        rt={details.rt_rating}
        onRateChange={handleRatingChange} // Добавляем обработчик изменения рейтинга
      />
      <button onClick={handleFavouriteClick}>
        {details.favourite ? "Remove from Favourite" : "Add to Favourite"}
      </button>
      <TitlePageBody details={details} />
    </section >
  );
}