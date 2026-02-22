## 언어 및 주석

- 모든 응답은 한국어로 작성한다.
- 주석은 "합니다" 등을 붙이지 않고 간결한 개조식으로 작성한다.
- 변수명, 함수명은 영어로 작성하되 의미가 명확해야 한다.
- 기능에 대한 단순 설명식 주석은 지양한다.
- 의도를 설명하거나, 기술적인 설명을 하는 주석은 `// NOTE: `로 시작한다.

## 스타일링

- className을 여러 개 처리할 때는 `cn`을 사용하며, template string은 사용하지 않는다.
- 컴포넌트 외부에서 className을 주입하는 경우 반드시 `cn`으로 병합하고, 외부 className으로 덮어쓰지 않아야 한다.

## 의존성 관리

- npm, yarn은 사용을 금지하고, pnpm을 사용한다.

## 네이밍 컨벤션

- 컴포넌트명: PascalCase (예: `TeamCreatePage`)
- 함수명: camelCase (예: `handleSubmit`)
- 상수명: UPPER_SNAKE_CASE (예: `API_BASE_URL`)
- 파일명: 컴포넌트는 PascalCase, 그 외는 kebab-case

## 코드 구성

- 컴포넌트 내부 순서: 타입 정의 → 훅 사용 → 상태 기반 파생 상태 상수 → 이벤트 핸들러 → 렌더링
- `export default`, `function` 기반 컴포넌트는 사용하지 않으며 `const`로 정의한다.
- 단, Next.js 특수 파일(`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx` 등)은 프레임워크 요구사항에 따라 `export default` 예외를 허용한다.

## import 규칙

- import는 형제/자식인 경우 상대 경로를, 아닌 경우 절대 경로를 사용한다.
- Barrel Export 시에는 개별 export가 아닌 `export * from` 형식을 따른다.
- 컴포넌트, 객체 등을 export할 때는 Barrel Export를 한다.
- Barrel export는 2중 이상 하지 않는다 (컴포넌트 작성 시 폴더로 작성하고, 거기서 index로 export할 뿐임).

## React 컴포넌트 작성 규칙

- `React.FC`는 절대 사용하지 않는다.
- 컴포넌트는 `const`로 작성하며, export되는 컴포넌트가 제일 위로 오고, 하위 컴포넌트나 코드는 export되는 코드를 읽을 때 등장하는 순서대로 아래에 배치한다.
