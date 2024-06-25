'use client'

import Link from 'next/link';
import Image from 'next/image';

import { CustomSwiper } from '@/components/entities/Swiper/CustomSwiper';
import { Details } from '@/components/shared/api/lib';

import style from './style.module.css';

export function SwiperCardPerson({ details }: Details) {

  const filteredPersonsActor = details?.person.filter((person: any) => person.enProfession === 'actor');
  const object = filteredPersonsActor || [];

  const renderSlide = (person: any) => (
    <Link className={style.swiper_person_wrapper} href={`/title/person/${person.id}`}>
      <Image
        width={220}
        height={330}
        src={person.photo}
        alt={person.name}
        priority={true}
      />
      <section className={style.swiper_person_Info}>
        <h4>{person.name}</h4>
        <p>{person.description}</p>
      </section>
    </Link >
  );

  return (
      <CustomSwiper
        style={style.swiper_slide}
        object={object}
        renderSlide={renderSlide}
      />
  );
}