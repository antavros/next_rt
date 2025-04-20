"use client";

import Image from "next/image";

import { SwiperWatchability } from "./Swiper/watchability";
import { TitleCardWidgets } from "@/components/entities/User/widgets/Card/title";

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
        <span>
          {details?.logo ? (
            <Image
              width={640}
              height={360}
              quality={1}
              className="title_logo"
              src={details?.logo}
              alt={details?.name}
              priority={true}
            />
          ) : (
            <Image
              width={256}
              height={384}
              quality={25}
              className="title_poster"
              src={details?.posters}
              alt={details?.name}
              priority={true}
            />
          )}
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
        </span>
        <h1>{details?.name}</h1>
        <h2>{details?.enName}</h2>
        <p>{details?.countries}</p>
        <p>
          {details?.year}г {details?.length}
        </p>
        <p>{details?.genres}</p>
        {details?.watchability.length > 0 ? (
          <section className="watchability">
            <h3>Где смотреть?</h3>
            <SwiperWatchability details={details?.watchability} />
          </section>
        ) : null}
        <TitleCardWidgets details={details} rateAll={true} />
      </div>
    </div>
  );
}
