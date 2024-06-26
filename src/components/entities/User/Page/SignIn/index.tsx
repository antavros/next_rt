"use client";

import React, { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { IconBrandGoogle } from "@tabler/icons-react";

import { authenticate } from "./actions";

import "./style.css";

function LoginButton() {
  const { pending } = useFormStatus();

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
      Login
    </button>
  );
}

export const SignInPage: React.FC = () => {
  const { data: session, status } = useSession();
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  useEffect(() => {
    if (status === "authenticated") {
      redirect(`/`);
    }
  }, [status]);

  return (
    <div className="signin">
      <form action={dispatch}>
        <input type="email" name="email" placeholder="почта" required />
        <input
          type="password"
          name="password"
          placeholder="пароль"
          required
        />
        <div>{errorMessage && <p>{errorMessage}</p>}</div>
        <LoginButton />
      </form>
      <h1>Вход</h1>
      <button onClick={() => signIn("google")}>
        <IconBrandGoogle stroke={2} />
        Вход с аккаунтом Google
      </button>
    </div>
  );
};
