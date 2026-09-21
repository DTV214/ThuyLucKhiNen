import { CheckCircle2, Star } from "lucide-react";
import type { ProductDetail } from "@/features/product/data/product-detail-data";

type ProductInfoProps = Readonly<{ product: ProductDetail }>;

/** Product credentials and technical summary; commercial details stay in the RFQ flow. */
export function ProductInfo({ product }: ProductInfoProps) {
  return (
    <section><div className="flex flex-wrap gap-2"><span className="rounded bg-primary-fixed px-2.5 py-1 text-label-sm font-semibold text-on-primary-fixed">SKU: {product.sku}</span><span className="rounded bg-surface-container-high px-2.5 py-1 text-label-sm font-semibold text-on-surface-variant">{product.series}</span></div><p className="mt-5 text-label-md font-semibold text-primary">{product.brand}</p><h1 className="mt-2 text-headline-lg font-bold leading-tight text-on-surface">{product.name}</h1><div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-body-md text-on-surface-variant"><span className="inline-flex items-center gap-1 text-amber-500"><Star className="size-4 fill-current" /><strong className="text-on-surface">{product.rating}</strong></span><span>•</span><a href="#reviews" className="text-primary underline">{product.reviewCount} đánh giá kỹ thuật</a><span>•</span><span className="inline-flex items-center gap-1 font-medium text-emerald-700"><CheckCircle2 className="size-4" />{product.availability}</span></div><p className="mt-6 text-body-lg leading-7 text-on-surface-variant">{product.shortDescription}</p><dl className="mt-7 grid grid-cols-2 gap-4 rounded-2xl bg-surface-container-low p-5">{product.quickSpecs.map((spec) => <div key={spec.label}><dt className="text-body-sm text-outline">{spec.label}</dt><dd className="mt-1 text-headline-sm font-semibold text-on-surface">{spec.value}{spec.note && <small className="ml-1 text-body-sm font-normal text-outline">({spec.note})</small>}</dd></div>)}</dl><a href="#bao-gia" className="mt-7 inline-flex w-full items-center justify-center rounded-xl bg-primary-container px-5 py-3.5 text-label-md font-semibold text-on-primary-container transition hover:bg-primary">Yêu cầu báo giá nhanh</a></section>
  );
}
