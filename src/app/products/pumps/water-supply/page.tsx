import type { Metadata } from "next";
import { ProductPageShell } from "@/components/product-page/ProductPageShell";
import { waterSupplyContent } from "@/content/products/water-supply";
import {
  breadcrumbLd,
  ldScriptProps,
  productLd,
} from "@/lib/schema-org";

import { DatasheetLayout, SectionBlock } from "@/components/datasheet/DatasheetLayout";
import { DatasheetSidebar } from "@/components/datasheet/DatasheetSidebar";
import { SpecsTable } from "@/components/datasheet/SpecsTable";
import {
  ConfigurationsTable,
  type ConfigurationRow,
} from "@/components/datasheet/ConfigurationsTable";
import { CompactList } from "@/components/datasheet/CompactList";
import { DocumentsList } from "@/components/datasheet/DocumentsList";
import { FullRequestForm } from "@/components/datasheet/FullRequestForm";

/**
 * /products/pumps/water-supply — VARIANT 6 «Datasheet».
 *
 * The product page is rebuilt as a B2B datasheet — the way an
 * engineer or designer (проектировщик) actually consumes a product
 * spec on Mouser / Digikey / McMaster-Carr.
 *
 * Layout: sticky 360-px left rail + scrollable content rail.
 * The left rail holds the product image, designation, four key
 * specs, a TOC, and an always-visible quick-spec form. The right
 * rail is dense data — a real spec TABLE (not a tile grid), a model
 * configurations table (NEW: legacy site has no comparison view),
 * compact applications/advantages lists, file downloads with
 * sizes, and an embedded full request form at the bottom.
 *
 * Key principles:
 *   - Density over editorial pacing
 *   - Forms inline, never behind a button
 *   - Tables for tabular data, not tiles
 *   - One accent (water-blue) for actions only
 *   - Fixed type ladder (14/16/18/20/24); no clamp display gymnastics
 *
 * The cinematic / corporate / techno / iOS variants are still
 * available on their own branches; this is the engineering
 * counterproposal — the friction-killer for someone who has a TZ
 * open in another tab.
 */
export const metadata: Metadata = {
  title: waterSupplyContent.metaTitle,
  description: waterSupplyContent.metaDescription,
  openGraph: {
    type: "website",
    title: `${waterSupplyContent.metaTitle} · ANHEL®`,
    description: waterSupplyContent.metaDescription,
    url: `/products/pumps/water-supply`,
    images: [
      {
        url: waterSupplyContent.hero.image.src,
        alt: waterSupplyContent.hero.image.alt,
      },
    ],
  },
};

// Working draft of model configurations. When the OEM partner
// publishes the real variant table, swap in real rows — same shape.
const CONFIGURATIONS: ConfigurationRow[] = [
  {
    designation: "HVS-NU 12/40 (1+1)",
    flow: "12",
    head: "40",
    motorKw: "2.2",
    pumps: "2",
    control: "Релейное с УПП",
  },
  {
    designation: "HVS-NU 25/60 (2+1)",
    flow: "25",
    head: "60",
    motorKw: "5.5",
    pumps: "3",
    control: "Частотное (1× ПЧ)",
  },
  {
    designation: "HVS-NU 50/80 (3+1)",
    flow: "50",
    head: "80",
    motorKw: "11",
    pumps: "4",
    control: "Частотное (1× ПЧ)",
  },
  {
    designation: "HVS-NU 80/90 (3+1)",
    flow: "80",
    head: "90",
    motorKw: "18.5",
    pumps: "4",
    control: "КЧП (на каждый насос)",
  },
  {
    designation: "HVS-NU 120/100 (4+1)",
    flow: "120",
    head: "100",
    motorKw: "30",
    pumps: "5",
    control: "КЧП (на каждый насос)",
  },
  {
    designation: "HVS-NU 200/110 (5+1)",
    flow: "200",
    head: "110",
    motorKw: "45",
    pumps: "6",
    control: "КЧП (на каждый насос)",
  },
];

const TOC = [
  { id: "specs", label: "Технические характеристики" },
  { id: "configurations", label: "Конфигурации серии" },
  { id: "control-modes", label: "Режимы регулирования" },
  { id: "applications", label: "Применение" },
  { id: "advantages", label: "Преимущества" },
  { id: "documents", label: "Документация" },
  { id: "request", label: "Получить КП" },
];

const KEY_SPECS = [
  { label: "Q МАКС", value: "200", unit: "м³/ч" },
  { label: "H МАКС", value: "110", unit: "м" },
  { label: "N", value: "0.37–90", unit: "кВт" },
  { label: "T МАКС", value: "120", unit: "°C" },
];

const CONTROL_MODES = [
  {
    mono: "01",
    title: "Релейное регулирование",
    body: "Простейший каскадный пуск с УПП. Для систем с предсказуемой нагрузкой и без жёстких требований к точности давления.",
  },
  {
    mono: "02",
    title: "Частотное регулирование (общий ПЧ)",
    body: "Один частотный преобразователь на группу. Каскадное переключение ведущего насоса. Точность давления ±0.05 бар.",
  },
  {
    mono: "03",
    title: "КЧП — частотное на каждый насос",
    body: "Индивидуальный ПЧ на каждый насос. Максимальная энергоэффективность и микро-точность давления (±0.01 бар). Полный hot-standby.",
  },
];

