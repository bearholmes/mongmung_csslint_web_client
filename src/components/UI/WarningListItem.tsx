/**
 * 경고 목록 아이템 컴포넌트
 */

import { memo } from 'react';
import type { Warning } from '@/types';
import styles from './WarningListItem.module.css';

/**
 * WarningListItem Props
 */
export interface WarningListItemProps {
  /** 경고 아이템 */
  item: Warning;
}

/**
 * 경고 목록 아이템 컴포넌트
 * React.memo로 최적화됨
 *
 * @example
 * ```tsx
 * const warning = {
 *   line: 10,
 *   column: 5,
 *   text: 'Expected indentation of 2 spaces',
 *   rule: 'indentation',
 *   severity: 'error'
 * };
 *
 * <WarningListItem item={warning} />
 * ```
 */
export const WarningListItem = memo(({ item }: WarningListItemProps) => {
  const messageText = item.text.replace(`(${item.rule})`, '');

  return (
    <li
      className={`${styles.item} ${styles[item.severity]}`}
      id={`${item.line}${item.column}${item.text}`}
    >
      <span className={styles.location}>
        {item.line}:{item.column}
      </span>
      <span className={styles.severity}>{item.severity}</span>
      <span className={styles.message}>
        {messageText}
        <span className={styles.rule}>
          (
          <a
            className={styles.ruleLink}
            href={`//stylelint.io/user-guide/rules/${item.rule}/`}
            target="_blank"
            rel="noreferrer"
          >
            {item.rule}
          </a>
          )
        </span>
      </span>
    </li>
  );
});

WarningListItem.displayName = 'WarningListItem';
