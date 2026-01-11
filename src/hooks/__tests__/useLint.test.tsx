/**
 * useLint 훅 테스트
 */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import { Provider } from 'jotai';
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import { lintService } from '@/services/lintService';
import type { LintResult } from '@/types';
import { useLint } from '../useLint';

// Mock dependencies
vi.mock('@/services/lintService');
vi.mock('../useToast', () => ({
  useToast: () => ({
    error: vi.fn(),
    success: vi.fn(),
  }),
}));

// Create a wrapper with QueryClientProvider and Jotai Provider
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <Provider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  );
};

describe('useLint', () => {
  const mockLintResult: LintResult = {
    warnings: [
      {
        line: 1,
        column: 5,
        text: 'Expected indentation of 2 spaces (indentation)',
        rule: 'indentation',
        severity: 'error',
      },
    ],
    info: {
      version: '15.0.0',
      config: {},
    },
    output: 'body {\n  color: red;\n}',
    hasSyntaxError: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with default state', () => {
    const { result } = renderHook(() => useLint(), { wrapper: createWrapper() });

    expect(result.current.status.isLoaded).toBe(false);
    expect(result.current.status.isLoading).toBe(false);
    expect(result.current.warnings).toEqual([]);
    expect(result.current.diffCode).toBe('');
  });

  it('should run lint successfully', async () => {
    (lintService.lintCode as Mock).mockResolvedValue(mockLintResult);

    const { result } = renderHook(() => useLint(), { wrapper: createWrapper() });

    await act(async () => {
      await result.current.runLint('body { color: red }', 'css');
    });

    await waitFor(() => {
      expect(result.current.status.isLoaded).toBe(true);
      expect(result.current.warnings).toHaveLength(1);
      expect(result.current.warnings[0]?.rule).toBe('indentation');
      expect(result.current.version).toBe('15.0.0');
    });
  });

  it('should detect syntax error from hasSyntaxError field', async () => {
    const errorResult: LintResult = {
      ...mockLintResult,
      hasSyntaxError: true,
    };

    (lintService.lintCode as Mock).mockResolvedValue(errorResult);

    const { result } = renderHook(() => useLint(), { wrapper: createWrapper() });

    await act(async () => {
      await result.current.runLint('body { color: red }', 'css');
    });

    await waitFor(() => {
      expect(result.current.status.isCssSyntaxError).toBe(true);
    });
  });

  it('should detect syntax error from output (fallback)', async () => {
    const errorResult: LintResult = {
      ...mockLintResult,
      output: 'SyntaxError: Unexpected token',
      hasSyntaxError: undefined,
    };

    (lintService.lintCode as Mock).mockResolvedValue(errorResult);

    const { result } = renderHook(() => useLint(), { wrapper: createWrapper() });

    await act(async () => {
      await result.current.runLint('body { color: red }', 'css');
    });

    await waitFor(() => {
      expect(result.current.status.isCssSyntaxError).toBe(true);
    });
  });

  it('should handle empty code input', async () => {
    const { result } = renderHook(() => useLint(), { wrapper: createWrapper() });

    let lintResult: LintResult | null = null;
    await act(async () => {
      lintResult = await result.current.runLint('', 'css');
    });

    expect(lintResult).toBeNull();
    expect(lintService.lintCode).not.toHaveBeenCalled();
  });

  it('should handle API errors gracefully', async () => {
    const error = new Error('API Error');
    (lintService.lintCode as Mock).mockRejectedValue(error);

    const { result } = renderHook(() => useLint(), { wrapper: createWrapper() });

    let lintResult: LintResult | null = null;
    await act(async () => {
      lintResult = await result.current.runLint('body { color: red }', 'css');
    });

    expect(lintResult).toBeNull();
  });

  it('should reset lint state correctly', async () => {
    (lintService.lintCode as Mock).mockResolvedValue(mockLintResult);

    const { result } = renderHook(() => useLint(), { wrapper: createWrapper() });

    await act(async () => {
      await result.current.runLint('body { color: red }', 'css');
    });

    await waitFor(() => {
      expect(result.current.status.isLoaded).toBe(true);
    });

    act(() => {
      result.current.resetLint();
    });

    expect(result.current.status.isLoaded).toBe(false);
    expect(result.current.warnings).toEqual([]);
    expect(result.current.diffCode).toBe('');
    expect(result.current.version).toBe('');
  });

  it('should toggle rules visibility', () => {
    const { result } = renderHook(() => useLint(), { wrapper: createWrapper() });

    expect(result.current.status.isShowRules).toBe(false);

    act(() => {
      result.current.toggleRules();
    });

    expect(result.current.status.isShowRules).toBe(true);

    act(() => {
      result.current.toggleRules();
    });

    expect(result.current.status.isShowRules).toBe(false);
  });
});
