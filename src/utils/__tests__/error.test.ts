/**
 * error 유틸리티 테스트
 */

import { describe, expect, it } from 'vitest';
import { ApiError, getErrorMessage, isErrorType, NetworkError, ValidationError } from '../error';

describe('Error Classes', () => {
  it('should create NetworkError with default message', () => {
    const error = new NetworkError();

    expect(error.name).toBe('NetworkError');
    expect(error.message).toBe('네트워크 연결을 확인해주세요');
  });

  it('should create NetworkError with custom message', () => {
    const error = new NetworkError('커스텀 메시지');

    expect(error.name).toBe('NetworkError');
    expect(error.message).toBe('커스텀 메시지');
  });

  it('should create ValidationError with default message', () => {
    const error = new ValidationError();

    expect(error.name).toBe('ValidationError');
    expect(error.message).toBe('입력값을 확인해주세요');
  });

  it('should create ApiError with status code and response', () => {
    const error = new ApiError('서버 오류', 500, { detail: 'Internal Server Error' });

    expect(error.name).toBe('ApiError');
    expect(error.message).toBe('서버 오류');
    expect(error.statusCode).toBe(500);
    expect(error.response).toEqual({ detail: 'Internal Server Error' });
  });
});

describe('getErrorMessage', () => {
  it('should return message from NetworkError', () => {
    const error = new NetworkError('네트워크 오류');
    const message = getErrorMessage(error);

    expect(message).toBe('네트워크 오류');
  });

  it('should return message from ValidationError', () => {
    const error = new ValidationError('유효하지 않은 입력');
    const message = getErrorMessage(error);

    expect(message).toBe('유효하지 않은 입력');
  });

  it('should return message from ApiError', () => {
    const error = new ApiError('API 오류', 404);
    const message = getErrorMessage(error);

    expect(message).toBe('API 오류');
  });

  it('should return message from generic Error', () => {
    const error = new Error('일반 오류');
    const message = getErrorMessage(error);

    expect(message).toBe('일반 오류');
  });

  it('should return string error as-is', () => {
    const message = getErrorMessage('문자열 오류');

    expect(message).toBe('문자열 오류');
  });

  it('should return default message for unknown error types', () => {
    const message = getErrorMessage({ unknown: 'error' });

    expect(message).toBe('예상치 못한 오류가 발생했습니다');
  });

  it('should return default message for null/undefined', () => {
    expect(getErrorMessage(null)).toBe('예상치 못한 오류가 발생했습니다');
    expect(getErrorMessage(undefined)).toBe('예상치 못한 오류가 발생했습니다');
  });
});

describe('isErrorType', () => {
  it('should correctly identify NetworkError', () => {
    const error = new NetworkError();

    expect(isErrorType(error, NetworkError)).toBe(true);
    expect(isErrorType(error, ValidationError)).toBe(false);
    expect(isErrorType(error, ApiError)).toBe(false);
  });

  it('should correctly identify ValidationError', () => {
    const error = new ValidationError();

    expect(isErrorType(error, ValidationError)).toBe(true);
    expect(isErrorType(error, NetworkError)).toBe(false);
    expect(isErrorType(error, ApiError)).toBe(false);
  });

  it('should correctly identify ApiError', () => {
    const error = new ApiError('Error', 500);

    expect(isErrorType(error, ApiError)).toBe(true);
    expect(isErrorType(error, NetworkError)).toBe(false);
    expect(isErrorType(error, ValidationError)).toBe(false);
  });

  it('should return false for non-matching types', () => {
    const error = new Error('Generic error');

    expect(isErrorType(error, NetworkError)).toBe(false);
    expect(isErrorType(error, ValidationError)).toBe(false);
    expect(isErrorType(error, ApiError)).toBe(false);
  });

  it('should return false for non-Error values', () => {
    expect(isErrorType('string', NetworkError)).toBe(false);
    expect(isErrorType(123, NetworkError)).toBe(false);
    expect(isErrorType(null, NetworkError)).toBe(false);
    expect(isErrorType(undefined, NetworkError)).toBe(false);
  });
});
