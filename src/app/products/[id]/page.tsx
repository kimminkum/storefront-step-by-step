"use client";

import { use } from "react";
import { useProduct } from "@/hooks/useProduct";
import Image from "next/image";
import { formatKRW } from "@/lib/money";
import { useCartStore } from "@/stores/cartStore";
import { useToastStore } from "@/stores/toastStore";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const cartItems = useCartStore((state) => state.items);
  const isInCart = cartItems.some(
    (item) => item.product.id === resolvedParams.id
  );
  const cartItem = cartItems.find(
    (item) => item.product.id === resolvedParams.id
  );

  const { data: product, isLoading, error } = useProduct(resolvedParams.id);

  const addToCart = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const addToast = useToastStore((state) => state.addToast);

  const onAddToCart = () => {
    if (!product) return;

    if (isInCart) {
      removeItem(product.id);
      addToast(`${product.name}을(를) 장바구니에서 제거했습니다!`, "info");
    } else {
      addToCart(product, 1);
      addToast(`${product.name}을(를) 장바구니에 담았습니다!`, "success");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">오류 발생 </h1>
          <p className="text-gray-600">제품을 불러올 수 없습니다.</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-600 mb-2">
            제품을 찾을 수 없습니다.
          </h1>
          <p className="text-gray-600">요청하신 제품이 존재하지 않습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* 뒤로가기 버튼 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <button
          onClick={() => window.history.back()}
          className="group flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-all mb-6 cursor-pointer hover:gap-3"
        >
          <svg
            className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="font-medium">뒤로가기</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* 이미지 영역 */}
          <div className="space-y-4 animate-fade-in">
            {/* 메인 이미지 */}
            <div className="group aspect-square overflow-hidden bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 relative border-4 border-white">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-8 group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized
              />
            </div>

            {/* 배지들 */}
            <div className="flex gap-3 flex-wrap">
              <div className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-semibold shadow-lg flex items-center gap-2">
                <span>🚚</span> 무료배송
              </div>
              <div className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full text-sm font-semibold shadow-lg flex items-center gap-2">
                <span>✨</span> 정품보증
              </div>
              <div className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full text-sm font-semibold shadow-lg flex items-center gap-2">
                <span>🎁</span> 포인트 적립
              </div>
            </div>
          </div>

          {/* 제품 정보 영역 */}
          <div className="space-y-6 animate-slide-up">
            {/* 제품 기본 정보 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/50">
              <div className="space-y-6">
                {/* 카테고리 & 평점 */}
                <div className="flex items-center justify-between">
                  <span className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm font-bold uppercase tracking-wide">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-full">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-lg ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="font-bold text-gray-900">
                      {product.rating}
                    </span>
                    <span className="text-gray-500 text-sm">
                      ({product.reviewCount})
                    </span>
                  </div>
                </div>

                {/* 제품명 */}
                <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                  {product.name}
                </h1>

                {/* 가격 */}
                <div className="flex items-baseline gap-3">
                  <div className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    {formatKRW(product.price)}
                  </div>
                  <span className="text-2xl text-gray-600 font-semibold">
                    원
                  </span>
                </div>

                {/* 재고 상태 */}
                <div className="flex items-center gap-2 p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200">
                  {product.stock > 0 ? (
                    <>
                      <span className="text-2xl">✅</span>
                      <span className="text-green-700 font-bold text-lg">
                        재고 {product.stock}개 남음
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-2xl">❌</span>
                      <span className="text-red-700 font-bold text-lg">
                        품절
                      </span>
                    </>
                  )}
                </div>

                {/* 구분선 */}
                <div className="border-t-2 border-gray-200"></div>

                {/* 설명 */}
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-gray-900">상품 설명</h3>
                  <p className="text-gray-700 leading-relaxed text-base">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>

            {/* 장바구니 담기 버튼 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/50">
              <button
                disabled={product.stock === 0}
                className={`w-full py-5 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3 cursor-pointer shadow-lg ${
                  isInCart
                    ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-green-500/50"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-blue-500/50"
                } disabled:bg-gray-300 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none`}
                onClick={onAddToCart}
              >
                {isInCart ? (
                  <>
                    <svg
                      className="w-7 h-7"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    장바구니에 담김
                  </>
                ) : (
                  <>
                    <svg
                      className="w-7 h-7"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                    {product.stock > 0 ? "장바구니에 담기" : "품절"}
                  </>
                )}
              </button>

              {/* 추가 정보 */}
              <div className="mt-4 pt-4 border-t border-gray-200 space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">📦</span>
                  <span>오늘 주문 시 내일 도착 (서울/경기 기준)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">💳</span>
                  <span>카드 무이자 할부 가능</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-purple-600">🔄</span>
                  <span>30일 이내 무료 반품/교환</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
