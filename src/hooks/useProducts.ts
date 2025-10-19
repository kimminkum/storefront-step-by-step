import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { productService } from "@/services/productService";
import type { GetProductsParams } from "@/services/productService";
import type { PaginatedResponse, Product } from "@/types";

function clean<T extends object>(obj: T): Partial<T> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined && v !== null && v !== "") out[k] = v;
  }
  return out as Partial<T>;
}

export function useProducts(params: GetProductsParams) {
  return useQuery<PaginatedResponse<Product>>({
    queryKey: ["products", clean(params)],
    queryFn: ({ signal }) => productService.getProducts(params, { signal }),
    placeholderData: keepPreviousData
  });
}
