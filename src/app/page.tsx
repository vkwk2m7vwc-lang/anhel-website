import { HonestLusionHero } from "@/components/honest/HonestLusionHero";
import { ProductsShowcase } from "@/components/home/ProductsShowcase";

/**
 * Home page — VARIANT honest-lusion (lusion.co inspired).
 *
 * Кинетическая типографика на курсор. Заголовок «ANHEL — это
 * честно» расщеплён на 3 слова, каждое сдвигается отдельно по
 * cursor-tracking spring physics. Радиал «лужи света» следует
 * за курсором, кастомный cursor-blob в difference blend.
 */
export default function Home() {
  return (
    <>
      <HonestLusionHero />
      <ProductsShowcase />
    </>
  );
}
