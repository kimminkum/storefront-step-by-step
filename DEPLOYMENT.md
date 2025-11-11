# 🚀 Vercel 배포 가이드

이 문서는 Vercel에 프로젝트를 배포하는 방법을 안내합니다.

## 📋 사전 준비

1. **Vercel 계정 생성**

   - [Vercel](https://vercel.com)에 접속
   - GitHub 계정으로 로그인

2. **GitHub 저장소 생성**
   - GitHub에 새 저장소 생성
   - 프로젝트 코드 푸시

## 🔧 배포 방법

### 방법 1: Vercel Dashboard (추천)

1. **Vercel Dashboard 접속**

   - [Vercel Dashboard](https://vercel.com/dashboard)에 로그인

2. **새 프로젝트 생성**

   - "Add New..." → "Project" 클릭
   - GitHub 저장소 선택
   - "Import" 클릭

3. **프로젝트 설정**

   ```
   Framework Preset: Next.js
   Root Directory: ./
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

4. **환경 변수 설정** (선택사항)

   - 필요한 환경 변수가 있다면 추가
   - 현재 프로젝트는 환경 변수 없이 작동

5. **Deploy 클릭**
   - 자동으로 빌드 및 배포 시작
   - 2-3분 후 배포 완료

### 방법 2: Vercel CLI

1. **Vercel CLI 설치**

   ```bash
   npm install -g vercel
   ```

2. **로그인**

   ```bash
   vercel login
   ```

3. **배포**

   ```bash
   # 프로젝트 루트에서 실행
   vercel

   # 프로덕션 배포
   vercel --prod
   ```

4. **설정 확인**
   - CLI가 자동으로 Next.js 프로젝트를 감지
   - 기본 설정으로 진행

## 🔄 자동 배포 설정

Vercel은 GitHub와 연동하여 자동 배포를 지원합니다:

- **main/master 브랜치**: 프로덕션 배포
- **다른 브랜치**: 프리뷰 배포
- **Pull Request**: 자동 프리뷰 생성

## 📊 배포 후 확인사항

### 1. 빌드 성공 확인

- Vercel Dashboard에서 빌드 로그 확인
- 모든 페이지가 정상적으로 생성되었는지 확인

### 2. 기능 테스트

- [ ] 메인 페이지 로딩
- [ ] 상품 목록 페이지
- [ ] 상품 상세 페이지
- [ ] 장바구니 기능
- [ ] 검색 및 필터링
- [ ] 체크아웃 플로우
- [ ] 기술 쇼케이스 페이지

### 3. 성능 확인

- Vercel Analytics 활성화 (선택사항)
- Lighthouse 점수 확인
- 로딩 속도 테스트

## 🌐 커스텀 도메인 설정

1. **Vercel Dashboard에서 도메인 설정**

   - Project Settings → Domains
   - 도메인 추가

2. **DNS 설정**

   - 도메인 제공업체에서 DNS 레코드 추가
   - Vercel이 제공하는 값으로 설정

3. **SSL 인증서**
   - Vercel이 자동으로 Let's Encrypt SSL 인증서 발급
   - HTTPS 자동 적용

## 🔍 문제 해결

### 빌드 실패 시

1. 로컬에서 `npm run build` 실행하여 오류 확인
2. `package.json`의 의존성 확인
3. Node.js 버전 확인 (18.17 이상)

### 환경 변수 문제

1. Vercel Dashboard에서 환경 변수 확인
2. 재배포 필요 시 "Redeploy" 클릭

### 404 오류

1. `vercel.json` 설정 확인
2. Next.js 라우팅 설정 확인

## 📈 성능 최적화

### 1. 이미지 최적화

- Next.js Image 컴포넌트 사용 (이미 적용됨)
- Vercel이 자동으로 이미지 최적화

### 2. 캐싱

- Vercel Edge Network 자동 활용
- 정적 페이지 자동 캐싱

### 3. Analytics

```bash
# Vercel Analytics 설치 (선택사항)
npm install @vercel/analytics
```

`src/app/layout.tsx`에 추가:

```typescript
import { Analytics } from "@vercel/analytics/react";

// </body> 태그 전에 추가
<Analytics />;
```

## 🎯 배포 체크리스트

배포 전 확인사항:

- [ ] 로컬에서 `npm run build` 성공
- [ ] 모든 기능 테스트 완료
- [ ] README.md 작성 완료
- [ ] 불필요한 콘솔 로그 제거
- [ ] 환경 변수 확인
- [ ] .gitignore 설정 확인
- [ ] package.json 버전 확인

배포 후 확인사항:

- [ ] 배포 URL 접속 확인
- [ ] 모든 페이지 로딩 확인
- [ ] 모바일 반응형 확인
- [ ] 404 페이지 확인
- [ ] SEO 메타데이터 확인

## 🔗 유용한 링크

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel CLI Documentation](https://vercel.com/docs/cli)

## 💡 팁

1. **프리뷰 배포 활용**

   - 브랜치별로 자동 프리뷰 URL 생성
   - 팀원과 공유하여 리뷰 가능

2. **환경별 설정**

   - Development, Preview, Production 환경별 설정 가능
   - 환경 변수를 환경별로 다르게 설정

3. **롤백**
   - Vercel Dashboard에서 이전 배포로 즉시 롤백 가능
   - "Promote to Production" 기능 활용

---

배포 완료 후 README.md의 배포 URL을 업데이트하세요! 🎉
