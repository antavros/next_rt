"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Preloader } from "@/components/features/PreLoader";

import "./style.css";

export function ClientTitleCard({ details }: { readonly details: any }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <article className="table_card" id={details.id}>
      {!imageLoaded && <Preloader />}
      <Link
        href={`/person/${details.id}`}
        prefetch={false}
      >
        <Image
          onLoad={() => setImageLoaded(true)}
          width={256}
          height={400}
          quality={25}
          loading={"lazy"}
          src={details.poster}
          alt={details.name}
        />
        <section className="table_card_person_Info">
          <h3>{details.name ? details.name : details.enName}</h3>
          <h4>{details.enName}</h4>
          <h4>{details.profession}</h4>
          <p>Возраст: {details.age} Пол: {details.sex}</p>
          <p>{details.description}</p>
        </section>
      </Link>
    </article>
  );
}
