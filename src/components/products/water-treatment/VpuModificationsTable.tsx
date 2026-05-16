"use client";

import { motion } from "framer-motion";
import {
  VPU_ANHEL_MODIFICATIONS,
  type VpuModification,
  type VpuModificationId,
} from "@/content/products/vpu-anhel-series-modifications";

/**
 * Локализованная обёртка вокруг таблицы модельного ряда.
 * Кол-во столбцов и сами цифры — едины (источник — VPU_ANHEL_MODIFICATIONS);
 * локали приносят только заголовки колонок, текст секции и сноску.
 */
export type VpuModificationsContent = {
  /** Mono tag, e.g. «05 · МОДЕЛЬНЫЙ РЯД». */
  tag: string;
  /** Section h2, e.g. «4 модификации по линиям фильтрации». */
  title: string;
  /** One-line caption / lede on the right. */
  lede?: string;
  /** Header labels for the 5 columns. */
  headerStation: string;
  headerLines: string;
  headerFlow: string;
  headerDimensions: string;
  headerLamps: string;
  /** Caption below the table — про единицы, формат и т.д. */
  footnote?: string;
};

type Locale = "ru" | "en" | "tr";

/**
 * Modifications table — главный визуальный блок страницы серии.
 *
 * 5 столбцов: Тип станции / Линии / Макс. расход / Габариты / УФ-ламп.
 * Данные строк приходят из единого `VPU_ANHEL_MODIFICATIONS` (тот же
 * источник, что и быстрый подбор + PDF-генератор), локализованные
 * имена выбираются по `locale` (`nameRu` / `nameEn` / `nameTr` /
 * `flowLabel`).
 *
 * Опциональный проп `highlightedId` — id модификации, подобранной
 * через QuickQuoteSection. Если задан — соответствующая строка
 * подсвечивается accent-рамкой. На мобиле подсвечивается карточка.
 */
export function VpuModificationsTable({
  content,
  locale,
  highlightedId,
}: {
  content: VpuModificationsContent;
  locale: Locale;
  highlightedId?: VpuModificationId | null;
}) {
  return (
    <section
      id="modifications"
      aria-labelledby="modifications-title"
      className="relative border-t border-[var(--color-hairline)] bg-[var(--color-primary)]"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 py-20 md:px-12 md:py-28">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mono-tag">{content.tag}</p>
            <h2
              id="modifications-title"
              className="mt-4 max-w-[640px] font-display text-h2 font-medium text-[var(--color-secondary)]"
            >
              {content.title}
            </h2>
          </div>
          {content.lede ? (
            <p className="max-w-[420px] text-sm text-[var(--color-secondary)]/65 md:text-right">
              {content.lede}
            </p>
          ) : null}
        </div>

        {/* Desktop table — hidden on mobile. 5-column grid:
            station(1.6) / lines(0.6) / flow(1.2) / dimensions(1.4) / lamps(0.5) */}
        <div className="mt-12 hidden md:mt-16 md:block">
          <div
            role="table"
            aria-label={content.title}
            className="overflow-hidden border border-[var(--color-hairline)]"
          >
            <div
              role="row"
              className="grid grid-cols-[1.6fr_0.6fr_1.2fr_1.4fr_0.5fr] bg-[var(--color-hairline)]/40 px-6 py-4 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/65 md:px-8"
            >
              <span role="columnheader">{content.headerStation}</span>
              <span role="columnheader">{content.headerLines}</span>
              <span role="columnheader">{content.headerFlow}</span>
              <span role="columnheader">{content.headerDimensions}</span>
              <span role="columnheader" className="text-right">{content.headerLamps}</span>
            </div>
            <ul role="rowgroup" className="flex flex-col gap-px bg-[var(--color-hairline)]">
              {VPU_ANHEL_MODIFICATIONS.map((row, i) => (
                <ModificationRow
                  key={row.id}
                  row={row}
                  locale={locale}
                  index={i}
                  highlighted={row.id === highlightedId}
                />
              ))}
            </ul>
          </div>
        </div>

        {/* Mobile (<md) card list */}
        <ul className="mt-12 grid grid-cols-1 gap-px bg-[var(--color-hairline)] md:hidden">
          {VPU_ANHEL_MODIFICATIONS.map((row, i) => (
            <ModificationCard
              key={row.id}
              row={row}
              locale={locale}
              index={i}
              content={content}
              highlighted={row.id === highlightedId}
            />
          ))}
        </ul>

        {content.footnote ? (
          <p className="mt-8 max-w-[640px] text-[12px] leading-relaxed text-[var(--color-secondary)]/55 md:mt-10 md:text-[13px]">
            {content.footnote}
          </p>
        ) : null}
      </div>
    </section>
  );
}

