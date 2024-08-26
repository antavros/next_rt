"use client";

import React, { useState } from 'react';

import Link from "next/link";
import Image from "next/image";

import { TitleRate } from "@/components/entities/Title/Rate/";
import { Preloader } from "@/components/features/PreLoader";
import { Swiper as SwiperType } from 'swiper';

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Virtual,
  Autoplay,
  Keyboard,
  Navigation,
  Pagination,
  Thumbs,
  FreeMode
} from "swiper/modules";

import "swiper/css";
import "swiper/css/keyboard";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/virtual";
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';

import "../style.css";
import style from "./style.module.css";

export function SwiperMain({ details }: any) {
  // Указываем тип состояния как Swiper | null
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className={style.swiperContainer}>
      <Swiper
        breakpoints={{
          1551: {
            slidesPerView: 1,
          },
        }}
        modules={[Autoplay, Keyboard, Navigation, Pagination, Virtual, Thumbs]}
        className={style.swiper_home}
        thumbs={{ swiper: thumbsSwiper }}
        cssMode={false}
        navigation={true}
        spaceBetween={30}
        virtual
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
        {details.map((details: any, index: any) => (
          <SwiperSlide key={details.id} virtualIndex={index}>
            <Link
              className={style.swiper_home_wrapper}
              href={`/${details.type}/${details.id}`}
              prefetch={false}
            >
              <Image
                width={1280}
                height={720}
                quality={25}
                priority={true}
                onLoad={() => setImageLoaded(true)}
                src={details.backdrop}
                className={style.title_back}
                alt={details.name}
              />
              <section className={style.swiper_home_Info}>
                <Image
                  width={1280}
                  height={720}
                  quality={25}
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
                <TitleRate
                  kp={details.average_kp}
                  imdb={details.average_imdb}
                  personal={details.average_imdb}
                  rt={details.average_kp}
                />
              </section>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        rewind={true}
        spaceBetween={10}
        centeredSlides={true}
        slidesPerView={`auto`}
        centerInsufficientSlides={true}
        centeredSlidesBounds={true}
        slidesPerGroupAuto={true}
        watchSlidesProgress={true}
        className={style.thumbs}
        modules={[FreeMode, Navigation, Thumbs, Virtual]}
      >
        {!imageLoaded && <Preloader />}
        {details.map((details: any, index: any) => (
          <SwiperSlide className={style.thumbsSlide} key={details.id} virtualIndex={index}>
            <Image
              width={1280}
              height={720}
              quality={25}
              priority={true}
              onLoad={() => setImageLoaded(true)}
              src={details.poster}
              alt={details.name}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
