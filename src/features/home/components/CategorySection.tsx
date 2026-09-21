import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { categories } from "@/features/home/data/home-data";

export function CategorySection() {
  return (
    <section id="danh-muc" className="mx-auto max-w-7xl px-gutter py-20">
      <Reveal className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="text-label-md font-semibold uppercase tracking-wider text-primary">Danh mục thiết bị</p><h2 className="mt-2 text-headline-lg font-bold text-on-surface">Thiết bị Thủy lực &amp; Cơ khí Công nghiệp</h2></div><Link href="/san-pham" className="inline-flex items-center gap-1 text-label-md font-semibold text-primary hover:underline">Xem toàn bộ danh mục <ArrowRight className="size-4" /></Link></Reveal>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {categories.map((category, index) => <Reveal key={category.title} delay={index * 0.04}><Link href={category.href} className="group flex h-full flex-col rounded-2xl bg-surface-container-low p-5 transition duration-300 hover:-translate-y-1 hover:shadow-xl"><div className="relative aspect-square overflow-hidden rounded-xl"><Image src={category.image} alt={category.title} fill sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-300 group-hover:scale-105" /></div><h3 className="mt-5 text-headline-sm font-semibold text-on-surface">{category.title}</h3><p className="mt-1 text-body-sm leading-5 text-on-surface-variant">{category.description}</p><span className="mt-5 flex items-center justify-between text-label-sm font-semibold text-primary">{category.count}<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span></Link></Reveal>)}
      </div>
    </section>
  );
}
