"use client";

import { motion } from "framer-motion";
import type { BrandsContent, BrandItem } from "@/content/products/types";

/**
 * Brands strip — section 6.
 *
 * Two rows: pump brands (larger, tier 1) and component brands (smaller,
 * tier 2). No SVG logos yet — we render display-font word-marks in
 * the hairline/steel palette so the row reads as an engineering proof
 * line rather than a logo wall. The palette keeps the brands from
 * competing with the product renders and the fire-red accents.
 *
 * When real SVG logos arrive the BrandItem shape grows an `svg` field
 * and this component learns a second branch — chore commit.
 *
 * The rows run flex-wrap with large horizontal gaps; on viewport <md
 * they collapse into 2–3 wide columns gracefully without forcing a
 * special mobile layout.
 */
export function BrandsStrip({ content }: { content: BrandsContent }) {
  return (
    <section
      id="brands"
      aria-labelledby="brands-title"
      className="relative border-t border-[var(--color-hairline)] bg-[var(--color-primary)]"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 py-20 md:px-12 md:py-28">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mono-tag">{content.tag}</p>
            <h2
              id="brands-title"
              className="mt-4 max-w-[720px] font-display text-h2 font-medium text-[var(--color-secondary)]"
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

        {/* Row 1 — pump brands */}
        <div className="mt-14 md:mt-20">
          <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/40">
            Насосы
          </p>
          <ul className="flex flex-wrap items-baseline gap-x-12 gap-y-8 md:gap-x-16">
            {content.rowPumps.map((b, i) => (
              <BrandWordMark key={b.id} brand={b} tier="pump" index={i} />
            ))}
          </ul>
        </div>

        {/* Row 2 — components */}
        <div className="mt-14 border-t border-[var(--color-hairline)] pt-10 md:mt-20 md:pt-14">
          <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/40">
            Автоматика и комплектующие
          </p>
          <ul className="flex flex-wrap items-baseline gap-x-10 gap-y-6 md:gap-x-12">
            {content.rowComponents.map((b, i) => (
              <BrandWordMark key={b.id} brand={b} tier="component" index={i} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/**
 * One brand word-mark.
 *
 * `tier` = "pump" renders larger (display face, 22–28px), "component"
 * smaller (18–22px, muted). Both honour the same hover treatment —
 * colour lifts from steel-dark to secondary, and the optional `series`
 * hint unveils beneath when hover is active.
 */
function BrandWordMark({
  brand,
  tier,
  index,
}: {
  brand: BrandItem;
  tier: "pump" | "component";
  index: number;
}) {
  const staggerDelay = Math.min(index, 8) * 0.04;
  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        delay: staggerDelay,
      }}
      className="group relative flex flex-col gap-1"
    >
      <span
        className={
          tier === "pump"
            ? "font-display text-[22px] font-medium tracking-tight text-[var(--color-steel-dark)] transition-colors duration-300 group-hover:text-[var(--color-secondary)] md:text-[28px]"
            : "font-display text-[18px] font-medium tracking-tight text-[var(--color-steel-dark)]/80 transition-colors duration-300 group-hover:text-[var(--color-secondary)] md:text-[22px]"
        }
      >
        {brand.name}
      </span>
      {brand.series ? (
        <span
          aria-hidden="true"
          className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-secondary)]/35 transition-colors duration-300 group-hover:text-[var(--accent-current)]"
        >
          {brand.series}
        </span>
      ) : null}
    </motion.li>
  );
}
