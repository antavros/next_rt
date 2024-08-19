"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { IconUserCircle } from "@tabler/icons-react";

import "./style.css";

export const UserAvatar: React.FC = async () => {
  const { data: session } = useSession();

  return (
    <Link href="/profile">
      <button className="avatarButton">
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
    </Link>
  );
};
