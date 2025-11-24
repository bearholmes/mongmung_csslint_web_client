/**
 * 로딩 스켈레톤 컴포넌트
 */

import styles from './LoadingSkeleton.module.css';

export interface LoadingSkeletonProps {
  /** 높이 */
  height?: string;
  /** 너비 */
  width?: string;
  /** 라운드 */
  borderRadius?: string;
}

/**
 * 로딩 중 표시할 스켈레톤 UI
 *
 * @example
 * ```tsx
 * <LoadingSkeleton height="100px" />
 * ```
 */
export function LoadingSkeleton({
  height = '20px',
  width = '100%',
  borderRadius = '4px',
}: LoadingSkeletonProps) {
  return <div className={styles.skeleton} style={{ height, width, borderRadius }} />;
}

/**
 * 여러 줄의 스켈레톤
 */
export function LoadingSkeletonLines({ count = 3 }: { count?: number }) {
  return (
    <div className={styles.lines}>
      {Array.from({ length: count }).map((_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: Static skeleton lines
        <LoadingSkeleton key={index} height="16px" width={index === count - 1 ? '70%' : '100%'} />
      ))}
    </div>
  );
}
