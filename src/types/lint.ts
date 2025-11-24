/**
 * 린트 관련 타입 정의
 */

/**
 * 코드 문법 타입
 */
export type Syntax = 'css' | 'html';

/**
 * CSS 출력 스타일
 */
export type OutputStyle = 'nested' | 'compact' | '';

/**
 * 린트 경고 항목
 */
export interface Warning {
  /** 경고가 발생한 줄 번호 */
  line: number;
  /** 경고가 발생한 열 번호 */
  column: number;
  /** 경고 메시지 */
  text: string;
  /** 규칙 이름 */
  rule: string;
  /** 심각도 */
  severity: 'error' | 'warning';
}

/**
 * 린트 규칙 설정
 */
export interface LintRules {
  [key: string]: string | boolean | number | string[] | undefined;
}

/**
 * 린트 설정
 */
export interface LintConfig {
  /** 출력 스타일 */
  outputStyle: OutputStyle;
  /** 린트 규칙 */
  rules: LintRules;
}

/**
 * 린트 결과 정보
 */
export interface LintInfo {
  /** CSS Lint 버전 */
  version: string;
  /** 사용된 설정 */
  config?: Record<string, unknown>;
}

/**
 * 린트 API 응답
 */
export interface LintResult {
  /** 경고 목록 */
  warnings: Warning[];
  /** 린트 정보 */
  info: LintInfo;
  /** 포맷팅된 코드 (수정 후) */
  output: string;
  /** 문법 오류 여부 (백엔드가 제공하는 경우) */
  hasSyntaxError?: boolean;
}

/**
 * 린트 API 요청
 */
export interface LintRequest {
  /** 린팅할 코드 */
  code: string;
  /** 린트 설정 */
  config: LintConfig;
  /** 문법 타입 */
  syntax: Syntax;
}

/**
 * 린트 상태
 */
export interface LintStatus {
  /** 결과 로드 완료 여부 */
  isLoaded: boolean;
  /** 로딩 중 여부 */
  isLoading: boolean;
  /** 규칙 표시 여부 */
  isShowRules: boolean;
  /** CSS 문법 오류 여부 */
  isCssSyntaxError: boolean;
}

/**
 * 문법 선택 옵션
 */
export interface SyntaxOption {
  /** 옵션 값 */
  value: Syntax;
  /** 옵션 라벨 */
  label: string;
}

/**
 * 린트 설정 프리셋
 * 사용자가 저장한 규칙 설정
 */
export interface LintPreset {
  /** 프리셋 ID (타임스탬프 기반) */
  id: string;
  /** 프리셋 이름 */
  name: string;
  /** 린트 설정 */
  config: LintConfig;
  /** 생성 날짜 */
  createdAt: string;
  /** 수정 날짜 */
  updatedAt: string;
}
