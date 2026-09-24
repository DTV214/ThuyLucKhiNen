import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ImageOff } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import type { PublicProduct } from "@/features/core/api/public-api";
import { ContactPrompt } from "@/features/core/components/ContactPrompt";

type FeaturedProductsSectionProps = Readonly<{ products: ReadonlyArray<PublicProduct> }>;

export function FeaturedProductsSection({ products }: FeaturedProductsSectionProps) {
  const featuredProducts = products.slice(0, 3);

  return (
    <section className="bg-surface-container-low px-gutter py-20"><div className="mx-auto max-w-7xl">
      <Reveal><p className="text-label-md font-semibold uppercase tracking-wider text-primary">Sản phẩm nổi bật</p><h2 className="mt-2 text-headline-lg font-bold text-on-surface">Thiết bị Công nghiệp Hàng đầu</h2></Reveal>
      {featuredProducts.length ? <div className="mt-10 grid gap-6 lg:grid-cols-3">{featuredProducts.map((product, index) => <Reveal key={product.id} delay={index * 0.06}><article className="flex h-full flex-col overflow-hidden rounded-2xl bg-surface shadow-sm">
        <div className="relative flex aspect-[16/9] items-center justify-center bg-surface-container">{product.imageUrl ? <Image src={product.imageUrl} alt={product.name} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" /> : <ImageOff className="size-10 text-outline" />}</div>
        <div className="flex flex-1 flex-col p-6"><div className="flex items-start justify-between gap-3"><span className="text-label-sm font-semibold tracking-wide text-primary">SKU: {product.sku || "Chưa cập nhật"}</span><span className={`inline-flex shrink-0 items-center gap-1 text-label-sm font-medium ${product.stockQuantity > 0 ? "text-secondary" : "text-error"}`}><CheckCircle2 className="size-4" />{product.stockQuantity > 0 ? "Còn hàng" : "Không còn hàng"}</span></div>
        <h3 className="mt-4 text-headline-sm font-semibold text-on-surface">{product.name}</h3><p className="mt-1 text-body-md text-on-surface-variant">{product.brandName}</p>
        <ul className="mt-5 space-y-2 rounded-xl bg-surface-container-low p-4 text-body-sm text-on-surface-variant">{product.technicalSpecs.slice(0, 3).map((spec) => <li key={`${product.id}-${spec.label}`}><strong className="font-semibold text-on-surface">{spec.label}:</strong> {spec.value}</li>)}{!product.technicalSpecs.length ? <li>Liên hệ để nhận thông số kỹ thuật chi tiết.</li> : null}</ul>
        <div className="mt-6 grid grid-cols-2 gap-3"><Link href={`/san-pham/${product.slug}`} className="inline-flex items-center justify-center gap-1 rounded-lg bg-surface-container px-3 py-2.5 text-label-sm font-semibold text-on-surface transition hover:bg-surface-container-high">Chi tiết <ArrowRight className="size-4" /></Link><ContactPrompt label="Liên hệ" className="inline-flex items-center justify-center gap-1 rounded-lg bg-primary-container px-3 py-2.5 text-label-sm font-semibold text-on-primary-container transition hover:bg-primary" /></div>
        </div></article></Reveal>)}</div> : <p className="mt-10 rounded-2xl bg-surface p-6 text-body-md text-on-surface-variant">Sản phẩm nổi bật sẽ được cập nhật từ hệ thống.</p>}
    </div></section>
  );
}
