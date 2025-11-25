import type { Product, PaginatedResponse } from "@/types";

export const productService = {
  async getProducts(): Promise<PaginatedResponse<Product>> {
    throw new Error("Real ProductService.getProducts not implemented");
  },
  async getProduct(): Promise<Product> {
    throw new Error("REAL productService.getProduct not implemented");
  },
  async getCategories(): Promise<string[]> {
    throw new Error("REAL productService.getCategories not implemented");
  }
};
