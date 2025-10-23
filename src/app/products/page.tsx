"use client";

import { useState, useEffect } from "react";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { useDebounceValue } from "@/lib/debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import type { ProductFilters, SortOption, SortOrder } from "@/types";

type NavMode = "push" | "replace";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [page, setPage] = useState<number>(() => {
    const p = Number(searchParams.get("page"));
    return Number.isFinite(p) && p > 0 ? p : 1;
  });

  const [filters, setFilters] = useState<
    ProductFilters & {
      sortBy?: SortOption;
      sortOrder?: SortOrder;
    }
  >({
    sortBy: (searchParams.get("sortBy") as SortOption) ?? "createdAt",
    sortOrder: (searchParams.get("order") as SortOrder) ?? "desc",
    search: searchParams.get("q") ?? "",
    category: searchParams.get("cat") ?? undefined
  });

  useEffect(() => {
    const nextFilters = {
      search: searchParams.get("q") ?? "",
      category: searchParams.get("cat") ?? undefined,
      sortBy: (searchParams.get("sortBy") as SortOption) ?? "createdAt",
      sortOrder: (searchParams.get("order") as SortOrder) ?? "desc"
    };
    const nextPage = (() => {
      const p = Number(searchParams.get("page"));
      return Number.isFinite(p) && p > 0 ? p : 1;
    })();

    const sameFilters =
      filters.search === nextFilters.search &&
      filters.category === nextFilters.category &&
      filters.sortBy === nextFilters.sortBy &&
      filters.sortOrder === nextFilters.sortOrder;

    const samePage = page === nextPage;

    if (!sameFilters) setFilters(nextFilters);
    if (!samePage) setPage(nextPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  function normalizeStr(v: string | undefined) {
    // "", "   " → undefined (삭제 신호)
    const s = v?.trim();
    return s ? s : undefined;
  }

  function updateQuery(
    updates: Partial<{
      q: string | undefined;
      cat: string | undefined;
      sortBy: SortOption | undefined;
      order: SortOrder | undefined;
      page: number | undefined;
    }>,
    mode: NavMode = "push"
  ) {
    const q = updates.q !== undefined ? normalizeStr(updates.q) : undefined;
    const cat =
      updates.cat !== undefined ? normalizeStr(updates.cat) : undefined;

    const nextFilters: typeof filters = {
      ...filters,
      ...(updates.q !== undefined ? { search: q } : {}),
      ...(updates.cat !== undefined ? { category: cat } : {}),
      ...(updates.sortBy !== undefined ? { sortBy: updates.sortBy } : {}),
      ...(updates.order !== undefined ? { sortOrder: updates.order } : {})
    };

    const filtersChanged =
      updates.q !== undefined ||
      updates.cat !== undefined ||
      updates.sortBy !== undefined ||
      updates.order !== undefined;

    let nextPage = updates.page ?? page;
    if (filtersChanged && updates.page === undefined) {
      nextPage = 1;
    }

    const sp = new URLSearchParams();
    if (nextFilters.search) sp.set("q", nextFilters.search);
    if (nextFilters.category) sp.set("cat", nextFilters.category);
    if (nextFilters.sortBy) sp.set("sortBy", nextFilters.sortBy);
    if (nextFilters.sortOrder) sp.set("order", nextFilters.sortOrder);
    if (nextPage > 1) sp.set("page", String(nextPage));

    const qs = sp.toString();
    const url = qs ? `${pathname}?${qs}` : pathname;
    if (mode === "replace") {
      router.replace(url, { scroll: false });
    } else {
      router.push(url, { scroll: false });
    }

    setFilters(nextFilters);
    setPage(nextPage);
  }

  const debouncedSearch = useDebounceValue(filters.search ?? "", 300);
  const {
    data: categories,
    isLoading: catLoading,
    error: catError
  } = useCategories();

  const { data, isLoading, error } = useProducts({
    ...filters,
    search: debouncedSearch,
    page,
    limit: 8
  });

  const onSearchChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    updateQuery({ q: e.target.value }, "replace");
  };
  const onCategoryChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    updateQuery({ cat: e.target.value });
  };

  const onSortByChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const value = e.target.value as SortOption;
    updateQuery({ sortBy: value });
  };

  const onToggleOrder = () => {
    const next = (filters.sortOrder === "asc" ? "desc" : "asc") as SortOrder;
    updateQuery({ order: next });
  };

  const prevClick = () => {
    updateQuery({ page: Math.max(1, page - 1) });
  };
  const nextClick = () => {
    updateQuery({ page: page + 1 });
  };

  const items = data?.data ?? [];
  const totalPages = data?.pagination.totalPages ?? 1;
  // ui등 만들어야하고
  // 필터 전달할 수 있는 search 만들어야하고

  // pagination 바뀌는거
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-white shadow-sm sticky top-0 z-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🛍️ 상품 목록
          </h1>
          <div className="space-y-4">
            <div className="relative">
              <input
                value={filters.search ?? ""}
                onChange={onSearchChange}
                placeholder="상품명이나 설명으로 검색해보세요..."
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <div className="flex flex-wrap gap-3 items-center">
              <select
                value={filters.category ?? ""}
                onChange={onCategoryChange}
                disabled={catLoading}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white"
              >
                <option value="">📦 전체 카테고리</option>
                {(categories ?? []).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <select
                value={filters.sortBy ?? "createdAt"}
                onChange={onSortByChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="createdAt">🕒 최신순</option>
                <option value="name">🔤 이름</option>
                <option value="price">💰 가격</option>
                <option value="rating">⭐ 평점</option>
              </select>

              <button
                onClick={onToggleOrder}
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors flex items-center gap-2"
                title="정렬 방향 토글"
              >
                {filters.sortOrder === "asc" ? "⬆️ 오름차순" : "⬇️ 내림차순"}
              </button>

              {data && (
                <div className="ml-auto text-sm text-gray-600">
                  총{" "}
                  <span className="font-semibold text-gray-900">
                    {data.pagination.total}
                  </span>
                  개 상품
                </div>
              )}
            </div>

            {catError && (
              <span className="text-sm text-red-600">
                카테고리를 불러오지 못했어요.
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <div className="text-gray-600">잠시만 기다려주세요...</div>
          </div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
            ❌ 죄송합니다. 오류가 발생했습니다: {String(error)}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((product) => (
            <ProductCard key={product.id} product={product}></ProductCard>
          ))}
          {!isLoading && items.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                검색 결과가 없습니다.
              </h3>
              <p className="text-gray-600">다른 검색어나 필터를 시도해보세요</p>
            </div>
          )}
        </div>

        <div className="mt-12 flex items-center justify-center gap-2">
          <button
            onClick={prevClick}
            disabled={page <= 1}
            className="px-4 py-2 rounded-lg border border-gray-300
          bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed
          disabled:hover:bg-white transition-colors font-medium"
          >
            ← 이전
          </button>
          <div className="flex items-center gap-2 px-4">
            <span className="text-sm text-gray-600">페이지</span>
            <span className="font-bold text-blue-600">{page}</span>
            <span className="text-sm text-gray-600">
              / {Math.max(1, totalPages)}{" "}
            </span>
          </div>
          <button
            onClick={nextClick}
            disabled={page >= totalPages}
            className="px-4 py-2 rounded-lg border border-gray-300
            bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed
            disabled:hover:bg-white transition-colors font-medium"
          >
            다음 →
          </button>
        </div>
      </div>
    </div>
  );
}
