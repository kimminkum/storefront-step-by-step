"use client";

import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { productService } from "@/services/productService";
import { useDebounceValue } from "@/lib/debounce";
import { formatKRW } from "@/lib/money";
import type {
  Product,
  ProductFilters,
  PaginatedResponse,
  SortOption,
  SortOrder
} from "@/types";

export default function ProductsPage() {
  const [filters, setFilters] = useState<
    ProductFilters & {
      sortBy?: SortOption;
      sortOrder?: SortOrder;
    }
  >({
    sortBy: "createdAt",
    sortOrder: "desc",
    search: ""
  });

  const [page, setPage] = useState<number>(1);

  const debouncedSearch = useDebounceValue(filters.search ?? "", 300);

  const { data, isLoading, error } = useProducts({
    ...filters,
    search: debouncedSearch,
    page,
    limit: 8
  });

  const onSearchChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setFilters((prev) => ({ ...prev, search: e.target.value }));
    setPage(1);
  };

  const filterChanger: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    setFilters((prev) => ({ ...prev, search: value }));
    setPage(1);
  };

  const prevClick = () => {
    setPage((n) => Math.max(1, n - 1));
  };
  const nextClick = () => {
    setPage((n) => n + 1);
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
        onChange={filterChanger}
        placeholder="검색어를 입력해주세요."
        className="w-full max-w-sm border rounded px-3 py-2"
      />

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
