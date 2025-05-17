import React from "react";

import { Details } from "@/components/shared/api/next-title";
import { CustomSwiper } from "@/components/features/swiper/customSwiper";
import { TitleCardSmall } from "@/components/entities/title/widgets/card/small";

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
