'use client'

import Link from 'next/link';
import Image from 'next/image';

import { CustomSwiper } from '@/entities/Swiper/CustomSwiper';
import { Details } from '@/shared/api/lib';

import style from './style.module.css';

export function SwiperCardTitle({ details }: Details) {

  const similar = details.similar || [];

  const renderSlide = (similar: any) => (
    <Link className={style.swiper_title_wrapper} href={`/${similar.type}/${similar.id}`}>
      <Image
        width={260}
        height={400}
        src={similar.poster.url}
        alt={similar.name}
        priority={true}
      />
      <section className={style.swiper_title_Info}>
        <h3>{similar.name}</h3>
        <h4>{similar.enName || similar.alternativeName}</h4>
        <p>{similar.year}г</p>
        <p>{similar.description}</p>
      </section>
    </Link>
  );

  return (
    <>
      <h5>Похожие</h5>
      <CustomSwiper
        style={style.swiper_slide}
        object={similar}
        renderSlide={renderSlide}
      />
    </>
  );
}