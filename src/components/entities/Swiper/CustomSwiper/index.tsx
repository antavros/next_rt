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

import '@/components/entities/Swiper/style.css';

interface CustomSwiper {
  style: any;
  object: any[];
  option?: any;
  renderSlide: (object: any) => JSX.Element;
}

export function CustomSwiper({ style, object, renderSlide, option }: CustomSwiper) {

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
      centerInsufficientSlides={true}
      centeredSlidesBounds={true}
      slidesPerGroupAuto={true}
      grabCursor={true}
      navigation={{
        lockClass: 'hideSwiperButton',
      }}
      keyboard={true}
      breakpoints={{
        100: {
          slidesPerView: 1,
        },
        600: {
          slidesPerView: 1,
        },
        1024: {
          slidesPerView: 1,
        },
        1500: {
          slidesPerView: 1,
        },
        1550: {
          slidesPerView: 2,
        },
      }}
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