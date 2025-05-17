"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { PreLoader } from "@/components/widgets/preLoader";
import { TitleCardWidgets } from "@/components/entities/user/widgets/card/title";
import { SwiperWatchability } from "@/components/entities/title/features/swiper/watchability";

import "./style.css";

export function TitleCardBig({ details }: { readonly details: any }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <article className="card_big" id={details.id}>
      {!imageLoaded && <PreLoader />}
      <Link href={`/${details.type}/${details.id}`} prefetch={false}>
        {details?.backdrop ? (
          <Image
            onLoad={() => setImageLoaded(true)}
            width={1920}
            height={1080}
            quality={10}
            src={details.backdrop}
            className="card_big_back"
            alt={details.name}
          />
        ) : details?.trailers?.[0]?.url ? (
          <iframe
            width={1920}
            height={1080}
            className="card_big_back"
            src={details?.trailers[0]?.url}
            title={details?.trailers?.name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : null}
      </Link>
      <section className="card_big_info">
        <span>
          {details?.logo ? (
            <Image
              alt={details?.name}
              src={details?.logo}
              className="card_big_logo"
              priority={true}
              width={640}
              height={360}
              quality={25}
            />
          ) : (
            <Image
              alt={details?.name}
              src={details?.posters}
              className="card_big_poster"
              priority={true}
              width={256}
              height={384}
              quality={25}
            />
          )}

        </span>
        <h5>{details.name}</h5>
        <h6>{details.enName || details?.alternativeName}</h6>
                  {details?.ageMpaa.length || details?.ageRating.length > 0 ? (
            <section className="card_big_age">
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
        <p>{details.countries}</p>
        <p>
          {details?.year?.length > 0 ? `${details.year} г` : ""}
          {details?.length ? ` ${details.length}` : ""}
        </p>
        <p>{details?.genres}</p>
        <h4>{details.sDescription}</h4>
        <TitleCardWidgets details={details} rateAll={true} />
        {details?.watchability.length > 0 ? (
          <section className="watchability">
            <h3>Где смотреть?</h3>
            <SwiperWatchability details={details?.watchability} />
          </section>
        ) : null}
      </section>
    </article>
  );
}
