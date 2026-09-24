"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_API_BASE_URL, ADMIN_AUTH_COOKIE } from "@/features/admin-auth/data/auth-constants";
import type { LoginState } from "@/features/admin-auth/data/login-state";

type LoginResponse = {
  token?: unknown;
  Token?: unknown;
  accessToken?: unknown;
  AccessToken?: unknown;
  data?: { token?: unknown; Token?: unknown; accessToken?: unknown; AccessToken?: unknown };
};

function getToken(payload: LoginResponse): string | null {
  const candidate = payload.token ?? payload.Token ?? payload.accessToken ?? payload.AccessToken ?? payload.data?.token ?? payload.data?.Token ?? payload.data?.accessToken ?? payload.data?.AccessToken;
  return typeof candidate === "string" && candidate.length > 0 ? candidate : null;
}

async function readFailureMessage(response: Response): Promise<string> {
  const errorText = (await response.text()).trim();
  if (errorText) return errorText;

  return response.status === 400 || response.status === 401
    ? "Tên đăng nhập hoặc mật khẩu không chính xác."
    : "Không thể kết nối đến hệ thống xác thực. Vui lòng thử lại.";
}

/** Authenticates against the .NET API and keeps the JWT out of browser JavaScript. */
export async function login(_: LoginState, formData: FormData): Promise<LoginState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const rememberSession = formData.get("rememberSession") === "on";

  if (!username || !password) return { error: "Vui lòng nhập tên đăng nhập và mật khẩu." };

  let response: Response;
  try {
    response = await fetch(`${ADMIN_API_BASE_URL}/api/Auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ username, password }),
      cache: "no-store",
    });
  } catch {
    return { error: "Không thể kết nối đến máy chủ. Vui lòng kiểm tra đường truyền và thử lại." };
  }

  if (!response.ok) return { error: await readFailureMessage(response) };

  let payload: LoginResponse;
  try {
    payload = (await response.json()) as LoginResponse;
  } catch {
    return { error: "Phản hồi đăng nhập từ máy chủ không hợp lệ." };
  }

  const token = getToken(payload);
  if (!token) return { error: "Máy chủ không trả về access token hợp lệ." };

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_AUTH_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    ...(rememberSession ? { maxAge: 60 * 60 * 8 } : {}),
  });

  redirect("/admin");
}
