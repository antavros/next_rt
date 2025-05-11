"use client";

import { useEffect, useState } from "react";
import { IconChevronsUp, IconChevronsDown } from "@tabler/icons-react";
import { Button, Item } from "@/components/features/button";

export const FastNavigation = () => {
  const [showTopNav, setShowTopNav] = useState(false);
  const [showBottomNav, setShowBottomNav] = useState(false);

  useEffect(() => {
    const container = document.querySelector(".content"); // Находим существующий контейнер

    const handleScroll = () => {
      if (!container) return;

      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight;
      const containerHeight = container.clientHeight;

      // Логика отображения кнопок
      const shouldShowTopNav = scrollTop > containerHeight / 2;
      const shouldShowBottomNav =
        scrollTop + containerHeight < scrollHeight - containerHeight / 2;

      setShowTopNav(shouldShowTopNav);
      setShowBottomNav(shouldShowBottomNav);
    };

    if (container) {
      container.addEventListener("scroll", handleScroll); // Привязка события
      handleScroll(); // Инициализация при монтировании
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll); // Очистка события
      }
    };
  }, []);

  const buttonItemsTop: Item[] = [
    {
      type: "button",
      title: "Наверх",
      url: "#content",
      svg: <IconChevronsUp stroke={2} />,
    },
  ];

  const buttonItemsDown: Item[] = [
    {
      type: "button",
      title: "Вниз",
      url: "#footer",
      svg: <IconChevronsDown stroke={2} />,
    },
  ];

  return (
    <>
      {showTopNav && <Button items={buttonItemsTop} />}
      {showBottomNav && <Button items={buttonItemsDown} />}
    </>
  );
};
