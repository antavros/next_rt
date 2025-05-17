"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { signIn, useSession } from "next-auth/react";
import ReCAPTCHA from "react-google-recaptcha";

import {
  IconCheck,
  IconX,
  IconLogin,
  IconMail,
  IconUser,
  IconKey,
} from "@tabler/icons-react";
import "./style.css";

export function SignInPage() {
  const { data: session } = useSession();

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_TOKEN as string;
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const [passwordValidations, setPasswordValidations] = useState({
    letter: false,
    capital: false,
    number: false,
    length: false,
    visible: false,
  });

  if (session) {
    window.location.reload();
    redirect(`/profile`);
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPassword(password);

    const validations = {
      letter: /[a-z]/.test(password),
      capital: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      length: password.length >= 8,
      visible: password.length >= 1,
    };

    setPasswordValidations(validations);
  };

  const onCaptchaChange = (value: string | null) => {
    setRecaptchaValue(value);
  };

  const isPasswordValid = Object.values(passwordValidations).every(Boolean);
  const isFormValid = isPasswordValid && recaptchaValue;

  const handleRegister = async (e: any) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/user/register", {
        method: "POST",
        body: JSON.stringify({ email, password, name: userName }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      signIn("credentials", {
        redirect: false,
        password,
        email,
      });
      if (!res.ok) {
        if (data.error instanceof Array) {
          setError("email или name уже используется");
        }
      }
    } catch (error) {
      setError("email или name уже используется");
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    signIn("credentials", {
      redirect: false,
      password,
      email,
    }).then((callback) => {
      if (callback?.error) {
        setError("EMAIL или пароль введены неверно");
      }
    });
  };
  return (
    <section className="signin">
      <div className="head">
        <button
          onClick={() => setIsRegistering(false)}
          className={!isRegistering ? "active" : undefined}
        >
          <h1>Войти</h1>
        </button>
        <p>|</p>
        <button
          onClick={() => setIsRegistering(true)}
          className={isRegistering ? "active" : undefined}
        >
          <h1>Регистрация</h1>
        </button>
      </div>

      <form onSubmit={isRegistering ? handleRegister : handleSubmit}>
        {isRegistering && (
          <label htmlFor="login">
            <IconUser stroke={2} />
            <input
              name="username"
              type="text"
              id="username"
              placeholder="Логин"
              autoComplete="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </label>
        )}
        <label htmlFor="email">
          <IconMail stroke={2} />
          <input
            name="email"
            type="email"
            id="email"
            placeholder="Почта"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          <IconKey stroke={2} />
          <input
            name="password"
            type="password"
            id="password"
            autoComplete="current-password"
            placeholder="Пароль"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        {error && <p className="error">{error}</p>}

        {passwordValidations.visible && (
          <ul className="passwordMessage">
            <li className={passwordValidations.letter ? "valid" : "invalid"}>
              {passwordValidations.letter ? (
                <IconCheck stroke={2} />
              ) : (
                <IconX stroke={2} />
              )}
              <p>
                Одна <b>строчная</b> буква
              </p>
            </li>
            <li className={passwordValidations.capital ? "valid" : "invalid"}>
              {passwordValidations.capital ? (
                <IconCheck stroke={2} />
              ) : (
                <IconX stroke={2} />
              )}
              <p>
                Одна <b>прописная (заглавная)</b> буква
              </p>
            </li>
            <li className={passwordValidations.number ? "valid" : "invalid"}>
              {passwordValidations.number ? (
                <IconCheck stroke={2} />
              ) : (
                <IconX stroke={2} />
              )}
              <p>
                Одна <b>цифра</b>
              </p>
            </li>
            <li className={passwordValidations.length ? "valid" : "invalid"}>
              {passwordValidations.length ? (
                <IconCheck stroke={2} />
              ) : (
                <IconX stroke={2} />
              )}
              <p>
                Минимум <b>8 символов</b>
              </p>
            </li>
          </ul>
        )}
        <ReCAPTCHA sitekey={siteKey} onChange={onCaptchaChange} />

        <button type="submit" disabled={!isFormValid}>
          <IconLogin stroke={2} />
          {isRegistering ? "Зарегистрироваться" : "Войти"}
        </button>
      </form>

      <h1>или</h1>
      <button onClick={() => signIn("google")}>
        <Image
          width={35}
          height={35}
          quality={25}
          priority={true}
          alt="google"
          src="/images/google.svg"
        />
        Вход с аккаунтом Google
      </button>
      <Link href="/user/policy" className="policy" prefetch={false}>
        Политика конфиденциальности
      </Link>
    </section>
  );
}
