import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder } from "@/services/orderService";
import type { CreateOrderParams } from "@/services/orderService";
import { useOrderStore } from "@/stores/orderStore";
import { useCartStore } from "@/stores/cartStore";
import { useToastStore } from "@/stores/toastStore";
import type { Order } from "@/types";

/**
 * 주문 생성을 위한 useMutation hook
 *
 * Optimistic Updates를 적용하여:
 * 1. 주문 생성 즉시 UI 업데이트 (낙관적 업데이트)
 * 2. 서버 응답 후 실제 데이터로 교체
 * 3. 실패 시 롤백
 */
export function useCreateOrder() {
  const queryClient = useQueryClient();
  const addOrderToStore = useOrderStore((state) => state.createOrder);
  const clearCart = useCartStore((state) => state.clearCart);
  const addToast = useToastStore((state) => state.addToast);

  return useMutation({
    mutationFn: (params: CreateOrderParams) => createOrder(params),

    // Optimistic Update: 서버 응답 전에 UI를 먼저 업데이트
    onMutate: async (newOrder) => {
      // 진행 중인 쿼리들을 취소하여 낙관적 업데이트가 덮어쓰이지 않도록 함
      await queryClient.cancelQueries({ queryKey: ["orders"] });

      // 이전 주문 목록 스냅샷 저장 (롤백용)
      const previousOrders = queryClient.getQueryData<Order[]>(["orders"]);

      // 낙관적 업데이트: 주문을 즉시 생성
      const optimisticOrder: Order = {
        id: `OPTIMISTIC-${Date.now()}`,
        items: newOrder.items,
        shippingInfo: newOrder.shippingInfo,
        totalPrice: newOrder.totalPrice,
        status: "pending",
        createdAt: new Date().toISOString()
      };

      // 주문 목록에 낙관적 주문 추가
      queryClient.setQueryData<Order[]>(["orders"], (old = []) => [
        optimisticOrder,
        ...old
      ]);

      // Zustand 스토어에도 낙관적 주문 추가
      addOrderToStore(
        newOrder.items,
        newOrder.shippingInfo,
        newOrder.totalPrice
      );

      // 롤백을 위한 컨텍스트 반환
      return { previousOrders, optimisticOrder };
    },

    // 성공 시: 서버에서 받은 실제 데이터로 교체
    onSuccess: (data, variables, context) => {
      // 낙관적 주문을 실제 주문으로 교체
      queryClient.setQueryData<Order[]>(["orders"], (old = []) => {
        if (!old) return [data];

        // 낙관적 주문 제거하고 실제 주문 추가
        const filtered = old.filter(
          (order) => order.id !== context?.optimisticOrder.id
        );
        return [data, ...filtered];
      });

      // Zustand 스토어 업데이트 (실제 주문 ID로)
      // 주의: Zustand는 이미 낙관적 주문이 추가되어 있으므로,
      // 실제로는 서버 응답을 받아서 업데이트해야 하지만,
      // 현재 구조상 orderStore.createOrder가 이미 호출되었으므로
      // 별도 처리가 필요할 수 있습니다.

      // 장바구니 비우기
      clearCart();

      // 성공 토스트
      addToast("주문이 완료되었습니다!", "success");
    },

    // 에러 시: 롤백
    onError: (error, variables, context) => {
      // 이전 상태로 롤백
      if (context?.previousOrders) {
        queryClient.setQueryData(["orders"], context.previousOrders);
      }

      // 에러 토스트
      addToast("주문 생성에 실패했습니다. 다시 시도해주세요.", "error");
      console.error("Order creation failed:", error);
    },

    // 완료 시: 항상 실행 (성공/실패 관계없이)
    onSettled: () => {
      // 주문 목록 쿼리 무효화하여 최신 데이터 가져오기
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    }
  });
}
