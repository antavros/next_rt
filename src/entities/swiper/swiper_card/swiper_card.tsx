'use client'

import Link from 'next/link'
import Image from 'next/image'


import { Swiper, SwiperSlide } from 'swiper/react';
import './swiper_card.css';
import 'swiper/css';
import 'swiper/css/keyboard';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import {
    Autoplay,
    Keyboard,
    Navigation,
    Pagination,
} from 'swiper/modules';

export function SwiperCard({ details }: any) {
    return (
        <Swiper
            navigation={true}
            centeredSlides={true}
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
            modules={[Autoplay, Keyboard, Navigation, Pagination]}
            className="popular_new"
        >
            {
                (Array.isArray(details) && details.map(details => (
                    <SwiperSlide key={details.id} id={details.id}>
                        <Image
                            width={256}
                            height={400}
                            src={details.poster4}
                            alt={details.name}
                            priority={true}
                        />
                        <Link className='swiper_Card' href={`/${details.type}/${details.id}`}>
                            <section className="swiper_Card_Info">
                                <h1>{details.name}</h1>
                                <h2>{details.enName}</h2>
                                <p>{details.year}г</p>

                            </section>
                        </Link >
                    </SwiperSlide>
                )))
            }
        </Swiper >
    );
}