"use client";

import { useSession } from "next-auth/react";

import { ExpandableListPerson } from "./List/Person";
import { SwiperCardTrailer } from "./Swiper/Trailer";
import { SwiperCardPerson } from "./Swiper/Person";
import { SwiperCardTitle } from "./Swiper/Titles";
import { Player } from "@/components/entities/Player";

import style from "./style.module.css";

import { Details } from "@/components/shared/api/lib";

export function TitlePageBody({ details }: Details) {
  const { data: session, status } = useSession();

  const category = details.type.toLowerCase();
  let typeName: string;
  switch (category) {
    case "movie": {
      typeName = "фильмом";
      break;
    }
    case "tv-series": {
      typeName = "сериалом";
      break;
    }
    case "cartoon": {
      typeName = "мультфильмом";
      break;
    }
    case "animated-series": {
      typeName = "мультсериалом";
      break;
    }
    case "anime": {
      typeName = "аниме";
      break;
    }
    default: {
      typeName = "тайтлом";
    }
  }

  return (
    <div className={style.body}>
      <section className={style.block}>
        <h3>Описание</h3>
        <p>{details?.description}</p>
      </section>
      {details.trailers.length > 0 && (
        <section className={style.block}>
          <SwiperCardTrailer details={details} />
        </section>
      )}
      {status && (status as any) === "authenticated" ? (
        <section className={style.block}>
          <h3>Просмотр</h3>
          <Player details={details.id} />
        </section>
      ) : null}
      <section className={style.block}>
        <h3>Актеры</h3>
        <SwiperCardPerson details={details} />
      </section>
      <section className={style.block}>
        <h3>Над {typeName} работали</h3>
        <ExpandableListPerson persons={details?.person} />
      </section>
      {details.similar.length > 0 && (
        <>
          <hr />
          <div className={`${style.bottom}`}>
            <h3>Похожие</h3>
            <SwiperCardTitle details={details} />
          </div>
        </>
      )}
    </div>
  );
}
