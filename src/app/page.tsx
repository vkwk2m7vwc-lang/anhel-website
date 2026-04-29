import { HonestNewspaperHero } from "@/components/honest/HonestNewspaperHero";
import { ProductsShowcase } from "@/components/home/ProductsShowcase";

/**
 * Home page — VARIANT honest-4 «Newspaper».
 *
 * Hero стилизован под первую полосу инженерной газеты: cream-канвас,
 * газетная шапка с № выпуска и датой, banner-headline в стиле first
 * page, deck-строка курсивом, lede в две колонки. Никаких карусели,
 * фото, CTA-pill — только печатный лист.
 *
 * Под hero — обычный ProductsShowcase, как «лист 2 — каталог».
 */
export default function Home() {
  return (
    <>
      <HonestNewspaperHero />
      <ProductsShowcase />
    </>
  );
}
