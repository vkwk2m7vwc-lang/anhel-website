"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTilt } from "@/hooks/useTilt";
import { useMagnetic } from "@/hooks/useMagnetic";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { Breadcrumbs } from "./Breadcrumbs";
import type {
  ProductAccent,
  ProductCTA,
  ProductHeroContent,
} from "@/content/products/types";

/**
 * Per-accent hex values — used for glow + drop-shadow math. We can't
 * `rgba(var(--accent-fire))` in CSS because var() wraps a full colour,
 * not an R,G,B triple. Re-declaring the hexes here keeps the runtime
 * maths simple and stays in sync with `globals.css` (reviewed on every
 * palette change).
 */
const ACCENT_HEX: Record<ProductAccent, string> = {
  fire: "#D72638",
  water: "#1E6FD9",
  treatment: "#8A94A0",
  heat: "#E8873B",
};

const ACCENT_VAR: Record<ProductAccent, string> = {
  fire: "var(--accent-fire)",
  water: "var(--accent-water)",
  treatment: "var(--accent-treatment)",
  heat: "var(--accent-heat)",
};

/**
 * Product-page hero.
 *
 * Layout (CSS-grid, 12 columns):
 *   ┌─────────────────────┬─────────────────┐
 *   │ breadcrumbs (full)                    │
 *   ├─────────────────────┬─────────────────┤
 *   │ col-span-6: text    │ col-span-6: img │
 *   │  - mono-tag          │  - aspect ratio │
 *   │  - H1 (5xl/7xl)      │    auto на md+ │
 *   │  - subtitle          │    с min-h 520 │
 *   │  - CTAs              │  - object-contain
 *   └─────────────────────┴─────────────────┘
 *   - На мобиле (<md) одна колонка: текст сверху, картинка под
 *     CTA-кнопками (aspect-[4/3], object-contain).
 *
 * Прежний вариант использовал absolute positioning картинки в правой
 * 45% колонке + content grid с pt-28. Это давало непредсказуемые
 * пересечения на нестандартных viewport-ширинах. Новая grid-схема
 * жёстко делит hero пополам — пропорции стабильны на любых брейкпоинтах.
 *
 * Tilt и magnetic-cursor сохранены: tilt применяется к product-блоку
 * на md+, magnetic — к CTA-кнопкам. Оба disable на touch.
 */
export function ProductHero({
  content,
  accent,
}: {
  content: ProductHeroContent;
  accent: ProductAccent;
}) {
  const prefersReduced = usePrefersReducedMotion();
  const tilt = useTilt<HTMLDivElement>({ maxDeg: 4 });

  const hex = ACCENT_HEX[accent];
  const accentVar = ACCENT_VAR[accent];

  const glow = `radial-gradient(circle at 72% 50%, ${hexToRgba(
    hex,
    0.18
  )} 0%, rgba(10,10,10,0) 55%)`;
  const dropShadow = `drop-shadow(0 30px 40px ${hexToRgba(hex, 0.45)})`;

  return (
    <section
      id="product-hero"
      className="relative overflow-hidden bg-[var(--color-primary)]"
      style={{
        ["--accent-current" as string]: accentVar,
      }}
    >
      {/* Radial accent glow — статичный */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0"
        style={{ background: glow }}
      />
      {/* 40×40 hairline grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-grid-hairline bg-grid opacity-60"
      />

      <div className="relative z-20 mx-auto w-full max-w-[1440px] px-6 pb-10 pt-24 md:px-12 md:pb-14 md:pt-28">
        <Breadcrumbs items={content.breadcrumbs} />

        {/* Two-column grid — col-span-6 / col-span-6 на md+, single
            column на mobile (картинка под текстом). */}
        <div className="mt-8 grid grid-cols-1 gap-8 md:mt-10 md:grid-cols-12 md:gap-10 lg:gap-14">
          {/* TEXT column */}
          <div className="md:col-span-6">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.1,
              }}
              className="mono-tag"
            >
              {content.sectionTag}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.2,
              }}
              className="mt-6 font-display text-5xl font-medium leading-[1.05] text-[var(--color-secondary)] md:mt-8 lg:text-7xl"
            >
              {content.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.4,
              }}
              className="mt-6 max-w-[540px] text-body text-[var(--color-secondary)]/75 md:mt-8"
            >
              {content.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.55,
              }}
              className="mt-10 flex flex-wrap items-center gap-4 md:mt-12 md:gap-5"
            >
              <ProductCtaButton cta={content.primaryCta} />
              {content.secondaryCta && (
                <ProductCtaButton cta={content.secondaryCta} />
              )}
            </motion.div>
          </div>

          {/* IMAGE column — на mobile под CTA, на md+ справа.
              Явные высоты (а не min-h + aspect-auto) — гарантируют, что
              <Image fill> получит реальную high от родителя. На md+
              фиксируем 520px как просил макет; на mobile — aspect-[4/3].
              Tilt-эффект восстановим позже отдельной правкой — сейчас
              приоритет на стабильное появление картинки. */}
          <div className="md:col-span-6">
            <motion.div
              animate={prefersReduced ? undefined : { y: [0, -8, 0] }}
              transition={
                prefersReduced
                  ? undefined
                  : {
                      y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                    }
              }
              ref={tilt.ref}
              onMouseMove={tilt.onMouseMove}
              onMouseLeave={tilt.onMouseLeave}
              style={{
                filter: dropShadow,
                rotateX: prefersReduced ? 0 : tilt.rotateX,
                rotateY: prefersReduced ? 0 : tilt.rotateY,
                transformStyle: "preserve-3d",
              }}
              className="relative aspect-[4/3] w-full md:aspect-auto md:h-[520px]"
            >
              <Image
                src={content.image.src}
                alt={content.image.alt}
                fill
                priority
                sizes="(min-width: 1024px) 600px, (min-width: 768px) 50vw, 100vw"
                className="object-contain"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * CTA pill — primary (filled white) или ghost (hairline outline).
 * Оба тянутся за курсором на 120px на desktop (см. useMagnetic);
 * на touch magnetic-эффект отключён внутри хука.
 */
