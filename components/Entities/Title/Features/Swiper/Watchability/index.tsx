"use client";

import Link from "next/link";
import Image from "next/image";

import { CustomSwiper } from "@/components/features/swiper/customSwiper";
import { Details } from "@/components/shared/api/next-title";

export function SwiperWatchability({ details }: Details) {
  if (!details || !Array.isArray(details)) {
    return null; // обработка пустого состояния или некорректных данных
  }

  const renderSlide = (item: any) => (
    <Link href={`${item?.url}`} prefetch={false}>
      <div className="swiper_title_wrapper" title={item?.name}>
        <Image
          quality={25}
          className="slide_logo"
          src={item?.logo?.url ?? "/images/placeholder.webp"}
          alt={item?.name}
        />
      </div>
    </Link>
  );

  return (
    <CustomSwiper
      style="swiper_slide"
      object={details}
      renderSlide={renderSlide}
    />
  );
}
