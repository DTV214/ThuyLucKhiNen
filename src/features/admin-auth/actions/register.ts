"use server";

import { ADMIN_API_BASE_URL } from "@/features/admin-auth/data/auth-constants";
import type { LoginState } from "@/features/admin-auth/data/login-state";

async function responseText(response: Response) {
  const text = (await response.text()).trim();
  return text || "Không thể hoàn tất yêu cầu. Vui lòng thử lại.";
}

/** Temporary bootstrap action. Remove with the public C# register endpoint after first admin creation. */
export async function registerAdmin(_: LoginState, formData: FormData): Promise<LoginState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (!username) return { error: "Vui lòng nhập tên đăng nhập." };
  if (!password) return { error: "Vui lòng nhập mật khẩu." };
  if (password !== confirmPassword) return { error: "Xác nhận mật khẩu không khớp." };

  try {
    const response = await fetch(`${ADMIN_API_BASE_URL}/api/Auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "text/plain, application/json" },
      body: JSON.stringify({ username, password }),
      cache: "no-store",
    });
    const message = await responseText(response);
    return response.ok ? { message } : { error: message };
  } catch {
    return { error: "Không thể kết nối đến máy chủ. Vui lòng kiểm tra đường truyền và thử lại." };
  }
}
