/**
 * 테스트 유틸리티
 */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type RenderOptions, render } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';

/**
 * 테스트용 QueryClient 생성
 */
function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // 테스트에서는 재시도 비활성화
        gcTime: 0, // 캐시 비활성화 (v5에서 cacheTime → gcTime)
        staleTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });
}

/**
 * 테스트 Wrapper 컴포넌트
 */
interface AllTheProvidersProps {
  children: ReactNode;
}

function AllTheProviders({ children }: AllTheProvidersProps) {
  const queryClient = createTestQueryClient();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

/**
 * React Testing Library의 render를 감싸서 필요한 Provider들과 함께 렌더링
 *
 * @param ui - 렌더링할 컴포넌트
 * @param options - 렌더링 옵션
 * @returns RTL render 결과
 *
 * @example
 * ```tsx
 * import { renderWithProviders } from '@/test/test-utils';
 *
 * test('renders component', () => {
 *   const { getByText } = renderWithProviders(<MyComponent />);
 *   expect(getByText('Hello')).toBeInTheDocument();
 * });
 * ```
 */
function renderWithProviders(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, { wrapper: AllTheProviders, ...options });
}

// Re-export everything
export * from '@testing-library/react';
export { renderWithProviders };
