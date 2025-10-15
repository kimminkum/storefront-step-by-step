"use client";

import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/features/ProductCard";

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error, isFetching } = useProducts({
    page,
    limit: 12
  });

  if (error)
    return <div className="text-red-600">로딩 실패: {error.message}</div>;

  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Products</h2>
          <p className="text-sm text-gray-600">실제 API 연동</p>
        </div>
        <p className="text-sm text-gray-500">
          {data?.pagination.total ?? 0} products{" "}
          {isFetching && (
            <span className="ml-2 animate-pulse">업데이트 중…</span>
          )}
        </p>
      </header>

      {/* 그리드 */}
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading
          ? Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="h-72 animate-pulse rounded-xl border bg-white"
              />
            ))
          : data?.data.map((p) => <ProductCard key={p.id} product={p} />)}
      </section>

      {/* 페이지네이션 */}
      <nav className="mt-6 flex items-center justify-center gap-2">
        <button
          className="rounded border px-3 py-1 text-sm disabled:opacity-50"
          disabled={!data?.pagination.hasPrev}
          onClick={() => setPage((n) => Math.max(1, n - 1))}
        >
          이전
        </button>
        <span className="text-sm text-gray-600">
          {data?.pagination.page ?? 1} / {data?.pagination.totalPages ?? 1}
        </span>
        <button
          className="rounded border px-3 py-1 text-sm disabled:opacity-50"
          disabled={!data?.pagination.hasNext}
          onClick={() => setPage((n) => n + 1)}
        >
          다음
        </button>
      </nav>
    </div>
  );
}
