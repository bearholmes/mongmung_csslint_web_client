/**
 * 문법 선택 드롭다운 컴포넌트
 */

import type { SyntaxOption } from '@/types';
import { useEffect, useRef, useState } from 'react';
import styles from './SyntaxSelector.module.css';

/**
 * SyntaxSelector Props
 */
export interface SyntaxSelectorProps {
  /** 현재 선택된 값 */
  value: string;
  /** 옵션 목록 */
  options: readonly SyntaxOption[];
  /** 표시될 라벨 */
  label: string;
  /** 옵션 선택 핸들러 */
  onSelectOption: (option: SyntaxOption) => void;
}

/**
 * 문법 선택 드롭다운 컴포넌트
 *
 * @example
 * ```tsx
 * function Example() {
 *   const { syntax, syntaxOptions, selectedLabel, changeSyntaxByOption } = useSyntax();
 *
 *   return (
 *     <SyntaxSelector
 *       value={syntax}
 *       options={syntaxOptions}
 *       label={selectedLabel}
 *       onSelectOption={changeSyntaxByOption}
 *     />
 *   );
 * }
 * ```
 */
export function SyntaxSelector({ value, options, label, onSelectOption }: SyntaxSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectorRef = useRef<HTMLDivElement>(null);

  /**
   * 드롭다운 토글
   */
  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  /**
   * 옵션 선택
   */
  const handleSelectOption = (option: SyntaxOption) => {
    onSelectOption(option);
    setIsOpen(false);
  };

  /**
   * 외부 클릭 감지
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen]);

  return (
    <div ref={selectorRef} className={`${styles.selector} ${isOpen ? styles.open : ''}`}>
      <strong className={styles.screenOut}>언어 선택상자</strong>
      <em className={styles.screenOut}>선택내용</em>
      <button
        type="button"
        className={styles.label}
        onClick={handleToggle}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {label}
      </button>
      {/* biome-ignore lint/a11y/useSemanticElements: Custom listbox interaction for styled dropdown */}
      <div className={styles.dropdown} role="listbox" tabIndex={0}>
        <ul className={styles.list}>
          {options.map((option) => (
            <li
              key={option.value}
              className={styles.option}
              // biome-ignore lint/a11y/useSemanticElements: Custom option interaction for styled dropdown
              // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: List item used as option
              role="option"
              tabIndex={0}
              aria-selected={option.value === value}
              onClick={() => handleSelectOption(option)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSelectOption(option);
                }
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
