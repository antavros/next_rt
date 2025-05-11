"use client";

import Link from "next/link";
import Image from "next/image";

import { CustomSwiper } from "@/components/features/swiper/customSwiper";
import { Details } from "@/components/shared/api/next-title";

import style from "./style.module.css";

export function SwiperCardPerson({ details }: Details) {
  const filteredPersonsActor = details?.person.filter(
    (person: any) => person.enProfession === "actor"
  );
  const object = filteredPersonsActor ?? [];

  const renderSlide = (person: any) => (
    <Link
      className={style.swiper_person_wrapper}
      href={`/person/${person.id}`}
      prefetch={false}
      title={`${person.name ?? person.enName} - ${person.description}`}
    >
      <Image
        width={162}
        height={256}
        src={person.photo}
        alt={`${person.name ?? person.enName} - ${person.description}`}
      />
      <section className={style.swiper_person_Info}>
        <h4>{person.name ?? person.enName}</h4>
        <p>{person.description}</p>
      </section>
    </Link>
  );

  return (
    <CustomSwiper
      style={style.swiper_slide}
      object={object}
      renderSlide={renderSlide}
    />
  );
}
