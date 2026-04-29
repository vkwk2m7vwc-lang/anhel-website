import { HonestOffmenuHero } from "@/components/honest/HonestOffmenuHero";
import { ProductsShowcase } from "@/components/home/ProductsShowcase";

/**
 * Home page — VARIANT honest-offmenu (offmenu.design inspired).
 *
 * Broken grid composition. ANHEL / это / честно разбросаны по
 * 12-col сетке в разных масштабах: «ANHEL» массивно top-right,
 * «— это —» мелко-italic mid-left, «честно.» гигантское italic
 * bottom-right. Mono-метки и числа как композиционные элементы.
 */
export default function Home() {
  return (
    <>
      <HonestOffmenuHero />
      <ProductsShowcase />
    </>
  );
}
