"use client";

import { motion } from "framer-motion";

/**
 * Section type — «Состав установки» for VPU Anhel Series and
 * potentially other series pages. A short prose section with a
 * structured list of components on the right column.
 */
export type CompositionContent = {
  /** Mono tag, e.g. «05 · СОСТАВ УСТАНОВКИ». */
  tag: string;
  /** Section h2. */
  title: string;
  /** Optional intro on the left rail (under h2). */
  lede?: string;
  /** Items rendered as a numbered list (01..NN). */
  items: string[];
};

/**
 * «Состав установки» — left rail title + right column numbered list.
 *
 * Layout matches DescriptionSection (`grid md:grid-cols-[280px_1fr]`)
 * so successive sections of the page share the same column structure
 * and the reader's eye doesn't reset its anchor.
 *
 * The list itself is a 2-column ul on desktop (4-5 items per column),
 * 1-column on mobile. Each item: `01` mono index + the description.
 */
export function CompositionList({
  content,
}: {
  content: CompositionContent;
}) {
  return (
    <section
      id="composition"
      aria-labelledby="composition-title"
      className="relative border-t border-[var(--color-hairline)] bg-[var(--color-primary)]"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 py-20 md:px-12 md:py-28">
        <div className="grid gap-10 md:grid-cols-[280px_1fr] md:gap-16">
          <div>
            <p className="mono-tag">{content.tag}</p>
            <h2
              id="composition-title"
              className="mt-4 max-w-[420px] font-display text-h2 font-medium text-[var(--color-secondary)]"
            >
              {content.title}
            </h2>
            {content.lede ? (
              <p className="mt-6 max-w-[360px] text-[14px] leading-relaxed text-[var(--color-secondary)]/65">
                {content.lede}
              </p>
            ) : null}
          </div>

          <ul className="grid grid-cols-1 gap-x-12 gap-y-5 md:grid-cols-2 md:gap-y-6">
            {content.items.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.45,
                  ease: [0.16, 1, 0.3, 1],
                  delay: Math.min(i, 6) * 0.04,
                }}
                className="flex items-baseline gap-4"
              >
                <span
                  aria-hidden="true"
                  className="shrink-0 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/55"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[15px] leading-relaxed text-[var(--color-secondary)]/85 md:text-[16px]">
                  {item}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
