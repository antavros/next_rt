"use client";

import { useState } from "react";
import { markTitleAction } from "./serverActions";
import { useSession } from "next-auth/react";
import { Button } from "@/components/features/button";
import {
  IconHeart,
  IconHeartFilled,
  IconEye,
  IconEyeFilled,
  IconBookmarkFilled,
  IconBookmark,
} from "@tabler/icons-react";
import { TitleRate } from "@/components/entities/title/features/rate";

import "./style.css";

export function TitleCardWidgets({
  details,
  rateAll,
}: {
  details: any;
  rateAll?: boolean;
}) {
  const [favourite, setFavourite] = useState(details?.favourite ?? false);
  const [viewed, setViewed] = useState(details?.viewed ?? false);
  const [bookmark, setBookmark] = useState(details?.bookmark ?? false);
  const { id, type, name, enName, sDescription, posters } = details;
  const { data: session } = useSession();

  const handleMarkTitle = async (mark: "favourite" | "viewed" | "bookmark") => {
    try {
      await markTitleAction(
        mark,
        id,
        type,
        name,
        enName,
        sDescription,
        posters
      );

      if (mark === "favourite") {
        setFavourite((prev: any) => !prev);
      } else if (mark === "viewed") {
        setViewed((prev: any) => !prev);
      } else if (mark === "bookmark") {
        setBookmark((prev: any) => !prev);
      }
    } catch (error) {
      console.error("Ошибка при отметке тайтла:", error);
    }
  };

  const menuConfig = [
    {
      className: `bookmark ${bookmark ? "active" : ""}`,
      svg: bookmark ? <IconBookmarkFilled /> : <IconBookmark />,
      onClick: () => handleMarkTitle("bookmark"),
    },
    {
      className: `viewed ${viewed ? "active" : ""}`,
      svg: viewed ? <IconEyeFilled /> : <IconEye />,
      onClick: () => handleMarkTitle("viewed"),
    },
    {
      className: `favourite ${favourite ? "active" : ""}`,
      svg: favourite ? <IconHeartFilled /> : <IconHeart />,
      onClick: () => handleMarkTitle("favourite"),
    },
  ];

  return (
    <section className="userWidgets">
      <article className="rate">
        <TitleRate
          personal={details?.userRating}
          rt={{ kp: details.average_kp, imdb: details.average_imdb }}
          {...(rateAll
            ? { kp: details.average_kp, imdb: details.average_imdb }
            : {})}
          titleId={details?.id}
        />
      </article>
      {session ? (
        <article className="controls">
          <Button items={menuConfig} />
        </article>
      ) : null}
    </section>
  );
}
