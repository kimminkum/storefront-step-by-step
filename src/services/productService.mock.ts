import type { Product, PaginatedResponse } from "@/types/product";

/** 리터럴 튜플 + 안전 픽 */
const categories = [
  "electronics",
  "clothing",
  "books",
  "home",
  "sports",
  "beauty",
  "toys",
  "automotive"
] as const;

type Category = (typeof categories)[number];

function pick<T>(arr: readonly T[]): T {
  if (arr.length === 0) throw new Error("pick() from empty array");
  return arr[Math.floor(Math.random() * arr.length)]!;
}

const generateMockProducts = (): Product[] => {
  const products: Product[] = [];
  for (let i = 1; i <= 100; i++) {
    const category: Category = pick(categories);
    const price = Math.floor(Math.random() * 1000) + 10;
    const rating = Math.round((Math.random() * 2 + 3) * 10) / 10; // 3.0~5.0
    const reviewCount = Math.floor(Math.random() * 500);
    const stock = Math.floor(Math.random() * 50);

    products.push({
      id: `product-${i}`,
      name: `Product ${i} - ${
        category.charAt(0).toUpperCase() + category.slice(1)
      }`,
      description: `This is a great ${category} product with excellent quality and features. Perfect for your needs.`,
      price,
      image: `https://picsum.photos/300/300?random=${i}`,
      category,
      stock, // ✅ inStock 제거 (타입에 없음)
      rating,
      reviewCount,
      createdAt: new Date(
        Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000
      ).toISOString(),
      updatedAt: new Date().toISOString()
    });
  }
  return products;
};

const DB: Product[] = generateMockProducts();

/** 페이지네이션 */
function paginate<T>(items: T[], page = 1, limit = 12): PaginatedResponse<T> {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / Math.max(1, limit)));
  const clampedPage = Math.min(Math.max(page, 1), totalPages);
  const start = (clampedPage - 1) * limit;
  const data = items.slice(start, start + limit);
  return {
    data,
    pagination: {
      page: clampedPage,
      limit,
      total,
      totalPages,
      hasNext: clampedPage < totalPages,
      hasPrev: clampedPage > 1
    }
  };
}

/** 안전 비교 */
function compareBy<K extends keyof Product>(
  a: Product,
  b: Product,
  key: K,
  order: "asc" | "desc"
): number {
  const av = a[key];
  const bv = b[key];
  let result = 0;
  if (typeof av === "string" && typeof bv === "string") {
    const aDate = Date.parse(av);
    const bDate = Date.parse(bv);
    result =
      !Number.isNaN(aDate) && !Number.isNaN(bDate)
        ? aDate - bDate
        : av.localeCompare(bv);
  } else if (typeof av === "number" && typeof bv === "number") {
    result = av - bv;
  } else {
    result = String(av).localeCompare(String(bv));
  }
  return order === "asc" ? result : -result;
}

export const productService = {
  async getProducts(params: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    inStock?: boolean; // ✅ 그대로 받되
    sortBy?: keyof Product;
    sortOrder?: "asc" | "desc";
  }): Promise<PaginatedResponse<Product>> {
    const {
      page = 1,
      limit = 12,
      search,
      category,
      minPrice,
      maxPrice,
      inStock,
      sortBy = "createdAt",
      sortOrder = "desc"
    } = params ?? {};

    let list = [...DB];

    // 필터
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    if (category) list = list.filter((p) => p.category === category);
    if (minPrice != null) list = list.filter((p) => p.price >= minPrice);
    if (maxPrice != null) list = list.filter((p) => p.price <= maxPrice);

    // ✅ inStock 필터는 stock 기반으로 판단
    if (inStock != null) list = list.filter((p) => p.stock > 0 === inStock);

    // 정렬
    list.sort((a, b) => compareBy(a, b, sortBy, sortOrder));

    await new Promise((r) => setTimeout(r, 300)); // 지연 시뮬
    return paginate(list, page, limit);
  },

  async getProduct(id: string): Promise<Product> {
    const found = DB.find((p) => p.id === id);
    await new Promise((r) => setTimeout(r, 200));
    if (!found) throw new Error("Product not found");
    return found;
  },

  async getCategories(): Promise<string[]> {
    return Array.from(new Set(DB.map((p) => p.category))).sort();
  }
};
