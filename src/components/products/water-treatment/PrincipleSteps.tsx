"use client";

import { motion } from "framer-motion";
import type { AdvantagesContent } from "@/content/products/types";

/**
 * «Принцип работы» — 4 ступени очистки на странице серии ВПУ.
 *
 * Использует тот же контент-shape, что AdvantagesGrid (mono + title +
 * body), но рендерит ровно 4 элемента в одну строку на десктопе
 * (`lg:grid-cols-4`). На обычном AdvantagesGrid (1/2/3 cols) 4 элемента
 * оставляют пустую плитку в правом нижнем углу — здесь этой проблемы
 * нет: row 1 = 4 шага, ничего лишнего.
 *
 * Брейкпоинты:
 *   - mobile (<sm)  → 1 колонка, вертикальный список
 *   - tablet (sm+)  → 2 колонки × 2 строки
 *   - desktop (lg+) → 4 колонки × 1 строка
 */
export function PrincipleSteps({ content }: { content: AdvantagesContent }) {
  return (
    <section
      id="principle"
      aria-labelledby="principle-title"
      className="relative border-t border-[var(--color-hairline)] bg-[var(--color-primary)]"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 py-20 md:px-12 md:py-28">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mono-tag">{content.tag}</p>
            <h2
              id="principle-title"
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

        {/* 1 col mobile → 2x2 tablet → 4x1 desktop. gap-px + hairline bg
            даёт тонкие разделители, как в AdvantagesGrid, без пустых
            плиток на больших экранах. */}
        <ul className="mt-12 grid grid-cols-1 gap-px bg-[var(--color-hairline)] md:mt-16 sm:grid-cols-2 lg:grid-cols-4">
          {content.items.map((item, i) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
                delay: Math.min(i, 3) * 0.06,
              }}
              tabIndex={0}
              role="group"
              aria-label={`${item.mono} · ${item.title}`}
              className={[
                "group relative flex bg-[var(--color-primary)] outline-none transition-colors duration-300",
                "min-h-[64px] flex-row items-baseline gap-3 px-4 py-3",
                "sm:min-h-[240px] sm:flex-col sm:justify-between sm:gap-0 sm:p-6 md:min-h-[260px] md:p-7",
                "[@media(hover:hover)]:hover:bg-[var(--color-hover-tint)]",
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

              <div className="flex min-w-0 flex-1 flex-col gap-1 sm:mt-10 sm:gap-3">
                <h3 className="font-display text-[14px] font-medium leading-tight text-[var(--color-secondary)] sm:text-[20px] md:text-[22px]">
                  {item.title}
                </h3>
                <p className="text-[11px] leading-snug text-[var(--color-secondary)]/65 sm:text-[13px] sm:leading-relaxed md:text-[14px]">
                  {item.body}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
