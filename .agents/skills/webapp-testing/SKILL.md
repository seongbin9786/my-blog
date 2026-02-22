---
name: webapp-testing
description: 웹 애플리케이션 테스팅 전략 및 패턴
triggers:
  - test
  - testing
  - unit-test
  - integration-test
  - e2e
  - vitest
argument-hint: '[test-type]'
---

# Web Application Testing

## 목적

효과적인 웹 애플리케이션 테스팅으로 버그 감소 및 코드 품질 향상

## 활성화 시점

- 테스트 작성 및 구조화
- 테스팅 전략 수립
- CI/CD 파이프라인 구축

## 테스팅 피라미드

```
      E2E 테스트 (5%)
    통합 테스트 (15%)
  단위 테스트 (80%)
```

## 단위 테스트 (Unit Test)

### React 컴포넌트 테스트

```typescript
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/Button";

describe("Button", () => {
  it("클릭 시 콜백 함수 호출", () => {
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>클릭</Button>);
    screen.getByRole("button").click();

    expect(handleClick).toHaveBeenCalled();
  });

  it("disabled 상태에서 클릭 불가", () => {
    const handleClick = vi.fn();

    render(<Button disabled onClick={handleClick}>클릭</Button>);
    screen.getByRole("button").click();

    expect(handleClick).not.toHaveBeenCalled();
  });
});
```

### 유틸리티 함수 테스트

```typescript
describe('formatDate', () => {
  it('날짜를 올바른 형식으로 변환', () => {
    const result = formatDate(new Date('2026-02-22'));
    expect(result).toBe('2026년 2월 22일');
  });

  it('null 입력 처리', () => {
    expect(formatDate(null)).toBeNull();
  });
});
```

## 통합 테스트 (Integration Test)

### API 모킹

```typescript
import { http, HttpResponse, server } from "@/test/mocks";

describe("UserProfile", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("사용자 정보 로드 및 표시", async () => {
    server.use(
      http.get("/api/users/1", () =>
        HttpResponse.json({ id: 1, name: "John" })
      )
    );

    render(<UserProfile userId={1} />);

    const name = await screen.findByText("John");
    expect(name).toBeInTheDocument();
  });
});
```

## E2E 테스트 (End-to-End)

### Playwright 예제

```typescript
import { expect, test } from '@playwright/test';

test('사용자가 상품을 장바구니에 추가할 수 있다', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // 상품 선택
  await page.getByRole('link', { name: '상품1' }).click();

  // 장바구니 추가 버튼 클릭
  await page.getByRole('button', { name: '장바구니 추가' }).click();

  // 확인
  await expect(page.getByText('장바구니에 추가됨')).toBeVisible();
});
```

## 테스팅 베스트 프랙티스

### 1. 테스트 명명

```typescript
// ❌ 불명확
it('works', () => {});

// ✅ 명확
it('버튼 클릭 시 모달이 열린다', () => {});
```

### 2. AAA 패턴 (Arrange-Act-Assert)

```typescript
it('상품 가격 계산', () => {
  // Arrange: 테스트 데이터 준비
  const product = { price: 10000, quantity: 2 };

  // Act: 기능 실행
  const total = calculateTotal(product);

  // Assert: 결과 검증
  expect(total).toBe(20000);
});
```

### 3. 사용자 관점 테스트

```typescript
// ❌ 구현 세부사항에 의존
expect(component.state.isOpen).toBe(true);

// ✅ 사용자가 보는 결과
expect(screen.getByRole('dialog')).toBeVisible();
```

## 테스트 커버리지

- **명령문(Statement)**: 80% 이상
- **분기(Branch)**: 70% 이상
- **함수(Function)**: 80% 이상
- **라인(Line)**: 80% 이상

## 주의사항

- 과도한 테스트 금지 (ROI 고려)
- 테스트도 코드 - 유지보수성 중요
- 플레이키(flaky) 테스트 제거
- CI/CD에서 테스트 반드시 실행

## 도구

- **단위 테스트**: Vitest, Jest
- **UI 테스트**: Testing Library, Vitest
- **E2E 테스트**: Playwright, Cypress
- **성능 테스트**: Lighthouse, Web Vitals
