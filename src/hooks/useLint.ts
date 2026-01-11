/**
 * 린트 관련 훅
 */

import { useMutation } from '@tanstack/react-query';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useResetAtom } from 'jotai/utils';
import {
  diffCodeAtom,
  hasDiffAtom,
  lintConfigAtom,
  lintInfoConfigAtom,
  lintStatusAtom,
  lintVersionAtom,
  setCssSyntaxErrorAtom,
  setLoadedAtom,
  setLoadingAtom,
  toggleRulesAtom,
  warningsAtom,
} from '@/atoms/lintAtom';
import { lintService } from '@/services/lintService';
import type { Syntax } from '@/types';
import { getErrorMessage } from '@/utils/error';
import { useToast } from './useToast';

/**
 * 린트 기능을 제공하는 훅
 *
 * @returns 린트 상태 및 메서드
 *
 * @example
 * ```tsx
 * function LintForm() {
 *   const { runLint, resetLint, status, warnings } = useLint();
 *
 *   const handleSubmit = async () => {
 *     await runLint('body { color: red }', 'css');
 *   };
 *
 *   return <div>{warnings.length} warnings found</div>;
 * }
 * ```
 */
export function useLint() {
  const toast = useToast();

  // Atoms
  const [config] = useAtom(lintConfigAtom);
  const status = useAtomValue(lintStatusAtom);
  const warnings = useAtomValue(warningsAtom);
  const diffCode = useAtomValue(diffCodeAtom);
  const version = useAtomValue(lintVersionAtom);
  const infoConfig = useAtomValue(lintInfoConfigAtom);
  const hasDiff = useAtomValue(hasDiffAtom);

  // Setters
  const setWarnings = useSetAtom(warningsAtom);
  const setDiffCode = useSetAtom(diffCodeAtom);
  const setVersion = useSetAtom(lintVersionAtom);
  const setInfoConfig = useSetAtom(lintInfoConfigAtom);
  const setLoading = useSetAtom(setLoadingAtom);
  const setLoaded = useSetAtom(setLoadedAtom);
  const setCssSyntaxError = useSetAtom(setCssSyntaxErrorAtom);
  const toggleRules = useSetAtom(toggleRulesAtom);

  // Reset atoms
  const resetWarnings = useResetAtom(warningsAtom);
  const resetDiffCode = useResetAtom(diffCodeAtom);
  const resetVersion = useResetAtom(lintVersionAtom);
  const resetInfoConfig = useResetAtom(lintInfoConfigAtom);

  /**
   * 린트 실행 mutation
   */
  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: async ({ code, syntax }: { code: string; syntax: Syntax }) => {
      return await lintService.lintCode(code, config, syntax);
    },
    onMutate: () => {
      setLoading(true);
      setCssSyntaxError(false);
      resetWarnings();
    },
    onSuccess: (data) => {
      if (!data) {
        setLoading(false);
        return;
      }

      // 결과 저장
      setWarnings(Object.freeze(data.warnings));
      setVersion(data.info.version);
      setInfoConfig(data.info.config ?? {});
      setDiffCode(data.output);
      setLoaded(true);

      // CSS 문법 오류 체크
      // 1. 백엔드가 hasSyntaxError를 제공하는 경우 우선 사용
      // 2. 없으면 폴백으로 output 문자열 검사 (하위 호환성)
      const hasSyntaxError =
        data.hasSyntaxError ?? data.output.toLowerCase().includes('syntaxerror');
      if (hasSyntaxError) {
        setCssSyntaxError(true);
      }

      setLoading(false);
    },
    onError: (err) => {
      setLoading(false);
      const message = getErrorMessage(err);
      toast.error(message);
      console.error('[useLint] Error:', err);
    },
  });

  /**
   * 린트 실행
   */
  const runLint = async (code: string, syntax: Syntax) => {
    if (!code) {
      toast.error('코드를 입력해주세요');
      return null;
    }

    try {
      return await mutateAsync({ code, syntax });
    } catch (_err) {
      return null;
    }
  };

  /**
   * 린트 결과 초기화
   */
  const resetLint = () => {
    setCssSyntaxError(false);
    resetWarnings();
    resetDiffCode();
    resetVersion();
    resetInfoConfig();
    setLoaded(false);
  };

  /**
   * 규칙 표시 토글
   */
  const handleToggleRules = () => {
    toggleRules();
  };

  return {
    // 상태
    status,
    config,
    warnings,
    diffCode,
    version,
    infoConfig,
    hasDiff,
    isLoading: isPending,
    isError,
    error,

    // 메서드
    runLint,
    resetLint,
    toggleRules: handleToggleRules,
  };
}
