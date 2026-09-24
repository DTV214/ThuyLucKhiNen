"use client";

import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { useMemo, useState } from "react";
import type { PublicProduct } from "@/features/core/api/public-api";

type ProductGalleryProps = Readonly<{ product: Pick<PublicProduct, "imageUrl" | "imageGallery" | "name"> }>;

/** Lightweight product gallery; CAD controls are intentionally omitted until real CAD assets are available. */
export function ProductGallery({ product }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(0);
  const images = useMemo(
    () => [product.imageUrl, ...product.imageGallery].filter((image): image is string => Boolean(image)).slice(0, 3),
    [product.imageGallery, product.imageUrl],
  );
  const visibleImage = images[activeImage] ?? images[0];

  return (
    <section aria-label={`Hình ảnh ${product.name}`}>
      <div className="inline-flex items-center gap-2 rounded-xl bg-surface-container px-4 py-2.5 text-label-md font-semibold text-on-surface"><ImageIcon className="size-4 text-primary" />Hình ảnh sản phẩm</div>
      <div className="relative mt-4 aspect-4/3 overflow-hidden rounded-2xl bg-white shadow-sm">{visibleImage ? <Image src={visibleImage} alt={`${product.name} — ảnh ${activeImage + 1}`} fill priority sizes="(min-width: 1024px) 58vw, 100vw" className="object-contain p-4" /> : <div className="flex h-full items-center justify-center text-body-md text-on-surface-variant">Chưa có ảnh sản phẩm.</div>}</div>
      {images.length > 1 ? <div className="mt-4 grid grid-cols-3 gap-3">{images.map((image, index) => <button key={image} type="button" onClick={() => setActiveImage(index)} aria-label={`Xem ảnh ${index + 1}`} aria-pressed={activeImage === index} className={`relative aspect-4/3 overflow-hidden rounded-xl bg-white ${activeImage === index ? "ring-2 ring-primary" : "opacity-70 hover:opacity-100"}`}><Image src={image} alt="" fill sizes="(min-width: 1024px) 18vw, 33vw" className="object-contain p-1.5" /></button>)}</div> : null}
    </section>
  );
}
