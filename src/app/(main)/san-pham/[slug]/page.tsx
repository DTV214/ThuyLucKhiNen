import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/features/product/components/ProductGallery";
import { ProductInfo } from "@/features/product/components/ProductInfo";
import { RelatedProducts } from "@/features/product/components/RelatedProducts";
import { SpecsTable } from "@/features/product/components/SpecsTable";
import { getPublicProducts } from "@/features/core/api/public-api";

export const revalidate = 60;

type ProductPageProps = Readonly<{ params: Promise<{ slug: string }> }>;

async function getProductPageData(slug: string) {
  const catalogue = await getPublicProducts({ page: 1, pageSize: 100 });
  return { catalogue, product: catalogue.items.find((item) => item.slug === slug) };
}

export async function generateStaticParams() {
  const catalogue = await getPublicProducts({ page: 1, pageSize: 100 });
  return catalogue.items.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { product } = await getProductPageData(slug);
  if (!product) return { title: "Sản phẩm không tồn tại | CTY ThanhDanh-VMC" };

  const description = product.description || `Thông số và tư vấn báo giá ${product.name} từ CTY ThanhDanh-VMC.`;
  return { title: `${product.name} | CTY ThanhDanh-VMC`, description: description.slice(0, 160) };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const { catalogue, product } = await getProductPageData(slug);
  if (!product) notFound();

  const relatedCatalogue = product.categoryId
    ? await getPublicProducts({ page: 1, pageSize: 12, categoryId: product.categoryId })
    : catalogue;
  const relatedProducts = relatedCatalogue.items.some((item) => item.id !== product.id)
    ? relatedCatalogue.items
    : catalogue.items;

  return <><div className="mx-auto max-w-7xl px-gutter py-5"><nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-body-sm text-on-surface-variant"><Link href="/" className="hover:text-primary">Trang chủ</Link><ChevronRight className="size-4" /><Link href="/san-pham" className="hover:text-primary">Sản phẩm</Link><ChevronRight className="size-4" /><span className="font-medium text-on-surface">{product.name}</span></nav></div><section className="mx-auto max-w-7xl px-gutter pb-16"><div className="grid gap-10 lg:grid-cols-12"><div className="lg:col-span-7"><ProductGallery product={product} /></div><div className="lg:col-span-5"><ProductInfo product={product} /></div></div></section><section className="bg-surface-container-low px-gutter py-16"><div className="mx-auto max-w-5xl"><SpecsTable product={product} /></div></section><RelatedProducts currentProductId={product.id} products={relatedProducts} /></>;
}
