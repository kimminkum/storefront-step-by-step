import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/services/orderService";
import type { Order } from "@/types";

/**
 * 주문 목록을 조회하는 hook
 *
 * React Query의 useQuery를 사용하여:
 * - 자동 캐싱
 * - 백그라운드 리페칭
 * - 로딩/에러 상태 관리
 */
export function useOrders() {
  return useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: ({ signal }) => getOrders({ signal }),
    staleTime: 30 * 1000, // 30초간 신선한 데이터로 간주
    gcTime: 5 * 60 * 1000 // 5분간 캐시 유지
  });
}
