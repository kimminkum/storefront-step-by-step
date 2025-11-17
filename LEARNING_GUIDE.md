# 프론트엔드 학습 가이드

이 문서는 프로젝트에서 단계별로 학습할 수 있는 내용을 정리한 가이드입니다.

## ✅ 1단계: React Query 고급 기능 (완료)

### 학습 내용

#### 1. useMutation 사용하기

**이전 방식 (Zustand만 사용):**

```typescript
// 직접 Zustand 스토어에서 주문 생성
const createOrder = useOrderStore((state) => state.createOrder);
const order = createOrder(orderItems, shippingInfo, totalPrice);
```

**개선된 방식 (React Query useMutation):**

```typescript
// useMutation을 사용한 주문 생성
const createOrderMutation = useCreateOrder();
createOrderMutation.mutate({
  items: orderItems,
  shippingInfo,
  totalPrice: getTotalPrice()
});
```

**장점:**

- 자동 로딩 상태 관리 (`isPending`)
- 에러 처리 자동화
- 쿼리 무효화 및 리페칭 자동화
- Optimistic Updates 지원

#### 2. Optimistic Updates (낙관적 업데이트)

서버 응답을 기다리지 않고 즉시 UI를 업데이트하는 기법입니다.

**구현 위치:** `src/hooks/useCreateOrder.ts`

**동작 방식:**

1. `onMutate`: 서버 요청 전에 낙관적 데이터로 UI 업데이트
2. `onSuccess`: 서버 응답 후 실제 데이터로 교체
3. `onError`: 실패 시 이전 상태로 롤백

**코드 예시:**

```typescript
onMutate: async (newOrder) => {
  // 낙관적 주문 생성
  const optimisticOrder: Order = {
    id: `OPTIMISTIC-${Date.now()}`
    // ... 주문 데이터
  };

  // 즉시 UI 업데이트
  queryClient.setQueryData(["orders"], (old = []) => [optimisticOrder, ...old]);
};

onSuccess: (data) => {
  // 실제 서버 응답으로 교체
  queryClient.setQueryData(["orders"], (old) => {
    // 낙관적 주문 제거하고 실제 주문 추가
    return [data, ...old.filter((o) => o.id !== optimisticOrder.id)];
  });
};
```

**사용자 경험:**

- 주문 버튼 클릭 → 즉시 UI 업데이트 (느낌 없음)
- 서버 응답 대기 중에도 주문이 완료된 것처럼 보임
- 실패 시 자동으로 롤백

#### 3. 서비스 레이어 분리

**파일:** `src/services/orderService.ts`

API 호출 로직을 별도 서비스로 분리하여:

- 재사용성 향상
- 테스트 용이성
- Mock/Real 구현 전환 용이

**구조:**

```typescript
// 서비스 함수
export async function createOrder(params: CreateOrderParams): Promise<Order> {
  // 실제 환경에서는 fetch('/api/orders', { ... })
  // 현재는 Mock 구현
}

// Hook에서 사용
const mutation = useMutation({
  mutationFn: createOrder // 서비스 함수 전달
});
```

### 학습 포인트

1. **useMutation의 생명주기**

   - `onMutate` → `mutationFn` → `onSuccess` / `onError` → `onSettled`

2. **Query Invalidation**

   - `queryClient.invalidateQueries()`: 관련 쿼리를 무효화하여 리페칭 유도

3. **Optimistic Updates 패턴**
   - 이전 상태 스냅샷 저장
   - 낙관적 데이터로 즉시 업데이트
   - 성공 시 실제 데이터로 교체
   - 실패 시 롤백

### 다음 단계로 넘어가기 전에

다음 내용을 이해하고 직접 구현해보세요:

1. **장바구니 추가 기능도 useMutation으로 전환**

   - `src/stores/cartStore.ts`의 `addItem`을 mutation으로 변경
   - Optimistic Updates 적용

2. **에러 처리 개선**

   - 네트워크 에러, 타임아웃 등 다양한 에러 케이스 처리

3. **재시도 로직**
   - `retry` 옵션을 사용한 자동 재시도

---

## 📋 2단계: 테스트 코드 작성 (다음 단계)

### 준비 사항

1. **Jest 설정**

   ```bash
   npm install --save-dev jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom
   ```

2. **테스트 파일 구조**
   ```
   src/
   ├── components/
   │   └── ProductCard.test.tsx
   ├── hooks/
   │   └── useCreateOrder.test.ts
   └── services/
       └── orderService.test.ts
   ```

### 학습할 내용

1. **컴포넌트 테스트**

   - 렌더링 테스트
   - 사용자 인터랙션 테스트
   - Props 변경 테스트

2. **Hook 테스트**

   - Custom Hook 테스트
   - React Query Hook 테스트

3. **서비스 테스트**
   - API 호출 모킹
   - 에러 케이스 테스트

---

## 📋 3단계: Next.js Server Components (예정)

### 학습할 내용

1. **Server Components vs Client Components**

   - 언제 Server Component를 사용할까?
   - 언제 Client Component가 필요한가?

2. **Server Actions**

   - 폼 제출을 Server Action으로 처리
   - 데이터 변경을 서버에서 직접 처리

3. **Streaming & Suspense**
   - 점진적 로딩
   - 로딩 상태 관리

---

## 📋 4단계: 성능 최적화 (예정)

### 학습할 내용

1. **코드 스플리팅**

   - 동적 import
   - Route-based splitting

2. **이미지 최적화**

   - Next.js Image 컴포넌트 활용
   - WebP 포맷 사용

3. **번들 분석**
   - `@next/bundle-analyzer` 사용
   - 불필요한 의존성 제거

---

## 📋 5단계: 에러 처리 (예정)

### 학습할 내용

1. **Error Boundary**

   - React Error Boundary 구현
   - 전역 에러 핸들링

2. **에러 로깅**
   - Sentry 통합
   - 에러 추적 및 모니터링

---

## 학습 팁

1. **단계별로 진행**: 한 번에 모든 것을 배우려 하지 말고, 한 단계씩 완벽하게 이해한 후 다음으로 넘어가세요.

2. **직접 구현해보기**: 코드를 읽는 것만으로는 부족합니다. 직접 타이핑하고 실행해보세요.

3. **공식 문서 참고**:

   - [React Query 공식 문서](https://tanstack.com/query/latest)
   - [Next.js 공식 문서](https://nextjs.org/docs)

4. **디버깅 도구 활용**:
   - React Query DevTools
   - React DevTools
   - 브라우저 개발자 도구

---

## 질문이 있으신가요?

각 단계에서 막히는 부분이 있다면:

1. 공식 문서를 먼저 확인
2. 코드를 다시 읽어보기
3. 작은 예제로 테스트해보기
4. 필요시 도움 요청

**행운을 빕니다! 🚀**
