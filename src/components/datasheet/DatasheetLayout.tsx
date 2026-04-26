"use client";

import type { ReactNode } from "react";

/**
 * DatasheetLayout — two-column shell for the engineering / B2B
 * variant of a product page.
 *
 *   ┌─ sticky left rail (360-400px) ──┬─ scrollable content rail ─┐
 *   │  product image (small, clean)   │  ## Технические характ.  │
 *   │  designation + 4 key specs      │  table-row × 8           │
 *   │  ──────────────────────────     │  ## Конфигурации          │
 *   │  TOC (jumps to sections)        │  table × N variants      │
 *   │  ──────────────────────────     │  ## Применение            │
 *   │  Quick spec form (always-on)    │  list × 6 (compact)      │
 *   │  - расход м³/ч                   │  ## Документация          │
 *   │  - напор м                       │  download row × N        │
 *   │  - резервирование                │  ## Получить КП            │
 *   │  [Прислать запрос →]            │  full form               │
 *   └─────────────────────────────────┴───────────────────────────┘
 *
 * The left rail is `position: sticky; top: header-offset` so it
 * stays in view as the engineer scrolls the right rail. On mobile
 * it collapses to a top stack — hero card + form button at top, TOC
 * inline above each section, content below.
 */
export function DatasheetLayout({
  sidebar,
  children,
}: {
  sidebar: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="relative bg-[var(--color-primary)] pt-20 md:pt-24">
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-0 px-6 md:px-12">
        {/* Left rail — sticky on md+, full-width on mobile */}
        <aside className="col-span-12 md:col-span-4 lg:col-span-3">
          <div className="md:sticky md:top-24 md:max-h-[calc(100vh-7rem)] md:overflow-y-auto md:pr-6 md:pb-12">
            {sidebar}
          </div>
        </aside>

        {/* Right rail — scrollable content */}
        <main className="col-span-12 mt-12 md:col-span-8 md:mt-0 md:border-l md:border-[var(--color-hairline)] md:pl-12 lg:col-span-9">
          {children}
        </main>
      </div>
    </div>
  );
}

/**
 * SectionBlock — one section in the right rail. All sections share
 * the same chrome: anchor-id, mono section-tag, h2 title, then body.
 * Section divider is the top border.
 */
export function SectionBlock({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 border-t border-[var(--color-hairline)] py-10 first:border-t-0 first:pt-0 md:py-14"
    >
      <header className="mb-6 flex items-baseline gap-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-secondary)]/55">
          {index}
        </span>
        <h2 className="font-display text-section font-medium text-[var(--color-secondary)]">
          {title}
        </h2>
      </header>
      {children}
    </section>
  );
}
