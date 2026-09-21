"use client";

import Image from "next/image";
import { Box, ImageIcon, Play } from "lucide-react";
import { useState } from "react";
import type { ProductDetail } from "@/features/product/data/product-detail-data";

type ProductGalleryProps = Readonly<{ product: Pick<ProductDetail, "images" | "name"> }>;

export function ProductGallery({ product }: ProductGalleryProps) {
  const [activeTab, setActiveTab] = useState<"photos" | "cad">("photos");
  const [activeImage, setActiveImage] = useState(0);

  return (
    <section aria-label={`Hình ảnh ${product.name}`}><div className="inline-flex rounded-xl bg-surface-container p-1"><button type="button" onClick={() => setActiveTab("photos")} aria-pressed={activeTab === "photos"} className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-label-md font-semibold transition ${activeTab === "photos" ? "bg-surface text-on-surface shadow-sm" : "text-on-surface-variant hover:text-on-surface"}`}><ImageIcon className="size-4" />Hình ảnh thực tế</button><button type="button" onClick={() => setActiveTab("cad")} aria-pressed={activeTab === "cad"} className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-label-md font-semibold transition ${activeTab === "cad" ? "bg-surface text-on-surface shadow-sm" : "text-on-surface-variant hover:text-on-surface"}`}><Box className="size-4" />Xem CAD / 3D</button></div><div className="relative mt-4 aspect-4/3 overflow-hidden rounded-2xl bg-surface-container shadow-sm">{activeTab === "photos" ? <Image src={product.images[activeImage].src} alt={product.images[activeImage].alt} fill priority sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" /> : <div className="flex h-full flex-col items-center justify-center p-8 text-center"><span className="flex size-20 items-center justify-center rounded-full bg-primary-fixed text-primary"><Box className="size-10" /></span><h2 className="mt-5 text-headline-sm font-semibold text-on-surface">Trình xem CAD 3D tương tác</h2><p className="mt-2 max-w-md text-body-md leading-6 text-on-surface-variant">Mô hình 3D sẽ được tích hợp khi tài liệu STEP chính thức của sản phẩm được cung cấp.</p><button type="button" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-label-md font-semibold text-on-primary"><Play className="size-4" />Khởi chạy mô hình 3D</button></div>}</div>{activeTab === "photos" && <div className="mt-4 grid grid-cols-3 gap-3">{product.images.map((image, index) => <button key={image.src} type="button" onClick={() => setActiveImage(index)} aria-label={`Xem ảnh ${index + 1}`} aria-pressed={activeImage === index} className={`relative aspect-4/3 overflow-hidden rounded-xl bg-surface-container ${activeImage === index ? "ring-2 ring-primary" : "opacity-70 hover:opacity-100"}`}><Image src={image.src} alt="" fill sizes="(min-width: 1024px) 18vw, 33vw" className="object-cover" /></button>)}</div>}</section>
  );
}
