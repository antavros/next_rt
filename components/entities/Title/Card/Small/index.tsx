"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { Preloader } from "@/components/features/PreLoader";
import { TitleCardWidgets } from "@/components/entities/User/widgets/Card/title";

import "./style.css";

export function TitleCardSmall({ details }: { readonly details: any }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  console.log(details);
  return (
    <article className="title_card_small" id={details?.id}>
      {!imageLoaded && <Preloader />}
      <Link href={`/${details?.type}/${details?.id}`} prefetch={false}>
        <Image
          onLoad={() => setImageLoaded(true)}
          width={256}
          height={384}
          quality={25}
          className="card_small_poster"
          src={
            details?.prevPosters ??
            details?.image ??
            details?.poster?.previewUrl ??
            details?.poster?.url ??
            "/images/placeholder.webp"
          }
          alt={details?.name}
        />
        <section className="card_small_info">
          <h5>{details?.name}</h5>
          <h6>{details?.enName || details?.alternativeName}</h6>
          <p>{details?.countries}</p>
          <p>
            {details?.year?.length > 0 ? `${details.year} г` : ""}
            {details?.length ? ` ${details.length}` : ""}
          </p>
          <p>{details?.genres || null}</p>
          <p>{details?.sDescription || details?.description}</p>
        </section>
      </Link>
      <TitleCardWidgets details={details} />
    </article>
  );
}
