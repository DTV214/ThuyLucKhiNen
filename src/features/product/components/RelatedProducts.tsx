import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ImageOff, PackageSearch } from "lucide-react";
import type { PublicProduct } from "@/features/core/api/public-api";

type RelatedProductsProps = Readonly<{
  currentProductId: string;
  products: ReadonlyArray<PublicProduct>;
}>;

/** Product-discovery banner with live related cards whenever the catalogue has matches. */
export function RelatedProducts({ currentProductId, products }: RelatedProductsProps) {
  const relatedProducts = products.filter((product) => product.id !== currentProductId).slice(0, 4);

  return (
    <section className="bg-surface px-gutter py-16"><div className="mx-auto max-w-7xl"><div className="overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-primary-container p-7 text-on-primary shadow-lg sm:flex sm:items-center sm:justify-between sm:p-10"><div className="max-w-2xl"><p className="text-label-md font-semibold uppercase tracking-wider text-secondary-fixed">Khám phá thêm</p><h2 className="mt-2 text-headline-md font-bold">Sản phẩm liên quan &amp; thiết bị cùng hệ thống</h2><p className="mt-3 text-body-md leading-6 text-on-primary/85">Xem thêm mã thiết bị, phụ kiện và phương án thay thế phù hợp trong catalogue CTY ThanhDanh-VMC.</p></div><Link href="/san-pham" className="mt-6 inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-secondary-container px-5 py-3 text-label-md font-semibold text-on-secondary-container transition hover:bg-secondary-fixed sm:mt-0"><PackageSearch className="size-4" />Xem toàn bộ sản phẩm</Link></div>
      {relatedProducts.length ? <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{relatedProducts.map((product) => <article key={product.id} className="flex h-full flex-col overflow-hidden rounded-2xl border border-outline-variant/15 bg-surface-container-low shadow-sm transition hover:-translate-y-1 hover:shadow-md"><div className="relative flex aspect-[4/3] items-center justify-center bg-surface">{product.imageUrl ? <Image src={product.imageUrl} alt={product.name} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" /> : <ImageOff className="size-8 text-outline" />}</div><div className="flex flex-1 flex-col p-4"><span className="w-fit rounded bg-surface px-2 py-1 text-label-sm text-outline">{product.categoryName}</span><h3 className="mt-3 text-headline-sm font-semibold text-on-surface">{product.name}</h3><p className="mt-2 line-clamp-2 text-body-sm leading-5 text-on-surface-variant">{product.description || "Xem thông số và nhận tư vấn mã tương đương."}</p><Link href={`/san-pham/${product.slug}`} className="mt-5 inline-flex items-center gap-1 text-label-md font-semibold text-primary hover:underline">Xem chi tiết <ArrowRight className="size-4" /></Link></div></article>)}</div> : <p className="mt-7 text-center text-body-md text-on-surface-variant">Các sản phẩm liên quan sẽ xuất hiện khi catalogue được cập nhật thêm dữ liệu.</p>}
    </div></section>
  );
}
