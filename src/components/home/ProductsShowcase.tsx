"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { HERO_PRODUCTS } from "@/lib/hero-products";
import { PRODUCTS } from "@/lib/products";
import type { ProductAccent } from "@/content/products/types";

/**
 * Section "Линейка продуктов" — одна из ключевых точек навигации
 * с главной на продуктовые страницы.
 *
 * Layout:
 *   - Header: mono-tag «02 · ЛИНЕЙКА ПРОДУКТОВ» + h2 + lede
 *   - 4 cards в 2×2 grid (desktop) / 1×4 (mobile)
 *   - Каждая карточка: product render + title + tagline + accent ring
 *     на hover
 *
 * Источники данных:
 *   - HERO_PRODUCTS — image, accent hex, alt
 *   - PRODUCTS      — title, tagline, href, accent key
 *
 * Совмещаем по slug-маппингу (hero-products использует
 * pump-water/pump-fire/water-treatment/heating-unit, а PRODUCTS —
 * water-supply/firefighting/water-treatment/heating-unit; первые
 * два различаются префиксом).
 *
 * Reuse: тот же компонент рендерится и на главной (как секция
 * между hero и footer), и на отдельной странице `/products` (как
 * единственная содержательная секция). Чтобы избежать дублирования
 * визуального ритма с home hero, заголовок и mono-tag — настраиваемые
 * через props.
 */

type ShowcaseTone = "section" | "page";

type Props = {
  /**
   * "section" — рендерится как одна секция на главной (с верхним
   * border-top, padding 20/28).
   * "page"    — как первая секция на странице каталога (без
   * border-top, padding 14/20 — сразу под Header).
   */
  tone?: ShowcaseTone;
  monoTag?: string;
  title?: string;
  lede?: string;
};

// Маппинг hero-products slug → PRODUCTS slug. Hero использует
// «pump-water» как водоснабжение и «pump-fire» как пожаротушение;
// PRODUCTS использует «water-supply» / «firefighting».
const HERO_TO_PRODUCT: Record<string, string> = {
  "pump-water": "water-supply",
  "pump-fire": "firefighting",
  "water-treatment": "water-treatment",
  "heating-unit": "heating-unit",
};

const ACCENT_VAR: Record<ProductAccent, string> = {
  fire: "var(--accent-fire)",
  water: "var(--accent-water)",
  treatment: "var(--accent-treatment)",
  heat: "var(--accent-heat)",
};

