'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { IconUserCircle } from '@tabler/icons-react';
import { SignButton } from "@/components/entities/User/Card/SignButton"
import { Togglers } from '@/components/features/Togglers';

import "./style.css";

function keepOnlyLetters(str: any) {
  if (!str) return '';
  return str.replace(/[^a-zA-Zа-яА-ЯёЁ]/g, '');
}

export const UserAvatar: React.FC = () => {
  const { data: session, status } = useSession();

  return (
    <div className="avatarContainer dropdown">
      <div className="avatarButton dropbtn">
        <div className="avatarGradient">
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
        </div>
        <h6>{keepOnlyLetters(session?.user?.name)}</h6>
      </div>
      <div className="avatarMenu dropdown-content">
        <Link href="/user/profile" className="button">
          <h6>Профиль</h6>
        </Link>
        <SignButton />
        <Togglers />
      </div>
    </div>
  );
};
