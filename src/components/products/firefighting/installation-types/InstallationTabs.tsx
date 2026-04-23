"use client";

import type { InstallationType } from "@/content/products/types";

/**
 * Tab rail for section 4 «Типы установок».
 *
 * Vertical list (same visual DNA as `LakhtaSteps`): mono prefix + short
 * title per row, accent bar on the active one. Clicking a row flips the
 * active type; keyboard navigation (← ↑ / → ↓) moves between tabs via
 * the `onKeyDown` handler below.
 *
 * The detail block — tagline / body / object list for the active type —
 * lives in the section wrapper, not here. Keeping the rail dumb (pure
 * list) means it can also be dropped into a smaller layout without
 * carting the detail card along.
 */
type Props = {
  types: readonly InstallationType[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export function InstallationTabs({ types, activeIndex, onSelect }: Props) {
  // Arrow-key navigation — focus is managed by the browser on the
  // buttons themselves; we just advance/rewind the active index.
  const handleKey = (e: React.KeyboardEvent<HTMLButtonElement>, idx: number) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      onSelect((idx + 1) % types.length);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      onSelect((idx - 1 + types.length) % types.length);
    }
  };

  return (
    <ol role="tablist" aria-label="Типы установок пожаротушения" className="space-y-0">
      {types.map((type, idx) => {
        const isActive = idx === activeIndex;
        return (
          <li key={type.kind}>
            <button
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`installation-panel-${type.kind}`}
              id={`installation-tab-${type.kind}`}
              tabIndex={isActive ? 0 : -1}
              data-active={isActive ? "true" : "false"}
              data-cursor="hover"
              onClick={() => onSelect(idx)}
              onKeyDown={(e) => handleKey(e, idx)}
              className="group relative block w-full border-l border-[var(--color-hairline)] py-3 pl-5 text-left transition-colors data-[active=true]:border-[var(--accent-fire)]"
            >
              {/* Accent bar — occupies the left border slot when active */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 bg-[var(--accent-fire)] transition-transform duration-300 ease-out group-data-[active=true]:scale-y-100"
              />

              <div className="flex items-baseline gap-3">
                <span
                  className={[
                    "font-mono text-[10px] uppercase tracking-[0.12em] transition-colors",
                    isActive
                      ? "text-[var(--accent-fire)]"
                      : "text-[var(--color-secondary)]/30",
                  ].join(" ")}
                >
                  {type.mono}
                </span>
                <span
                  className={[
                    "text-base font-medium transition-colors",
                    isActive
                      ? "text-[var(--color-secondary)]"
                      : "text-[var(--color-secondary)]/40 group-hover:text-[var(--color-secondary)]/70",
                  ].join(" ")}
                >
                  {type.title}
                </span>
              </div>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
