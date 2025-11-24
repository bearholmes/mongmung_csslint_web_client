/**
 * 경고 목록 컴포넌트
 */

import type { Warning } from '@/types';
import styles from './WarningList.module.css';
import { WarningListItem } from './WarningListItem';

/**
 * WarningList Props
 */
export interface WarningListProps {
  /** 경고 목록 */
  list: readonly Warning[];
  /** Diff 존재 여부 */
  hasDiff: boolean;
}

/**
 * 경고 목록 컴포넌트
 *
 * @example
 * ```tsx
 * function LintResult() {
 *   const { warnings, hasDiff } = useLint();
 *
 *   return <WarningList list={warnings} hasDiff={hasDiff} />;
 * }
 * ```
 */
export function WarningList({ list, hasDiff }: WarningListProps) {
  const hasWarnings = list.length > 0;

  return (
    <ul className={styles.list}>
      {/* 모든 검사 통과 */}
      {!hasWarnings && hasDiff && <li className={styles.success}>&#9728; ALL PASS :)</li>}

      {/* 경고 없으나 diff도 없음 (주의) */}
      {!hasWarnings && !hasDiff && <li className={styles.caution}>&#9729; Caution</li>}

      {/* 경고 있음 */}
      {hasWarnings && !hasDiff && (
        <li className={styles.warning}>&#9730; Warning ({list.length})</li>
      )}

      {/* 경고 목록 렌더링 */}
      {list.map((item, idx) => (
        <WarningListItem key={`${item.line}-${item.column}-${idx}`} item={item} />
      ))}
    </ul>
  );
}
