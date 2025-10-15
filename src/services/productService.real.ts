// src/services/productService.real.ts
import type { Product, PaginatedResponse } from "@/types/product";

export const productService = {
  async getProducts(): Promise<PaginatedResponse<Product>> {
    throw new Error("REAL productService.getProducts not implemented yet");
  },
  async getProduct(): Promise<Product> {
    throw new Error("REAL productService.getProduct not implemented yet");
  },
  async getCategories(): Promise<string[]> {
    throw new Error("REAL productService.getCategories not implemented yet");
  }
};
