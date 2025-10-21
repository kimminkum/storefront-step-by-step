"use client";

import { useState, useEffect } from "react";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { useDebounceValue } from "@/lib/debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formatKRW } from "@/lib/money";
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
    <div className="p-4 space-y-4">
      <input
        value={filters.search ?? ""}
        onChange={onSearchChange}
        placeholder="검색어를 입력해주세요."
        className="w-full max-w-sm border rounded px-3 py-2"
      />
      <select
        value={filters.category ?? ""}
        onChange={onCategoryChange}
        disabled={catLoading}
        className="border rounded px-3 py-2"
      >
        <option value="">전체 카테고리</option>
        {(categories ?? []).map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <div className="flex items-center gap-3">
        <label className="text-sm text-gray-600">정렬</label>
        <select
          value={filters.sortBy ?? "createdAt"}
          onChange={onSortByChange}
          className="border rounded px-3 py-2"
        >
          <option value="createdAt">최신순</option>
          <option value="name">이름</option>
          <option value="price">가격</option>
          <option value="rating">평점</option>
        </select>

        <button
          onClick={onToggleOrder}
          type="button"
          className="border rounded px-3 py-2"
          title="정렬 방향 토글"
        >
          {filters.sortOrder === "asc" ? "오름차순" : "내림차순"}
        </button>
      </div>

      {catError && (
        <span className="text-sm text-red-600">
          카테고리를 불러오지 못했어요.
        </span>
      )}

      {isLoading && <div>잠시만 기다려 주세요...</div>}
      {error && <div> 죄송합니다. Error: {String(error)}</div>}

      <ul className="grid grid-cols-2 gap-4">
        {items.map((p) => (
          <li key={p.id} className="border rounded p-3">
            <div className="font-semibold">{p.name}</div>
            <div className="text-sm text-gray-600">{formatKRW(p.price)}</div>
          </li>
        ))}
        {!isLoading && items.length === 0 && (
          <li className="col-span-full text-gray-500">No result</li>
        )}
      </ul>

      <div className="flex items-center gap-2">
        <button
          onClick={prevClick}
          disabled={page <= 1}
          className="border rounded px-3 py-1 cursor-pointer disabled:opacity-50 disabled:cursor-default"
        >
          Prev
        </button>
        <span>
          Page {page} / {Math.max(1, totalPages)}
        </span>
        <button
          onClick={nextClick}
          disabled={page >= totalPages}
          className="px-3 py-1 border rounded  cursor-pointer disabled:opacity-50 disabled:cursor-default"
        >
          Next
        </button>
      </div>
    </div>
  );
}
