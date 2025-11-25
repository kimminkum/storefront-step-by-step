"use client";

import Link from "next/link";
import { CartIcon } from "@/components/CartIcon";
import { useCartStore } from "@/stores/cartStore";

export const Header = () => {
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header
      className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50"
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <Link
            href="/"
            className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
            aria-label="홈으로 이동"
          >
            <div className="text-2xl" aria-hidden="true">
              🛍️
            </div>
            <span className="text-xl font-bold text-gray-900">Store</span>
          </Link>

          {/* 네비게이션 */}
          <nav
            className="flex items-center gap-6"
            role="navigation"
            aria-label="메인 네비게이션"
          >
            <Link
              href="/products"
              className="text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1"
            >
              상품 목록
            </Link>
            <Link
              href="/events"
              className="text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1"
            >
              기술 쇼케이스
            </Link>

            {/* 장바구니 아이콘 */}
            <CartIcon totalItems={totalItems} />
          </nav>
        </div>
      </div>
    </header>
  );
};
