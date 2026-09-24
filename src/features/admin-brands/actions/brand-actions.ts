"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAdminAccessToken } from "@/features/admin-api/server/admin-api";
import { ADMIN_API_BASE_URL } from "@/features/admin-auth/data/auth-constants";
import type { BrandMutationState } from "@/features/admin-brands/data/brand-mutation-state";

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

function revalidateBrandPages() {
  revalidatePath("/admin");
  revalidatePath("/admin/thuong-hieu");
  revalidatePath("/admin/san-pham");
}

function brandPayload(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const image = formData.get("image");
  if (!name) return { error: "Vui lòng nhập tên thương hiệu." } as const;

  const payload = new FormData();
  payload.set("name", name);
  payload.set("description", description);
  // An absent image is intentional during editing: C# must retain the current one.
  if (image instanceof File && image.size > 0) payload.set("image", image);
  return { payload } as const;
}

async function mutateBrand(path: string, method: "POST" | "PUT", formData: FormData): Promise<BrandMutationState> {
  const data = brandPayload(formData);
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
    return { error: "Không thể kết nối đến máy chủ. Vui lòng thử lại." };
  }

  if (response.status === 401 || response.status === 403) redirect("/admin/login");
  if (!response.ok) return { error: await responseMessage(response) };
  return { success: await responseMessage(response) };
}

/** Sends multipart/form-data to the C# Brand DTO; fetch creates the boundary automatically. */
export async function createBrand(_: BrandMutationState, formData: FormData): Promise<BrandMutationState> {
  const result = await mutateBrand("/api/Brands", "POST", formData);
  if (result.error) return result;
  revalidateBrandPages();
  redirect("/admin/thuong-hieu");
}

export async function updateBrand(id: string, _: BrandMutationState, formData: FormData): Promise<BrandMutationState> {
  if (!id) return { error: "Không xác định được thương hiệu cần cập nhật." };
  const result = await mutateBrand(`/api/Brands/${encodeURIComponent(id)}`, "PUT", formData);
  if (result.error) return result;
  revalidateBrandPages();
  redirect("/admin/thuong-hieu");
}

export async function deleteBrand(id: string): Promise<BrandMutationState> {
  if (!id) return { error: "Không xác định được thương hiệu cần xóa." };
  const token = await getAdminAccessToken();
  let response: Response;
  try {
    response = await fetch(`${ADMIN_API_BASE_URL}/api/Brands/${encodeURIComponent(id)}`, {
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
  revalidateBrandPages();
  return { success: message };
}
