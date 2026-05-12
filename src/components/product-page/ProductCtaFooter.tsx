"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { FooterCtaContent } from "@/content/products/types";
import { useTranslations } from "next-intl";
import {
  TOP_LEVEL_PRODUCTS,
  getTopLevelCategory,
  type ProductSummary,
} from "@/lib/products";
import { cn } from "@/lib/utils";

/**
 * Final CTA + neighbour strip — section 12.
 *
 * Layout (desktop):
 *   ┌──────────────────────────┬──────────────────────┐
 *   │  12 · ЗАПРОС КП          │  Остальные разделы   │
 *   │                          │  ┌─────────────────┐ │
 *   │  Соберите свою           │  │ Водоподготовка →│ │
 *   │  станцию под проект      │  ├─────────────────┤ │
 *   │                          │  │ Тепловые пункты →│ │
 *   │  [Заполнить опросный...] │  ├─────────────────┤ │
 *   │                          │  │ Шкафы управления →│ │
 *   └──────────────────────────┴──────────────────────┘
 *
 * Раньше показывал плоский список из всех 11 «соседей» (5 насосных
 * подслугов + водоподготовка + ИТП + 5 шкафов). На длинных страницах
 * пользователь должен был листать большой список — неудобно.
 *
 * Теперь показываем 3 top-level категории — минус текущая. Например
 * на /products/pumps/water-supply прячем pumps и показываем
 * water-treatment + heating-unit + control-systems. На любой шкафной
 * странице прячем control-systems. Каждая плитка ведёт на каталог
 * раздела, оттуда можно перейти к нужному подпродукту.
 */
export function ProductCtaFooter({
  content,
  currentSlug,
}: {
  content: FooterCtaContent;
  currentSlug: string;
}) {
  const currentCategory = getTopLevelCategory(currentSlug);
  const neighbours = TOP_LEVEL_PRODUCTS.filter((p) => p.slug !== currentCategory);

  return (
    <section
      id="cta-footer"
      aria-labelledby="cta-footer-title"
      className="relative border-t border-[var(--color-hairline)] bg-[var(--color-primary)]"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 py-20 md:px-12 md:py-28">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-20">
          {/* Left — the hook */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-8"
          >
            <p className="mono-tag">{content.tag}</p>
            <h2
              id="cta-footer-title"
              className="max-w-[620px] font-display text-section font-medium leading-[1.05] text-[var(--color-secondary)]"
            >
              {content.title}
            </h2>
            {content.subtitle ? (
              <p className="max-w-[480px] text-body text-[var(--color-secondary)]/70">
                {content.subtitle}
              </p>
            ) : null}

            <div>
              <Link
                href={content.cta.href}
                data-cursor="hover"
                className="group inline-flex items-center gap-3 rounded-md bg-[var(--color-secondary)] px-6 py-[14px] text-sm font-medium text-[var(--color-primary)] transition-colors hover:bg-[var(--accent-current)] hover:text-[var(--color-secondary)]"
              >
                {content.cta.label}
                <span
                  aria-hidden="true"
                  className="inline-block font-mono transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </motion.div>

          {/* Right — neighbour strip */}
          <div className="flex flex-col gap-5">
            {content.neighboursCaption ? (
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/65">
                {content.neighboursCaption}
              </p>
            ) : null}
            <ul className="flex flex-col gap-px bg-[var(--color-hairline)]">
              {neighbours.map((n, i) => (
                <NeighbourCard key={n.slug} product={n} index={i} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Neighbour row — mono title + short tagline + arrow. Hover border
 * picks up the neighbour's OWN accent (water / treatment / heat etc),
 * not the current page's — it's a hand-off out of this product,
 * colour-coded by destination.
 *
 * When the product is flagged `comingSoon`, the card renders as a
 * non-interactive tile with a "Скоро" badge in place of the arrow —
 * no href, `aria-disabled="true"`, muted opacity. Prevents the
 * previous 404-on-click trap when sibling product pages haven't
 * shipped yet (audit finding 6).
 */
function NeighbourCard({
  product,
  index,
}: {
  product: ProductSummary;
  index: number;
}) {
  // Map accent key to the CSS variable — same table as ProductPageShell.
  const ACCENT_VAR: Record<string, string> = {
    fire: "var(--accent-fire)",
    water: "var(--accent-water)",
    treatment: "var(--accent-treatment)",
    heat: "var(--accent-heat)",
  };
  const tItems = useTranslations(`products.items.${product.slug}`);
  const tShowcase = useTranslations("home.showcase");
  const neighbourAccent = ACCENT_VAR[product.accent];

  // Inner body — shared by the link branch and the disabled branch so the
  // markup stays in one place. The trailing indicator is the only
  // difference (arrow vs. "Скоро" badge).
  const body = (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 ring-1 ring-transparent transition-[box-shadow,ring-color] duration-300 group-hover:ring-[color:var(--neighbour-accent)]"
      />
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-display text-[20px] font-medium text-[var(--color-secondary)] md:text-[22px]">
          {tItems("title")}
        </span>
        {product.comingSoon ? (
          <span
            aria-hidden="true"
            className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/65"
          >
            {tShowcase("coming_soon")}
          </span>
        ) : (
          <span
            aria-hidden="true"
            className="font-mono transition-transform duration-300 ease-out-expo group-hover:translate-x-1 group-hover:text-[color:var(--neighbour-accent)]"
          >
            →
          </span>
        )}
      </div>
      <p className="text-[13px] leading-relaxed text-[var(--color-secondary)]/55">
        {tItems("tagline")}
      </p>
    </>
  );

  return (
    <motion.li
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        delay: Math.min(index, 3) * 0.06,
      }}
    >
      {product.comingSoon ? (
        <div
          aria-disabled="true"
          style={{ ["--neighbour-accent" as string]: neighbourAccent }}
          className={cn(
            "group relative flex cursor-not-allowed flex-col gap-2 bg-[var(--color-primary)] p-5 opacity-55 md:p-6"
          )}
        >
          {body}
        </div>
      ) : (
        <Link
          href={product.href}
          data-cursor="hover"
          style={{ ["--neighbour-accent" as string]: neighbourAccent }}
          className={cn(
            "group relative flex flex-col gap-2 bg-[var(--color-primary)] p-5 transition-colors duration-300 hover:bg-[var(--color-hover-tint)] md:p-6"
          )}
        >
          {body}
        </Link>
      )}
    </motion.li>
  );
}
