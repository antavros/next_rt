"use client";

import React from "react";
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

import { TitleCardBig } from "@/components/entities/Title/Card/Big";

import "../style.css";
import style from "./style.module.css";

export function SwiperMain({ details }: any) {
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
        {filteredDetails.map((details: any, index: any) => (
          <SwiperSlide key={details.id}>
            <TitleCardBig details={details} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
