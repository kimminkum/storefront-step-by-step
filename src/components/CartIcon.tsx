"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

interface CartIconProps {
  totalItems: number;
}

export const CartIcon = ({ totalItems }: CartIconProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const prevTotalItems = useRef(0);

  // totalItems가 변경될 때마다 애니메이션 실행
  useEffect(() => {
    if (totalItems !== prevTotalItems.current && totalItems > 0) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 600);

      prevTotalItems.current = totalItems;
      return () => clearTimeout(timer);
    }
    prevTotalItems.current = totalItems;
  }, [totalItems]);

  return (
    <Link
      href="/cart"
      className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
    >
      {/* 더 간단한 장바구니 아이콘 */}
      <svg
        className={`w-6 h-6 transition-all duration-300 ${
          isAnimating ? "scale-150 rotate-12" : "scale-100 rotate-0"
        }`}
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

      {/* 장바구니 개수 뱃지 - 애니메이션 추가 */}
      {totalItems > 0 && (
        <span
          className={`absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold transition-all duration-300 ${
            isAnimating ? "scale-125" : "scale-100"
          }`}
        >
          {totalItems}
        </span>
      )}
    </Link>
  );
};
