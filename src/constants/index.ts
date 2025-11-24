/**
 * 글로벌 상수 정의
 */

import type { LintRules, SyntaxOption } from '@/types/lint';

/**
 * 샘플 코드
 */
export const SAMPLE_CODE = `<style>
#testColl .tbl_weather .ico_yesterday .bar {color:#e0e0e0 !important;margin:0 1px}
#testColl .tbl_weather .ico_yesterday .max {font:11PX "돋움", dotum;color:#f73a40}
#testColl .tbl_weather .ico_temp {display:block;position:absolute;left:0;overflow:hidden;width:35px;color:#444}
#testColl .wrap_whole .wrap_selectday {width:402px;height:38px;background:#F8F8F8;border-bottom:1px solid #adb1bb}
#testColl .list_daily .ico_arrow {display:none;position:absolute;bottom:-7px;left:45%;width:11px;height:7px;background-position:0 -250px;line-height:0;font-size:0}
#testColl .list_daily .day2 .ico_arrow, .list_daily .day2 .ico_arrow {background-position:0 -275px}
#testColl .list_daily .day4 .ico_arrow {background-position:0 -300px}
#testColl .wrap_overlap .list_overlap {width:90%;float:left}
</style>
<div id="weatherCollFavor" class="wrap_favor" style="display:none;">
    <strong class="tit_favor">관심지역</strong>
    <div class="select_box">
        <a id="weatherCollFavSel" href="javascript:;" class="selector">관심지역 보기</a>
        <div id="weatherCollAttantionArea" class="layer_dropdown" style="display:None">
            <ul id="weatherCollFavArea" class="list_favor">
                <li>
                    <a target="_blank" href="javascript:;">로그인이 필요합니다.</a>
                </li>
            </ul>
            <a href="javascript:;" class="favor_edit" target="_blank">관심지역 수정하기</a>
            <img alt="설명" src="#">
        </div>
    </div>
    <span title="흐림" class="ico_w20 ico_w4">흐림</span> 13 <span class="screen_out">℃</span>
    <span id="weatherCollFavTxt" class="fL">의 날씨정보를 볼 수 있습니다.</span>
</div>` as const;

/**
 * 기본 린트 규칙
 * Stylelint 기반 CSS 린트 규칙 설정
 */
export const DEFAULT_LINT_RULES: Readonly<LintRules> = {
  'color-named': 'never',
  'declaration-block-single-line-max-declarations': 99,
  'declaration-no-important': true,
  'declaration-property-value-no-unknown': true,
  'no-descending-specificity': false,
  'order/properties-order': [
    'display',
    'overflow',
    'overflow-wrap',
    'overflow-x',
    'overflow-y',
    'float',
    'position',
    'top',
    'right',
    'bottom',
    'left',
    'z-index',
    'width',
    'max-width',
    'min-width',
    'height',
    'max-height',
    'min-height',
    'margin',
    'margin-top',
    'margin-right',
    'margin-bottom',
    'margin-left',
    'padding',
    'padding-top',
    'padding-right',
    'padding-bottom',
    'padding-left',
    'border',
    'border-top',
    'border-right',
    'border-bottom',
    'border-left',
    'border-width',
    'border-top-width',
    'border-right-width',
    'border-bottom-width',
    'border-left-width',
    'border-style',
    'border-top-style',
    'border-right-style',
    'border-bottom-style',
    'border-left-style',
    'border-color',
    'border-top-color',
    'border-right-color',
    'border-bottom-color',
    'border-left-color',
    'border-radius',
    'border-top-left-radius',
    'border-top-right-radius',
    'border-bottom-right-radius',
    'border-bottom-left-radius',
    'box-shadow',
    'border-spacing',
    'font',
    'font-style',
    'font-variant',
    'font-weight',
    'font-stretch',
    'font-size',
    'line-height',
    'font-family',
    'color',
    'background',
    'background-attachment',
    'background-blend-mode',
    'background-clip',
    'background-color',
    'background-image',
    'background-origin',
    'background-position',
    'background-repeat',
    'background-size',
  ],
  'selector-class-pattern': false,
  'selector-id-pattern': false,
  'stylistic/at-rule-name-case': 'lower',
  'stylistic/at-rule-semicolon-newline-after': 'always',
  'stylistic/block-closing-brace-newline-after': 'always',
  'stylistic/block-opening-brace-space-after': 'never-single-line',
  'stylistic/block-opening-brace-space-before': 'never-single-line',
  'stylistic/color-hex-case': 'lower',
  'stylistic/declaration-block-semicolon-space-after': 'never',
  'stylistic/declaration-block-semicolon-space-before': 'never',
  'stylistic/declaration-block-trailing-semicolon': 'never',
  'stylistic/declaration-colon-space-after': 'never',
  'stylistic/declaration-colon-space-before': 'never',
  'stylistic/function-comma-space-after': 'never',
  'stylistic/function-comma-space-before': 'never',
  'stylistic/function-parentheses-space-inside': 'never',
  'stylistic/no-extra-semicolons': true,
  'stylistic/property-case': 'lower',
  'stylistic/selector-attribute-brackets-space-inside': 'never',
  'stylistic/selector-attribute-operator-space-after': 'never',
  'stylistic/selector-attribute-operator-space-before': 'never',
  'stylistic/selector-combinator-space-after': 'never',
  'stylistic/selector-combinator-space-before': 'never',
  'stylistic/selector-list-comma-space-after': 'never',
  'stylistic/selector-list-comma-space-before': 'never',
  'stylistic/selector-pseudo-class-case': 'lower',
  'stylistic/selector-pseudo-class-parentheses-space-inside': 'never',
  'stylistic/selector-pseudo-element-case': 'lower',
  'stylistic/string-quotes': 'single',
  'stylistic/unit-case': 'lower',
  'stylistic/value-list-comma-space-after': 'always',
  'stylistic/value-list-comma-space-before': 'never',
} as const;

/**
 * 문법 선택 옵션 목록
 */
export const SYNTAX_OPTIONS: readonly SyntaxOption[] = [
  { value: 'css', label: 'CSS' },
  { value: 'html', label: 'HTML' },
] as const;

/**
 * 앱 이름
 */
export const APP_NAME = '몽뭉 CSS Lint';

/**
 * API 기본 URL
 */
export const API_BASE_URL = import.meta.env.VITE_API_URL ?? '/api';
