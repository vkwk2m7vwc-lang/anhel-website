import { HonestHero } from "@/components/honest/HonestHero";
import { HonestFacts } from "@/components/honest/HonestFacts";

/**
 * Home page — VARIANT 7 «Honest».
 *
 * Бренд-позиция «ANHEL — это честно». Anti-marketing структура:
 * вместо hero-карусели + grid карточек — два блока, которые
 * проверяют друг друга.
 *
 *   1. HonestHero — заголовок «ANHEL — / это честно.» на чёрном
 *      канвасе, тонкая мета-строка + 4 счётчика-анкера, которые
 *      ведут к фактам ниже («1 завод», «30 лет», «13 объектов»,
 *      «0 наценок»).
 *   2. HonestFacts — белый канвас, 6 проверяемых фактов в
 *      газетной колонке, у каждого «↗ proof» pointer на конкретное
 *      доказательство (объекты в портфолио, документы, прямой
 *      телефон инженера, mailto на сравнение КП).
 *
 * Никаких герой-картинок продукта, никаких glitter-эффектов,
 * никаких editorial гимнастик с clamp-display. Type обычный.
 * Анимации только функциональные (fade-in на reveal).
 *
 * Каноничный home (HeroShell + HeroBgCarousel + ProductsShowcase)
 * остаётся доступен на main и других variant-ветках.
 */
export default function Home() {
  return (
    <>
      <HonestHero />
      <HonestFacts />
    </>
  );
}
