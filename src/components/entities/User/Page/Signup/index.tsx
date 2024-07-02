"use client";

import { signIn } from "next-auth/react";
import React, { useState } from "react";

export function SignUPRender() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (result.error) {
      console.error(result.error);
    } else {
      console.log("User signed in!");
    }
  };

  return (

  );
}
