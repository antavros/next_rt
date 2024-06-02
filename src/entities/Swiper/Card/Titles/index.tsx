'use client'

import Link from 'next/link'
import Image from 'next/image'

import { IconUserQuestion } from '@tabler/icons-react';


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
import './swiper_card.css';

export function SwiperCard({ details }: any) {
    const filteredPersonsActor = details.persons.filter((person : any) => person.enProfession === 'actor');
    const filteredPersonsDirector = details.persons.filter((person : any) => person.enProfession === 'director');
    const filteredPersonsWriter = details.persons.filter((person : any) => person.enProfession === 'writer');
    const filteredPersonsComposer = details.persons.filter((person : any) => person.enProfession === 'composer');
    const filteredPersons = details.persons.filter((person : any) => !['actor', 'director', 'writer','composer'].includes(person.enProfession));

    // "profession": "актеры",
    // "enProfession": "actor"

    // "profession": "композиторы",
    // "enProfession": "composer"

    // "profession": "художники",
    // "enProfession": "designer"
    
    // "profession": "режиссеры",
    // "enProfession": "director"
    
    // "profession": "монтажеры",
    // "enProfession": "editor"
    
    // "profession": "операторы",
    // "enProfession": "operator"
    
    // "profession": "продюсеры",
    // "enProfession": "producer"
    
    // "profession": "редакторы",
    // "enProfession": "writer"
    
    return (
        <Swiper
            navigation={true}
            slidesPerView={5}
            centeredSlides={true}
            spaceBetween={30}
            speed={600}
            loop={true}
            grabCursor={true}
            keyboard={true}
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
            modules={[Autoplay, Keyboard, Navigation]}
            className="swiper_person_card"
        >
            {filteredPersonsActor.map((person : any) => (
                <SwiperSlide key={person.id} id={person.id}>
                    <Link className='swiper_person' href={`/${person.enProfession}/${person.id}`}>
                        <Image
                            width={256}
                            height={400}
                            src={person.photo}
                            alt={person.name}
                            priority={true}
                        />
                        <section className="swiper_person_Info">
                            <h1>{person.name}</h1>
                            <h2>{person.profession}</h2>
                        </section>
                    </Link >
                </SwiperSlide>
            ))}
        </Swiper >
    );
}