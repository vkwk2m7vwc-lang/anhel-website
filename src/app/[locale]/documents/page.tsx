import type { Metadata } from "next";
import { FileText, FileBadge, FileCog, Download, Building2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

/**
 * `/documents` — единая страница технической документации.
 *
 * Структура (v2, copy.md A.4):
 *   1. Hero
 *   2. Общие документы (карточка организации, сервисная заявка)
 *   3. #questionnaires — Опросные листы (4 группы по направлению)
 *   4. #catalogs — Каталоги (placeholder)
 *   5. #certificates — Сертификаты ЕАЭС (4 группы, где есть)
 *   6. Руководства по эксплуатации (без top-level якоря)
 *
 * Два набора якорей:
 *   - По ТИПУ (#questionnaires/#catalogs/#certificates) — из Footer
 *   - По НАПРАВЛЕНИЮ (#pumps/#heating-unit/...) — из DocumentsMegaMenu;
 *     живут как article-id внутри секции «Опросные листы».
 *
 * i18n: вся UI-обвязка из `documents.*`. Структура категорий (slug,
 * href, size) живёт в коде; titles категорий идут через
 * `documents.directions.<slug>.title`, titles документов — через
 * `documents.items.<key>` по стабильному ключу. Размер файла (МБ)
 * остаётся как есть в TS — это технический факт, не контент.
 *
 * Locale-aware PDF policy (PR feat/pdf-localization-wave-1):
 *   - Опросные листы — есть RU/EN/TR (`oprosnyi-list-<locale>.pdf`).
 *     На EN/TR href и size swap'ятся в `localizedQuestionnaire()`.
 *   - Карточка организации — есть RU/EN/TR
 *     (`company-profile-<locale>.pdf`), swap в COMMON_DOCS.
 *   - Заявка на сервис — есть RU/EN/TR
 *     (`service-request-anhel-<locale>.pdf`), swap в COMMON_DOCS.
 *   - Руководства по эксплуатации — есть RU + EN/TR для всех 5
 *     насосных категорий (`manual-<locale>.pdf`).
 *   - Сертификаты и декларации ЕАЭС — ТОЛЬКО RU (юр. документы РФ).
 *     На EN/TR показывается «Original document (Russian)».
 *   - Каталоги МФМК — отдельная задача, переверстка нужна.
 */
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "documents.meta" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

type DocItem = {
  /** Stable key for `documents.items.<key>` translation lookup. */
  key: string;
  href: string;
  /** Размер для подписи под названием. Формат «1.42 МБ» / «1.42 MB». */
  size: string;
};

type DocCategoryData = {
  slug: "pumps" | "heating-unit" | "water-treatment" | "control-systems";
  questionnaires: DocItem[];
  certificates: DocItem[];
  manuals?: DocItem[];
};

const CATEGORIES: readonly DocCategoryData[] = [
  {
    slug: "pumps",
    questionnaires: [
      { key: "pumps_water_supply_q", href: "/docs/water-supply/oprosnyi-list.pdf", size: "1.45 MB" },
      { key: "pumps_firefighting_q", href: "/docs/firefighting/oprosnyi-list.pdf", size: "1.45 MB" },
      { key: "pumps_heating_cooling_q", href: "/docs/heating-cooling/oprosnyi-list.pdf", size: "1.45 MB" },
      { key: "pumps_pressure_boost_q", href: "/docs/pressure-boost/oprosnyi-list.pdf", size: "0.29 MB" },
      { key: "pumps_special_q", href: "/docs/special/oprosnyi-list.pdf", size: "1.45 MB" },
    ],
    certificates: [
      { key: "pumps_water_supply_cert", href: "/docs/water-supply/cert-deklaratsiya.pdf", size: "0.86 MB" },
      { key: "pumps_firefighting_cert", href: "/docs/firefighting/cert-deklaratsiya.pdf", size: "0.86 MB" },
      { key: "pumps_heating_cooling_cert", href: "/docs/heating-cooling/cert-deklaratsiya.pdf", size: "0.86 MB" },
      { key: "pumps_pressure_boost_cert", href: "/docs/pressure-boost/cert-deklaratsiya.pdf", size: "0.86 MB" },
      { key: "pumps_special_cert", href: "/docs/special/cert-deklaratsiya.pdf", size: "0.86 MB" },
    ],
    manuals: [
      { key: "pumps_water_supply_manual", href: "/docs/water-supply/manual.pdf", size: "1.38 MB" },
      { key: "pumps_firefighting_manual", href: "/docs/firefighting/manual.pdf", size: "1.38 MB" },
      { key: "pumps_heating_cooling_manual", href: "/docs/heating-cooling/manual.pdf", size: "1.38 MB" },
      { key: "pumps_pressure_boost_manual", href: "/docs/pressure-boost/manual.pdf", size: "1.38 MB" },
      { key: "pumps_special_manual", href: "/docs/special/manual.pdf", size: "1.38 MB" },
    ],
  },
  {
    slug: "heating-unit",
    questionnaires: [
      { key: "heating_unit_q", href: "/docs/heating-unit/oprosnyi-list.pdf", size: "0.52 MB" },
    ],
    certificates: [
      { key: "heating_unit_cert", href: "/docs/heating-unit/cert-deklaratsiya.pdf", size: "2.22 MB" },
    ],
  },
  {
    slug: "water-treatment",
    questionnaires: [
      { key: "water_treatment_q", href: "/docs/water-treatment/oprosnyi-list.pdf", size: "2.17 MB" },
    ],
    certificates: [
      { key: "water_treatment_cert", href: "/docs/water-treatment/cert-deklaratsiya.pdf", size: "0.49 MB" },
    ],
  },
  {
    slug: "control-systems",
    questionnaires: [
      { key: "control_systems_q", href: "/docs/control-systems/oprosnyi-list.pdf", size: "1.80 MB" },
    ],
    certificates: [],
  },
];

/**
 * COMMON_DOCS entries — every URL is now locale-aware.
 *
 * `anhel_card` — three locale variants /company-profile-{ru,en,tr}.pdf
 * produced by _scripts/build_company_profile.py. Different sizes per
 * locale are negligible (~40 KB each) so we display a single rounded
 * value.
 *
 * `service_request` — three locale variants
 * /documents/service-request-anhel{,-en,-tr}.pdf produced by
 * _scripts/build_service_request_translations.py. RU is the original
 * AcroForm (60 KB); EN/TR are ReportLab re-renders (~37 KB each).
 */
type CommonDocLocaleResolver = (locale: string) => string;

const COMMON_DOCS: readonly {
  key: "anhel_card" | "service_request";
  size: string;
  href: CommonDocLocaleResolver;
}[] = [
  {
    key: "anhel_card",
    size: "0.04 MB",
    href: (locale) => `/company-profile-${locale}.pdf`,
  },
  {
    key: "service_request",
    size: "0.06 MB",
    href: (locale) =>
      locale === "ru"
        ? "/documents/service-request-anhel.pdf"
        : `/documents/service-request-anhel-${locale}.pdf`,
  },
];

/**
 * Localised questionnaire size table.
 *
 * RU originals are AcroForm-based and range 0.29–2.17 MB. EN/TR PDFs
 * are ReportLab re-renders (sectioned printable forms) and are
 * uniformly compact. The values below are pulled from disk and never
 * vary across the four pump categories (file is shared) — we keep a
 * lookup keyed by the «documents.items.<key>» stable id.
 */
const LOCALISED_Q_SIZE: Record<"en" | "tr", string> = {
  en: "0.04 MB",
  tr: "0.04 MB",
};

/**
 * Swap a questionnaire entry's href / size for a non-RU locale.
 */
function localizedQuestionnaire(
  q: DocItem,
  locale: string,
): { href: string; size: string } {
  if (locale === "ru") return { href: q.href, size: q.size };
  const stem = locale as "en" | "tr";
  const href = q.href.replace(/oprosnyi-list\.pdf$/, `oprosnyi-list-${stem}.pdf`);
  return { href, size: LOCALISED_Q_SIZE[stem] };
}

export default function DocumentsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = useTranslations("documents");
  const tCommon = useTranslations("documents.common_items");
  const tDirections = useTranslations("documents.directions");
  const tItems = useTranslations("documents.items");

  const questionnaireCats = CATEGORIES;
  const certificateCats = CATEGORIES.filter((cat) => cat.certificates.length > 0);
  const manualCats = CATEGORIES.filter((cat) => cat.manuals && cat.manuals.length > 0);

  // Подпись «Original document (Russian)» / «Orijinal belge (Rusça)»
  // показывается ТОЛЬКО под сертификатами и декларациями ЕАЭС на не-RU
  // локалях — это юр. документы РФ, перевод не предусмотрен.
  //
  // Опросные листы, карточка организации, сервисная заявка и
  // руководства имеют локализованные варианты — note для них больше
  // не выводится.
  const ruNote = locale === "ru" ? undefined : t("sections.certificates.original_note");

  return (
    <main className="pt-24 md:pt-32">
      {/* Hero */}
      <section className="border-b border-[var(--color-hairline)] bg-[var(--color-primary)] text-[var(--color-secondary)]">
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-24">
          <p className="mono-tag mb-6">{t("hero.mono_tag")}</p>
          <h1 className="max-w-3xl font-display text-4xl leading-tight md:text-6xl">
            {t("hero.heading")}
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--color-secondary)]/70 md:text-lg">
            {t("hero.lede_prefix")}{" "}
            <a
              href="mailto:info@anhelspb.com"
              className="underline decoration-[var(--color-hairline)] underline-offset-[3px] hover:decoration-[var(--color-secondary)]"
            >
              info@anhelspb.com
            </a>
            {t("hero.lede_suffix")}
          </p>
        </div>
      </section>

      {/* Общие документы */}
      <section className="border-b border-[var(--color-hairline)] bg-[var(--color-primary)] text-[var(--color-secondary)]">
        <div className="mx-auto max-w-[1440px] px-6 py-14 md:px-12 md:py-16">
          <p className="mono-tag mb-8">{t("common_section.mono_tag")}</p>
          <ul className="grid gap-3 md:grid-cols-2">
            {COMMON_DOCS.map((doc) => {
              // Every COMMON_DOCS entry now has a locale-specific PDF
              // — note about Russian-only is no longer needed here.
              return (
                <DocCard
                  key={doc.key}
                  title={tCommon(doc.key)}
                  href={doc.href(locale)}
                  size={doc.size}
                  icon={Building2}
                />
              );
            })}
          </ul>
        </div>
      </section>

      {/* Опросные листы */}
      <section
        id="questionnaires"
        className="scroll-mt-24 border-b border-[var(--color-hairline)] bg-[var(--color-primary)] text-[var(--color-secondary)]"
      >
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-20">
          <SectionHeader
            tag={t("sections.by_direction")}
            title={t("sections.questionnaires.title")}
            lead={t("sections.questionnaires.lede")}
          />
          <div className="mt-12 flex flex-col gap-12 md:gap-14">
            {questionnaireCats.map((cat) => (
              <DirectionGroup
                key={cat.slug}
                id={cat.slug}
                title={tDirections(`${cat.slug}.title`)}
                items={cat.questionnaires.map((q) => {
                  // EN/TR questionnaires live alongside the RU master
                  // as `oprosnyi-list-<locale>.pdf`. Generated by
                  // _scripts/build_questionnaire_translations.py.
                  const swapped = localizedQuestionnaire(q, locale);
                  return {
                    title: tItems(q.key),
                    href: swapped.href,
                    size: swapped.size,
                  };
                })}
                icon={FileText}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Каталоги */}
      <section
        id="catalogs"
        className="scroll-mt-24 border-b border-[var(--color-hairline)] bg-[var(--color-primary)] text-[var(--color-secondary)]"
      >
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-20">
          <SectionHeader title={t("sections.catalogs.title")} />
          <div className="mt-10 rounded-md border border-dashed border-[var(--color-hairline)] bg-[var(--color-image-placeholder)] p-8 text-center md:p-14">
            <p className="font-display text-xl leading-tight text-[var(--color-secondary)]/80 md:text-2xl">
              {t("sections.catalogs.placeholder_heading")}
            </p>
            <p className="mt-3 text-sm text-[var(--color-secondary)]/55">
              {t("sections.catalogs.placeholder_lede")}
            </p>
          </div>
        </div>
      </section>

      {/* Сертификаты */}
      <section
        id="certificates"
        className="scroll-mt-24 border-b border-[var(--color-hairline)] bg-[var(--color-primary)] text-[var(--color-secondary)]"
      >
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-20">
          <SectionHeader
            tag={t("sections.by_direction")}
            title={t("sections.certificates.title")}
            lead={t("sections.certificates.lede")}
          />
          <div className="mt-12 flex flex-col gap-12 md:gap-14">
            {certificateCats.map((cat) => (
              <DirectionGroup
                key={cat.slug}
                title={tDirections(`${cat.slug}.title`)}
                items={cat.certificates.map((c) => ({
                  title: tItems(c.key),
                  href: c.href,
                  size: c.size,
                  note: ruNote,
                }))}
                icon={FileBadge}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Руководства */}
      {manualCats.length > 0 ? (
        <section className="bg-[var(--color-primary)] text-[var(--color-secondary)]">
          <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-20">
            <SectionHeader
              tag={t("sections.by_direction")}
              title={t("sections.manuals.title")}
              lead={t("sections.manuals.lede")}
            />
            <div className="mt-12 flex flex-col gap-12 md:gap-14">
              {manualCats.map((cat) => (
                <DirectionGroup
                  key={cat.slug}
                  title={tDirections(`${cat.slug}.title`)}
                  items={(cat.manuals ?? []).map((m) => {
                    // Locale-aware manual swap. The RU master is
                    // /docs/<cat>/manual.pdf (1.38 MB). EN/TR translated
                    // re-renders sit alongside as manual-en.pdf /
                    // manual-tr.pdf (~60 KB each, generated via
                    // _scripts/build_manual_translations.py).
                    if (locale === "ru") return { title: tItems(m.key), href: m.href, size: m.size };
                    const suffix = locale === "en" ? "-en" : "-tr";
                    const localizedHref = m.href.replace(/manual\.pdf$/, `manual${suffix}.pdf`);
                    const localizedSize = locale === "en" ? "61 KB" : "63 KB";
                    return { title: tItems(m.key), href: localizedHref, size: localizedSize };
                  })}
                  icon={FileCog}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}

/**
 * Section header — mono-tag + h2 + опц. лид.
 */
function SectionHeader({
  tag,
  title,
  lead,
}: {
  tag?: string;
  title: string;
  lead?: string;
}) {
  return (
    <div className="max-w-3xl">
      {tag ? <p className="mono-tag mb-6">{tag}</p> : null}
      <h2 className="font-display text-3xl leading-tight md:text-5xl">{title}</h2>
      {lead ? (
        <p className="mt-6 text-base leading-relaxed text-[var(--color-secondary)]/70 md:text-lg">
          {lead}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Direction group — заголовок направления + сетка карточек.
 * `id` опционален: внутри #questionnaires каждая группа получает
 * id=slug для совместимости с DocumentsMegaMenu.
 */
function DirectionGroup({
  id,
  title,
  items,
  icon,
}: {
  id?: string;
  title: string;
  items: { title: string; href: string; size: string; note?: string }[];
  icon: typeof FileText;
}) {
  if (items.length === 0) return null;
  return (
    <article id={id} className={id ? "scroll-mt-24" : undefined}>
      <p className="mb-6 font-display text-2xl leading-tight md:text-3xl">
        {title}
      </p>
      <ul className="grid gap-3 md:grid-cols-2">
        {items.map((doc, i) => (
          <DocCard
            key={doc.href}
            title={doc.title}
            href={doc.href}
            size={doc.size}
            note={doc.note}
            icon={icon}
            wide={items.length % 2 === 1 && i === items.length - 1}
          />
        ))}
      </ul>
    </article>
  );
}

function DocCard({
  title,
  href,
  size,
  note,
  icon: Icon,
  wide,
}: {
  title: string;
  href: string;
  size: string;
  /** Optional subtle line under the metadata — used to flag certificates
   *  whose PDF body is in Russian only ("Original document (Russian)"). */
  note?: string;
  icon: typeof FileText;
  /** Span both grid columns — fills the trailing gap left by an
   *  odd-count card group on the md+ 2-column grid. */
  wide?: boolean;
}) {
  // Static PDFs live in /public — they are NOT app routes. The
  // next-intl <Link> would (a) prepend the locale prefix on EN/TR
  // (→ /en/docs/… → 404) and (b) intercept the click for client-side
  // routing on RU (→ no such route → 404 page). Plain <a download>
  // lets the browser fetch the file directly. Same pattern as
  // ProductHero.ProductCtaButton and the /contacts download button.
  return (
    <li className={wide ? "md:col-span-2" : undefined}>
      <a
        href={href}
        download
        data-cursor="hover"
        className="group flex items-center gap-4 rounded-sm border border-[var(--color-hairline)] p-4 transition-colors hover:border-[var(--color-secondary)]/40 hover:bg-[var(--color-hover-tint)] md:p-5"
      >
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--color-hairline)] text-[var(--color-secondary)]/70 transition-colors group-hover:border-[var(--color-secondary)]/40 group-hover:text-[var(--color-secondary)]">
          <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
        </span>
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-[15px] text-[var(--color-secondary)]">
            {title}
          </span>
          <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/50">
            PDF · {size}
          </span>
          {note ? (
            <span className="mt-1 text-[11px] italic text-[var(--color-secondary)]/45">
              {note}
            </span>
          ) : null}
        </span>
        <Download
          size={16}
          strokeWidth={1.5}
          aria-hidden="true"
          className="shrink-0 text-[var(--color-secondary)]/35 transition-all group-hover:translate-y-0.5 group-hover:text-[var(--color-secondary)]"
        />
      </a>
    </li>
  );
}
