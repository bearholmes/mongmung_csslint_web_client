/**
 * localStorage 유틸리티
 */

/**
 * localStorage에서 값을 가져옵니다
 *
 * @param key - 저장소 키
 * @param defaultValue - 기본값
 * @returns 저장된 값 또는 기본값
 *
 * @example
 * ```ts
 * const config = getStorageItem('lint-config', DEFAULT_CONFIG);
 * ```
 */
export function getStorageItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (item === null) {
      return defaultValue;
    }
    return JSON.parse(item) as T;
  } catch (error) {
    console.warn(`[Storage] Failed to parse ${key}:`, error);
    return defaultValue;
  }
}

/**
 * localStorage에 값을 저장합니다
 *
 * @param key - 저장소 키
 * @param value - 저장할 값
 *
 * @example
 * ```ts
 * setStorageItem('lint-config', config);
 * ```
 */
export function setStorageItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`[Storage] Failed to save ${key}:`, error);
  }
}

/**
 * localStorage에서 값을 제거합니다
 *
 * @param key - 저장소 키
 *
 * @example
 * ```ts
 * removeStorageItem('lint-config');
 * ```
 */
export function removeStorageItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`[Storage] Failed to remove ${key}:`, error);
  }
}

/**
 * localStorage를 초기화합니다
 *
 * @example
 * ```ts
 * clearStorage();
 * ```
 */
export function clearStorage(): void {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('[Storage] Failed to clear storage:', error);
  }
}
