"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

import { IconUserCircle, IconSettings } from "@tabler/icons-react";
import { SignButton } from "@/components/entities/User/SignButton";
import { Button } from "@/components/features/Button";

import "./style.css";

export const UserAvatar: React.FC = () => {
  const { data: session } = useSession();
  const [dropDown, setDropDown] = useState(false);
  const avatarRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        avatarRef.current &&
        menuRef.current &&
        !avatarRef.current.contains(event.target as Node) &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {session ? (
        <button
          onClick={() => setDropDown(!dropDown)}
          className="avatarButton"
          ref={avatarRef}
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
          <h6>{session?.user?.name}</h6>
        </button>
      ) : (
        <SignButton />
      )}

      {dropDown && (
        <div className="avatarMenu" ref={menuRef}>
          <Button items={buttonItems} />
          <SignButton />
        </div>
      )}
    </>
  );
};
