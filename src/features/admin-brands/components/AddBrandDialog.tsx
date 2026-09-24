"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { Building2, LoaderCircle, Plus, X } from "lucide-react";
import { createBrand } from "@/features/admin-brands/actions/brand-actions";
import { brandMutationInitialState } from "@/features/admin-brands/data/brand-mutation-state";
import { ImageUploadField } from "@/features/admin-core/components/ImageUploadField";

function SubmitButton() {
  const { pending } = useFormStatus();
  return <button type="submit" disabled={pending} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-label-md font-semibold text-on-primary transition hover:bg-primary-container disabled:cursor-wait disabled:opacity-70">{pending ? <LoaderCircle aria-hidden="true" className="size-4 animate-spin" /> : <Plus aria-hidden="true" className="size-4" />}{pending ? "Đang tạo..." : "Tạo thương hiệu"}</button>;
}

export function AddBrandDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction] = useActionState(createBrand, brandMutationInitialState);

  return <><button type="button" onClick={() => setIsOpen(true)} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-label-md font-semibold text-on-primary shadow-sm transition hover:bg-primary-container"><Plus aria-hidden="true" className="size-4" />Thêm thương hiệu</button>{isOpen ? <div className="fixed inset-0 z-[60] flex items-end justify-center bg-on-surface/45 p-0 sm:items-center sm:p-6" role="presentation"><section role="dialog" aria-modal="true" aria-labelledby="create-brand-title" className="w-full max-w-lg rounded-t-2xl bg-surface-container-lowest shadow-2xl sm:rounded-2xl"><header className="flex items-start justify-between border-b border-outline-variant/20 p-5"><div><p className="text-label-sm font-semibold uppercase tracking-wider text-primary">Đối tác &amp; nhà sản xuất</p><h2 id="create-brand-title" className="mt-1 text-headline-md font-bold text-on-surface">Thêm thương hiệu mới</h2></div><button type="button" onClick={() => setIsOpen(false)} className="rounded-lg p-2 text-on-surface-variant hover:bg-surface-container" aria-label="Đóng biểu mẫu"><X aria-hidden="true" className="size-5" /></button></header><form action={formAction} className="space-y-5 p-5"><div><label htmlFor="brand-name" className="text-label-md font-semibold text-on-surface">Tên thương hiệu *</label><div className="relative mt-1.5"><Building2 aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-outline" /><input id="brand-name" name="name" required placeholder="Ví dụ: Bosch Rexroth" className="w-full rounded-lg bg-surface-container-low py-2.5 pl-10 pr-3 text-body-md outline-none ring-1 ring-outline-variant/30 focus:ring-primary" /></div></div><div><label htmlFor="brand-description" className="text-label-md font-semibold text-on-surface">Mô tả</label><textarea id="brand-description" name="description" rows={4} placeholder="Giới thiệu ngắn về thương hiệu..." className="mt-1.5 w-full resize-y rounded-lg bg-surface-container-low px-3 py-2.5 text-body-md outline-none ring-1 ring-outline-variant/30 focus:ring-primary" /></div><ImageUploadField id="brand-image" name="image" label="Logo thương hiệu" emptyText="Chọn logo hoặc hình ảnh đại diện" objectFit="contain" />{state.error ? <p role="alert" className="rounded-lg bg-error-container px-3 py-2.5 text-body-sm text-on-error-container">{state.error}</p> : null}{state.success ? <p role="status" className="rounded-lg bg-secondary-fixed px-3 py-2.5 text-body-sm text-on-secondary-fixed">{state.success}</p> : null}<footer className="flex justify-end gap-3 border-t border-outline-variant/20 pt-5"><button type="button" onClick={() => setIsOpen(false)} className="rounded-lg px-4 py-2.5 text-label-md font-semibold text-on-surface-variant hover:bg-surface-container">Đóng</button><SubmitButton /></footer></form></section></div> : null}</>;
}
