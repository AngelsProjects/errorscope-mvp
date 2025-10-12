'use client';

import { useEffect } from 'react';
import { Button } from '@errorscope/ui/Button';
import styles from './error.module.css';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error boundary caught:', error);
  }, [error]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>⚠️ Something went wrong</h1>
      <p className={styles.message}>{error.message}</p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
