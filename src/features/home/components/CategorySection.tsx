import Image from "next/image";
import Link from "next/link";
import { ArrowRight, PackageSearch } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import type { PublicEntity, PublicProduct } from "@/features/core/api/public-api";

type CategorySectionProps = Readonly<{
  categories: ReadonlyArray<PublicEntity>;
  products: ReadonlyArray<PublicProduct>;
}>;

export function CategorySection({ categories, products }: CategorySectionProps) {
  const visibleCategories = categories.slice(0, 5);

  return (
    <section id="danh-muc" className="mx-auto max-w-7xl px-gutter py-20">
      <Reveal className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div><p className="text-label-md font-semibold uppercase tracking-wider text-primary">Danh mục thiết bị</p><h2 className="mt-2 text-headline-lg font-bold text-on-surface">Thiết bị Thủy lực &amp; Cơ khí Công nghiệp</h2></div>
        <Link href="/san-pham" className="inline-flex items-center gap-1 text-label-md font-semibold text-primary hover:underline">Xem toàn bộ danh mục <ArrowRight className="size-4" /></Link>
      </Reveal>
      {visibleCategories.length ? <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {visibleCategories.map((category, index) => {
          const count = products.filter((product) => product.categoryId === category.id).length;
          return <Reveal key={category.id} delay={index * 0.04} className="h-full"><Link href="/san-pham" className="group flex h-full min-h-[390px] flex-col rounded-2xl bg-surface-container-low p-5 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl bg-surface">
              {category.imageUrl ? <Image src={category.imageUrl} alt={category.name} fill sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw" className="object-contain p-2 transition duration-300 group-hover:scale-105" /> : <PackageSearch className="size-10 text-primary/60" />}
            </div>
            <h3 className="mt-5 line-clamp-2 h-14 text-headline-sm font-semibold leading-7 text-on-surface" title={category.name}>{category.name}</h3>
            <p className="mt-1 line-clamp-2 h-10 text-body-sm leading-5 text-on-surface-variant">{category.description || "Khám phá danh mục thiết bị công nghiệp chính hãng."}</p>
            <span className="mt-auto flex items-center justify-between pt-5 text-label-sm font-semibold text-primary">{count ? `${count} sản phẩm` : "Xem sản phẩm"}<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span>
          </Link></Reveal>;
        })}
      </div> : <p className="mt-10 rounded-2xl bg-surface-container-low p-6 text-body-md text-on-surface-variant">Danh mục đang được cập nhật. Vui lòng xem toàn bộ sản phẩm hoặc liên hệ để được tư vấn.</p>}
    </section>
  );
}
