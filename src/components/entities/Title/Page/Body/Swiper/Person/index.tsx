'use client'

import Link from 'next/link';
import Image from 'next/image';

import { CustomSwiper } from '@/components/entities/Swiper/CustomSwiper';
import { Details } from '../../../../../../shared/api/next-title';

import style from './style.module.css';

export function SwiperCardPerson({ details }: Details) {

  const filteredPersonsActor = details?.person.filter((person: any) => person.enProfession === 'actor');
  const object = filteredPersonsActor || [];
  const option = { direction: 'vertical' };

  const renderSlide = (person: any) => (
    <Link className={style.swiper_person_wrapper} href={`/person/${person.id}`} prefetch={false}>
      <Image
        width={220}
        height={330}
        src={person.photo}
        alt={person.name}
        priority={true}
      />
      <section className={style.swiper_person_Info}>
        <h4>{person.name ? person.name : person.enName}</h4>
        <p>{person.description}</p>
      </section>
    </Link >
  );

  return (
    <CustomSwiper
      style={style.swiper_slide}
      object={object}
      renderSlide={renderSlide}
      option={option}
    />
  );
}