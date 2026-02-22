---
name: next-best-practices
description: Next.js 개발을 위한 Vercel 권장 베스트 프랙티스 및 최적화
triggers:
  - next-best-practices
  - nextjs
  - next
  - best-practice
  - optimization
  - vercel
argument-hint: '[feature-area]'
---

# Next.js Best Practices

## 목적

Next.js 프로젝트에서 성능, 보안, 유지보수성을 최적화하는 공식 권장 방식 적용

## 활성화 시점

- Next.js 프로젝트 개발
- 성능 최적화 필요
- 프로젝트 구조 설계
- 기능 구현

## 핵심 원칙

### 1. 서버/클라이언트 컴포넌트 분리

#### 서버 컴포넌트 (기본값)

```typescript
// app/users/page.tsx
export default async function UsersPage() {
  // 서버에서만 실행
  const users = await db.users.findAll();

  return (
    <div>
      {users.map(user => (
        <ClientUserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

// ClientUserCard.tsx
'use client'; // 명시적 클라이언트 마킹

import { useState } from 'react';

export function ClientUserCard({ user }) {
  const [isExpanded, setIsExpanded] = useState(false);
  // 클라이언트 상호작용 로직
}
```

**장점:**

- 번들 크기 감소
- 보안 (API 키 서버에서만)
- 데이터 페칭 최적화

#### 클라이언트 컴포넌트

```typescript
'use client';

// useState, useEffect, event listeners 필요시만 사용
export function InteractiveComponent() {
  return <button onClick={...}>Click me</button>;
}
```

**원칙:** 클라이언트 컴포넌트 최소화

### 2. 프로젝트 구조

```
app/
├── (auth)/
│   ├── login/
│   │   └── page.tsx
│   └── signup/
│       └── page.tsx
├── (dashboard)/
│   ├── layout.tsx
│   ├── page.tsx
│   └── users/
│       └── page.tsx
├── api/
│   ├── auth/
│   │   └── [...nextauth].ts
│   └── users/
│       └── route.ts
├── components/
│   ├── navigation.tsx
│   └── footer.tsx
├── layout.tsx
└── page.tsx
```

### 3. 데이터 페칭 패턴

#### 서버에서 페칭 (권장)

```typescript
// app/products/page.tsx
async function getProducts() {
  const res = await fetch('https://api.example.com/products', {
    next: { revalidate: 60 } // ISR: 60초마다 재검증
  });

  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();
  return <ProductList products={products} />;
}
```

#### 클라이언트에서 페칭 (필요시)

```typescript
'use client';

import { useEffect, useState } from 'react';

export function ProductSearch() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch('/api/search?q=...')
      .then(r => r.json())
      .then(setResults);
  }, []);

  return <ul>{results.map(...)}</ul>;
}
```

### 4. 라우트 핸들러 (Route Handlers)

```typescript
// app/api/users/route.ts
export async function GET(request: Request) {
  const users = await db.users.findAll();
  return Response.json(users);
}

export async function POST(request: Request) {
  const data = await request.json();
  const user = await db.users.create(data);
  return Response.json(user, { status: 201 });
}
```

### 5. 이미지 최적화

```typescript
import Image from 'next/image';

export function ProductCard({ product }) {
  return (
    <Image
      src={product.image}
      alt={product.name}
      width={300}
      height={300}
      priority={false}
      sizes="(max-width: 640px) 100vw,
             (max-width: 1024px) 50vw,
             33vw"
      quality={75}
    />
  );
}
```

### 6. 폰트 최적화

```typescript
// app/layout.tsx
import { Inter, Garamond } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // FOUT 방지
});

const garamond = Garamond({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
```

## 성능 메트릭

### Core Web Vitals

- **LCP**: 2.5초 이하 (이미지, 폰트 최적화)
- **FID**: 100ms 이하 (JS 최소화)
- **CLS**: 0.1 이하 (레이아웃 안정성)

### 최적화 항목 (19개 주제)

1. **Core Concepts**: App Router, Pages Router
2. **Project Structure**: 파일 구성, 명명 규칙
3. **Server/Client Components**: 분리 전략
4. **use client / use server**: 지시문 활용
5. **Data & APIs**: 페칭 전략
6. **Data Fetching**: fetch, ORM, 캐싱
7. **Data Mutation**: Server Actions, API Routes
8. **Route Handlers**: GET, POST, PUT, DELETE
9. **Async APIs**: fetch, streaming
10. **Next.js 15+ Async**: 새로운 비동기 패턴
11. **Image Optimization**: next/image 활용
12. **Font Optimization**: 폰트 로딩
13. **CSS-in-JS**: Tailwind, Styled Components
14. **SEO**: Meta, Open Graph, Sitemap
15. **Testing**: Unit, Integration, E2E
16. **Deployment**: Vercel, Self-hosted
17. **Security**: CSRF, XSS, SQL Injection 방지
18. **Monitoring**: Analytics, Error tracking
19. **Performance**: Lighthouse, Web Vitals

## 주의사항

- ✅ 서버 컴포넌트를 기본으로 선택
- ✅ 데이터는 가능한 서버에서 페칭
- ✅ `next/image` 및 `next/font` 활용
- ✅ Route Groups으로 구조 조직
- ✅ Error boundary와 Loading 상태 제공

## 참고

- [Next.js Official Docs](https://nextjs.org)
- [Vercel Performance Guide](https://vercel.com/docs)
