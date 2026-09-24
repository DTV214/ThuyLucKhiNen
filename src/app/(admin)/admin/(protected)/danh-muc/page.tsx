import type { Metadata } from "next";
import { FolderTree, Layers3 } from "lucide-react";
import { getCategoryRecords } from "@/features/admin-api/server/admin-api";
import { AddCategoryDialog } from "@/features/admin-categories/components/AddCategoryDialog";
import { CategoriesTable } from "@/features/admin-categories/components/CategoriesTable";

export const metadata: Metadata = { title: "Quản lý danh mục | ThanhDanh-VMC", robots: { index: false, follow: false } };

export default async function AdminCategoriesPage() {
  const categories = await getCategoryRecords();
  return <main className="p-5 lg:p-8"><div className="flex flex-col gap-6"><header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="inline-flex items-center gap-1.5 text-label-sm font-semibold uppercase tracking-wider text-primary"><FolderTree aria-hidden="true" className="size-4" />Cấu trúc catalog</p><h1 className="mt-1 text-headline-lg font-bold text-on-surface">Quản lý Danh mục Thiết bị</h1><p className="mt-1 max-w-2xl text-body-md text-on-surface-variant">Thiết lập các nhóm sản phẩm cho catalogue và bộ lọc ThanhDanh-VMC.</p></div><AddCategoryDialog /></header><section className="rounded-xl bg-surface-container-low p-5" aria-label="Thống kê danh mục"><div className="flex items-center gap-3"><span className="flex size-11 items-center justify-center rounded-lg bg-primary-fixed text-primary"><Layers3 aria-hidden="true" className="size-6" /></span><div><p className="text-label-sm font-semibold uppercase tracking-wide text-on-surface-variant">Tổng danh mục</p><p className="mt-0.5 text-headline-md font-bold text-on-surface">{categories.length}</p></div></div></section><CategoriesTable categories={categories} /></div></main>;
}
