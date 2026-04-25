"use client";

import Link from "next/link";
import { useMagnetic } from "@/hooks/useMagnetic";
import { useIsTouch } from "@/hooks/useIsTouch";

/**
 * Two hero CTAs:
 *  1. «Смотреть каталог» — primary pill, white background, arrow glyph
 *     slides on hover. Magnetic cursor pull (desktop only).
 *  2. «Опросный лист» — ghost pill, currently disabled until Stage 7
 *     wires up the form. We render it visibly but mark it
 *     `aria-disabled` and block pointer/keyboard activation. A native
 *     tooltip explains the state ("Скоро").
 *
 * Touch handling: on coarse-pointer devices we deliberately do NOT
 * attach the magnetic ref — even though `useMagnetic` itself bails
 * out on touch, the ref attachment must also be gated to avoid a
 * one-render gap during hydration where the listener would briefly
 * be live. iOS Safari synthesises a `mousemove` during tap, which
 * (without this gate) would shift the button mid-tap and cause the
 * primary CTA to fail to navigate. See `useIsTouch` for the full
 * background on that race.
 *
 * Note: we intentionally leave `transition-transform` off the <Link>
 * itself. The arrow span keeps its own transition (group-hover slide),
 * but the parent doesn't need one — magnetic motion is GSAP-driven
 * and shouldn't be re-interpolated by the browser, which would amplify
 * any residual transform on tap.
 */
export function HeroCTAs() {
  const isTouch = useIsTouch();
  const primaryRef = useMagnetic<HTMLAnchorElement>({ strength: 0.35 });
  const secondaryRef = useMagnetic<HTMLButtonElement>({ strength: 0.3 });

  return (
    <div className="mt-10 flex flex-wrap items-center gap-4 md:mt-12 md:gap-5">
      <Link
        ref={isTouch ? undefined : primaryRef}
        href="/products"
        data-cursor="hover"
        className="group inline-flex items-center gap-3 rounded-md bg-[var(--color-secondary)] px-[22px] py-[14px] text-sm font-medium text-[var(--color-primary)]"
      >
        Смотреть каталог
        <span
          aria-hidden="true"
          className="inline-block font-mono transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
        >
          →
        </span>
      </Link>

      <button
        ref={isTouch ? undefined : secondaryRef}
        type="button"
        aria-disabled="true"
        title="Скоро"
        data-cursor="hover"
        // `onClick` swallowed — the form is wired up on Stage 7. Keyboard
        // users still see a tooltip via `title` and an aria hint.
        onClick={(e) => e.preventDefault()}
        className="inline-flex cursor-not-allowed items-center gap-3 rounded-md border-[0.5px] border-[var(--color-secondary)]/40 bg-transparent px-[22px] py-[14px] text-sm font-medium text-[var(--color-secondary)]/70 transition-colors hover:border-[var(--color-secondary)]/40 hover:bg-transparent"
      >
        Опросный лист
        <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-secondary)]/40">
          Скоро
        </span>
      </button>
    </div>
  );
}
