'use client';

import { CustomSwiper } from '@/components/entities/Swiper/CustomSwiper';
import { YouTubeEmbed } from '@next/third-parties/google';
import { Details } from "@/components/shared/api/next-title";

import style from './style.module.css';

export function SwiperCardTrailer({ details }: Details) {

  const trailers = details?.trailers || [];

  const object = trailers.filter((trailer: any, index: any, self: any) =>
    index === self.findIndex((t: any) => t.url === trailer.url)
  );

  const extractVideoId: (url: string) => string | null = (url: string) => {
    const match = /embed\/([a-zA-Z0-9_-]+)/.exec(url);
    return match ? match[1] : null;
  };

  const renderSlide = (object: any) => {
    const videoId = extractVideoId(object?.url);
    return (
      <>
        <h2 title={object.name}>{object.name}</h2>
        {videoId && (
          <YouTubeEmbed
            videoid={videoId}
            width={400}
            params="controls=0"
          />
        )}
      </>
    );
  };

  return (
    <CustomSwiper
      style={style.swiper_slide_trailer}
      object={object}
      renderSlide={renderSlide}
    />
  );
}
