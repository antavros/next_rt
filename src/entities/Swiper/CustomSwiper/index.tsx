'use client'

import {
  Swiper,
  SwiperSlide
} from 'swiper/react';
import {
  Autoplay,
  Keyboard,
  Navigation,
  Pagination,
} from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/keyboard';
import 'swiper/css/navigation';

import '@/entities/Swiper/style.css';

interface CustomSwiper {
  style: any;
  object: any[];
  renderSlide: (object: any) => JSX.Element;
}

export function CustomSwiper({ style, object, renderSlide }: CustomSwiper) {

  return (
    <Swiper
      modules={[
        Autoplay,
        Keyboard,
        Navigation,
      ]}
      autoplay={{
        delay: 22500,
        disableOnInteraction: true,
      }}
      rewind={true}
      speed={600}
      spaceBetween={16}
      slidesPerView={`auto`}
      slidesPerGroupAuto={true}
      grabCursor={true}
      navigation={true}
      keyboard={true}
    >
      {object.map((object: any) => (
        <SwiperSlide className={style} key={object.name}>
          {renderSlide(object)}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}