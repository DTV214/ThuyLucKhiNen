import type { Metadata } from "next";
import { BadgeCheck, Building2 } from "lucide-react";
import { getBrandRecords } from "@/features/admin-api/server/admin-api";
import { AddBrandDialog } from "@/features/admin-brands/components/AddBrandDialog";
import { BrandsTable } from "@/features/admin-brands/components/BrandsTable";

export const metadata: Metadata = { title: "Quản lý thương hiệu | ThanhDanh-VMC", robots: { index: false, follow: false } };

export default async function AdminBrandsPage() {
  const brands = await getBrandRecords();
  return <main className="p-5 lg:p-8"><div className="flex flex-col gap-6"><header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="inline-flex items-center gap-1.5 text-label-sm font-semibold uppercase tracking-wider text-primary"><Building2 aria-hidden="true" className="size-4" />Đối tác &amp; nhà sản xuất</p><h1 className="mt-1 text-headline-lg font-bold text-on-surface">Quản lý Thương hiệu</h1><p className="mt-1 max-w-2xl text-body-md text-on-surface-variant">Quản lý danh sách hãng thiết bị để sử dụng xuyên suốt catalogue ThanhDanh-VMC.</p></div><AddBrandDialog /></header><section className="rounded-xl bg-surface-container-low p-5" aria-label="Thống kê thương hiệu"><div className="flex items-center gap-3"><span className="flex size-11 items-center justify-center rounded-lg bg-primary-fixed text-primary"><BadgeCheck aria-hidden="true" className="size-6" /></span><div><p className="text-label-sm font-semibold uppercase tracking-wide text-on-surface-variant">Tổng thương hiệu</p><p className="mt-0.5 text-headline-md font-bold text-on-surface">{brands.length}</p></div></div></section><BrandsTable brands={brands} /></div></main>;
}
