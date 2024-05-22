
'use client'

import Image from 'next/image'

import { TitleCard } from "../../entities/title/title_card/title_card";

import { Swiper, SwiperSlide } from 'swiper/react';
import './swiper.css';
import 'swiper/css';
import 'swiper/css/a11y';
import 'swiper/css/keyboard';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import {
    Autoplay,
    Keyboard,
    Navigation,
    Pagination,
    A11y,
} from 'swiper/modules';

export function SwiperTitles({ titleData }) {

    return (
        <Swiper
            navigation={true}
            centeredSlides={true}
            a11y={true}
            spaceBetween={30}
            speed={600}
            grabCursor={true}
            keyboard={true}
            slidesPerView={2}
            rewind={true}
            pagination={{
                clickable: true,
            }}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
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
            modules={[Autoplay, Keyboard, Navigation, Pagination, A11y]}
            className="popular_new"
        >
            {
                (Array.isArray(titleData) && titleData.map(details => (
                    <SwiperSlide key={details.id} id={details.id}>
                        <Image
                            width={500}
                            height={500}
                            className="sw_title_backdrop"
                            src={details.backdrop2}
                            alt={details.name}
                        />
                        <div className="sw_title_overlay">
                            <TitleCard details={details} />
                        </div>
                    </SwiperSlide>
                )))
            }
        </Swiper >
    );
}