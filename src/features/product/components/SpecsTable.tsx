import { ClipboardCheck, Settings2 } from "lucide-react";
import type { PublicProduct } from "@/features/core/api/public-api";

type SpecsTableProps = Readonly<{ product: Pick<PublicProduct, "technicalSpecs"> }>;

/** A technical-sheet presentation for all valid items parsed from TechnicalSpecs JSON. */
export function SpecsTable({ product }: SpecsTableProps) {
  return (
    <section aria-labelledby="technical-specifications-title">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-label-md font-semibold uppercase tracking-wider text-primary">Thông số chi tiết</p><h2 id="technical-specifications-title" className="mt-2 text-headline-md font-bold text-on-surface">Bảng thông số kỹ thuật</h2><p className="mt-2 text-body-md text-on-surface-variant">Thông số do CTY ThanhDanh-VMC cập nhật theo từng mã thiết bị.</p></div><span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary-fixed px-3 py-1.5 text-label-sm font-semibold text-primary"><ClipboardCheck className="size-4" />Thông tin kỹ thuật</span></div>
      {product.technicalSpecs.length ? <dl className="mt-7 overflow-hidden rounded-2xl border border-outline-variant/20 bg-surface p-2 shadow-sm sm:p-3"><div className="grid gap-2 md:grid-cols-2">{product.technicalSpecs.map((spec, index) => <div key={`${spec.label}-${index}`} className="group flex min-h-20 items-center gap-4 rounded-xl border border-transparent bg-surface-container-low/70 px-4 py-3 transition hover:border-primary/20 hover:bg-primary/5"><span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-surface text-primary shadow-sm"><Settings2 className="size-4" /></span><div className="min-w-0"><dt className="text-body-sm font-medium text-outline">{spec.label}</dt><dd className="mt-1 break-words text-body-md font-bold text-on-surface">{spec.value}</dd></div></div>)}</div></dl> : <div className="mt-7 rounded-2xl border border-dashed border-outline-variant/40 bg-surface p-7 text-center text-body-md text-on-surface-variant">Thông số đang được cập nhật. Vui lòng liên hệ CTY ThanhDanh-VMC để nhận tài liệu kỹ thuật phù hợp.</div>}
    </section>
  );
}
