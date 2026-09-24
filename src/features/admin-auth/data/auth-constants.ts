export const ADMIN_AUTH_COOKIE = "thanhdanh_vmc_admin_token";

export const ADMIN_API_BASE_URL =
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "https://thanhdanhvmc-api.onrender.com";
