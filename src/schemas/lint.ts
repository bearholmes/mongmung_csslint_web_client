/**
 * 린트 관련 Zod 스키마 정의
 */

import { z } from 'zod';

/**
 * 코드 문법 스키마
 */
export const SyntaxSchema = z.enum(['css', 'html']);

/**
 * CSS 출력 스타일 스키마
 */
export const OutputStyleSchema = z.enum(['nested', 'compact']);

/**
 * 린트 경고 스키마
 */
export const WarningSchema = z.object({
  line: z.number().int().positive(),
  column: z.number().int().nonnegative(),
  text: z.string(),
  rule: z.string(),
  severity: z.enum(['error', 'warning']),
});

/**
 * 린트 설정 스키마
 */
export const LintConfigSchema = z.object({
  outputStyle: OutputStyleSchema.optional(),
  rules: z.record(z.string(), z.unknown()),
});

/**
 * 린트 정보 스키마
 */
export const LintInfoSchema = z.object({
  version: z.string(),
  config: z.record(z.string(), z.unknown()).optional(),
});

/**
 * 린트 결과 스키마
 */
export const LintResultSchema = z.object({
  warnings: z.array(WarningSchema),
  info: LintInfoSchema,
  output: z.string(),
  /** 문법 오류 여부 (백엔드가 제공하는 경우) */
  hasSyntaxError: z.boolean().optional(),
});

/**
 * 린트 요청 스키마
 */
export const LintRequestSchema = z.object({
  code: z.string().min(1, '코드를 입력해주세요'),
  config: LintConfigSchema,
  syntax: SyntaxSchema,
});

/**
 * API 응답 래퍼 스키마
 */
export const ApiResponseSchema = z.object({
  content: LintResultSchema.nullable(),
});
