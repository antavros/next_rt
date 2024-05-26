'use client'

import { TitleCard } from '@/entities/title/title_card/title_card';

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
} from 'swiper/modules';

export function SwiperTitles({ titleData }: any) {

    return (
        <Swiper
            navigation={true}
            centeredSlides={true}
            spaceBetween={5}
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
            modules={[Autoplay, Keyboard, Navigation, Pagination]}
            className="popular_new"
        >
            {
                (Array.isArray(titleData) && titleData.map(details => (
                    <SwiperSlide key={details.id} id={details.id}>
                        <div className='swiper_card'>
                            <TitleCard details={details} />
                        </div>
                    </SwiperSlide>
                )))
            }
        </Swiper >
    );
}