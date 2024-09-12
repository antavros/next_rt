"use client";

import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

import { UserRate } from "@/components/entities/User/features/rate";
import "./style.css";

interface RatingProps {
  personal?: number;
  kp?: number;
  imdb?: number;
  rt?: number;
}

export function getClassByRate({ vote }: { vote: number }) {
  const hue = (vote / 10) * 110;
  const saturation = 100;
  const lightness = 50;
  const transparent = 11;
  const rateColor = `hsl(${hue}, ${saturation}%, ${lightness}%, ${transparent})`;
  return {
    border: `0 solid ${rateColor}`,
    boxShadow: `0rem 0rem 0.3rem 0.15rem ${rateColor}`,
    color: `${rateColor}`,
  };
}

export const TitleRate: React.FC<RatingProps> = ({
  kp,
  imdb,
  rt,
  personal,
}) => {
  const { data: session } = useSession();

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
    <section className={`title_rate`}>
      {averageRating !== null && (
        <article
          className={"rt"}
          style={getClassByRate({ vote: averageRating })}
        >
          <Image fill={true} src="/images/RT.webp" alt="RT" priority={true} />
          <span>{averageRating.toFixed(1)}</span>
        </article>
      )}
      {kp !== undefined && kp > 0 && (
        <article className={"kp"} style={getClassByRate({ vote: kp })}>
          <h6>КП</h6>
          <span>{kp.toFixed(1)}</span>
        </article>
      )}
      {imdb !== undefined && imdb > 0 && (
        <article className={"imdb"} style={getClassByRate({ vote: imdb })}>
          <h6>IMDB</h6>
          <span>{imdb.toFixed(1)}</span>
        </article>
      )}
      {session && personal ? <UserRate /> : null}
    </section>
  );
};
