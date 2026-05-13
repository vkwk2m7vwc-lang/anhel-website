import { HeroShell } from "@/components/hero/HeroShell";
import { HeroBgCarousel } from "@/components/hero/HeroBgCarousel";
import { ProductsShowcase } from "@/components/home/ProductsShowcase";
import { AboutSection } from "@/components/home/AboutSection";
import { ProductionSection } from "@/components/home/ProductionSection";

/**
 * Home page.
 *
 * `/` рендерит карусельный hero (вариант E) — четыре вращающихся
 * продуктовых рендера с акцентной подсветкой. Autoplay 5 сек, hover
 * на продуктовой зоне ставит на паузу.
 *
 * Ниже hero:
 *   1. ProductsShowcase — 4 карточки направлений (главная точка
 *      навигации в каталог)
 *   2. AboutSection (#about) — секция «О компании» с counters
 *   3. ProductionSection (#production) — секция «Производство»
 *
 * #about и #production — якоря, на которые ведут пункты шапки
 * «О компании» и «Производство». Раньше эти ссылки уходили на
 * `/#about` и `/#manufacturing` без секций в DOM (мёртвые ссылки —
 * C1 из pre-launch audit).
 *
 * Тексты в секциях — плейсхолдеры, копирайтер заменит после запуска.
 */
export default function Home() {
  return (
    <>
      <HeroShell background={<HeroBgCarousel autoplay={true} />} />
      <ProductsShowcase />
      <AboutSection />
      <ProductionSection />
    </>
  );
}
