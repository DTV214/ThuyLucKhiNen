import Link from "next/link";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import type { PublicPagedResult, PublicProduct } from "@/features/core/api/public-api";

type PaginationProps = Readonly<{
  pagination: PublicPagedResult<PublicProduct>;
  search?: string;
  categoryId?: string;
  brandId?: string;
}>;

function getPageItems(currentPage: number, totalPages: number): Array<number | "ellipsis"> {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, index) => index + 1);

  const items: Array<number | "ellipsis"> = [1];
  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  if (start > 2) items.push("ellipsis");
  for (let page = start; page <= end; page += 1) items.push(page);
  if (end < totalPages - 1) items.push("ellipsis");
  items.push(totalPages);

  return items;
}

/** API-backed page links that preserve catalogue filters in the URL. */
export function Pagination({ pagination, search, categoryId, brandId }: PaginationProps) {
  if (pagination.totalPages <= 1) return null;

  const pages = getPageItems(pagination.currentPage, pagination.totalPages);
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
      {pages.map((page, index) => page === "ellipsis" ? (
        <span key={`ellipsis-${index}`} aria-hidden="true" className="inline-flex size-10 items-center justify-center text-on-surface-variant"><MoreHorizontal className="size-5" /></span>
      ) : (
        <Link key={page} href={pageHref(page)} aria-current={page === pagination.currentPage ? "page" : undefined} className={`inline-flex size-10 items-center justify-center rounded-xl font-semibold transition ${page === pagination.currentPage ? "bg-primary text-on-primary shadow-sm" : "bg-surface-container-lowest text-on-surface hover:bg-surface-container"}`}>{page}</Link>
      ))}
      {pagination.currentPage < pagination.totalPages ? <Link href={pageHref(pagination.currentPage + 1)} aria-label="Trang tiếp theo" className="inline-flex size-10 items-center justify-center rounded-xl bg-surface-container-lowest text-on-surface transition hover:bg-surface-container"><ChevronRight className="size-5" /></Link> : <span aria-disabled="true" className="inline-flex size-10 cursor-not-allowed items-center justify-center rounded-xl bg-surface-container text-on-surface/40"><ChevronRight className="size-5" /></span>}
    </nav>
  );
}
