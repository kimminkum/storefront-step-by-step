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
}
