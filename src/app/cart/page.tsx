"use client";

import { useState } from "react";
import { useCartStore } from "@/stores/cartStore";
import { useToastStore } from "@/stores/toastStore";
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
  const addToast = useToastStore((state) => state.addToast);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
    if (newQuantity === 0) {
      addToast("상품을 장바구니에서 제거했습니다", "info");
    }
  };

  const handleRemoveItem = (productId: string, productName: string) => {
    removeItem(productId);
    addToast(`${productName}을(를) 장바구니에서 제거했습니다`, "info");
  };

  const handleClearCart = () => {
    clearCart();
    setShowClearConfirm(false);
    addToast("장바구니를 비웠습니다", "success");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">🛒 장바구니</h1>

          <div className="bg-white rounded-lg shadow-md p-8 text-center animate-fade-in">
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
            onClick={() => setShowClearConfirm(true)}
            className="text-red-600 hover:text-red-800 transition-colors font-medium"
          >
            전체 삭제
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 장바구니 아이템 목록 */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <div
                key={item.product.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex gap-4">
                  {/* 제품 이미지 */}
                  <Link
                    href={`/products/${item.product.id}`}
                    className="w-24 h-24 relative flex-shrink-0 group"
                  >
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover rounded-lg group-hover:scale-105 transition-transform"
                      sizes="96px"
                      unoptimized
                    />
                  </Link>

                  {/* 제품 정보 */}
                  <div className="flex-1">
                    <Link href={`/products/${item.product.id}`}>
                      <h3 className="font-semibold text-lg text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                        {item.product.name}
                      </h3>
                    </Link>
                    <p className="text-gray-600 mb-2 text-sm">
                      {item.product.category}
                    </p>
                    <p className="text-xl font-bold text-green-600">
                      {formatKRW(item.product.price)}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      소계: {formatKRW(item.product.price * item.quantity)}
                    </p>
                  </div>

                  {/* 수량 조절 & 삭제 */}
                  <div className="flex flex-col items-end gap-2">
                    {/* 수량 조절 */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          handleUpdateQuantity(
                            item.product.id,
                            item.quantity - 1
                          )
                        }
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors font-semibold"
                      >
                        -
                      </button>
                      <span className="w-10 text-center font-semibold text-lg">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleUpdateQuantity(
                            item.product.id,
                            item.quantity + 1
                          )
                        }
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors font-semibold"
                      >
                        +
                      </button>
                    </div>

                    {/* 삭제 버튼 */}
                    <button
                      onClick={() =>
                        handleRemoveItem(item.product.id, item.product.name)
                      }
                      className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
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
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24 animate-fade-in">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                주문 요약
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>상품 개수</span>
                  <span className="font-semibold">{getTotalItems()}개</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>상품 금액</span>
                  <span className="font-semibold">
                    {formatKRW(getTotalPrice())}
                  </span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>배송비</span>
                  <span className="font-semibold text-green-600">무료</span>
                </div>
                <hr className="my-3" />
                <div className="flex justify-between text-xl font-bold">
                  <span>총 결제금액</span>
                  <span className="text-green-600">
                    {formatKRW(getTotalPrice())}
                  </span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="block w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-md hover:shadow-lg text-center"
              >
                주문하기
              </Link>

              <Link
                href="/products"
                className="block text-center mt-4 text-gray-600 hover:text-gray-900 transition-colors"
              >
                쇼핑 계속하기
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 전체 삭제 확인 모달 */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4 animate-scale-in">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              장바구니 비우기
            </h3>
            <p className="text-gray-600 mb-6">
              장바구니의 모든 상품을 삭제하시겠습니까?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleClearCart}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