function ProductCtaButton({ cta }: { cta: ProductCTA }) {
  const ref = useMagnetic<HTMLAnchorElement>({
    strength: cta.variant === "primary" ? 0.35 : 0.3,
  });

  if (cta.variant === "primary") {
    return (
      <Link
        ref={ref}
        href={cta.href}
        data-cursor="hover"
        className="group inline-flex items-center gap-3 rounded-md bg-[var(--color-secondary)] px-[22px] py-[14px] text-sm font-medium text-[var(--color-primary)]"
      >
        {cta.label}
        <span
          aria-hidden="true"
          className="inline-block font-mono transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
        >
          →
        </span>
      </Link>
    );
  }

  // Прямые ссылки на PDF-файлы рендерим как <a download>, чтобы браузер
  // сразу скачивал документ, а не уводил пользователя на отдельную
  // страницу со списком файлов. Все остальные ссылки (anchor #documents,
  // внешние URL) идут через Next/Link.
  const isPdfDownload = /\.pdf(?:[?#]|$)/i.test(cta.href);

  if (isPdfDownload) {
    return (
      <a
        ref={ref}
        href={cta.href}
        download
        data-cursor="hover"
        className="inline-flex items-center gap-3 rounded-md border-[0.5px] border-[var(--color-secondary)]/40 bg-transparent px-[22px] py-[14px] text-sm font-medium text-[var(--color-secondary)]/80 transition-colors hover:border-[var(--color-secondary)] hover:text-[var(--color-secondary)]"
      >
        {cta.label}
        <span
          aria-hidden="true"
          className="inline-block font-mono text-[var(--color-secondary)]/65"
        >
          ↓
        </span>
      </a>
    );
  }

  return (
    <Link
      ref={ref}
      href={cta.href}
      data-cursor="hover"
      className="inline-flex items-center gap-3 rounded-md border-[0.5px] border-[var(--color-secondary)]/40 bg-transparent px-[22px] py-[14px] text-sm font-medium text-[var(--color-secondary)]/80 transition-colors hover:border-[var(--color-secondary)] hover:text-[var(--color-secondary)]"
    >
      {cta.label}
      {cta.hint && (
        <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-secondary)]/65">
          {cta.hint}
        </span>
      )}
    </Link>
  );
}

/**
 * Expand `#RRGGBB` to `rgba(r, g, b, alpha)`. Mirror of the helper in
 * `HeroBgCarousel` — kept local so each component stays self-contained
 * and there's no third place to edit if the format ever changes.
 */
function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
