---
name: frontend-design
description: 뛰어난 디자인 품질의 독특한 프로덕션급 프론트엔드 인터페이스 생성
triggers:
  - frontend-design
  - web-component
  - design
  - ui
  - interface
argument-hint: '[component-type]'
---

# Frontend Design

## 목적

AI스러운 일반적인 미학을 피하고 진정한 디자인 의도를 반영한 distinctive, production-grade web interfaces 생성

## 활성화 시점

- 웹 컴포넌트, 페이지, 애플리케이션 구축
- UI/UX 디자인 및 스타일링
- 미적 개선 필요
- 프로덕션급 인터페이스 작성

## 핵심 원칙

### 1. 디자인 방향 결정

명확한 개념적 방향을 선택하고 정밀하게 실행:

- **Bold Maximalism**: 풍부한 색감과 디테일
- **Refined Minimalism**: 절제되고 우아한 접근

### 2. 시각적 우수성

#### 타이포그래피

```typescript
// ❌ 피하기
font-family: Arial, Inter, Roboto; // 뻔한 폰트

// ✅ 권장
font-family: 'Garamond', 'Poppins'; // 특징 있는 조합
```

**원칙:**

- Display와 body 폰트 신중하게 짝지음
- 한 글꼴을 기본으로 하고 강조용 보조 폰트 사용
- 폰트 사이즈와 가중치로 계층 만들기

#### 색상 시스템

```typescript
// ❌ 부족한 색상
colors: { primary, secondary, neutral }

// ✅ 풍부한 시스템
colors: {
  dominant: '#primary-shade', // 주요 톤
  accent: '#vibrant-contrast', // 날카로운 강조
  neutral: '#gray-scale'
}
```

**원칙:**

- 기본 색상 3-5개 선택
- 중성색(검정, 회색, 흰색) 활용
- 지배적 색상과 날카로운 강조색 조합

#### 공간과 구성

```typescript
// ❌ 균등한 배치
<div className="grid grid-cols-3 gap-4">

// ✅ 의도적인 비대칭
<div className="space-y-8">
  <div className="flex gap-12">
    <section className="flex-1"></section>
    <aside className="flex-[0.6]"></aside>
  </div>
</div>
```

**원칙:**

- 여백(whitespace) 활용으로 호흡감
- 비대칭적 구성으로 시각적 흥미
- 그리드 시스템 의도적 위반
- 중첩과 겹침으로 깊이감

### 3. 동작과 애니메이션

```typescript
// CSS-first 애니메이션
@keyframes reveal {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

// React Motion
import { motion } from 'framer-motion';
<motion.div animate={{ opacity: 1 }} transition={{ duration: 0.3 }} />
```

**원칙:**

- 목적 있는 모션 (피드백, 가이드, 화려함)
- 과도한 애니메이션 금지
- 성능 영향 최소화

### 4. 대기(Atmospheric) 세부사항

```typescript
// 그래디언트 메시
<div className="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400"></div>

// 텍스처 오버레이
<div className="bg-noise opacity-[0.03]"></div>

// 장식적 테두리
<div className="border-2 border-dashed border-emerald-300"></div>

// 커스텀 커서
cursor: url('custom.svg'), auto;
```

## 구현 프로세스

1. **컨텍스트 이해** - 목적, 대상 사용자, 기술 제약
2. **감정 톤 결정** - 어떤 느낌을 전달할 것인가?
3. **색상 팔레트 선택** - 지배색 + 강조색
4. **타이포그래피 정의** - 2-3개 폰트 페어링
5. **레이아웃 스케칭** - 의도적인 공간 배치
6. **상세 검토** - 그래디언트, 텍스처, 애니메이션
7. **코드 구현** - 의도 정확하게 반영

## 주의사항

- 트렌드 따라가기보다 의도적 선택
- 제약을 제약으로 보지 말고 창의의 기회로
- 일관성 유지 (색상, 간격, 타이포그래피)
- 접근성 고려 (색상 대비, 크기 가독성)
- 성능 영향 검토 (이미지 최적화, 애니메이션)

## 참고

"선택을 하고 정밀하게 실행한다. 대담한 극대주의와 세련된 극소주의 모두 작동한다. 핵심은 의도성이다."
