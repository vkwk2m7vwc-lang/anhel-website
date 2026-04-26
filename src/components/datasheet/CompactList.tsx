"use client";

/**
 * CompactList — replaces the 3x2 tile grids (Applications, Advantages)
 * with a flat dense list. Each item: mono index, title, optional
 * one-line example. Hairline divider between rows.
 *
 * Why: tile grids consume 3-4× the vertical space of a dense list
 * for the same information. An engineer scrolling for «do my objects
 * fit?» wants a list, not a card mosaic.
 */
export type CompactListItem = {
  mono: string;
  title: string;
  /** Optional second line: example, body copy, or sub-spec. */
  body?: string;
};

export function CompactList({
  items,
  twoColumns = true,
}: {
  items: CompactListItem[];
  /** When true, items render in a 2-column grid on md+. Default true. */
  twoColumns?: boolean;
}) {
  return (
    <ul
      className={
        twoColumns
          ? "grid grid-cols-1 md:grid-cols-2 md:gap-x-12"
          : "flex flex-col"
      }
    >
      {items.map((item) => (
        <li
          key={item.mono + item.title}
          className="grid grid-cols-[40px_1fr] gap-3 border-b border-[var(--color-hairline)] py-3"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-secondary)]/55">
            {item.mono}
          </span>
          <div>
            <div className="text-[14px] font-medium text-[var(--color-secondary)]">
              {item.title}
            </div>
            {item.body ? (
              <div className="mt-1 text-[13px] leading-snug text-[var(--color-secondary)]/65">
                {item.body}
              </div>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
