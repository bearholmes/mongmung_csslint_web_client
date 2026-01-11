/**
 * useSyntax 훅 테스트
 */

import { act, renderHook } from '@testing-library/react';
import { createStore, Provider } from 'jotai';
import type { ReactNode } from 'react';
import { describe, expect, it } from 'vitest';
import { SYNTAX_OPTIONS } from '@/constants';
import { useSyntax } from '../useSyntax';

const createWrapper = () => {
  const store = createStore();
  return ({ children }: { children: ReactNode }) => <Provider store={store}>{children}</Provider>;
};

describe('useSyntax', () => {
  it('should initialize with default syntax (css)', () => {
    const { result } = renderHook(() => useSyntax(), { wrapper: createWrapper() });

    expect(result.current.syntax).toBe('css');
    expect(result.current.selectedLabel).toBe('CSS');
  });

  it('should return syntax options', () => {
    const { result } = renderHook(() => useSyntax(), { wrapper: createWrapper() });

    expect(result.current.syntaxOptions).toEqual(SYNTAX_OPTIONS);
    expect(result.current.syntaxOptions).toHaveLength(2);
  });

  it('should change syntax by option', () => {
    const { result } = renderHook(() => useSyntax(), { wrapper: createWrapper() });

    const htmlOption = SYNTAX_OPTIONS.find((opt) => opt.value === 'html');

    if (htmlOption) {
      // act is needed for state updates
      act(() => {
        result.current.changeSyntaxByOption(htmlOption);
      });
      expect(result.current.syntax).toBe('html');
      expect(result.current.selectedLabel).toBe('HTML');
    }
  });

  it('should change syntax by value', () => {
    const { result } = renderHook(() => useSyntax(), { wrapper: createWrapper() });

    act(() => {
      result.current.changeSyntax('html');
    });

    expect(result.current.syntax).toBe('html');
    expect(result.current.selectedLabel).toBe('HTML');
  });

  it('should update selected label when syntax changes', () => {
    const { result } = renderHook(() => useSyntax(), { wrapper: createWrapper() });

    expect(result.current.selectedLabel).toBe('CSS');

    act(() => {
      result.current.changeSyntax('html');
    });

    expect(result.current.selectedLabel).toBe('HTML');

    act(() => {
      result.current.changeSyntax('css');
    });

    expect(result.current.selectedLabel).toBe('CSS');
  });
});
