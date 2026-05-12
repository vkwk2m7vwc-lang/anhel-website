"use client";

import Link from "next/link";
import { useMagnetic } from "@/hooks/useMagnetic";
import { useIsTouch } from "@/hooks/useIsTouch";
import { CATALOG_PATH } from "@/lib/routes";

/**
 * Two hero CTAs:
 *  1. «Каталог продукции» — primary pill, white background, arrow glyph
 *     slides on hover. Magnetic cursor pull (desktop only). Links to
 *     CATALOG_PATH (/products).
 *  2. «Связаться» — ghost pill, links to /contacts. Magnetic pull
 *     enabled on desktop, mirror of primary stylistically (ghost variant).
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
  const secondaryRef = useMagnetic<HTMLAnchorElement>({ strength: 0.3 });

  return (
    <div className="mt-10 flex flex-wrap items-center gap-4 md:mt-12 md:gap-5">
      <Link
        ref={isTouch ? undefined : primaryRef}
        href={CATALOG_PATH}
        data-cursor="hover"
        data-cta="catalog"
        className="group inline-flex items-center gap-3 rounded-md bg-[var(--color-secondary)] px-[22px] py-[14px] text-sm font-medium text-[var(--color-primary)]"
      >
        Каталог продукции
        <span
          aria-hidden="true"
          className="inline-block font-mono transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
        >
          →
        </span>
      </Link>

      <Link
        ref={isTouch ? undefined : secondaryRef}
        href="/contacts"
        data-cursor="hover"
        data-cta="contacts"
        className="group inline-flex items-center gap-3 rounded-md border-[0.5px] border-[var(--color-secondary)]/40 bg-transparent px-[22px] py-[14px] text-sm font-medium text-[var(--color-secondary)] transition-colors hover:border-[var(--color-secondary)]"
      >
        Связаться
        <span
          aria-hidden="true"
          className="inline-block font-mono transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
        >
          →
        </span>
      </Link>
    </div>
  );
}
