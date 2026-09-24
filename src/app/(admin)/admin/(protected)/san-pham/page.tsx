import type { Metadata } from "next";
import { Boxes } from "lucide-react";
import { getBrands, getCategories, getProducts } from "@/features/admin-api/server/admin-api";
import { ProductFilters } from "@/features/admin-products/components/ProductFilters";
import { ProductsPagination } from "@/features/admin-products/components/ProductsPagination";
import { ProductsTable } from "@/features/admin-products/components/ProductsTable";
import { AddProductDialog } from "@/features/admin-products/components/AddProductDialog";

export const metadata: Metadata = { title: "Quản lý sản phẩm | ThanhDanh-VMC", robots: { index: false, follow: false } };

type SearchParams = Promise<{ page?: string; pageSize?: string; search?: string; categoryId?: string; brandId?: string }>;
const positiveInteger = (value: string | undefined, fallback: number) => { const number = Number(value); return Number.isInteger(number) && number > 0 ? number : fallback; };

export default async function AdminProductsPage({ searchParams }: Readonly<{ searchParams: SearchParams }>) {
  const params = await searchParams;
  const query = { page: positiveInteger(params.page, 1), pageSize: positiveInteger(params.pageSize, 10), search: params.search?.trim() ?? "", categoryId: params.categoryId, brandId: params.brandId };
  const [categories, brands, products] = await Promise.all([getCategories(), getBrands(), getProducts(query)]);

  return <main className="p-5 lg:p-8"><div className="flex flex-col gap-5"><header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="inline-flex items-center gap-1.5 text-label-sm font-semibold uppercase tracking-wider text-primary"><Boxes aria-hidden="true" className="size-4" />Catalog Engine</p><h1 className="mt-1 text-headline-lg font-bold text-on-surface">Quản lý Sản phẩm</h1><p className="mt-1 text-body-md text-on-surface-variant">Theo dõi danh mục, tồn kho và trạng thái hiển thị từ API ThanhDanh-VMC.</p></div><AddProductDialog categories={categories} brands={brands} /></header><ProductFilters categories={categories} brands={brands} search={query.search} categoryId={query.categoryId} brandId={query.brandId} /><ProductsTable products={products.items} categories={categories} brands={brands} /><ProductsPagination page={products} query={query} /></div></main>;
}
