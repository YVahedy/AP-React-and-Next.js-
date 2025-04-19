import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './404.module.css';

export default function NotFoundPage() {
  const router = useRouter();

  useEffect(() => {
    if (router.asPath !== '/404') {
      router.replace('/404');
    }
  }, [router]);

  const goHome = () => {
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.error}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.message}>Oops! The page you are looking for does not exist.</p>
        <button className={styles.button} onClick={goHome}>Go Home</button>
      </div>
    </div>
  );
};
