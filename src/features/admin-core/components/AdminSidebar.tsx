import Link from "next/link";
import { BookOpenCheck, Boxes, LayoutDashboard, LogOut, Settings, Tags } from "lucide-react";

const navigationItems = [
  { href: "/admin", label: "Dashboard Tổng quan", icon: LayoutDashboard },
  { href: "/admin/san-pham", label: "Quản lý Sản phẩm", icon: Boxes },
  { href: "/admin/thuong-hieu", label: "Thương hiệu", icon: Tags },
  { href: "/admin/danh-muc", label: "Danh mục Thiết bị", icon: BookOpenCheck },
  { href: "/admin/cai-dat", label: "Cài đặt hệ thống", icon: Settings },
] as const;

export function AdminSidebar() {
  return (
    <aside className="border-b border-outline-variant/30 bg-surface-container-lowest lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:w-64 lg:border-b-0 lg:border-r" aria-label="Điều hướng quản trị">
      <div className="flex h-16 items-center border-b border-outline-variant/20 px-5">
        <div><p className="text-headline-sm font-bold text-primary">ThanhDanh-VMC</p><p className="text-label-sm text-on-surface-variant">B2B Backoffice Portal</p></div>
      </div>
      <nav className="flex gap-1 overflow-x-auto px-3 py-3 lg:block lg:space-y-1 lg:overflow-visible" aria-label="Chức năng quản trị">
        {navigationItems.map(({ href, icon: Icon, label }) => (
          <Link key={href} href={href} className="inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2.5 text-label-md text-on-surface-variant transition hover:bg-surface-container-high hover:text-on-surface lg:flex">
            <Icon aria-hidden="true" className="size-5" />{label}
          </Link>
        ))}
      </nav>
      <div className="hidden border-t border-outline-variant/20 p-4 lg:block"><p className="text-label-md font-semibold text-on-surface">Quản trị viên</p><p className="mt-0.5 text-body-sm text-on-surface-variant">Phiên JWT đang hoạt động</p><Link href="/admin/login" className="mt-3 inline-flex items-center gap-1.5 text-label-sm font-semibold text-on-surface-variant hover:text-primary"><LogOut aria-hidden="true" className="size-4" />Đăng xuất hệ thống</Link></div>
    </aside>
  );
}
