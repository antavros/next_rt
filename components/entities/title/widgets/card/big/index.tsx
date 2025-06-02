// components/entities/title/widgets/card/big.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { PreLoader } from "@/components/widgets/preLoader";
import { TitleCardWidgets } from "@/components/entities/user/widgets/card/title";
import { SwiperWatchability } from "@/components/entities/title/features/swiper/watchability";

import "./style.css";

interface TitleCardBigProps {
  details: any;
}

export function TitleCardBig({ details }: TitleCardBigProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  // 1. Строка стран
  const countriesStr = Array.isArray(details.countries)
    ? details.countries.map((c: any) => c.name).join(", ")
    : typeof details.countries === "string"
      ? details.countries
      : "";

  // 2. Строка жанров
  const genresStr = Array.isArray(details.genres)
    ? details.genres.map((g: any) => g.name).join(", ")
    : typeof details.genres === "string"
      ? details.genres
      : "";

  // 3. Выбираем URL фонового изображения (backdrop.url или previewUrl) или null
  const backdropUrl =
    details.backdrop?.url ?? details.backdrop?.previewUrl ?? null;

  // 4. Выбираем URL логотипа, если есть, иначе URL постера, иначе заглушка
  const logoUrl = details.logo?.url ?? details.logo?.previewUrl ?? null;
  const posterUrl = details.poster?.url ?? details.poster?.previewUrl ?? null;
  const logoOrPosterUrl = logoUrl ?? posterUrl ?? "/images/placeholder.webp";

  // 5. Преобразование длительности в формат "XчYм"
  const lengthStr =
    typeof details.movieLength === "number"
      ? `${Math.floor(details.movieLength / 60)}ч${details.movieLength % 60}м`
      : "";

  // 6. Возрастной рейтинг
  const ageMpaa = typeof details.ageMpaa === "string" ? details.ageMpaa : "";
  const ageRating =
    typeof details.ageRating === "number" && details.ageRating > 0
      ? `${details.ageRating}+`
      : "";

  return (
    <article className="card_big" id={String(details.id)}>
      {!imageLoaded && <PreLoader />}

      <Link href={`/${details.type}/${details.id}`} prefetch={false}>
        {backdropUrl ? (
          <Image
            onLoad={() => setImageLoaded(true)}
            width={1920}
            height={1080}
            quality={10}
            src={backdropUrl}
            className="card_big_back"
            alt={details.name}
          />
        ) : details.trailers?.[0]?.url ? (
          <iframe
            width={1920}
            height={1080}
            className="card_big_back"
            src={details.trailers[0].url}
            title={details.trailers[0].name || details.name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : null}
      </Link>

      <section className="card_big_info">
        <span>
          <Image
            alt={details.name}
            src={logoOrPosterUrl}
            className={details.logo ? "card_big_logo" : "card_big_poster"}
            priority={true}
            width={details.logo ? 640 : 256}
            height={details.logo ? 360 : 384}
            quality={25}
          />
        </span>

        <h5>{details.name}</h5>
        <h6>{details.enName || details.alternativeName || ""}</h6>

        {(ageMpaa || ageRating) && (
          <section className="card_big_age">
            <h6>
              {ageMpaa && <span>{ageMpaa}</span>}
              {ageRating && <span>{ageRating}</span>}
            </h6>
          </section>
        )}

        <p>{countriesStr}</p>
        <p>
          {details.year ? `${details.year} г` : ""}
          {lengthStr ? ` • ${lengthStr}` : ""}
        </p>
        <p>{genresStr}</p>

        <h4>{details.shortDescription || details.description || ""}</h4>

        <TitleCardWidgets details={details} rateAll={true} />

        {Array.isArray(details.watchability) &&
          details.watchability.length > 0 && (
            <section className="watchability">
              <h3>Где смотреть?</h3>
              <SwiperWatchability details={details.watchability} />
            </section>
          )}
      </section>
    </article>
  );
}
