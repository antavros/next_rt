"use client"; // Теперь компонент рендерится на клиенте

import { useState } from "react";
import { markTitleAction } from "./serverActions";
import { Button } from "@/components/features/Button";
import {
  IconHeart,
  IconHeartFilled,
  IconEye,
  IconEyeFilled,
} from "@tabler/icons-react";
import { TitleRate } from "@/components/entities/Title/Rate";

import "./style.css";

export function TitleCardWidgets({ details }: { details: any }) {
  const [isFavourite, setIsFavourite] = useState(details?.isFavourite || false);
  const [isViewed, setIsViewed] = useState(details?.isViewed || false);
  const { id, type, name, enName, sDescription, poster } = details;

  const handleMarkTitle = async (mark: "favourite" | "viewed") => {
    try {
      await markTitleAction(mark, id, type, name, enName, sDescription, poster);

      if (mark === "favourite") {
        setIsFavourite((prev:any) => !prev);
      } else if (mark === "viewed") {
        setIsViewed((prev: any) => !prev);
      }
    } catch (error) {
      console.error("Ошибка при отметке тайтла:", error);
    }
  };

  const menuConfig = [
    {
      svg: isFavourite ? <IconHeartFilled /> : <IconHeart />,
      onClick: () => handleMarkTitle("favourite"),
    },
    {
      svg: isViewed ? <IconEyeFilled /> : <IconEye />,
      onClick: () => handleMarkTitle("viewed"),
    },
  ];

  return (
    <section className="userWidgets">
      <article className="controls">
        <Button items={menuConfig} />
      </article>
      <article className="rate">
        <TitleRate
          rt={{ kp: details.average_kp, imdb: details.average_imdb }}
          personal={details?.userRating}
          titleId={details?.id}
        />
      </article>
    </section>
  );
}
