/**
 * 규칙 토글 컴포넌트
 */

import type { RuleMetadata } from '@/constants/ruleMetadata';
import { memo } from 'react';
import styles from './RuleToggle.module.css';

export interface RuleToggleProps {
  /** 규칙 메타데이터 */
  rule: RuleMetadata;
  /** 현재 값 */
  value: unknown;
  /** 값 변경 핸들러 */
  onChange: (value: unknown) => void;
}

/**
 * 개별 규칙의 토글/선택 컴포넌트
 *
 * @example
 * ```tsx
 * <RuleToggle
 *   rule={ruleMetadata}
 *   value={currentValue}
 *   onChange={(value) => updateRule(rule.key, value)}
 * />
 * ```
 */
export const RuleToggle = memo(({ rule, value, onChange }: RuleToggleProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;

    // 타입에 맞게 변환
    if (newValue === 'true') {
      onChange(true);
    } else if (newValue === 'false') {
      onChange(false);
    } else if (!Number.isNaN(Number(newValue))) {
      onChange(Number(newValue));
    } else {
      onChange(newValue);
    }
  };

  const currentValue = String(value);

  return (
    <div className={styles.container}>
      <div className={styles.labelSection}>
        <label htmlFor={`rule-${rule.key}`} className={styles.label}>
          {rule.label}
        </label>
        <p className={styles.description}>{rule.description}</p>
      </div>
      <div className={styles.controlSection}>
        {rule.options && rule.options.length > 0 ? (
          <select
            id={`rule-${rule.key}`}
            className={styles.select}
            value={currentValue}
            onChange={handleChange}
          >
            {rule.options.map((option) => (
              <option key={String(option.value)} value={String(option.value)}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <span className={styles.info}>설정됨</span>
        )}
      </div>
    </div>
  );
});

RuleToggle.displayName = 'RuleToggle';
