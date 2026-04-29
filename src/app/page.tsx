import { HonestMozhnoHero } from "@/components/honest/HonestMozhnoHero";
import { ProductsShowcase } from "@/components/home/ProductsShowcase";

/**
 * Home page — VARIANT honest-mozhno «ANHEL, можно а зачем».
 *
 * Hero с мемно-цитатным заголовком (отсылка к Lada-эпохе:
 * «можно, а зачем»). Бренд-голос как самоирония — против
 * маркетингового излишества и слоганов про экосистему.
 * Под hero обычный ProductsShowcase.
 */
export default function Home() {
  return (
    <>
      <HonestMozhnoHero />
      <ProductsShowcase />
    </>
  );
}
