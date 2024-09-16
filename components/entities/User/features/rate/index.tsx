"use client";
import React, { useState } from "react";
import Image from "next/image";

import prisma from "@/app/api/auth/[...nextauth]/prismadb";
import { useSession } from "next-auth/react";
import { getClassByRate } from "@/components/entities/Title/Rate";

import { IconUserCircle, IconStar, IconStarHalfFilled, IconStarFilled } from "@tabler/icons-react";

import "./style.css";

export function UserRate({ personal }: any) {
  const { data: session } = useSession();
  const [hide, setHide] = useState(true); // Состояние для скрытия/отображения блока рейтинга
  const [rating, setRating] = useState(0); // Текущее значение рейтинга
  const [hoverValue, setHoverValue] = useState(0); // Состояние для наведения мыши (с дробной частью)

  // Функция для рендера звезды (пустая, половина или полная) в зависимости от текущего и наведенного рейтинга
  const renderStarIcon = (index: number) => {
    if (hoverValue >= index) {
      return <IconStarFilled className="star-icon" style={{ color: "yellow" }} />;
    } else if (hoverValue >= index - 0.5) {
      return <IconStarHalfFilled className="star-icon" style={{ color: "yellow" }} />;
    } else {
      return <IconStar className="star-icon" style={{ color: "gray" }} />;
    }
  };

  // Функция для обработки наведения мыши
  const handleMouseMove = (event: React.MouseEvent, index: number) => {
    const { left, width } = event.currentTarget.getBoundingClientRect();
    const mouseX = event.clientX - left;

    // Если курсор находится в первой половине звезды, ставим половину, иначе - полную звезду
    const isHalf = mouseX < width / 2;
    setHoverValue(index - (isHalf ? 0.5 : 0));
  };

  // Функция для выбора рейтинга по клику
  const handleClick = (index: number) => {
    setRating(hoverValue); // Устанавливаем точное значение рейтинга (с дробной частью, если выбрана половина)
  };
  const toggleRatingVisibility = () => {
    setHide(!hide); // Переключаем состояние
  };

  return (
    <article className={"personal"} style={getClassByRate({ vote: rating })}>
      {session?.user?.image ? (
        <Image
          width={75}
          height={75}
          className={"userAvatar"}
          src={session.user.image}
          alt="User Avatar"
          quality={25}
          priority={true}
        />
      ) : (
        <IconUserCircle stroke={2} />
      )}
      {/* Элемент <span>, по клику на который переключается состояние видимости блока рейтинга */}
      <span onClick={toggleRatingVisibility}>{rating}</span>

      {/* Блок с рейтингом скрыт, если состояние hide === true */}
      {!hide && (
        <div className="rating">
          {/* Генерация 10 звезд */}
          {[...Array(10)].map((_, index) => {
            const currentRating = index + 1;

            return (
              <label key={index}>
                <input
                  type="radio"
                  name="rating"
                  value={currentRating}
                  style={{ display: "none" }} // Прячем радио-инпут
                  onClick={() => {
                    handleClick(currentRating);
                    toggleRatingVisibility();
                  }}
                />
                <span
                  className="star"
                  onMouseMove={(event) => handleMouseMove(event, currentRating)} // Обработка движения мыши
                  onMouseLeave={() => setHoverValue(rating)} // Возвращаем hover к значению текущего рейтинга
                >
                  {renderStarIcon(currentRating)}
                </span>
              </label>
            );
          })}
        </div>
      )}
    </article>
  );
}
