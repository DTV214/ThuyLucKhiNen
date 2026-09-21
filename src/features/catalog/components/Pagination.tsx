import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

/** Presentational pagination with links ready for future URL-driven catalogue pages. */
export function Pagination() {
  return (
    <nav aria-label="Phân trang sản phẩm" className="mt-10 flex items-center justify-center gap-2"><span aria-disabled="true" className="inline-flex size-10 cursor-not-allowed items-center justify-center rounded-xl bg-surface-container text-on-surface/40"><ChevronLeft className="size-5" /></span><Link href="/san-pham?page=1" aria-current="page" className="inline-flex size-10 items-center justify-center rounded-xl bg-primary font-semibold text-on-primary shadow-sm">1</Link><Link href="/san-pham?page=2" className="inline-flex size-10 items-center justify-center rounded-xl bg-surface-container-lowest text-on-surface transition hover:bg-surface-container">2</Link><Link href="/san-pham?page=3" className="inline-flex size-10 items-center justify-center rounded-xl bg-surface-container-lowest text-on-surface transition hover:bg-surface-container">3</Link><span className="px-1 text-on-surface-variant">…</span><Link href="/san-pham?page=6" className="inline-flex size-10 items-center justify-center rounded-xl bg-surface-container-lowest text-on-surface transition hover:bg-surface-container">6</Link><Link href="/san-pham?page=2" aria-label="Trang tiếp theo" className="inline-flex size-10 items-center justify-center rounded-xl bg-surface-container-lowest text-on-surface transition hover:bg-surface-container"><ChevronRight className="size-5" /></Link></nav>
  );
}
