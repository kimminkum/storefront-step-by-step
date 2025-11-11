# 🛍️ Store - 현대적인 E-Commerce 플랫폼

Next.js 15, React 19, TypeScript로 구현한 풀스택 E-Commerce 플랫폼입니다.  
장바구니, 검색, 필터링, 주문 시스템을 갖춘 프론트엔드 포트폴리오 프로젝트입니다.

## ✨ 주요 기능

### 🛒 쇼핑 기능

- **상품 목록**: 100개 이상의 상품 데이터 (Fake Store API)
- **실시간 검색**: Debounce를 활용한 최적화된 검색
- **카테고리 필터**: 다양한 카테고리별 상품 분류
- **정렬 기능**: 가격, 평점, 최신순 등 다양한 정렬 옵션
- **페이지네이션**: 효율적인 데이터 로딩

### 🛒 장바구니 시스템

- **상태 관리**: Zustand를 활용한 전역 상태 관리
- **영속성**: LocalStorage를 통한 데이터 유지
- **실시간 업데이트**: 수량 조절, 삭제 기능
- **토스트 알림**: 사용자 피드백 제공

### 📦 주문 시스템

- **체크아웃**: 배송 정보 입력 폼
- **주문 관리**: 주문 내역 저장 및 조회
- **주문 완료**: 주문 확인 페이지

### 🎨 기술 쇼케이스 (20+ 인터랙티브 컴포넌트)

- **Swiper**: 다양한 pagination 타입 (dots, progressbar, gauge, custom cursor)
- **AOS (Animate On Scroll)**: 스크롤 기반 애니메이션
- **Text Effects**: Reveal, Typing, Word-by-word, Glitch 효과
- **Image Zoom**: 스크롤 기반 이미지 확대
- **Parallax**: 레이어별 다른 속도의 스크롤
- **Section Stacking**: 섹션 쌓기 효과
- **Horizontal Scroll**: 가로 스크롤 섹션
- **Sticky Image**: 고정 이미지 + 스크롤 텍스트
- **Product Swiper**: 제품 이미지와 텍스트 동시 전환
- **Text Color Transition**: 스크롤 기반 색상 전환
- **Curtain Reveal**: 커튼 열림 효과
- **Section Navigation**: 섹션별 네비게이션
- **3D Effects**: Card 3D Hover, Magnetic Button
- **Image Comparison**: 이미지 비교 슬라이더
- **Carousel**: 무한 루프 캐러셀
- **Tabs**: 10가지 이상의 탭 스타일
- **Scroll Counter**: 스크롤 시 숫자 카운팅
- **Scroll Progress**: 스크롤 진행률 표시
- **Scroll Snap**: CSS Scroll Snap 활용

## 🚀 기술 스택

### Frontend

- **Next.js 15**: App Router, Server Components, Suspense
- **React 19**: 최신 React 기능 활용
- **TypeScript**: 타입 안정성
- **Tailwind CSS**: 유틸리티 기반 스타일링

### 상태 관리

- **Zustand**: 경량 상태 관리 라이브러리
- **React Query (TanStack Query)**: 서버 상태 관리

### 기타

- **LocalStorage**: 데이터 영속성
- **Fake Store API**: 상품 데이터
- **ESLint**: 코드 품질 관리

## 📦 설치 및 실행

### 필수 요구사항

- Node.js 18.17 이상
- npm 또는 pnpm

### 설치

```bash
# 저장소 클론
git clone [repository-url]
cd storefront-step-by-step

# 의존성 설치
npm install
# 또는
pnpm install
```

### 개발 서버 실행

```bash
npm run dev
# 또는
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 프로덕션 빌드

```bash
npm run build
npm start
```

### 타입 체크

```bash
npm run typecheck
```

## 📁 프로젝트 구조

```
src/
├── app/                      # Next.js App Router
│   ├── cart/                # 장바구니 페이지
│   ├── checkout/            # 체크아웃 페이지
│   ├── events/              # 기술 쇼케이스 페이지
│   ├── products/            # 상품 페이지
│   ├── layout.tsx           # 루트 레이아웃
│   ├── page.tsx             # 메인 페이지
│   └── not-found.tsx        # 404 페이지
├── components/              # React 컴포넌트
│   ├── showcase/            # 쇼케이스 컴포넌트 (20+)
│   ├── ui/                  # UI 컴포넌트
│   ├── Header.tsx           # 헤더
│   ├── ProductCard.tsx      # 상품 카드
│   └── ...
├── hooks/                   # Custom Hooks
│   ├── useProducts.ts       # 상품 데이터 훅
│   ├── useCategories.ts     # 카테고리 훅
│   └── showcase/            # 쇼케이스 훅
├── stores/                  # Zustand 스토어
│   ├── cartStore.ts         # 장바구니 상태
│   ├── toastStore.ts        # 토스트 상태
│   └── orderStore.ts        # 주문 상태
├── services/                # API 서비스
│   ├── productService.ts    # 상품 서비스
│   └── ...
├── types/                   # TypeScript 타입
│   ├── index.ts             # 공통 타입
│   └── showcase/            # 쇼케이스 타입
└── lib/                     # 유틸리티 함수
    ├── money.ts             # 금액 포맷팅
    └── debounce.ts          # Debounce 함수
```

## 🎯 주요 구현 사항

### 1. 상태 관리

- Zustand를 활용한 전역 상태 관리
- LocalStorage persist 미들웨어로 데이터 영속성 구현
- 장바구니, 토스트, 주문 상태 관리

### 2. 성능 최적화

- React Query를 통한 서버 상태 캐싱
- Debounce를 활용한 검색 최적화
- Next.js Image 컴포넌트로 이미지 최적화
- Suspense를 활용한 로딩 상태 관리

### 3. 사용자 경험

- 토스트 알림으로 즉각적인 피드백
- 애니메이션을 활용한 부드러운 전환
- 반응형 디자인으로 모든 디바이스 지원
- 404 페이지 커스터마이징

### 4. SEO 최적화

- 메타데이터 설정
- Open Graph 태그
- 시맨틱 HTML

## 🌟 특징

- ✅ **완전한 타입 안정성**: TypeScript로 모든 코드 작성
- ✅ **모던 React**: React 19의 최신 기능 활용
- ✅ **서버 컴포넌트**: Next.js 15 App Router 활용
- ✅ **반응형 디자인**: 모바일, 태블릿, 데스크톱 지원
- ✅ **접근성**: 시맨틱 HTML과 ARIA 속성
- ✅ **코드 품질**: ESLint, Prettier 설정

## 📸 스크린샷

### 메인 페이지

- Hero 섹션
- 주요 기능 소개
- 기술 스택 표시

### 상품 페이지

- 검색 및 필터링
- 카테고리별 분류
- 페이지네이션

### 기술 쇼케이스

- 20가지 이상의 인터랙티브 컴포넌트
- 실제 동작하는 데모

## 🚀 배포

이 프로젝트는 Vercel에 배포되어 있습니다.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/storefront-step-by-step)

## 📝 라이선스

이 프로젝트는 포트폴리오 목적으로 제작되었습니다.

## 👨‍💻 개발자

Frontend Developer

---

⭐ 이 프로젝트가 도움이 되었다면 Star를 눌러주세요!
