'use client'


import { CustomSwiper } from '@/components/entities/Swiper/CustomSwiper';
import { Details } from '@/components/shared/api/lib';

import style from './style.module.css';

export function SwiperCardTrailer({ details }: Details) {

  const trailers = details.trailers || [];

  const object = trailers.filter((trailer: any, index: any, self: any) =>
    index === self.findIndex((t: any) => t.url === trailer.url)
  );

  const renderSlide = (trailer: any) => (
    <iframe

      width="340"
      height="200"
      className={style.trailer}
      src={trailer.url}
      title={trailer.name}
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );

  return (
    <>
      <h5>Трейлеры</h5>
      <CustomSwiper
        style={style.swiper_slide_trailer}
        object={object}
        renderSlide={renderSlide}
      />
    </>
  );
}