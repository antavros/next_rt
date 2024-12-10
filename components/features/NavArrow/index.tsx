"use client";

import { useEffect, useState } from "react";
import { IconChevronsUp, IconChevronsDown } from "@tabler/icons-react";
import { Button, Item } from "@/components/features/Button";

export const FastNavigation = () => {
  const [showTopNav, setShowTopNav] = useState(false);
  const [showBottomNav, setShowBottomNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const scrollPosition = window.scrollY;

      const shouldShowTopNav = scrollPosition >= windowHeight / 2;
      const shouldShowBottomNav =
        scrollPosition <= Math.round(windowHeight / 2);

      setShowTopNav(shouldShowTopNav);
      setShowBottomNav(shouldShowBottomNav);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const buttonItemsTop: Item[] = [
    {
      type: "button",
      title: "Наверх",
      url: "#main",
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
