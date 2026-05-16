"use client";

import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { Link } from "@/navigation";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { CONTACTS } from "@/lib/contacts";
import { PROJECTS_PATH } from "@/lib/routes";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";

/**
 * Full-screen mobile menu (B3 minimalist) — the only navigation surface
 * below md.
 *
 * Behaviour:
 *   - Mounted unconditionally; AnimatePresence handles show/hide so
 *     Esc and swipe-down close cleanly without remount flicker
 *   - Slides in from the top with the page below scroll-locked
 *   - Swipe down past 120px or a fast flick closes the panel
 *   - Esc key closes; Tab cycles within the panel (focus trap)
 *   - First focusable element (first nav link) receives focus on open
 *     so screen readers announce where they landed
 *
 * Contents — typography-only, no leading icons on entries:
 *   1. Sticky top bar: ANHEL® · LanguageSwitcher · ThemeToggle · ✕
 *   2. ПРОДУКЦИЯ — 4 product families (title 17px / subtitle 12-13px).
 *      Hover/focus reveals a 2px accent line on the left edge.
 *   3. КОМПАНИЯ — 4 plain links (15px): Objects, Documents, Service, About.
 *      Order follows the desktop customer-journey reorder (v1.20.5).
 *   4. Footer block on a secondary background — phone (tap-to-call) and
 *      email (mailto). Uppercase labels left, value right.
 *
 * No icons live next to product entries (anti-AI rule per client). The
 * close glyph in the top bar keeps stroke-width 1.5 like the rest of
 * the header chrome.
 *
 * Rendered only below md via the parent Header.
 *
 * i18n: section titles, eyebrows, family titles/subtitles, contact
 * labels, and aria-strings resolve from `common.mobile_menu` /
 * `common.nav` / `common.aria`.
 */

/**
 * Product families shown in the «ПРОДУКЦИЯ» group. Title/subtitle keys
 * live under `common.mobile_menu.families.*` and hrefs resolve through
 * the locale-prefixed router (`@/navigation`'s `Link`).
 */
const PRODUCT_FAMILIES = [
  { key: "pumps", href: "/products/pumps" },
  { key: "heating_unit", href: "/products/heating-unit" },
  { key: "water_treatment", href: "/products/water-treatment" },
  { key: "control_systems", href: "/products/control-systems" },
] as const;

