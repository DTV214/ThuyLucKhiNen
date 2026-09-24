import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import type { PublicEntity } from "@/features/core/api/public-api";

type BrandsSectionProps = Readonly<{ brands: ReadonlyArray<PublicEntity> }>;

function normalizedLogoUrl(imageUrl: string) {
  return imageUrl.includes("res.cloudinary.com/")
    ? imageUrl.replace("/upload/", "/upload/c_pad,b_white,w_960,h_360,f_auto,q_auto/")
    : imageUrl;
}

/** Each logo is contained in a fixed-height canvas so different source ratios cannot crop or distort it. */
export function BrandsSection({ brands }: BrandsSectionProps) {
  return (
    <section id="thuong-hieu" className="bg-surface-container-low px-gutter py-20"><div className="mx-auto max-w-7xl">
      <Reveal className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="text-label-md font-semibold uppercase tracking-wider text-primary">Thương hiệu phân phối</p><h2 className="mt-2 text-headline-lg font-bold text-on-surface">Đối tác &amp; Thương hiệu trọng điểm</h2></div><p className="max-w-md text-body-md leading-6 text-on-surface-variant">Danh mục sản phẩm đến từ các thương hiệu thủy lực và khí nén được doanh nghiệp tin dùng.</p></Reveal>
      {brands.length ? <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">{brands.map((brand, index) => <Reveal key={brand.id} delay={index * 0.04}><article className="flex h-full flex-col rounded-xl border border-outline-variant/20 bg-white p-2.5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md">
        <div className="relative flex aspect-[16/7] w-full items-center justify-center rounded-lg border border-outline-variant/10 bg-white">{brand.imageUrl ? <Image src={normalizedLogoUrl(brand.imageUrl)} alt={`Logo ${brand.name}`} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" className="object-contain p-2" /> : <BadgeCheck className="size-9 text-primary" />}</div>
        <h3 className="mt-2 line-clamp-1 px-1 text-center text-label-sm font-semibold text-on-surface">{brand.name}</h3>
      </article></Reveal>)}</div> : <p className="mt-10 rounded-2xl bg-surface p-6 text-body-md text-on-surface-variant">Thương hiệu phân phối đang được cập nhật.</p>}
    </div></section>
  );
}
