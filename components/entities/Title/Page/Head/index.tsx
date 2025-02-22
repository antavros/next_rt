"use client";

import Image from "next/image";

import { TitleRate } from "@/components/entities/Title/Rate/";
import { SwiperWatchability } from "./Swiper/watchability";

import "./style.css";

export function TitlePageHead({ details }: { readonly details: any }) {
  return (
    <div className="head">

      {details?.backdrop ? (
        <Image
          width={640}
          height={360}
          quality={1}
          src={details.backdrop}
          className="title_back"
          alt={details.name}
          priority={true}
        />
      ) : (
        <iframe
          width="100%"
          height="100%"
          className="title_back"
          src={details?.trailers[0]?.url}
          title={details?.trailers?.name}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
      <div className="head_Info">
        <section className="block1">
          <Image
            width={640}
            height={360}
            quality={1}
            className="title_logo"
            src={details?.logo || details?.poster}
            alt={details?.name}
            priority={true}
          />

          {details?.ageMpaa.length || details?.ageRating.length > 0 ? (
            <section className="age">
              <h6>
                {details?.ageMpaa?.length > 0 && (
                  <span>{details?.ageMpaa}</span>
                )}
                {details?.ageRating?.length > 0 && (
                  <span>{details?.ageRating}+</span>
                )}
              </h6>
            </section>
          ) : null}

          <h1>{details?.name}</h1>
          <h2>{details?.enName}</h2>
          <p>{details?.countries}</p>
          <p>{details?.year}г {details?.length}</p>
          <p>{details?.genres}</p>
          <TitleRate
            rt={{ kp: details.average_kp, imdb: details.average_imdb }}
            kp={details.average_kp}
            imdb={details.average_imdb}
            personal={details?.userRating}
            titleId={details?.id}
          />
        </section>

        {details?.watchability.length > 0 ? (
          <section className="block2">
            <h3>Где смотреть?</h3>
            <SwiperWatchability details={details?.watchability} />
          </section>
        ) : null}
      </div>
    </div >
  );
}
