import type { Metadata } from "next";
import Link from "next/link";
import { FileText, FileBadge, FileCog, Download, Building2 } from "lucide-react";

/**
 * `/documents` — единая страница технической документации.
 *
 * Структура (v2, copy.md A.4):
 *
 *   1. Hero
 *   2. Общие документы (карточка организации, сервисная заявка)
 *   3. #questionnaires — Опросные листы
 *        внутри: 4 группы по направлению, у каждой id={slug}
 *        (#pumps / #heating-unit / #water-treatment / #control-systems)
 *   4. #catalogs — Каталоги (placeholder, в подготовке)
 *   5. #certificates — Сертификаты ЕАЭС
 *        внутри: 4 группы по направлению (только где сертификаты есть)
 *   6. Руководства по эксплуатации (без top-level якоря,
 *      справочный раздел внизу страницы)
 *
 * Два набора якорей одновременно:
 *   - Якоря по ТИПУ документа (#questionnaires/#catalogs/#certificates) —
 *     приходят из Footer, режим «мне нужен этот тип документа»;
 *   - Якоря по НАПРАВЛЕНИЮ (#pumps/#heating-unit/...) — приходят из
 *     DocumentsMegaMenu в шапке, режим «всё по направлению X». Эти
 *     якоря живут как article-id внутри секции «Опросные листы» —
 *     это первое, что видит пользователь при заходе с mega-menu по
 *     направлению; ниже того же блока идут каталоги и сертификаты,
 *     где направление встречается ещё раз без id (id уникален в DOM).
 *
 * Структура источника:
 *   - public/docs/<slug>/oprosnyi-list.pdf  — 8 опросных листов
 *   - public/docs/<slug>/cert-deklaratsiya.pdf — 7 сертификатов
 *   - public/docs/<slug>/manual.pdf         — 5 руководств
 *   - public/documents/service-request-anhel.pdf — сервисная заявка
 *   - public/anhel-card.pdf — карточка организации
 *
 * Каталоги: пока пусто (Алексей пришлёт), показываем placeholder-
 * блок «Появится в этом разделе».
 */

export const metadata: Metadata = {
  title: "Документация",
  description:
    "Опросные листы, технические каталоги, сертификаты соответствия и руководства по эксплуатации ANHEL® — насосные станции, тепловые пункты, водоподготовка, шкафы управления.",
};

type DocItem = {
  title: string;
  href: string;
  /** Размер для подписи под названием. Формат «1.42 МБ». */
  size: string;
};

type DocCategory = {
  slug: string;
  title: string;
  caption: string;
  /** Опросные листы — нужны B2B-клиенту в первую очередь. */
  questionnaires: DocItem[];
  /** Сертификаты ЕАЭС / соответствия. */
  certificates: DocItem[];
  /** Руководства по эксплуатации. */
  manuals?: DocItem[];
};

