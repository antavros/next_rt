'use client'

import React from 'react';
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react';

import {
  IconLogin,
  IconLogout,
} from '@tabler/icons-react';
import "./style.css";

export const SignButton: React.FC = () => {
  const { data: session } = useSession();

  return (
    !session ? (
      <Link href="/user/signin" className="button signinButton">
        <IconLogin stroke={2} />
        <h6>Войти</h6>
      </Link>
    ) : (
      <button onClick={() => signOut()} className="signinButton">
        <IconLogout stroke={2} />
        <h6>Выйти</h6>
      </button>
    )
  );
};