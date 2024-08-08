"use client";

import { useState } from "react";

export function UserSessionButton({ title }: { readonly title: any }) {
  const [showUser, setShowUser] = useState(false);

  return (
    <button onClick={() => setShowUser(!showUser)}>
      {showUser ? JSON.stringify(title, null, 2) : "Показать сессию"}
    </button>
  );
}
