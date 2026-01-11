/**
 * 린트 설정 가져오기/내보내기 컴포넌트
 * JSON 파일로 설정 공유 기능 제공
 */

import { lintConfigAtom } from '@/atoms/lintAtom';
import type { LintConfig } from '@/types';
import { useAtomValue, useSetAtom } from 'jotai';
import { useRef } from 'react';
import styles from './ConfigImportExport.module.css';

/**
 * 설정 가져오기/내보내기 패널
 * JSON 형식으로 설정을 파일로 저장하거나 파일에서 불러올 수 있음
 */
export function ConfigImportExport() {
  const config = useAtomValue(lintConfigAtom);
  const setConfig = useSetAtom(lintConfigAtom);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * 현재 설정을 JSON 파일로 내보내기
   */
  const handleExport = () => {
    try {
      const jsonString = JSON.stringify(config, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `csslint-config-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('[ConfigExport] Error exporting config:', error);
      alert('설정 내보내기 중 오류가 발생했습니다.');
    }
  };

  /**
   * JSON 설정 파일을 클립보드로 복사
   */
  const handleCopyToClipboard = async () => {
    try {
      const jsonString = JSON.stringify(config, null, 2);
      await navigator.clipboard.writeText(jsonString);
      alert('설정이 클립보드에 복사되었습니다.');
    } catch (error) {
      console.error('[ConfigExport] Error copying to clipboard:', error);
      alert('클립보드 복사 중 오류가 발생했습니다.');
    }
  };

  /**
   * JSON 파일에서 설정 가져오기
   */
  const handleImport = () => {
    fileInputRef.current?.click();
  };

  /**
   * 파일 선택 시 처리
   */
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const importedConfig = JSON.parse(content) as LintConfig;

        // 기본 검증
        if (!importedConfig.rules || typeof importedConfig.rules !== 'object') {
          throw new Error('Invalid config format: missing or invalid rules');
        }

        if (
          window.confirm(
            '현재 설정을 가져온 설정으로 변경하시겠습니까?\n현재 설정은 덮어씌워집니다.'
          )
        ) {
          setConfig(importedConfig);
          alert('설정을 성공적으로 가져왔습니다.');
        }
      } catch (error) {
        console.error('[ConfigImport] Error importing config:', error);
        alert('올바른 설정 파일이 아닙니다.\nJSON 형식을 확인해주세요.');
      }
    };

    reader.readAsText(file);

    // 파일 input 초기화 (같은 파일 재선택 가능하도록)
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  /**
   * 클립보드에서 JSON 텍스트 붙여넣기
   */
  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const importedConfig = JSON.parse(text) as LintConfig;

      // 기본 검증
      if (!importedConfig.rules || typeof importedConfig.rules !== 'object') {
        throw new Error('Invalid config format: missing or invalid rules');
      }

      if (window.confirm('클립보드의 설정을 적용하시겠습니까?\n현재 설정은 덮어씌워집니다.')) {
        setConfig(importedConfig);
        alert('설정을 성공적으로 가져왔습니다.');
      }
    } catch (error) {
      console.error('[ConfigImport] Error pasting from clipboard:', error);
      alert('올바른 설정 형식이 아닙니다.\nJSON 형식을 확인해주세요.');
    }
  };

  return (
    <section className={styles.container} aria-labelledby="config-import-export-title">
      <header className={styles.header}>
        <h3 id="config-import-export-title" className={styles.title}>
          설정 가져오기/내보내기
        </h3>
      </header>

      <p className={styles.description}>
        현재 설정을 JSON 파일로 내보내거나 JSON 파일에서 설정을 가져올 수 있습니다.
      </p>

      {/* 내보내기 섹션 */}
      <section className={styles.section} aria-labelledby="export-section-title">
        <h4 id="export-section-title" className={styles.sectionTitle}>
          내보내기
        </h4>
        <p className={styles.sectionDescription}>
          현재 린트 규칙 설정을 파일로 저장하거나 클립보드에 복사합니다.
        </p>
        {/* biome-ignore lint/a11y/useSemanticElements: Button group */}
        <div className={styles.buttons} role="group" aria-label="내보내기 작업">
          <button
            type="button"
            className={styles.primaryButton}
            onClick={handleExport}
            aria-label="현재 설정을 JSON 파일로 저장"
          >
            📥 JSON 파일로 저장
          </button>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={handleCopyToClipboard}
            aria-label="현재 설정을 클립보드에 복사"
          >
            📋 클립보드에 복사
          </button>
        </div>
      </section>

      {/* 가져오기 섹션 */}
      <section className={styles.section} aria-labelledby="import-section-title">
        <h4 id="import-section-title" className={styles.sectionTitle}>
          가져오기
        </h4>
        <p className={styles.sectionDescription}>JSON 파일이나 클립보드에서 설정을 불러옵니다.</p>
        {/* biome-ignore lint/a11y/useSemanticElements: Button group */}
        <div className={styles.buttons} role="group" aria-label="가져오기 작업">
          <button
            type="button"
            className={styles.primaryButton}
            onClick={handleImport}
            aria-label="JSON 파일에서 설정 불러오기"
          >
            📤 JSON 파일에서 불러오기
          </button>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={handlePasteFromClipboard}
            aria-label="클립보드에서 설정 불러오기"
          >
            📋 클립보드에서 불러오기
          </button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json,application/json"
          onChange={handleFileChange}
          aria-label="JSON 설정 파일 선택"
          style={{ display: 'none' }}
        />
      </section>

      {/* 예시 섹션 */}
      <section className={styles.exampleSection} aria-labelledby="example-section-title">
        <h4 id="example-section-title" className={styles.sectionTitle}>
          JSON 형식 예시
        </h4>
        <pre className={styles.codeBlock}>
          <code>
            {JSON.stringify(
              {
                outputStyle: '',
                rules: {
                  'color-named': 'never',
                  'declaration-no-important': true,
                  'stylistic/color-hex-case': 'lower',
                },
              },
              null,
              2
            )}
          </code>
        </pre>
      </section>
    </section>
  );
}
