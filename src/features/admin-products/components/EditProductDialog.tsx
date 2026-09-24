"use client";

import { useActionState, useMemo, useState } from "react";
import { useFormStatus } from "react-dom";
import { LoaderCircle, Pencil, Plus, Save, Trash2, X } from "lucide-react";
import type { ProductRecord, SelectOption } from "@/features/admin-api/server/admin-api";
import { ImageUploadField } from "@/features/admin-core/components/ImageUploadField";
import { updateProduct } from "@/features/admin-products/actions/product-actions";
import { productMutationInitialState } from "@/features/admin-products/data/product-mutation-state";

type TechnicalSpec = { label: string; value: string };

type EditProductDialogProps = Readonly<{
  product: ProductRecord;
  categories: SelectOption[];
  brands: SelectOption[];
}>;

function readSpecs(value: ProductRecord["technicalSpecs"]): TechnicalSpec[] {
  try {
    const raw = typeof value === "string" ? JSON.parse(value) : value;
    if (!Array.isArray(raw)) return [{ label: "", value: "" }];
    const specs = raw.flatMap((item): TechnicalSpec[] => {
      if (!item || typeof item !== "object") return [];
      const record = item as Record<string, unknown>;
      const label = record.label ?? record.Label;
      const fieldValue = record.value ?? record.Value;
      return typeof label === "string" && typeof fieldValue === "string" ? [{ label, value: fieldValue }] : [];
    });
    return specs.length > 0 ? specs : [{ label: "", value: "" }];
  } catch {
    return [{ label: "", value: "" }];
  }
}

function readGallery(value: ProductRecord["imageGallery"]) {
  try {
    const images: unknown = typeof value === "string" ? JSON.parse(value) : value;
    return Array.isArray(images) ? images.filter((image): image is string => typeof image === "string" && image.length > 0) : [];
  } catch {
    return [];
  }
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return <button type="submit" disabled={pending} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-label-md font-semibold text-on-primary disabled:cursor-wait disabled:opacity-70">{pending ? <LoaderCircle aria-hidden="true" className="size-4 animate-spin" /> : <Save aria-hidden="true" className="size-4" />}{pending ? "Đang lưu..." : "Lưu thay đổi"}</button>;
}

