---
name: responsive-design
description: 반응형 디자인 패턴과 모바일 우선 접근 방식
triggers:
  - responsive
  - mobile
  - breakpoint
  - media-query
  - responsive-design
argument-hint: '[component-name]'
---

# Responsive Design

## 목적

모바일 우선 접근으로 모든 화면 크기에 대응하는 반응형 디자인 구현

## 활성화 시점

- 반응형 레이아웃 구현 필요
- 모바일/태블릿/데스크톱 대응 작업
- 미디어 쿼리 작성 필요

## 핵심 원칙

1. **모바일 우선**: 작은 화면부터 시작하여 더 큰 화면으로 확대
2. **Fluid Typography**: 고정 크기 대신 상대적 단위(rem, %) 사용
3. **Flexible Grid**: 고정 격자 대신 유동형 레이아웃

## 구현 패턴

```typescript
// Tailwind를 사용한 반응형 디자인
const ResponsiveComponent = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {/* 모바일: 1열, sm: 2열, lg: 3열 */}
  </div>
);

// cn으로 조건부 className 병합
const ResponsiveText = ({ size }: { size: "sm" | "lg" }) => (
  <p className={cn(
    "text-base", // 기본값
    size === "sm" && "sm:text-sm",
    size === "lg" && "lg:text-lg"
  )}>
    반응형 텍스트
  </p>
);
```

## 디자인 관점

- **Line Length**: 한 줄 최대 50-75 문자 유지
- **Touch Target**: 모바일 터치 대상 최소 44x44px
- **Safe Area**: 모바일 노치/홈 버튼 고려

## 주의사항

- 하드코딩된 픽셀 값 사용 금지
- 모든 화면 크기에서 테스트 필수
- 이미지 최적화 (webp, srcset 등)
