"use client";

import { redirect } from 'next/navigation';
import React from 'react';
import { useSession } from 'next-auth/react';

import "./style.css";

export function ProfilePage() {
  const { data: session } = useSession();

  if (!session) {
    redirect(`/signin`);
    return null;
  }

  return (
    <section className='profile'>
      <h1>Профиль</h1>
    </section>
  );
}
