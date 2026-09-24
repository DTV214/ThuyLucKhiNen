"use client";

import { useActionState, useMemo, useState } from "react";
import { useFormStatus } from "react-dom";
import { LoaderCircle, Plus, Trash2, X } from "lucide-react";
import { createProduct } from "@/features/admin-products/actions/product-actions";
import type { SelectOption } from "@/features/admin-api/server/admin-api";
import { ImageUploadField } from "@/features/admin-core/components/ImageUploadField";
import { productMutationInitialState } from "@/features/admin-products/data/product-mutation-state";

type AddProductDialogProps = Readonly<{
  categories: SelectOption[];
  brands: SelectOption[];
}>;

type TechnicalSpec = { label: string; value: string };

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-label-md font-semibold text-on-primary transition hover:bg-primary-container disabled:cursor-wait disabled:opacity-70">
      {pending ? <LoaderCircle aria-hidden="true" className="size-4 animate-spin" /> : <Plus aria-hidden="true" className="size-4" />}
      {pending ? "Đang tạo..." : "Tạo sản phẩm"}
    </button>
  );
}

/** Client boundary covers only modal state and dynamic technical-spec fields. */
export function AddProductDialog({ categories, brands }: AddProductDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [specs, setSpecs] = useState<TechnicalSpec[]>([{ label: "", value: "" }]);
  const [state, formAction] = useActionState(createProduct, productMutationInitialState);

  const technicalSpecs = useMemo(
    () => specs
      .map((spec) => ({ label: spec.label.trim(), value: spec.value.trim() }))
      .filter((spec) => spec.label.length > 0 && spec.value.length > 0),
    [specs],
  );

  function updateSpec(index: number, field: keyof TechnicalSpec, value: string) {
    setSpecs((currentSpecs) => currentSpecs.map((spec, currentIndex) => (
      currentIndex === index ? { ...spec, [field]: value } : spec
    )));
  }

  function removeSpec(index: number) {
    setSpecs((currentSpecs) => currentSpecs.filter((_, currentIndex) => currentIndex !== index));
  }

  function closeDialog() {
    setIsOpen(false);
    setSpecs([{ label: "", value: "" }]);
  }

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-label-md font-semibold text-on-primary shadow-sm transition hover:bg-primary-container">
        <Plus aria-hidden="true" className="size-4" />
        Thêm sản phẩm
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-on-surface/45 p-0 sm:items-center sm:p-6" role="presentation">
          <section role="dialog" aria-modal="true" aria-labelledby="create-product-title" className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl bg-surface-container-lowest shadow-2xl sm:rounded-2xl">
            <header className="flex items-start justify-between border-b border-outline-variant/20 p-5 sm:p-6">
              <div>
                <p className="text-label-sm font-semibold uppercase tracking-wider text-primary">Danh mục sản phẩm</p>
                <h2 id="create-product-title" className="mt-1 text-headline-md font-bold text-on-surface">Thêm sản phẩm mới</h2>
              </div>
              <button type="button" onClick={closeDialog} className="rounded-lg p-2 text-on-surface-variant hover:bg-surface-container" aria-label="Đóng biểu mẫu"><X aria-hidden="true" className="size-5" /></button>
            </header>

            <form action={formAction} className="space-y-5 p-5 sm:p-6">
              <div>
                <label htmlFor="product-name" className="text-label-md font-semibold text-on-surface">Tên sản phẩm *</label>
                <input id="product-name" name="Name" required className="mt-1.5 w-full rounded-lg bg-surface-container-low px-3 py-2.5 text-body-md outline-none ring-1 ring-outline-variant/30 focus:ring-primary" />
              </div>

              <div>
                <label htmlFor="product-sku" className="text-label-md font-semibold text-on-surface">SKU / Mã sản phẩm</label>
                <input id="product-sku" name="sku" placeholder="Ví dụ: A10VSO-71DR/31R" className="mt-1.5 w-full rounded-lg bg-surface-container-low px-3 py-2.5 font-mono text-body-md outline-none ring-1 ring-outline-variant/30 placeholder:font-sans focus:ring-primary" />
              </div>

              <div>
                <label htmlFor="product-description" className="text-label-md font-semibold text-on-surface">Mô tả *</label>
                <textarea id="product-description" name="Description" required rows={4} className="mt-1.5 w-full resize-y rounded-lg bg-surface-container-low px-3 py-2.5 text-body-md outline-none ring-1 ring-outline-variant/30 focus:ring-primary" />
              </div>

              <fieldset className="rounded-xl border border-outline-variant/40 bg-surface-container-low/40 p-4 sm:p-5">
                <legend className="px-1 text-label-md font-semibold text-on-surface">Thông số kỹ thuật</legend>
                <p className="mb-4 text-body-sm text-on-surface-variant">Thêm các cặp thông số để hiển thị ở trang chi tiết sản phẩm. Các dòng trống sẽ tự bỏ qua.</p>
                <input type="hidden" name="technicalSpecs" value={JSON.stringify(technicalSpecs)} />
                <div className="space-y-3">
                  {specs.map((spec, index) => (
                    <div key={index} className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]">
                      <input value={spec.label} onChange={(event) => updateSpec(index, "label", event.target.value)} aria-label={`Tên thông số kỹ thuật ${index + 1}`} placeholder="Tên thông số, ví dụ: Áp suất" className="min-w-0 rounded-lg bg-surface-container-lowest px-3 py-2.5 text-body-md outline-none ring-1 ring-outline-variant/30 focus:ring-primary" />
                      <input value={spec.value} onChange={(event) => updateSpec(index, "value", event.target.value)} aria-label={`Giá trị thông số kỹ thuật ${index + 1}`} placeholder="Giá trị, ví dụ: 250 bar" className="min-w-0 rounded-lg bg-surface-container-lowest px-3 py-2.5 text-body-md outline-none ring-1 ring-outline-variant/30 focus:ring-primary" />
                      <button type="button" onClick={() => removeSpec(index)} className="inline-flex items-center justify-center rounded-lg p-2.5 text-on-surface-variant transition hover:bg-error-container hover:text-on-error-container" aria-label={`Xóa thông số ${index + 1}`}>
                        <Trash2 aria-hidden="true" className="size-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <button type="button" onClick={() => setSpecs((currentSpecs) => [...currentSpecs, { label: "", value: "" }])} className="mt-4 inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-label-sm font-semibold text-primary transition hover:bg-primary-fixed">
                  <Plus aria-hidden="true" className="size-4" />
                  Thêm thông số
                </button>
              </fieldset>

              <div>
                <label htmlFor="product-stock" className="text-label-md font-semibold text-on-surface">Trạng thái tồn kho *</label>
                <p className="mt-1 text-body-sm text-on-surface-variant">Website chỉ hiển thị Còn hàng / Không còn hàng; giá luôn dẫn về liên hệ tư vấn.</p>
                <select id="product-stock" name="StockQuantity" required defaultValue="100" className="mt-1.5 w-full rounded-lg bg-surface-container-low px-3 py-2.5 text-body-md outline-none ring-1 ring-outline-variant/30 focus:ring-primary">
                  <option value="100">Còn hàng</option>
                  <option value="0">Không còn hàng</option>
                </select>
              </div>

              <div>
                <label htmlFor="product-visibility" className="text-label-md font-semibold text-on-surface">Trạng thái hiển thị *</label>
                <select id="product-visibility" name="IsActive" required defaultValue="true" className="mt-1.5 w-full rounded-lg bg-surface-container-low px-3 py-2.5 text-body-md outline-none ring-1 ring-outline-variant/30 focus:ring-primary">
                  <option value="true">Đang hiển thị</option>
                  <option value="false">Đang ẩn</option>
                </select>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="product-category" className="text-label-md font-semibold text-on-surface">Danh mục *</label>
                  <select id="product-category" name="CategoryId" required defaultValue="" className="mt-1.5 w-full rounded-lg bg-surface-container-low px-3 py-2.5 text-body-md outline-none ring-1 ring-outline-variant/30 focus:ring-primary">
                    <option value="" disabled>Chọn danh mục</option>
                    {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="product-brand" className="text-label-md font-semibold text-on-surface">Thương hiệu *</label>
                  <select id="product-brand" name="BrandId" required defaultValue="" className="mt-1.5 w-full rounded-lg bg-surface-container-low px-3 py-2.5 text-body-md outline-none ring-1 ring-outline-variant/30 focus:ring-primary">
                    <option value="" disabled>Chọn thương hiệu</option>
                    {brands.map((brand) => <option key={brand.id} value={brand.id}>{brand.name}</option>)}
                  </select>
                </div>
              </div>

              <ImageUploadField id="product-image" name="Images" label="Ảnh sản phẩm" required emptyText="Chọn tối đa 3 ảnh JPG, PNG hoặc WEBP" multiple maxFiles={3} maxTotalSizeInBytes={8 * 1024 * 1024} />

              {state.error ? <p role="alert" className="rounded-lg border border-error/20 bg-error-container px-3 py-2.5 text-body-sm leading-5 text-on-error-container">{state.error}</p> : null}

              <footer className="flex justify-end gap-3 border-t border-outline-variant/20 pt-5">
                <button type="button" onClick={closeDialog} className="rounded-lg px-4 py-2.5 text-label-md font-semibold text-on-surface-variant hover:bg-surface-container">Đóng</button>
                <SubmitButton />
              </footer>
            </form>
          </section>
        </div>
      ) : null}
    </>
  );
}
