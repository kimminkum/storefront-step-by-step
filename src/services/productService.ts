import { apiGet } from "@/lib/api";
import type { Product } from "@/types/product";

export type Paginated<T> = {
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

// 1) 백엔드 응답 원형(예시) — 필요한 걸 최소 가정
type RawProduct = Record<string, unknown>;
type RawList = {
  items?: RawProduct[];
  data?: RawProduct[]; // some APIs use "data"
  total?: number;
  totalPages?: number;
  page?: number;
  limit?: number;
  pagination?: {
    total?: number;
    totalPages?: number;
    page?: number;
    limit?: number;
  };
};

// 2) 원시 → 표준 Product 변환(필드명 맵핑은 여기서 조정)
function mapProduct(r: RawProduct): Product {
  return {
    id: String(r.id ?? r.productId ?? r._id),
    name: String(r.name ?? r.title ?? "Unnamed"),
    description: String(r.description ?? r.desc ?? ""),
    image: String(r.image ?? r.thumbnail ?? "/placeholder.png"),
    category: String(r.category ?? r.type ?? "General"),
    price: Number(r.price ?? r.amount ?? 0),
    rating: Number(r.rating ?? r.rate ?? 0),
    reviewCount: Number(r.reviewCount ?? r.reviews ?? 0),
    stock: Number(r.stock ?? r.inventory ?? 0),
    createdAt: String(r.createdAt ?? r.created_at ?? new Date().toISOString())
  };
}

function normalizeList(
  raw: RawList,
  page: number,
  limit: number
): Paginated<Product> {
  const arr = raw.items ?? raw.data ?? [];
  const p = raw.pagination ?? {};
  const total = Number(p.total ?? raw.total ?? arr.length);
  const totalPages = Number(
    p.totalPages ??
      raw.totalPages ??
      Math.max(1, Math.ceil(total / (p.limit ?? (limit || 1))))
  );
  const curPage = Number(p.page ?? raw.page ?? page);
  const lim = Number(p.limit ?? raw.limit ?? limit);
  return {
    data: arr.map(mapProduct),
    pagination: {
      page: curPage,
      limit: lim,
      total,
      totalPages,
      hasNext: curPage < totalPages,
      hasPrev: curPage > 1
    }
  };
}

// 3) 퍼블릭 API
export const productService = {
  async list(params: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    inStock?: boolean;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }) {
    const { page = 1, limit = 12, ...rest } = params;
    // ✅ 여기를 네 백엔드 규약에 맞춰 path/쿼리명만 맞추면 됨
    const raw = await apiGet<RawList>("/products", {
      query: { page, limit, ...rest }
    });
    return normalizeList(raw, page, limit);
  },
  async get(id: string) {
    const raw = await apiGet<RawProduct>(`/products/${id}`);
    return mapProduct(raw);
  },
  async categories() {
    // 있으면 사용, 없으면 빈 배열
    try {
      const list = await apiGet<Array<{ id?: string; name?: string } | string>>(
        "/categories"
      );
      return list
        .map((c) => (typeof c === "string" ? c : String(c.name ?? c.id ?? "")))
        .filter(Boolean)
        .sort();
    } catch {
      return [];
    }
  }
};
