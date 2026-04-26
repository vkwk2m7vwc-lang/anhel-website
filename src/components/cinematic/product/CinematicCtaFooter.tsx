"use client";

import Link from "next/link";
import { motion } from "framer-motion";

/**
 * CinematicCtaFooter — replaces the legacy ProductCtaFooter
 * (form-style block + neighbour cards row) with a single
 * monumental call-to-action and a quiet «next chapter» row.
 *
 * The CTA is a viewport-spanning text block: «ЗАПРОС / КП →».
 * On hover, the arrow slides + an underline draws beneath. No
 * card, no rounded button, no subtitle — just the typographic
 * decision to act.
 *
 * Below: a single-line «next chapters» row pointing at the other
 * two product domains, no thumbnails. Just typographic links.
 */
export function CinematicCtaFooter({
  primaryHref,
  primaryLabel = "ЗАПРОС КП",
  neighbours,
  accent,
}: {
  primaryHref: string;
  primaryLabel?: string;
  /** 2 next-chapter links — appears as «следующая глава →» line */
  neighbours: Array<{ label: string; href: string }>;
  accent: string;
}) {
  return (
    <section className="dark-island relative isolate flex min-h-[100svh] flex-col justify-between overflow-hidden">
      {/* Giant accent radial centred bottom — the «warm» end of the
          page, like the closing bar of a film. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 80%, ${accent}55 0%, transparent 65%)`,
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-hairline bg-grid opacity-25"
      />

      {/* Top label */}
      <div className="relative z-10 px-6 pt-32 md:px-12 md:pt-44">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="font-mono text-[11px] uppercase tracking-[0.22em]"
          style={{ color: accent }}
        >
          11 · следующий шаг
        </motion.p>
      </div>

      {/* Centre — monumental CTA */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-6 md:px-12">
        <Link
          href={primaryHref}
          data-cursor="hover"
          className="group block text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[var(--color-secondary)]"
            style={{
              fontSize: "clamp(72px, 14vw, 280px)",
              fontWeight: 600,
              lineHeight: 0.85,
              letterSpacing: "-0.05em",
            }}
          >
            <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
              {primaryLabel}
            </span>
            <motion.span
              aria-hidden="true"
              className="ml-[0.18em] inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-6"
              style={{ color: accent }}
            >
              →
            </motion.span>
          </motion.h2>

          {/* Animated underline — draws on hover */}
          <motion.div
            aria-hidden="true"
            className="mx-auto mt-6 h-[2px] w-0 transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-[60%]"
            style={{ background: accent }}
          />
        </Link>
      </div>

      {/* Bottom — neighbours strip */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-6 pb-16 md:flex-row md:items-end md:justify-between md:px-12 md:pb-20">
        <p className="font-mono text-[11px] uppercase leading-[1.7] tracking-[0.18em] text-[var(--color-secondary)]/55">
          Заводская приёмка · Сертификат ТР ТС · Серия HVS-NU
        </p>

        <div className="flex flex-col gap-3 md:items-end">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-secondary)]/45">
            Следующие главы
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-2 md:justify-end">
            {neighbours.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                data-cursor="hover"
                className="group inline-flex items-center gap-2 font-display text-base text-[var(--color-secondary)]/80 transition-colors hover:text-[var(--color-secondary)] md:text-lg"
              >
                <span>{n.label}</span>
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
