import type { Metadata } from "next";
import { ProductPageShell } from "@/components/product-page/ProductPageShell";
import { BrandsStrip } from "@/components/product-page/BrandsStrip";
import { GalleryRail } from "@/components/product-page/GalleryRail";
import { CasesCarousel } from "@/components/product-page/CasesCarousel";
import { QuizSection } from "@/components/product-page/quiz/QuizSection";
import { DocumentsGrid } from "@/components/product-page/DocumentsGrid";
import { HowItWorksSection } from "@/components/products/firefighting/lakhta/HowItWorksSection";
import { firefightingContent } from "@/content/products/firefighting";
import {
  breadcrumbLd,
  ldScriptProps,
  productLd,
} from "@/lib/schema-org";

// Cinematic product-page sections — replace the legacy components
import { CinematicProductHero } from "@/components/cinematic/product/CinematicProductHero";
import { MomentOfTruth } from "@/components/cinematic/product/MomentOfTruth";
import { NumbersAsTypography } from "@/components/cinematic/product/NumbersAsTypography";
import { ApplicationsCinema } from "@/components/cinematic/product/ApplicationsCinema";
import { CinematicCtaFooter } from "@/components/cinematic/product/CinematicCtaFooter";

/**
 * /products/pumps/firefighting — VARIANT 5 «Cinematic».
 *
 * The reference product page is rebuilt around the same narrative
 * language as the cinematic home: monumental typography, sticky
 * scroll dramaturgy, full-bleed editorial pacing instead of card
 * grids.
 *
 * Section map (cinematic):
 *   01 Hero                  ✓ CinematicProductHero (full-bleed,
 *                                title-as-canvas, no breadcrumb /
 *                                CTA pills / subtitle)
 *   02 Moment of truth       ✓ MomentOfTruth (sticky 200vh, three
 *                                urgency words cross-fading on
 *                                scroll, accent radial breathing)
 *   03 Цифры                  ✓ NumbersAsTypography (each spec is a
 *                                viewport with a giant number)
 *   04 Как срабатывает         ✓ HowItWorksSection (kept — Lakhta
 *                                scene is unique and earns its
 *                                viewport already)
 *   05 Где это работает        ✓ ApplicationsCinema (full-bleed
 *                                stack, monumental type, no grid)
 *   06 Бренды                  ✓ BrandsStrip (kept — the brand row
 *                                is content-led, doesn't fight the
 *                                cinematic posture)
 *   07 Галерея                 ✓ GalleryRail (kept)
 *   08 Кейсы                   ✓ CasesCarousel (kept)
 *   09 Опросный лист           ✓ QuizSection (kept — interactive)
 *   10 Документация            ✓ DocumentsGrid (kept)
 *   11 Финальный CTA           ✓ CinematicCtaFooter (single
 *                                monumental link, neighbours as
 *                                quiet typographic row)
 *
 * Sections kept (BrandsStrip, GalleryRail, CasesCarousel,
 * QuizSection, DocumentsGrid) read fine inside the cinematic
 * pacing because they are content-driven blocks, not catalogue
 * card grids. Replacing them is a polish round, not a
 * structural one.
 */
export const metadata: Metadata = {
  title: firefightingContent.metaTitle,
  description: firefightingContent.metaDescription,
  openGraph: {
    type: "website",
    title: `${firefightingContent.metaTitle} · ANHEL®`,
    description: firefightingContent.metaDescription,
    url: `/products/pumps/firefighting`,
    images: [
      {
        url: firefightingContent.hero.image.src,
        alt: firefightingContent.hero.image.alt,
      },
    ],
  },
};

// Hex string for the firefighting accent — duplicated here from
// globals.css so the cinematic sections (which take an `accent` hex)
// don't have to read CSS variables.
const FIRE_ACCENT = "#D72638";

