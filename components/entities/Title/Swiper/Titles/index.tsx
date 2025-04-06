import React from "react";

import { Details } from "@/components/shared/api/next-title";
import { CustomSwiper } from "@/components/entities/Swiper/CustomSwiper";
import { TitleCardSmall } from "@/components/entities/Title/Card/Small";

import style from "./style.module.css";

export function SwiperCardTitle({ details }: Details) {
  if (!details || !Array.isArray(details)) {
    return null;
  }

  const renderSlide = (item: any) => <TitleCardSmall details={item} />;

  return (
    <CustomSwiper
      style={style.swiper_slide}
      object={details}
      renderSlide={renderSlide}
    />
  );
}
