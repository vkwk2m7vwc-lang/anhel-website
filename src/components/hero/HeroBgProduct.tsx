"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTilt } from "@/hooks/useTilt";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Hero background — variant B (real product as hero).
 *
 * Layout:
 *   ┌───────────────────────────────────────────────┐
 *   │                              ┌──────────────┐ │
 *   │  [ text + CTA ]              │   product    │ │
 *   │      (HeroShell)             │   render     │ │
 *   │                              └──────────────┘ │
 *   └───────────────────────────────────────────────┘
 *
 * The product render lives in a `pointer-events-auto` island so the tilt
 * handlers fire while the surrounding layer stays click-through (HeroShell
 * keeps its text selectable / CTAs clickable).
 *
 * Motion:
 *  - Tilt ±4° driven by `useTilt` (spring-smoothed).
 *  - Slow vertical float (8px / 6s, ease-inOut, infinite) — gives the
 *    render presence without pulling attention from the headline.
 *  - `drop-shadow(0 30px 40px rgba(0,0,0,0.6))` for weight on the page.
 *
 * Reduced motion: no tilt, no float — static render with the same shadow.
 */
export function HeroBgProduct() {
  const tilt = useTilt<HTMLDivElement>({ maxDeg: 4 });
  const prefersReduced = usePrefersReducedMotion();

  return (
    <>
      {/* Soft radial glow centred on the product column */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 72% 50%, rgba(192,200,208,0.10) 0%, rgba(10,10,10,0) 55%)",
        }}
      />
      {/* Subtle 40×40 grid like variant A for continuity between hero routes */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-hairline bg-grid opacity-60"
      />

      {/* Product island, right-40% on desktop, full-width (smaller) on mobile.
          `pointer-events-auto` lets tilt fire; `style.perspective` gives
          rotateX/Y actual depth instead of flat skew. */}
      <div
        className="pointer-events-auto absolute inset-y-0 right-0 hidden w-[45%] items-center justify-center md:flex"
        style={{ perspective: "1200px" }}
      >
        <motion.div
          ref={tilt.ref}
          onMouseMove={tilt.onMouseMove}
          onMouseLeave={tilt.onMouseLeave}
          style={{
            rotateX: prefersReduced ? 0 : tilt.rotateX,
            rotateY: prefersReduced ? 0 : tilt.rotateY,
            transformStyle: "preserve-3d",
            filter: "drop-shadow(0 30px 40px rgba(0,0,0,0.6))",
          }}
          animate={
            prefersReduced
              ? undefined
              : {
                  y: [0, -8, 0],
                }
          }
          transition={
            prefersReduced
              ? undefined
              : {
                  y: {
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }
          }
          className="relative h-[85%] w-[85%]"
        >
          <Image
            src="/assets/products/hvs-nu.png"
            alt=""
            aria-hidden="true"
            fill
            priority
            sizes="(min-width: 1440px) 600px, 45vw"
            className="object-contain"
          />
        </motion.div>
      </div>

      {/* Mobile fallback: render centred and smaller, no tilt. */}
      <div className="absolute inset-x-0 bottom-24 flex items-center justify-center md:hidden">
        <div className="relative h-[220px] w-[220px]">
          <Image
            src="/assets/products/hvs-nu.png"
            alt=""
            aria-hidden="true"
            fill
            sizes="220px"
            className="object-contain opacity-80"
            style={{
              filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.6))",
            }}
          />
        </div>
      </div>
    </>
  );
}
