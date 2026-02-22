---
name: ui-ux-pro-max
description: 웹 및 모바일 플랫폼을 위한 디자인 인텔리전스 및 프로페셔널 UI/UX
triggers:
  - ui
  - ux
  - design
  - professional
  - ui-ux-pro-max
  - interface
argument-hint: '[platform-type]'
---

# UI/UX Pro Max

## 목적

전문가급 UI/UX 설계로 모든 플랫폼에서 높은 품질의 사용자 경험 제공

## 활성화 시점

- 전문적인 UI/UX 설계 필요
- 다중 플랫폼(웹, 모바일) 지원
- 사용성 최적화
- 시각적 우수성 요구

## 핵심 기능

### 1. 스타일 가이드라인

#### 색상 팔레트

```typescript
// 검색 가능한 색상 라이브러리
- Primary colors: 브랜드 정체성
- Secondary colors: 강조 및 대비
- Neutral colors: 배경 및 텍스트
- Semantic colors: 상태 표현 (성공, 에러, 경고)
```

#### 타이포그래피

```typescript
// 폰트 페어링
Display Font: 헤딩 및 강조 (특징 있는 폰트)
Body Font: 본문 읽음성 (가독성 높은 폰트)

Size Scale: 8px, 12px, 14px, 16px, 20px, 24px, 32px, 48px
Weight: 300 (Light), 400 (Regular), 600 (Semi-bold), 700 (Bold)
```

### 2. UX 가이드라인 적용

#### 접근성 (Accessibility)

```typescript
// WCAG 기준 준수
- 색상 대비: 최소 4.5:1 (텍스트)
- 터치 대상: 최소 44x44px
- 의미론적 HTML: <button>, <nav>, <main>
- 키보드 네비게이션: Tab, Enter, Space 지원
- 스크린 리더 지원: ARIA 레이블
```

#### 상호작용 설계

```typescript
// 피드백 제공
- Loading state: 진행률 표시
- Error state: 명확한 에러 메시지
- Success state: 성공 확인
- Hover/Focus: 시각적 피드백

// 애니메이션
- Transition: 150-300ms (자연스러움)
- Duration: 요소 크기에 비례
- Timing: ease-in-out (자연스러운 곡선)
```

### 3. 플랫폼별 최적화

#### 웹 (Web)

```typescript
- Responsive design: 모바일, 태블릿, 데스크톱
- Performance: Core Web Vitals 최적화
- SEO: Semantic HTML, 메타태그
- Accessibility: WCAG 2.1 AA 준수
```

#### 모바일 (Mobile)

```typescript
- Touch-first design: 터치 친화적 인터페이스
- Safe Area: 노치/홈 버튼 고려
- Performance: 모바일 네트워크 최적화
- Battery: 애니메이션 효율 고려
```

### 4. 검색 가능한 리소스

#### 컴포넌트 라이브러리

```
- Buttons: 다양한 스타일과 상태
- Forms: 입력, 선택, 텍스트 영역
- Cards: 콘텐츠 컨테이너
- Navigation: 메뉴, 탭, 사이드바
- Modals: 다이얼로그, 알림
- Tooltips: 팝오버, 힌트
```

#### 디자인 패턴

```
- Loading patterns: 스켈레톤, 스피너
- Empty states: 데이터 없음 상태
- Error states: 에러 처리 UI
- Success states: 완료 확인 UI
- Pagination: 페이지 네비게이션
- Infinite scroll: 무한 스크롤
```

## 구현 프로세스

1. **스타일 시스템 정의**
   - 색상, 타이포그래피, 간격
   - 토큰화 (design tokens)

2. **컴포넌트 설계**
   - 상태별 변형 (states)
   - 반응형 동작

3. **UX 검증**
   - 접근성 검사 (axe DevTools)
   - 사용성 테스트

4. **구현**
   - 디자인 시스템 적용
   - 성능 최적화

## 베스트 프랙티스

### 색상 사용

```typescript
// ❌ 피하기
- 색상에만 의존 (색맹 대응)
- 너무 많은 색상 (5개 이상)
- 낮은 대비 (가독성)

// ✅ 권장
- 색상 + 아이콘/텍스트
- 3-5개 주요 색상
- 높은 대비율 확보
```

### 타이포그래피

```typescript
// ❌ 피하기
- 여러 폰트 (4개 이상)
- 작은 글씨 (<14px 본문)
- 매우 좁은 줄 간격

// ✅ 권장
- 2개 폰트 페어링
- 최소 14px 본문
- 1.5-1.6 줄 간격
```

### 공간(Spacing)

```typescript
// 일관된 간격 시스템
4px unit: 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64...

// ❌ 피하기
padding: 7px; // 임의의 값

// ✅ 권장
padding: 16px; // 4px의 배수
```

## 주의사항

- 모든 플랫폼에서 일관된 경험
- 성능과 미적 우수성의 균형
- 접근성은 선택이 아닌 필수
- 사용자 테스트를 통한 검증
