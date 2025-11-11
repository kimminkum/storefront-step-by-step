"use client";

import { useState } from "react";
import type { Product } from "@/types";
import { formatKRW } from "@/lib/money";
import Image from "next/image";
import Link from "next/link";
import { Rating } from "@/components/Rating";
import { Badge } from "@/components/ui/Badge";
import { useCartStore } from "@/stores/cartStore";
import { useToastStore } from "@/stores/toastStore";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [imageError, setImageError] = useState<boolean>(false);
  const addToCart = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const cartItems = useCartStore((state) => state.items);
  const isInCart = cartItems.some((item) => item.product.id === product.id);
  const addToast = useToastStore((state) => state.addToast);

  const isNew = () => {
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return new Date(product.createdAt).getTime() > sevenDaysAgo;
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInCart) {
      removeItem(product.id);
      addToast(`${product.name}을(를) 장바구니에서 제거했습니다!`, "info");
    } else {
      addToCart(product, 1);
      addToast(`${product.name}을(를) 장바구니에 담았습니다!`, "success");
    }
  };

  const isLowStock = product.stock > 0 && product.stock <= 5;
  const isOutOfStock = product.stock === 0;

  return (
    <Link href={`/products/${product.id}`} className="block">
      <div className="bg-white border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow group">
        <div className="relative aspect-square bg-gray-100">
          <div className="absolute top-2 left-2 z-10 flex flex-col gap-2">
            {isNew() && <Badge variant="new">New</Badge>}
            {isLowStock && <Badge variant="warning">재고 부족</Badge>}
            {isOutOfStock && <Badge variant="danger">품절</Badge>}
          </div>

          {/* 장바구니 담기 버튼 */}
          <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`w-10 h-10 rounded-full shadow-md flex items-center justify-center transition-colors ${
                isInCart
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-white hover:bg-blue-50"
              } disabled:bg-gray-100 disabled:cursor-not-allowed`}
              title={isInCart ? "장바구니에서 제거" : "장바구니에 담기"}
            >
              {isInCart ? (
                // 체크 아이콘
                <svg
                  className="w-5 h-5 text-white"
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
              ) : (
                // 장바구니 아이콘 (간단한 쇼핑백 디자인)
                <svg
                  className="w-5 h-5 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              )}
            </button>
          </div>

          {!imageError ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
              onError={() => setImageError(true)}
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <div className="text-center text-gray-400">
                <div className="text-4xl mb-2">📦</div>
                <div className="text-sm">이미지 없음</div>
              </div>
            </div>
          )}
        </div>
        <div className="p-4 space-y-2">
          <p className="text-xs text-gray-500 uppercase">{product.category}</p>
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <Rating
            rating={product.rating}
            reviewCount={product.reviewCount}
          ></Rating>
          <p className="text-xl font-bold text-gray-900">
            {formatKRW(product.price)}
          </p>
          <p className="text-sm text-gray-600">재고: {product.stock}개</p>
        </div>
      </div>
    </Link>
  );
};
