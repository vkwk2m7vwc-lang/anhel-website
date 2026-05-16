"use client";

import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { Link } from "@/navigation";
import { useEffect, useRef } from "react";
import { X, Phone, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { CONTACTS } from "@/lib/contacts";
import { PROJECTS_PATH } from "@/lib/routes";

/**
 * Full-screen mobile menu — the only navigation surface below md.
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
 * Contents (single flat list, large type like terminal-industries):
 *   1. Навигация — Продукты, Документация, Объекты, Сервис, О компании,
 *      Контакты. Plain links, no accordions.
 *   2. Контакты — phone + email + one-line address
 *
 * Mega-menu accordions for Продукты / Документация were removed in
 * v1.20.3 (feat/header-simplify-megamenu) together with the desktop
 * dropdowns — Продукты now points at /products (4-direction grid) and
 * Документация at /documents (all PDFs by type).
 *
 * Rendered only below md via the parent Header.
 *
 * i18n: section titles and aria-labels resolve from `common.mobile_menu`,
 * nav labels from `common.nav`.
 */

export function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("common");
  const tMobile = useTranslations("common.mobile_menu");
  const tNav = useTranslations("common.nav");
  const tAria = useTranslations("common.aria");
  const panelRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  /**
   * Flat nav — same items as Header desktop NAV, rebuilt each render so
   * labels follow t() refresh. Hrefs static. Order matches the desktop
   * row.
   */
  const NAV = [
    { label: tNav("products"), href: "/products" },
    { label: tNav("documents"), href: "/documents" },
    { label: tNav("projects"), href: PROJECTS_PATH },
    { label: tNav("service"), href: "/service" },
    { label: tNav("about"), href: "/#about" },
    { label: tNav("contacts"), href: "/contacts" },
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
          transition={{ duration: 0.25 }}
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
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex h-full flex-col bg-[var(--color-primary)]"
          >
            {/* Drag handle — visual affordance for the swipe-down gesture. */}
            <div className="flex justify-center pt-3" aria-hidden="true">
              <div className="h-[3px] w-10 rounded-full bg-[var(--color-secondary)]/20" />
            </div>

            {/* Top bar: brand wordmark + close X */}
            <div className="flex items-center justify-between px-6 pb-4 pt-4">
              <Link
                href="/"
                onClick={onClose}
                className="font-display text-lg tracking-tight text-[var(--color-secondary)]"
                aria-label={tAria("home_link")}
              >
                {t("brand.name")}
              </Link>
              <button
                type="button"
                onClick={onClose}
                aria-label={tAria("close_menu")}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-secondary)]/20 text-[var(--color-secondary)]"
              >
                <X size={18} strokeWidth={1.5} aria-hidden="true" />
              </button>
            </div>

            <div className="h-px bg-[var(--color-hairline)]" aria-hidden="true" />

            <nav
              aria-label={tAria("main_nav")}
              className="flex flex-1 flex-col gap-8 overflow-y-auto px-6 py-8"
            >
              <section>
                <p className="mono-tag mb-4">{tMobile("section_navigation")}</p>
                <ul className="flex flex-col divide-y divide-[var(--color-hairline)]">
                  {NAV.map((item, i) => (
                    <li key={item.href}>
                      <Link
                        ref={i === 0 ? firstLinkRef : undefined}
                        href={item.href}
                        onClick={onClose}
                        className="block py-4 font-display text-2xl font-medium text-[var(--color-secondary)] transition-colors hover:text-[var(--color-secondary)]/80"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="mt-auto space-y-3 border-t border-[var(--color-hairline)] pt-8">
                <p className="mono-tag">{tMobile("section_contacts")}</p>
                <a
                  href={`tel:${CONTACTS.phoneTel}`}
                  onClick={onClose}
                  className="flex items-center gap-3 font-mono text-base text-[var(--color-secondary)]"
                >
                  <Phone size={16} strokeWidth={1.5} aria-hidden="true" />
                  {CONTACTS.phone}
                </a>
                <a
                  href={`mailto:${CONTACTS.email}`}
                  onClick={onClose}
                  className="flex items-center gap-3 text-base text-[var(--color-secondary)]"
                >
                  <Mail size={16} strokeWidth={1.5} aria-hidden="true" />
                  {CONTACTS.email}
                </a>
                <p className="pt-2 text-sm leading-relaxed text-[var(--color-secondary)]/55">
                  {tMobile("office_line")}
                </p>
              </section>
            </nav>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
