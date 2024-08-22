"use client";

import Image from "next/image";
import React, { useState } from "react";
import { IconEdit } from "@tabler/icons-react";
import { SignButton } from "@/components/entities/User/features/SignButton";
import { handleUpdate } from "@/components/entities/User/Page/Settings/serverAction";

import { getSession, useSession, signIn } from "next-auth/react";

import "./style.css";

export function SettingsPage() {
  const { data: session } = useSession();
  const [role, setRole] = useState(session?.user?.role ?? "");
  const [name, setName] = useState(session?.user?.name ?? "");
  const [email, setEmail] = useState(session?.user?.email ?? "");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(session?.user?.image ?? "");
  const [message, setMessage] = useState("");

  const handleFieldUpdate = async (field: string, value: string) => {
    try {
      const updatedUser = await handleUpdate(field, value, session);
      console.log(field, value, session);
      if (updatedUser) {
        // Принудительно получаем новую сессию
        const updatedSession = await getSession();

        // Устанавливаем новую сессию в клиенте
        await signIn("credentials", {
          redirect: false,
          email: updatedSession?.user?.email,
        });

        setMessage("Данные успешно обновлены.");
      } else {
        setMessage("Пользователь не найден.");
      }
    } catch (error) {
      setMessage("Ошибка при обновлении данных.");
    }
  };

  return (
    <section className="settings">
      <p>{JSON.stringify(session)}</p>
      <h1>Настройки</h1>
      <div>
        <div className="settings_column">
          <div className="settings_block">
            <h2>Роль</h2>
            <span>
              <input
                type="text"
                placeholder="Роль"
                autoComplete="on"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
              <button
                title="Изменить роль"
                onClick={() => handleFieldUpdate("role", role)}
              >
                <IconEdit stroke={2} />
              </button>
            </span>
          </div>
          <div className="settings_block">
            <h2>Логин</h2>
            <span>
              <input
                type="text"
                placeholder="Name"
                autoComplete="on"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button
                title="Изменить логин"
                onClick={() => handleFieldUpdate("name", name)}
              >
                <IconEdit stroke={2} />
              </button>
            </span>
          </div>
          <div className="settings_block">
            <h2>Почта</h2>
            <span>
              <input
                type="email"
                placeholder="Email"
                autoComplete="on"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                title="Изменить почту"
                onClick={() => handleFieldUpdate("email", email)}
              >
                <IconEdit stroke={2} />
              </button>
            </span>
          </div>
          <div className="settings_block">
            <h2>Пароль</h2>
            <span>
              <input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                title="Изменить пароль"
                onClick={() => handleFieldUpdate("password", password)}
              >
                <IconEdit stroke={2} />
              </button>
            </span>
          </div>
        </div>
        <div className="settings_block avatar">
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
            <button
              title="Изменить аватар"
              onClick={() => handleFieldUpdate("image", image)}
            >
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
