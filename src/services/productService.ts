import { productService as mockImpl } from "./productService.mock";
import { productService as realImpl } from "./productService.real";

const raw = process.env.NEXT_PUBLICK_USE_MOCK;

const useMock = raw == null ? true : ["true", "1"].includes(raw.toLowerCase());

export type GetProductsParams = {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sortBy?: keyof import("@/types").Product; // 안전 키
  sortOrder?: "asc" | "desc";
};

export type ServiceOptions = { signal?: AbortSignal };

export const productService = useMock ? mockImpl : realImpl;
export type ProductService = typeof productService;