export function EditProductDialog({ product, categories, brands }: EditProductDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [specs, setSpecs] = useState<TechnicalSpec[]>(() => readSpecs(product.technicalSpecs));
  const updateAction = updateProduct.bind(null, String(product.id));
  const [state, formAction] = useActionState(updateAction, productMutationInitialState);
  const categoryId = String(product.categoryId ?? product.category?.id ?? "");
  const brandId = String(product.brandId ?? product.brand?.id ?? "");
  const currentImages = [product.imageUrl, ...readGallery(product.imageGallery)].filter((image): image is string => Boolean(image));
  const technicalSpecs = useMemo(() => specs.map((spec) => ({ label: spec.label.trim(), value: spec.value.trim() })).filter((spec) => spec.label && spec.value), [specs]);

  function updateSpec(index: number, field: keyof TechnicalSpec, value: string) {
    setSpecs((current) => current.map((spec, currentIndex) => currentIndex === index ? { ...spec, [field]: value } : spec));
  }

  return <><button type="button" onClick={() => setIsOpen(true)} className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-label-sm font-semibold text-primary transition hover:bg-primary-fixed"><Pencil aria-hidden="true" className="size-4" />Sửa</button>{isOpen ? <div className="fixed inset-0 z-[60] flex items-end justify-center bg-on-surface/45 p-0 sm:items-center sm:p-6" role="presentation"><section role="dialog" aria-modal="true" aria-labelledby={`edit-product-${product.id}`} className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl bg-surface-container-lowest shadow-2xl sm:rounded-2xl"><header className="flex items-start justify-between border-b border-outline-variant/20 p-5 sm:p-6"><div><p className="text-label-sm font-semibold uppercase tracking-wider text-primary">Danh mục sản phẩm</p><h2 id={`edit-product-${product.id}`} className="mt-1 text-headline-md font-bold text-on-surface">Sửa sản phẩm</h2></div><button type="button" onClick={() => setIsOpen(false)} className="rounded-lg p-2 text-on-surface-variant hover:bg-surface-container" aria-label="Đóng biểu mẫu"><X aria-hidden="true" className="size-5" /></button></header><form action={formAction} className="space-y-5 p-5 sm:p-6"><div><label htmlFor={`product-name-${product.id}`} className="text-label-md font-semibold text-on-surface">Tên sản phẩm *</label><input id={`product-name-${product.id}`} name="Name" required defaultValue={product.name ?? product.productName ?? ""} className="mt-1.5 w-full rounded-lg bg-surface-container-low px-3 py-2.5 text-body-md outline-none ring-1 ring-outline-variant/30 focus:ring-primary" /></div><div><label htmlFor={`product-sku-${product.id}`} className="text-label-md font-semibold text-on-surface">SKU / Mã sản phẩm</label><input id={`product-sku-${product.id}`} name="sku" defaultValue={product.sku ?? ""} className="mt-1.5 w-full rounded-lg bg-surface-container-low px-3 py-2.5 font-mono text-body-md outline-none ring-1 ring-outline-variant/30 focus:ring-primary" /></div><div><label htmlFor={`product-description-${product.id}`} className="text-label-md font-semibold text-on-surface">Mô tả *</label><textarea id={`product-description-${product.id}`} name="Description" required rows={4} defaultValue={product.description ?? ""} className="mt-1.5 w-full resize-y rounded-lg bg-surface-container-low px-3 py-2.5 text-body-md outline-none ring-1 ring-outline-variant/30 focus:ring-primary" /></div><fieldset className="rounded-xl border border-outline-variant/40 bg-surface-container-low/40 p-4 sm:p-5"><legend className="px-1 text-label-md font-semibold text-on-surface">Thông số kỹ thuật</legend><input type="hidden" name="technicalSpecs" value={JSON.stringify(technicalSpecs)} /><div className="space-y-3">{specs.map((spec, index) => <div key={index} className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]"><input value={spec.label} onChange={(event) => updateSpec(index, "label", event.target.value)} aria-label={`Tên thông số kỹ thuật ${index + 1}`} placeholder="Tên thông số" className="min-w-0 rounded-lg bg-surface-container-lowest px-3 py-2.5 text-body-md outline-none ring-1 ring-outline-variant/30 focus:ring-primary" /><input value={spec.value} onChange={(event) => updateSpec(index, "value", event.target.value)} aria-label={`Giá trị thông số kỹ thuật ${index + 1}`} placeholder="Giá trị" className="min-w-0 rounded-lg bg-surface-container-lowest px-3 py-2.5 text-body-md outline-none ring-1 ring-outline-variant/30 focus:ring-primary" /><button type="button" onClick={() => setSpecs((current) => current.filter((_, currentIndex) => currentIndex !== index))} className="inline-flex items-center justify-center rounded-lg p-2.5 text-on-surface-variant hover:bg-error-container hover:text-on-error-container" aria-label={`Xóa thông số ${index + 1}`}><Trash2 aria-hidden="true" className="size-4" /></button></div>)}</div><button type="button" onClick={() => setSpecs((current) => [...current, { label: "", value: "" }])} className="mt-4 inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-label-sm font-semibold text-primary hover:bg-primary-fixed"><Plus aria-hidden="true" className="size-4" />Thêm thông số</button></fieldset><div className="grid gap-5 sm:grid-cols-2"><div><label htmlFor={`product-stock-${product.id}`} className="text-label-md font-semibold text-on-surface">Trạng thái tồn kho *</label><select id={`product-stock-${product.id}`} name="StockQuantity" required defaultValue={Number(product.stockQuantity) > 0 ? "100" : "0"} className="mt-1.5 w-full rounded-lg bg-surface-container-low px-3 py-2.5 text-body-md outline-none ring-1 ring-outline-variant/30 focus:ring-primary"><option value="100">Còn hàng</option><option value="0">Không còn hàng</option></select></div><div><label htmlFor={`product-visibility-${product.id}`} className="text-label-md font-semibold text-on-surface">Trạng thái hiển thị *</label><select id={`product-visibility-${product.id}`} name="IsActive" required defaultValue={String(product.isActive ?? product.IsActive).toLowerCase() === "true" ? "true" : "false"} className="mt-1.5 w-full rounded-lg bg-surface-container-low px-3 py-2.5 text-body-md outline-none ring-1 ring-outline-variant/30 focus:ring-primary"><option value="true">Đang hiển thị</option><option value="false">Đang ẩn</option></select></div></div><div className="grid gap-5 sm:grid-cols-2"><div><label htmlFor={`product-category-${product.id}`} className="text-label-md font-semibold text-on-surface">Danh mục *</label><select id={`product-category-${product.id}`} name="CategoryId" required defaultValue={categoryId} className="mt-1.5 w-full rounded-lg bg-surface-container-low px-3 py-2.5 text-body-md outline-none ring-1 ring-outline-variant/30 focus:ring-primary"><option value="" disabled>Chọn danh mục</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></div><div><label htmlFor={`product-brand-${product.id}`} className="text-label-md font-semibold text-on-surface">Thương hiệu *</label><select id={`product-brand-${product.id}`} name="BrandId" required defaultValue={brandId} className="mt-1.5 w-full rounded-lg bg-surface-container-low px-3 py-2.5 text-body-md outline-none ring-1 ring-outline-variant/30 focus:ring-primary"><option value="" disabled>Chọn thương hiệu</option>{brands.map((brand) => <option key={brand.id} value={brand.id}>{brand.name}</option>)}</select></div></div><ImageUploadField id={`product-image-${product.id}`} name="Images" label="Ảnh sản phẩm" currentImageUrls={currentImages} emptyText="Chọn tối đa 3 ảnh mới để thay thế gallery" multiple maxFiles={3} maxTotalSizeInBytes={8 * 1024 * 1024} />{state.error ? <p role="alert" className="rounded-lg border border-error/20 bg-error-container px-3 py-2.5 text-body-sm text-on-error-container">{state.error}</p> : null}<footer className="flex justify-end gap-3 border-t border-outline-variant/20 pt-5"><button type="button" onClick={() => setIsOpen(false)} className="rounded-lg px-4 py-2.5 text-label-md font-semibold text-on-surface-variant hover:bg-surface-container">Hủy</button><SubmitButton /></footer></form></section></div> : null}</>;
}
