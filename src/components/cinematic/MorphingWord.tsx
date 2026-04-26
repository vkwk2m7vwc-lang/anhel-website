"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * MorphingWord — cycles through 4 single-word states, each its own
 * accent colour. The word IS the picture: 22vw display size, weight
 * 600, tight tracking. No card, no chrome.
 *
 * Each beat lasts ~2.4 seconds. AnimatePresence cross-fades the
 * outgoing/incoming word with a slight Y nudge so it reads as a
 * vertical reveal rather than a flat swap.
 *
 * The accent colour drives the body background of the parent via
 * the `onChange(accent)` callback — that's how the whole hero canvas
 * pulses in sync with the kinetic word.
 */
export type MorphingBeat = {
  word: string;
  accent: string;
};

const DEFAULT_BEATS: MorphingBeat[] = [
  { word: "ВОДА", accent: "#1E6FD9" },
  { word: "ОГОНЬ", accent: "#D72638" },
  { word: "ТЕПЛО", accent: "#E8873B" },
  { word: "ПУЛЬС", accent: "#F5F5F3" },
];

export function MorphingWord({
  beats = DEFAULT_BEATS,
  intervalMs = 2400,
  onChange,
}: {
  beats?: MorphingBeat[];
  intervalMs?: number;
  onChange?: (beat: MorphingBeat) => void;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % beats.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [beats.length, intervalMs]);

  // Bubble the active beat up so the parent can repaint accent radials
  // synchronously with the word.
  useEffect(() => {
    onChange?.(beats[index]);
  }, [index, beats, onChange]);

  const current = beats[index];

  return (
    <div className="pointer-events-none relative flex h-[42vh] w-full items-center justify-center">
      <AnimatePresence mode="wait" initial={false}>
        <motion.h1
          key={current.word}
          initial={{ y: "20%", opacity: 0, filter: "blur(20px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-20%", opacity: 0, filter: "blur(20px)" }}
          transition={{
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            color: current.accent,
            fontSize: "clamp(96px, 22vw, 320px)",
            fontWeight: 600,
            letterSpacing: "-0.04em",
            lineHeight: 0.85,
          }}
          className="font-display"
        >
          {current.word}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
}
