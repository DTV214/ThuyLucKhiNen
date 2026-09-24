/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { ImagePlus } from "lucide-react";

type ImageUploadFieldProps = Readonly<{
  id: string;
  name: string;
  label: string;
  required?: boolean;
  currentImageUrl?: string | null;
  currentImageUrls?: readonly string[];
  emptyText: string;
  objectFit?: "contain" | "cover";
  multiple?: boolean;
  maxFiles?: number;
  maxTotalSizeInBytes?: number;
}>;

/**
 * Native file picker with object-URL previews. A product may opt into three
 * images; Brand and Category continue using a single image.
 */
export function ImageUploadField({
  id,
  name,
  label,
  required = false,
  currentImageUrl = null,
  currentImageUrls = [],
  emptyText,
  objectFit = "cover",
  multiple = false,
  maxFiles = 1,
  maxTotalSizeInBytes,
}: ImageUploadFieldProps) {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [selectionError, setSelectionError] = useState<string | null>(null);

  useEffect(() => () => {
    previewUrls.forEach((url) => URL.revokeObjectURL(url));
  }, [previewUrls]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    if (files.length > maxFiles) {
      event.currentTarget.value = "";
      setPreviewUrls([]);
      setFileNames([]);
      setSelectionError(`Chỉ được chọn tối đa ${maxFiles} ảnh.`);
      return;
    }

    const totalSize = files.reduce((total, file) => total + file.size, 0);
    if (maxTotalSizeInBytes !== undefined && totalSize > maxTotalSizeInBytes) {
      event.currentTarget.value = "";
      setPreviewUrls([]);
      setFileNames([]);
      setSelectionError(`Tổng dung lượng ảnh vượt quá ${Math.floor(maxTotalSizeInBytes / 1024 / 1024)}MB. Vui lòng chọn ảnh nhẹ hơn.`);
      return;
    }

    setSelectionError(null);
    setFileNames(files.map((file) => file.name));
    setPreviewUrls(files.map((file) => URL.createObjectURL(file)));
  }

  const existingImages = currentImageUrls.length > 0
    ? currentImageUrls
    : currentImageUrl ? [currentImageUrl] : [];
  const visibleImages = previewUrls.length > 0 ? previewUrls : existingImages;
  const hasNewSelection = fileNames.length > 0;

  return (
    <div>
      <label htmlFor={id} className="text-label-md font-semibold text-on-surface">{label}{required ? " *" : ""}</label>
      <label htmlFor={id} className="mt-1.5 flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-outline-variant bg-surface-container-low p-3 text-body-sm text-on-surface-variant transition hover:border-primary hover:bg-primary/5">
        {visibleImages.length > 0 ? <span className="grid shrink-0 grid-cols-3 gap-1">{visibleImages.slice(0, maxFiles).map((url, index) => <img key={url} src={url} alt={`Xem trước ảnh ${index + 1}`} className={`size-14 rounded-md border border-outline-variant/30 bg-white p-1 ${objectFit === "contain" ? "object-contain" : "object-cover"}`} />)}</span> : <span className="flex size-14 shrink-0 items-center justify-center rounded-md bg-primary-fixed text-primary"><ImagePlus aria-hidden="true" className="size-6" /></span>}
        <span className="min-w-0"><span className="block font-medium text-on-surface">{hasNewSelection ? fileNames.join(", ") : (existingImages.length > 0 ? "Ảnh hiện tại — chọn ảnh mới để thay thế" : emptyText)}</span><span className="mt-0.5 block truncate text-body-sm text-on-surface-variant">{hasNewSelection ? `${fileNames.length}/${maxFiles} ảnh sẵn sàng tải lên` : multiple ? `Tối đa ${maxFiles} ảnh${maxTotalSizeInBytes ? ` · tối đa ${Math.floor(maxTotalSizeInBytes / 1024 / 1024)}MB` : ""} · JPG, PNG, WEBP` : "JPG, PNG, WEBP"}</span></span>
      </label>
      <input id={id} name={name} required={required} type="file" accept="image/*" multiple={multiple} onChange={handleChange} className="sr-only" />
      {selectionError ? <p role="alert" className="mt-2 text-body-sm font-medium text-error">{selectionError}</p> : null}
    </div>
  );
}
