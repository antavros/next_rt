'use client'

import Link from 'next/link'
import Image from 'next/image'

import {
    Swiper,
    SwiperSlide
} from 'swiper/react';
import {
    FreeMode,
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

import '../style.css';
import style from './style.module.css';

export function SwiperMain({ details }: any) {
    return (
        <Swiper
            cssMode={false}
            // freeMode={{ momentumBounceRatio: 0 }}
            navigation={true}
            slidesPerView={'auto'}
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
                FreeMode, 
                Autoplay, 
                Keyboard, 
                Navigation, 
                Pagination
            ]}
            className={style.swiper_home}
        >
            {(details.map((details: any) => (
                    <SwiperSlide key={details.id} id={details.id}>
                        <Link className={style.swiper_home_wrapper} href={`/${details.type}/${details.id}`}>
                            <Image
                                width={1920}
                                height={1080}
                                quality={100}
                                priority={true}
                                src={details.backdrop2}
                                className={style.title_back}
                                alt={details.name}
                            />
                            <section className={style.swiper_home_Info}>
                                <Image
                                    fill={true}
                                    quality={100}
                                    priority={true}
                                    src={details.logo}
                                    alt={details.name}
                                />
                                <h1>{details.name}</h1>
                                <h2>{details.enName}</h2>
                                <p>{details.countries}</p>
                                <p>{details.year}г {details.length}</p>
                                <p>{details.genres}</p>
                                <section className={`${style.title_rate} title_rate`}>
                                    {details.average_kp}
                                    {details.average_imdb}
                                    {details.average_All}
                                    {details.average_personal}
                                </section>
                            </section>
                        </Link >
                    </SwiperSlide>
                )))}
        </Swiper >
    );
}