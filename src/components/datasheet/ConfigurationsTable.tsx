"use client";

/**
 * ConfigurationsTable — sample model variants. The legacy site had
 * NO comparison view; an engineer who wants to see «what
 * configurations exist» had to read body copy. This is the missing
 * data view.
 *
 * For now: synthesized rows that mirror the realistic series (HVS-NU)
 * range — Q from 12 to 200 m³/h, H from 40 to 110 m, motor
 * 2.2..45 kW, 2 to 6 pumps. When the OEM partner publishes the real
 * variant table, we replace with real data — same component, same
 * column structure.
 *
 * Behaviour: sortable columns (later), but for the first cut just
 * a static table. The «Запрос» link in each row jumps to the bottom
 * full form with the variant pre-selected.
 */

export type ConfigurationRow = {
  /** «HVS-NU 25/80 (3+1)» — series + duty + redundancy */
  designation: string;
  /** Q, m³/h */
  flow: string;
  /** H, m */
  head: string;
  /** Power per pump, kW */
  motorKw: string;
  /** Total pumps */
  pumps: string;
  /** Control type */
  control: string;
};

export function ConfigurationsTable({
  rows,
}: {
  rows: ConfigurationRow[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-left text-[13px] text-[var(--color-secondary)]">
        <thead>
          <tr className="border-b border-[var(--color-secondary)]/30">
            <Th>Обозначение</Th>
            <Th align="right">Q, м³/ч</Th>
            <Th align="right">H, м</Th>
            <Th align="right">N, кВт</Th>
            <Th align="right">Насосов</Th>
            <Th>Регулирование</Th>
            <Th align="right">{""}</Th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.designation}
              className="border-b border-[var(--color-hairline)] transition-colors hover:bg-[var(--color-surface-1)]"
            >
              <td className="py-3 pr-4 align-top font-mono tabular-nums text-[var(--color-secondary)]">
                {row.designation}
              </td>
              <td className="py-3 pr-4 text-right align-top font-mono tabular-nums text-[var(--color-secondary)]/85">
                {row.flow}
              </td>
              <td className="py-3 pr-4 text-right align-top font-mono tabular-nums text-[var(--color-secondary)]/85">
                {row.head}
              </td>
              <td className="py-3 pr-4 text-right align-top font-mono tabular-nums text-[var(--color-secondary)]/85">
                {row.motorKw}
              </td>
              <td className="py-3 pr-4 text-right align-top font-mono tabular-nums text-[var(--color-secondary)]/85">
                {row.pumps}
              </td>
              <td className="py-3 pr-4 align-top text-[var(--color-secondary)]/75">
                {row.control}
              </td>
              <td className="py-3 text-right align-top">
                <a
                  href="#request"
                  data-cursor="hover"
                  className="font-mono text-[10px] uppercase tracking-[0.16em] transition-opacity hover:opacity-70"
                  style={{ color: "var(--accent-water)" }}
                >
                  ЗАПРОС →
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Th({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <th
      className={`pb-2 pr-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-secondary)]/55 ${align === "right" ? "text-right" : "text-left"}`}
    >
      {children}
    </th>
  );
}
