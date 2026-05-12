import type { Metadata } from "next";
import Link from "next/link";
import { FileText, FileBadge, FileCog, Download, Building2 } from "lucide-react";

/**
 * `/documents` — единая страница технической документации.
 *
 * Закрывает запрос Алексея: «нужна одна точка где собраны опросные
 * листы по направлениям, каталоги, сертификаты, руководства».
 *
 * До этой страницы документы были разбросаны по продуктовым
 * страницам (секция 09 на каждой), а карточка организации жила
 * только на /contacts. Здесь — всё в одном месте, сгруппировано
 * по 4 направлениям + общие документы сверху.
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
  /** Каталоги — пока нет, placeholder активируется когда появятся. */
  catalogs?: DocItem[];
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
              <DocCard
                key={doc.href}
                doc={doc}
                icon={Building2}
              />
            ))}
          </ul>
        </div>
      </section>

      {/* Направления */}
      {CATEGORIES.map((cat) => (
        <CategoryBlock key={cat.slug} cat={cat} />
      ))}

      {/* Каталоги-placeholder — пока нет реальных */}
      <section className="bg-[var(--color-primary)] text-[var(--color-secondary)]">
        <div className="mx-auto max-w-[1440px] px-6 py-14 md:px-12 md:py-16">
          <p className="mono-tag mb-6">Каталоги</p>
          <div className="rounded-md border border-dashed border-[var(--color-hairline)] bg-[var(--color-image-placeholder)] p-8 text-center md:p-14">
            <p className="font-display text-xl leading-tight text-[var(--color-secondary)]/80 md:text-2xl">
              Печатные каталоги по направлениям — в подготовке
            </p>
            <p className="mt-3 text-sm text-[var(--color-secondary)]/55">
              Появятся в этом разделе. До тех пор для подбора подходят опросные листы и сертификаты выше.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function CategoryBlock({ cat }: { cat: DocCategory }) {
  const groups: Array<{ title: string; icon: typeof FileText; items: DocItem[] }> = [
    { title: "Опросные листы", icon: FileText, items: cat.questionnaires },
    { title: "Сертификаты", icon: FileBadge, items: cat.certificates },
  ];
  if (cat.manuals && cat.manuals.length > 0) {
    groups.push({ title: "Руководства", icon: FileCog, items: cat.manuals });
  }

  return (
    <section
      id={cat.slug}
      className="border-b border-[var(--color-hairline)] bg-[var(--color-primary)] text-[var(--color-secondary)]"
    >
      <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-20">
        <div className="mb-10 flex flex-col gap-2 md:flex-row md:items-end md:justify-between md:gap-10">
          <div>
            <p className="mono-tag mb-4">{cat.title}</p>
            <h2 className="font-display text-2xl leading-tight md:text-4xl">{cat.title}</h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[var(--color-secondary)]/60 md:text-right md:text-[15px]">
            {cat.caption}
          </p>
        </div>

        <div className="flex flex-col gap-10">
          {groups
            .filter((g) => g.items.length > 0)
            .map((group) => (
              <div key={group.title}>
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/55">
                  {group.title}
                </p>
                <ul className="mt-4 grid gap-3 md:grid-cols-2">
                  {group.items.map((doc) => (
                    <DocCard key={doc.href} doc={doc} icon={group.icon} />
                  ))}
                </ul>
              </div>
            ))}
        </div>
      </div>
    </section>
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
