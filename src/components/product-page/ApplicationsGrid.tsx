"use client";

import { motion } from "framer-motion";
import type {
  ApplicationsContent,
  ApplicationItem,
} from "@/content/products/types";

/**
 * Applications grid — section 5 «Применение».
 *
 * Layout:
 *   - Mobile (<640px): 1-колоночный compact-row stack. Каждая строка
 *     — горизонтальный flex-row: [mono-индекс][title][meta]. Padding
 *     минимальный (p-4), min-h ~72px чтобы tap-target оставался
 *     удобным. На <640 пустоту больших карточек больше не видно —
 *     текст заполняет строку.
 *   - sm (640+): 2 колонки в каталожном виде с большими карточками.
 *   - lg (1024+): 3 колонки.
 *
 * Hover / tap states:
 *   - Hover gated to `@media (hover: hover)` так что iOS Safari не
 *     оставляет ring + bg в hover-state после tap (та же категория
 *     что у TechSpecsGrid фикса 1336ce9).
 *   - `active:ring-[var(--accent-current)]` даёт tap-фидбек на
 *     touch-устройствах: при прижатии пальца строка получает 1px
 *     accent-ring, цвет берётся из --accent-current контекста
 *     продукта (fire / water / heat / treatment). Освобождается
 *     при отпускании пальца — без залипания.
 *   - `focus-visible:ring-[var(--accent-current)]/60` для
 *     клавиатурных пользователей.
 *
 * Каждая карточка — `<li>` с `tabIndex={0}` и `role="group"` чтобы
 * tap-feedback / focus работал на mobile (без превращения карточки
 * в Link, потому что детальной страницы applications сейчас нет).
 */
export function ApplicationsGrid({
  content,
}: {
  content: ApplicationsContent;
}) {
  return (
    <section
      id="applications"
      aria-labelledby="applications-title"
      className="relative border-t border-[var(--color-hairline)] bg-[var(--color-primary)]"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 py-20 md:px-12 md:py-28">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mono-tag">{content.tag}</p>
            <h2
              id="applications-title"
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

        {/* Mobile: 1-col compact rows. Tablet+ : 2-3 cols каталожный grid. */}
        <ul className="mt-12 grid grid-cols-1 gap-px bg-[var(--color-hairline)] md:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {content.items.map((item, i) => (
            <ApplicationCard key={item.id} item={item} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function ApplicationCard({
  item,
  index,
}: {
  item: ApplicationItem;
  index: number;
}) {
  const staggerDelay = Math.min(index, 5) * 0.06;

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
        // Mobile compact row — единый rhythm с Advantages/TechSpecs/Documents:
        // min-h-[64px], px-4 py-3, line-clamp на длинных полях.
        "min-h-[64px] flex-row items-baseline gap-3 px-4 py-3",
        // Tablet+ : block-card с большим padding.
        "sm:min-h-[220px] sm:flex-col sm:justify-between sm:gap-0 sm:p-6 md:min-h-[260px] md:p-8",
        "[@media(hover:hover)]:hover:bg-[var(--color-surface-1)]",
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

      {/* Title + example — на mobile compact (line-clamp), на sm+ block. */}
      <div className="flex min-w-0 flex-1 flex-col gap-1 sm:mt-10 sm:gap-3">
        <h3 className="line-clamp-1 font-display text-[14px] font-medium leading-tight text-[var(--color-secondary)] sm:line-clamp-none sm:text-[22px] md:text-[28px]">
          {item.title}
        </h3>
        <p className="line-clamp-1 font-mono text-[10px] uppercase leading-snug tracking-[0.08em] text-[var(--color-secondary)]/65 sm:line-clamp-none sm:text-[11px]">
          {item.example}
        </p>
      </div>
    </motion.li>
  );
}
