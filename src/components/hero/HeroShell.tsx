"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { HeroTitle } from "./HeroTitle";
import { HeroCTAs } from "./HeroCTAs";
import { HeroCounters } from "./HeroCounters";
import { HeroProductMobile } from "./HeroProductMobile";
import { HeroCountersMobile } from "./HeroCountersMobile";

/**
 * HeroShell — shared hero scaffold used by all three variants (A/B/C).
 *
 * Every variant renders exactly the same tech-caption, headline, CTAs,
 * counters, footer-caption and scroll hint. The background layer is the
 * only thing that changes — it's injected through `background` (absolute
 * positioned slot) or `foreground` (absolute, stacked above background
 * but below text) so each variant stays self-contained.
 *
 * Composition diagram:
 *   <section>
 *     └─ <div background>          z-0
 *     └─ <div foreground optional> z-10
 *     └─ <div content>             z-20 — text, CTAs, counters
 *   </section>
 */
export function HeroShell({
  background,
  foreground,
}: {
  background: ReactNode;
  foreground?: ReactNode;
}) {
  const t = useTranslations("home.hero");
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[var(--color-primary)]"
    >
      {/* z-0 — pure background (video / radial gradient / SVG schema) */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {background}
      </div>

      {/* z-10 — optional foreground that still sits behind the text,
          currently used by variants B and C to show the product render. */}
      {foreground ? (
        <div className="pointer-events-none absolute inset-0 z-10">
          {foreground}
        </div>
      ) : null}

      {/* z-20 — content grid.

          `pointer-events-none` on the outer wrapper, `pointer-events-auto`
          selectively on interactive children.

          Why: carousel variants (hero E) put clickable tab buttons in the
          right 45% at the bottom of the hero, rendered inside the z-0
          background layer. The content wrapper stacks above (z-20) and
          its bounding box covers the full width — even where it's
          visually empty — so without selective pointer-events it swallows
          every click in that right-45% area. Making the whole content
          wrapper click-through by default and re-enabling clicks only
          on the interactive top block (tag + title + CTAs) fixes it
          without moving anything around in the stacking order.

          The counters / variant-label row at the bottom is text-only
          and can stay click-through (no explicit auto on it). */}
      <div className="pointer-events-none relative z-20 mx-auto flex min-h-[100svh] w-full max-w-[1440px] flex-col justify-between px-6 pb-10 pt-28 md:px-12 md:pb-[clamp(24px,4vh,56px)] md:pt-[clamp(76px,11vh,128px)]">
        {/* Text column — full-width on mobile/tablet, capped at 60% on
            lg+ so the headline never crosses into the 40%-wide product
            zone on the right. The carousel itself is hidden under lg
            (see HeroBgCarousel), so on tablet the text gets the full
            container width and the product reappears in ProductsShowcase
            directly below the hero. */}
        <div className="pointer-events-auto flex flex-1 flex-col justify-center lg:max-w-[60%]">
          <HeroTitle />

          {/* Mobile-only inline product slot — five products with
              auto-advance and 01..05 numbered pagination. Variant 2 of
              the mobile A/B: product sits between the headline and the
              supporting copy, so the visual hook lands before the user
              reads the subtitle. Hidden md+: desktop keeps the 60/40
              split with the bg-layer carousel. */}
          <div className="mt-8 md:hidden">
            <HeroProductMobile />

            {/* Mobile descriptor — tiny centred line summarising what we
                make. Replaces the long subtitle on phones so the whole
                hero (title → product → descriptor → counters → CTAs)
                fits in a single iPhone-13/14/15 screen without scroll.
                The full subtitle still renders on md+. */}
            <p className="mt-6 text-center text-[12px] leading-snug text-[var(--color-secondary)]/60">
              {t("mobile_descriptor")}
            </p>

            {/* Mobile counters band — 4 equal cells in one row with
                hairline borders top/bottom. Mirrors the four AboutSection
                metrics so the in-hero strip reads as a quick proof-points
                summary on phones. AboutSection keeps the full 2×2 grid
                with count-up animation on every breakpoint. */}
            <div className="mt-6">
              <HeroCountersMobile />
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            className="hidden mt-8 max-w-[640px] text-sm leading-normal text-[var(--color-secondary)]/70 md:mt-[clamp(16px,3.5vh,40px)] md:block md:text-lg md:leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>

          <HeroCTAs />
        </div>

        {/* Bottom area: brand tagline + counters.
            Two duplicate lines were removed in 2026-05 — `variantLabel`
            (ANHEL® mark, redundant with the header logo) and `scroll_hint`
            («ПРОКРУТИТЬ ↓», superfluous on a full-bleed hero). The variant
            label prop was dropped from HeroShell's signature at the same
            time.

            The tagline used to sit on the SAME row as HeroCounters with
            `flex-row justify-between` — counters on the left, tagline at
            far-right. On lg+ the carousel's pagination strip
            (`absolute inset-x-8 bottom-10` inside the right 40% zone)
            renders the active product name with an arrow on the LEFT of
            that zone. With the RU tagline being the longest of the three
            («Проектирование · Производство · Автоматизация», ~290 px),
            its left edge crept into the same horizontal range as the
            carousel product name on 1280–1440 viewports and the two
            collided.

            Fix: lift the tagline ONE row up so it sits above the hairline
            and the counters, full-width right-aligned. Vertically it now
            clears the carousel pagination row (`bottom-10`) by the full
            counter-strip height + hairline + pt-10. Counters keep the
            same flow but lose the right-hand sibling — they now sit on
            their own row, full width.

            Desktop/tablet only (hidden md:block) — mobile uses inline
            HeroCountersMobile above. */}
        <div className="mt-12 hidden md:mt-[clamp(24px,4vh,64px)] md:block">
          <p className="text-right font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-secondary)]/40">
            {t("footer_tagline")}
          </p>
          <div className="mt-6 border-t border-[var(--color-hairline)] pt-[clamp(16px,3.5vh,40px)]">
            <HeroCounters />
          </div>
        </div>
      </div>
    </section>
  );
}