export function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("common");
  const tMobile = useTranslations("common.mobile_menu");
  const tFamilies = useTranslations("common.mobile_menu.families");
  const tNav = useTranslations("common.nav");
  const tAria = useTranslations("common.aria");
  const panelRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  /**
   * «КОМПАНИЯ» list — plain links matching the desktop customer-journey
   * order: Objects → Documents → Service → About. Contacts is excluded
   * here on purpose; it lives in the footer block as tap-to-call /
   * mailto so the user always has the office one tap away.
   */
  const COMPANY_NAV = [
    { label: tNav("projects"), href: PROJECTS_PATH },
    { label: tNav("documents"), href: "/documents" },
    { label: tNav("service"), href: "/service" },
    { label: tNav("about"), href: "/#about" },
  ];

  // Body-scroll lock + initial focus. We read and restore the prior
  // overflow value so we play nicely if some other UI also locks
  // scroll while the menu is open.
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => {
      firstLinkRef.current?.focus();
    }, 50);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(focusTimer);
    };
  }, [isOpen]);

  // Esc closes + Tab cycles within the panel (focus trap).
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const focusables = panel.querySelectorAll<HTMLElement>(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    // Close on either a distance threshold (120px) or velocity
    // (fast downward flick) so short flicks and slow drags both
    // feel natural. Matches iOS sheet behaviour.
    if (info.offset.y > 120 || info.velocity.y > 600) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={tMobile("dialog_label")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] bg-[var(--color-primary)] md:hidden"
        >
          <motion.div
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
            onDragEnd={handleDragEnd}
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex h-full flex-col bg-[var(--color-primary)]"
          >
            {/* Drag handle — visual affordance for the swipe-down gesture. */}
            <div className="flex justify-center pt-2" aria-hidden="true">
              <div className="h-[3px] w-10 rounded-full bg-[var(--color-secondary)]/20" />
            </div>

            {/* Sticky top bar: ANHEL® wordmark + Language + Theme + Close.
                Sits inside the scrolling container at top: 0 so the brand
                stays anchored while the nav list scrolls. */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[var(--color-hairline)] bg-[var(--color-primary)] px-5 py-3">
              <Link
                href="/"
                onClick={onClose}
                className="font-display text-lg tracking-tight text-[var(--color-secondary)]"
                aria-label={tAria("home_link")}
              >
                {t("brand.name")}
              </Link>
              <div className="flex items-center gap-2">
                <LanguageSwitcher />
                <ThemeToggle />
                <button
                  type="button"
                  onClick={onClose}
                  aria-label={tAria("close_menu")}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-secondary)]/20 text-[var(--color-secondary)]"
                >
                  <X size={18} strokeWidth={1.5} aria-hidden="true" />
                </button>
              </div>
            </div>

            <nav
              aria-label={tAria("main_nav")}
              className="flex flex-1 flex-col overflow-y-auto"
            >
              {/* ─── ПРОДУКЦИЯ ─────────────────────────────────────── */}
              <p
                className="pt-6 pb-2 px-5 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-secondary)]/55"
                role="heading"
                aria-level={2}
              >
                {tMobile("eyebrow_products")}
              </p>
              <ul className="flex flex-col">
                {PRODUCT_FAMILIES.map((fam, i) => (
                  <li
                    key={fam.key}
                    className="border-b border-[var(--color-hairline)]"
                  >
                    <Link
                      ref={i === 0 ? firstLinkRef : undefined}
                      href={fam.href}
                      onClick={onClose}
                      className="group relative block px-5 py-4 transition-colors [@media(hover:hover)]:hover:bg-[var(--color-hover-tint)] focus-visible:bg-[var(--color-hover-tint)]"
                    >
                      {/* B3 accent line — 2px vertical bar on the left edge
                          revealed on hover/focus. accent-fire stays neutral
                          across light/dark themes. */}
                      <span
                        aria-hidden="true"
                        className="absolute inset-y-0 left-0 w-[2px] bg-[var(--accent-fire)] opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                      />
                      <span className="block font-display text-[17px] font-medium leading-snug text-[var(--color-secondary)]">
                        {tFamilies(`${fam.key}.title`)}
                      </span>
                      <span className="mt-1 block text-[12.5px] leading-snug text-[var(--color-secondary)]/60">
                        {tFamilies(`${fam.key}.subtitle`)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* ─── КОМПАНИЯ ──────────────────────────────────────── */}
              <p
                className="pt-6 pb-2 px-5 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-secondary)]/55"
                role="heading"
                aria-level={2}
              >
                {tMobile("eyebrow_company")}
              </p>
              <ul className="flex flex-col">
                {COMPANY_NAV.map((item) => (
                  <li
                    key={item.href}
                    className="border-b border-[var(--color-hairline)]"
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="group relative block px-5 py-[15px] text-[15px] text-[var(--color-secondary)] transition-colors [@media(hover:hover)]:hover:bg-[var(--color-hover-tint)] focus-visible:bg-[var(--color-hover-tint)]"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute inset-y-0 left-0 w-[2px] bg-[var(--accent-fire)] opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                      />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* spacer pushes the footer block to the bottom on tall screens
                  while the nav still scrolls naturally on short ones. */}
              <div className="flex-1" aria-hidden="true" />

              {/* ─── Footer contacts ───────────────────────────────── */}
              <section
                className="border-t border-[var(--color-hairline)] bg-[var(--color-hover-tint)] px-5 py-4"
                aria-label={tMobile("section_contacts")}
              >
                <a
                  href={`tel:${CONTACTS.phoneTel}`}
                  onClick={onClose}
                  className="flex items-center justify-between py-1"
                  aria-label={tAria("call_phone", { phone: CONTACTS.phone })}
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-secondary)]/55">
                    {tMobile("phone_label")}
                  </span>
                  <span className="font-mono text-[15px] font-medium tracking-[0.02em] text-[var(--color-secondary)]">
                    {CONTACTS.phone}
                  </span>
                </a>
                <a
                  href={`mailto:${CONTACTS.email}`}
                  onClick={onClose}
                  className="flex items-center justify-between py-1"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-secondary)]/55">
                    {tMobile("email_label")}
                  </span>
                  <span className="text-[15px] font-medium text-[var(--color-secondary)]">
                    {CONTACTS.email}
                  </span>
                </a>
              </section>
            </nav>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
