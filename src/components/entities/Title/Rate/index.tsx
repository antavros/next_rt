"use client";

import React, { useState } from "react";
import Image from "next/image";
import { IconUserCircle } from "@tabler/icons-react";
import style from "./style.module.css";
import { rateTitle } from "@/components/shared/api/clientUtils";

interface RatingProps {
  personal?: number;
  kp?: number;
  imdb?: number;
  rt?: number;
  onRateChange?: (newRating: number) => void; // Добавляем onRateChange для обработки изменений рейтинга
}

function getClassByRate({ vote }: { vote: number }) {
  const hue = (vote / 10) * 110;
  const saturation = 100;
  const lightness = 50;
  const transparent = 1;
  const rateColor = `hsl(${hue}, ${saturation}%, ${lightness}%, ${transparent})`;
  return {
    border: `0 solid ${rateColor}`,
    boxShadow: `0rem 0rem 0.1rem 0.15rem ${rateColor}`,
    color: `${rateColor}`,
  };
}

export const TitleRate: React.FC<RatingProps> = ({
  kp,
  imdb,
  rt,
  personal,
  onRateChange,
}) => {
  const [userRating, setUserRating] = useState<number | null>(null);

  const handleRateChange = async (newRating: number) => {
    setUserRating(newRating);
    if (onRateChange) {
      await onRateChange(newRating);
    }
  };

  const ratings = [];
  if (kp) ratings.push(kp);
  if (imdb) ratings.push(imdb);
  if (rt) ratings.push(rt);
  if (personal) ratings.push(personal);

  const averageRating =
    ratings.length > 0
      ? ratings.reduce((total, rating) => total + rating, 0) / ratings.length
      : null;

  return (
    <section className={`${style.title_rate} title_rate`}>
      {averageRating !== null && (
        <article
          className={style.rt}
          style={getClassByRate({ vote: averageRating })}
        >
          <Image fill={true} src="/images/RT.webp" alt="RT" priority={true} />
          <span>{averageRating.toFixed(1)}</span>
        </article>
      )}
      {kp !== undefined && kp > 0 && (
        <article className={style.kp} style={getClassByRate({ vote: kp })}>
          <h6>КП</h6>
          <span>{kp.toFixed(1)}</span>
        </article>
      )}
      {imdb !== undefined && imdb > 0 && (
        <article className={style.imdb} style={getClassByRate({ vote: imdb })}>
          <h6>IMDB</h6>
          <span>{imdb.toFixed(1)}</span>
        </article>
      )}
      {personal !== undefined && personal > 0 && (
        <article
          className={style.personal}
          style={getClassByRate({ vote: personal })}
        >
          <IconUserCircle stroke={2} />
          <span>{personal.toFixed(1)}</span>
        </article>
      )}
      <div className={style.rating_input}>
        <label htmlFor="rating">Your Rating: </label>
        <input
          type="number"
          id="rating"
          name="rating"
          min="1"
          max="10"
          value={userRating ?? ""}
          onChange={(e) => handleRateChange(Number(e.target.value))}
        />
      </div>
    </section>
  );
};
