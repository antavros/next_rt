'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react';

import { TitleRate } from "@/components/entities/Title/Rate/";
import { Preloader } from "@/components/features/PreLoader";

import {
  Swiper,
  SwiperSlide
} from 'swiper/react';
import {
  Virtual,
  Autoplay,
  Keyboard,
  Navigation,
  Pagination,
} from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/keyboard';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/virtual';

import '../style.css';
import style from './style.module.css';

export function SwiperMain({ details }: any) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className={style.swiperContainer} >
      <Swiper
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
        modules={[
          Autoplay,
          Keyboard,
          Navigation,
          Pagination,
          Virtual
        ]}
        className={style.swiper_home}
        cssMode={false}
        navigation={true}
        slidesPerView={2}
        slidesPerGroupAuto={true}
        centeredSlides={true}
        loop={true}
        spaceBetween={8}
        grabCursor={true}
        keyboard={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 22500,
          disableOnInteraction: true,
        }}
        virtual
      >
        {!imageLoaded && <Preloader />}
        {(details.map((details: any, index: any) => (
          <SwiperSlide key={details.id} virtualIndex={index}>
            <Link className={style.swiper_home_wrapper} href={`/title/${details.type}/${details.id}`} prefetch={false}>
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
                <p>{details.year}г {details.length}</p>
                <p>{details.genres}</p>
                < TitleRate kp={details.average_kp} imdb={details.average_imdb} personal={details.average_imdb} rt={details.average_kp} />
              </section>
            </Link >
          </SwiperSlide>
        )))}
      </Swiper >
    </div>
  );
}