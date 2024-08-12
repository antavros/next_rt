"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import style from "./UserSessionButton.module.css";
export function UserSessionButton({ title }: { readonly title: any }) {
  const [showUser, setShowUser] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const { data: session } = useSession();

  return (
    <div className={style.div}>
      <button onClick={() => setShowTitle(!showTitle)}>
        {showTitle ? JSON.stringify(title, null, 2) : "Показать тайтл"}
      </button>
      <button onClick={() => setShowUser(!showUser)}>
        {showUser ? JSON.stringify(session, null, 2) : "Показать сессию"}
        <div>
          <p>User ID: {session?.user?.id}</p>
          <p>User Role: {session?.user?.role}</p>
          <p>User name: {session?.user?.name}</p>
          <p>User email: {session?.user?.email}</p>
          <p>User image: {session?.user?.image}</p>
        </div>
      </button>
    </div>
  );
}
