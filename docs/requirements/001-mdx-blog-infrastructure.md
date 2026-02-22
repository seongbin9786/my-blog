# MDX 블로그 인프라 구현 보고서

## 기술 스택

| 기술               | 버전   | 용도                                                   |
| ------------------ | ------ | ------------------------------------------------------ |
| Next.js            | 16.1.6 | App Router + SSG (`output: 'export'`)                  |
| @next/mdx          | 16.1.6 | 빌드타임 MDX 파일 인식 (pageExtensions)                |
| @mdx-js/mdx        | 3.1.1  | `evaluate()`로 MDX 문자열 → React 컴포넌트 런타임 변환 |
| gray-matter        | 4.0.3  | MDX 파일의 frontmatter(YAML) 파싱                      |
| reading-time       | 1.5.0  | 본문 기반 읽기 시간 추정                               |
| rehype-pretty-code | 0.14.1 | shiki 기반 코드 블록 구문 강조                         |
| rss                | 1.2.2  | RSS XML 피드 생성                                      |

---

## 디렉토리 구조

```
content/
└── posts/                    # MDX 포스트 파일 (src 외부)
    └── hello-world.mdx

app/
├── layout.tsx                # 루트 레이아웃 (SEO 메타데이터, Header)
├── page.tsx                  # 홈 - 최신 포스트 5개
├── about/page.tsx            # 소개 페이지
├── posts/
│   ├── page.tsx              # 포스트 리스트
│   └── [slug]/page.tsx       # 포스트 상세 (MDX 렌더링)
├── tags/
│   ├── page.tsx              # 태그 목록
│   └── [tag]/page.tsx        # 태그별 포스트 필터링
├── feed.xml/route.ts         # RSS 피드
└── sitemap.ts                # 사이트맵

components/
└── Header/index.tsx          # 네비게이션 헤더

lib/
├── types.ts                  # Post, PostFrontmatter 타입
├── posts.ts                  # 콘텐츠 파싱 유틸리티
└── constants.ts              # SITE_URL, SITE_NAME 등
```

---

## 기능 스펙 및 구현 방법

### 1. MDX 콘텐츠 파이프라인

**스펙**: `content/posts/` 디렉토리의 `.mdx` 파일을 빌드타임에 파싱하여 정적 페이지로 생성한다.

**구현**:

- `@next/mdx`로 Next.js가 `.mdx` 확장자를 인식하도록 설정 (`next.config.ts`)
- `gray-matter`로 frontmatter와 본문을 분리
- 상세 페이지에서 `@mdx-js/mdx`의 `evaluate()`로 MDX 문자열을 React 컴포넌트로 변환
- `rehype-pretty-code`를 `evaluate()` 호출 시 rehype 플러그인으로 전달하여 코드 하이라이팅 적용

**frontmatter 스키마**:

```yaml
title: string # 포스트 제목
date: string # 작성일 (YYYY-MM-DD)
description: string # 요약 설명
tags: string[] # 태그 목록
slug?: string # URL slug (미지정 시 파일명 사용)
```

### 2. 콘텐츠 파싱 유틸리티 (`lib/posts.ts`)

**스펙**: 포스트 조회, 태그 필터링 등 데이터 접근 함수를 제공한다.

**함수 목록**:
| 함수 | 반환 | 설명 |
|------|------|------|
| `getAllPosts()` | `Post[]` | 모든 포스트 (날짜 역순) |
| `getPostBySlug(slug)` | `Post \| undefined` | slug로 단일 포스트 조회 |
| `getAllTags()` | `string[]` | 중복 제거된 태그 목록 |
| `getPostsByTag(tag)` | `Post[]` | 태그별 포스트 필터링 |

**slug 규칙**: frontmatter의 `slug` 필드 우선, 미지정 시 파일명에서 `.mdx` 제거하여 사용.

### 3. 페이지 구성

**홈 (`/`)**

- `getAllPosts().slice(0, 5)`로 최신 5개 포스트 표시
- 전체 포스트 페이지 링크

**포스트 리스트 (`/posts`)**

- 모든 포스트를 날짜 역순으로 표시
- 제목, 날짜, 설명, 태그, 읽기 시간

**포스트 상세 (`/posts/[slug]`)**

- `generateStaticParams`로 모든 slug에 대해 정적 페이지 사전 생성
- `generateMetadata`로 포스트별 SEO 메타데이터
- `evaluate()`로 MDX → React 컴포넌트 변환 후 렌더링
- `prose` 클래스로 MDX 콘텐츠 타이포그래피 스타일링

**태그 목록 (`/tags`)** / **태그별 (`/tags/[tag]`)**

- 모든 태그 나열, 클릭 시 해당 태그 포스트만 필터링
- `generateStaticParams`로 정적 생성

**About (`/about`)**

- 간단한 소개 텍스트 (하드코딩)

### 4. SEO

**스펙**: Open Graph, Twitter Card, 메타데이터 템플릿을 적용한다.

**구현**:

- `layout.tsx`에 `metadataBase`, `openGraph`, `twitter` 설정
- `title`을 `{ default, template }` 패턴으로 구성 → 하위 페이지에서 `| My Blog` 자동 추가
- 각 동적 페이지에서 `generateMetadata`로 개별 메타데이터 생성
- `alternates`에 RSS 피드 URL 추가

### 5. RSS 피드 (`/feed.xml`)

**스펙**: 모든 포스트를 포함하는 RSS 2.0 XML 피드를 정적으로 생성한다.

**구현**:

- `app/feed.xml/route.ts`에 Route Handler로 구현
- `rss` 패키지로 XML 생성
- `dynamic = 'force-static'`으로 SSG 호환
- `Content-Type: application/xml` 응답

### 6. Sitemap (`/sitemap.xml`)

**스펙**: 홈, 포스트, 태그, About 페이지의 URL을 포함하는 사이트맵을 생성한다.

**구현**:

- Next.js 내장 `MetadataRoute.Sitemap` 타입 활용
- `dynamic = 'force-static'`으로 SSG 호환
- 각 경로에 `changeFrequency`, `priority` 설정

### 7. 네비게이션 (`Header`)

**스펙**: 모든 페이지에 공통 네비게이션을 제공한다.

**구현**:

- `components/Header/index.tsx`에 `NAV_LINKS` 상수 기반 nav 렌더링
- 홈, 포스트, 태그, 소개 링크
- `layout.tsx`에서 `<Header />` 삽입

---

## SSG 빌드 결과

```
Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /about
├ ○ /feed.xml
├ ○ /posts
├ ● /posts/[slug]
│ └ /posts/hello-world
├ ○ /sitemap.xml
├ ○ /tags
└ ● /tags/[tag]
  ├ /tags/blog
  └ /tags/intro

○  Static     ●  SSG (generateStaticParams)
```

총 12개 정적 페이지 생성 완료.
