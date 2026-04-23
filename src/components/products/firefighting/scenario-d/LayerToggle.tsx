"use client";

import { motion } from "framer-motion";
import {
  scenarioDLayers,
  type ScenarioDLayer,
} from "@/content/products/firefighting-scenario-d";

/**
 * Three-way layer visibility control.
 *
 * Sits above the x-ray drawing. Each chip reads as a mono tag with a
 * small indicator square. Active = filled with accent-current; inactive
 * = outlined only. Clicking toggles that layer's visibility in the
 * parent state.
 *
 * We don't block toggling all three off — a fully empty scan is a
 * legitimate "look at the annotations only" state.
 */

type Props = {
  visible: Record<ScenarioDLayer["id"], boolean>;
  onToggle: (id: ScenarioDLayer["id"]) => void;
};

export function LayerToggle({ visible, onToggle }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2 md:gap-3">
      {scenarioDLayers.map((layer) => {
        const on = visible[layer.id];
        return (
          <button
            key={layer.id}
            type="button"
            onClick={() => onToggle(layer.id)}
            data-cursor="hover"
            aria-pressed={on}
            className="group flex items-center gap-2 rounded-sm border border-[var(--color-hairline)] bg-[var(--color-primary)]/60 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/70 transition-colors hover:border-[var(--accent-current)] hover:text-[var(--color-secondary)]"
          >
            {/* Status indicator — filled when on */}
            <motion.span
              animate={{
                backgroundColor: on
                  ? "var(--accent-current)"
                  : "transparent",
              }}
              transition={{ duration: 0.2 }}
              className="h-2 w-2 rounded-sm border border-[var(--accent-current)]/70"
            />
            <span>{layer.label}</span>
            <span className="text-[var(--color-secondary)]/30">
              {on ? "ON" : "OFF"}
            </span>
          </button>
        );
      })}
    </div>
  );
}
