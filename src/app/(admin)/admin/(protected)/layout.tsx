import type { ReactNode } from "react";
import { AdminHeader } from "@/features/admin-core/components/AdminHeader";
import { AdminSidebar } from "@/features/admin-core/components/AdminSidebar";

export default function ProtectedAdminLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <><AdminSidebar /><div className="min-h-screen bg-surface lg:pl-64"><AdminHeader />{children}</div></>;
}
