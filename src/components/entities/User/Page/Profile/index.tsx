"use client"

import { redirect } from 'next/navigation'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import React, { useState } from 'react'
import { IconEdit, IconLogout } from '@tabler/icons-react';

import "./style.css"

export function ProfilePage() {
  const { data: session } = useSession()
  const [name, setName] = useState(session?.user?.name ?? '')
  const [email, setEmail] = useState(session?.user?.email ?? '')
  const [password, setPassword] = useState('')
  const [image, setImage] = useState(session?.user?.image ?? '')
  const [message, setMessage] = useState('')

  const handleUpdate = async (field: string, value: string) => {
    const res = await fetch(`/api/user/update-${field}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ [field]: value }),
    })

    const data = await res.json()
    if (data.success) {
      setMessage('Profile updated successfully')
    } else {
      setMessage(data.error)
    }
  }

  if (!session) {
    redirect(`/user/signin`)
  }

  return (
    <section className='profile'>
      <h1>Профиль</h1>
      <div>
        <div className='profile_block'>
          <p>Логин</p>
          <span>
            <input
              type="text"
              placeholder="Name"
              autoComplete="on"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button onClick={() => handleUpdate('name', name)}>
              <IconEdit stroke={2} />
            </button>
          </span>
        </div>
        <div className='profile_block'>
          <p>Почта</p>
          <span>
            <input
              type="email"
              placeholder="Email"
              autoComplete="on"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={() => handleUpdate('email', email)}>
              <IconEdit stroke={2} />
            </button>
          </span>
        </div>
        <div className='profile_block'>
          <p>Пароль</p>
          <span>
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={() => handleUpdate('password', password)}>
              <IconEdit stroke={2} />
            </button>
          </span>
        </div>
      </div>
      <div className='profile_block avatar'>
        <p>Аватар</p>
        {session?.user?.image ? (
          <Image
            width={200}
            height={200}
            quality={25}
            priority={true}
            alt="avatar"
            src={session?.user?.image}
          />
        ) : (null)
        }
        <span>
          <input
            type="url"
            placeholder="URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <button onClick={() => handleUpdate('image', image)}>
            <IconEdit stroke={2} />
          </button>
        </span>
      </div>
      <div>
        {message && <p>{message}</p>}
        <button onClick={() => signOut()}>
          <IconLogout stroke={2} />
          Выйти
        </button>
      </div>
    </section>
  )
}
