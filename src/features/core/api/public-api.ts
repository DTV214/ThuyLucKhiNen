import "server-only";

const API_BASE_URL =
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "https://thanhdanhvmc-api.onrender.com";

const REVALIDATE_SECONDS = 60;

export type TechnicalSpec = Readonly<{
  label: string;
  value: string;
}>;

export type PublicProduct = Readonly<{
  id: string;
  slug: string;
  name: string;
  sku: string;
  description: string;
  imageUrl: string | null;
  imageGallery: ReadonlyArray<string>;
  categoryId: string | null;
  categoryName: string;
  brandId: string | null;
  brandName: string;
  stockQuantity: number;
  isActive: boolean;
  technicalSpecs: ReadonlyArray<TechnicalSpec>;
}>;

export type PublicEntity = Readonly<{
  id: string;
  name: string;
  description: string;
  imageUrl: string | null;
}>;

export type PublicPagedResult<T> = Readonly<{
  items: ReadonlyArray<T>;
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
}>;

type ProductQuery = Readonly<{
  page?: number;
  pageSize?: number;
  search?: string;
  categoryId?: string | number;
  brandId?: string | number;
}>;

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function read(record: UnknownRecord, camelCase: string, pascalCase: string) {
  return record[camelCase] ?? record[pascalCase];
}

function asText(value: unknown, fallback = ""): string {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number") return String(value);
  return fallback;
}

function asNumber(value: unknown, fallback = 0): number {
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function asBoolean(value: unknown, fallback = true): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return value.trim().toLowerCase() === "true";
  return fallback;
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parseStringArray(value: unknown): string[] {
  let candidate = value;

  if (typeof candidate === "string") {
    try {
      candidate = JSON.parse(candidate) as unknown;
    } catch {
      return [];
    }
  }

  return Array.isArray(candidate)
    ? candidate.filter((item): item is string => typeof item === "string" && item.length > 0)
    : [];
}

function parseTechnicalSpecs(value: unknown): TechnicalSpec[] {
  let candidate = value;

  if (typeof candidate === "string") {
    try {
      candidate = JSON.parse(candidate) as unknown;
    } catch {
      return [];
    }
  }

  if (Array.isArray(candidate)) {
    return candidate.flatMap((item) => {
      if (!isRecord(item)) return [];
      const label = asText(read(item, "label", "Label"));
      const specValue = asText(read(item, "value", "Value"));
      return label && specValue ? [{ label, value: specValue }] : [];
    });
  }

  if (isRecord(candidate)) {
    return Object.entries(candidate).flatMap(([label, specValue]) => {
      const valueText = asText(specValue);
      return label && valueText ? [{ label, value: valueText }] : [];
    });
  }

  return [];
}

function toProduct(value: unknown): PublicProduct | null {
  if (!isRecord(value)) return null;

  const name = asText(read(value, "name", "Name"));
  const id = asText(read(value, "id", "Id"));
  if (!id || !name) return null;

  const category = read(value, "category", "Category");
  const brand = read(value, "brand", "Brand");
  const categoryRecord = isRecord(category) ? category : undefined;
  const brandRecord = isRecord(brand) ? brand : undefined;
  const imageUrl = asText(read(value, "imageUrl", "ImageUrl")) || null;

  return {
    id,
    slug: asText(read(value, "slug", "Slug")) || slugify(name),
    name,
    sku: asText(read(value, "sku", "Sku")),
    description: asText(read(value, "description", "Description")),
    imageUrl,
    imageGallery: parseStringArray(read(value, "imageGallery", "ImageGallery")),
    categoryId:
      asText(read(value, "categoryId", "CategoryId")) ||
      (categoryRecord ? asText(read(categoryRecord, "id", "Id")) : null),
    categoryName:
      asText(read(value, "categoryName", "CategoryName")) ||
      (categoryRecord ? asText(read(categoryRecord, "name", "Name")) : "Chưa phân loại"),
    brandId:
      asText(read(value, "brandId", "BrandId")) ||
      (brandRecord ? asText(read(brandRecord, "id", "Id")) : null),
    brandName:
      asText(read(value, "brandName", "BrandName")) ||
      (brandRecord ? asText(read(brandRecord, "name", "Name")) : "CTY ThanhDanh-VMC"),
    stockQuantity: asNumber(read(value, "stockQuantity", "StockQuantity")),
    isActive: asBoolean(read(value, "isActive", "IsActive")),
    technicalSpecs: parseTechnicalSpecs(read(value, "technicalSpecs", "TechnicalSpecs")),
  };
}

function toEntity(value: unknown): PublicEntity | null {
  if (!isRecord(value)) return null;
  const id = asText(read(value, "id", "Id"));
  const name = asText(read(value, "name", "Name"));
  if (!id || !name) return null;

  return {
    id,
    name,
    description: asText(read(value, "description", "Description")),
    imageUrl: asText(read(value, "imageUrl", "ImageUrl")) || null,
  };
}

function itemsFrom(value: unknown): unknown[] {
  if (Array.isArray(value)) return value;
  if (!isRecord(value)) return [];

  const items = read(value, "items", "Items") ?? read(value, "data", "Data");
  return Array.isArray(items) ? items : [];
}

async function fetchPublic(path: string, query?: Record<string, string | number | undefined>) {
  const searchParams = new URLSearchParams();
  Object.entries(query ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== "") searchParams.set(key, String(value));
  });

  const url = `${API_BASE_URL}${path}${searchParams.size ? `?${searchParams}` : ""}`;

  try {
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) return null;
    return (await response.json()) as unknown;
  } catch {
    // Public pages remain renderable while the hosted API is waking up or unavailable.
    return null;
  }
}

/** Public catalogue data: cached on the Next.js data cache for 60 seconds. */
export async function getPublicProducts(query: ProductQuery = {}): Promise<PublicPagedResult<PublicProduct>> {
  const requestedPage = query.page ?? 1;
  const requestedPageSize = query.pageSize ?? 12;
  const response = await fetchPublic("/api/Products", {
    page: requestedPage,
    pageSize: requestedPageSize,
    search: query.search,
    categoryId: query.categoryId,
    brandId: query.brandId,
  });

  const records = itemsFrom(response);
  const root = isRecord(response) ? response : {};
  const items = records.flatMap((item) => {
    const product = toProduct(item);
    return product && product.isActive ? [product] : [];
  });
  const totalCount = asNumber(read(root, "totalCount", "TotalCount"), items.length);
  const pageSize = asNumber(read(root, "pageSize", "PageSize"), requestedPageSize);
  const currentPage = asNumber(read(root, "currentPage", "CurrentPage"), requestedPage);
  const totalPages = Math.max(1, asNumber(read(root, "totalPages", "TotalPages"), Math.ceil(totalCount / pageSize) || 1));

  return { items, totalCount, pageSize, currentPage, totalPages };
}

export async function getPublicCategories(): Promise<ReadonlyArray<PublicEntity>> {
  const response = await fetchPublic("/api/Categories");
  return itemsFrom(response).flatMap((item) => {
    const entity = toEntity(item);
    return entity ? [entity] : [];
  });
}

export async function getPublicBrands(): Promise<ReadonlyArray<PublicEntity>> {
  const response = await fetchPublic("/api/Brands");
  return itemsFrom(response).flatMap((item) => {
    const entity = toEntity(item);
    return entity ? [entity] : [];
  });
}
