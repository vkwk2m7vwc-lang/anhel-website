import { HonestPoezabrideHero } from "@/components/honest/HonestPoezabrideHero";
import { ProductsShowcase } from "@/components/home/ProductsShowcase";

/**
 * Home page — VARIANT honest-poezabride (poezabride.com inspired).
 *
 * Magazine-cover full-bleed. Реальное фото цеха покрывает весь
 * viewport. Italic display headline «ANHEL — это честно» внизу
 * как заголовок обложки. Tiny mono-метки в углах (выпуск, дата).
 * Bottom scrim только для читаемости — без затемнения фото.
 */
export default function Home() {
  return (
    <>
      <HonestPoezabrideHero />
      <ProductsShowcase />
    </>
  );
}