export default function WaterSupplyProductPage() {
  const { slug, hero, techSpecs, accent, applications, advantages, documents } =
    waterSupplyContent;

  const productJsonLd = productLd({
    slug,
    name: "Насосные станции водоснабжения ANHEL®",
    description: waterSupplyContent.metaDescription,
    image: waterSupplyContent.hero.image.src,
    category: "Pump / Water supply",
    model: "HVS-NU",
  });
  const breadcrumbJsonLd = breadcrumbLd([
    { name: "Главная", url: "/" },
    { name: "Насосные станции", url: "/products" },
    { name: "Водоснабжение", url: `/products/pumps/${slug}` },
  ]);

  // Map content documents into the DocItem shape used by DocumentsList.
  // Source `DocumentItem` has `title` and optional `size`; format is
  // inferred from the URL extension (everything in the catalogue today
  // is PDF, but we leave the inference open for STEP / DWG / etc).
  const docs = documents.items
    .filter((doc) => doc.href && doc.href !== "#")
    .map((doc) => {
      const ext = (doc.href.split(".").pop() ?? "").toUpperCase();
      const format = ext.length <= 5 && ext.length > 0 ? ext : "PDF";
      return {
        name: doc.title,
        href: doc.href,
        format,
        size: doc.size ?? "",
      };
    });

  // Compact-list shape for Applications + Advantages
  const appItems = applications.items.map((item) => ({
    mono: item.mono,
    title: item.title,
    body: item.example,
  }));
  const advItems = advantages.items.map((item) => ({
    mono: item.mono,
    title: item.title,
    body: item.body,
  }));

  return (
    <ProductPageShell accent={accent}>
      <script {...ldScriptProps(productJsonLd)} />
      <script {...ldScriptProps(breadcrumbJsonLd)} />

      <DatasheetLayout
        sidebar={
          <DatasheetSidebar
            designation="HVS-NU"
            breadcrumbHref="/products/pumps"
            breadcrumbLabel="Насосные станции"
            imageSrc={hero.image.src}
            imageAlt={hero.image.alt}
            title="Насосные станции для систем водоснабжения"
            meta="ХВС · ГВС · ПОВЫШЕНИЕ ДАВЛЕНИЯ · ЦИРКУЛЯЦИЯ"
            keySpecs={KEY_SPECS}
            toc={TOC}
          />
        }
      >
        <SectionBlock id="specs" index="01" title="Технические характеристики">
          <SpecsTable rows={techSpecs} />
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-secondary)]/45">
            ВНЕ СТАНДАРТА — ПО ЗАПРОСУ. ВЫСОКИЕ ТЕМПЕРАТУРЫ ДО 180 °C, МОЩНОСТИ ВЫШЕ 90 КВТ — ПОД ОБЪЕКТ.
          </p>
        </SectionBlock>

        <SectionBlock
          id="configurations"
          index="02"
          title="Конфигурации серии"
        >
          <p className="mb-6 max-w-[640px] text-[14px] leading-relaxed text-[var(--color-secondary)]/70">
            Шесть типовых исполнений. В каждом — рабочее число насосов + один холодный резерв. Обозначение читается как «расход / напор (рабочих + резерв)».
          </p>
          <ConfigurationsTable rows={CONFIGURATIONS} />
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-secondary)]/45">
            ИНДИВИДУАЛЬНЫЕ КОНФИГУРАЦИИ ПОД ТЗ — БЕЗ НАЦЕНКИ ЗА «НЕСТАНДАРТ».
          </p>
        </SectionBlock>

        <SectionBlock
          id="control-modes"
          index="03"
          title="Режимы регулирования"
        >
          <CompactList items={CONTROL_MODES} twoColumns={false} />
        </SectionBlock>

        <SectionBlock id="applications" index="04" title="Применение">
          <CompactList items={appItems} />
        </SectionBlock>

        <SectionBlock id="advantages" index="05" title="Преимущества">
          <CompactList items={advItems} />
        </SectionBlock>

        <SectionBlock id="documents" index="06" title="Документация">
          {docs.length > 0 ? (
            <DocumentsList items={docs} />
          ) : (
            <p className="text-[13px] text-[var(--color-secondary)]/55">
              Документы доступны по запросу.
            </p>
          )}
        </SectionBlock>

        <SectionBlock id="request" index="07" title="Получить КП">
          <p className="mb-6 max-w-[640px] text-[14px] leading-relaxed text-[var(--color-secondary)]/70">
            Заполните параметры — пришлём КП с подобранной конфигурацией, габаритным чертежом и сроком отгрузки. Если каких-то полей не знаете, оставьте пустыми — инженер уточнит при первом ответе.
          </p>
          <FullRequestForm />
        </SectionBlock>

        <SectionBlock id="contact" index="08" title="Прямой контакт инженера">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="border border-[var(--color-hairline)] p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-secondary)]/55">
                ТЕЛЕФОН
              </p>
              <a
                href="tel:+78124164500"
                className="mt-2 block font-display text-[18px] text-[var(--color-secondary)] transition-colors hover:text-[var(--accent-water)]"
              >
                +7 (812) 416-4500
              </a>
            </div>
            <div className="border border-[var(--color-hairline)] p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-secondary)]/55">
                EMAIL
              </p>
              <a
                href="mailto:info@anhelspb.com"
                className="mt-2 block font-display text-[18px] text-[var(--color-secondary)] transition-colors hover:text-[var(--accent-water)]"
              >
                info@anhelspb.com
              </a>
            </div>
            <div className="border border-[var(--color-hairline)] p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-secondary)]/55">
                ВРЕМЯ ОТВЕТА
              </p>
              <p className="mt-2 font-display text-[18px] text-[var(--color-secondary)]">
                15 минут
                <span className="block text-[12px] font-normal text-[var(--color-secondary)]/55">
                  пн-пт, 9:00–18:00 МСК
                </span>
              </p>
            </div>
          </div>
        </SectionBlock>
      </DatasheetLayout>
    </ProductPageShell>
  );
}
