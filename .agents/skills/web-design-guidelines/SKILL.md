---
name: web-design-guidelines
description: 웹 디자인 원칙, 접근성, UX 가이드라인
triggers:
  - design
  - ux
  - accessibility
  - guidelines
  - a11y
  - wcag
argument-hint: '[guideline-area]'
---

# Web Design Guidelines

## 목적

웹 접근성(A11y)과 사용자 경험(UX)을 고려한 포괄적인 디자인 가이드라인 제공

## 활성화 시점

- UI/UX 설계 및 구현
- 접근성 검수
- 사용자 경험 개선

## 핵심 가이드라인

### 1. 접근성 (Accessibility - A11y)

#### 색상 대비

```typescript
// ❌ 부족한 대비
<p className="text-gray-400">읽기 어려운 텍스트</p>

// ✅ 충분한 대비 (4.5:1 이상)
<p className="text-gray-700">읽기 쉬운 텍스트</p>
```

#### 의미론적 HTML

```typescript
// ❌ 피하기
<div onClick={handleClick}>버튼</div>

// ✅ 권장
<button onClick={handleClick}>버튼</button>
```

#### ARIA 레이블

```typescript
// 스크린 리더 지원
<button aria-label="메뉴 열기">
  <MenuIcon />
</button>
```

### 2. 사용자 경험 (UX)

#### 피드백 제공

- 로딩 상태 표시
- 에러 메시지 명확성
- 성공 메시지 제공

#### 네비게이션

- 일관된 메뉴 구조
- 현재 위치 표시 (breadcrumb)
- 검색 기능 제공

#### 폼 설계

```typescript
// 명확한 라벨과 에러 메시지
<label htmlFor="email">이메일</label>
<input
  id="email"
  type="email"
  aria-invalid={hasError}
  aria-describedby="email-error"
/>
{hasError && <p id="email-error">유효한 이메일을 입력하세요</p>}
```

### 3. 레이아웃 원칙

- **여백(Whitespace)**: 호흡감 있는 공간
- **정렬(Alignment)**: 일관된 그리드 시스템
- **계층(Hierarchy)**: 시각적 우선순위 명확
- **일관성(Consistency)**: 반복된 패턴

### 4. 색상 이론

- 기본 색상 3-5개 선택
- 중성색 활용 (검정, 회색, 흰색)
- 강조색 신중하게 사용
- 색상에만 의존하지 않기 (색맹 대응)

## 성능 고려사항

- 폰트 로딩 최적화
- 아이콘 스프라이트 활용
- 이미지 최적화

## 테스트 체크리스트

- [ ] 키보드 네비게이션 가능
- [ ] 스크린 리더 테스트
- [ ] 색상 대비 검사 (axe DevTools)
- [ ] 모바일/태블릿 반응형 확인
- [ ] 다양한 브라우저 호환성 확인

## 참고 자료

- WCAG 2.1 가이드라인
- Material Design 원칙
- Apple Human Interface Guidelines
