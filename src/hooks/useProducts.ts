import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { productService } from "@/services/productService";

import type { SortOption, SortOrder } from "@/types";

function clean<T extends object>(obj: T): Partial<T> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined && v !== null) out[k] = v;
  }
  return out as Partial<T>;
}

export function useProducts(params: {
  page?: number;
  limit?: number;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  search?: string;
  sortBy?: SortOption;
  sortOrder?: SortOrder;
}) {
  return useQuery({
    queryKey: ["products", clean(params)],
    queryFn: () => productService.getProducts(params),
    placeholderData: keepPreviousData
  });
}
