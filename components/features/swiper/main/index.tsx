// components/entities/title/features/swiper/main.tsx
"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/keyboard";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { TitleCardBig } from "@/components/entities/title/widgets/card/big";

import "../style.css";
import style from "./style.module.css";

interface SwiperMainProps {
  details: any[];
}

export function SwiperMain({ details }: SwiperMainProps) {
  return (
    <div className={style.swiperContainer}>
      <Swiper
        modules={[Autoplay, Keyboard, Navigation, Pagination]}
        className={style.swiper_home}
        slidesPerView={1}
        centeredSlides={true}
        navigation={true}
        spaceBetween={35}
        loop={true}
        grabCursor={true}
        keyboard={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        {details.map((item) => (
          <SwiperSlide key={String(item.id)}>
            <TitleCardBig details={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
