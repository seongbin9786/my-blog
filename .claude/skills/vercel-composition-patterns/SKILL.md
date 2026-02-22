---
name: vercel-composition-patterns
description: Next.js 애플리케이션을 위한 Vercel 권장 컴포지션 패턴
triggers:
  - composition
  - component
  - pattern
  - vercel-pattern
  - client-server
argument-hint: '[component-type]'
---

# Vercel Composition Patterns

## 목적

Vercel/Next.js 생태계에서 권장하는 컴포넌트 구성 패턴으로 최적의 성능 달성

## 활성화 시점

- 컴포넌트 구조 설계
- 서버/클라이언트 컴포넌트 분리 필요
- 데이터 페칭 패턴 결정

## 핵심 패턴

### 1. Server/Client 컴포넌트 분리

```typescript
// ServerWrapper.tsx - 서버에서 데이터 페칭
export const ServerWrapper = async () => {
  const data = await fetchData();

  return (
    <ClientChild
      data={data}
      onAction={handleServerAction}
    />
  );
};

// ClientChild.tsx - 클라이언트 상호작용
"use client";

export const ClientChild = ({ data, onAction }) => {
  const [state, setState] = useState(null);

  return (
    <div onClick={() => onAction(state)}>
      {/* 클라이언트 로직 */}
    </div>
  );
};
```

### 2. 렌더링 최적화

- 무거운 로직: 서버 컴포넌트
- 상호작용: 클라이언트 컴포넌트
- 공유 상태: 최상위 부모에서 관리

### 3. 데이터 흐름

```
Server Component (데이터 페칭)
  ↓
Props로 데이터 전달
  ↓
Client Component (상호작용)
```

## 주의사항

- 클라이언트 컴포넌트 남용 금지 (번들 크기 증가)
- 서버 액션으로 폼 제출 처리
- 필요할 때만 클라이언트 컴포넌트 사용
