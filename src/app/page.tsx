import { HonestSplitHero } from "@/components/honest/HonestSplitHero";
import { ProductsShowcase } from "@/components/home/ProductsShowcase";

/**
 * Home page — VARIANT honest-2 «Split».
 *
 * Hero — 50/50 split: слева монументальный заголовок «ANHEL —
 * это честно.» с одним контр-фактом, справа full-bleed фото
 * реального цеха производства. Доказательство пристёгнуто к
 * утверждению визуально, а не текстово.
 *
 * Под hero — обычный ProductsShowcase с main, чтобы ниже
 * читался тот же каталог что в production. Эксперимент изменяет
 * только hero.
 */
export default function Home() {
  return (
    <>
      <HonestSplitHero />
      <ProductsShowcase />
    </>
  );
}
