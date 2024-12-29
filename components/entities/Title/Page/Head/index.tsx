"use client";

import Image from "next/image";

import { TitleRate } from "@/components/entities/Title/Rate/";
import style from "./style.module.css";

export function TitlePageHead({ details }: { readonly details: any }) {
  return (
    <div className={style.head}>
      {details?.backdrop ? (
        <Image
          fill={true}
          src={details.backdrop}
          className={style.title_back}
          alt={details.name}
          quality={25}
          priority={true}
        />
      ) : (
        <iframe
          width="100%"
          height="100%"
          className={style.title_back}
          src={details?.trailers[0]?.url}
          title={details?.trailers?.name}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
      <div className={style.head_Info}>
        <Image
          width={1920}
          height={1080}
          className={style.title_logo}
          quality={25}
          src={details?.logo || details?.poster}
          alt={details?.name}
          priority={true}
        />
        <h1>{details?.name}</h1>
        <h2>{details?.enName}</h2>
        <p>{details?.countries}</p>
        <p>
          {details?.year}г {details?.length}
        </p>
        <p>{details?.genres}</p>
        <TitleRate
          kp={details?.average_kp}
          imdb={details?.average_imdb}
          personal={details?.average_imdb}
          rt={details?.average_kp}
        />
      </div>
    </div>
  );
}
