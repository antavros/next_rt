'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

import { IconUserCircle, IconSettings } from '@tabler/icons-react';
import { SignButton } from "@/components/entities/User/SignButton"

import "./style.css";


export const UserAvatar: React.FC = () => {
  const { data: session } = useSession();
  const [dropDown, setDropDown] = useState(false);

  return (
    <>
      <button onClick={() => setDropDown(!dropDown)} className="avatarContainer">
        <div className="avatarButton">
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
          <h6 className="avatarName">{(session?.user?.name)}</h6>
        </div>
      </button >
      {dropDown ? (
        < div className="avatarMenu">
          <Link href="/user/profile" className="button" prefetch={false}>
            <IconUserCircle stroke={2} />
            <h6>Профиль</h6>
          </Link>
          <Link href="/user/settings" className="button" prefetch={false}>
            <IconSettings stroke={2} />
            <h6>Настройки</h6>
          </Link>
          <SignButton />
        </div>
      ) : null
      }
    </>
  );
};