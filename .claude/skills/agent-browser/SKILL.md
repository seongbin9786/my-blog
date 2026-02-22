---
name: agent-browser
description: 브라우저 상호작용 자동화 및 웹 요소 조작
triggers:
  - browser
  - agent-browser
  - automation
  - click
  - interact
  - screenshot
argument-hint: '[action-type]'
---

# Agent Browser

## 목적

AI 에이전트가 브라우저와 상호작용하고 웹 요소를 자동으로 조작할 수 있도록 지원

## 활성화 시점

- 웹 자동화 필요
- 브라우저 인터랙션 테스트
- 웹 스크래핑 또는 데이터 추출
- UI 자동화

## 핵심 기능

### 1. 스크린샷 분석

```typescript
// 주석이 달린 스크린샷으로 요소 식별
// 각 상호작용 가능한 요소에 번호가 표시됨
[1] Button: "Sign In"
[2] Input: Email field
[3] Link: "Forgot Password?"
```

### 2. 요소 선택

#### 텍스트로 찾기

```
"Click the button that says 'Submit'"
```

#### 역할(Role)로 찾기

```
"Click the button with role 'submit'"
```

#### 레이블로 찾기

```
"Fill the input labeled 'Email Address'"
```

#### Placeholder로 찾기

```
"Type into the field with placeholder 'Enter your name'"
```

#### Test ID로 찾기

```
"Click element with test ID 'save-button'"
```

### 3. 상호작용 액션

```typescript
// 클릭
page.click('[element-selector]');

// 입력
page.fill('[element-selector]', 'text-to-enter');

// 드래그 앤 드롭
page.dragAndDrop('[source]', '[target]');

// 호버
page.hover('[element-selector]');

// 스크롤
page.evaluate(() => window.scrollBy(0, 1000));

// 폼 제출
page.press('Enter');

// 키보드 입력
page.press('Tab');
```

## 사용 패턴

### 패턴 1: 순차적 상호작용

```
1. Take screenshot to see current state
2. Click "Login" button
3. Enter email in "Email" field
4. Enter password in "Password" field
5. Click "Submit" button
6. Wait for navigation
7. Take screenshot to verify result
```

### 패턴 2: 조건부 상호작용

```
1. Check if element exists
2. If exists, perform action A
3. If not, perform action B
4. Verify result
```

## 베스트 프랙티스

- **명확한 선택자**: 텍스트, 역할, 레이블 사용
- **대기(Waiting)**: 요소 로딩 완료 후 상호작용
- **에러 처리**: 예상치 못한 상태 대비
- **느린 네트워크**: 충분한 타임아웃 설정
- **스크린샷 검증**: 각 단계 후 상태 확인

## 장점

- 실제 브라우저 동작 자동화
- 사람처럼 자연스러운 상호작용
- 복잡한 웹 애플리케이션 테스트
- UI 변경에도 robust한 선택자

## 주의사항

- 모든 요소가 상호작용 가능한지 확인
- 동적 로딩 요소는 대기 필수
- 로그인 정보 등 민감 데이터 주의
- API 이용약관 준수
