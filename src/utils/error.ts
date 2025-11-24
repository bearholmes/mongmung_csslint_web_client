/**
 * 에러 처리 유틸리티
 */

/**
 * 네트워크 에러 클래스
 */
export class NetworkError extends Error {
  constructor(message = '네트워크 연결을 확인해주세요') {
    super(message);
    this.name = 'NetworkError';
  }
}

/**
 * 검증 에러 클래스
 */
export class ValidationError extends Error {
  constructor(message = '입력값을 확인해주세요') {
    super(message);
    this.name = 'ValidationError';
  }
}

/**
 * API 에러 클래스
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * 에러에서 사용자 친화적 메시지 추출
 *
 * @param error - 에러 객체
 * @returns 사용자에게 표시할 메시지
 *
 * @example
 * ```ts
 * try {
 *   await fetchData();
 * } catch (error) {
 *   const message = getErrorMessage(error);
 *   toast.error(message);
 * }
 * ```
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof NetworkError) {
    return error.message;
  }

  if (error instanceof ValidationError) {
    return error.message;
  }

  if (error instanceof ApiError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return '예상치 못한 오류가 발생했습니다';
}

/**
 * 에러가 특정 타입인지 확인
 *
 * @param error - 에러 객체
 * @param errorType - 에러 클래스
 * @returns 타입 일치 여부
 *
 * @example
 * ```ts
 * if (isErrorType(error, NetworkError)) {
 *   // 네트워크 에러 처리
 * }
 * ```
 */
export function isErrorType<T extends Error>(
  error: unknown,
  // biome-ignore lint/suspicious/noExplicitAny: Constructor type requires any
  errorType: new (...args: any[]) => T
): error is T {
  return error instanceof errorType;
}
