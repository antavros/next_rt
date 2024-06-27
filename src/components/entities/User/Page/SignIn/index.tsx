"use client";

import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import "./style.css";
import { IconBrandGoogle } from "@tabler/icons-react";

export const SignInPage: React.FC = () => {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: true,
      email,
      password,
    });
    if (result.error) {
      redirect(`/`);
    } else {
      console.log("User signed in!");
    }
  };
  useEffect(() => {
    if (status === "authenticated") {
      redirect(`/`);
    }
  }, [status]);

  return (
    <div className="signin">
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Sign In</button>
      </form>
      <h1>Вход</h1>
      <button onClick={() => signIn("google")}>
        <IconBrandGoogle stroke={2} />
        Вход с аккаунтом Google
      </button>
    </div>
  );
};
