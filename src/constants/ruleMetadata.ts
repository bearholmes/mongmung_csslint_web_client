/**
 * 린트 규칙 메타데이터
 * stylelint 규칙을 UI에서 편집 가능하도록 메타데이터 제공
 */

export type RuleCategory =
  | 'quality'
  | 'color'
  | 'font'
  | 'spacing'
  | 'selectors'
  | 'properties'
  | 'values'
  | 'units'
  | 'naming'
  | 'order'
  | 'formatting';

/**
 * 규칙 메타데이터 인터페이스
 */
export interface RuleMetadata {
  /** 규칙 이름 (stylelint rule key) */
  key: string;
  /** 표시 이름 */
  label: string;
  /** 설명 */
  description: string;
  /** 카테고리 */
  category: RuleCategory;
  /** 편집 가능 여부 */
  editable: boolean;
  /** 가능한 값들 (editable이 true인 경우) */
  options?: Array<{ value: string | boolean | number; label: string }>;
}

/**
 * 카테고리 정보
 * 규칙을 논리적으로 그룹화하여 사용자 경험 향상
 */
export const RULE_CATEGORIES = {
  quality: {
    id: 'quality',
    label: '코드 품질',
    description: 'CSS 코드의 품질과 모범 사례 관련 규칙',
  },
  color: {
    id: 'color',
    label: '색상',
    description: '색상 값 및 형식 관련 규칙',
  },
  font: {
    id: 'font',
    label: '폰트',
    description: '폰트 및 타이포그래피 관련 규칙',
  },
  spacing: {
    id: 'spacing',
    label: '간격',
    description: '들여쓰기, 여백, 간격 관련 규칙',
  },
  selectors: {
    id: 'selectors',
    label: '선택자',
    description: 'CSS 선택자 관련 규칙',
  },
  properties: {
    id: 'properties',
    label: '속성',
    description: 'CSS 속성 관련 규칙',
  },
  values: {
    id: 'values',
    label: '값',
    description: 'CSS 속성 값 관련 규칙',
  },
  units: {
    id: 'units',
    label: '단위',
    description: '숫자 및 단위 관련 규칙',
  },
  naming: {
    id: 'naming',
    label: '네이밍',
    description: '클래스명, ID 등 네이밍 컨벤션 규칙',
  },
  order: {
    id: 'order',
    label: '속성 정렬',
    description: 'CSS 속성의 순서 관련 규칙',
  },
  formatting: {
    id: 'formatting',
    label: '포맷팅',
    description: '코드 스타일과 포맷팅 관련 규칙',
  },
} as const;

/**
 * 전체 stylelint 규칙 메타데이터
 * 사용자가 UI에서 편집할 수 있는 100+ 규칙들
 */
