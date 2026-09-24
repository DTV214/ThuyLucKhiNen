"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAdminAccessToken } from "@/features/admin-api/server/admin-api";
import { ADMIN_API_BASE_URL } from "@/features/admin-auth/data/auth-constants";
import type { CategoryMutationState } from "@/features/admin-categories/data/category-mutation-state";

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

function revalidateCategoryPages() {
  revalidatePath("/admin");
  revalidatePath("/admin/danh-muc");
  revalidatePath("/admin/san-pham");
}

function categoryPayload(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const image = formData.get("image");
  if (!name) return { error: "Vui lòng nhập tên danh mục." } as const;

  const payload = new FormData();
  payload.set("name", name);
  payload.set("description", description);
  // No selected replacement image means the backend keeps the existing image.
  if (image instanceof File && image.size > 0) payload.set("image", image);
  return { payload } as const;
}

async function mutateCategory(path: string, method: "POST" | "PUT", formData: FormData): Promise<CategoryMutationState> {
  const data = categoryPayload(formData);
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

export async function createCategory(_: CategoryMutationState, formData: FormData): Promise<CategoryMutationState> {
  const result = await mutateCategory("/api/Categories", "POST", formData);
  if (result.error) return result;
  revalidateCategoryPages();
  redirect("/admin/danh-muc");
}

export async function updateCategory(id: string, _: CategoryMutationState, formData: FormData): Promise<CategoryMutationState> {
  if (!id) return { error: "Không xác định được danh mục cần cập nhật." };
  const result = await mutateCategory(`/api/Categories/${encodeURIComponent(id)}`, "PUT", formData);
  if (result.error) return result;
  revalidateCategoryPages();
  redirect("/admin/danh-muc");
}

export async function deleteCategory(id: string): Promise<CategoryMutationState> {
  if (!id) return { error: "Không xác định được danh mục cần xóa." };
  const token = await getAdminAccessToken();
  let response: Response;
  try {
    response = await fetch(`${ADMIN_API_BASE_URL}/api/Categories/${encodeURIComponent(id)}`, {
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
  revalidateCategoryPages();
  return { success: message };
}
