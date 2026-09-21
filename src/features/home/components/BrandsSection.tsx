import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

const brands = [
  { name: "STNC", image: "https://res.cloudinary.com/dratbz8bh/image/upload/c_pad,b_white,w_640,h_320,f_auto,q_auto/v1789987590/StncBrand2_lzr8pg.jpg" },
  { name: "Bosch Rexroth", image: "https://res.cloudinary.com/dratbz8bh/image/upload/c_pad,b_white,w_640,h_320,f_auto,q_auto/v1789987587/LogoBrand7_f1nck8.png" },
  { name: "Parker", image: "https://res.cloudinary.com/dratbz8bh/image/upload/v1789988285/logo_brand8_mwg5h5.jpg" },
  { name: "Hy-Lok", image: "https://res.cloudinary.com/dratbz8bh/image/upload/c_pad,b_white,w_640,h_320,f_auto,q_auto/v1789987586/LogoBrand5_lizou2.png" },
  { name: "Swagelok", image: "https://res.cloudinary.com/dratbz8bh/image/upload/c_pad,b_white,w_640,h_320,f_auto,q_auto/v1789987586/LogoBrand4_btfy0o.jpg" },
  { name: "SMC", image: "https://res.cloudinary.com/dratbz8bh/image/upload/c_pad,b_white,w_640,h_320,f_auto,q_auto/v1789987576/LogoBRand3_qraalv.webp" },
  { name: "Yuken", image: "https://res.cloudinary.com/dratbz8bh/image/upload/c_pad,b_white,w_640,h_320,f_auto,q_auto/v1789987575/LogoBrand1_e5xjco.png" },
  { name: "Festo", image: "https://res.cloudinary.com/dratbz8bh/image/upload/v1789988374/logo_brand9_zzfccc.png" },

] as const;

/** Logos are normalized by Cloudinary and displayed inside a fixed-ratio canvas. */
export function BrandsSection() {
  return (
    <section id="thuong-hieu" className="bg-surface-container-low px-gutter py-20"><div className="mx-auto max-w-7xl"><Reveal className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="text-label-md font-semibold uppercase tracking-wider text-primary">Thương hiệu phân phối</p><h2 className="mt-2 text-headline-lg font-bold text-on-surface">Đối tác &amp; Thương hiệu trọng điểm</h2></div><p className="max-w-md text-body-md leading-6 text-on-surface-variant">Danh mục sản phẩm đến từ các thương hiệu thủy lực và khí nén được doanh nghiệp tin dùng.</p></Reveal><div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">{brands.map((brand, index) => <Reveal key={brand.name} delay={index * 0.04}><article className="group relative aspect-[2/1] overflow-hidden rounded-xl border border-outline-variant/20 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"><Image src={brand.image} alt={`Logo ${brand.name}`} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw" className="object-contain p-5 transition duration-300 group-hover:scale-105 sm:p-7" /></article></Reveal>)}</div><Reveal className="mt-8 text-center"><Link href="/thuong-hieu" className="inline-flex items-center gap-2 text-label-md font-semibold text-primary hover:underline">Xem tất cả thương hiệu <ArrowRight className="size-4" /></Link></Reveal></div></section>
  );
}
