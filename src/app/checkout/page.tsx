"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/stores/cartStore";
import { useOrderStore } from "@/stores/orderStore";
import { useToastStore } from "@/stores/toastStore";
import { formatKRW } from "@/lib/money";
import Image from "next/image";
import Link from "next/link";
import type { ShippingInfo } from "@/types";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const createOrder = useOrderStore((state) => state.createOrder);
  const addToast = useToastStore((state) => state.addToast);

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    name: "",
    phone: "",
    email: "",
    address: "",
    detailAddress: "",
    zipCode: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // 장바구니가 비어있으면 리다이렉트
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            장바구니가 비어있습니다
          </h2>
          <p className="text-gray-600 mb-6">주문할 상품을 담아주세요</p>
          <Link
            href="/products"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            쇼핑하러 가기
          </Link>
        </div>
      </div>
    );
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 유효성 검사
    if (
      !shippingInfo.name ||
      !shippingInfo.phone ||
      !shippingInfo.email ||
      !shippingInfo.address ||
      !shippingInfo.zipCode
    ) {
      addToast("모든 필수 항목을 입력해주세요", "error");
      setIsSubmitting(false);
      return;
    }

    // 주문 생성
    const orderItems = items.map((item) => ({
      product: item.product,
      quantity: item.quantity,
      price: item.product.price
    }));

    const order = createOrder(orderItems, shippingInfo, getTotalPrice());

    // 장바구니 비우기
    clearCart();

    // 주문 완료 페이지로 이동
    addToast("주문이 완료되었습니다!", "success");
    router.push(`/checkout/success?orderId=${order.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">📦 주문/결제</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 배송 정보 입력 */}
            <div className="lg:col-span-2 space-y-6">
              {/* 주문자 정보 */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  주문자 정보
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      이름 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={shippingInfo.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="홍길동"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        전화번호 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={shippingInfo.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="010-1234-5678"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        이메일 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={shippingInfo.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="example@email.com"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 배송지 정보 */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  배송지 정보
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      우편번호 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={shippingInfo.zipCode}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="12345"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      주소 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="서울시 강남구 테헤란로 123"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      상세주소
                    </label>
                    <input
                      type="text"
                      name="detailAddress"
                      value={shippingInfo.detailAddress}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="아파트 동/호수, 건물명 등"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      배송 메시지
                    </label>
                    <textarea
                      name="message"
                      value={shippingInfo.message}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="배송 시 요청사항을 입력해주세요"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 주문 요약 */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  주문 상품
                </h2>

                <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                      <div className="w-16 h-16 relative flex-shrink-0">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover rounded"
                          sizes="64px"
                          unoptimized
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {item.product.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {formatKRW(item.product.price)} × {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <hr className="my-4" />

                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>상품 금액</span>
                    <span>{formatKRW(getTotalPrice())}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>배송비</span>
                    <span className="text-green-600">무료</span>
                  </div>
                  <hr />
                  <div className="flex justify-between text-xl font-bold">
                    <span>총 결제금액</span>
                    <span className="text-green-600">
                      {formatKRW(getTotalPrice())}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "처리 중..." : "결제하기"}
                </button>

                <Link
                  href="/cart"
                  className="block text-center mt-4 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  장바구니로 돌아가기
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
