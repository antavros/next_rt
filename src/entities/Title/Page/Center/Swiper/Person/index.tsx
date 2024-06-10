'use client'

import Link from 'next/link';
import Image from 'next/image';

import { CustomSwiper } from '@/entities/Swiper/CustomSwiper';
import { Details } from '@/shared/api/lib';

import style from './style.module.css';

export function SwiperCardPerson({ details }: Details) {

  const object = details || [];

  const renderSlide = (person: any) => (
    <Link className={style.swiper_person_wrapper} href={`/person/${person.id}`}>
      <Image
        width={256}
        height={400}
        src={person.photo}
        alt={person.name}
        priority={true}
      />
      <section className={style.swiper_person_Info}>
        <h3>{person.name}</h3>
        <p>{person.description}</p>
      </section>
    </Link >
  );

  return (
    <>
      <h5>Актеры</h5>
      <CustomSwiper
        style={style.swiper_slide}
        object={object}
        renderSlide={renderSlide}
      />
    </>
  );
}