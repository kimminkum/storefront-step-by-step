"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useOrderStore } from "@/stores/orderStore";
import { formatKRW } from "@/lib/money";
import Link from "next/link";
import Image from "next/image";
import type { Order } from "@/types";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const getOrderById = useOrderStore((state) => state.getOrderById);
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (orderId) {
      const foundOrder = getOrderById(orderId);
      if (foundOrder) {
        setOrder(foundOrder);
      }
    }
  }, [orderId, getOrderById]);

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            주문을 찾을 수 없습니다
          </h2>
          <Link
            href="/products"
            className="inline-block mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            쇼핑하러 가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 성공 메시지 */}
        <div className="bg-white rounded-lg shadow-md p-8 text-center mb-8 animate-scale-in">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            주문이 완료되었습니다!
          </h1>
          <p className="text-gray-600 mb-4">
            주문번호: <span className="font-semibold">{order.id}</span>
          </p>
          <p className="text-gray-600">
            입력하신 이메일로 주문 확인 메일이 발송됩니다.
          </p>
        </div>

        {/* 주문 정보 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 animate-fade-in">
          <h2 className="text-xl font-bold text-gray-900 mb-4">배송 정보</h2>
          <div className="space-y-2 text-gray-700">
            <div className="flex">
              <span className="w-24 font-medium">받는 분:</span>
              <span>{order.shippingInfo.name}</span>
            </div>
            <div className="flex">
              <span className="w-24 font-medium">연락처:</span>
              <span>{order.shippingInfo.phone}</span>
            </div>
            <div className="flex">
              <span className="w-24 font-medium">이메일:</span>
              <span>{order.shippingInfo.email}</span>
            </div>
            <div className="flex">
              <span className="w-24 font-medium">주소:</span>
              <span>
                [{order.shippingInfo.zipCode}] {order.shippingInfo.address}{" "}
                {order.shippingInfo.detailAddress}
              </span>
            </div>
            {order.shippingInfo.message && (
              <div className="flex">
                <span className="w-24 font-medium">배송 메시지:</span>
                <span>{order.shippingInfo.message}</span>
              </div>
            )}
          </div>
        </div>

        {/* 주문 상품 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 animate-fade-in">
          <h2 className="text-xl font-bold text-gray-900 mb-4">주문 상품</h2>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-4 pb-4 border-b last:border-b-0"
              >
                <div className="w-20 h-20 relative flex-shrink-0">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover rounded"
                    sizes="80px"
                    unoptimized
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    {item.product.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {item.product.category}
                  </p>
                  <p className="text-gray-700 mt-1">
                    {formatKRW(item.price)} × {item.quantity}개 ={" "}
                    <span className="font-semibold">
                      {formatKRW(item.price * item.quantity)}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t">
            <div className="flex justify-between text-xl font-bold">
              <span>총 결제금액</span>
              <span className="text-green-600">
                {formatKRW(order.totalPrice)}
              </span>
            </div>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="flex gap-4 justify-center">
          <Link
            href="/products"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            쇼핑 계속하기
          </Link>
          <Link
            href="/"
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
          >
            홈으로 가기
          </Link>
        </div>
      </div>
    </div>
  );
}