export function ProductsShowcase({
  tone = "section",
  monoTag = "02 · ЛИНЕЙКА ПРОДУКТОВ",
  title = "Четыре направления, одна сборка",
  lede = "Насосные станции, тепловые пункты и установки водоподготовки. Заводская сборка, серийное производство, индивидуальная конфигурация под ТЗ.",
}: Props) {
  // Объединяем два источника в один массив с полным набором полей.
  // Order совпадает с HERO_PRODUCTS — это «маркетинговый порядок»
  // линейки (водоснабжение → пожаротушение → водоподготовка →
  // тепловые пункты).
  const cards = HERO_PRODUCTS.map((hero) => {
    const productSlug = HERO_TO_PRODUCT[hero.slug];
    const product = PRODUCTS.find((p) => p.slug === productSlug);
    return { hero, product };
  });

  const sectionPadding =
    tone === "page" ? "px-6 py-14 md:px-12 md:py-20" : "px-6 py-20 md:px-12 md:py-28";
  const borderTop =
    tone === "page" ? "" : "border-t border-[var(--color-hairline)]";

  return (
    <section
      id="products"
      aria-labelledby="products-showcase-title"
      className={`relative ${borderTop} bg-[var(--color-primary)]`}
    >
      <div className={`mx-auto w-full max-w-[1440px] ${sectionPadding}`}>
        {/* Section header — mono-tag над h2, аналогично продуктовым
            страницам. Lede — справа на md+, под h2 на mobile. */}
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mono-tag">{monoTag}</p>
            <h2
              id="products-showcase-title"
              className="mt-4 max-w-[640px] font-display text-h2 font-medium text-[var(--color-secondary)]"
            >
              {title}
            </h2>
          </div>
          {lede ? (
            <p className="max-w-[420px] text-sm text-[var(--color-secondary)]/65 md:text-right">
              {lede}
            </p>
          ) : null}
        </div>

        {/* 1×4 → 2×2 — четыре direction'a в плотной сетке.
            На lg+ остаётся 2×2 (а не 4×1) сознательно: 4 карточки в
            ряд в типичном desktop viewport дают слишком тонкие
            тайлы; 2×2 даёт каждой карточке достаточно места для
            продуктового рендера. */}
        <ul className="mt-12 grid grid-cols-1 gap-px bg-[var(--color-hairline)] md:mt-16 md:grid-cols-2">
          {cards.map(({ hero, product }, i) => {
            if (!product) return null;
            const accentVar = ACCENT_VAR[product.accent];
            const isComingSoon = Boolean(product.comingSoon);

            return (
              <ProductCard
                key={hero.slug}
                index={i}
                href={isComingSoon ? undefined : product.href}
                title={product.title}
                tagline={product.tagline}
                imageSrc={hero.image}
                imageAlt={hero.alt}
                accentVar={accentVar}
                accentHex={hero.accent}
                comingSoon={isComingSoon}
              />
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function ProductCard({
  index,
  href,
  title,
  tagline,
  imageSrc,
  imageAlt,
  accentVar,
  accentHex,
  comingSoon,
}: {
  index: number;
  href?: string;
  title: string;
  tagline: string;
  imageSrc: string;
  imageAlt: string;
  accentVar: string;
  accentHex: string;
  comingSoon: boolean;
}) {
  const staggerDelay = Math.min(index, 3) * 0.08;

  // Inner body — повторяется в обеих ветках (Link / disabled <div>),
  // поэтому держим как фрагмент.
  const body = (
    <>
      {/* Accent ring — появляется на hover, скрыт на touch
          (`@media (hover: hover)`) — иначе на iPhone последний
          тапнутый элемент остаётся подсвеченным. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 ring-1 ring-transparent transition-[box-shadow,ring-color] duration-300 [@media(hover:hover)]:group-hover:ring-[color:var(--card-accent)]"
      />

      {/* Soft accent radial behind the product render — приглушённый
          фон-свечение, читается как «продукт стоит на пьедестале». */}
      <div
        aria-hidden="true"
        className="absolute inset-0 transition-opacity duration-500 [@media(hover:hover)]:group-hover:opacity-100 md:opacity-60"
        style={{
          background: `radial-gradient(circle at 50% 65%, ${hexToRgba(accentHex, 0.18)} 0%, rgba(10,10,10,0) 55%)`,
        }}
      />

      {/* Product image — relative ratio, центрировано. */}
      <div className="relative z-10 flex h-[180px] items-center justify-center md:h-[220px] lg:h-[260px]">
        <div className="relative h-full w-[60%]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 280px, (min-width: 768px) 220px, 60vw"
            className="object-contain"
          />
        </div>
      </div>

      {/* Copy block — title + tagline + CTA arrow */}
      <div className="relative z-10 mt-6 flex flex-col gap-2 md:mt-8">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-[24px] font-medium leading-tight text-[var(--color-secondary)] md:text-[28px]">
            {title}
          </h3>
          {comingSoon ? (
            <span
              aria-hidden="true"
              className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/65"
            >
              Скоро
            </span>
          ) : (
            <span
              aria-hidden="true"
              className="font-mono text-[var(--color-secondary)]/55 transition-all duration-300 ease-out-expo [@media(hover:hover)]:group-hover:translate-x-1 [@media(hover:hover)]:group-hover:text-[color:var(--card-accent)]"
            >
              →
            </span>
          )}
        </div>
        <p className="text-[14px] leading-relaxed text-[var(--color-secondary)]/65">
          {tagline}
        </p>
      </div>
    </>
  );

  const containerClass =
    "group relative flex min-h-[360px] flex-col bg-[var(--color-primary)] p-6 transition-colors duration-300 [@media(hover:hover)]:hover:bg-[#111] md:min-h-[440px] md:p-10";

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
      style={{ ["--card-accent" as string]: accentVar }}
    >
      {href ? (
        <Link
          href={href}
          data-cursor="hover"
          className={containerClass}
          aria-label={`${title} — открыть страницу продукта`}
        >
          {body}
        </Link>
      ) : (
        <div
          aria-disabled="true"
          className={`${containerClass} cursor-not-allowed opacity-65`}
        >
          {body}
        </div>
      )}
    </motion.li>
  );
}

function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
