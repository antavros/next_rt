"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { IconLogin, IconCheck } from '@tabler/icons-react';
import './style.css';

export function SignInPage() {
  const { data: session } = useSession();
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [nameOrEmail, setNameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [passwordValidations, setPasswordValidations] = useState({
    letter: false,
    capital: false,
    number: false,
    length: false,
    visible: false,
  });
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/user/profile');
    }
  }, [session, router]);

  const handlePasswordChange = (e: any) => {
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError('');
    const res = await signIn('credentials', {
      redirect: false,
      nameOrEmail,
      password,
    });

    if (res?.error) {
      if (res.error === `Invalid password`) {
        setError('Неверный пароль. Пожалуйста, попробуйте снова.');
      } else if (res.error.startsWith('Validation error')) {
        setError('Ошибка валидации. Проверьте введенные данные.');
      } else {
        setIsRegistering(true);
      }
    }
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email: email, password, name: login }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        await signIn('credentials', {
          redirect: false,
          login,
          email,
          password
        });
      }
    } catch (error) {
      setError('Произошла ошибка при регистрации');
    }
  };

  return (
    <section className="signin">
      <div className="head">
        <button onClick={() => setIsRegistering(false)} className={isRegistering ? undefined : "active"}>
          <h1>Войти</h1>
        </button>
        <p>|</p>
        <button onClick={() => setIsRegistering(true)} className={isRegistering ? "active" : undefined}>
          <h1>Регистрация</h1>
        </button>
      </div>
      <form onSubmit={isRegistering ? handleRegister : handleSubmit}>
        {isRegistering ? (
          <>
            <label htmlFor="login">
              <input
                name="login"
                type="text"
                placeholder="Логин"
                autoComplete="on"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
            </label>
            <label htmlFor="email">
              <input
                name="email"
                type="email"
                placeholder="Почта"
                autoComplete="on"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </>
        ) : (
          <label htmlFor="nameOrEmail">
            <input
              name="nameOrEmail"
              type="text"
              placeholder="Логин или почта"
              autoComplete="on"
              value={nameOrEmail}
              onChange={(e) => setNameOrEmail(e.target.value)}
            />
          </label>
        )}
        <label htmlFor="password">
          <input
            name="password"
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <button type="submit">
          <IconLogin stroke={2} />
          {isRegistering ? 'Зарегистрироваться' : 'Войти'}
        </button>
      </form>
      {error && <p>{error}</p>}
      {passwordValidations.visible ? (
        <div id="message">
          <h3>Пароль должен содержать:</h3>
          <span id="letter" className={passwordValidations.letter ? "valid" : "invalid"}>
            <IconCheck stroke={2} />
            <p>Одна <b>строчная</b> буква</p>
          </span>
          <span id="capital" className={passwordValidations.capital ? "valid" : "invalid"}>
            <IconCheck stroke={2} />
            <p>Одна <b>прописная (заглавная)</b> буква</p>
          </span>
          <span id="number" className={passwordValidations.number ? "valid" : "invalid"}>
            <IconCheck stroke={2} />
            <p>Одна <b>цифра</b></p>
          </span>
          <span id="length" className={passwordValidations.length ? "valid" : "invalid"}>
            <IconCheck stroke={2} />
            <p>Минимум <b>8 символов</b></p>
          </span>
        </div>) : null}
      <h1>или</h1>
      <button onClick={() => signIn('google')}>
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
      <Link href="/user/policy" className="policy">
        Политика конфиденциальности
      </Link>
    </section>
  );
}
