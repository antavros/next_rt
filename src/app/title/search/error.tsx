'use client'

import { useEffect } from 'react';
import { ErrorPage } from "../../../components/entities/Error";
import { redirect } from 'next/navigation'

export default function ErrorRender({ error, reset }: { readonly error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
    redirect(`/`)
  }, [error]);

  return (
    <ErrorPage onClick={reset} />
  );
}
