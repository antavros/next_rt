import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { TitleRate } from "@/components/entities/Title/Rate/";
import { CustomSwiper } from '@/components/entities/Swiper/CustomSwiper';
import { Details } from '../../../../../../shared/api/next-title';
import style from './style.module.css';

export function SwiperCardTitle({ details }: Details) {
  if (!details || !Array.isArray(details)) {
    return null; // обработка пустого состояния или некорректных данных
  }

  const renderSlide = (item: any) => (
    <Link href={`/${item?.type}/${item?.id}`} prefetch={false}>
      <div className={style.swiper_title_wrapper}>
        <Image
          width={260}
          height={400}
          src={item?.poster?.url || '/images/placeholder.webp'}
          alt={item?.name}
          priority={true}
        />
        <section className={style.swiper_title_Info}>
          <TitleRate personal={item?.rating?.imdb} rt={item?.rating?.kp} />
          <h3>{item?.name}</h3>
          <h4>{item?.enName || item?.alternativeName}</h4>
          {item?.year && item?.year.length > 0 && <p>{item?.year}г.</p>}
          <p>{item?.description}</p>
        </section>
      </div>
    </Link>
  );

  return (
    <CustomSwiper
      style={style.swiper_slide}
      object={details}
      renderSlide={renderSlide}
    />
  );
}