export const EDITABLE_RULES: readonly RuleMetadata[] = [
  // ============ 코드 품질 규칙 ============
  {
    key: 'declaration-no-important',
    label: '!important 금지',
    description: '!important 사용을 제한합니다',
    category: 'quality',
    editable: true,
    options: [
      { value: true, label: '금지' },
      { value: false, label: '허용' },
    ],
  },
  {
    key: 'declaration-property-value-no-unknown',
    label: '알 수 없는 속성값 금지',
    description: '유효하지 않은 속성 값을 감지합니다',
    category: 'quality',
    editable: true,
    options: [
      { value: true, label: '활성화' },
      { value: false, label: '비활성화' },
    ],
  },
  {
    key: 'no-descending-specificity',
    label: '특정도 하향 금지',
    description: '선택자 특정도가 낮아지는 것을 방지합니다',
    category: 'quality',
    editable: true,
    options: [
      { value: true, label: '활성화' },
      { value: false, label: '비활성화' },
    ],
  },
  {
    key: 'no-duplicate-selectors',
    label: '중복 선택자 금지',
    description: '같은 선택자가 중복되는 것을 방지합니다',
    category: 'quality',
    editable: true,
    options: [
      { value: true, label: '활성화' },
      { value: false, label: '비활성화' },
    ],
  },
  {
    key: 'no-empty-source',
    label: '빈 소스 금지',
    description: '빈 스타일시트를 금지합니다',
    category: 'quality',
    editable: true,
    options: [
      { value: true, label: '활성화' },
      { value: false, label: '비활성화' },
    ],
  },
  {
    key: 'no-invalid-double-slash-comments',
    label: '잘못된 // 주석 금지',
    description: 'CSS에서 // 스타일 주석 사용을 금지합니다',
    category: 'quality',
    editable: true,
    options: [
      { value: true, label: '활성화' },
      { value: false, label: '비활성화' },
    ],
  },

  // ============ 색상 규칙 ============
  {
    key: 'color-named',
    label: '색상 이름 사용',
    description: '색상 값에 이름(red, blue 등) 대신 hex/rgb 사용',
    category: 'color',
    editable: true,
    options: [
      { value: 'never', label: '사용 금지' },
      { value: 'always-where-possible', label: '가능한 경우 사용' },
    ],
  },
  {
    key: 'color-no-hex',
    label: 'HEX 색상 금지',
    description: 'HEX 색상 코드 사용을 금지합니다',
    category: 'color',
    editable: true,
    options: [
      { value: true, label: '금지' },
      { value: false, label: '허용' },
    ],
  },
  {
    key: 'color-no-invalid-hex',
    label: '잘못된 HEX 색상 금지',
    description: '유효하지 않은 HEX 색상 코드를 금지합니다',
    category: 'color',
    editable: true,
    options: [
      { value: true, label: '활성화' },
      { value: false, label: '비활성화' },
    ],
  },
  {
    key: 'alpha-value-notation',
    label: '투명도 표기법',
    description: '투명도 값의 표기 방식을 지정합니다',
    category: 'color',
    editable: true,
    options: [
      { value: 'number', label: '숫자 (0-1)' },
      { value: 'percentage', label: '백분율 (0%-100%)' },
    ],
  },
  {
    key: 'color-function-notation',
    label: '색상 함수 표기법',
    description: 'rgb, hsl 등 색상 함수의 표기 방식',
    category: 'color',
    editable: true,
    options: [
      { value: 'modern', label: '최신 (공백 구분)' },
      { value: 'legacy', label: '레거시 (콤마 구분)' },
    ],
  },
  {
    key: '@stylistic/color-hex-case',
    label: 'HEX 색상 대소문자',
    description: 'HEX 색상 코드의 대소문자 규칙',
    category: 'color',
    editable: true,
    options: [
      { value: 'lower', label: '소문자' },
      { value: 'upper', label: '대문자' },
    ],
  },
  {
    key: 'color-hex-length',
    label: 'HEX 색상 길이',
    description: 'HEX 색상 코드의 길이 (3자리/6자리)',
    category: 'color',
    editable: true,
    options: [
      { value: 'short', label: '짧게 (#fff)' },
      { value: 'long', label: '길게 (#ffffff)' },
    ],
  },

  // ============ 폰트 규칙 ============
  {
    key: 'font-family-name-quotes',
    label: '폰트명 따옴표',
    description: '폰트 패밀리 이름에 따옴표 사용 규칙',
    category: 'font',
    editable: true,
    options: [
      { value: 'always-where-recommended', label: '권장되는 경우 사용' },
      { value: 'always-unless-keyword', label: '키워드 제외 항상 사용' },
      { value: 'always-where-required', label: '필수인 경우만 사용' },
    ],
  },
  {
    key: 'font-family-no-duplicate-names',
    label: '중복 폰트명 금지',
    description: '폰트 패밀리에 중복된 이름을 금지합니다',
    category: 'font',
    editable: true,
    options: [
      { value: true, label: '활성화' },
      { value: false, label: '비활성화' },
    ],
  },
  {
    key: 'font-family-no-missing-generic-family-keyword',
    label: '제네릭 폰트 필수',
    description: '폰트 패밀리에 제네릭 폰트를 포함하도록 강제',
    category: 'font',
    editable: true,
    options: [
      { value: true, label: '활성화' },
      { value: false, label: '비활성화' },
    ],
  },
  {
    key: 'font-weight-notation',
    label: 'font-weight 표기법',
    description: 'font-weight 값의 표기 방식',
    category: 'font',
    editable: true,
    options: [
      { value: 'numeric', label: '숫자 (100, 400, 700)' },
      { value: 'named-where-possible', label: '가능한 경우 이름 (bold, normal)' },
    ],
  },

  // ============ 간격 규칙 ============
  {
    key: '@stylistic/indentation',
    label: '들여쓰기',
    description: '들여쓰기 스타일을 지정합니다',
    category: 'spacing',
    editable: true,
    options: [
      { value: 2, label: '2칸' },
      { value: 4, label: '4칸' },
      { value: 'tab', label: '탭' },
    ],
  },
  {
    key: '@stylistic/max-empty-lines',
    label: '최대 빈 줄',
    description: '허용되는 연속 빈 줄의 최대 개수',
    category: 'spacing',
    editable: true,
    options: [
      { value: 1, label: '1줄' },
      { value: 2, label: '2줄' },
      { value: 3, label: '3줄' },
    ],
  },
  {
    key: '@stylistic/no-eol-whitespace',
    label: '줄 끝 공백 금지',
    description: '줄 끝의 불필요한 공백을 제거합니다',
    category: 'spacing',
    editable: true,
    options: [
      { value: true, label: '활성화' },
      { value: false, label: '비활성화' },
    ],
  },
  {
    key: '@stylistic/no-missing-end-of-source-newline',
    label: '파일 끝 줄바꿈 필수',
    description: '파일 끝에 빈 줄을 요구합니다',
    category: 'spacing',
    editable: true,
    options: [
      { value: true, label: '활성화' },
      { value: false, label: '비활성화' },
    ],
  },

  // ============ 선택자 규칙 ============
  {
    key: 'selector-max-id',
    label: '최대 ID 선택자 수',
    description: '선택자에 허용되는 최대 ID 개수',
    category: 'selectors',
    editable: true,
    options: [
      { value: 0, label: '사용 금지' },
      { value: 1, label: '1개' },
      { value: 2, label: '2개' },
    ],
  },
  {
    key: 'selector-max-type',
    label: '최대 타입 선택자 수',
    description: '선택자에 허용되는 최대 타입 선택자 개수',
    category: 'selectors',
    editable: true,
    options: [
      { value: 0, label: '사용 금지' },
      { value: 2, label: '2개' },
      { value: 4, label: '4개' },
    ],
  },
  {
    key: 'selector-max-universal',
    label: '최대 전체 선택자 수',
    description: '전체 선택자(*)의 최대 사용 횟수',
    category: 'selectors',
    editable: true,
    options: [
      { value: 0, label: '사용 금지' },
      { value: 1, label: '1개' },
      { value: 2, label: '2개' },
    ],
  },
  {
    key: 'selector-max-specificity',
    label: '최대 특정도',
    description: '선택자의 최대 특정도를 제한합니다',
    category: 'selectors',
    editable: true,
    options: [
      { value: '0,2,0', label: '낮음 (0,2,0)' },
      { value: '0,4,0', label: '중간 (0,4,0)' },
      { value: '1,0,0', label: '높음 (1,0,0)' },
    ],
  },
  {
    key: 'selector-no-qualifying-type',
    label: '선택자 타입 한정 금지',
    description: '클래스/ID를 타입과 결합하는 것을 금지',
    category: 'selectors',
    editable: true,
    options: [
      { value: true, label: '활성화' },
      { value: false, label: '비활성화' },
    ],
  },
  {
    key: 'selector-no-vendor-prefix',
    label: '선택자 벤더 프리픽스 금지',
    description: '선택자에 벤더 프리픽스 사용을 금지합니다',
    category: 'selectors',
    editable: true,
    options: [
      { value: true, label: '활성화' },
      { value: false, label: '비활성화' },
    ],
  },
  {
    key: 'selector-pseudo-class-no-unknown',
    label: '알 수 없는 가상 클래스 금지',
    description: '유효하지 않은 가상 클래스를 금지합니다',
    category: 'selectors',
    editable: true,
    options: [
      { value: true, label: '활성화' },
      { value: false, label: '비활성화' },
    ],
  },
  {
    key: 'selector-pseudo-element-no-unknown',
    label: '알 수 없는 가상 요소 금지',
    description: '유효하지 않은 가상 요소를 금지합니다',
    category: 'selectors',
    editable: true,
    options: [
      { value: true, label: '활성화' },
      { value: false, label: '비활성화' },
    ],
  },
  {
    key: 'selector-type-no-unknown',
    label: '알 수 없는 타입 선택자 금지',
    description: '유효하지 않은 HTML 태그를 금지합니다',
    category: 'selectors',
    editable: true,
    options: [
      { value: true, label: '활성화' },
      { value: false, label: '비활성화' },
    ],
  },
  {
    key: '@stylistic/selector-list-comma-newline-after',
    label: '선택자 콤마 후 줄바꿈',
    description: '선택자 목록에서 콤마 후 줄바꿈 규칙',
    category: 'selectors',
    editable: true,
    options: [
      { value: 'always', label: '항상' },
      { value: 'always-multi-line', label: '여러 줄인 경우만' },
      { value: 'never-multi-line', label: '여러 줄이 아닌 경우만' },
    ],
  },

  // ============ 속성 규칙 ============
  {
    key: 'property-no-unknown',
    label: '알 수 없는 속성 금지',
    description: '유효하지 않은 CSS 속성을 금지합니다',
    category: 'properties',
    editable: true,
    options: [
      { value: true, label: '활성화' },
      { value: false, label: '비활성화' },
    ],
  },
  {
    key: 'property-no-vendor-prefix',
    label: '속성 벤더 프리픽스 금지',
    description: '속성에 벤더 프리픽스 사용을 금지합니다',
    category: 'properties',
    editable: true,
    options: [
      { value: true, label: '활성화' },
      { value: false, label: '비활성화' },
    ],
  },
  {
    key: 'declaration-block-no-duplicate-properties',
    label: '중복 속성 금지',
    description: '선언 블록에서 중복된 속성을 금지합니다',
    category: 'properties',
    editable: true,
    options: [
      { value: true, label: '활성화' },
      { value: false, label: '비활성화' },
    ],
  },
  {
    key: 'declaration-block-no-redundant-longhand-properties',
    label: '불필요한 개별 속성 금지',
    description: '축약형으로 대체 가능한 개별 속성 사용을 금지',
    category: 'properties',
    editable: true,
    options: [
      { value: true, label: '활성화' },
      { value: false, label: '비활성화' },
    ],
  },
  {
    key: 'declaration-block-no-shorthand-property-overrides',
    label: '축약 속성 덮어쓰기 금지',
    description: '축약 속성이 개별 속성을 덮어쓰는 것을 금지',
    category: 'properties',
    editable: true,
    options: [
      { value: true, label: '활성화' },
      { value: false, label: '비활성화' },
    ],
  },
  {
    key: 'shorthand-property-no-redundant-values',
    label: '불필요한 축약 속성 값 금지',
    description: '축약 속성에서 중복된 값을 금지합니다',
    category: 'properties',
    editable: true,
    options: [
      { value: true, label: '활성화' },
      { value: false, label: '비활성화' },
    ],
  },

  // ============ 값 규칙 ============
  {
    key: 'value-no-vendor-prefix',
    label: '값 벤더 프리픽스 금지',
    description: '값에 벤더 프리픽스 사용을 금지합니다',
    category: 'values',
    editable: true,
    options: [
      { value: true, label: '활성화' },
      { value: false, label: '비활성화' },
    ],
  },
  {
    key: 'value-keyword-case',
    label: '값 키워드 대소문자',
    description: '키워드 값의 대소문자 규칙',
    category: 'values',
    editable: true,
    options: [
      { value: 'lower', label: '소문자' },
      { value: 'upper', label: '대문자' },
    ],
  },
  {
    key: 'custom-property-no-missing-var-function',
    label: 'var() 함수 필수',
    description: '커스텀 속성 사용 시 var() 함수를 필수로 요구',
    category: 'values',
    editable: true,
    options: [
      { value: true, label: '활성화' },
      { value: false, label: '비활성화' },
    ],
  },

  // ============ 단위 규칙 ============
  {
    key: 'length-zero-no-unit',
    label: '0 값 단위 제거',
    description: '0 값에 단위를 사용하지 않도록 합니다',
    category: 'units',
    editable: true,
    options: [
      { value: true, label: '활성화' },
      { value: false, label: '비활성화' },
    ],
  },
  {
    key: 'number-max-precision',
    label: '숫자 최대 정밀도',
    description: '소수점 이하 최대 자릿수',
    category: 'units',
    editable: true,
    options: [
      { value: 2, label: '2자리' },
      { value: 3, label: '3자리' },
      { value: 4, label: '4자리' },
    ],
  },
  {
    key: 'unit-no-unknown',
    label: '알 수 없는 단위 금지',
    description: '유효하지 않은 단위를 금지합니다',
    category: 'units',
    editable: true,
    options: [
      { value: true, label: '활성화' },
      { value: false, label: '비활성화' },
    ],
  },
  {
    key: 'hue-degree-notation',
    label: '색조 각도 표기법',
    description: 'hsl/hwb에서 색조 값의 표기 방식',
    category: 'units',
    editable: true,
    options: [
      { value: 'angle', label: '각도 (180deg)' },
      { value: 'number', label: '숫자 (180)' },
    ],
  },

  // ============ 네이밍 규칙 ============
  {
    key: 'selector-class-pattern',
    label: '클래스명 패턴',
    description: '클래스명 네이밍 컨벤션',
    category: 'naming',
    editable: true,
    options: [
      { value: '^[a-z][a-zA-Z0-9]*$', label: 'camelCase' },
      { value: '^[a-z][a-z0-9-]*$', label: 'kebab-case' },
      { value: '^[a-z][a-z0-9_]*$', label: 'snake_case' },
    ],
  },
  {
    key: 'selector-id-pattern',
    label: 'ID 패턴',
    description: 'ID 네이밍 컨벤션',
    category: 'naming',
    editable: true,
    options: [
      { value: '^[a-z][a-zA-Z0-9]*$', label: 'camelCase' },
      { value: '^[a-z][a-z0-9-]*$', label: 'kebab-case' },
      { value: '^[a-z][a-z0-9_]*$', label: 'snake_case' },
    ],
  },
  {
    key: 'keyframes-name-pattern',
    label: 'keyframes 이름 패턴',
    description: '@keyframes 네이밍 컨벤션',
    category: 'naming',
    editable: true,
    options: [
      { value: '^[a-z][a-zA-Z0-9]*$', label: 'camelCase' },
      { value: '^[a-z][a-z0-9-]*$', label: 'kebab-case' },
      { value: '^[a-z][a-z0-9_]*$', label: 'snake_case' },
    ],
  },
  {
    key: 'custom-property-pattern',
    label: '커스텀 속성 패턴',
    description: 'CSS 변수 네이밍 컨벤션',
    category: 'naming',
    editable: true,
    options: [
      { value: '^[a-z][a-zA-Z0-9]*$', label: 'camelCase' },
      { value: '^[a-z][a-z0-9-]*$', label: 'kebab-case' },
      { value: '^[a-z][a-z0-9_]*$', label: 'snake_case' },
    ],
  },

  // ============ 속성 정렬 규칙 ============
  {
    key: 'order/properties-order',
    label: '속성 순서 정렬',
    description: 'CSS 속성을 정해진 순서대로 정렬합니다',
    category: 'order',
    editable: true,
    options: [
      { value: true, label: '활성화' },
      { value: false, label: '비활성화' },
    ],
  },
  {
    key: 'order/properties-alphabetical-order',
    label: '속성 알파벳 순 정렬',
    description: 'CSS 속성을 알파벳 순으로 정렬합니다',
    category: 'order',
    editable: true,
    options: [
      { value: true, label: '활성화' },
      { value: false, label: '비활성화' },
    ],
  },
  {
    key: 'declaration-block-single-line-max-declarations',
    label: '한 줄 최대 선언 수',
    description: '한 줄에 허용되는 최대 속성 선언 수',
    category: 'order',
    editable: true,
    options: [
      { value: 1, label: '1개' },
      { value: 2, label: '2개' },
      { value: 3, label: '3개' },
    ],
  },

  // ============ 포맷팅 규칙 ============
  {
    key: '@stylistic/string-quotes',
    label: '문자열 따옴표',
    description: '문자열에 사용할 따옴표 종류',
    category: 'formatting',
    editable: true,
    options: [
      { value: 'single', label: '작은따옴표' },
      { value: 'double', label: '큰따옴표' },
    ],
  },
  {
    key: '@stylistic/declaration-block-trailing-semicolon',
    label: '마지막 세미콜론',
    description: '선언 블록의 마지막 세미콜론 규칙',
    category: 'formatting',
    editable: true,
    options: [
      { value: 'always', label: '항상 사용' },
      { value: 'never', label: '사용 안 함' },
    ],
  },
  {
    key: '@stylistic/no-extra-semicolons',
    label: '불필요한 세미콜론 제거',
    description: '불필요한 세미콜론을 제거합니다',
    category: 'formatting',
    editable: true,
    options: [
      { value: true, label: '활성화' },
      { value: false, label: '비활성화' },
    ],
  },
  {
    key: '@stylistic/block-opening-brace-space-before',
    label: '중괄호 앞 공백',
    description: '여는 중괄호 앞에 공백 사용 규칙',
    category: 'formatting',
    editable: true,
    options: [
      { value: 'always', label: '항상' },
      { value: 'never', label: '사용 안 함' },
    ],
  },
  {
    key: '@stylistic/block-closing-brace-newline-after',
    label: '닫는 중괄호 후 줄바꿈',
    description: '닫는 중괄호 후 줄바꿈 규칙',
    category: 'formatting',
    editable: true,
    options: [
      { value: 'always', label: '항상' },
      { value: 'never', label: '사용 안 함' },
    ],
  },
  {
    key: '@stylistic/declaration-colon-space-after',
    label: '콜론 후 공백',
    description: '속성 콜론 후 공백 사용 규칙',
    category: 'formatting',
    editable: true,
    options: [
      { value: 'always', label: '항상' },
      { value: 'never', label: '사용 안 함' },
    ],
  },
  {
    key: '@stylistic/declaration-colon-space-before',
    label: '콜론 앞 공백',
    description: '속성 콜론 앞 공백 사용 규칙',
    category: 'formatting',
    editable: true,
    options: [
      { value: 'always', label: '항상' },
      { value: 'never', label: '사용 안 함' },
    ],
  },
  {
    key: '@stylistic/function-comma-space-after',
    label: '함수 콤마 후 공백',
    description: '함수 인자 콤마 후 공백 규칙',
    category: 'formatting',
    editable: true,
    options: [
      { value: 'always', label: '항상' },
      { value: 'never', label: '사용 안 함' },
    ],
  },
  {
    key: '@stylistic/number-leading-zero',
    label: '소수 앞 0',
    description: '1 미만 소수에 앞의 0 표기 규칙',
    category: 'formatting',
    editable: true,
    options: [
      { value: 'always', label: '항상 (0.5)' },
      { value: 'never', label: '사용 안 함 (.5)' },
    ],
  },
  {
    key: '@stylistic/number-no-trailing-zeros',
    label: '소수 뒤 0 제거',
    description: '소수 끝의 불필요한 0을 제거합니다',
    category: 'formatting',
    editable: true,
    options: [
      { value: true, label: '활성화' },
      { value: false, label: '비활성화' },
    ],
  },
] as const;
