/**
 * 에러 폴백 컴포넌트
 */

import type { FallbackProps } from 'react-error-boundary';
import styles from './ErrorFallback.module.css';

/**
 * 에러 발생 시 표시되는 폴백 UI 컴포넌트
 *
 * @example
 * ```tsx
 * <ErrorBoundary FallbackComponent={ErrorFallback}>
 *   <App />
 * </ErrorBoundary>
 * ```
 */
export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className={styles.container} role="alert">
      <div className={styles.content}>
        <h1 className={styles.title}>앗! 문제가 발생했습니다</h1>
        <p className={styles.message}>
          예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
        </p>

        {import.meta.env.DEV && (
          <details className={styles.details}>
            <summary className={styles.summary}>오류 상세 정보</summary>
            <pre className={styles.errorStack}>
              <code>{error.message}</code>
              {error.stack && (
                <>
                  {'\n\n'}
                  <code>{error.stack}</code>
                </>
              )}
            </pre>
          </details>
        )}

        <div className={styles.actions}>
          <button type="button" className={styles.resetButton} onClick={resetErrorBoundary}>
            다시 시도
          </button>
          <button
            type="button"
            className={styles.homeButton}
            onClick={() => {
              window.location.href = '/';
            }}
          >
            홈으로 이동
          </button>
        </div>
      </div>
    </div>
  );
}
