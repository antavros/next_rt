"use client";
import React from "react";

import { Button } from "@/components/Features/Button";

import { IconHome, IconRefreshAlert } from "@tabler/icons-react";
import "./style.css";

interface ErrorRenderProps {
  onClick: () => void;
}

export function ErrorPage({ onClick }: ErrorRenderProps) {
  const buttonItems = [
    {
      name: "Главная",
      url: "/",
      svg: <IconHome stroke={2} />,
    },
    {
      name: "Обновить",
      onClick: onClick,
      svg: <IconRefreshAlert stroke={2} />,
    },
  ];

  return (
    <div className="error">
      <h2>Что-то пошло не так!</h2>
      <Button items={buttonItems} />
    </div>
  );
}
