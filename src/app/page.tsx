"use client";

import Link from "next/link";
import { useCartStore } from "@/stores/cartStore";

export default function Home() {
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Store
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              최고의 상품을 최저가로 만나보세요
              <br />
              프론트엔드 개발자의 포트폴리오 프로젝트
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/products"
                className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all hover:scale-105 shadow-lg hover:shadow-xl"
              >
                🛍️ 쇼핑 시작하기
              </Link>
              <Link
                href="/events"
                className="px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-all hover:scale-105 shadow-lg hover:shadow-xl border-2 border-gray-200"
              >
                🎨 기술 쇼케이스
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            주요 기능
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 animate-slide-up">
              <div className="text-5xl mb-4">🛒</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                장바구니 시스템
              </h3>
              <p className="text-gray-600">
                Zustand를 활용한 상태 관리와 LocalStorage 영속성으로 완벽한
                장바구니 경험을 제공합니다.
              </p>
            </div>
            <div
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 animate-slide-up"
              style={{ animationDelay: "100ms" }}
            >
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                검색 & 필터
              </h3>
              <p className="text-gray-600">
                실시간 검색, 카테고리 필터, 정렬 기능으로 원하는 상품을 빠르게
                찾을 수 있습니다.
              </p>
            </div>
            <div
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 animate-slide-up"
              style={{ animationDelay: "200ms" }}
            >
              <div className="text-5xl mb-4">📦</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                주문 시스템
              </h3>
              <p className="text-gray-600">
                간편한 체크아웃 플로우와 주문 관리 시스템으로 편리한 쇼핑을
                경험하세요.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
            기술 스택
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            최신 기술 스택으로 구현한 현대적인 E-Commerce 플랫폼
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: "Next.js 15", color: "from-black to-gray-800" },
              { name: "React 19", color: "from-blue-500 to-cyan-500" },
              { name: "TypeScript", color: "from-blue-600 to-blue-700" },
              { name: "Tailwind CSS", color: "from-cyan-500 to-blue-500" },
              { name: "Zustand", color: "from-purple-600 to-pink-600" },
              { name: "React Query", color: "from-red-500 to-orange-500" }
            ].map((tech, index) => (
              <div
                key={tech.name}
                className={`px-6 py-3 bg-gradient-to-r ${tech.color} text-white rounded-full shadow-md hover:shadow-lg transition-all hover:scale-110 font-semibold animate-fade-in`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {tech.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            지금 바로 시작하세요
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {totalItems > 0
              ? `장바구니에 ${totalItems}개의 상품이 담겨있습니다`
              : "다양한 상품을 둘러보고 장바구니에 담아보세요"}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/products"
              className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all hover:scale-105 shadow-lg"
            >
              상품 둘러보기
            </Link>
            {totalItems > 0 && (
              <Link
                href="/cart"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all hover:scale-105"
              >
                장바구니 보기
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="animate-slide-up">
              <div className="text-5xl font-bold text-blue-600 mb-2">100+</div>
              <div className="text-gray-600 font-semibold">상품</div>
            </div>
            <div
              className="animate-slide-up"
              style={{ animationDelay: "100ms" }}
            >
              <div className="text-5xl font-bold text-purple-600 mb-2">20+</div>
              <div className="text-gray-600 font-semibold">기술 스킬</div>
            </div>
            <div
              className="animate-slide-up"
              style={{ animationDelay: "200ms" }}
            >
              <div className="text-5xl font-bold text-pink-600 mb-2">100%</div>
              <div className="text-gray-600 font-semibold">만족도</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
