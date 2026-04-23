"use client";

import type { FireSystem, FireSystemId } from "@/content/products/firefighting-systems";

/**
 * Horizontal system switcher sitting above the 40/60 grid in section 3.
 *
 * Semantically a tablist; each tab names one fire-suppression system
 * the station can drive. Picking a tab rewires the scene interior and
 * swaps per-system step copy (02/05/06) — the parent owns that logic.
 *
 * Visual: mono-number prefix ("01" … "04") + title ("Спринклерная"),
 * 2px accent underline on the active tab that scales in from the left.
 * Matches the left-rail step visual vocabulary (mono + accent bar) so
 * the page reads as one system of parts rather than two conventions.
 *
 * Keyboard: ← / → moves focus+selection between tabs. Not a roving
 * tabindex in the strict WAI-ARIA sense, but good enough for a
 * 4-element horizontal list and keeps the implementation small.
 *
 * Mobile behaviour is inherited from the parent container (overflow
 * scroll with snap points — see HowItWorksSection's comment).
 */
type Props = {
  systems: readonly FireSystem[];
  activeId: FireSystemId;
  onSelect: (id: FireSystemId) => void;
};

export function SystemTabs({ systems, activeId, onSelect }: Props) {
  const activeIdx = Math.max(
    0,
    systems.findIndex((s) => s.id === activeId),
  );

  const handleKey = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    idx: number,
  ) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const next = systems[(idx + 1) % systems.length];
      onSelect(next.id);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const prev = systems[(idx - 1 + systems.length) % systems.length];
      onSelect(prev.id);
    }
  };

  return (
    <div
      role="tablist"
      aria-label="Тип установки пожаротушения"
      className="flex snap-x snap-mandatory gap-2 overflow-x-auto pb-2 md:gap-4 md:overflow-visible md:pb-0"
    >
      {systems.map((system, idx) => {
        const isActive = system.id === activeId;
        return (
          <button
            key={system.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`system-panel-${system.id}`}
            id={`system-tab-${system.id}`}
            tabIndex={idx === activeIdx ? 0 : -1}
            data-active={isActive ? "true" : "false"}
            data-cursor="hover"
            onClick={() => onSelect(system.id)}
            onKeyDown={(e) => handleKey(e, idx)}
            className="group relative flex shrink-0 snap-start flex-col gap-1 border-t border-[var(--color-hairline)] px-4 py-3 text-left transition-colors data-[active=true]:border-[var(--accent-fire)] md:flex-1 md:px-5"
          >
            {/* Accent bar — occupies the top-border slot when active */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 h-[2px] w-full origin-left scale-x-0 bg-[var(--accent-fire)] transition-transform duration-300 ease-out group-data-[active=true]:scale-x-100"
            />

            <span
              className={[
                "font-mono text-[10px] uppercase tracking-[0.12em] transition-colors",
                isActive
                  ? "text-[var(--accent-fire)]"
                  : "text-[var(--color-secondary)]/35 group-hover:text-[var(--color-secondary)]/60",
              ].join(" ")}
            >
              {system.number}
            </span>
            <span
              className={[
                "text-base font-medium transition-colors md:text-lg",
                isActive
                  ? "text-[var(--color-secondary)]"
                  : "text-[var(--color-secondary)]/50 group-hover:text-[var(--color-secondary)]/80",
              ].join(" ")}
            >
              {system.title}
            </span>
          </button>
        );
      })}
    </div>
  );
}
