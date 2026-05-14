"use client";

import { useCountUp } from "@/hooks/useCountUp";
import { useTranslations } from "next-intl";

/**
 * Four hero proof-point counters — single visual rhythm across all four:
 *   - 150+ ОБЪЕКТОВ
 *   - 12+  ЛЕТ ОПЫТА
 *   - 4+   НАПРАВЛЕНИЯ      ← was "04", now plain "4+" to match siblings
 *   - 24+  МЕС ГАРАНТИЯ     ← new fourth metric (unit "мес")
 *
 * The accent "+" colour (`var(--accent-fire)`) is the single accent in
 * the hero — semantics:
 *   - 4+    → currently four directions, more on the roadmap
 *   - 24+   → standard 24-month warranty, extended by contract
 *
 * Each number counts up from 0 once its column scrolls into view.
 *
 * Layout: hidden on mobile (<md), single flex-wrap row on md+. The
 * unit ("мес") sits between the number and the "+" so it visually
 * groups with the number rather than the label, matching the same
 * pattern used in AboutSection's <Stat unit=…>.
 *
 * Why hidden on mobile: the same 4 metrics live in <AboutSection>
 * one screen below the hero. Showing them twice on a tall mobile
 * scroll was visual noise; the hero on phones now focuses on the
 * title → product → subtitle → CTAs reading path.
 */
export function HeroCounters() {
  const t = useTranslations("home.hero");
  const objects = useCountUp<HTMLDivElement>({ to: 150 });
  const years = useCountUp<HTMLDivElement>({ to: 12 });
  const lines = useCountUp<HTMLDivElement>({ to: 4 });
  const warranty = useCountUp<HTMLDivElement>({ to: 24 });

  return (
    // No `md:mt-20` here any more — the parent HeroShell bottom-area wraps
    // the counters with its own hairline + pt-10 + the tagline row above,
    // so the previous 80 px top margin would double the breathing room.
    // Spacing is now driven purely by the parent layout.
    <div className="hidden md:flex md:flex-wrap md:gap-x-14 md:gap-y-0">
      <Counter
        innerRef={objects.ref}
        value={objects.value}
        label={t("counters.objects")}
      />
      <Counter
        innerRef={years.ref}
        value={years.value}
        label={t("counters.years")}
      />
      <Counter
        innerRef={lines.ref}
        value={lines.value}
        label={t("counters.directions")}
      />
      <Counter
        innerRef={warranty.ref}
        value={warranty.value}
        unit={t("counters.warranty_unit")}
        label={t("counters.warranty")}
      />
    </div>
  );
}

/**
 * Single hero counter — number, accent "+" suffix, optional inline unit
 * ("мес" / "months" / "ay") and caption. Stable composition so every
 * column reads as one visual unit.
 */
function Counter({
  innerRef,
  value,
  unit,
  label,
}: {
  innerRef: React.RefObject<HTMLDivElement>;
  value: string;
  unit?: string;
  label: string;
}) {
  return (
    <div ref={innerRef} className="flex flex-col">
      <p className="flex items-baseline gap-1 font-mono text-[32px] font-medium leading-none text-[var(--color-secondary)]">
        <span>{value}</span>
        <span aria-hidden="true" className="text-[var(--accent-fire)]">
          +
        </span>
        {unit ? (
          <span className="ml-1 font-mono text-sm font-normal text-[var(--color-secondary)]/70">
            {unit}
          </span>
        ) : null}
      </p>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-secondary)]/50">
        {label}
      </p>
    </div>
  );
}
