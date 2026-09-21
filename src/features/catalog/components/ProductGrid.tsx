import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ClipboardPlus } from "lucide-react";
import type { CatalogProduct } from "@/features/catalog/data/catalog-data";

type ProductGridProps = Readonly<{ products: ReadonlyArray<CatalogProduct> }>;

/** Server-rendered product cards; accepts data so it can later receive API results. */
export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => <article key={product.id} className="flex min-w-0 flex-col rounded-xl bg-surface-container-lowest p-5 shadow-sm transition-shadow hover:shadow-md"><div className="relative h-48 overflow-hidden rounded-lg bg-surface-container"><Image src={product.image} alt={product.name} fill sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw" className="object-cover" /><span className={`absolute left-3 top-3 rounded px-2 py-1 text-label-sm font-semibold ${product.availability === "Sẵn kho" ? "bg-secondary-fixed text-on-secondary-container" : "bg-amber-100 text-amber-900"}`}>{product.availability}{product.availabilityDetail ? ` (${product.availabilityDetail})` : ""}</span></div><p className="mt-4 text-label-sm font-semibold tracking-wide text-primary">Mã: {product.code}</p><h2 className="mt-2 text-headline-sm font-semibold text-on-surface">{product.name}</h2><p className="mt-1 text-body-sm text-on-surface-variant">{product.brand}</p><dl className="mt-4 space-y-1 rounded-lg bg-surface-container-low p-3 text-body-sm text-on-surface-variant">{product.specifications.map(([label, value]) => <div key={label} className="flex justify-between gap-3"><dt>{label}:</dt><dd className="text-right font-semibold text-on-surface">{value}</dd></div>)}</dl><div className="mt-5 grid grid-cols-2 gap-2"><Link href={product.href} className="inline-flex items-center justify-center gap-1 rounded-lg bg-surface-container px-3 py-2.5 text-label-sm font-semibold text-on-surface transition hover:bg-surface-container-high">Chi tiết <ArrowRight className="size-3.5" /></Link><Link href="/yeu-cau-bao-gia" className="inline-flex items-center justify-center gap-1 rounded-lg bg-primary-container px-3 py-2.5 text-label-sm font-semibold text-on-primary-container transition hover:bg-primary"><ClipboardPlus className="size-3.5" />Báo giá</Link></div></article>)}
    </div>
  );
}
