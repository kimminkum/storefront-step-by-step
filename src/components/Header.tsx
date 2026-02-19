"use client";

import { useState } from "react";
import Link from "next/link";
import { CartIcon } from "@/components/CartIcon";
import { useCartStore } from "@/stores/cartStore";

export const Header = () => {
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = (
    <>
      <Link
        href="/products"
        className="text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1 whitespace-nowrap"
        onClick={() => setMenuOpen(false)}
      >
        상품 목록
      </Link>
      <Link
        href="/events"
        className="text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1 whitespace-nowrap"
        onClick={() => setMenuOpen(false)}
      >
        기술 쇼케이스
      </Link>
    </>
  );

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
            className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded shrink-0"
            aria-label="홈으로 이동"
          >
            <div className="text-2xl" aria-hidden="true">
              🛍️
            </div>
            <span className="text-xl font-bold text-gray-900">Store</span>
          </Link>

          {/* 데스크톱: 네비게이션 + 장바구니 */}
          <nav
            className="hidden md:flex items-center gap-6"
            role="navigation"
            aria-label="메인 네비게이션"
          >
            {navLinks}
            <CartIcon totalItems={totalItems} />
          </nav>

          {/* 모바일: 햄버거 + 장바구니 (로고 옆 오른쪽) */}
          <div className="flex md:hidden items-center gap-2 ml-auto">
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
              aria-expanded={menuOpen}
            >
              <span className="sr-only">{menuOpen ? "메뉴 닫기" : "메뉴 열기"}</span>
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
            <CartIcon totalItems={totalItems} />
          </div>
        </div>

        {/* 모바일 메뉴 패널 */}
        {menuOpen && (
          <div
            className="md:hidden border-t border-gray-200 bg-white py-4"
            role="navigation"
            aria-label="모바일 메뉴"
          >
            <div className="flex flex-col gap-1">
              <Link
                href="/products"
                className="px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
                onClick={() => setMenuOpen(false)}
              >
                상품 목록
              </Link>
              <Link
                href="/events"
                className="px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
                onClick={() => setMenuOpen(false)}
              >
                기술 쇼케이스
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
