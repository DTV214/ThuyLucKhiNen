import Image from "next/image";
import Link from "next/link";
import { ClipboardPlus } from "lucide-react";
import { relatedProducts } from "@/features/product/data/product-detail-data";

export function RelatedProducts() {
  return (
    <section className="mx-auto max-w-7xl px-gutter py-16"><p className="text-label-md font-semibold uppercase tracking-wider text-primary">Hệ thống tương thích</p><h2 className="mt-2 text-headline-lg font-bold text-on-surface">Sản phẩm đi kèm &amp; Thiết bị liên quan</h2><div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{relatedProducts.map((product) => <article key={product.name} className="flex h-full flex-col rounded-2xl bg-surface-container-low p-4"><div className="relative aspect-square overflow-hidden rounded-xl bg-surface"><Image src={product.image} alt={product.name} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" /></div><span className="mt-4 w-fit rounded bg-surface px-2 py-1 text-label-sm text-outline">{product.category}</span><h3 className="mt-2 text-headline-sm font-semibold text-on-surface">{product.name}</h3><p className="mt-2 text-body-sm leading-5 text-on-surface-variant">{product.description}</p><div className="mt-auto flex items-center justify-between gap-2 border-t border-outline-variant/20 pt-4"><span className="text-label-sm font-semibold text-primary">Có sẵn kho</span><Link href="/yeu-cau-bao-gia" className="inline-flex items-center gap-1 rounded-lg bg-primary-container px-3 py-2 text-label-sm font-semibold text-on-primary-container hover:bg-primary"><ClipboardPlus className="size-3.5" />RFQ</Link></div></article>)}</div></section>
  );
}
