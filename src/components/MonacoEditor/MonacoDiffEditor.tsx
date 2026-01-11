/**
 * Monaco Diff 에디터 컴포넌트
 */

import type { Syntax } from '@/types';
import { DiffEditor } from '@monaco-editor/react';

/**
 * MonacoDiffEditor Props
 */
export interface MonacoDiffEditorProps {
  /** 에디터 ID */
  editorId?: string;
  /** 원본 코드 */
  originalCode: string;
  /** 수정된 코드 */
  modifiedCode: string;
  /** 언어 타입 */
  language?: Syntax;
  /** 에디터 높이 */
  height?: string;
}

/**
 * Monaco Diff 에디터 컴포넌트
 * 원본 코드와 수정된 코드를 비교하여 차이점을 시각적으로 표시합니다.
 *
 * @example
 * ```tsx
 * function CodeComparison() {
 *   const original = 'body { color: red }';
 *   const modified = 'body { color: blue }';
 *
 *   return (
 *     <MonacoDiffEditor
 *       originalCode={original}
 *       modifiedCode={modified}
 *       language="css"
 *       height="400px"
 *     />
 *   );
 * }
 * ```
 */
export function MonacoDiffEditor({
  editorId,
  originalCode,
  modifiedCode,
  language = 'css',
  height = '400px',
}: MonacoDiffEditorProps) {
  return (
    <div id={editorId} style={{ height }}>
      <DiffEditor
        height="100%"
        language={language}
        original={originalCode}
        modified={modifiedCode}
        options={{
          enableSplitViewResizing: true,
          originalEditable: false,
          automaticLayout: true,
          renderSideBySide: true,
          scrollBeyondLastLine: false,
          readOnly: true,
        }}
      />
    </div>
  );
}
