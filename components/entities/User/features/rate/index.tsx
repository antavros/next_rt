"use client";

import prisma from "@/app/api/auth/[...nextauth]/prismadb";
import React from "react";
import { IconUserCircle } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { getClassByRate } from "@/components/entities/Title/Rate";
import "./style.css";

export function UserRate(personal: any) {
  const { data: session } = useSession();

  return (
    <>
      <input />
      {session
        ? personal !== undefined &&
          personal > 0 && (
            <article className={"personal"} style={getClassByRate({ vote: 8 })}>
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
              <span>{8}</span>
            </article>
          )
        : null}
    </>
  );
}
