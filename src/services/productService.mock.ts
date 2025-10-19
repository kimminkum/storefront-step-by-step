import type { PaginatedResponse, Product } from "@/types";
import type { GetProductsParams, ServiceOptions } from "./productService";

const CATEGORIES = [
  "electronics",
  "clothing",
  "books",
  "home",
  "sports",
  "beauty",
  "toys",
  "automotive"
] as const;

function pick<T>(arr: readonly T[]): T {
  if (arr.length === 0) throw new Error("pick() from empty array");
  return arr[Math.floor(Math.random() * arr.length)]!;
}

function generateMockProducts(count: number): Product[] {
  const list: Product[] = [];
  for (let i = 1; i <= count; i++) {
    const category = pick(CATEGORIES);
    const price = (Math.floor(Math.random() * 1000) + 1) * 10_00;
    const stock = Math.floor(Math.random() * 50);
    const rating = Math.round((Math.random() * 2 + 3) * 10) / 10;
    const reviewCount = Math.floor(Math.random() * 500);

    list.push({
      id: `product-${i}`,
      name: `Product ${i} - ${category.charAt(0).toUpperCase()}${category.slice(
        1
      )}`,
      description: `This is a ${category} product.`,
      price,
      image: `https://picsum.photos/300/300?random=${i}`,
      category,
      stock,
      rating,
      reviewCount,
      createdAt: new Date(
        Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000
      ).toISOString()
    });
  }
  return list;
}

const DB: Product[] = generateMockProducts(100);

const delay = (ms: number, signal?: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    const id = setTimeout(() => resolve(), ms);
    const onAbort = () => {
      clearTimeout(id);
      const err = new DOMException("Aborted", "AbortError");
      reject(err);
    };
    if (signal) {
      if (signal.aborted) return onAbort();
      signal.addEventListener("abort", onAbort, { once: true });
    }
  });

function paginate<T>(items: T[], page = 1, limit = 12): PaginatedResponse<T> {
  const total = items.length;
  const safeLimit = Math.max(1, limit);
  const totalPages = Math.max(1, Math.ceil(total / safeLimit));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const start = (safePage - 1) * safeLimit;
  const data = items.slice(start, start + safeLimit);

  return {
    data,
    pagination: {
      page: safePage,
      limit: safeLimit,
      total,
      totalPages,
      hasNext: safePage < totalPages,
      hasPrev: safePage > 1
    }
  };
}

function comPareBy<K extends keyof Product>(
  a: Product,
  b: Product,
  key: K,
  order: "asc" | "desc"
): number {
  const av = a[key];
  const bv = b[key];
  let result = 0;

  if (typeof av === "number" && typeof bv === "number") {
    result = av - bv;
  } else if (typeof av === "string" && typeof bv === "string") {
    const aTime = Date.parse(av);
    const bTime = Date.parse(bv);

    if (!Number.isNaN(aTime) && !Number.isNaN(bTime)) {
      result = aTime - bTime;
    } else {
      result = av.localeCompare(bv);
    }
  } else {
    result = String(av).localeCompare(String(bv));
  }

  return order === "asc" ? result : -result;
}

function normalizeBool(v: unknown): boolean | undefined {
  if (v == null) return undefined;
  if (typeof v === "boolean") return v;
  if (typeof v === "string") {
    const s = v.toLowerCase();
    if (s === "true") return true;
    if (s === "false") return false;
  }
  return undefined;
}

export const productService = {
  async getCategories(opts?: ServiceOptions): Promise<string[]> {
    await delay(150, opts?.signal);
    return Array.from(new Set(DB.map((p) => p.category))).sort();
  },
  async getProducts(
    params: GetProductsParams,
    opts?: ServiceOptions
  ): Promise<PaginatedResponse<Product>> {
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

    const inStockBool = normalizeBool(inStock);

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (category) {
      list = list.filter((p) => p.category === category);
    }

    if (minPrice !== undefined) {
      list = list.filter((p) => p.price >= minPrice);
    }

    if (maxPrice !== undefined) {
      list = list.filter((p) => p.price <= maxPrice);
    }

    if (inStockBool !== undefined) {
      list = list.filter((p) => p.stock > 0 === inStockBool);
    }

    // 4) 정렬
    list.sort((a, b) => comPareBy(a, b, sortBy, sortOrder));

    await delay(300, opts?.signal);
    return paginate(list, page, limit);
  },
  async getProduct(id: string, opts?: ServiceOptions): Promise<Product> {
    const found = DB.find((p) => p.id === id);
    await delay(200, opts?.signal);
    if (!found) throw new Error("Product not found");
    return found;
  }
};
