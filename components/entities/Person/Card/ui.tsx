"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Preloader } from "@/components/features/PreLoader";

import { TitleRate } from "@/components/entities/Title/Rate/";
import "./style.css";

export function ClientTitleCard({ details }: { readonly details: any }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <article className="title_card" id={details.id}>
      {!imageLoaded && <Preloader />}
      <TitleRate personal={details.average_imdb} rt={details.average_kp} />
      <Link href={`/${"person"}/${details.id}`} prefetch={false}>
        <Image
          onLoad={() => setImageLoaded(true)}
          width={256}
          height={400}
          quality={25}
          loading={"lazy"}
          src={details.poster}
          alt={details.name}
        />
        <section className="card_info">
          <h3>{details.name}</h3>
          <h4>{details.enName}</h4>
          <p>Возраст: {details.age}</p>
          <p>Пол: {details.sex}</p>
          <p>{details.sDescription}</p>
        </section>
      </Link>
    </article>
  );
}
