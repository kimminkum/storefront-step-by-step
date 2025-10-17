import type { PaginatedResponse, Product } from "@/types";

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
    const price = Math.floor(Math.random() * 1000) + 10;
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

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

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

async function getProducts(params: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sortBy?: "name" | "price" | "rating" | "createdAt";
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
  } = params;

  let filteredProducts = [...DB];

  if (search) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
        product.description.toLowerCase().includes(search.toLocaleLowerCase())
    );
  }

  if (category) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === category
    );
  }

  if (minPrice !== undefined) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= minPrice
    );
  }

  if (maxPrice !== undefined) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price <= maxPrice
    );
  }

  if (inStock !== null) {
    filteredProducts = filteredProducts.filter(
      (product) => product.stock > 0 === inStock
    );
  }

  filteredProducts.sort((a, b) => comPareBy(a, b, sortBy, sortOrder));

  await delay(300);

  return paginate(filteredProducts, page, limit);
}

async function getProduct(id: string) {
  await delay(200);
  const found = DB.find((p) => p.id === id);
  if (!found) throw new Error("Product not found");
  return found;
}

async function getCategories(): Promise<string[]> {
  const sorted = Array.from(new Set(DB.map((p) => p.category))).sort();
  await delay(150);
  return sorted;
}

export const productService = {
  getCategories,
  getProducts,
  getProduct
};
