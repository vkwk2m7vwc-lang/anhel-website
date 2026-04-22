"use client";

import { useCountUp } from "@/hooks/useCountUp";

/**
 * Three hero proof-point counters:
 *  - 150+ ОБЪЕКТОВ   ← the "+" is the single accent colour in hero
 *  - 12  ЛЕТ ОПЫТА
 *  - 04  НАПРАВЛЕНИЯ ← leading zero preserved
 *
 * Each number counts up from 0 once its column scrolls into view.
 */
export function HeroCounters() {
  const objects = useCountUp<HTMLDivElement>({ to: 150 });
  const years = useCountUp<HTMLDivElement>({ to: 12 });
  const lines = useCountUp<HTMLDivElement>({ to: 4, pad: 2 });

  return (
    <div className="mt-16 flex flex-wrap gap-10 md:mt-20 md:gap-16">
      <div ref={objects.ref} className="flex flex-col">
        <p className="font-mono text-[32px] font-medium leading-none text-[var(--color-secondary)]">
          {objects.value}
          <span
            aria-hidden="true"
            className="text-[var(--accent-fire)]"
          >
            +
          </span>
        </p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-secondary)]/50">
          Объектов
        </p>
      </div>

      <div ref={years.ref} className="flex flex-col">
        <p className="font-mono text-[32px] font-medium leading-none text-[var(--color-secondary)]">
          {years.value}
        </p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-secondary)]/50">
          Лет опыта
        </p>
      </div>

      <div ref={lines.ref} className="flex flex-col">
        <p className="font-mono text-[32px] font-medium leading-none text-[var(--color-secondary)]">
          {lines.value}
        </p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-secondary)]/50">
          Направления
        </p>
      </div>
    </div>
  );
}
