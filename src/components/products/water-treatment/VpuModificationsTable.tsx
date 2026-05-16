"use client";

import { motion } from "framer-motion";

/**
 * One row in the VPU Anhel Series modifications table.
 *
 * The series ships in 4 modifications, distinguished by the number of
 * parallel filtration lines and the maximum flow they handle. This is
 * the single most important visual on the page — the row the client
 * uses to map their flow requirement to a specific model.
 */
export type VpuModification = {
  /** Stable id (e.g. "lines-2"). */
  id: string;
  /** Display station name, e.g. «ВПУ ANHEL (2 линии)». */
  station: string;
  /** Compact lines label shown in the leftmost column, e.g. «2 линии». */
  linesLabel: string;
  /** Max flow display value, e.g. «до 21,9» or «от 22,0 до 35,9». */
  flow: string;
  /** Flow unit suffix, e.g. «м³/ч». Optional so EN/TR can swap. */
  flowUnit?: string;
};

export type VpuModificationsContent = {
  /** Mono tag, e.g. «03 · МОДЕЛЬНЫЙ РЯД». */
  tag: string;
  /** Section h2, e.g. «4 модификации по линиям фильтрации». */
  title: string;
  /** One-line caption / lede on the right. */
  lede?: string;
  /** Header labels for the table columns. */
  headerStation: string;
  headerLines: string;
  headerFlow: string;
  /** 4 modifications in display order, smallest first. */
  rows: VpuModification[];
  /** Caption below the table, e.g. about flow units, contact for sizing. */
  footnote?: string;
};

/**
 * Modifications table — the centerpiece of /water-treatment/anhel-series.
 *
 * Layout:
 *   ┌──────────────────────────┬───────────┬──────────────────────┐
 *   │ Тип станции              │ Линии     │ Макс. расход         │
 *   ├──────────────────────────┼───────────┼──────────────────────┤
 *   │ ВПУ ANHEL (2 линии)      │  2 линии  │ до 21,9 м³/ч         │
 *   │ ВПУ ANHEL (3 линии)      │  3 линии  │ от 22,0 до 35,9 м³/ч │
 *   │ ВПУ ANHEL (4 линии)      │  4 линии  │ от 36,0 до 45,9 м³/ч │
 *   │ ВПУ ANHEL (5 линий)      │  5 линий  │ от 46,0 до 55,9 м³/ч │
 *   └──────────────────────────┴───────────┴──────────────────────┘
 *
 * Mobile: collapses to one column per row — each modification renders
 * as a card with station name on top, lines + flow stacked below.
 *
 * The whole section uses the `--accent-current` of the parent
 * ProductPageShell (treatment accent for water-treatment family) for
 * the row hover ring and the lines pill border.
 */
export function VpuModificationsTable({
  content,
}: {
  content: VpuModificationsContent;
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

        {/* Desktop / tablet table. Hidden on mobile (<sm) — replaced by
            card-list below. The header row uses mono-caps to match
            other ANHEL grid section headers. */}
        <div className="mt-12 hidden md:block md:mt-16">
          <div
            role="table"
            aria-label={content.title}
            className="overflow-hidden border border-[var(--color-hairline)]"
          >
            <div
              role="row"
              className="grid grid-cols-[1.6fr_0.8fr_1.2fr] bg-[var(--color-hairline)]/40 px-6 py-4 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/65 md:px-8"
            >
              <span role="columnheader">{content.headerStation}</span>
              <span role="columnheader">{content.headerLines}</span>
              <span role="columnheader">{content.headerFlow}</span>
            </div>
            <ul role="rowgroup" className="flex flex-col gap-px bg-[var(--color-hairline)]">
              {content.rows.map((row, i) => (
                <ModificationRow key={row.id} row={row} index={i} />
              ))}
            </ul>
          </div>
        </div>

        {/* Mobile (<md) card list — each row as a tappable card. */}
        <ul className="mt-12 grid grid-cols-1 gap-px bg-[var(--color-hairline)] md:hidden">
          {content.rows.map((row, i) => (
            <ModificationCard key={row.id} row={row} index={i} content={content} />
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

function ModificationRow({
  row,
  index,
}: {
  row: VpuModification;
  index: number;
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
      className="group relative grid grid-cols-[1.6fr_0.8fr_1.2fr] items-baseline gap-4 bg-[var(--color-primary)] px-6 py-6 transition-colors duration-300 [@media(hover:hover)]:hover:bg-[var(--color-hover-tint)] md:px-8 md:py-7"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 ring-1 ring-transparent transition-[box-shadow,ring-color] duration-300 [@media(hover:hover)]:group-hover:ring-[var(--accent-current)]"
      />
      <span
        role="cell"
        className="font-display text-[18px] font-medium leading-tight text-[var(--color-secondary)] md:text-[22px]"
      >
        {row.station}
      </span>
      <span role="cell" className="font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--color-secondary)]/70 md:text-[13px]">
        {row.linesLabel}
      </span>
      <span role="cell" className="font-display text-[16px] font-medium text-[var(--color-secondary)] md:text-[20px]">
        {row.flow}
        {row.flowUnit ? (
          <span className="ml-1 font-mono text-[12px] uppercase tracking-[0.08em] text-[var(--color-secondary)]/55 md:text-[13px]">
            {row.flowUnit}
          </span>
        ) : null}
      </span>
    </motion.li>
  );
}

function ModificationCard({
  row,
  index,
  content,
}: {
  row: VpuModification;
  index: number;
  content: VpuModificationsContent;
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
      className="group relative flex flex-col gap-4 bg-[var(--color-primary)] p-5 transition-colors duration-300 [@media(hover:hover)]:hover:bg-[var(--color-hover-tint)]"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 ring-1 ring-transparent transition-[box-shadow,ring-color] duration-300 [@media(hover:hover)]:group-hover:ring-[var(--accent-current)]"
      />
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/55">
          {content.headerLines}
        </p>
        <p className="mt-1 font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--color-secondary)]/85">
          {row.linesLabel}
        </p>
      </div>
      <div>
        <h3 className="font-display text-[18px] font-medium leading-tight text-[var(--color-secondary)]">
          {row.station}
        </h3>
      </div>
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/55">
          {content.headerFlow}
        </p>
        <p className="mt-1 font-display text-[18px] font-medium text-[var(--color-secondary)]">
          {row.flow}
          {row.flowUnit ? (
            <span className="ml-1 font-mono text-[12px] uppercase tracking-[0.08em] text-[var(--color-secondary)]/55">
              {row.flowUnit}
            </span>
          ) : null}
        </p>
      </div>
    </motion.li>
  );
}
