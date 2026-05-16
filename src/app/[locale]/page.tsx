import { HeroShell } from "@/components/hero/HeroShell";
import { HeroBgCarousel } from "@/components/hero/HeroBgCarousel";
import { ProductsShowcase } from "@/components/home/ProductsShowcase";
import { AboutSection } from "@/components/home/AboutSection";

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
 *
 * #about — якорь, на который ведёт пункт шапки «О компании». Раньше
 * эта ссылка уходила на `/#about` без секции в DOM (мёртвая ссылка —
 * C1 из pre-launch audit).
 *
 * Секция ProductionSection (#production) удалена перед запуском
 * (v1.20-pre-launch-fixes) — будет доработана отдельной задачей после
 * съёмки видео производственной площадки.
 *
 * Тексты в секциях — плейсхолдеры, копирайтер заменит после запуска.
 */
export default function Home() {
  return (
    <>
      <HeroShell background={<HeroBgCarousel autoplay={true} />} />
      <ProductsShowcase />
      <AboutSection />
    </>
  );
}
