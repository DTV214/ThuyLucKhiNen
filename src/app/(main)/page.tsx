import { BrandsSection } from "@/features/home/components/BrandsSection";
import { CategorySection } from "@/features/home/components/CategorySection";
import { ContactCtaSection } from "@/features/home/components/ContactCtaSection";
import { DistributionAdvantagesSection } from "@/features/home/components/DistributionAdvantagesSection";
import { FeaturedProductsSection } from "@/features/home/components/FeaturedProductsSection";
import { HeroSection } from "@/features/home/components/HeroSection";
import { getPublicBrands, getPublicCategories, getPublicProducts } from "@/features/core/api/public-api";

/** Composition root for the home feature; catalogue content is served by the public API. */
export default async function HomePage() {
  const [products, categories, brands] = await Promise.all([
    getPublicProducts({ page: 1, pageSize: 12 }),
    getPublicCategories(),
    getPublicBrands(),
  ]);

  return <><HeroSection /><CategorySection categories={categories} products={products.items} /><FeaturedProductsSection products={products.items} /><DistributionAdvantagesSection /><BrandsSection brands={brands} /><ContactCtaSection /></>;
}
