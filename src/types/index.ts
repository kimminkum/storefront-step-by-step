export type SortOption = "name" | "price" | "rating" | "createdAt";
export type SortOrder = "asc" | "desc";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  rating: number;
  reviewCount: number;
  createdAt: string;
  // updatedAt: string;
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  search?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// 주문 관련 타입
export interface OrderItem {
  product: Product;
  quantity: number;
  price: number; // 주문 당시 가격
}

export interface ShippingInfo {
  name: string;
  phone: string;
  email: string;
  address: string;
  detailAddress: string;
  zipCode: string;
  message?: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  shippingInfo: ShippingInfo;
  totalPrice: number;
  status: "pending" | "confirmed" | "shipping" | "delivered" | "cancelled";
  createdAt: string;
}
