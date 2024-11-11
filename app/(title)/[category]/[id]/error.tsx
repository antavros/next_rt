"use client";

import { useEffect } from "react";
import { ErrorPage } from "@/components/widgets/Error";
import { redirect } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return <ErrorPage onClick={reset} />;
}
