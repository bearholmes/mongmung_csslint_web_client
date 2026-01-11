/**
 * 린트 API 서비스
 */

import { ApiResponseSchema, LintRequestSchema } from '@/schemas/lint';
import type { LintConfig, LintResult, OutputStyle, Syntax } from '@/types';
import { ValidationError } from '@/utils/error';
import { apiClient } from './api';

/**
 * 린트 서비스
 */
export const lintService = {
  /**
   * CSS/HTML 코드를 린팅하고 결과를 반환합니다.
   *
   * @param code - 린팅할 코드 문자열
   * @param config - 린트 설정 객체
   * @param syntax - 코드 문법 타입 ('css' | 'html')
   * @returns 린팅 결과 객체
   * @throws {ValidationError} 유효하지 않은 입력값
   * @throws {ApiError} API 요청 실패
   * @throws {NetworkError} 네트워크 오류
   *
   * @example
   * ```ts
   * const result = await lintService.lintCode(
   *   'body { color: red }',
   *   { outputStyle: 'nested', rules: DEFAULT_LINT_RULES },
   *   'css'
   * );
   * console.log(result.warnings);
   * ```
   */
  async lintCode(code: string, config: LintConfig, syntax: Syntax): Promise<LintResult | null> {
    type RequestOutputStyle = Exclude<OutputStyle, ''>;
    // 입력값 검증
    const requestConfig: { rules: LintConfig['rules']; outputStyle?: RequestOutputStyle } = {
      rules: config.rules,
    };
    if (config.outputStyle) {
      requestConfig.outputStyle = config.outputStyle;
    }
    const validation = LintRequestSchema.safeParse({ code, config: requestConfig, syntax });
    if (!validation.success) {
      const firstError = validation.error.issues[0];
      throw new ValidationError(firstError?.message ?? '입력값이 유효하지 않습니다');
    }
    // API 요청
    const response = await apiClient<unknown>('/lint', {
      method: 'POST',
      body: {
        code,
        config: requestConfig,
        syntax,
      },
    });

    // 응답 검증
    const parsedResponse = ApiResponseSchema.safeParse(response);
    if (!parsedResponse.success) {
      console.error('[lintService] Invalid response format:', parsedResponse.error);
      return null;
    }

    return parsedResponse.data.content;
  },
};
