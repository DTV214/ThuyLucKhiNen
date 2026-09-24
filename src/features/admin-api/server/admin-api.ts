import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_API_BASE_URL, ADMIN_AUTH_COOKIE } from "@/features/admin-auth/data/auth-constants";

export type SelectOption = { id: string; name: string };
export type BrandRecord = { id: string | number; name: string; description?: string | null; imageUrl?: string | null };
export type CategoryRecord = { id: string | number; name: string; description?: string | null; imageUrl?: string | null };

export type ProductRecord = {
  id: string | number;
  name?: string;
  productName?: string;
  sku?: string;
  code?: string;
  description?: string | null;
  imageUrl?: string | null;
  imageGallery?: string | string[] | null;
  categoryId?: string | number;
  categoryName?: string;
  category?: { id?: string | number; name?: string };
  brandId?: string | number;
  brandName?: string;
  brand?: { id?: string | number; name?: string };
  isActive?: boolean | string | null;
  IsActive?: boolean | string | null;
  status?: string;
  stockQuantity?: number | string;
  technicalSpecs?: string | Array<{ label: string; value: string }>;
};

export type PagedResult<T> = {
  items: T[];
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
};

export type ProductQuery = { page?: number; pageSize?: number; search?: string; categoryId?: string; brandId?: string };

export class AdminApiError extends Error {
  constructor(message: string, readonly status: number) { super(message); }
}

function apiUrl(path: string, query?: Record<string, string | number | undefined>) {
  const url = new URL(path, ADMIN_API_BASE_URL);
  Object.entries(query ?? {}).forEach(([key, value]) => { if (value !== undefined && value !== "") url.searchParams.set(key, String(value)); });
  return url;
}

export async function getAdminAccessToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_AUTH_COOKIE)?.value;
  if (!token) redirect("/admin/login");
  return token;
}

async function adminGet<T>(path: string, query?: Record<string, string | number | undefined>): Promise<T> {
  const token = await getAdminAccessToken();
  const response = await fetch(apiUrl(path, query), {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    cache: "no-store",
  });

  if (response.status === 401 || response.status === 403) redirect("/admin/login");
  if (!response.ok) throw new AdminApiError("Không thể tải dữ liệu từ hệ thống quản trị.", response.status);
  return response.json() as Promise<T>;
}

function toOptions(payload: unknown): SelectOption[] {
  const source = Array.isArray(payload) ? payload : (payload as { items?: unknown[] })?.items ?? [];
  return source.flatMap((item): SelectOption[] => {
    if (!item || typeof item !== "object") return [];
    const record = item as Record<string, unknown>;
    const id = record.id ?? record.Id ?? record.categoryId ?? record.CategoryId ?? record.brandId ?? record.BrandId;
    const name = record.name ?? record.Name ?? record.categoryName ?? record.CategoryName ?? record.brandName ?? record.BrandName;
    return id !== undefined && typeof name === "string" ? [{ id: String(id), name }] : [];
  });
}

export async function getCategories() { return toOptions(await adminGet<unknown>("/api/Categories")); }
export async function getBrands() { return toOptions(await adminGet<unknown>("/api/Brands")); }
export async function getBrandRecords(): Promise<BrandRecord[]> {
  const payload = await adminGet<unknown>("/api/Brands");
  const source = Array.isArray(payload) ? payload : (payload as { items?: unknown[] })?.items ?? [];
  return source.flatMap((item): BrandRecord[] => {
    if (!item || typeof item !== "object") return [];
    const record = item as Record<string, unknown>;
    const id = record.id ?? record.Id ?? record.brandId ?? record.BrandId;
    const name = record.name ?? record.Name ?? record.brandName ?? record.BrandName;
    const description = record.description ?? record.Description;
    const imageUrl = record.imageUrl ?? record.ImageUrl;
    return id !== undefined && typeof name === "string" ? [{ id: typeof id === "number" || typeof id === "string" ? id : String(id), name, description: typeof description === "string" ? description : null, imageUrl: typeof imageUrl === "string" ? imageUrl : null }] : [];
  });
}
export async function getCategoryRecords(): Promise<CategoryRecord[]> {
  const payload = await adminGet<unknown>("/api/Categories");
  const source = Array.isArray(payload) ? payload : (payload as { items?: unknown[] })?.items ?? [];
  return source.flatMap((item): CategoryRecord[] => {
    if (!item || typeof item !== "object") return [];
    const record = item as Record<string, unknown>;
    const id = record.id ?? record.Id ?? record.categoryId ?? record.CategoryId;
    const name = record.name ?? record.Name ?? record.categoryName ?? record.CategoryName;
    const description = record.description ?? record.Description;
    const imageUrl = record.imageUrl ?? record.ImageUrl;
    return id !== undefined && typeof name === "string" ? [{ id: typeof id === "number" || typeof id === "string" ? id : String(id), name, description: typeof description === "string" ? description : null, imageUrl: typeof imageUrl === "string" ? imageUrl : null }] : [];
  });
}
export async function getProducts(query: ProductQuery): Promise<PagedResult<ProductRecord>> {
  return adminGet<PagedResult<ProductRecord>>("/api/Products", { page: query.page, pageSize: query.pageSize, search: query.search, categoryId: query.categoryId, brandId: query.brandId });
}
