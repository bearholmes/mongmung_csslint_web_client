/**
 * 문법 선택 훅
 */

import { useAtom } from 'jotai';
import { useMemo } from 'react';
import { syntaxAtom } from '@/atoms/lintAtom';
import { SYNTAX_OPTIONS } from '@/constants';
import type { Syntax, SyntaxOption } from '@/types';

/**
 * 문법 선택 기능을 제공하는 훅
 *
 * @returns 문법 선택 상태 및 메서드
 *
 * @example
 * ```tsx
 * function SyntaxSelector() {
 *   const { syntax, syntaxOptions, selectedLabel, changeSyntax } = useSyntax();
 *
 *   return (
 *     <select value={syntax} onChange={(e) => changeSyntax(e.target.value as Syntax)}>
 *       {syntaxOptions.map(opt => (
 *         <option key={opt.value} value={opt.value}>{opt.label}</option>
 *       ))}
 *     </select>
 *   );
 * }
 * ```
 */
export function useSyntax() {
  const [syntax, setSyntax] = useAtom(syntaxAtom);

  /**
   * 현재 선택된 문법의 라벨
   */
  const selectedLabel = useMemo(() => {
    const option = SYNTAX_OPTIONS.find((opt) => opt.value === syntax);
    return option?.label ?? 'CSS';
  }, [syntax]);

  /**
   * 문법 변경
   */
  const changeSyntax = (newSyntax: Syntax) => {
    setSyntax(newSyntax);
  };

  /**
   * 옵션으로 문법 변경
   */
  const changeSyntaxByOption = (option: SyntaxOption) => {
    setSyntax(option.value);
  };

  return {
    syntax,
    syntaxOptions: SYNTAX_OPTIONS,
    selectedLabel,
    changeSyntax,
    changeSyntaxByOption,
  };
}
