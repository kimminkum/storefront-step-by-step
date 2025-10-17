"use client";

import { useProducts } from "@/hooks/useProducts";

export default function DevProducts() {
  const { data, isLoading, error } = useProducts({
    page: 1,
    limit: 8,
    sortBy: "createdAt",
    sortOrder: "desc",
    search: "pro", // 필요하면 켜서 테스트
    category: "books",
    inStock: true
  });

  if (isLoading) return <div className="p-4">loading...</div>;
  if (error)
    return <div className="p-4 text-red-600">error: {String(error)}</div>;

  return (
    <div className="p-4 space-y-2">
      <div>total: {data?.pagination.total}</div>
      <div>ids: {data?.data.map((p) => p.id).join(", ")}</div>
    </div>
  );
}
