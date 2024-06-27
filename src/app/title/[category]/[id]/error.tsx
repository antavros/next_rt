'use client'

import { useEffect } from 'react';
import { ErrorRender } from '@/components/entities/Error';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorRender onClick={reset} />
  );
}
