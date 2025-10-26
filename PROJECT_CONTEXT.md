# 쇼핑몰 프로젝트 작업 컨텍스트

## 프로젝트 개요

- **프로젝트명**: storefront-step-by-step
- **기술스택**: Next.js 15, React 19, TypeScript, Tailwind CSS, Zustand
- **목적**: 쇼핑몰 애플리케이션 단계별 학습 및 구현

## 현재까지 구현된 기능

### 1. 기본 구조

- ✅ Next.js 15 프로젝트 설정
- ✅ TypeScript 설정
- ✅ Tailwind CSS 설정
- ✅ 폴더 구조 정리

### 2. 상품 관련 기능

- ✅ 상품 목록 페이지 (`/products`)
- ✅ 상품 상세 페이지 (`/products/[id]`)
- ✅ ProductCard 컴포넌트
- ✅ 상품 데이터 타입 정의
- ✅ Mock 데이터 서비스

### 3. 장바구니 기능

- ✅ Zustand로 장바구니 상태 관리
- ✅ 장바구니 페이지 (`/cart`)
- ✅ 장바구니 아이템 추가/삭제/수량 조절
- ✅ Header에 장바구니 아이콘 및 개수 표시
- ✅ LocalStorage 영속성

### 4. UI 컴포넌트

- ✅ Header 컴포넌트 (네비게이션, 장바구니 아이콘)
- ✅ ProductCard 컴포넌트 (상품 카드)
- ✅ Rating 컴포넌트 (별점 표시)
- ✅ Badge 컴포넌트 (상태 표시)

## 작업 방식 및 요구사항

### 학습 방식

- **배우는 형식**: AI가 직접 코드를 작성하지 않고, 구현 방법과 개념을 설명
- **가이드 제공**: 어떤 컴포넌트가 필요한지, 어떤 로직을 사용해야 하는지 안내
- **직접 구현**: 사용자가 직접 코드를 작성해보도록 유도

### 코드 스타일

- TypeScript 사용
- Tailwind CSS로 스타일링
- 컴포넌트 기반 구조
- 함수형 컴포넌트 + Hooks 사용

## 다음에 구현할 기능들

### 우선순위 높음

1. **검색 및 필터 기능**

   - 상품명으로 검색
   - 카테고리별 필터링
   - 가격대별 필터링
   - 정렬 기능 (가격, 평점, 최신순)

2. **토스트 알림 시스템**

   - 장바구니 추가/삭제 시 알림
   - alert 대신 토스트 메시지 사용

3. **장바구니 UI 개선**
   - 애니메이션 효과
   - 로딩 상태 표시
   - 더 나은 사용자 경험

### 우선순위 중간

4. **주문 기능**

   - 체크아웃 플로우
   - 주문 확인 페이지
   - 주문 내역 관리

5. **사용자 인증**
   - 로그인/회원가입
   - 사용자 프로필

## 중요한 파일들

### 핵심 컴포넌트

- `src/components/Header.tsx` - 헤더 네비게이션
- `src/components/ProductCard.tsx` - 상품 카드
- `src/components/Rating.tsx` - 별점 컴포넌트
- `src/components/ui/Badge.tsx` - 상태 배지

### 페이지

- `src/app/page.tsx` - 홈페이지
- `src/app/products/page.tsx` - 상품 목록
- `src/app/products/[id]/page.tsx` - 상품 상세
- `src/app/cart/page.tsx` - 장바구니

### 상태 관리

- `src/stores/cartStore.ts` - 장바구니 Zustand 스토어

### 서비스

- `src/services/productService.ts` - 상품 서비스 인터페이스
- `src/services/productService.mock.ts` - Mock 데이터
- `src/services/productService.real.ts` - 실제 API 연동

### 타입 정의

- `src/types/index.ts` - 모든 타입 정의

## 개발 환경

- Node.js
- npm/pnpm 패키지 매니저
- ESLint 설정
- TypeScript 설정

## 작업 일지

### 2024-12-19 (오늘)

- **학습 목표**: 프론트엔드 개발자 취업을 위한 포트폴리오 프로젝트 완성
- **작업 방식**: AI가 코드를 주는 것이 아니라, 사용자가 직접 구현할 수 있도록 가르치는 방식
- **현재 상태**: 기본적인 쇼핑몰 기능들 완성 (상품 목록, 상세, 장바구니, Header)
- **완성된 기능**: 상품 상세 페이지 장바구니 버튼 상태 관리 (담기/제거 토글)
- **다음 목표**: Header 장바구니 아이콘 애니메이션 구현
- **진행 중**: CartIcon 컴포넌트 분리 작업

### 오늘 완성된 작업

- ✅ 상품 상세 페이지 장바구니 버튼 상태 관리 구현
  - 장바구니에 담기/제거 토글 기능
  - 버튼 색상 변경 (파란색 → 초록색)
  - 버튼 텍스트 변경 ("장바구니에 담기" → "장바구니에서 제거")
  - 알림 메시지 표시
- ✅ 장바구니 상태 확인 로직 (`isInCart`, `cartItem`, `quantity`)
- ✅ 클릭 핸들러 개선 (`onAddToCart` 함수)

### 이전 작업 내용

- ProductCard 컴포넌트에 장바구니 담기 버튼 추가 작업 중
- hover 시 나타나는 장바구니 아이콘 구현
- Link로 상품 상세 페이지 연결

---

**사용법**: 새 대화 시작 시 이 문서를 참조하여 작업 컨텍스트를 파악하고 이어서 진행할 수 있습니다.
