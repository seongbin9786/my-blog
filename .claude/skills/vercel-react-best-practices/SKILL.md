---
name: vercel-react-best-practices
description: Vercel 권장 React 베스트 프랙티스 및 최적화 팁
triggers:
  - react
  - best-practice
  - optimization
  - performance
  - vercel
argument-hint: '[optimization-type]'
---

# Vercel React Best Practices

## 목적

Vercel 권장 방식으로 React 애플리케이션의 성능과 유지보수성 향상

## 활성화 시점

- React 컴포넌트 작성
- 성능 최적화 필요
- Next.js 프로젝트 개발

## 핵심 베스트 프랙티스

### 1. 이미지 최적화

```typescript
import Image from "next/image";

// ❌ 피하기
<img src="/image.png" alt="description" />

// ✅ 권장
<Image
  src="/image.png"
  alt="description"
  width={800}
  height={600}
  priority={false}
/>
```

### 2. 동적 임포트

```typescript
import dynamic from "next/dynamic";

// 대용량 컴포넌트 분할 로딩
const HeavyComponent = dynamic(
  () => import("@/components/HeavyComponent"),
  { loading: () => <p>로딩 중...</p> }
);
```

### 3. 메모이제이션

```typescript
import { memo } from "react";

// 필요할 때만 사용
export const MemoizedComponent = memo(({ data }) => (
  <div>{data}</div>
), (prev, next) => prev.data === next.data);
```

### 4. 상태 관리

- 전역 상태: Context API 또는 상태 라이브러리
- 로컬 상태: useState 사용
- 서버 상태: React Query/SWR 활용

### 5. 렌더링 최적화

- 불필요한 리렌더링 방지
- 컴포넌트 분할로 스코프 최소화
- useCallback, useMemo 신중하게 사용

## 성능 메트릭

- **LCP (Largest Contentful Paint)**: 2.5초 이하
- **FID (First Input Delay)**: 100ms 이하
- **CLS (Cumulative Layout Shift)**: 0.1 이하

## 주의사항

- 과도한 최적화 금지
- 측정 후 최적화 (측정 없는 최적화는 악)
- 사용자 경험 우선
