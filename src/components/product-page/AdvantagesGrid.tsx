"use client";

import { motion } from "framer-motion";
import type {
  AdvantagesContent,
  AdvantageItem,
} from "@/content/products/types";

/**
 * Advantages grid — section 7.
 *
 * Nine cards laid out 3×3 on desktop, 2×5 (the last one spans) on
 * tablet, 1×9 on mobile. Each card carries a large mono index plus
 * a short title and a 1-2 sentence body. Nine cells — полный
 * proof-набор, preserved so the engineering reader sees the whole
 * sheet without scrolling off to a "read more".
 *
 * Design note — we use the same `gap-px bg-hairline` trick as
 * ApplicationsGrid and TechSpecsGrid so the cell borders are a single
 * pixel with no double-border at the edges. Hover-ring + mono-number
 * colour lift are the only hover-state effects; the body copy stays
 * the same so the card doesn't visually jump on cursor enter.
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
            <p className="max-w-[420px] text-sm text-[var(--color-secondary)]/60 md:text-right">
              {content.lede}
            </p>
          ) : null}
        </div>

        {/* 1 × 9 → 2 × 5 → 3 × 3. Nine cells divide exactly on desktop. */}
        <ul className="mt-12 grid grid-cols-1 gap-px bg-[var(--color-hairline)] md:mt-16 md:grid-cols-2 lg:grid-cols-3">
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
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: staggerDelay,
      }}
      className="group relative flex min-h-[240px] flex-col justify-between bg-[var(--color-primary)] p-6 transition-colors duration-300 hover:bg-[#111] md:min-h-[280px] md:p-8"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 ring-1 ring-transparent transition-[box-shadow,ring-color] duration-300 group-hover:ring-[var(--accent-current)]"
      />

      <p
        aria-hidden="true"
        className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/40 transition-colors duration-300 group-hover:text-[var(--accent-current)]"
      >
        {item.mono}
      </p>

      <div className="mt-10 flex flex-col gap-3">
        <h3 className="font-display text-[22px] font-medium leading-tight text-[var(--color-secondary)] md:text-[24px]">
          {item.title}
        </h3>
        <p className="text-sm leading-relaxed text-[var(--color-secondary)]/60">
          {item.body}
        </p>
      </div>
    </motion.li>
  );
}
