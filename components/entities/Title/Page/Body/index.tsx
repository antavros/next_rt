"use client";

import { useSession } from "next-auth/react";

import { ExpandableListPerson } from "./List/Person";
import { DetailsList } from "./List/Info";

import { SwiperCardTrailer } from "./Swiper/Trailer";
import { SwiperCardPerson } from "./Swiper/Person";
import { SwiperCardTitle } from "./Swiper/Titles";
import { SwiperWatchability } from "./Swiper/watchability";

import { Player } from "@/components/entities/Player";

import style from "./style.module.css";

import { Details } from "@/components/shared/api/next-title";

export function TitlePageBody({ details }: Details) {
  const { data: session } = useSession();
  const category = details?.type.toLowerCase();
  let typeName: string;
  let typeName2: string;
  let typeName3: string;
  let typeName4: string;
  switch (category) {
    case "movie": {
      typeName = "фильмом";
      typeName2 = "фильме";
      typeName3 = "фильма";
      typeName4 = "фильм";
      break;
    }
    case "tv-series": {
      typeName = "сериалом";
      typeName2 = "сериале";
      typeName3 = "сериала";
      typeName4 = "сериал";
      break;
    }
    case "cartoon": {
      typeName = "мультфильмом";
      typeName2 = "мультфильме";
      typeName3 = "мультфильма";
      typeName4 = "мультфильм";
      break;
    }
    case "animated-series": {
      typeName = "мультсериалом";
      typeName2 = "мультсериале";
      typeName3 = "мультсериала";
      typeName4 = "мультсериал";
      break;
    }
    case "anime": {
      typeName = "аниме";
      typeName2 = "аниме";
      typeName3 = "аниме";
      typeName4 = "аниме";
      break;
    }
    default: {
      typeName = "тайтлом";
      typeName2 = "тайтле";
      typeName3 = "тайтла";
      typeName4 = "тайтл";
    }
  }
  return (
    <div className={style.body}>
      <section className={`${style.details}`}>
        <div className={`${style.details_block}`}>
          {details?.watchability.length > 0 ? (
            <section className={`${style.block} ${style.watchability}`}>
              <h3>Где смотреть {typeName4}</h3>
              <SwiperWatchability details={details?.watchability} />
            </section>
          ) : null}
        </div>

        <div className={`${style.details_block}`}>
          <span className={style.d}>
            <span className={style.e}>
              <section className={`${style.block} ${style.detailsList}`}>
                <h3>О {typeName2}</h3>
                <DetailsList details={details} />
              </section>
              <section className={`${style.block} ${style.description}`}>
                <h3>Описание</h3>
                <p>{details?.description}</p>
              </section>
            </span>

            <section className={`${style.block} ${style.person}`}>
              <h3>Над {typeName} работали</h3>
              <ExpandableListPerson persons={details?.person} />
            </section>
          </span>

          {details?.trailers?.length > 0 && (
            <section className={`${style.block} ${style.trailers}`}>
              <h3>Трейлеры</h3>
              <SwiperCardTrailer details={details} />
            </section>
          )}
        </div>

        <div className={`${style.details_block}`}>
          <section className={`${style.block} ${style.actors}`}>
            <h3>Актеры</h3>
            <SwiperCardPerson details={details} />
          </section>
        </div>
      </section>

      {session?.user?.role == "USER" ? (
        <section className={`${style.block} ${style.player}`}>
          <h3>Просмотр</h3>
          <Player details={details?.id} />
        </section>
      ) : null}

      <section className={`${style.add}`}>
        {details?.chapters?.length > 0 ? (
          <section className={`${style.block} ${style.chapters}`}>
            <h3>Другие части {typeName3}</h3>
            <SwiperCardTitle details={details?.chapters} />
          </section>
        ) : null}
        {details?.similar?.length > 0 && (
          <section className={`${style.block} ${style.similar}`}>
            <h3>Похожие</h3>
            <SwiperCardTitle details={details?.similar} />
          </section>
        )}
      </section>
    </div>
  );
}
