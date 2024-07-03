'use client'

import React from 'react';
import { useSession } from 'next-auth/react';

import { SignButton } from "@/components/entities/User/SignButton"
import { UserAvatar } from "./Avatar"
import "./style.css";

export const UserCard: React.FC = () => {
  const { data: session } = useSession();

  return (
    <section className="userCard">
      {session ? (
        <UserAvatar />
      ) : (
        <SignButton />
      )}
    </section>
  );
};