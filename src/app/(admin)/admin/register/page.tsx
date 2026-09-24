import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { AdminLoginBrand } from "@/features/admin-auth/components/LoginForm";
import { RegisterForm } from "@/features/admin-auth/components/RegisterForm";

export const metadata: Metadata = { title: "Khởi tạo Admin | ThanhDanh-VMC", robots: { index: false, follow: false } };

/** Temporary first-admin bootstrap screen. Remove after the initial administrator exists. */
export default function AdminRegisterPage() {
  return <main className="flex min-h-screen items-center justify-center bg-surface p-4 sm:p-6"><section className="relative w-full max-w-md overflow-hidden rounded-2xl bg-surface-container-lowest shadow-xl"><div className="h-1.5 bg-gradient-to-r from-primary via-primary-container to-secondary-container" /><div className="relative overflow-hidden p-6 sm:p-8"><div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 size-44 rounded-full bg-secondary-fixed/40 blur-3xl" /><AdminLoginBrand /><div className="mt-5 rounded-xl border border-amber-300 bg-amber-50 p-3 text-body-sm leading-5 text-amber-950"><p className="flex items-center gap-1.5 font-semibold"><AlertTriangle aria-hidden="true" className="size-4" />Chỉ dùng để khởi tạo Admin lần đầu</p><p className="mt-1">Xóa route này và khóa endpoint Register từ C# ngay sau khi tạo tài khoản.</p></div><RegisterForm /></div></section></main>;
}
