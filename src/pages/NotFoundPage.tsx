/**
 * 404 페이지
 */

import { Link } from 'react-router-dom';
import { Footer } from '@/components/Layout';
import styles from './NotFoundPage.module.css';

/**
 * 404 Not Found 페이지
 */
export function NotFoundPage() {
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>404</h1>
        <p>왜 오류가 났을까요??</p>
        <p className={styles.buttonWrapper}>
          <Link to="/" className={styles.link}>
            Back
          </Link>
        </p>
      </div>
      <Footer />
    </>
  );
}
