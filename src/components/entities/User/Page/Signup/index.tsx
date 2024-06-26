"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import "./style.css";

function RegisterButton({ pending }: { pending: boolean }) {
  const handleClick = (event: any) => {
    if (pending) {
      event.preventDefault();
    }
  };

  return (
    <button
      aria-disabled={Boolean(pending)}
      type="submit"
      onClick={handleClick}
    >
      Register
    </button>
  );
}

export const SignUpPage: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;

    setPending(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setErrorMessage(errorData.error || "Registration failed");
        setPending(false);
        return;
      }

      await signIn("credentials", { email, password });
      router.push("/");
    } catch (error) {
      setErrorMessage("Registration failed. " + error.message);
      setPending(false);
    }
  };

  return (
    <div className="signup">
      <form onSubmit={handleRegister}>
        <input type="text" name="name" placeholder="Имя" required />
        <input type="email" name="email" placeholder="почта" required />
        <input type="password" name="password" placeholder="пароль" required />
        <div>{errorMessage && <p>{errorMessage}</p>}</div>
        <RegisterButton pending={pending} />
      </form>
      <h1>Регистрация</h1>
    </div>
  );
};
