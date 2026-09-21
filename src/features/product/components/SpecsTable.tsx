import type { ProductDetail } from "@/features/product/data/product-detail-data";

type SpecsTableProps = Readonly<{ product: Pick<ProductDetail, "name" | "specifications"> }>;

export function SpecsTable({ product }: SpecsTableProps) {
  return (
    <section><p className="text-label-md font-semibold uppercase tracking-wider text-primary">Thông số chi tiết</p><h2 className="mt-2 text-headline-md font-bold text-on-surface">Bảng thông số kỹ thuật</h2><div className="mt-6 overflow-hidden rounded-2xl bg-surface shadow-sm">{product.specifications.map((spec, index) => <div key={spec.label} className={`grid grid-cols-1 gap-2 p-4 sm:grid-cols-2 sm:items-center ${index % 2 ? "bg-surface-container-low/60" : ""}`}><dt className="text-body-md font-medium text-outline">{spec.label}</dt><dd className="text-body-md font-semibold text-on-surface sm:text-right">{spec.value}</dd></div>)}</div></section>
  );
}
