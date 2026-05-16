"use client";

import { motion } from "framer-motion";

/**
 * «Режимы работы и автоматика» — used on VPU Anhel Series and likely
 * other future automation-heavy pages. Three column blocks:
 *   1) Modes        — режимы работы (авто/ручной)
 *   2) Interface    — HMI, уровни доступа, диспетчеризация
 *   3) Safeties     — защиты и блокировки (по 3-5 пунктов)
 */
export type AutomationBlock = {
  /** Mono prefix in left header, e.g. «01». */
  mono: string;
  /** Block heading, e.g. «Режимы работы». */
  title: string;
  /** Bullet list rendered under the heading. */
  items: string[];
};

export type AutomationContent = {
  /** Mono tag, e.g. «07 · РЕЖИМЫ И АВТОМАТИКА». */
  tag: string;
  /** Section h2. */
  title: string;
  /** Optional one-liner intro. */
  lede?: string;
  /** Two or three blocks. */
  blocks: AutomationBlock[];
};

export function AutomationSection({
  content,
}: {
  content: AutomationContent;
}) {
  return (
    <section
      id="automation"
      aria-labelledby="automation-title"
      className="relative border-t border-[var(--color-hairline)] bg-[var(--color-primary)]"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 py-20 md:px-12 md:py-28">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mono-tag">{content.tag}</p>
            <h2
              id="automation-title"
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

        <ul className="mt-12 grid grid-cols-1 gap-px bg-[var(--color-hairline)] md:mt-16 md:grid-cols-3">
          {content.blocks.map((block, i) => (
            <motion.li
              key={block.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
                delay: Math.min(i, 3) * 0.06,
              }}
              className="group relative flex flex-col gap-4 bg-[var(--color-primary)] p-6 transition-colors duration-300 [@media(hover:hover)]:hover:bg-[var(--color-hover-tint)] md:p-8"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 ring-1 ring-transparent transition-[box-shadow,ring-color] duration-300 [@media(hover:hover)]:group-hover:ring-[var(--accent-current)]"
              />
              <p
                aria-hidden="true"
                className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/65 transition-colors duration-300 [@media(hover:hover)]:group-hover:text-[var(--accent-current)] sm:text-[11px]"
              >
                {block.mono}
              </p>
              <h3 className="font-display text-[20px] font-medium leading-tight text-[var(--color-secondary)] md:text-[22px]">
                {block.title}
              </h3>
              <ul className="flex flex-col gap-2 text-[14px] leading-relaxed text-[var(--color-secondary)]/75 md:text-[15px]">
                {block.items.map((item, ix) => (
                  <li key={ix} className="flex items-baseline gap-2">
                    <span aria-hidden="true" className="font-mono text-[10px] text-[var(--color-secondary)]/45">
                      ·
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
