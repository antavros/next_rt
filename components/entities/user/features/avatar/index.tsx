"use server";

import Link from "next/link";
import Image from "next/image";
import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { IconUserCircle } from "@tabler/icons-react";

import "./style.css";

export const UserAvatar: React.FC = async () => {
  const session = await auth();
const roleLabels: { [key: string]: string } = {
  USER: "",
  ADMIN: "Администратор",
  OWNER: "Владелец",
};

  const role = roleLabels[session?.user?.role]|| "";

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
        )}{" "}
        <h6>{role}</h6>
        <h6>{session?.user?.name}</h6>
      </button>
    </Link>
  );
};
