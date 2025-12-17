# Stylelint 16 마이그레이션 검토 보고서 (프론트엔드)

> **작성일**: 2025-12-04
> **대상 프로젝트**: mongmung_csslint_web_client
> **현재 브랜치**: `claude/migrate-stylelint-v16-01Rg1atvCPYCJzzgbwRqNy76`

---

## 📋 개요

백엔드 API 서버가 **stylelint 15.11.0 → 16.0.0**으로 마이그레이션 예정이며, 프론트엔드 클라이언트의 호환성 검토가 필요합니다.

이 프로젝트는 CSS 린팅 웹 클라이언트로, 백엔드 API(`mongmung_csslint_server`)가 실제 stylelint 린팅을 수행하고 프론트엔드는 UI와 규칙 메타데이터를 제공합니다.

---

## 🔍 현재 상태 분석

### 프론트엔드 환경
- **Node.js**: 20+ (package.json에 명시)
- **프레임워크**: React 19 + TypeScript 5.7 + Vite 6
- **모듈 시스템**: ESM (`"type": "module"`)
- **Linter**: Biome (프론트엔드 코드용)
- **stylelint 의존성**: ❌ 없음 (백엔드 API 사용)

### 백엔드 API 통신
- **엔드포인트**: `POST /lint`
- **요청**: `{ code, config: { rules, outputStyle }, syntax }`
- **응답**: `{ warnings, info, output }`

---

## 📊 Stylelint v16 주요 변경사항

### 1. 🚨 Breaking Changes

#### a) Stylistic 규칙 제거
- **v15**: 76개 stylistic 규칙 deprecated
- **v16**: 76개 규칙 완전 제거
- **대안**: `@stylistic/stylelint-plugin` 플러그인 사용

#### b) API 변경
```diff
// 백엔드 API 응답 변경 (fix 적용 시)
- lintResult.output  // deprecated
+ lintResult.code    // 수정된 코드
+ lintResult.report  // 포맷팅된 문제 리포트
```

#### c) Node.js 버전
- **최소 요구**: Node.js 18.12.0+
- **프론트엔드**: ✅ Node.js 20+ (만족)

#### d) ESM 마이그레이션
- CommonJS API deprecated
- **프론트엔드**: ✅ 이미 ESM 사용 (영향 없음)

---

## 🔧 프론트엔드 영향 분석

### 1. 규칙 메타데이터 (src/constants/ruleMetadata.ts)

현재 **82개 규칙**이 정의되어 있으며, 다음과 같이 분류됩니다:

#### ✅ Core Stylelint v16 규칙 (66개)
프리픽스 없이 사용 가능한 규칙들:

**코드 품질 (6개)**
- `declaration-no-important`
- `declaration-property-value-no-unknown`
- `no-descending-specificity`
- `no-duplicate-selectors`
- `no-empty-source`
- `no-invalid-double-slash-comments`

**색상 (4개)**
- `color-named`
- `color-no-hex`
- `color-no-invalid-hex`
- `alpha-value-notation`
- `color-function-notation`

**폰트 (4개)**
- `font-family-name-quotes`
- `font-family-no-duplicate-names`
- `font-family-no-missing-generic-family-keyword`
- `font-weight-notation`

**선택자 (9개)**
- `selector-max-id`
- `selector-max-type`
- `selector-max-universal`
- `selector-max-specificity`
- `selector-no-qualifying-type`
- `selector-no-vendor-prefix`
- `selector-pseudo-class-no-unknown`
- `selector-pseudo-element-no-unknown`
- `selector-type-no-unknown`

**속성 (6개)**
- `property-no-unknown`
- `property-no-vendor-prefix`
- `declaration-block-no-duplicate-properties`
- `declaration-block-no-redundant-longhand-properties`
- `declaration-block-no-shorthand-property-overrides`
- `shorthand-property-no-redundant-values`

**값 (3개)**
- `value-no-vendor-prefix`
- `value-keyword-case`
- `custom-property-no-missing-var-function`

**단위 (4개)**
- `length-zero-no-unit`
- `number-max-precision`
- `unit-no-unknown`
- `hue-degree-notation`

**네이밍 (4개)**
- `selector-class-pattern`
- `selector-id-pattern`
- `keyframes-name-pattern`
- `custom-property-pattern`

**속성 정렬 (3개)** - 플러그인 필요
- `order/properties-order`
- `order/properties-alphabetical-order`
- `declaration-block-single-line-max-declarations`

