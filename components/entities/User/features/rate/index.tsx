"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  IconUserCircle,
  IconStarFilled,
  IconStarHalfFilled,
  IconStar,
  IconX,
} from "@tabler/icons-react";
import { saveUserRating } from "@/components/Entities/User/Shared";
import { getClassByRate } from "@/components/Entities/Title/Features/Rate";
import { useSession } from "next-auth/react";
import "./style.css";

export function UserRate({ personal, titleId }: any) {
  const { data: session } = useSession();
  const [rating, setRating] = useState<number | null>(personal || 0); // Текущее значение рейтинга
  const [hoverValue, setHoverValue] = useState<number>(0); // Значение при наведении
  const [showStars, setShowStars] = useState(false); // Управление видимостью звезд

  // Сохранение оценки пользователя
  const handleRating = async (newRating: number) => {
    setRating(newRating);
    setShowStars(false); // Закрыть выбор звезд после оценки
    if (session) {
      await saveUserRating({
        userId: session.user.id,
        titleId: String(titleId),
        rating: newRating,
      });
    }
  };

  // Удаление оценки пользователя
  const handleRemoveRating = async () => {
    setRating(null); // Устанавливаем рейтинг в null (удаляем)
    setShowStars(false); // Закрываем звезды
    if (session) {
      await saveUserRating({
        userId: session.user.id,
        titleId: String(titleId),
        rating: 0, // Отправляем 0 для удаления рейтинга
      });
    }
  };

  // Рендеринг звезд
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 10; i++) {
      const isFullActive = hoverValue >= i || (hoverValue === 0 && rating >= i); // Полностью заполненная звезда
      const isHalfActive = hoverValue === i - 0.5; // Полу-заполненная звезда

      stars.push(
        <span
          key={i}
          className="star-container"
          style={{
            position: "relative",
            display: "inline-block",
            cursor: "pointer",
          }}
          onMouseLeave={() => setHoverValue(0)} // Сбрасываем наведение
        >
          <span
            className="half-star"
            style={{
              position: "absolute",
              width: "50%",
              height: "100%",
              left: 0,
              top: 0,
              zIndex: 1,
            }}
            onMouseEnter={() => setHoverValue(i - 0.5)} // Левая половина звезды
            onClick={() => handleRating(i - 0.5)}
          />
          <span
            className="half-star"
            style={{
              position: "absolute",
              width: "50%",
              height: "100%",
              right: 0,
              top: 0,
              zIndex: 1,
            }}
            onMouseEnter={() => setHoverValue(i)} // Правая половина звезды
            onClick={() => handleRating(i)}
          />
          {isFullActive ? (
            <IconStarFilled />
          ) : isHalfActive ? (
            <IconStarHalfFilled />
          ) : (
            <IconStar />
          )}
        </span>
      );
    }
    return stars;
  };

  return (
    <article
      className="personal"
      style={getClassByRate({ vote: hoverValue || rating || 0 })}
    >
      {session?.user?.image ? (
        <Image
          width={75}
          height={75}
          className="userAvatar"
          src={session.user.image}
          alt="User Avatar"
          quality={25}
          priority={true}
        />
      ) : (
        <IconUserCircle stroke={2} />
      )}
      <span
        onClick={() => setShowStars((prev) => !prev)} // Открываем или закрываем выбор звезд
        style={{ cursor: "pointer" }}
      >
        {hoverValue ? (
          Number.isInteger(hoverValue) ? (
            hoverValue
          ) : (
            hoverValue.toFixed(1)
          )
        ) : rating ? (
          Number.isInteger(rating) ? (
            rating
          ) : (
            rating.toFixed(1)
          )
        ) : (
          <IconStar className="gray-Star" />
        )}
      </span>

      {showStars && (
        <div
          className="personal-container"
          style={getClassByRate({ vote: hoverValue || rating || 0 })}
        >
          <span
            className="main-Star"
            onClick={() => setShowStars((prev) => !prev)}
          >
            {session?.user?.image ? (
              <Image
                width={75}
                height={75}
                className="userAvatar"
                src={session.user.image}
                alt="User Avatar"
                quality={25}
                priority={true}
              />
            ) : (
              <IconUserCircle stroke={2} />
            )}
            {hoverValue ? (
              Number.isInteger(hoverValue) ? (
                hoverValue
              ) : (
                hoverValue.toFixed(1)
              )
            ) : rating ? (
              Number.isInteger(rating) ? (
                rating
              ) : (
                rating.toFixed(1)
              )
            ) : (
              <IconStar className="gray-Star" />
            )}
          </span>

          {renderStars()}
          <span onClick={handleRemoveRating}>
            <IconX className="gray-Star" />
          </span>
        </div>
      )}
    </article>
  );
}
