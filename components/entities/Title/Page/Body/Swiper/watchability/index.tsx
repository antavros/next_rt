import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CustomSwiper } from "@/components/entities/Swiper/CustomSwiper";
import { Details } from "@/components/shared/api/next-title";

import style from "./style.module.css";

export function SwiperWatchability({ details }: Details) {
  if (!details || !Array.isArray(details)) {
    return null; // обработка пустого состояния или некорректных данных
  }
  const option = { direction: "vertical" };

  const renderSlide = (item: any) => (
    <Link href={`${item?.url}`} prefetch={false}>
      <div className={style.swiper_title_wrapper}>
        <Image
          width={190}
          height={190}
          src={item?.logo?.url || "/images/placeholder.webp"}
          alt={item?.name}
          priority={true}
        />
        <section className={style.swiper_title_Info}>
          <h3>{item?.name}</h3>
        </section>
      </div>
    </Link>
  );

  return (
    <CustomSwiper
      style={style.swiper_slide}
      object={details}
      renderSlide={renderSlide}
      option={option}
    />
  );
}