#### 🔄 @stylistic/stylelint-plugin 규칙 (16개)

현재 `stylistic/` 프리픽스를 사용하는 규칙들:

**색상 스타일 (1개)**
- `stylistic/color-hex-case` → `@stylistic/color-hex-case`

**간격 (4개)**
- `stylistic/indentation` → `@stylistic/indentation`
- `stylistic/max-empty-lines` → `@stylistic/max-empty-lines`
- `stylistic/no-eol-whitespace` → `@stylistic/no-eol-whitespace`
- `stylistic/no-missing-end-of-source-newline` → `@stylistic/no-missing-end-of-source-newline`

**선택자 (1개)**
- `stylistic/selector-list-comma-newline-after` → `@stylistic/selector-list-comma-newline-after`

**포맷팅 (10개)**
- `stylistic/string-quotes` → `@stylistic/string-quotes`
- `stylistic/declaration-block-trailing-semicolon` → `@stylistic/declaration-block-trailing-semicolon`
- `stylistic/no-extra-semicolons` → `@stylistic/no-extra-semicolons`
- `stylistic/block-opening-brace-space-before` → `@stylistic/block-opening-brace-space-before`
- `stylistic/block-closing-brace-newline-after` → `@stylistic/block-closing-brace-newline-after`
- `stylistic/declaration-colon-space-after` → `@stylistic/declaration-colon-space-after`
- `stylistic/declaration-colon-space-before` → `@stylistic/declaration-colon-space-before`
- `stylistic/function-comma-space-after` → `@stylistic/function-comma-space-after`
- `stylistic/number-leading-zero` → `@stylistic/number-leading-zero`
- `stylistic/number-no-trailing-zeros` → `@stylistic/number-no-trailing-zeros`

#### ⚠️ 특별 케이스

**`stylistic/color-hex-length` (src/constants/ruleMetadata.ts:240)**
```typescript
{
  key: 'stylistic/color-hex-length',  // ❌ 잘못된 프리픽스
  label: 'HEX 색상 길이',
  description: 'HEX 색상 코드의 길이 (3자리/6자리)',
  category: 'color',
  editable: true,
  options: [
    { value: 'short', label: '짧게 (#fff)' },
    { value: 'long', label: '길게 (#ffffff)' },
  ],
},
```

**문제점**: `color-hex-length`는 stylelint v16의 **core 규칙**이므로 프리픽스가 필요 없습니다.

**수정 필요**:
```diff
- key: 'stylistic/color-hex-length',
+ key: 'color-hex-length',
```

---

## 🎯 필요한 변경사항

### 1. 규칙 프리픽스 수정

#### ❌ 현재 (백엔드가 v16을 사용하면 작동 안 함)
```json
{
  "stylistic/indentation": 2,
  "stylistic/color-hex-case": "lower",
  "stylistic/color-hex-length": "short"
}
```

#### ✅ 변경 후 (백엔드 v16 호환)
```json
{
  "@stylistic/indentation": 2,
  "@stylistic/color-hex-case": "lower",
  "color-hex-length": "short"
}
```

### 2. 코드 수정 위치

#### a) `src/constants/ruleMetadata.ts`

**수정 1: `color-hex-length` 프리픽스 제거**
```diff
  {
-   key: 'stylistic/color-hex-length',
+   key: 'color-hex-length',
    label: 'HEX 색상 길이',
    description: 'HEX 색상 코드의 길이 (3자리/6자리)',
    category: 'color',
```

**수정 2: Stylistic 규칙 프리픽스 변경 (16개 규칙)**
```diff
  {
-   key: 'stylistic/color-hex-case',
+   key: '@stylistic/color-hex-case',
    label: 'HEX 색상 대소문자',
```

```diff
  {
-   key: 'stylistic/indentation',
+   key: '@stylistic/indentation',
    label: '들여쓰기',
```

> **참고**: 총 16개 규칙의 프리픽스를 `stylistic/` → `@stylistic/`로 변경해야 합니다.

#### b) API 응답 처리 (향후 대비)

현재 백엔드 응답에서 `output` 필드를 사용하지만, v16에서 deprecated되었습니다.

**src/types/lint.ts:67**
```typescript
export interface LintResult {
  warnings: Warning[];
  info: LintInfo;
  output: string;  // ⚠️ v16에서 deprecated
  hasSyntaxError?: boolean;
}
```

