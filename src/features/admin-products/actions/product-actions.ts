"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ADMIN_API_BASE_URL } from "@/features/admin-auth/data/auth-constants";
import { getAdminAccessToken } from "@/features/admin-api/server/admin-api";
import type { ProductMutationState } from "@/features/admin-products/data/product-mutation-state";

function stringValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

async function responseMessage(response: Response) {
  const text = (await response.text()).trim();
  if (!text) return response.ok ? "Thao tác thành công." : "Không thể hoàn tất thao tác. Vui lòng thử lại.";

  try {
    const payload = JSON.parse(text) as { detail?: string; title?: string; errors?: Record<string, string[] | undefined> };
    const messages = Object.values(payload.errors ?? {}).flatMap((items) => items ?? []).filter(Boolean);
    return messages.join(" ") || payload.detail || payload.title || text;
  } catch {
    return text;
  }
}

function technicalSpecsValue(value: string) {
  try {
    const parsed: unknown = JSON.parse(value || "[]");
    return Array.isArray(parsed) ? JSON.stringify(parsed) : null;
  } catch {
    return null;
  }
}

function productPayload(formData: FormData, imageRequired: boolean) {
  const name = stringValue(formData, "Name");
  const sku = stringValue(formData, "sku");
  const description = stringValue(formData, "Description");
  const stockValue = Number(stringValue(formData, "StockQuantity"));
  const isActive = stringValue(formData, "IsActive").toLowerCase() === "true";
  const categoryId = stringValue(formData, "CategoryId");
  const brandId = stringValue(formData, "BrandId");
  const technicalSpecs = technicalSpecsValue(stringValue(formData, "technicalSpecs"));
  const images = formData.getAll("Images").filter((value): value is File => value instanceof File && value.size > 0);

  if (!name || !description || !categoryId || !brandId) {
    return { error: "Vui lòng điền đầy đủ thông tin sản phẩm." } as const;
  }
  if (!Number.isFinite(stockValue) || stockValue < 0) return { error: "Trạng thái tồn kho không hợp lệ." } as const;
  if (technicalSpecs === null) return { error: "Thông số kỹ thuật không đúng định dạng." } as const;
  if (images.length > 3) return { error: "Mỗi sản phẩm chỉ được có tối đa 3 ảnh." } as const;
  if (imageRequired && images.length === 0) return { error: "Vui lòng chọn ít nhất một ảnh sản phẩm." } as const;

  const payload = new FormData();
  payload.set("Name", name);
  payload.set("sku", sku);
  payload.set("Description", description);
  // Price is intentionally private in the B2B catalogue; C# receives zero.
  payload.set("Price", "0");
  // FormData is textual by nature; normalize it before serialization so C# sees
  // the intended catalogue values (100 = in stock, 0 = out of stock).
  payload.set("StockQuantity", String(stockValue > 0 ? 100 : 0));
  payload.set("IsActive", String(isActive));
  payload.set("isActive", String(isActive));
  payload.set("CategoryId", categoryId);
  payload.set("BrandId", brandId);
  payload.set("technicalSpecs", technicalSpecs);
  // Repeated key "Images" binds directly to List<IFormFile> in ASP.NET Core.
  images.forEach((image) => payload.append("Images", image));
  return { payload } as const;
}

async function mutateProduct(path: string, method: "POST" | "PUT", formData: FormData, imageRequired: boolean): Promise<ProductMutationState> {
  const data = productPayload(formData, imageRequired);
  if ("error" in data) return data;

  const token = await getAdminAccessToken();
  let response: Response;
  try {
    response = await fetch(`${ADMIN_API_BASE_URL}${path}`, {
      method,
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json, text/plain" },
      body: data.payload,
      cache: "no-store",
    });
  } catch {
    return { error: "Kích thước dữ liệu quá lớn hoặc mất kết nối. Vui lòng thử lại." };
  }
  if (response.status === 401 || response.status === 403) redirect("/admin/login");
  if (response.status === 413 || response.status >= 500) {
    return { error: "Kích thước dữ liệu quá lớn hoặc máy chủ đang gặp sự cố. Vui lòng thử lại." };
  }
  if (!response.ok) return { error: await responseMessage(response) };
  return { success: await responseMessage(response) };
}

function revalidateProductPages() {
  revalidatePath("/admin");
  revalidatePath("/admin/san-pham");
}

/** Sends multipart/form-data to C#; fetch creates the boundary automatically. */
export async function createProduct(_: ProductMutationState, formData: FormData): Promise<ProductMutationState> {
  const result = await mutateProduct("/api/Products", "POST", formData, true);
  if (result.error) return result;
  revalidateProductPages();
  redirect("/admin/san-pham");
}

export async function updateProduct(id: string, _: ProductMutationState, formData: FormData): Promise<ProductMutationState> {
  if (!id) return { error: "Không xác định được sản phẩm cần cập nhật." };
  const result = await mutateProduct(`/api/Products/${encodeURIComponent(id)}`, "PUT", formData, false);
  if (result.error) return result;
  revalidateProductPages();
  redirect("/admin/san-pham");
}

export async function deleteProduct(id: string): Promise<ProductMutationState> {
  if (!id) return { error: "Không xác định được sản phẩm cần xóa." };
  const token = await getAdminAccessToken();
  let response: Response;
  try {
    response = await fetch(`${ADMIN_API_BASE_URL}/api/Products/${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json, text/plain" },
      cache: "no-store",
    });
  } catch {
    return { error: "Không thể kết nối đến máy chủ. Vui lòng thử lại." };
  }

  if (response.status === 401 || response.status === 403) redirect("/admin/login");
  const message = await responseMessage(response);
  if (!response.ok) return { error: message };
  revalidateProductPages();
  return { success: message };
}
