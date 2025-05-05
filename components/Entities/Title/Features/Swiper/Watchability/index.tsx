"use client";

import Link from "next/link";

import { CustomSwiper } from "@/components/Features/Swiper/CustomSwiper";
import { Details } from "@/components/Shared/Api/next-title";

export function SwiperWatchability({ details }: Details) {
  if (!details || !Array.isArray(details)) {
    return null; // обработка пустого состояния или некорректных данных
  }

  const renderSlide = (item: any) => (
    <Link href={`${item?.url}`} prefetch={false}>
      <div className="swiper_title_wrapper" title={item?.name}>
        <img
          src={item?.logo?.url ?? "/images/placeholder.webp"}
          alt={item?.name}
          className="slide_logo"
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
