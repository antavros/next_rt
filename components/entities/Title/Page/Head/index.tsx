"use client";

import Image from "next/image";

import { TitleRate } from "@/components/entities/Title/Rate/";
import { SwiperWatchability } from "./Swiper/watchability";

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
          <section className={`${style.block1}`}>

        <Image
          width={1920}
          height={1080}
          className={style.title_logo}
          quality={25}
          src={details?.logo || details?.poster}
          alt={details?.name}
          priority={true}
        />
        <div className={style.age}>
          <h6>
            {details?.ageMpaa?.length > 0 && (
              <span>{details?.ageMpaa}</span>
            )}
            <span>{details?.ageRating}+</span>
          </h6>
        </div>

        <h1>{details?.name}</h1>
        <h2>{details?.enName}</h2>

        <p>{details?.countries}</p>
        <p>
          {details?.year}г {details?.length}
        </p>
        <p>{details?.genres}</p>
        <TitleRate
          rt={{ kp: details.average_kp, imdb: details.average_imdb }}
          kp={details?.average_kp}
          imdb={details?.average_imdb}
          personal={details?.userRating}
          titleId={details?.id}
        />
                  </section>

        {details?.watchability.length > 0 ? (
          <section className={`${style.block2}`}>
            <h3>Где смотреть?</h3>
            <SwiperWatchability details={details?.watchability} />
          </section>
        ) : null}
      </div>
    </div>
  );
}
