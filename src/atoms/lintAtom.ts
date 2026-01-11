/**
 * 린트 관련 Jotai atoms
 * 린트 설정, 상태, 프리셋 관리
 */

import { DEFAULT_LINT_RULES } from '@/constants';
import type { LintConfig, LintPreset, LintStatus, OutputStyle, Syntax, Warning } from '@/types';
import { getStorageItem, setStorageItem } from '@/utils/storage';
import { atom } from 'jotai';
import { atomWithReset } from 'jotai/utils';

/**
 * 문법 선택 atom
 */
export const syntaxAtom = atom<Syntax>('css');

/**
 * 입력 코드 atom
 */
export const inputCodeAtom = atomWithReset<string>('');

/**
 * localStorage 키
 */
const STORAGE_KEY_LINT_CONFIG = 'mongmung-lint-config';

/**
 * 기본 린트 설정
 */
const DEFAULT_LINT_CONFIG: LintConfig = {
  outputStyle: '',
  rules: { ...DEFAULT_LINT_RULES },
};

/**
 * 린트 설정 atom (localStorage 연동)
 */
const lintConfigBaseAtom = atom<LintConfig>(
  getStorageItem(STORAGE_KEY_LINT_CONFIG, DEFAULT_LINT_CONFIG)
);

export const lintConfigAtom = atom(
  (get) => get(lintConfigBaseAtom),
  (_get, set, newConfig: LintConfig) => {
    set(lintConfigBaseAtom, newConfig);
    setStorageItem(STORAGE_KEY_LINT_CONFIG, newConfig);
  }
);

/**
 * 출력 스타일 atom (파생 atom)
 */
export const outputStyleAtom = atom(
  (get) => get(lintConfigAtom).outputStyle,
  (get, set, newValue: OutputStyle) => {
    const config = get(lintConfigAtom);
    set(lintConfigAtom, { ...config, outputStyle: newValue });
  }
);

/**
 * 린트 상태 atom
 */
export const lintStatusAtom = atom<LintStatus>({
  isLoaded: false,
  isLoading: false,
  isShowRules: false,
  isCssSyntaxError: false,
});

/**
 * 경고 목록 atom
 */
export const warningsAtom = atomWithReset<readonly Warning[]>([]);

/**
 * Diff 코드 atom (포맷팅된 코드)
 */
export const diffCodeAtom = atomWithReset<string>('');

/**
 * 린트 버전 atom
 */
export const lintVersionAtom = atomWithReset<string>('');

/**
 * 린트 설정 정보 atom
 */
export const lintInfoConfigAtom = atomWithReset<Record<string, unknown>>({});

/**
 * Diff 존재 여부 atom (읽기 전용)
 */
export const hasDiffAtom = atom((get) => {
  const diff = get(diffCodeAtom);
  return diff !== '';
});

/**
 * 경고 존재 여부 atom (읽기 전용)
 */
export const hasWarningsAtom = atom((get) => {
  const warnings = get(warningsAtom);
  return warnings.length > 0;
});

/**
 * 규칙 표시 토글 atom
 */
export const toggleRulesAtom = atom(null, (get, set) => {
  const status = get(lintStatusAtom);
  set(lintStatusAtom, { ...status, isShowRules: !status.isShowRules });
});

/**
 * 로딩 상태 설정 atom
 */
export const setLoadingAtom = atom(null, (get, set, isLoading: boolean) => {
  const status = get(lintStatusAtom);
  set(lintStatusAtom, { ...status, isLoading });
});

/**
 * CSS 문법 에러 설정 atom
 */
export const setCssSyntaxErrorAtom = atom(null, (get, set, isCssSyntaxError: boolean) => {
  const status = get(lintStatusAtom);
  set(lintStatusAtom, { ...status, isCssSyntaxError });
});

/**
 * 로드 완료 설정 atom
 */
export const setLoadedAtom = atom(null, (get, set, isLoaded: boolean) => {
  const status = get(lintStatusAtom);
  set(lintStatusAtom, { ...status, isLoaded });
});

/**
 * 린트 설정 초기화 atom
 */
export const resetLintConfigAtom = atom(null, (_get, set) => {
  set(lintConfigAtom, DEFAULT_LINT_CONFIG);
});

/**
 * 특정 규칙 업데이트 atom
 */
export const updateRuleAtom = atom(null, (get, set, update: { key: string; value: unknown }) => {
  const config = get(lintConfigAtom);
  const newValue = update.value as string | boolean | number | string[] | undefined;
  set(lintConfigAtom, {
    ...config,
    rules: {
      ...config.rules,
      [update.key]: newValue,
    },
  });
});

// ============ 프리셋 관리 ============

/**
 * localStorage 키
 */
const STORAGE_KEY_PRESETS = 'mongmung-lint-presets';

/**
 * 프리셋 최대 개수
 */
export const MAX_PRESETS = 50;

/**
 * 프리셋 목록 atom (localStorage 연동)
 */
const presetsBaseAtom = atom<LintPreset[]>(getStorageItem(STORAGE_KEY_PRESETS, []));

export const presetsAtom = atom(
  (get) => get(presetsBaseAtom),
  (_get, set, newPresets: LintPreset[]) => {
    set(presetsBaseAtom, newPresets);
    setStorageItem(STORAGE_KEY_PRESETS, newPresets);
  }
);

/**
 * 프리셋 저장 atom
 * @param name - 프리셋 이름
 * @throws {Error} 프리셋 개수가 MAX_PRESETS를 초과하는 경우
 */
export const savePresetAtom = atom(null, (get, set, name: string) => {
  const config = get(lintConfigAtom);
  const presets = get(presetsAtom);

  // 최대 개수 체크
  if (presets.length >= MAX_PRESETS) {
    throw new Error(`프리셋은 최대 ${MAX_PRESETS}개까지만 저장할 수 있습니다.`);
  }

  const now = new Date().toISOString();
  const newPreset: LintPreset = {
    id: Date.now().toString(),
    name,
    config: { ...config },
    createdAt: now,
    updatedAt: now,
  };

  set(presetsAtom, [...presets, newPreset]);
});

/**
 * 프리셋 불러오기 atom
 * @param presetId - 프리셋 ID
 */
export const loadPresetAtom = atom(null, (get, set, presetId: string) => {
  const presets = get(presetsAtom);
  const preset = presets.find((p) => p.id === presetId);

  if (preset) {
    set(lintConfigAtom, preset.config);
  }
});

/**
 * 프리셋 삭제 atom
 * @param presetId - 프리셋 ID
 */
export const deletePresetAtom = atom(null, (get, set, presetId: string) => {
  const presets = get(presetsAtom);
  set(
    presetsAtom,
    presets.filter((p) => p.id !== presetId)
  );
});

/**
 * 프리셋 이름 변경 atom
 * @param param - 프리셋 ID와 새 이름
 */
export const renamePresetAtom = atom(
  null,
  (get, set, param: { presetId: string; newName: string }) => {
    const presets = get(presetsAtom);
    set(
      presetsAtom,
      presets.map((p) =>
        p.id === param.presetId
          ? { ...p, name: param.newName, updatedAt: new Date().toISOString() }
          : p
      )
    );
  }
);
