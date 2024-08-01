"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";
import { Button, Item } from "@/components/features/Button";

import { IconLogin, IconLogout } from "@tabler/icons-react";
import "./style.css";

export const SignButton: React.FC = () => {
  const { data: session } = useSession();

  const buttonItemsLogin: Item[] = [
    {
      type: "button",
      title: "Войти",
      name: "Войти",
      url: "/signin",
      className: "signinButton",
      svg: <IconLogin stroke={2} />,
    },
  ];

  const buttonItemsLogout: Item[] = [
    {
      type: "button",
      title: "Выйти",
      name: "Выйти",
      className: "signinButton",
      onClick: () => {
        signOut();
      },
      svg: <IconLogout stroke={2} />,
    },
  ];

  return !session ? (
    <Button items={buttonItemsLogin} />
  ) : (
    <Button items={buttonItemsLogout} />
  );
};
