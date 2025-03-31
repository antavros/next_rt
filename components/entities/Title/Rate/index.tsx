"use client";

import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

import { UserRate } from "@/components/entities/User/features/rate";
import "./style.css";

export function getClassByRate({ vote }: { vote: number | "none" }) {
  if (vote === 0 || vote === "none") {
    return {
      border: "0 solid gray",
      boxShadow: "0rem 0rem 0.3rem 0.15rem gray",
      color: "gray",
      transition: "all 1ms ease",
    };
  }

  const hue = (vote / 10) * 110;
  const saturation = 100;
  const lightness = 50;
  const transparent = 11;
  const rateColor = `hsla(${hue}, ${saturation}%, ${lightness}%, ${transparent})`;

  return {
    border: `0 solid ${rateColor}`,
    boxShadow: `0rem 0rem 0.3rem 0.15rem ${rateColor}`,
    color: rateColor,
    transition: "all 1ms ease",
  };
}

interface RatingProps {
  titleId?: any;
  personal?: number;
  kp?: number;
  imdb?: number;
  rt?: { kp?: number; imdb?: number };
}

export const TitleRate: React.FC<RatingProps> = ({
  kp,
  imdb,
  rt,
  personal,
  titleId,
}) => {
  const { data: session } = useSession();

  const ratings: number[] = [];

  if (kp) ratings.push(kp);
  if (imdb) ratings.push(imdb);
  if (rt?.kp) ratings.push(rt.kp);
  if (rt?.imdb) ratings.push(rt.imdb);
  if (personal) ratings.push(personal);

  const averageRating =
    rt && (rt.kp || rt.imdb)
      ? [rt.kp, rt.imdb]
          .filter((rating) => rating !== undefined)
          .reduce((sum, rating) => sum + (rating || 0), 0) /
        [rt.kp, rt.imdb].filter((rating) => rating !== undefined).length
      : null;

  return (
    <section className={"title_rate"}>
      {averageRating !== null && (
        <article
          className={"rt"}
          style={getClassByRate({ vote: averageRating })}
        >
          <Image fill={true} src="/images/RT.webp" alt="RT" priority={true} />
          <span>
            {Number.isInteger(averageRating)
              ? averageRating
              : averageRating.toFixed(1)}
          </span>
        </article>
      )}

      {kp !== undefined && kp > 0 && (
        <article className={"kp"} style={getClassByRate({ vote: kp })}>
          <h6>КП</h6>
          <span>{Number.isInteger(kp) ? kp : kp.toFixed(1)}</span>
        </article>
      )}

      {imdb !== undefined && imdb > 0 && (
        <article className={"imdb"} style={getClassByRate({ vote: imdb })}>
          <h6>IMDB</h6>
          <span>{Number.isInteger(imdb) ? imdb : imdb.toFixed(1)}</span>
        </article>
      )}

      {session ? <UserRate personal={personal} titleId={titleId} /> : null}
    </section>
  );
};
