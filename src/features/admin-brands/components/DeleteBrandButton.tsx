"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteBrand } from "@/features/admin-brands/actions/brand-actions";

export function DeleteBrandButton({ id, name }: Readonly<{ id: string | number; name: string }>) {
  const [isPending, startTransition] = useTransition();
  function handleDelete() {
    if (!window.confirm(`Xóa thương hiệu “${name}”? Các sản phẩm đang liên kết có thể bị ảnh hưởng.`)) return;
    startTransition(async () => {
      const result = await deleteBrand(String(id));
      if (result.error) window.alert(result.error);
    });
  }
  return <button type="button" disabled={isPending} onClick={handleDelete} className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-label-sm font-semibold text-error transition hover:bg-error-container disabled:cursor-wait disabled:opacity-60"><Trash2 aria-hidden="true" className="size-4" />{isPending ? "Đang xóa" : "Xóa"}</button>;
}