**권장 사항**:
1. 백엔드가 `output`을 계속 제공하는 동안 변경 불필요
2. 백엔드가 v16 마이그레이션 완료 후 `code` 필드 추가 시:
   ```diff
   export interface LintResult {
     warnings: Warning[];
     info: LintInfo;
   - output: string;
   + code?: string;     // v16: 수정된 코드
   + report?: string;   // v16: 포맷팅된 리포트
     hasSyntaxError?: boolean;
   }
   ```

---

## ✅ 검증 체크리스트

### 규칙 호환성
- [x] Core stylelint v16 규칙 목록 확인
- [x] @stylistic/stylelint-plugin 규칙 목록 확인
- [x] 현재 규칙 메타데이터 분석
- [ ] 프리픽스 변경 적용
- [ ] 백엔드 API 테스트

### 기능 테스트
- [ ] 린팅 기능 정상 작동 확인
- [ ] 규칙 활성화/비활성화 테스트
- [ ] 프리셋 저장/불러오기 테스트
- [ ] 설정 가져오기/내보내기 테스트
- [ ] 에러 핸들링 검증

### 문서 업데이트
- [ ] README.md 업데이트 (필요 시)
- [ ] 주석 업데이트 (필요 시)
- [ ] 마이그레이션 가이드 작성

---

## 🚀 마이그레이션 실행 계획

### Phase 1: 준비 (백엔드 마이그레이션 전)
1. ✅ 현재 상태 분석
2. ✅ 영향 범위 파악
3. ✅ 마이그레이션 계획 수립

### Phase 2: 코드 수정 (백엔드 마이그레이션 완료 후)
1. `src/constants/ruleMetadata.ts` 수정
   - `color-hex-length` 프리픽스 제거
   - 16개 stylistic 규칙 프리픽스 변경
2. 타입 정의 업데이트 (필요 시)
3. 테스트 코드 업데이트 (필요 시)

### Phase 3: 검증
1. 로컬 환경에서 백엔드 API 연동 테스트
2. 모든 린팅 기능 검증
3. 엣지 케이스 테스트

### Phase 4: 배포
1. 변경사항 커밋
2. PR 생성 및 리뷰
3. 프로덕션 배포
4. 모니터링

---

## 📌 주의사항

### 1. 백엔드 API와의 동기화
- **중요**: 백엔드가 v16 마이그레이션을 완료한 후 프론트엔드 변경사항을 적용해야 합니다
- 백엔드가 `@stylistic/stylelint-plugin`을 사용하도록 설정되어야 합니다
- 규칙 이름이 백엔드와 정확히 일치해야 합니다

### 2. 하위 호환성
- 백엔드가 v15와 v16을 동시에 지원하는 경우, 프론트엔드도 양쪽 프리픽스를 지원해야 할 수 있습니다
- 점진적 마이그레이션 전략 검토 필요

### 3. 사용자 데이터
- 기존 사용자의 저장된 프리셋(localStorage)은 영향을 받지 않습니다
- 사용자가 새로 설정을 저장하면 새로운 프리픽스가 적용됩니다

---

## 📚 참고 자료

### 공식 문서
- [Stylelint 16 Migration Guide](https://stylelint.io/migration-guide/to-16/)
- [Stylelint 15 Migration Guide](https://stylelint.io/migration-guide/to-15/)
- [@stylistic/stylelint-plugin on npm](https://www.npmjs.com/package/@stylistic/stylelint-plugin)
- [stylelint-stylistic GitHub](https://github.com/stylelint-stylistic/stylelint-stylistic)
- [Stylelint Rules Documentation](https://stylelint.io/user-guide/rules/)

### 백엔드 관련
- [mongmung_csslint_server repository](https://github.com/bearholmes/mongmung_csslint_server)
- 백엔드 마이그레이션 계획 문서 참조

---

## 🤝 다음 단계

1. **백엔드 팀과 협의**
   - 백엔드 v16 마이그레이션 일정 확인
   - API 응답 변경사항 확인 (`output` vs `code`)
   - 규칙 프리픽스 매핑 검증

2. **코드 수정 준비**
   - 백엔드 마이그레이션 완료 대기
   - 테스트 환경에서 우선 검증

3. **배포 전략**
   - 백엔드와 프론트엔드 동시 배포 검토
   - 롤백 계획 수립

---

**문서 작성자**: Claude Code
**검토 일자**: 2025-12-04
**상태**: ✅ 검토 완료, 백엔드 마이그레이션 대기 중
