"use client";

import React, { useEffect } from "react";
import { ErrorPage } from "@/components/widgets/ErrorPage";

export default function ErrorRender({
  error,
  reset,
}: {
  readonly error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <ErrorPage onClick={reset} />;
}
