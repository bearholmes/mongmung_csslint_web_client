/**
 * 스크롤 관련 유틸리티 함수
 */

/**
 * 특정 요소로 부드럽게 스크롤 이동
 *
 * @param target - CSS 선택자 또는 HTMLElement
 * @param options - 스크롤 옵션
 *
 * @example
 * ```ts
 * // ID 선택자로 이동
 * scrollToElement('#result');
 *
 * // 요소로 직접 이동
 * const element = document.getElementById('result');
 * scrollToElement(element);
 *
 * // 커스텀 옵션
 * scrollToElement('#result', { block: 'start', behavior: 'auto' });
 * ```
 */
export function scrollToElement(
  target: string | HTMLElement,
  options: ScrollIntoViewOptions = { behavior: 'smooth', block: 'start' }
): void {
  const element = typeof target === 'string' ? document.querySelector(target) : target;

  if (!element) {
    console.warn(`[scrollToElement] Element not found: ${target}`);
    return;
  }

  element.scrollIntoView(options);
}

/**
 * 페이지 최상단으로 스크롤 이동
 *
 * @param behavior - 스크롤 동작 방식
 *
 * @example
 * ```ts
 * scrollToTop(); // 부드럽게 이동
 * scrollToTop('auto'); // 즉시 이동
 * ```
 */
export function scrollToTop(behavior: ScrollBehavior = 'smooth'): void {
  window.scrollTo({ top: 0, behavior });
}

/**
 * 특정 Y 좌표로 스크롤 이동
 *
 * @param y - Y 좌표
 * @param behavior - 스크롤 동작 방식
 *
 * @example
 * ```ts
 * scrollToY(500); // 500px 위치로 부드럽게 이동
 * scrollToY(0, 'auto'); // 최상단으로 즉시 이동
 * ```
 */
export function scrollToY(y: number, behavior: ScrollBehavior = 'smooth'): void {
  window.scrollTo({ top: y, behavior });
}
