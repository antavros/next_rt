"use client";

import { redirect } from 'next/navigation';
import Image from 'next/image';
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { IconEdit } from '@tabler/icons-react';
import { SignButton } from "@/components/entities/User/SignButton";
import bcrypt from 'bcryptjs';

import "./style.css";

export function SettingsPage() {
  const { data: session, update } = useSession();
  const [name, setName] = useState(session?.user?.name ?? '');
  const [email, setEmail] = useState(session?.user?.email ?? '');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(session?.user?.image ?? '');
  const [message, setMessage] = useState('');

  if (!session) {
    redirect(`/signin`);
    return null;
  }

  const getUserFromDb = async (name: string, email: string) => {
    try {
      const response = await fetch(`/api/user?name=${name}&email=${email}`);
      const user = await response.json();
      return user;
    } catch (error) {
      console.error('Error fetching user from DB:', error);
      return null;
    }
  };

  const updateValue = async (id: string, field: string, value: string) => {
    try {
      const response = await fetch(`/api/user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, field, value }),
      });
      const updatedUser = await response.json();
      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };

  const handleUpdate = async (field: string, value: string) => {
    try {
      const userName = session?.user?.name ?? '';
      const userEmail = session?.user?.email ?? '';
      const user = await getUserFromDb(userName, userEmail);
      if (user) {

        if (field === 'password') {
          value = await bcrypt.hash(value, 10);
        }

        const updatedUser = await updateValue(user.id, field, value);
        setMessage('Данные успешно обновлены.');
        update({ [field]: value });
        return updatedUser;
      } else {
        setMessage('Пользователь не найден.');
      }
    } catch (error) {
      setMessage('Ошибка при обновлении данных.');
    }
  };

  return (
    <section className='settings'>
      <h1>Настройки</h1>
      <div>
        <div className='settings_column'>
          <div className='settings_block'>
            <h2>Логин</h2>
            <span>
              <input
                type="text"
                placeholder="Name"
                autoComplete="on"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button title="Изменить логин" onClick={() => handleUpdate('name', name)}>
                <IconEdit stroke={2} />
              </button>
            </span>
          </div>
          <div className='settings_block'>
            <h2>Почта</h2>
            <span>
              <input
                type="email"
                placeholder="Email"
                autoComplete="on"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button title="Изменить почту" onClick={() => handleUpdate('email', email)}>
                <IconEdit stroke={2} />
              </button>
            </span>
          </div>
          <div className='settings_block'>
            <h2>Пароль</h2>
            <span>
              <input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button title="Изменить пароль" onClick={() => handleUpdate('password', password)}>
                <IconEdit stroke={2} />
              </button>
            </span>
          </div>
        </div>
        <div className='settings_block avatar'>
          <h2>Аватар</h2>
          {image && (
            <Image
              width={200}
              height={200}
              quality={25}
              priority={true}
              alt="avatar"
              src={image}
            />
          )}
          <span>
            <input
              type="url"
              placeholder="URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <button title="Изменить аватар" onClick={() => handleUpdate('image', image)}>
              <IconEdit stroke={2} />
            </button>
          </span>
        </div>
      </div>
      <div>
        {message && <p>{message}</p>}
        <SignButton />
      </div>
    </section>
  );
}
