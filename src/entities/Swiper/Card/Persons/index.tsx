'use client'

import Link from 'next/link'
import Image from 'next/image'

import {
    Swiper,
    SwiperSlide
} from 'swiper/react';
import {
    Autoplay,
    Keyboard,
    Navigation,
} from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/keyboard';
import 'swiper/css/navigation';

import '@/entities/Swiper/style.css';
import style from './style.module.css';

export function SwiperCardPerson({ details }: any) {
    return (
        <Swiper
            className={style.swiper_person}
            initialSlide={4}
            rewind={true}
            speed={600}
            spaceBetween={8}
            slidesPerView={'auto'}
            centeredSlides={true}
            keyboard={true}
            grabCursor={true}
            navigation={true}
            modules={[Autoplay, Keyboard, Navigation]}
        >
            {details.map((person : any) => (
                <SwiperSlide key={person.id} id={person.id}>
                    <Link className={style.swiper_person_wrapper} href={`/${person.enProfession}/${person.id}`}>
                        <Image
                            width={256}
                            height={400}
                            src={person.photo}
                            alt={person.name}
                            priority={true}
                        />
                        <section className={style.swiper_person_Info}>
                            <h3>{person.name}</h3>
                            <h4>{person.profession}</h4>
                            <p>{person.description}</p>
                        </section>
                    </Link >
                </SwiperSlide>
            ))}
        </Swiper >
    );
}