import { CheckCircle2 } from "lucide-react";
import type { PublicProduct } from "@/features/core/api/public-api";
import { ContactPrompt } from "@/features/core/components/ContactPrompt";

type ProductInfoProps = Readonly<{ product: PublicProduct }>;

/** Product credentials and technical summary; prices stay in the B2B contact flow. */
export function ProductInfo({ product }: ProductInfoProps) {
  const inStock = product.stockQuantity > 0;
  const quickSpecs = product.technicalSpecs.slice(0, 4);

  return (
    <section>
      <div className="flex flex-wrap gap-2">
        <span className="rounded bg-primary-fixed px-2.5 py-1 text-label-sm font-semibold text-on-primary-fixed">SKU: {product.sku || "Chưa cập nhật"}</span>
        <span className="rounded bg-surface-container-high px-2.5 py-1 text-label-sm font-semibold text-on-surface-variant">{product.categoryName}</span>
      </div>
      <p className="mt-5 text-label-md font-semibold text-primary">{product.brandName}</p>
      <h1 className="mt-2 text-headline-lg font-bold leading-tight text-on-surface">{product.name}</h1>
      <div className={`mt-4 inline-flex items-center gap-1 text-body-md font-medium ${inStock ? "text-emerald-700" : "text-error"}`}><CheckCircle2 className="size-4" />{inStock ? "Còn hàng" : "Không còn hàng"}</div>
      <p className="mt-6 text-body-lg leading-7 text-on-surface-variant">{product.description || "Liên hệ CTY ThanhDanh-VMC để nhận tư vấn mã tương đương, thông số và báo giá phù hợp."}</p>

      {quickSpecs.length ? <dl className="mt-7 grid grid-cols-2 gap-4 rounded-2xl bg-surface-container-low p-5">{quickSpecs.map((spec) => <div key={spec.label}><dt className="text-body-sm text-outline">{spec.label}</dt><dd className="mt-1 text-headline-sm font-semibold text-on-surface">{spec.value}</dd></div>)}</dl> : null}

      <div className="mt-6 rounded-2xl border border-primary/15 bg-primary/5 p-5"><p className="text-body-sm text-on-surface-variant">Giá sản phẩm</p><ContactPrompt label="Liên hệ số điện thoại" className="mt-1 inline-flex items-center gap-2 text-headline-sm font-bold text-primary hover:underline" /><p className="mt-1 text-body-sm text-on-surface-variant">CTY ThanhDanh-VMC sẽ tư vấn mã tương đương và báo giá phù hợp.</p></div>
      <ContactPrompt label="Yêu cầu báo giá nhanh" className="mt-7 inline-flex w-full items-center justify-center rounded-xl bg-primary-container px-5 py-3.5 text-label-md font-semibold text-on-primary-container transition hover:bg-primary" />
    </section>
  );
}
