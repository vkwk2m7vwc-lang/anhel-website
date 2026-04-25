"use client";

import { motion } from "framer-motion";
import type {
  AdvantagesContent,
  AdvantageItem,
} from "@/content/products/types";

/**
 * Advantages grid — section 7.
 *
 * Same layout system as ApplicationsGrid:
 *   - Mobile (<640px): 1-col compact row stack. Каждый пункт —
 *     горизонтальная строка [mono][title — body на одной линии].
 *     Padding минимальный (p-4), min-h ~72px tap-target.
 *   - sm (640+): 2 колонки card-layout.
 *   - lg (1024+): 3 колонки.
 *
 * Hover gated to `@media (hover: hover)` чтобы tap на iOS не оставлял
 * tile в hover-state. `active:ring-[var(--accent-current)]` даёт
 * tap-фидбек цветом продукта (fire / water / heat / treatment).
 *
 * Reusable per product — `AdvantagesContent` drives everything.
 */
export function AdvantagesGrid({ content }: { content: AdvantagesContent }) {
  return (
    <section
      id="advantages"
      aria-labelledby="advantages-title"
      className="relative border-t border-[var(--color-hairline)] bg-[var(--color-primary)]"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 py-20 md:px-12 md:py-28">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mono-tag">{content.tag}</p>
            <h2
              id="advantages-title"
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

        {/* Mobile 1-col rows → tablet 2-col → desktop 3-col card grid. */}
        <ul className="mt-12 grid grid-cols-1 gap-px bg-[var(--color-hairline)] md:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {content.items.map((item, i) => (
            <AdvantageCard key={item.id} item={item} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function AdvantageCard({
  item,
  index,
}: {
  item: AdvantageItem;
  index: number;
}) {
  const staggerDelay = Math.min(index, 8) * 0.05;

  return (
    <motion.li
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        delay: staggerDelay,
      }}
      tabIndex={0}
      role="group"
      aria-label={`${item.mono} · ${item.title}`}
      className={[
        "group relative flex bg-[var(--color-primary)] outline-none transition-colors duration-300",
        // Mobile compact row.
        "min-h-[72px] flex-row items-baseline gap-3 p-4",
        // Tablet+ card.
        "sm:min-h-[240px] sm:flex-col sm:justify-between sm:gap-0 sm:p-6 md:min-h-[280px] md:p-8",
        "[@media(hover:hover)]:hover:bg-[#111]",
        "active:ring-1 active:ring-[var(--accent-current)]",
        "focus-visible:ring-1 focus-visible:ring-[var(--accent-current)]/70",
      ].join(" ")}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 ring-1 ring-transparent transition-[box-shadow,ring-color] duration-300 [@media(hover:hover)]:group-hover:ring-[var(--accent-current)]"
      />

      <p
        aria-hidden="true"
        className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/65 transition-colors duration-300 [@media(hover:hover)]:group-hover:text-[var(--accent-current)] sm:text-[11px]"
      >
        {item.mono}
      </p>

      {/* Title + body — на mobile в одну вертикальную колонку рядом с
          mono-индексом. На sm+ — стандартный block ниже mono. */}
      <div className="flex min-w-0 flex-1 flex-col gap-1 sm:mt-10 sm:gap-3">
        <h3 className="font-display text-[15px] font-medium leading-tight text-[var(--color-secondary)] sm:text-[22px] md:text-[24px]">
          {item.title}
        </h3>
        <p className="text-[12px] leading-relaxed text-[var(--color-secondary)]/65 sm:text-sm">
          {item.body}
        </p>
      </div>
    </motion.li>
  );
}
