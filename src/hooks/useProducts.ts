"use client";
import { useQuery } from "@tanstack/react-query";
import { productService } from "@/services/productService";
import type { Product } from "@/types/product";

export type Paginated<T> = {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
};

export function useProducts(params: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}) {
  return useQuery<Paginated<Product>, Error>({
    queryKey: ["products", params],
    queryFn: () => productService.list(params),
    // v5 패턴: 이전 페이지 데이터 유지
    placeholderData: (prev) => prev
  });
}
