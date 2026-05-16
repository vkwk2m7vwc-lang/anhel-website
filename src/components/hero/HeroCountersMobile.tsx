"use client";

import { useTranslations } from "next-intl";

/**
 * Mobile-only counters band — four equal-share cells in one row, thin
 * 0.5px hairline border top and bottom. Number sits centred, accent "+"
 * inline; for the warranty cell a compact unit ("мес") sits between the
 * number+suffix and the label. Labels render as 7px uppercase.
 *
 * Why a dedicated mobile component instead of a responsive variant of
 * <HeroCounters>: the desktop block uses count-up animation triggered
 * by IntersectionObserver and a wider monospace number (32px). The
 * mobile band wants none of that — it's a static info strip, not a
 * showpiece — so keeping the two as separate components avoids forcing
 * mobile-specific media queries through every Counter cell.
 *
 * Used inside HeroShell's mobile-only flow (md:hidden wrapper). The
 * AboutSection still ships the same four metrics with count-up at all
 * breakpoints; this band is the in-hero recap, sized for the goal of
 * fitting the whole hero in one iPhone-13/14/15 screen.
 */
export function HeroCountersMobile() {
  const t = useTranslations("home.hero.counters");

  return (
    <div className="grid grid-cols-4 border-y-[0.5px] border-[var(--color-hairline)]">
      <Cell number="150" suffix="+" label={t("objects")} />
      <Cell number="12" suffix="+" label={t("years")} />
      <Cell number="4" suffix="+" label={t("directions")} />
      <Cell
        number="24"
        suffix="+"
        unit={t("warranty_unit")}
        label={t("warranty")}
      />
    </div>
  );
}

/**
 * Single cell of the band. text-center keeps numbers and labels stacked
 * on the cell midline; py-3 gives the band a ~52px total height that
 * reads as a discrete typographic ribbon between the descriptor line
 * above and the CTA stack below.
 */
function Cell({
  number,
  suffix,
  unit,
  label,
}: {
  number: string;
  suffix: string;
  unit?: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center py-3 text-center">
      <p className="flex items-baseline justify-center gap-0.5 font-mono text-[16px] font-medium leading-none tabular-nums text-[var(--color-secondary)]">
        <span>{number}</span>
        <span aria-hidden="true" className="text-[var(--accent-fire)]">
          {suffix}
        </span>
        {unit ? (
          <span className="ml-1 font-mono text-[9px] font-normal uppercase tracking-[0.05em] text-[var(--color-secondary)]/70">
            {unit}
          </span>
        ) : null}
      </p>
      <p className="mt-1.5 font-mono text-[7px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/50">
        {label}
      </p>
    </div>
  );
}
