'use client'

import Link from 'next/link'
import Image from 'next/image'

import { Swiper, SwiperSlide } from 'swiper/react';
import './swiper_home.css';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/a11y';
import 'swiper/css/keyboard';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import {
    FreeMode,
    Autoplay,
    Keyboard,
    Navigation,
    Pagination,
} from 'swiper/modules';

export function SwiperTitles({ titleData }: any) {
    return (
        <Swiper
            navigation={true}
            centeredSlides={true}
            freeMode={false}
            spaceBetween={10}
            speed={600}
            loop={true}
            grabCursor={true}
            keyboard={true}
            slidesPerView={2}
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
                    slidesPerView: 2,
                },
            }}
            modules={[FreeMode, Autoplay, Keyboard, Navigation, Pagination]}
            className="popular_new"
        >
            {
                (Array.isArray(titleData) && titleData.map(details => (
                    <SwiperSlide key={details.id} id={details.id}>
                        <Link className='swiper_home' href={`/${details.type}/${details.id}`}>
                            <Image
                                fill={true}
                                src={details.backdrop2}
                                className={`title_back`}
                                alt={details.name}
                            />
                            <section className="swiper_home_Info">
                                <Image
                                    fill={true}
                                    src={details.logo || details.poster}
                                    className={`title_logo`}
                                    alt={details.name}
                                />
                                <h1>{details.name}</h1>
                                <h2>{details.enName}</h2>
                                <p>{details.countries}</p>
                                <p className="titlePage_year">{details.year}г {details.length}</p>
                                <p>{details.genres}</p>
                                <section className="title_rate">
                                    {details.average_kp}
                                    {details.average_imdb}
                                    {details.average_All}
                                    {details.average_personal}
                                </section>
                            </section>
                        </Link >
                    </SwiperSlide>
                )))
            }
        </Swiper >
    );
}