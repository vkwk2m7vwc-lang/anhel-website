import { CinematicHero } from "@/components/cinematic/CinematicHero";
import { Manifesto } from "@/components/cinematic/Manifesto";
import { ProductChapter } from "@/components/cinematic/ProductChapter";

/**
 * Home page — VARIANT 5 «Cinematic».
 *
 * Principal break from the legacy home: this page is a NARRATIVE,
 * not a catalogue. The visitor scrolls through six beats:
 *
 *   1. Cinematic hero   — kinetic morphing word + dark theatre
 *   2. Manifesto №1     — «30 лет под нагрузкой» editorial moment
 *   3. Chapter ВОДА     — sticky 200vh, water supply
 *   4. Chapter ОГОНЬ    — sticky 200vh, fire protection
 *   5. Chapter ТЕПЛО    — sticky 200vh, heating substations
 *   6. Manifesto №2     — closing pull-quote
 *
 * No card grid. No 12-column section showcase. Each product gets
 * its own viewport-sized stage with a typographic flagship word
 * scrubbed by scroll, an accent radial that washes the canvas,
 * and a product photo that flies in from the right.
 *
 * The Footer (mounted in layout.tsx) closes the page — its existing
 * editorial type fits this variant without changes.
 */
export default function Home() {
  return (
    <>
      <CinematicHero />

      <Manifesto
        big="30"
        words="лет под нагрузкой. Без замены. Без капитальных простоев. Здание идёт своим темпом."
        caption="Серийная сборка с гарантией · Завод в Москве · Офис в Санкт-Петербурге"
      />

      <ProductChapter
        index="01"
        word="ВОДА"
        title="Насосные станции водоснабжения"
        lede="Холодная, горячая, повышение давления. Жилые комплексы и коммерческие объекты — от подвального ввода до верхних этажей."
        href="/products/pumps/water-supply"
        imageSrc="/assets/products/hvs-nu.png"
        imageAlt="ANHEL — насосная станция водоснабжения"
        accent="#1E6FD9"
      />

      <ProductChapter
        index="02"
        word="ОГОНЬ"
        title="Установки пожаротушения"
        lede="АПТ, ВПВ и совмещённые системы. Серийная сборка с заводской приёмкой и сертификацией ТР ТС."
        href="/products/pumps/firefighting"
        imageSrc="/assets/products/hvs-nu-red2.png"
        imageAlt="ANHEL — насосная станция пожаротушения"
        accent="#D72638"
      />

      <ProductChapter
        index="03"
        word="ТЕПЛО"
        title="Тепловые пункты"
        lede="Блочные индивидуальные тепловые пункты — отопление, ГВС, комбинированные сборки. Восемь типовых модулей."
        href="/products/heating-unit"
        imageSrc="/assets/products/bitp.png"
        imageAlt="ANHEL — блочный индивидуальный тепловой пункт"
        accent="#E8873B"
      />

      <Manifesto
        big="01"
        words="Каждая станция — свой проект. Под объект, под ТЗ, под характеристики воды и нагрузку здания."
        caption="Открыть каталог · /products"
      />
    </>
  );
}