const CATEGORIES: readonly DocCategory[] = [
  {
    slug: "pumps",
    title: "Насосные станции",
    caption: "5 серий — водоснабжение, пожаротушение, отопление, повысительные, специальные.",
    questionnaires: [
      { title: "Водоснабжение (ХВС, ГВС)", href: "/docs/water-supply/oprosnyi-list.pdf", size: "1.45 МБ" },
      { title: "Пожаротушение (АПТ, ВПВ)", href: "/docs/firefighting/oprosnyi-list.pdf", size: "1.45 МБ" },
      { title: "Отопление и кондиционирование", href: "/docs/heating-cooling/oprosnyi-list.pdf", size: "1.45 МБ" },
      { title: "Поддержание давления (АУПД)", href: "/docs/pressure-boost/oprosnyi-list.pdf", size: "0.29 МБ" },
      { title: "Специальное исполнение", href: "/docs/special/oprosnyi-list.pdf", size: "1.45 МБ" },
    ],
    certificates: [
      { title: "Декларация ЕАЭС — водоснабжение", href: "/docs/water-supply/cert-deklaratsiya.pdf", size: "0.86 МБ" },
      { title: "Декларация ЕАЭС — пожаротушение", href: "/docs/firefighting/cert-deklaratsiya.pdf", size: "0.86 МБ" },
      { title: "Декларация ЕАЭС — отопление и кондиционирование", href: "/docs/heating-cooling/cert-deklaratsiya.pdf", size: "0.86 МБ" },
      { title: "Декларация ЕАЭС — поддержание давления", href: "/docs/pressure-boost/cert-deklaratsiya.pdf", size: "0.86 МБ" },
      { title: "Декларация ЕАЭС — специальное исполнение", href: "/docs/special/cert-deklaratsiya.pdf", size: "0.86 МБ" },
    ],
    manuals: [
      { title: "Руководство — водоснабжение", href: "/docs/water-supply/manual.pdf", size: "1.38 МБ" },
      { title: "Руководство — пожаротушение", href: "/docs/firefighting/manual.pdf", size: "1.38 МБ" },
      { title: "Руководство — отопление и кондиционирование", href: "/docs/heating-cooling/manual.pdf", size: "1.38 МБ" },
      { title: "Руководство — поддержание давления", href: "/docs/pressure-boost/manual.pdf", size: "1.38 МБ" },
      { title: "Руководство — специальное исполнение", href: "/docs/special/manual.pdf", size: "1.38 МБ" },
    ],
  },
  {
    slug: "heating-unit",
    title: "Тепловые пункты",
    caption: "Блочные ИТП — отопление, ГВС, ввод, подпитка.",
    questionnaires: [
      { title: "Тепловые пункты ANHEL®", href: "/docs/heating-unit/oprosnyi-list.pdf", size: "0.52 МБ" },
    ],
    certificates: [
      { title: "Декларация ЕАЭС — тепловые пункты", href: "/docs/heating-unit/cert-deklaratsiya.pdf", size: "2.22 МБ" },
    ],
  },
  {
    slug: "water-treatment",
    title: "Водоподготовка",
    caption: "Установки фильтрации, умягчения, обезжелезивания и обратного осмоса.",
    questionnaires: [
      { title: "Установки водоподготовки", href: "/docs/water-treatment/oprosnyi-list.pdf", size: "2.17 МБ" },
    ],
    certificates: [
      { title: "Декларация ЕАЭС — водоподготовка", href: "/docs/water-treatment/cert-deklaratsiya.pdf", size: "0.49 МБ" },
    ],
  },
  {
    slug: "control-systems",
    title: "Шкафы управления",
    caption: "5 серий — ЧРП, электропривода, противопожарные, ПДВ, КНС.",
    questionnaires: [
      { title: "Шкафы управления ANHEL®", href: "/docs/control-systems/oprosnyi-list.pdf", size: "1.80 МБ" },
    ],
    certificates: [],
  },
];

const COMMON_DOCS: readonly DocItem[] = [
  { title: "Карточка организации ООО «Профит»", href: "/anhel-card.pdf", size: "0.07 МБ" },
  { title: "Заявка на сервисное обслуживание", href: "/documents/service-request-anhel.pdf", size: "0.06 МБ" },
];

