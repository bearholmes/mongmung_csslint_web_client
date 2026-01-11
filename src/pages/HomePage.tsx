/**
 * 메인 페이지
 */

import { useAtom, useSetAtom } from 'jotai';
import { useResetAtom } from 'jotai/utils';
import { useCallback, useState } from 'react';
import { inputCodeAtom, outputStyleAtom, syntaxAtom } from '@/atoms/lintAtom';
import { Footer, Header } from '@/components/Layout';
import { MonacoDiffEditor, MonacoEditor } from '@/components/MonacoEditor';
import {
  ConfigImportExport,
  LoadingSkeletonLines,
  PresetManager,
  RulesPanel,
  SyntaxSelector,
  WarningList,
} from '@/components/UI';
import { SAMPLE_CODE } from '@/constants';
import { useLint, useSyntax, useToast } from '@/hooks';
import { scrollToElement } from '@/utils';

type SettingsTab = 'rules' | 'presets' | 'import-export';

/**
 * 메인 페이지 컴포넌트
 */
export function HomePage() {
  const toast = useToast();

  // 상태 관리
  const [inputCode, setInputCode] = useAtom(inputCodeAtom);
  const [outputStyle, setOutputStyle] = useAtom(outputStyleAtom);
  const resetInputCode = useResetAtom(inputCodeAtom);
  const setSyntax = useSetAtom(syntaxAtom);
  const [activeTab, setActiveTab] = useState<SettingsTab>('rules');

  // 커스텀 훅
  const { syntax, syntaxOptions, selectedLabel, changeSyntaxByOption } = useSyntax();
  const { status, warnings, diffCode, hasDiff, runLint, resetLint, toggleRules } = useLint();

  /**
   * Lint 실행 핸들러
   */
  const handleLint = useCallback(async () => {
    if (!inputCode) {
      toast.error('코드를 입력해주세요');
      return;
    }

    await runLint(inputCode, syntax);
    requestAnimationFrame(() => {
      scrollToElement('#result');
    });
  }, [inputCode, syntax, runLint, toast]);

  /**
   * 초기화 핸들러
   */
  const handleClear = useCallback(() => {
    resetLint();
    resetInputCode();
    setSyntax('css');
    requestAnimationFrame(() => {
      scrollToElement('#MongmungBody');
    });
  }, [resetLint, resetInputCode, setSyntax]);

  /**
   * 샘플 코드 핸들러
   */
  const handleSample = useCallback(() => {
    resetLint();
    setInputCode(SAMPLE_CODE);
    setSyntax('html');
  }, [resetLint, setInputCode, setSyntax]);

  /**
   * 출력 스타일 변경 핸들러
   */
  const handleOutputStyleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setOutputStyle(e.target.value as 'nested' | 'compact' | '');
    },
    [setOutputStyle]
  );

  return (
    <div>
      <div id="MongmungIndex">
        <a href="#MongmungBody">본문 바로가기</a>
      </div>

      <div id="MongmungWrap" className="lint_type1">
        <Header />
        <hr className="hide" />

        <main id="MongmungContent" className="k_main">
          <div id="cMain">
            <div id="mArticle" className="box_article">
              <h2 id="MongmungBody" className="screen_out">
                본문
              </h2>
              <h3 className="screen_out">입력</h3>

              {/* 메뉴 영역 */}
              <div className="wrap_menu wrap_menu--with-settings">
                {/* 언어 선택 */}
                <SyntaxSelector
                  value={syntax}
                  options={syntaxOptions}
                  label={selectedLabel}
                  onSelectOption={changeSyntaxByOption}
                />

                {/* 액션 버튼 */}
                <button
                  type="button"
                  className="btn_type1"
                  disabled={status.isLoading}
                  onClick={handleLint}
                >
                  Lint
                </button>
                <button
                  type="button"
                  className="btn_type2"
                  disabled={status.isLoading}
                  onClick={handleClear}
                >
                  Clear
                </button>

                {/* CSS 출력 스타일 선택 */}
                {syntax === 'css' && (
                  <div>
                    <span style={{ marginRight: '14px', verticalAlign: 'top' }}>
                      Output Style
                      <span style={{ color: '#999', verticalAlign: 'super', fontSize: '10px' }}>
                        beta
                      </span>
                    </span>
                    <label>
                      <input
                        type="radio"
                        name="outputStyle"
                        value="nested"
                        checked={outputStyle === 'nested'}
                        disabled={status.isLoading}
                        onChange={handleOutputStyleChange}
                      />
                      <span className="custom-radio" />
                      nested
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="outputStyle"
                        value="compact"
                        checked={outputStyle === 'compact'}
                        disabled={status.isLoading}
                        onChange={handleOutputStyleChange}
                      />
                      <span className="custom-radio" />
                      compact
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="outputStyle"
                        value=""
                        checked={outputStyle === ''}
                        disabled={status.isLoading}
                        onChange={handleOutputStyleChange}
                      />
                      <span className="custom-radio" />
                      none
                    </label>
                  </div>
                )}
                <button
                  type="button"
                  className="link_sample"
                  disabled={status.isLoading}
                  onClick={handleSample}
                >
                  샘플 불러오기
                </button>
                <button
                  type="button"
                  className="btn_type2 btn_settings_trigger"
                  disabled={status.isLoading}
                  aria-pressed={status.isShowRules}
                  onClick={toggleRules}
                >
                  규칙 설정
                </button>
              </div>

              <div className="tf_custom">
                <MonacoEditor
                  editorId="inpTextarea"
                  value={inputCode}
                  onChange={(value) => setInputCode(value ?? '')}
                  language={syntax}
                  height="150px"
                />
              </div>

              {/* 로딩 표시 */}
              {status.isLoading && (
                <div>
                  <div className="ico_loader" />
                  <div style={{ padding: '20px' }}>
                    <LoadingSkeletonLines count={5} />
                  </div>
                </div>
              )}

              {/* 결과 섹션 */}
              {status.isLoaded && (
                <div id="result" className="section_result">
                  <h3 className="tit_paragraph">Result</h3>

                  {!status.isCssSyntaxError ? (
                    <>
                      <h4 className="screen_out">문법 오류</h4>
                      <WarningList list={warnings} hasDiff={hasDiff} />

                      <h4 className="screen_out">위치</h4>
                      <div id="diff" className="box_diff">
                        {hasDiff && inputCode && (
                          <MonacoDiffEditor
                            editorId="editor"
                            originalCode={inputCode}
                            modifiedCode={diffCode}
                            language={syntax}
                            height="400px"
                          />
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="box_error">
                      <strong className="emph_color">CSS Syntax Error 😢</strong>
                      <span className="txt_message">입력 값을 확인 후, 다시 시도해주세요.</span>
                    </div>
                  )}
                </div>
              )}

              {/* 설정 패널 (사이드바) */}
              <button
                type="button"
                className={`settings_drawer_overlay ${status.isShowRules ? 'open' : ''}`}
                tabIndex={status.isShowRules ? 0 : -1}
                aria-label="규칙 설정 패널 닫기"
                onClick={toggleRules}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    toggleRules();
                  }
                }}
                aria-hidden={!status.isShowRules}
              />
              <aside
                className={`settings_drawer ${status.isShowRules ? 'open' : ''}`}
                aria-label="규칙 설정 패널"
              >
                <div className="settings_drawer_header">
                  <div>
                    <p className="settings_drawer_kicker">환경설정</p>
                    <h4 className="settings_drawer_title">규칙 · 프리셋</h4>
                  </div>
                  <button type="button" className="btn_type2" onClick={toggleRules}>
                    닫기
                  </button>
                </div>

                <div className="settings_tabs" role="tablist" aria-label="설정 탭">
                  <button
                    type="button"
                    className={`settings_tab_button ${activeTab === 'rules' ? 'active' : ''}`}
                    onClick={() => setActiveTab('rules')}
                    role="tab"
                    aria-selected={activeTab === 'rules'}
                  >
                    규칙 설정
                  </button>
                  <button
                    type="button"
                    className={`settings_tab_button ${activeTab === 'presets' ? 'active' : ''}`}
                    onClick={() => setActiveTab('presets')}
                    role="tab"
                    aria-selected={activeTab === 'presets'}
                  >
                    프리셋 관리
                  </button>
                  <button
                    type="button"
                    className={`settings_tab_button ${activeTab === 'import-export' ? 'active' : ''}`}
                    onClick={() => setActiveTab('import-export')}
                    role="tab"
                    aria-selected={activeTab === 'import-export'}
                  >
                    가져오기/내보내기
                  </button>
                </div>

                <div className="settings_drawer_body">
                  {activeTab === 'rules' && <RulesPanel />}
                  {activeTab === 'presets' && <PresetManager />}
                  {activeTab === 'import-export' && <ConfigImportExport />}
                </div>
              </aside>

              {/* 퀵 메뉴 네비게이션 */}
              {status.isLoaded && (
                <div className="nav_flow">
                  <strong className="screen_out">퀵 메뉴</strong>
                  <button
                    type="button"
                    className="btn_type2"
                    onClick={() => scrollToElement('#MongmungBody')}
                  >
                    TOP
                  </button>
                  <button
                    type="button"
                    className="btn_type2"
                    onClick={() => scrollToElement('#result')}
                  >
                    Result
                  </button>
                  {!status.isCssSyntaxError && (
                    <button
                      type="button"
                      className="btn_type2"
                      onClick={() => scrollToElement('#diff')}
                    >
                      Diff
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>

        <hr className="hide" />
        <Footer />
      </div>
    </div>
  );
}
