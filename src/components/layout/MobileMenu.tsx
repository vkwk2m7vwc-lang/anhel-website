"use client";

import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { X, Phone, Mail } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { CONTACTS } from "@/lib/contacts";

/**
 * Full-screen mobile menu — the only navigation surface below md.
 *
 * Behaviour:
 *   - Mounted unconditionally; AnimatePresence handles show/hide so
 *     Esc and swipe-down close cleanly without remount flicker
 *   - Slides in from the top with the page below scroll-locked
 *   - Swipe down past 120px or a fast flick closes the panel
 *   - Esc key closes; Tab cycles within the panel (focus trap)
 *   - First focusable element (first live product link) receives
 *     focus on open so screen readers announce where they landed
 *
 * Contents (single-column list, large type like terminal-industries):
 *   1. Продукты — 4 cards from PRODUCTS, comingSoon ones disabled
 *   2. Навигация — home-page anchors (Объекты, О компании, etc.)
 *   3. Контакты — phone + email + one-line address
 *
 * Socials intentionally omitted until the брендбук lists official
 * channels — a badge bar with blank icons would read as a mistake.
 *
 * Rendered only below md via the parent Header; the desktop nav
 * row in Header replaces this component on larger viewports.
 */

const NAV_ANCHORS = [
  { label: "Объекты", href: "/projects" },
  { label: "О компании", href: "/#about" },
  { label: "Производство", href: "/#manufacturing" },
  { label: "Контакты", href: "/#contact" },
];

export function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

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
          aria-label="Основное меню"
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
                aria-label="ANHEL® — на главную"
              >
                ANHEL®
              </Link>
              <button
                type="button"
                onClick={onClose}
                aria-label="Закрыть меню"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-secondary)]/20 text-[var(--color-secondary)]"
              >
                <X size={18} strokeWidth={1.5} aria-hidden="true" />
              </button>
            </div>

            <div className="h-px bg-[var(--color-hairline)]" aria-hidden="true" />

            <nav
              aria-label="Основная навигация"
              className="flex flex-1 flex-col gap-10 overflow-y-auto px-6 py-8"
            >
              <section>
                <p className="mono-tag mb-4">Продукты</p>
                <ul className="flex flex-col gap-0">
                  {PRODUCTS.map((p, i) => {
                    const firstLiveIdx = PRODUCTS.findIndex(
                      (pp) => !pp.comingSoon,
                    );
                    const isFirstLive = i === firstLiveIdx;
                    if (p.comingSoon) {
                      return (
                        <li key={p.slug}>
                          <div
                            aria-disabled="true"
                            className="flex cursor-not-allowed items-baseline justify-between gap-4 border-b border-[var(--color-hairline)] py-4 opacity-50"
                          >
                            <span className="font-display text-2xl font-medium text-[var(--color-secondary)]">
                              {p.title}
                            </span>
                            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/65">
                              Скоро
                            </span>
                          </div>
                        </li>
                      );
                    }
                    return (
                      <li key={p.slug}>
                        <Link
                          ref={isFirstLive ? firstLinkRef : undefined}
                          href={p.href}
                          onClick={onClose}
                          className="flex items-baseline justify-between gap-4 border-b border-[var(--color-hairline)] py-4 text-[var(--color-secondary)]"
                        >
                          <span className="font-display text-2xl font-medium">
                            {p.title}
                          </span>
                          <span aria-hidden="true" className="font-mono">
                            →
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>

              <section>
                <p className="mono-tag mb-4">Навигация</p>
                <ul className="flex flex-col gap-1">
                  {NAV_ANCHORS.map((a) => (
                    <li key={a.href}>
                      <Link
                        href={a.href}
                        onClick={onClose}
                        className="block py-3 text-lg text-[var(--color-secondary)]/80 transition-colors hover:text-[var(--color-secondary)]"
                      >
                        {a.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="mt-auto space-y-3 border-t border-[var(--color-hairline)] pt-8">
                <p className="mono-tag">Контакты</p>
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
                  Офис — Санкт-Петербург, производство — Москва.
                </p>
              </section>
            </nav>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
