/**
 * 린트 설정 프리셋 관리 컴포넌트
 * 사용자 정의 프리셋 저장/불러오기/삭제/이름변경 기능 제공
 */

import {
  MAX_PRESETS,
  deletePresetAtom,
  loadPresetAtom,
  presetsAtom,
  renamePresetAtom,
  savePresetAtom,
} from '@/atoms/lintAtom';
import type { LintPreset } from '@/types';
import { useAtomValue, useSetAtom } from 'jotai';
import { useState } from 'react';
import styles from './PresetManager.module.css';

/**
 * 프리셋 관리 패널
 * 사용자가 현재 설정을 프리셋으로 저장하거나 기존 프리셋을 불러올 수 있음
 */
export function PresetManager() {
  const presets = useAtomValue(presetsAtom);
  const savePreset = useSetAtom(savePresetAtom);
  const loadPreset = useSetAtom(loadPresetAtom);
  const deletePreset = useSetAtom(deletePresetAtom);
  const renamePreset = useSetAtom(renamePresetAtom);

  const [newPresetName, setNewPresetName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  const handleSave = () => {
    const name = newPresetName.trim();
    if (!name) {
      alert('프리셋 이름을 입력하세요.');
      return;
    }

    // 중복 이름 체크
    if (presets.some((preset) => preset.name === name)) {
      alert('이미 존재하는 프리셋 이름입니다. 다른 이름을 사용해주세요.');
      return;
    }

    try {
      savePreset(name);
      setNewPresetName('');
    } catch (error) {
      alert(error instanceof Error ? error.message : '프리셋 저장에 실패했습니다.');
    }
  };

  const handleLoad = (presetId: string) => {
    if (window.confirm('현재 설정을 이 프리셋으로 변경하시겠습니까?')) {
      loadPreset(presetId);
    }
  };

  const handleDelete = (presetId: string) => {
    if (window.confirm('이 프리셋을 삭제하시겠습니까?')) {
      deletePreset(presetId);
    }
  };

  const startEditing = (preset: LintPreset) => {
    setEditingId(preset.id);
    setEditingName(preset.name);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingName('');
  };

  const saveEditing = (presetId: string) => {
    const name = editingName.trim();
    if (!name) {
      alert('프리셋 이름을 입력하세요.');
      return;
    }

    // 중복 이름 체크 (현재 편집 중인 프리셋 제외)
    if (presets.some((preset) => preset.id !== presetId && preset.name === name)) {
      alert('이미 존재하는 프리셋 이름입니다. 다른 이름을 사용해주세요.');
      return;
    }

    renamePreset({ presetId, newName: name });
    setEditingId(null);
    setEditingName('');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <section className={styles.container} aria-labelledby="preset-manager-title">
      <header className={styles.header}>
        <h3 id="preset-manager-title" className={styles.title}>
          프리셋 관리
        </h3>
      </header>

      <p className={styles.description}>
        현재 설정을 프리셋으로 저장하거나 저장된 프리셋을 불러올 수 있습니다.
      </p>

      {/* 새 프리셋 저장 */}
      <div className={styles.saveSection}>
        <h4 className={styles.sectionTitle}>현재 설정 저장</h4>
        {presets.length >= MAX_PRESETS && (
          <p className={styles.limitWarning} role="alert">
            프리셋 최대 개수({MAX_PRESETS}개)에 도달했습니다. 새 프리셋을 저장하려면 기존 프리셋을
            삭제해주세요.
          </p>
        )}
        <form
          className={styles.saveForm}
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <input
            type="text"
            id="preset-name-input"
            className={styles.input}
            placeholder="프리셋 이름..."
            aria-label="프리셋 이름 입력"
            value={newPresetName}
            onChange={(e) => setNewPresetName(e.target.value)}
            maxLength={100}
            disabled={presets.length >= MAX_PRESETS}
          />
          <button
            type="submit"
            className={styles.saveButton}
            aria-label="프리셋 저장"
            disabled={presets.length >= MAX_PRESETS}
          >
            저장
          </button>
        </form>
      </div>

      {/* 프리셋 목록 */}
      <section className={styles.presetsSection} aria-labelledby="preset-list-title">
        <h4 id="preset-list-title" className={styles.sectionTitle}>
          저장된 프리셋 ({presets.length})
          {presets.length >= 50 && <span aria-label="프리셋 최대 개수 도달"> (최대)</span>}
        </h4>

        {presets.length === 0 ? (
          // biome-ignore lint/a11y/useSemanticElements: Status message
          <p className={styles.emptyMessage} role="status">
            저장된 프리셋이 없습니다.
          </p>
        ) : (
          <ul className={styles.presetList}>
            {presets.map((preset) => (
              <li key={preset.id} className={styles.presetItem}>
                {editingId === preset.id ? (
                  // 편집 모드
                  <form
                    className={styles.editMode}
                    onSubmit={(e) => {
                      e.preventDefault();
                      saveEditing(preset.id);
                    }}
                  >
                    <input
                      type="text"
                      className={styles.editInput}
                      aria-label={`프리셋 이름 변경: ${preset.name}`}
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Escape') {
                          cancelEditing();
                        }
                      }}
                      maxLength={100}
                      // biome-ignore lint/a11y/noAutofocus: UX for editing
                      autoFocus
                    />
                    <div className={styles.editButtons}>
                      <button type="submit" className={styles.confirmButton} aria-label="변경 확인">
                        ✓
                      </button>
                      <button
                        type="button"
                        className={styles.cancelButton}
                        onClick={cancelEditing}
                        aria-label="변경 취소"
                      >
                        ✕
                      </button>
                    </div>
                  </form>
                ) : (
                  // 일반 모드
                  <>
                    <div className={styles.presetInfo}>
                      <h5 className={styles.presetName}>{preset.name}</h5>
                      <div className={styles.presetMeta} aria-label="프리셋 정보">
                        <span>생성: {formatDate(preset.createdAt)}</span>
                        {preset.updatedAt !== preset.createdAt && (
                          <span>수정: {formatDate(preset.updatedAt)}</span>
                        )}
                      </div>
                    </div>
                    {/* biome-ignore lint/a11y/useSemanticElements: Button group doesn't need fieldset here */}
                    <div className={styles.presetActions} role="group" aria-label="프리셋 작업">
                      <button
                        type="button"
                        className={styles.loadButton}
                        onClick={() => handleLoad(preset.id)}
                        aria-label={`${preset.name} 프리셋 불러오기`}
                      >
                        불러오기
                      </button>
                      <button
                        type="button"
                        className={styles.renameButton}
                        onClick={() => startEditing(preset)}
                        aria-label={`${preset.name} 프리셋 이름 변경`}
                      >
                        이름 변경
                      </button>
                      <button
                        type="button"
                        className={styles.deleteButton}
                        onClick={() => handleDelete(preset.id)}
                        aria-label={`${preset.name} 프리셋 삭제`}
                      >
                        삭제
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  );
}
