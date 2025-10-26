"use client";

import { useCartStore } from "@/stores/cartStore";
import { formatKRW } from "@/lib/money";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    getTotalItems,
    getTotalPrice
  } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">🛒 장바구니</h1>

          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              장바구니가 비어있습니다
            </h2>
            <p className="text-gray-600 mb-6">상품을 장바구니에 담아보세요!</p>
            <Link
              href="/products"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              쇼핑 계속하기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            🛒 장바구니 ({getTotalItems()}개)
          </h1>
          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-800 transition-colors"
          >
            전체 삭제
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 장바구니 아이템 목록 */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex gap-4">
                  {/* 제품 이미지 */}
                  <div className="w-24 h-24 relative flex-shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover rounded-lg"
                      sizes="96px"
                      unoptimized
                    />
                  </div>

                  {/* 제품 정보 */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">
                      {item.product.name}
                    </h3>
                    <p className="text-gray-600 mb-2">
                      {item.product.category}
                    </p>
                    <p className="text-xl font-bold text-green-600">
                      {formatKRW(item.product.price)}
                    </p>
                  </div>

                  {/* 수량 조절 & 삭제 */}
                  <div className="flex flex-col items-end gap-2">
                    {/* 수량 조절 */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>

                    {/* 삭제 버튼 */}
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 주문 요약 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                주문 요약
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>상품 개수</span>
                  <span>{getTotalItems()}개</span>
                </div>
                <div className="flex justify-between">
                  <span>상품 금액</span>
                  <span>{formatKRW(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between">
                  <span>배송비</span>
                  <span>무료</span>
                </div>
                <hr />
                <div className="flex justify-between text-lg font-bold">
                  <span>총 결제금액</span>
                  <span className="text-green-600">
                    {formatKRW(getTotalPrice())}
                  </span>
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                주문하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
