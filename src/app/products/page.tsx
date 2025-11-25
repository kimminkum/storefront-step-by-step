"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { useDebounceValue } from "@/lib/debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { ProductCardSkeleton } from "@/components/ui/ProductCardSkeleton";
import type { ProductFilters, SortOption, SortOrder } from "@/types";

const FILTER_STORAGE_KEY = "product-filters";

type NavMode = "push" | "replace";

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<HTMLDivElement>(null);

  // LocalStorage에서 필터 복원
  const loadFiltersFromStorage = () => {
    if (typeof window === "undefined") return null;
    try {
      const stored = localStorage.getItem(FILTER_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // 무시
    }
    return null;
  };

  const [page, setPage] = useState<number>(() => {
    const p = Number(searchParams.get("page"));
    return Number.isFinite(p) && p > 0 ? p : 1;
  });

  const [filters, setFilters] = useState<
    ProductFilters & {
      sortBy?: SortOption;
      sortOrder?: SortOrder;
    }
  >(() => {
    // URL 파라미터 우선, 없으면 LocalStorage에서 복원
    const urlSearch = searchParams.get("q");
    const urlCategory = searchParams.get("cat");
    const urlSortBy = searchParams.get("sortBy");
    const urlOrder = searchParams.get("order");

    if (urlSearch || urlCategory || urlSortBy || urlOrder) {
      // URL에 파라미터가 있으면 URL 우선
      return {
        sortBy: (urlSortBy as SortOption) ?? "createdAt",
        sortOrder: (urlOrder as SortOrder) ?? "desc",
        search: urlSearch ?? "",
        category: urlCategory ?? undefined
      };
    }

    // URL에 파라미터가 없으면 LocalStorage에서 복원
    const stored = loadFiltersFromStorage();
    if (stored) {
      return {
        sortBy: stored.sortBy ?? "createdAt",
        sortOrder: stored.sortOrder ?? "desc",
        search: stored.search ?? "",
        category: stored.category ?? undefined
      };
    }

    return {
      sortBy: "createdAt",
      sortOrder: "desc",
      search: "",
      category: undefined
    };
  });

  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [searchInput, setSearchInput] = useState(filters.search ?? "");

  // 필터를 LocalStorage에 저장
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(
        FILTER_STORAGE_KEY,
        JSON.stringify({
          search: filters.search ?? "",
          category: filters.category,
          sortBy: filters.sortBy,
          sortOrder: filters.sortOrder
        })
      );
    } catch {
      // 무시
    }
  }, [filters]);

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

    if (!sameFilters) {
      setFilters(nextFilters);
      setSearchInput(nextFilters.search ?? "");
    }
    if (!samePage) setPage(nextPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // 외부 클릭 시 자동완성 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        autocompleteRef.current &&
        !autocompleteRef.current.contains(event.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setShowAutocomplete(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  // 자동완성용 검색 (제안 목록만 가져오기)
  const { data: autocompleteData } = useProducts({
    search: searchInput.trim().length > 0 ? searchInput : undefined,
    limit: 5
  });

  const autocompleteSuggestions =
    autocompleteData?.data
      ?.map((p) => p.name)
      .filter((name) => name.toLowerCase().includes(searchInput.toLowerCase()))
      .slice(0, 5) ?? [];

  const onSearchChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    setShowAutocomplete(value.length > 0);
    updateQuery({ q: value }, "replace");
  };

  const onSearchFocus = () => {
    if (searchInput.length > 0) {
      setShowAutocomplete(true);
    }
  };

  const selectSuggestion = (suggestion: string) => {
    setSearchInput(suggestion);
    setShowAutocomplete(false);
    updateQuery({ q: suggestion });
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
              <label htmlFor="product-search" className="sr-only">
                상품 검색
              </label>
              <input
                id="product-search"
                ref={searchInputRef}
                value={searchInput}
                onChange={onSearchChange}
                onFocus={onSearchFocus}
                placeholder="상품명이나 설명으로 검색해보세요..."
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                aria-label="상품 검색"
                aria-autocomplete="list"
                aria-expanded={
                  showAutocomplete && autocompleteSuggestions.length > 0
                }
                aria-controls="autocomplete-list"
                role="combobox"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              {showAutocomplete &&
                autocompleteSuggestions.length > 0 &&
                searchInput.length > 0 && (
                  <div
                    id="autocomplete-list"
                    ref={autocompleteRef}
                    className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                    role="listbox"
                    aria-label="검색 제안 목록"
                  >
                    {autocompleteSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => selectSuggestion(suggestion)}
                        className="w-full text-left px-4 py-2 hover:bg-blue-50 focus:bg-blue-50 transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        role="option"
                        aria-selected={false}
                      >
                        <svg
                          className="w-4 h-4 text-gray-400"
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
                        <span className="text-gray-700">{suggestion}</span>
                      </button>
                    ))}
                  </div>
                )}
            </div>

            <div
              className="flex flex-wrap gap-3 items-center"
              role="group"
              aria-label="필터 옵션"
            >
              <label htmlFor="category-filter" className="sr-only">
                카테고리 필터
              </label>
              <div className="relative">
                <select
                  id="category-filter"
                  value={filters.category ?? ""}
                  onChange={onCategoryChange}
                  disabled={catLoading}
                  className="appearance-none pr-10 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white"
                  aria-label="카테고리 선택"
                >
                  <option value="">📦 전체 카테고리</option>
                  {(categories ?? []).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </div>

              <label htmlFor="sort-filter" className="sr-only">
                정렬 기준
              </label>
              <div className="relative">
                <select
                  id="sort-filter"
                  value={filters.sortBy ?? "createdAt"}
                  onChange={onSortByChange}
                  className="appearance-none pr-10 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  aria-label="정렬 기준 선택"
                >
                  <option value="createdAt">🕒 최신순</option>
                  <option value="name">🔤 이름</option>
                  <option value="price">💰 가격</option>
                  <option value="rating">⭐ 평점</option>
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </div>

              <button
                onClick={onToggleOrder}
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors flex items-center gap-2"
                aria-label={`정렬 방향: ${
                  filters.sortOrder === "asc" ? "오름차순" : "내림차순"
                }`}
              >
                {filters.sortOrder === "asc" ? "⬆️ 오름차순" : "⬇️ 내림차순"}
              </button>

              {data && (
                <div
                  className="ml-auto text-sm text-gray-600"
                  role="status"
                  aria-live="polite"
                >
                  총{" "}
                  <span className="font-semibold text-gray-900">
                    {data.pagination.total}
                  </span>
                  개 상품
                </div>
              )}
            </div>

            {catError && (
              <div
                className="text-sm text-red-600"
                role="alert"
                aria-live="assertive"
              >
                카테고리를 불러오지 못했어요.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div
            className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg"
            role="alert"
            aria-live="assertive"
          >
            ❌ 죄송합니다. 오류가 발생했습니다: {String(error)}
          </div>
        )}

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          role="list"
          aria-label="상품 목록"
        >
          {isLoading ? (
            // Skeleton UI
            Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          ) : items.length > 0 ? (
            // 실제 상품 카드
            items.map((product) => (
              <div key={product.id} role="listitem">
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            // 검색 결과 없음
            <div className="col-span-full flex flex-col items-center justify-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                검색 결과가 없습니다.
              </h3>
              <p className="text-gray-600">다른 검색어나 필터를 시도해보세요</p>
            </div>
          )}
        </div>

        <nav
          className="mt-12 flex items-center justify-center gap-2"
          aria-label="페이지네이션"
        >
          <button
            onClick={prevClick}
            disabled={page <= 1}
            className="px-4 py-2 rounded-lg border border-gray-300
          bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed
          disabled:hover:bg-white transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="이전 페이지"
          >
            ← 이전
          </button>
          <div
            className="flex items-center gap-2 px-4"
            role="status"
            aria-live="polite"
          >
            <span className="text-sm text-gray-600">페이지</span>
            <span className="font-bold text-blue-600" aria-current="page">
              {page}
            </span>
            <span className="text-sm text-gray-600">
              / {Math.max(1, totalPages)}{" "}
            </span>
          </div>
          <button
            onClick={nextClick}
            disabled={page >= totalPages}
            className="px-4 py-2 rounded-lg border border-gray-300
            bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed
            disabled:hover:bg-white transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="다음 페이지"
          >
            다음 →
          </button>
        </nav>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">로딩 중...</p>
          </div>
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
