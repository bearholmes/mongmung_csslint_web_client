/**
 * API 클라이언트 설정
 */

import { API_BASE_URL } from '@/constants';
import { ApiError, NetworkError } from '@/utils/error';
import { ofetch } from 'ofetch';

/**
 * API 클라이언트 인스턴스
 */
export const apiClient = ofetch.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  retry: 2,
  retryDelay: 500,
  timeout: 30000,

  /**
   * 요청 인터셉터
   */
  onRequest({ options }) {
    // 요청 시작 시 로그
    if (import.meta.env.DEV) {
      console.log('[API Request]', options.method, options.baseURL);
    }
  },

  /**
   * 응답 인터셉터
   */
  onResponse({ response }) {
    // 응답 로그
    if (import.meta.env.DEV) {
      console.log('[API Response]', response.status, response._data);
    }
  },

  /**
   * 에러 인터셉터
   */
  onResponseError({ response, error }) {
    // 에러 로그
    console.error('[API Error]', response?.status, error);

    // 네트워크 에러
    if (!response) {
      throw new NetworkError('서버에 연결할 수 없습니다');
    }

    // HTTP 에러
    const statusCode = response.status;
    const message =
      (response._data as { message?: string })?.message ??
      `서버 오류가 발생했습니다 (${statusCode})`;

    throw new ApiError(message, statusCode, response._data);
  },
});
