"use client";

import { use } from "react";
import { useProduct } from "@/hooks/useProduct";
import Image from "next/image";
import { formatKRW } from "@/lib/money";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const resolevdParams = use(params);
  const { data: product, isLoading, error } = useProduct(resolevdParams.id);

  const onAddToCart = () => {
    alert(`${product?.name}장바구니에 담겼습니다!`);
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
    <div className="min-h-screen bg-gray-50">
      {/* 뒤로가기 버튼 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6 cursor-pointer"
        >
          <svg
            className="w-5 h-5"
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
          뒤로가기
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 이미지 영역 */}
          <div className="space-y-4">
            {/* 메인 이미지 */}
            <div className="aspect-square overflow-hidden bg-white rounded-lg shadow-md relative">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized
              />
            </div>
          </div>

          {/* 제품 정보 영역 */}
          <div className="space-y-6">
            {/* 제품 기본 정보 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="space-y-4">
                {/* 카테고리 & 평점 */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">★</span>
                    <span className="font-semibold">{product.rating}</span>
                    <span className="text-gray-500">
                      ({product.reviewCount})
                    </span>
                  </div>
                </div>

                {/* 제품명 */}
                <h1 className="text-3xl font-bold text-gray-900">
                  {product.name}
                </h1>

                {/* 가격 */}
                <div className="text-4xl font-bold text-green-600">
                  {formatKRW(product.price)}원
                </div>

                {/* 재고 상태 */}
                <div className="flex items-center gap-2">
                  {product.stock > 0 ? (
                    <span className="text-green-600 font-medium">
                      ✅ 재고 {product.stock}개 남음
                    </span>
                  ) : (
                    <span className="text-green-600 font-medium">❌ 품절</span>
                  )}
                </div>

                {/* 설명 */}
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>

            {/* 장바구니 담기 버튼 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <button
                disabled={product.stock === 0}
                className="w-full py-4 px-6 rounded-lg font-semibold text-lg bg-blue-600 text-white hover:bg-blue-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-3 cursor-pointer"
                onClick={onAddToCart}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                  />
                </svg>
                {product.stock > 0 ? "장바구니에 담기" : "품절"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
