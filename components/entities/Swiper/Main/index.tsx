"use client";

import React, { useState } from "react";

import Link from "next/link";
import Image from "next/image";

import { TitleRate } from "@/components/entities/Title/Rate/";
import { Preloader } from "@/components/features/PreLoader";
import { Swiper as SwiperType } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Virtual,
  Autoplay,
  Keyboard,
  Navigation,
  Pagination,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/keyboard";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/virtual";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import { TitleCardWidgets } from "@/components/entities/User/widgets/Card/title";

import "../style.css";
import style from "./style.module.css";

export function SwiperMain({ details }: any) {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Фильтруем массив details
  const filteredDetails = details.filter(
    (item: any) => item.backdrop && item.logo && item.average_kp >= 6
  );

  return (
    <div className={style.swiperContainer}>
      <Swiper
        breakpoints={{
          1551: {
            slidesPerView: 1,
          },
        }}
        modules={[Autoplay, Keyboard, Navigation, Pagination, Virtual]}
        className={style.swiper_home}
        cssMode={false}
        navigation={true}
        spaceBetween={30}
        loop={true}
        grabCursor={true}
        keyboard={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 22500,
          disableOnInteraction: true,
        }}
      >
        {!imageLoaded && <Preloader />}
        {filteredDetails.map((details: any, index: any) => (
          <SwiperSlide key={details.id}>
            <Link
              className={style.swiper_home_wrapper}
              href={`/${details.type}/${details.id}`}
              prefetch={false}
            >
              <Image
                width={640}
                height={360}
                quality={1}
                priority={true}
                onLoad={() => setImageLoaded(true)}
                src={details.backdrop}
                className={style.title_back}
                alt={details.name}
              />
            </Link>
            <section className={style.swiper_home_Info}>
              <Image
                width={640}
                height={360}
                quality={1}
                priority={true}
                className={style.title_logo}
                src={details.logo}
                alt={details.name}
              />
              <h1>{details.name}</h1>
              <h2>{details.enName}</h2>
              <p>{details.countries}</p>
              <p>
                {details.year}г {details.length}
              </p>
              <p>{details.genres}</p>
              <h3>{details.sDescription}</h3>
              <TitleCardWidgets details={details} rateAll={true} />
            </section>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
