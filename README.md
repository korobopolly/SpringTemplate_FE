# SpringTemplate_FE

`SpringTemplate_BE`와 짝을 이루는 게시판 프런트엔드입니다. Vite + React 19 + React Router v7 기반의 SPA이며, 백엔드의 `/api/posts` REST API를 소비해 글 목록·상세·작성·수정·삭제 화면을 제공합니다.

## 기술 스택

| 구분 | 사용 기술 |
| --- | --- |
| Framework | React 19 |
| Build Tool | Vite 8 |
| Routing | react-router-dom 7 |
| Lint | ESLint 9 (flat config) |
| Package Manager | npm |

## 프로젝트 구조

```
SpringTemplate_FE
├── index.html
├── vite.config.js          # dev 서버 포트 3000, /api → :8080 프록시
├── eslint.config.js
├── public/
└── src
    ├── main.jsx            # 엔트리
    ├── App.jsx             # BrowserRouter + 라우트 정의
    ├── index.css
    ├── api
    │   └── postApi.js      # fetch 래퍼 (CRUD)
    └── pages
        ├── PostList.jsx    # 목록 + 페이지네이션
        ├── PostDetail.jsx  # 단건 조회
        └── PostForm.jsx    # 생성/수정 공용 폼
```

## 라우트

| Path | 컴포넌트 | 설명 |
| --- | --- | --- |
| `/` | `PostList` | 게시글 목록 |
| `/posts/new` | `PostForm` | 새 글 작성 |
| `/posts/:id` | `PostDetail` | 단건 상세 |
| `/posts/:id/edit` | `PostForm` | 수정 |

`PostForm`은 URL에 `id`가 있으면 수정, 없으면 생성 모드로 동작하는 공용 화면입니다.

## 백엔드 연동

Vite dev 서버에서 `/api` 요청을 `http://localhost:8080`으로 프록시합니다 (`vite.config.js`).

```js
server: {
  port: 3000,
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
    },
  },
}
```

따라서 프런트엔드 코드에서는 별도 host 설정 없이 `/api/posts` 형태로 호출하면 되며, CORS 설정도 불필요합니다. API 호출은 `src/api/postApi.js`에 일원화되어 있습니다.

소비하는 API는 다음과 같습니다 (자세한 명세는 `SpringTemplate_BE/README.md` 참고).

| Method | Path | 용도 |
| --- | --- | --- |
| `GET` | `/api/posts?page&size` | 목록 |
| `GET` | `/api/posts/{id}` | 단건 |
| `POST` | `/api/posts` | 생성 |
| `PUT` | `/api/posts/{id}` | 수정 |
| `DELETE` | `/api/posts/{id}` | 삭제 |

## 실행 방법

### 1. 사전 요구사항
- Node.js 20+ (Vite 8 요구사항)
- 백엔드 `SpringTemplate_BE`가 `8080` 포트에서 실행 중이어야 API 호출이 성공합니다.

### 2. 설치

```bash
npm install
```

### 3. 개발 서버

```bash
npm run dev
```

브라우저에서 `http://localhost:3000` 접속.

### 4. 프로덕션 빌드

```bash
npm run build     # 결과: dist/
npm run preview   # 빌드 결과 로컬 확인
```

### 5. Lint

```bash
npm run lint
```

## 개발 메모

- **상태 관리**: 외부 라이브러리 없이 React 기본 훅(`useState`/`useEffect`)만 사용합니다.
- **에러/로딩 UX**: 각 페이지 컴포넌트 내부에서 로딩·에러 상태를 직접 관리합니다. 공통 훅으로 분리하는 것은 추후 개선 여지.
- **스타일**: `src/index.css` 전역 스타일만 사용. 컴포넌트별 CSS 모듈이나 Tailwind는 도입되어 있지 않습니다.
- **TypeScript 미사용**: 현재는 `.jsx` 기반. 타입 안정성이 필요해지면 Vite의 React-TS 템플릿으로 마이그레이션 가능합니다.
