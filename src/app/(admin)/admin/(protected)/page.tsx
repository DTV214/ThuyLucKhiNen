import Link from "next/link";
import { BadgeCheck, Boxes, FolderTree, LayoutDashboard, Tags } from "lucide-react";
import { getBrandRecords, getCategoryRecords, getProducts } from "@/features/admin-api/server/admin-api";

const numberFormatter = new Intl.NumberFormat("vi-VN");

export default async function AdminDashboardPage() {
  const [brands, categories, products] = await Promise.all([
    getBrandRecords(),
    getCategoryRecords(),
    getProducts({ page: 1, pageSize: 1 }),
  ]);

  const kpis = [
    { label: "Tổng thương hiệu", value: brands.length, href: "/admin/thuong-hieu", icon: Tags, description: "Hãng thiết bị đang phân phối" },
    { label: "Tổng danh mục", value: categories.length, href: "/admin/danh-muc", icon: FolderTree, description: "Nhóm thiết bị trong catalogue" },
    { label: "Tổng sản phẩm", value: products.totalCount, href: "/admin/san-pham", icon: Boxes, description: "Sản phẩm đã đồng bộ từ C#" },
  ] as const;

  return <main className="p-5 lg:p-8"><div className="mx-auto flex max-w-6xl flex-col gap-7"><header className="rounded-2xl bg-gradient-to-br from-primary to-primary-container p-6 text-on-primary shadow-sm sm:p-8"><div className="flex size-12 items-center justify-center rounded-xl bg-white/15"><LayoutDashboard aria-hidden="true" className="size-7" /></div><h1 className="mt-5 text-headline-lg font-bold">Tổng quan quản trị ThanhDanh-VMC</h1><p className="mt-2 max-w-2xl text-body-md leading-6 text-on-primary/85">Theo dõi nhanh dữ liệu catalogue B2B và điều hướng đến các tác vụ quản trị quan trọng.</p></header><section aria-label="Chỉ số catalogue" className="grid gap-5 md:grid-cols-3">{kpis.map((kpi) => { const Icon = kpi.icon; return <Link key={kpi.label} href={kpi.href} className="group rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"><div className="flex items-start justify-between gap-4"><span className="flex size-11 items-center justify-center rounded-xl bg-primary-fixed text-primary"><Icon aria-hidden="true" className="size-5" /></span><BadgeCheck aria-hidden="true" className="size-5 text-secondary" /></div><p className="mt-5 text-label-md font-semibold uppercase tracking-wide text-on-surface-variant">{kpi.label}</p><p className="mt-1 text-display-sm font-bold text-on-surface">{numberFormatter.format(kpi.value)}</p><p className="mt-2 text-body-sm text-on-surface-variant">{kpi.description}</p><span className="mt-4 inline-flex text-label-sm font-semibold text-primary group-hover:underline">Quản lý dữ liệu →</span></Link>; })}</section></div></main>;
}
