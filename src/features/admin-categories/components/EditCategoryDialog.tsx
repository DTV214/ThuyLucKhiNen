"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { LoaderCircle, Pencil, Save, X } from "lucide-react";
import type { CategoryRecord } from "@/features/admin-api/server/admin-api";
import { ImageUploadField } from "@/features/admin-core/components/ImageUploadField";
import { updateCategory } from "@/features/admin-categories/actions/category-actions";
import { categoryMutationInitialState } from "@/features/admin-categories/data/category-mutation-state";

function SubmitButton() {
  const { pending } = useFormStatus();
  return <button type="submit" disabled={pending} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-label-md font-semibold text-on-primary disabled:cursor-wait disabled:opacity-70">{pending ? <LoaderCircle aria-hidden="true" className="size-4 animate-spin" /> : <Save aria-hidden="true" className="size-4" />}{pending ? "Đang lưu..." : "Lưu thay đổi"}</button>;
}

export function EditCategoryDialog({ category }: Readonly<{ category: CategoryRecord }>) {
  const [isOpen, setIsOpen] = useState(false);
  const updateAction = updateCategory.bind(null, String(category.id));
  const [state, formAction] = useActionState(updateAction, categoryMutationInitialState);

  return <><button type="button" onClick={() => setIsOpen(true)} className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-label-sm font-semibold text-primary transition hover:bg-primary-fixed"><Pencil aria-hidden="true" className="size-4" />Sửa</button>{isOpen ? <div className="fixed inset-0 z-[60] flex items-end justify-center bg-on-surface/45 p-0 sm:items-center sm:p-6" role="presentation"><section role="dialog" aria-modal="true" aria-labelledby={`edit-category-${category.id}`} className="w-full max-w-lg rounded-t-2xl bg-surface-container-lowest shadow-2xl sm:rounded-2xl"><header className="flex items-start justify-between border-b border-outline-variant/20 p-5"><div><p className="text-label-sm font-semibold uppercase tracking-wider text-primary">Cấu trúc catalog</p><h2 id={`edit-category-${category.id}`} className="mt-1 text-headline-md font-bold text-on-surface">Sửa danh mục</h2></div><button type="button" onClick={() => setIsOpen(false)} className="rounded-lg p-2 text-on-surface-variant hover:bg-surface-container" aria-label="Đóng biểu mẫu"><X aria-hidden="true" className="size-5" /></button></header><form action={formAction} className="space-y-5 p-5"><div><label htmlFor={`category-name-${category.id}`} className="text-label-md font-semibold text-on-surface">Tên danh mục *</label><input id={`category-name-${category.id}`} name="name" required defaultValue={category.name} className="mt-1.5 w-full rounded-lg bg-surface-container-low px-3 py-2.5 text-body-md outline-none ring-1 ring-outline-variant/30 focus:ring-primary" /></div><div><label htmlFor={`category-description-${category.id}`} className="text-label-md font-semibold text-on-surface">Mô tả</label><textarea id={`category-description-${category.id}`} name="description" rows={4} defaultValue={category.description ?? ""} className="mt-1.5 w-full resize-y rounded-lg bg-surface-container-low px-3 py-2.5 text-body-md outline-none ring-1 ring-outline-variant/30 focus:ring-primary" /></div><ImageUploadField id={`category-image-${category.id}`} name="image" label="Ảnh đại diện danh mục" currentImageUrl={category.imageUrl} emptyText="Chọn ảnh đại diện danh mục" />{state.error ? <p role="alert" className="rounded-lg border border-error/20 bg-error-container px-3 py-2.5 text-body-sm text-on-error-container">{state.error}</p> : null}<footer className="flex justify-end gap-3 border-t border-outline-variant/20 pt-5"><button type="button" onClick={() => setIsOpen(false)} className="rounded-lg px-4 py-2.5 text-label-md font-semibold text-on-surface-variant hover:bg-surface-container">Hủy</button><SubmitButton /></footer></form></section></div> : null}</>;
}
