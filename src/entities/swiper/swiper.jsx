'use client'

import Image from 'next/image'

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getData, dataProps } from "../../shared/api/api.jsx";
import { TitleCard } from "../../entities/title_card/title_card.jsx";

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

SwiperTitles.propTypes = dataProps;
export function SwiperTitles({ url }) {
    const [titleData, setTitleData] = useState([]);

    useEffect(() => {
        getData({ url }).then((data) => { setTitleData(data); })
    }, [url]);

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
                titleData.map(details => (
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
                ))
            }
        </Swiper >
    );
}