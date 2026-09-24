import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PublicPagedResult, PublicProduct } from "@/features/core/api/public-api";

type PaginationProps = Readonly<{
  pagination: PublicPagedResult<PublicProduct>;
  search?: string;
  categoryId?: string;
  brandId?: string;
}>;

/** API-backed page links; catalogue filters can later be persisted in these query strings. */
export function Pagination({ pagination, search, categoryId, brandId }: PaginationProps) {
  if (pagination.totalPages <= 1) return null;

  const pages = Array.from({ length: Math.min(pagination.totalPages, 5) }, (_, index) => index + 1);
  const pageHref = (page: number) => {
    const params = new URLSearchParams({ page: String(page) });
    if (search) params.set("search", search);
    if (categoryId) params.set("category", categoryId);
    if (brandId) params.set("brand", brandId);
    return `/san-pham?${params}`;
  };

  return (
    <nav aria-label="Phân trang sản phẩm" className="mt-10 flex items-center justify-center gap-2">
      {pagination.currentPage > 1 ? <Link href={pageHref(pagination.currentPage - 1)} aria-label="Trang trước" className="inline-flex size-10 items-center justify-center rounded-xl bg-surface-container-lowest text-on-surface transition hover:bg-surface-container"><ChevronLeft className="size-5" /></Link> : <span aria-disabled="true" className="inline-flex size-10 cursor-not-allowed items-center justify-center rounded-xl bg-surface-container text-on-surface/40"><ChevronLeft className="size-5" /></span>}
      {pages.map((page) => <Link key={page} href={pageHref(page)} aria-current={page === pagination.currentPage ? "page" : undefined} className={`inline-flex size-10 items-center justify-center rounded-xl font-semibold transition ${page === pagination.currentPage ? "bg-primary text-on-primary shadow-sm" : "bg-surface-container-lowest text-on-surface hover:bg-surface-container"}`}>{page}</Link>)}
      {pagination.currentPage < pagination.totalPages ? <Link href={pageHref(pagination.currentPage + 1)} aria-label="Trang tiếp theo" className="inline-flex size-10 items-center justify-center rounded-xl bg-surface-container-lowest text-on-surface transition hover:bg-surface-container"><ChevronRight className="size-5" /></Link> : <span aria-disabled="true" className="inline-flex size-10 cursor-not-allowed items-center justify-center rounded-xl bg-surface-container text-on-surface/40"><ChevronRight className="size-5" /></span>}
    </nav>
  );
}
