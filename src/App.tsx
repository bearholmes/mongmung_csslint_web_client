/**
 * 메인 App 컴포넌트
 */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import { ErrorBoundary, ErrorFallback } from '@/components/ErrorBoundary';
import { router } from './router';

/**
 * QueryClient 인스턴스
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5분
    },
    mutations: {
      retry: 1,
    },
  },
});

/**
 * 에러 핸들러
 * 에러를 로깅하고 모니터링 서비스에 전송
 */
function handleError(error: Error, info: { componentStack?: string | null }) {
  // 에러 로깅
  console.error('[ErrorBoundary] Caught error:', error, info);

  // TODO: 프로덕션에서는 에러 모니터링 서비스에 전송
  // 예: Sentry.captureException(error, { contexts: { react: { componentStack: info.componentStack } } });
}

/**
 * App 컴포넌트
 */
export function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={handleError}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster position="top-center" />
        {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
