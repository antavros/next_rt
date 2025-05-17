"use server";

import React from "react";
import { auth } from "@/app/api/auth/[...nextauth]/auth";

import { IconSettings } from "@tabler/icons-react";
import { Button } from "@/components/features/button";
import { SignButton } from "@/components/entities/user/features/signButton";

import { UserAvatar } from "@/components/entities/user/features/avatar";
import "./style.css";

export const UserCard: React.FC = async () => {
  const session = await auth();

  const buttonItems = [
    {
      name: "Настройки",
      url: "/settings",
      svg: <IconSettings stroke={2} />,
    },
  ];

  if (!session) {
    return (
      <section className="userBlock unSign">
        <SignButton />
      </section>
    );
  }

  return (
    <section className="userBlock">
      <UserAvatar />
      <div className="userButtons">
        <Button items={buttonItems} />
        <SignButton />
      </div>
    </section>
  );
};
