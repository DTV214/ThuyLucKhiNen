import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ImageOff } from "lucide-react";
import type { PublicProduct } from "@/features/core/api/public-api";
import { ContactPrompt } from "@/features/core/components/ContactPrompt";

type ProductGridProps = Readonly<{ products: ReadonlyArray<PublicProduct> }>;

/** Server-rendered cards fed by the public C# catalogue API. */
export function ProductGrid({ products }: ProductGridProps) {
  if (!products.length) {
    return (
      <div className="rounded-2xl border border-dashed border-outline-variant/40 bg-surface-container-low p-10 text-center">
        <ImageOff className="mx-auto size-8 text-outline" />
        <h2 className="mt-4 text-headline-sm font-semibold text-on-surface">Chưa có sản phẩm phù hợp</h2>
        <p className="mt-2 text-body-md text-on-surface-variant">Vui lòng thử lại sau hoặc liên hệ để được kỹ sư CTY ThanhDanh-VMC hỗ trợ.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => {
        const inStock = product.stockQuantity > 0;
        const specs = product.technicalSpecs.slice(0, 3);

        return (
          <article key={product.id} className="flex min-w-0 flex-col rounded-xl bg-surface-container-lowest p-5 shadow-sm transition-shadow hover:shadow-md">
            <div className="relative flex h-48 items-center justify-center overflow-hidden rounded-lg bg-surface-container">
              {product.imageUrl ? (
                <Image src={product.imageUrl} alt={product.name} fill sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw" className="object-cover" />
              ) : (
                <ImageOff className="size-9 text-outline" aria-hidden="true" />
              )}
              <span className={`absolute left-3 top-3 rounded px-2 py-1 text-label-sm font-semibold ${inStock ? "bg-secondary-fixed text-on-secondary-container" : "bg-amber-100 text-amber-900"}`}>
                {inStock ? "Còn hàng" : "Không còn hàng"}
              </span>
            </div>

            <p className="mt-4 text-label-sm font-semibold tracking-wide text-primary">SKU: {product.sku || "Chưa cập nhật"}</p>
            <h2 className="mt-2 text-headline-sm font-semibold text-on-surface">{product.name}</h2>
            <p className="mt-1 text-body-sm text-on-surface-variant">{product.brandName}</p>

            {specs.length ? (
              <dl className="mt-4 space-y-1 rounded-lg bg-surface-container-low p-3 text-body-sm text-on-surface-variant">
                {specs.map((spec) => (
                  <div key={`${product.id}-${spec.label}`} className="flex justify-between gap-3">
                    <dt>{spec.label}:</dt>
                    <dd className="text-right font-semibold text-on-surface">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="mt-4 rounded-lg bg-surface-container-low p-3 text-body-sm text-on-surface-variant">Liên hệ để nhận thông số kỹ thuật chi tiết.</p>
            )}

            <div className="mt-4 rounded-lg border border-primary/15 bg-primary/5 p-3">
              <p className="text-body-sm text-on-surface-variant">Giá: <strong className="text-on-surface">Liên hệ Hotline</strong></p>
              <ContactPrompt label="Xem số hotline" className="mt-1 inline-flex items-center gap-1.5 text-label-sm font-semibold text-primary hover:underline" />
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2">
              <Link href={`/san-pham/${product.slug}`} className="inline-flex items-center justify-center gap-1 rounded-lg bg-surface-container px-3 py-2.5 text-label-sm font-semibold text-on-surface transition hover:bg-surface-container-high">
                Chi tiết <ArrowRight className="size-3.5" />
              </Link>
              <ContactPrompt label="Liên hệ" className="inline-flex items-center justify-center gap-1 rounded-lg bg-primary-container px-3 py-2.5 text-label-sm font-semibold text-on-primary-container transition hover:bg-primary" />
            </div>
          </article>
        );
      })}
    </div>
  );
}
