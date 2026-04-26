"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Manifesto — an editorial pause between the cinematic hero and the
 * product chapters. One large line, set in display weight, on a
 * full-bleed canvas. No CTA, no «learn more» — just a moment.
 *
 * Reveals on scroll-into-view via SplitText-equivalent: split into
 * words, stagger each with a 60 ms delay. We don't load GSAP for
 * this — Framer's `useInView` + `motion` is enough for a one-shot
 * reveal.
 *
 * The big number («30») is intentionally outsized — it acts as the
 * visual anchor of the section, like a magazine pull-quote.
 */
export function Manifesto({
  big,
  words,
  caption,
}: {
  big: string;
  words: string;
  caption?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  // Pre-split words for the reveal-on-scroll cascade.
  const tokens = words.split(" ");

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[80svh] items-center bg-[var(--color-primary)] py-32 md:py-48"
    >
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-12 gap-6 px-6 md:px-12">
        {/* Big number sits in the left margin, asymmetric */}
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={inView ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="col-span-12 md:col-span-3"
        >
          <span
            className="block font-display text-[var(--color-secondary)]"
            style={{
              fontSize: "clamp(140px, 18vw, 280px)",
              fontWeight: 500,
              letterSpacing: "-0.06em",
              lineHeight: 0.85,
            }}
          >
            {big}
          </span>
        </motion.div>

        {/* Editorial body — words reveal one-by-one as the section
            crosses the viewport */}
        <div className="col-span-12 md:col-span-9 md:pl-12">
          <h2
            className="font-display text-[var(--color-secondary)]"
            style={{
              fontSize: "clamp(28px, 4vw, 64px)",
              fontWeight: 400,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            {tokens.map((tok, i) => (
              <motion.span
                key={`${tok}-${i}`}
                initial={{ opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{
                  duration: 0.8,
                  delay: i * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mr-[0.25em] inline-block"
              >
                {tok}
              </motion.span>
            ))}
          </h2>

          {caption ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : undefined}
              transition={{ duration: 0.6, delay: tokens.length * 0.06 + 0.4 }}
              className="mt-12 max-w-[520px] font-mono text-[11px] uppercase leading-[1.7] tracking-[0.16em] text-[var(--color-secondary)]/55"
            >
              {caption}
            </motion.p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
