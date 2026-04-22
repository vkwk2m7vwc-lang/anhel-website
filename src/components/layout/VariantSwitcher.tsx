"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

/**
 * Stage-2 helper — floating pill in the bottom-right that lets us jump
 * between the hero variants without retyping URLs. The three live variants
 * (A, B, E) run in parallel until Stage 3 (site strategy) closes and we
 * pick a winner. This switcher disappears at that point.
 */
const VARIANTS = [
  { label: "A", href: "/hero-a", tooltip: "Видео" },
  { label: "B", href: "/hero-b", tooltip: "Продукт" },
  { label: "E", href: "/hero-e", tooltip: "Карусель · авто" },
] as const;

const VISIBLE_ROUTES = new Set(["/", "/hero-a", "/hero-b", "/hero-e"]);

export function VariantSwitcher() {
  const pathname = usePathname();
  if (!VISIBLE_ROUTES.has(pathname)) return null;

  // `/` → variant A by default.
  const activeHref = pathname === "/" ? "/hero-a" : pathname;

  return (
    <div
      className="fixed bottom-5 right-5 z-50 flex items-center gap-1 rounded-pill border border-[var(--color-hairline)] bg-[var(--color-primary)]/70 p-1 backdrop-blur-md"
      aria-label="Переключатель hero-вариантов"
    >
      <span className="px-2 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-secondary)]/50">
        Hero
      </span>
      {VARIANTS.map((v) => {
        const isActive = v.href === activeHref;
        return (
          <Link
            key={v.href}
            href={v.href}
            data-cursor="hover"
            title={v.tooltip}
            className={cn(
              "rounded-pill px-3 py-1 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors",
              isActive
                ? "bg-[var(--color-secondary)] text-[var(--color-primary)]"
                : "text-[var(--color-secondary)]/60 hover:text-[var(--color-secondary)]"
            )}
          >
            {v.label}
          </Link>
        );
      })}
    </div>
  );
}
