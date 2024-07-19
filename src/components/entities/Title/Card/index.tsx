"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Preloader } from "@/components/features/PreLoader";
import {
  toggleFavourite,
  rateTitle,
} from "@/components/shared/api/clientUtils";

import { TitleRate } from "@/components/entities/Title/Rate/";
import "./style.css";

export function TitleCard({ details }: { readonly details: any }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleFavouriteClick = async () => {
    await toggleFavourite(details.id);
  };

  const handleRatingChange = async (newRating: number) => {
    await rateTitle(details.id, newRating);
  };

  return (
    <article className="title_card" id={details.id}>
      {!imageLoaded && <Preloader />}
      <Link href={`/${details.type}/${details.id}`} prefetch={false}>
        <Image
          onLoad={() => setImageLoaded(true)}
          width={256}
          height={400}
          quality={25}
          loading={"lazy"}
          src={details.poster}
          alt={details.name}
        />
        <section className="card_info">
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
          <h3>{details.name}</h3>
          <h4>{details.enName}</h4>
          <p>{details.countries}</p>
          <p>
            {details.year}г {details.length}
          </p>
          <p>{details.genres}</p>
          <p>{details.sDescription}</p>
        </section>
      </Link>
    </article>
  );
}
