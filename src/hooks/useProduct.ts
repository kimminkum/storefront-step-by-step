import { useQuery } from "@tanstack/react-query";
import { productService } from "@/services/productService";
import type { Product } from "@/types";

export function useProduct(id: string) {
  return useQuery<Product>({
    queryKey: ["product", id],
    queryFn: ({ signal }) => productService.getProduct(id, { signal }),
    enabled: !!id
  });
}
