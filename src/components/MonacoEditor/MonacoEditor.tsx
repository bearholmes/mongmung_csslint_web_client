/**
 * Monaco 코드 에디터 컴포넌트
 */

import type { Syntax } from '@/types';
import Editor, { type OnMount } from '@monaco-editor/react';
import type { editor } from 'monaco-editor';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

/**
 * MonacoEditor Props
 */
export interface MonacoEditorProps {
  /** 에디터 ID */
  editorId?: string;
  /** 코드 값 */
  value?: string;
  /** 값 변경 핸들러 */
  onChange?: (value: string | undefined) => void;
  /** 언어 타입 */
  language?: Syntax;
  /** 에디터 높이 */
  height?: string;
  /** 읽기 전용 여부 */
  readOnly?: boolean;
}

/**
 * MonacoEditor Ref
 */
export interface MonacoEditorRef {
  getValue: () => string | undefined;
  setValue: (value: string) => void;
}

/**
 * Monaco 코드 에디터 컴포넌트
 *
 * @example
 * ```tsx
 * function CodeInput() {
 *   const [code, setCode] = useState('');
 *
 *   return (
 *     <MonacoEditor
 *       value={code}
 *       onChange={setCode}
 *       language="css"
 *       height="200px"
 *     />
 *   );
 * }
 * ```
 */
export const MonacoEditor = forwardRef<MonacoEditorRef, MonacoEditorProps>(
  (
    { editorId, value = '', onChange, language = 'css', height = '150px', readOnly = false },
    ref
  ) => {
    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

    /**
     * 에디터 마운트 핸들러
     */
    const handleEditorMount: OnMount = useCallback((editor) => {
      editorRef.current = editor;
    }, []);

    /**
     * 값 변경 핸들러
     */
    const handleEditorChange = useCallback(
      (value: string | undefined) => {
        onChange?.(value);
      },
      [onChange]
    );

    /**
     * 외부 메서드 노출
     */
    useImperativeHandle(
      ref,
      () => ({
        getValue: () => editorRef.current?.getValue(),
        setValue: (newValue: string) => {
          editorRef.current?.setValue(newValue);
        },
      }),
      []
    );

    return (
      <div id={editorId} style={{ height }}>
        <Editor
          height="100%"
          language={language}
          value={value}
          onChange={handleEditorChange}
          onMount={handleEditorMount}
          options={{
            minimap: { enabled: false },
            suggest: {
              showFields: false,
              showFunctions: false,
            },
            formatOnPaste: true,
            automaticLayout: true,
            scrollBeyondLastLine: false,
            readOnly,
          }}
        />
      </div>
    );
  }
);

MonacoEditor.displayName = 'MonacoEditor';
