/**
 * 토스트 알림 훅
 */

import toast, { type Toast, type Renderable, type ValueOrFunction } from 'react-hot-toast';

/**
 * 토스트 옵션
 */
interface ToastOptions {
  /** 표시 시간 (ms) */
  duration?: number;
  /** 위치 */
  position?: Toast['position'];
  /** 아이콘 */
  icon?: Renderable;
}

/**
 * 기본 토스트 옵션
 */
const DEFAULT_OPTIONS: ToastOptions = {
  duration: 3000,
  position: 'top-center',
};

/**
 * 토스트 알림을 제공하는 훅
 *
 * @returns 토스트 메서드들
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const toast = useToast();
 *
 *   const handleClick = () => {
 *     toast.success('성공했습니다!');
 *     toast.error('오류가 발생했습니다');
 *     toast.info('정보 메시지');
 *   };
 *
 *   return <button onClick={handleClick}>알림 표시</button>;
 * }
 * ```
 */
export function useToast() {
  /**
   * 성공 토스트
   */
  const success = (message: ValueOrFunction<Renderable, Toast>, options?: ToastOptions) => {
    return toast.success(message, {
      ...DEFAULT_OPTIONS,
      ...options,
    });
  };

  /**
   * 에러 토스트
   */
  const error = (message: ValueOrFunction<Renderable, Toast>, options?: ToastOptions) => {
    return toast.error(message, {
      ...DEFAULT_OPTIONS,
      duration: 4000, // 에러는 조금 더 길게
      ...options,
    });
  };

  /**
   * 정보 토스트
   */
  const info = (message: ValueOrFunction<Renderable, Toast>, options?: ToastOptions) => {
    return toast(message, {
      ...DEFAULT_OPTIONS,
      icon: 'ℹ️',
      ...options,
    });
  };

  /**
   * 경고 토스트
   */
  const warning = (message: ValueOrFunction<Renderable, Toast>, options?: ToastOptions) => {
    return toast(message, {
      ...DEFAULT_OPTIONS,
      icon: '⚠️',
      ...options,
    });
  };

  /**
   * 로딩 토스트
   */
  const loading = (message: ValueOrFunction<Renderable, Toast>, options?: ToastOptions) => {
    return toast.loading(message, {
      ...DEFAULT_OPTIONS,
      ...options,
    });
  };

  /**
   * 프로미스 토스트
   */
  const promise = <T>(
    promise: Promise<T>,
    messages: {
      loading: Renderable;
      success: ValueOrFunction<Renderable, T>;
      error: ValueOrFunction<Renderable, Error>;
    },
    options?: ToastOptions
  ) => {
    return toast.promise(promise, messages, {
      ...DEFAULT_OPTIONS,
      ...options,
    });
  };

  /**
   * 토스트 닫기
   */
  const dismiss = (toastId?: string) => {
    return toast.dismiss(toastId);
  };

  /**
   * 모든 토스트 제거
   */
  const remove = (toastId?: string) => {
    return toast.remove(toastId);
  };

  return {
    success,
    error,
    info,
    warning,
    loading,
    promise,
    dismiss,
    remove,
  };
}
