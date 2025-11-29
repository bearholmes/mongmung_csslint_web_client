# 🎨 Mongmung CSS Lint Web Client

> React 19와 TypeScript로 구축된 현대적이고 기능이 풍부한 CSS 린팅 웹 애플리케이션

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Version](https://img.shields.io/badge/version-4.0.0-blue)](package.json)

## ✨ 주요 기능

### 🔍 고급 린트 검사
- **80개 이상의 CSS 린트 규칙** - 11개 카테고리(색상, 폰트, 타이포그래피, 박스 모델 등)
- **CSS**와 **HTML+CSS** 코드 분석 지원
- 실시간 문법 오류 감지
- 시각적 경고 하이라이트 및 상세 오류 메시지

### ⚙️ 사용자 정의 설정
- **규칙 편집 패널** - 검색 및 카테고리 필터링
- 개별 규칙 활성화/비활성화 및 심각도 레벨 설정
- 고급 규칙 설정(문자열, 배열, 열거형 값)
- **프리셋 관리** - 사용자 정의 규칙 설정 저장/불러오기/삭제 (최대 50개)
- **가져오기/내보내기** - JSON 파일 또는 클립보드를 통한 설정 공유

### 🎯 사용자 경험
- **Monaco Editor** 통합 코드 편집기
- 포맷팅 전후 코드를 보여주는 실시간 diff 뷰
- 부드러운 성능을 위한 검색 디바운싱
- ARIA 레이블 및 시맨틱 HTML을 사용한 접근성 향상
- 모든 화면 크기에 대응하는 반응형 디자인

### 🚀 성능 및 품질
- **React 19** - 동시성 렌더링 기능
- **Jotai** - localStorage 영속성을 갖춘 아토믹 상태 관리
- **TypeScript** - 엄격 모드로 타입 안전성 보장
- **Vitest + React Testing Library** - 90% 이상 테스트 커버리지
- 최적화된 번들 크기 (메인 JS 15.46 KB gzipped)

## 🛠️ 기술 스택

### 핵심
- **React 19.2** - 동시성 기능을 갖춘 최신 React
- **TypeScript 5.7** - 타입 안전 개발
- **Vite 6.0** - 초고속 빌드 도구

### 상태 관리
- **Jotai 2.10** - 아토믹 상태 관리
- **localStorage** - 영속적인 설정 저장

### UI & 스타일링
- **CSS Modules** - 스코프가 지정된 컴포넌트 스타일링
- **Monaco Editor** - VS Code 기반 코드 에디터
- **React-Diff-Viewer** - 좌우 비교 diff 시각화

### 코드 품질
- **Vitest 2.1** - 단위 테스트 프레임워크
- **React Testing Library 16.1** - 컴포넌트 테스팅
- **Biome** - 빠른 린터 및 포맷터
- **ESLint + TypeScript ESLint** - 정적 분석

### DevOps
- **Docker** - 컨테이너화
- **Nginx** - 프로덕션 웹 서버

## 📦 설치

### 필수 요구사항
- Node.js 20+
- npm 9+

### 의존성 설치

```bash
npm install
```

## 🚀 빠른 시작

### 개발 서버 실행

```bash
npm run dev
```

[http://localhost:5173](http://localhost:5173)에서 앱을 확인할 수 있습니다.

### 프로덕션 빌드

```bash
npm run build
```

### 프로덕션 빌드 미리보기

```bash
npm run preview
```

### 테스트 실행

```bash
# 모든 테스트 실행
npm test

# 감시 모드로 테스트 실행
npm run test:watch

# 커버리지와 함께 테스트 실행
npm run test:coverage
```

### 코드 품질

```bash
# 코드 린트
npm run lint

# 린트 문제 자동 수정
npm run lint:fix

# 코드 포맷팅
npm run format
```

## 🐳 Docker 배포

### Docker Compose로 빌드 및 실행

```bash
docker-compose up --build
```

애플리케이션은 [http://localhost:5001](http://localhost:5001)에서 사용할 수 있습니다.

### 수동 Docker 빌드

```bash
# 이미지 빌드
docker build -t mongmung-csslint-fe .

# 컨테이너 실행
docker run -p 5001:80 mongmung-csslint-fe
```

## 📂 프로젝트 구조

```
mongmung-csslint-fe/
├── src/
│   ├── atoms/              # Jotai 상태 atoms
│   │   └── lintAtom.ts     # 린트 설정, 프리셋, 상태
│   ├── components/         # React 컴포넌트
│   │   ├── CodeEditor/     # Monaco 에디터 래퍼
│   │   ├── UI/             # UI 컴포넌트
│   │   │   ├── PresetManager.tsx       # 프리셋 CRUD 작업
│   │   │   ├── ConfigImportExport.tsx  # JSON 가져오기/내보내기
│   │   │   ├── RulesPanel.tsx          # 규칙 설정 패널
│   │   │   └── __tests__/              # 컴포넌트 테스트
│   │   └── Layout/         # 레이아웃 컴포넌트
│   ├── constants/          # 앱 상수 및 규칙 정의
│   ├── hooks/              # 커스텀 React 훅
│   │   ├── useLint.ts      # 린트 API 통합
│   │   └── useSyntax.ts    # 문법 선택
│   ├── types/              # TypeScript 타입 정의
│   ├── utils/              # 유틸리티 함수
│   ├── test/               # 테스트 유틸리티 및 설정
│   ├── App.tsx             # 루트 컴포넌트
│   └── main.tsx            # 앱 진입점
├── public/                 # 정적 에셋
├── docker-compose.yml      # Docker Compose 설정
├── dockerfile              # Docker 빌드 설정
├── nginx.conf              # Nginx 서버 설정
├── vite.config.ts          # Vite 설정
├── tsconfig.json           # TypeScript 설정
├── biome.json              # Biome 린터/포맷터 설정
└── package.json            # 의존성 및 스크립트
```

## 🎯 사용 가이드

### 1. CSS 코드 작성 또는 붙여넣기

Monaco Editor를 사용하여 CSS 코드를 작성하거나 기존 코드를 붙여넣습니다.

### 2. 문법 타입 선택

다음 중 하나를 선택하세요:
- **CSS** - 순수 CSS 코드
- **HTML** - CSS가 포함된 HTML

### 3. 린트 규칙 설정

- 카테고리별로 규칙 탐색(색상, 폰트, 박스 모델 등)
- 규칙 활성화/비활성화
- 규칙 심각도 및 옵션 설정
- 특정 규칙 검색

### 4. 프리셋 저장

즐겨 사용하는 규칙 설정을 저장하세요:
- 프리셋 관리자에서 "저장" 클릭
- 프리셋 이름 지정
- 언제든지 프리셋을 불러와서 설정 복원

### 5. 린트 검사 실행

린트 버튼을 클릭하여 코드를 분석하고 다음을 확인하세요:
- 경고 및 오류
- 라인 번호 및 심각도
- 전후 비교 diff 뷰

### 6. 설정 내보내기/가져오기

설정을 공유하세요:
- JSON 파일로 내보내기
- 클립보드에 복사
- JSON 파일 또는 클립보드에서 가져오기

## 🧪 테스팅

이 프로젝트는 포괄적인 단위 및 통합 테스트를 포함합니다:

```bash
# 모든 테스트 실행
npm test

# 특정 테스트 파일 실행
npm test PresetManager.test.tsx

# 커버리지와 함께 실행
npm run test:coverage
```

### 테스트 커버리지

- **컴포넌트**: 90% 이상 커버리지
- **훅**: 85% 이상 커버리지
- **유틸리티**: 95% 이상 커버리지

## 🔧 설정

### 백엔드 API 서버

이 프론트엔드는 백엔드 API 서버가 실행 중이어야 합니다.

**백엔드 저장소**: [mongmung_csslint_server](https://github.com/bearholmes/mongmung_csslint_server)

**기본 API URL**: `http://localhost:5002`

### 환경 변수

루트 디렉토리에 `.env` 파일을 생성하세요:

```env
VITE_API_URL=http://localhost:5002
```

### 빌드 옵션

`vite.config.ts`에서 빌드 설정을 조정하세요:

```typescript
export default defineConfig({
  build: {
    target: 'esnext',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'jotai'],
        },
      },
    },
  },
});
```

## 🤝 기여하기

기여를 환영합니다! 다음 단계를 따라주세요:

1. 저장소 포크
2. 기능 브랜치 생성 (`git checkout -b feature/amazing-feature`)
3. 변경사항 커밋 (`git commit -m 'Add amazing feature'`)
4. 브랜치에 푸시 (`git push origin feature/amazing-feature`)
5. Pull Request 열기

### 코드 스타일

- 기존 코드 스타일 따르기
- 커밋 전 `npm run lint:fix` 실행
- 새 기능에 대한 테스트 작성
- 필요에 따라 문서 업데이트

## 📄 라이센스

이 프로젝트는 MIT 라이센스에 따라 배포됩니다 - 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 🙏 감사의 말

- [React](https://react.dev/)로 구축
- [stylelint](https://stylelint.io/)로 구동
- 현대적인 코드 품질 도구에서 영감을 받음

## 🔗 관련 프로젝트

- **백엔드**: [mongmung_csslint_server](https://github.com/bearholmes/mongmung_csslint_server) - Elysia 백엔드 API

---

**Mongmung 팀이 ❤️를 담아 만들었습니다**
