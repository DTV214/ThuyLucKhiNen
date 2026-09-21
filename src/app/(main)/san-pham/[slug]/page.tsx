import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/features/product/components/ProductGallery";
import { ProductInfo } from "@/features/product/components/ProductInfo";
import { QuoteForm } from "@/features/product/components/QuoteForm";
import { RelatedProducts } from "@/features/product/components/RelatedProducts";
import { SpecsTable } from "@/features/product/components/SpecsTable";
import { getProductBySlug, productDetail } from "@/features/product/data/product-detail-data";

type ProductPageProps = Readonly<{ params: Promise<{ slug: string }> }>;

export async function generateStaticParams() {
  return [{ slug: productDetail.slug }];
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Sản phẩm không tồn tại | CTY ThanhDanh-VMC" };
  return { title: `${product.name} | CTY ThanhDanh-VMC`, description: `${product.shortDescription.slice(0, 150)}...` };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  return <><div className="mx-auto max-w-7xl px-gutter py-5"><nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-body-sm text-on-surface-variant"><Link href="/" className="hover:text-primary">Trang chủ</Link><ChevronRight className="size-4" /><Link href="/san-pham" className="hover:text-primary">Sản phẩm</Link><ChevronRight className="size-4" /><span className="font-medium text-on-surface">{product.name}</span></nav></div><section className="mx-auto max-w-7xl px-gutter pb-16"><div className="grid gap-10 lg:grid-cols-12"><div className="lg:col-span-7"><ProductGallery product={product} /></div><div className="lg:col-span-5"><ProductInfo product={product} /></div></div></section><section className="bg-surface-container-low px-gutter py-16"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-12"><div className="lg:col-span-7"><SpecsTable product={product} /></div><div className="lg:col-span-5"><QuoteForm productName={product.name} /></div></div></section><RelatedProducts /></>;
}
