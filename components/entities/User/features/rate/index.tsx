"use client";

import prisma from "@/app/api/auth/[...nextauth]/prismadb";
import { IconUserCircle } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { getClassByRate } from "@/components/entities/Title/Rate";
import "./style.css";
import "./styles.css";
import React, { useState } from "react";

export function UserRate({ personal }: any) {
  const { data: session } = useSession();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
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
      <span>{rating}</span>
      <div className="rating">
        {[...Array(10)].map((star, index) => {
          const currentRating = index + 1;
          return (
            <label key={index}>
              <input
                type="radio"
                name="rating"
                value={currentRating}
                onChange={() => setRating(currentRating)}
              />
              <span
                className="star"
                style={{
                  color:
                    currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9",
                }}
                onMouseEnter={() => setHover(currentRating)}
                onMouseLeave={() => setHover(0)}
              >
                &#9733;
              </span>
            </label>
          );
        })}
      </div>
    </article>
  );
}
