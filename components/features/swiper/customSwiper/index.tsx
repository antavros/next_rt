"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/keyboard";
import "swiper/css/navigation";

import "../style.css";

interface CustomSwiper {
  style: any;
  object: any[];
  option?: any;
  renderSlide: (object: any) => JSX.Element;
}

export function CustomSwiper({
  style,
  object,
  renderSlide,
  option,
}: CustomSwiper) {
  return (
    <Swiper
      modules={[Autoplay, Keyboard, Navigation]}
      rewind={true}
      speed={600}
      spaceBetween={16}
      slidesPerView={`auto`}
      centerInsufficientSlides={true}
      centeredSlidesBounds={true}
      slidesPerGroupAuto={true}
      grabCursor={true}
      navigation={{
        lockClass: "hideSwiperButton",
      }}
      keyboard={true}
      {...option}
    >
      {object.map((object: any, index: number) => (
        <SwiperSlide className={style} key={`${index}slide`}>
          {renderSlide(object)}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
