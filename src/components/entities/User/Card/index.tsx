'use client'

import React from 'react';
import { useSession } from 'next-auth/react';

import { SignButton } from "./SignButton"
import { UserAvatar } from "./Avatar"
import "./style.css";

export const UserCard: React.FC = () => {
  const { data: session, status } = useSession();

  return (
    <section className="userCard">
      {status && (status as any) === "authenticated" ? (
        <UserAvatar />
      ) : (
        <SignButton />
      )}
    </section>
  );
};