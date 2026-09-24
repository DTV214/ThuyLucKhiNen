import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PagedResult, ProductQuery } from "@/features/admin-api/server/admin-api";

type ProductsPaginationProps = Readonly<{ page: PagedResult<unknown>; query: ProductQuery }>;

function pageUrl(page: number, query: ProductQuery) {
  const params = new URLSearchParams({ page: String(page), pageSize: String(query.pageSize ?? 10) });
  if (query.search) params.set("search", query.search);
  if (query.categoryId) params.set("categoryId", query.categoryId);
  if (query.brandId) params.set("brandId", query.brandId);
  return `/admin/san-pham?${params.toString()}`;
}

export function ProductsPagination({ page, query }: ProductsPaginationProps) {
  const firstItem = page.totalCount === 0 ? 0 : (page.currentPage - 1) * page.pageSize + 1;
  const lastItem = Math.min(page.currentPage * page.pageSize, page.totalCount);
  const pageNumbers = Array.from({ length: Math.min(page.totalPages, 5) }, (_, index) => Math.max(1, Math.min(page.currentPage - 2, page.totalPages - 4) + index));

  return <nav aria-label="Phân trang sản phẩm" className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><p className="text-body-sm text-on-surface-variant">Hiển thị {firstItem}–{lastItem} trong tổng số {page.totalCount} sản phẩm</p><div className="flex items-center gap-1"><Link aria-disabled={page.currentPage <= 1} href={pageUrl(Math.max(1, page.currentPage - 1), query)} className="inline-flex size-9 items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container aria-disabled:pointer-events-none aria-disabled:opacity-40"><ChevronLeft aria-hidden="true" className="size-4" /><span className="sr-only">Trang trước</span></Link>{pageNumbers.map((number) => <Link key={number} href={pageUrl(number, query)} aria-current={number === page.currentPage ? "page" : undefined} className="inline-flex size-9 items-center justify-center rounded-lg text-label-sm font-semibold text-on-surface-variant hover:bg-surface-container aria-[current=page]:bg-primary aria-[current=page]:text-on-primary">{number}</Link>)}<Link aria-disabled={page.currentPage >= page.totalPages} href={pageUrl(Math.min(page.totalPages, page.currentPage + 1), query)} className="inline-flex size-9 items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container aria-disabled:pointer-events-none aria-disabled:opacity-40"><ChevronRight aria-hidden="true" className="size-4" /><span className="sr-only">Trang sau</span></Link></div></nav>;
}
