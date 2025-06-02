// components/entities/title/widgets/card/small.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { PreLoader } from "@/components/widgets/preLoader";
import { TitleCardWidgets } from "@/components/entities/user/widgets/card/title";

import "./style.css";

interface TitleCardSmallProps {
  details: any;
}

export const TitleCardSmall: React.FC<TitleCardSmallProps> = ({ details }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // 1. Составляем строку со странами (если это массив объектов { name: string })
  const countriesStr = Array.isArray(details.countries)
    ? details.countries.map((c: any) => c.name).join(", ")
    : typeof details.countries === "string"
      ? details.countries
      : "";

  // 2. Составляем строку с жанрами (если это массив объектов { name: string })
  const genresStr = Array.isArray(details.genres)
    ? details.genres.map((g: any) => g.name).join(", ")
    : typeof details.genres === "string"
      ? details.genres
      : "";

  // 3. Источник постера: API отдаёт объект { url, previewUrl }
  const posterSrc =
    details.poster?.previewUrl ??
    details.poster?.url ??
    details.image ??
    details.prevPosters ??
    "/images/placeholder.webp";

  return (
    <article className="title_card_small" id={String(details?.id)}>
      {!imageLoaded && <PreLoader />}

      <Link href={`/${details?.type}/${details?.id}`} prefetch={false}>
        <Image
          onLoad={() => setImageLoaded(true)}
          width={248}
          height={368}
          quality={50}
          className="card_small_poster"
          src={posterSrc}
          alt={details?.name || "Poster"}
        />

        <section className="card_small_info">
          {/* Название */}
          <h5>{details?.name}</h5>

          {/* Оригинальное имя (если есть) */}
          <h6>{details?.enName || details?.alternativeName || ""}</h6>

          {/* Список стран как строка */}
          <p>{countriesStr}</p>

          {/* Год и длительность (в минутах) */}
          <p>
            {details?.year ? `${details.year} г` : ""}
            {details?.movieLength
              ? ` • ${Math.floor(details.movieLength / 60)}ч${details.movieLength % 60}м`
              : ""}
          </p>

          {/* Список жанров как строка */}
          <p>{genresStr}</p>

          {/* Краткое описание (если есть) */}
          <p>{details?.shortDescription || details?.description || ""}</p>
        </section>
      </Link>

      <TitleCardWidgets details={details} />
    </article>
  );
};
