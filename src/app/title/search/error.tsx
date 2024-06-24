'use client'

import { useEffect } from 'react';
import { ErrorRender } from '@/components/entities/Error';

import { redirect } from 'next/navigation'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
    redirect(`/`)
  }, [error]);

  return (
    <ErrorRender onClick={reset} />
  );
}
