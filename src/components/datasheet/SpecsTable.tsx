"use client";

/**
 * SpecsTable — dense full table of ALL specs. Replaces the 8-tile
 * grid with a real engineering table.
 *
 * Each row: label | value | unit. Hairline dividers between rows,
 * stripe-zebra OFF (the engineer reads tables; zebra adds visual
 * noise). Mono numerals ensure values column-align.
 */
export function SpecsTable({
  rows,
}: {
  rows: Array<{ label: string; value: string; unit?: string }>;
}) {
  return (
    <table className="w-full border-collapse text-left text-[14px] text-[var(--color-secondary)]">
      <tbody>
        {rows.map((row, i) => (
          <tr
            key={`${row.label}-${i}`}
            className="border-t border-[var(--color-hairline)]"
          >
            <td className="w-[55%] py-3 align-top text-[var(--color-secondary)]/75">
              {row.label}
            </td>
            <td className="py-3 pr-2 align-top font-mono tabular-nums text-[var(--color-secondary)]">
              {row.value}
            </td>
            <td className="py-3 align-top font-mono text-[12px] text-[var(--color-secondary)]/55">
              {row.unit ?? ""}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
