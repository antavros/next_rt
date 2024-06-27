'use client'

import React, { useEffect } from 'react'; import { signIn, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation'
import './style.css';
import { IconBrandGoogle } from '@tabler/icons-react';

export const SignInPage: React.FC = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      redirect(`/`);
    }
  }, [status]);

  return (
    <div className="signin">
      <h1>Вход</h1>
      <button onClick={() => signIn('google')}>
        <IconBrandGoogle stroke={2} />
        Вход с аккаунтом Google
      </button>
    </div>
  );
};