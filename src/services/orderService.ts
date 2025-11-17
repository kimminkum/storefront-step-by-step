import type { Order, OrderItem, ShippingInfo } from "@/types";

export type CreateOrderParams = {
  items: OrderItem[];
  shippingInfo: ShippingInfo;
  totalPrice: number;
};

export type ServiceOptions = { signal?: AbortSignal };

// API 호출을 시뮬레이션하는 지연 함수
function delay(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(resolve, ms);
    if (signal) {
      signal.addEventListener("abort", () => {
        clearTimeout(timeoutId);
        reject(new Error("Request aborted"));
      });
    }
  });
}

// 주문 생성 API (실제로는 서버에 POST 요청)
export async function createOrder(
  params: CreateOrderParams,
  opts?: ServiceOptions
): Promise<Order> {
  // 네트워크 지연 시뮬레이션 (1-2초)
  await delay(1000 + Math.random() * 1000, opts?.signal);

  // 실제 환경에서는 서버 API를 호출합니다
  // const response = await fetch('/api/orders', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(params),
  //   signal: opts?.signal
  // });
  // if (!response.ok) throw new Error('Failed to create order');
  // return response.json();

  // Mock 응답
  const order: Order = {
    id: `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    items: params.items,
    shippingInfo: params.shippingInfo,
    totalPrice: params.totalPrice,
    status: "pending",
    createdAt: new Date().toISOString()
  };

  return order;
}

// 주문 조회 API
export async function getOrder(
  orderId: string,
  opts?: ServiceOptions
): Promise<Order> {
  await delay(500, opts?.signal);

  // 실제 환경에서는 서버 API를 호출합니다
  // const response = await fetch(`/api/orders/${orderId}`, {
  //   signal: opts?.signal
  // });
  // if (!response.ok) throw new Error('Order not found');
  // return response.json();

  // Mock 응답 (실제로는 로컬 스토리지나 서버에서 가져옴)
  throw new Error("Order not found - This is a mock service");
}

// 주문 목록 조회 API
export async function getOrders(opts?: ServiceOptions): Promise<Order[]> {
  await delay(800, opts?.signal);

  // 실제 환경에서는 서버 API를 호출합니다
  // const response = await fetch('/api/orders', {
  //   signal: opts?.signal
  // });
  // if (!response.ok) throw new Error('Failed to fetch orders');
  // return response.json();

  // Mock 응답
  return [];
}