export default function FirefightingProductPage() {
  const {
    slug,
    hero,
    accent,
    applications,
    brands,
    gallery,
    cases,
    quiz,
    documents,
  } = firefightingContent;
  // techSpecs from the content file is intentionally unused on this
  // variant — NumbersAsTypography curates a smaller, more cinematic
  // selection of 5 numbers below. The full 8-spec table can come back
  // if a comparison view is added later.

  const productJsonLd = productLd({
    slug,
    name: "Насосные станции пожаротушения ANHEL®",
    description: firefightingContent.metaDescription,
    image: firefightingContent.hero.image.src,
    category: "Pump / Fire suppression",
    model: "HVS-NU",
  });
  const breadcrumbJsonLd = breadcrumbLd([
    { name: "Главная", url: "/" },
    { name: "Насосные станции", url: "/products" },
    { name: "Пожаротушение", url: `/products/pumps/${slug}` },
  ]);

  // Cherry-pick 5 most-cinema-worthy specs out of the 8 in the
  // content file. The dropped ones (regulation type variants 1+2,
  // network voltage) are still in the content file for any future
  // table view — the cinematic page just doesn't show every row.
  const numberBeats = [
    {
      big: "10",
      unit: "лет",
      caption: "Срок службы установки.",
      context: "Минимум до планового капитального обслуживания. На реальных объектах — больше.",
    },
    {
      big: "от 2 до 6",
      caption: "Насосов в одной станции.",
      context: "Холодное резервирование. Один встал — соседи добирают давление до полной нормы.",
    },
    {
      big: "70",
      unit: "°C",
      caption: "Максимальная температура жидкости.",
      context: "Для совмещённых систем теплоснабжения и пожаротушения.",
    },
    {
      big: "0.37 – 250",
      unit: "кВт",
      caption: "Мощность одного насоса.",
      context: "Линейка покрывает от подъёмов в трёхэтажных домах до магистральных подач промышленных объектов.",
    },
    {
      big: "3 × 380",
      unit: "В",
      caption: "Сетевое напряжение.",
      context: "Стандарт российских объектов, никаких преобразователей на вводе.",
    },
  ];

  // Map content applications into the cinematic shape — same data,
  // just with mono index uppercased and title set in caps.
  const appBeats = applications.items.map((item) => ({
    mono: item.mono,
    title: item.title.toUpperCase(),
    example: item.example,
  }));

  return (
    <ProductPageShell accent={accent}>
      <script {...ldScriptProps(productJsonLd)} />
      <script {...ldScriptProps(breadcrumbJsonLd)} />

      <CinematicProductHero
        index="02"
        line="НАСОСНЫЕ СТАНЦИИ · ПОЖАРОТУШЕНИЕ"
        title="Когда становится поздно слушать."
        meta="АПТ · ВПВ · Совмещённые системы · Сертификация ТР ТС · Заводская приёмка"
        imageSrc={hero.image.src}
        imageAlt={hero.image.alt}
        accent={FIRE_ACCENT}
      />

      <MomentOfTruth
        beats={["ДЫМ", "СИГНАЛ", "ДАВЛЕНИЕ", "ОГОНЬ"]}
        accent={FIRE_ACCENT}
      />

      <NumbersAsTypography beats={numberBeats} accent={FIRE_ACCENT} />

      <HowItWorksSection />

      <ApplicationsCinema beats={appBeats} accent={FIRE_ACCENT} />

      <BrandsStrip content={brands} />
      <GalleryRail content={gallery} />
      <CasesCarousel content={cases} />
      <QuizSection content={quiz} />
      <DocumentsGrid content={documents} />

      <CinematicCtaFooter
        primaryHref="#quiz"
        primaryLabel="ЗАПРОС КП"
        accent={FIRE_ACCENT}
        neighbours={[
          {
            label: "Водоснабжение",
            href: "/products/pumps/water-supply",
          },
          {
            label: "Тепловые пункты",
            href: "/products/heating-unit",
          },
        ]}
      />
    </ProductPageShell>
  );
}
