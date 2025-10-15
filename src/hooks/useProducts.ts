// src/hooks/useProducts.ts
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { productService } from "@/services/productService";
import type {
  Product,
  ProductFilters,
  SortOption,
  SortOrder,
  PaginatedResponse
} from "@/types/product";

/** 목록 (페이지네이션) */
export const useProducts = (params: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sortBy?: SortOption; // keyof Product로 정의해 두었으면 그걸 import해서 사용
  sortOrder?: SortOrder; // "asc" | "desc"
}) => {
  return useQuery<PaginatedResponse<Product>>({
    queryKey: ["products", params],
    queryFn: () => productService.getProducts(params),
    // v5: 이전 페이지 데이터 유지 UX
    placeholderData: (prev) => prev
  });
};

/** 무한스크롤 (원하면 사용하는 옵션) */
export const useInfiniteProducts = (
  filters: ProductFilters & { sortBy?: SortOption; sortOrder?: SortOrder }
) => {
  return useInfiniteQuery({
    queryKey: ["products", "infinite", filters],
    queryFn: ({ pageParam = 1 }) =>
      productService.getProducts({ ...filters, page: pageParam, limit: 12 }),
    getNextPageParam: (last) =>
      last.pagination.hasNext ? last.pagination.page + 1 : undefined,
    initialPageParam: 1,
    placeholderData: (prev) => prev
  });
};

/** 상세 */
export const useProduct = (id: string | undefined) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => productService.getProduct(id as string),
    enabled: !!id
  });
};

/** 카테고리 */
export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => productService.getCategories(),
    staleTime: 30 * 60_000 // 30분
  });
};
