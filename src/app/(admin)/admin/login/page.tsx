import type { Metadata } from "next";
import { AdminLoginBrand, AdminLoginSupport, LoginForm } from "@/features/admin-auth/components/LoginForm";

export const metadata: Metadata = {
  title: "Đăng nhập quản trị | ThanhDanh-VMC",
  description: "Cổng quản trị phân phối thiết bị của ThanhDanh-VMC.",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-surface p-4 sm:p-6">
      <section className="relative w-full max-w-md overflow-hidden rounded-2xl bg-surface-container-lowest shadow-xl" aria-labelledby="admin-login-title">
        <div className="h-1.5 bg-gradient-to-r from-primary via-primary-container to-secondary-container" />
        <div className="relative overflow-hidden p-6 sm:p-8">
          <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 size-44 rounded-full bg-secondary-fixed/40 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 -left-20 size-48 rounded-full bg-primary-fixed/50 blur-3xl" />
          <AdminLoginBrand />
          <LoginForm />
          <AdminLoginSupport />
          <p className="mt-5 text-center text-body-sm text-outline">ThanhDanh-VMC CMS Admin</p>
        </div>
      </section>
    </main>
  );
}
