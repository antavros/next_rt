'use server'

import React from 'react';
import { auth } from '@/components/shared/auth/auth';

import { SignButton } from "@/components/entities/User/SignButton"
import { UserAvatar } from "./Avatar"
import "./style.css";

export const UserCard: React.FC = async () => {
  const session = await auth();

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