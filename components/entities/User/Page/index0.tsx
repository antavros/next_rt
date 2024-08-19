"use client";


import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

import { IconLogin, IconCheck, IconX } from "@tabler/icons-react";
import "./style.css";


export function SignInPage() {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_TOKEN as string;
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [passwordValidations, setPasswordValidations] = useState({
    letter: false,
    capital: false,
    number: false,
    length: false,
    visible: false,
  });
function onChange(value: any) {
  console.log("Captcha value:", value);
}
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
    setError("");
    const res = await signIn("credentials", {
      redirect: false,
      password,
      email,
    });

    if (res?.error) {
      if (res.error === `Invalid password`) {
        setError("Неверный пароль. Пожалуйста, попробуйте снова.");
      } else if (res.error.startsWith("Validation error")) {
        setError("Ошибка валидации. Проверьте введенные данные.");
      } else {
        setIsRegistering(true);
      }
    }
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ email: email, password, name: login }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        await signIn("credentials", {
          redirect: false,
          password,
          email,
          login,
        });
      }
    } catch (error) {
      setError("Произошла ошибка при регистрации");
    }
  };
  const isPasswordValid = Object.values(passwordValidations).every(Boolean);

  return (
    <section className="signin">
      <div className="head">

        <button
          onClick={() => setIsRegistering(false)}
          className={isRegistering ? undefined : "active"}
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

        {isRegistering ? (
          <label htmlFor="login">
            Логин
            <input
              name="login"
              type="text"
              id="login"
              placeholder="Логин"
              autoComplete="on"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </label>
        ) : null}
        <label htmlFor="email">
          Почта
          <input
            name="email"
            type="email"
            id="email"
            placeholder="Почта"
            autoComplete="on"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          Пароль
          <input
            name="password"
            type="password"
            id="password"
            placeholder="Пароль"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        {error && <p className="error">{error}</p>}
        {passwordValidations.visible ? (
          <ul className="passwordMessage">
            <li className={passwordValidations.letter ? "valid" : "invalid"}>
              {passwordValidations.letter ? <IconCheck stroke={2} /> : <IconX stroke={2} />}
              <p>Одна <b>строчная</b> буква</p>
            </li>
            <li className={passwordValidations.capital ? "valid" : "invalid"}>
              {passwordValidations.capital ? <IconCheck stroke={2} /> : <IconX stroke={2} />}
              <p>Одна <b>прописная (заглавная)</b> буква</p>
            </li>
            <li className={passwordValidations.number ? "valid" : "invalid"}>
              {passwordValidations.number ? <IconCheck stroke={2} /> : <IconX stroke={2} />}
              <p>Одна <b>цифра</b></p>
            </li>
            <li className={passwordValidations.length ? "valid" : "invalid"}>
              {passwordValidations.length ? <IconCheck stroke={2} /> : <IconX stroke={2} />}
              <p>Минимум <b>8 символов</b></p>
            </li>
          </ul>
        ) : null}
        <ReCAPTCHA sitekey={siteKey} onChange={onChange} />

        <button type="submit" disabled={!isPasswordValid}>
          <IconLogin stroke={2} />
          {isRegistering ? "Зарегистрироваться" : "Войти"}
        </button>
      </form>
    </section >
  );
}
