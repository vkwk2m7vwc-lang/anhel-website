"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { type ScenarioBComponent } from "@/content/products/firefighting-scenario-b";

/**
 * Spec sheet for the currently selected component.
 *
 * Slides in from the right when a component is selected, slides back
 * out when cleared. Rendered as a fixed-width column so the diagram
 * keeps its width and the reader's eye doesn't have to track layout
 * changes — it just sees the sheet appear alongside.
 *
 * Empty state: a neutral "hover or click any node" hint. Keeps the
 * column from collapsing to zero width and gives the user a clue what
 * the panel is for before they interact.
 */

type Props = {
  component: ScenarioBComponent | null;
  onClose: () => void;
};

export function ComponentPanel({ component, onClose }: Props) {
  return (
    <aside
      aria-live="polite"
      className="sticky top-24 flex h-[calc(100svh-8rem)] w-full flex-col overflow-hidden rounded-sm border border-[var(--color-hairline)] bg-[var(--color-primary)]/80 backdrop-blur-sm"
    >
      <AnimatePresence mode="wait">
        {component ? (
          <motion.div
            key={component.id}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="flex h-full flex-col"
          >
            {/* Header — mono tag, title, close */}
            <div className="flex items-start justify-between gap-3 border-b border-[var(--color-hairline)] px-5 py-5">
              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--accent-current)]">
                  {component.mono}
                </p>
                <h3 className="mt-2 text-base font-medium text-[var(--color-secondary)]">
                  {component.name}
                </h3>
                <p className="mt-1 text-[12px] leading-relaxed text-[var(--color-secondary)]/60">
                  {component.subtitle}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                data-cursor="hover"
                aria-label="Закрыть"
                className="-mr-1 mt-0.5 rounded-sm p-1 text-[var(--color-secondary)]/50 transition-colors hover:text-[var(--color-secondary)]"
              >
                <X size={14} strokeWidth={1.5} />
              </button>
            </div>

            {/* Spec list — label/value rows. Dense but readable. */}
            <dl className="flex-1 overflow-y-auto px-5 py-5">
              {component.spec.map((row, i) => (
                <div
                  key={row.label}
                  className={
                    "grid grid-cols-[120px_1fr] gap-4 py-3 text-[13px] " +
                    (i !== 0 ? "border-t border-[var(--color-hairline)]" : "")
                  }
                >
                  <dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--color-secondary)]/45">
                    {row.label}
                  </dt>
                  <dd className="text-[var(--color-secondary)]/90">{row.value}</dd>
                </div>
              ))}
            </dl>

            {/* Footer CTA — neutral "запросить предложение" link back to
                the main product page. Kept lightweight here since this
                is still a sandbox scene. */}
            <div className="border-t border-[var(--color-hairline)] px-5 py-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/40">
                Полная спецификация — в коммерческом предложении
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
            className="flex h-full flex-col items-start justify-start px-5 py-6"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-secondary)]/40">
              Спецификация
            </p>
            <h3 className="mt-2 text-sm font-medium text-[var(--color-secondary)]/80">
              Наведите или нажмите на элемент схемы
            </h3>
            <p className="mt-3 max-w-[280px] text-[12px] leading-relaxed text-[var(--color-secondary)]/50">
              Десять узлов насосной станции от ввода до оросителя. Для каждого —
              давление, расход, материал, стандарт.
            </p>
            {/* Compact legend — uses the same kind/colour vocabulary as
                the diagram glyphs so the viewer can map icons to roles
                without trial-and-error. */}
            <div className="mt-8 w-full space-y-3">
              {[
                { label: "Насос", dot: "ring" },
                { label: "Задвижка", dot: "diamond" },
                { label: "Коллектор", dot: "bar" },
                { label: "Датчик", dot: "sensor" },
                { label: "Стояк", dot: "riser" },
                { label: "Ороситель", dot: "sprinkler" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <LegendDot kind={item.dot} />
                  <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--color-secondary)]/60">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}

/** Tiny glyph echo for the legend — mirrors the diagram language. */
function LegendDot({ kind }: { kind: string }) {
  const stroke = "var(--color-steel-light)";
  return (
    <svg width={22} height={22} viewBox="0 0 22 22" aria-hidden="true">
      {kind === "ring" && (
        <>
          <circle cx={11} cy={11} r={7} fill="none" stroke={stroke} strokeWidth={1} />
          <line x1={5} y1={11} x2={17} y2={11} stroke={stroke} strokeWidth={0.6} />
          <line x1={11} y1={5} x2={11} y2={17} stroke={stroke} strokeWidth={0.6} />
        </>
      )}
      {kind === "diamond" && (
        <>
          <polygon points="4,6 11,11 4,16" fill="none" stroke={stroke} strokeWidth={1} />
          <polygon points="18,6 11,11 18,16" fill="none" stroke={stroke} strokeWidth={1} />
        </>
      )}
      {kind === "bar" && <rect x={3} y={9} width={16} height={4} fill="none" stroke={stroke} strokeWidth={1} />}
      {kind === "sensor" && (
        <>
          <circle cx={11} cy={11} r={5} fill="none" stroke={stroke} strokeWidth={1} />
          <line x1={11} y1={11} x2={14} y2={8} stroke={stroke} strokeWidth={1} />
        </>
      )}
      {kind === "riser" && (
        <>
          <line x1={11} y1={3} x2={11} y2={19} stroke={stroke} strokeWidth={1.2} />
          <line x1={8} y1={7} x2={14} y2={7} stroke={stroke} strokeWidth={0.6} />
          <line x1={8} y1={13} x2={14} y2={13} stroke={stroke} strokeWidth={0.6} />
        </>
      )}
      {kind === "sprinkler" && (
        <>
          <line x1={11} y1={4} x2={11} y2={11} stroke={stroke} strokeWidth={1} />
          <line x1={6} y1={11} x2={16} y2={11} stroke={stroke} strokeWidth={1} />
          <polygon points="8,11 14,11 11,18" fill={stroke} />
        </>
      )}
    </svg>
  );
}