function getName(row: VpuModification, locale: Locale): string {
  if (locale === "en") return row.nameEn;
  if (locale === "tr") return row.nameTr;
  return row.nameRu;
}

function getFlow(row: VpuModification, locale: Locale): string {
  return row.flowLabel[locale];
}

function ModificationRow({
  row,
  locale,
  index,
  highlighted,
}: {
  row: VpuModification;
  locale: Locale;
  index: number;
  highlighted: boolean;
}) {
  return (
    <motion.li
      role="row"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
        delay: Math.min(index, 3) * 0.06,
      }}
      data-highlighted={highlighted || undefined}
      className={[
        "group relative grid grid-cols-[1.6fr_0.6fr_1.2fr_1.4fr_0.5fr] items-baseline gap-4 px-6 py-6 transition-colors duration-300 md:px-8 md:py-7",
        highlighted
          ? "bg-[var(--accent-current)]/8"
          : "bg-[var(--color-primary)] [@media(hover:hover)]:hover:bg-[var(--color-hover-tint)]",
      ].join(" ")}
    >
      <span
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-0 ring-1 transition-[box-shadow,ring-color] duration-300",
          highlighted
            ? "ring-[var(--accent-current)]"
            : "ring-transparent [@media(hover:hover)]:group-hover:ring-[var(--accent-current)]",
        ].join(" ")}
      />
      <span
        role="cell"
        className="font-display text-[18px] font-medium leading-tight text-[var(--color-secondary)] md:text-[22px]"
      >
        {getName(row, locale)}
      </span>
      <span
        role="cell"
        className="font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--color-secondary)]/70 md:text-[13px]"
      >
        {row.linesCount}
      </span>
      <span
        role="cell"
        className="font-display text-[16px] font-medium text-[var(--color-secondary)] md:text-[18px]"
      >
        {getFlow(row, locale)}
      </span>
      <span
        role="cell"
        className="font-mono text-[12px] tracking-[0.02em] text-[var(--color-secondary)]/75 md:text-[13px]"
      >
        {row.dimensions}
      </span>
      <span
        role="cell"
        className="text-right font-mono text-[12px] tabular-nums text-[var(--color-secondary)]/75 md:text-[14px]"
      >
        {row.linesCount}
      </span>
    </motion.li>
  );
}

function ModificationCard({
  row,
  locale,
  index,
  content,
  highlighted,
}: {
  row: VpuModification;
  locale: Locale;
  index: number;
  content: VpuModificationsContent;
  highlighted: boolean;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
        delay: Math.min(index, 3) * 0.06,
      }}
      data-highlighted={highlighted || undefined}
      className={[
        "group relative flex flex-col gap-4 p-5 transition-colors duration-300",
        highlighted
          ? "bg-[var(--accent-current)]/8"
          : "bg-[var(--color-primary)] [@media(hover:hover)]:hover:bg-[var(--color-hover-tint)]",
      ].join(" ")}
    >
      <span
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-0 ring-1 transition-[box-shadow,ring-color] duration-300",
          highlighted
            ? "ring-[var(--accent-current)]"
            : "ring-transparent [@media(hover:hover)]:group-hover:ring-[var(--accent-current)]",
        ].join(" ")}
      />
      <div className="grid grid-cols-2 gap-2">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/55">
            {content.headerLines}
          </p>
          <p className="mt-1 font-mono text-[14px] tabular-nums text-[var(--color-secondary)]/85">
            {row.linesCount}
          </p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/55">
            {content.headerLamps}
          </p>
          <p className="mt-1 font-mono text-[14px] tabular-nums text-[var(--color-secondary)]/85">
            {row.linesCount}
          </p>
        </div>
      </div>
      <h3 className="font-display text-[18px] font-medium leading-tight text-[var(--color-secondary)]">
        {getName(row, locale)}
      </h3>
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/55">
          {content.headerFlow}
        </p>
        <p className="mt-1 font-display text-[18px] font-medium text-[var(--color-secondary)]">
          {getFlow(row, locale)}
        </p>
      </div>
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/55">
          {content.headerDimensions}
        </p>
        <p className="mt-1 font-mono text-[13px] text-[var(--color-secondary)]/80">
          {row.dimensions}
        </p>
      </div>
    </motion.li>
  );
}