export default function DocumentsPage() {
  // Группы для секции «Опросные листы» — у каждой category всегда есть
  // ≥1 опросный лист, поэтому фильтр не нужен; ids смотрят на cat.slug
  // (это единственное место, где cat.slug используется как DOM id —
  // даёт работающие #pumps / #heating-unit / #water-treatment /
  // #control-systems для DocumentsMegaMenu).
  const questionnaireCats = CATEGORIES;

  // Сертификаты есть не у всех (control-systems пустой) — фильтруем,
  // чтобы не рисовать пустой блок «Сертификаты — Шкафы управления»
  // с подписью «нет документов».
  const certificateCats = CATEGORIES.filter(
    (cat) => cat.certificates.length > 0,
  );

  // Руководства тоже не у всех — пока только у Насосных станций.
  const manualCats = CATEGORIES.filter(
    (cat) => cat.manuals && cat.manuals.length > 0,
  );

  return (
    <main className="pt-24 md:pt-32">
      {/* Hero */}
      <section className="border-b border-[var(--color-hairline)] bg-[var(--color-primary)] text-[var(--color-secondary)]">
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-24">
          <p className="mono-tag mb-6">Документация</p>
          <h1 className="max-w-3xl font-display text-4xl leading-tight md:text-6xl">
            Опросные листы, каталоги, сертификаты — в одном месте.
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-[var(--color-secondary)]/70 md:text-lg">
            Скачайте опросный лист своего направления, заполните технические параметры объекта и пришлите на{" "}
            <a
              href="mailto:info@anhelspb.com"
              className="underline decoration-[var(--color-hairline)] underline-offset-[3px] hover:decoration-[var(--color-secondary)]"
            >
              info@anhelspb.com
            </a>
            . Инженер пересчитает подбор и подготовит коммерческое предложение в течение рабочего дня.
          </p>
        </div>
      </section>

      {/* Общие документы */}
      <section className="border-b border-[var(--color-hairline)] bg-[var(--color-primary)] text-[var(--color-secondary)]">
        <div className="mx-auto max-w-[1440px] px-6 py-14 md:px-12 md:py-16">
          <p className="mono-tag mb-8">Общие документы</p>
          <ul className="grid gap-3 md:grid-cols-2">
            {COMMON_DOCS.map((doc) => (
              <DocCard key={doc.href} doc={doc} icon={Building2} />
            ))}
          </ul>
        </div>
      </section>

      {/* Опросные листы — top-level якорь #questionnaires.
          Внутри — 4 группы по направлению, у каждой id={cat.slug}
          для совместимости с DocumentsMegaMenu. */}
      <section
        id="questionnaires"
        className="scroll-mt-24 border-b border-[var(--color-hairline)] bg-[var(--color-primary)] text-[var(--color-secondary)]"
      >
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-20">
          <SectionHeader
            tag="По направлениям"
            title="Опросные листы"
            lead="Заполните параметры объекта в шаблоне — мы вернёмся с подбором и коммерческим предложением в течение рабочего дня."
          />
          <div className="mt-12 flex flex-col gap-12 md:gap-14">
            {questionnaireCats.map((cat) => (
              <DirectionGroup
                key={cat.slug}
                id={cat.slug}
                title={cat.title}
                caption={cat.caption}
                items={cat.questionnaires}
                icon={FileText}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Каталоги — top-level якорь #catalogs. Placeholder. */}
      <section
        id="catalogs"
        className="scroll-mt-24 border-b border-[var(--color-hairline)] bg-[var(--color-primary)] text-[var(--color-secondary)]"
      >
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-20">
          <SectionHeader title="Каталоги" />
          <div className="mt-10 rounded-md border border-dashed border-[var(--color-hairline)] bg-[var(--color-image-placeholder)] p-8 text-center md:p-14">
            <p className="font-display text-xl leading-tight text-[var(--color-secondary)]/80 md:text-2xl">
              Печатные каталоги по направлениям — в подготовке
            </p>
            <p className="mt-3 text-sm text-[var(--color-secondary)]/55">
              Появятся в этом разделе. До тех пор для подбора подходят опросные листы и сертификаты.
            </p>
          </div>
        </div>
      </section>

      {/* Сертификаты — top-level якорь #certificates. Сгруппировано
          по направлениям, только там где сертификаты реально есть. */}
      <section
        id="certificates"
        className="scroll-mt-24 border-b border-[var(--color-hairline)] bg-[var(--color-primary)] text-[var(--color-secondary)]"
      >
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-20">
          <SectionHeader
            tag="По направлениям"
            title="Сертификаты ЕАЭС"
            lead="Декларации соответствия Техническим регламентам ЕАЭС — оборудование сертифицировано для применения на объектах России и стран Союза."
          />
          <div className="mt-12 flex flex-col gap-12 md:gap-14">
            {certificateCats.map((cat) => (
              <DirectionGroup
                key={cat.slug}
                title={cat.title}
                caption={cat.caption}
                items={cat.certificates}
                icon={FileBadge}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Руководства по эксплуатации — без top-level якоря в Footer,
          справочный раздел внизу. Только направления с manuals. */}
      {manualCats.length > 0 ? (
        <section className="bg-[var(--color-primary)] text-[var(--color-secondary)]">
          <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-20">
            <SectionHeader
              tag="По направлениям"
              title="Руководства по эксплуатации"
              lead="Передаются заказчику в составе ИОТ при приёмке. Здесь — для предварительного ознакомления."
            />
            <div className="mt-12 flex flex-col gap-12 md:gap-14">
              {manualCats.map((cat) => (
                <DirectionGroup
                  key={cat.slug}
                  title={cat.title}
                  caption={cat.caption}
                  items={cat.manuals ?? []}
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
 * Section header — mono-tag + h2 + опц. лид. Используется в каждой
 * top-level секции страницы документации.
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
      <h2 className="font-display text-3xl leading-tight md:text-5xl">
        {title}
      </h2>
      {lead ? (
        <p className="mt-6 text-base leading-relaxed text-[var(--color-secondary)]/70 md:text-lg">
          {lead}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Direction group — block внутри top-level секции по типу документа.
 * Содержит заголовок направления слева, описание-капшен справа и
 * сетку DocCard 2 в ряд.
 *
 * `id` опционален: внутри секции «Опросные листы» каждая группа
 * получает id=slug для совместимости с DocumentsMegaMenu. В других
 * секциях id не повторяем (id уникальны в DOM).
 */
function DirectionGroup({
  id,
  title,
  caption,
  items,
  icon,
}: {
  id?: string;
  title: string;
  caption: string;
  items: DocItem[];
  icon: typeof FileText;
}) {
  if (items.length === 0) return null;
  return (
    <article id={id} className={id ? "scroll-mt-24" : undefined}>
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between md:gap-10">
        <p className="font-display text-2xl leading-tight md:text-3xl">
          {title}
        </p>
        <p className="max-w-md text-sm leading-relaxed text-[var(--color-secondary)]/60 md:text-right md:text-[15px]">
          {caption}
        </p>
      </div>
      <ul className="grid gap-3 md:grid-cols-2">
        {items.map((doc) => (
          <DocCard key={doc.href} doc={doc} icon={icon} />
        ))}
      </ul>
    </article>
  );
}

function DocCard({
  doc,
  icon: Icon,
}: {
  doc: DocItem;
  icon: typeof FileText;
}) {
  return (
    <li>
      <Link
        href={doc.href}
        download
        data-cursor="hover"
        className="group flex items-center gap-4 rounded-sm border border-[var(--color-hairline)] p-4 transition-colors hover:border-[var(--color-secondary)]/40 hover:bg-[var(--color-hover-tint)] md:p-5"
      >
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--color-hairline)] text-[var(--color-secondary)]/70 transition-colors group-hover:border-[var(--color-secondary)]/40 group-hover:text-[var(--color-secondary)]">
          <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
        </span>
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-[15px] text-[var(--color-secondary)]">
            {doc.title}
          </span>
          <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/50">
            PDF · {doc.size}
          </span>
        </span>
        <Download
          size={16}
          strokeWidth={1.5}
          aria-hidden="true"
          className="shrink-0 text-[var(--color-secondary)]/35 transition-all group-hover:translate-y-0.5 group-hover:text-[var(--color-secondary)]"
        />
      </Link>
    </li>
  );
}
