import { BrandsSection } from "@/features/home/components/BrandsSection";
import { CategorySection } from "@/features/home/components/CategorySection";
import { ContactCtaSection } from "@/features/home/components/ContactCtaSection";
import { DistributionAdvantagesSection } from "@/features/home/components/DistributionAdvantagesSection";
import { FeaturedProductsSection } from "@/features/home/components/FeaturedProductsSection";
import { HeroSection } from "@/features/home/components/HeroSection";

/** Composition root for the home feature. Each section owns its own presentation and data. */
export default function HomePage() {
  return <><HeroSection /><CategorySection /><FeaturedProductsSection /><DistributionAdvantagesSection /><BrandsSection /><ContactCtaSection /></>;
}
