"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

import { IconUserCircle, IconSettings } from "@tabler/icons-react";
import { SignButton } from "@/components/entities/User/SignButton";
import { Button, Item } from "@/components/features/Button";

import "./style.css";

export const UserAvatar: React.FC = () => {
  const { data: session } = useSession();
  const [dropDown, setDropDown] = useState(false);

  const buttonItems = [
    {
      name: "Профиль",
      url: "/profile",
      svg: <IconUserCircle stroke={2} />,
    },
    {
      name: "Настройки",
      url: "/settings",
      svg: <IconSettings stroke={2} />,
    },
  ];

  return (
    <>
      {session ? (
        <button onClick={() => setDropDown(!dropDown)} className="avatarButton">
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
          <h6>{session?.user?.name}</h6>
        </button>
      ) : (
        <SignButton />
      )}

      {dropDown && (
        <div className="avatarMenu">
          <Button items={buttonItems} />
          <SignButton />
        </div>
      )}
    </>
  );
};
