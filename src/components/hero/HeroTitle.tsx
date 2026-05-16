"use client";

import { useTranslations } from "next-intl";

/**
 * Hero headline — mobile/tablet mix of two weights, desktop unchanged.
 *
 * Mont-Fort-style emphasis: the noun renders semibold (600) and the
 * qualifier renders extralight (200) with 55% opacity. Position of the
 * two parts is locale-aware via `title_emphasized` — the component
 * locates that fragment inside the full title with `indexOf`, so:
 *   RU "Инженерное оборудование, на которое можно положиться."
 *      → primary "Инженерное оборудование," + muted " на которое…"
 *   EN "Engineering equipment you can rely on."
 *      → primary "Engineering equipment" + muted " you can rely on."
 *   TR "Güvenebileceğiniz endüstriyel ekipman."
 *      → muted "Güvenebileceğiniz " + primary "endüstriyel ekipman."
 *
 * At lg+ the spans collapse to a single `font-medium` weight + full
 * colour, restoring the desktop text-hero look we don't want to touch.
 *
 * GSAP SplitText is intentionally NOT used here:
 *   - SplitText rewrites the h1 inner HTML to wrap each word in a div
 *     and that strips the inline emphasis/muted span structure, so
 *     either we keep the animation OR we keep the typography — we
 *     keep the typography. The reveal can be re-added later with a
 *     custom per-word wrap that respects the two-span structure.
 */
export function HeroTitle() {
  const t = useTranslations("home.hero");
  const title = t("title");
  const emphasized = t("title_emphasized");
  const idx = title.indexOf(emphasized);

  // Defensive: if `title_emphasized` falls out of sync with `title`
  // (copy edit landing in only one of the two keys), fall back to
  // rendering the whole title in the primary style so we never show
  // garbled output to the user.
  if (idx === -1) {
    return (
      <h1 className="font-display text-[42px] font-semibold leading-[0.95] tracking-[-0.04em] text-[var(--color-secondary)] md:text-[44px] lg:text-hero lg:font-medium lg:tracking-[-0.025em]">
        {title}
      </h1>
    );
  }

  const leading = title.slice(0, idx);
  const trailing = title.slice(idx + emphasized.length);

  return (
    <h1 className="font-display text-[42px] leading-[0.95] tracking-[-0.04em] text-[var(--color-secondary)] md:text-[44px] lg:text-hero lg:tracking-[-0.025em]">
      {leading ? (
        <span className="font-normal text-[var(--color-secondary)]/55 lg:font-medium lg:text-[var(--color-secondary)]">
          {leading}
        </span>
      ) : null}
      <span className="font-semibold text-[var(--color-secondary)] lg:font-medium">
        {emphasized}
      </span>
      {trailing ? (
        <span className="font-normal text-[var(--color-secondary)]/55 lg:font-medium lg:text-[var(--color-secondary)]">
          {trailing}
        </span>
      ) : null}
    </h1>
  );
}
