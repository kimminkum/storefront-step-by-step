export type SortOption = "name" | "price" | "rating" | "createdAt";
export type SortOrder = "asc" | "desc";

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  price: number;
  rating: number;
  reviewCount: number;
  stock: number; // 0이면 품절
  createdAt: string; // ISO
  updatedAt?: string; // ✅ 선택 필드로 추가
}

export type PaginatedResponse<T> = {
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

export type ProductFilters = {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  search?: string;
};
