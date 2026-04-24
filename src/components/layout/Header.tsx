"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Fixed header with two behaviours:
 *  1. Scroll-down → hide. Scroll-up → show. This keeps content breathing
 *     room while letting the user reach navigation instantly on the way back.
 *  2. After a small scroll threshold we darken/blur the bar so it stays
 *     legible over any hero content.
 *
 * Navigation items match Stage 2 of TZ_ANHEL.md. Links point at anchors
 * on the home page for now — we'll lift them into real routes later when
 * the sections exist.
 */

const NAV = [
  { label: "Продукты", href: "/products/pumps/firefighting" },
  { label: "Объекты", href: "/#projects" },
  { label: "О компании", href: "/#about" },
  { label: "Производство", href: "/#manufacturing" },
  { label: "Контакты", href: "/#contact" },
];

export function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    // Past 80px we care about direction. Above that we always show.
    setScrolled(latest > 8);
    if (latest > 120 && latest > previous) setHidden(true);
    else setHidden(false);
  });

  // On route change (client-side nav) force the header to reappear.
  useEffect(() => setHidden(false), []);

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: hidden ? "-100%" : 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled
          ? "bg-[var(--color-primary)]/80 backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 md:h-20 md:px-12">
        <Link
          href="/"
          data-cursor="hover"
          className="font-display text-lg tracking-tight text-[var(--color-secondary)]"
          aria-label="ANHEL — на главную"
        >
          ANHEL
        </Link>

        <nav
          aria-label="Основная навигация"
          className="hidden items-center gap-8 md:flex"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              data-cursor="hover"
              className="text-sm text-[var(--color-secondary)]/70 transition-colors hover:text-[var(--color-secondary)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="tel:+78124164500"
          data-cursor="hover"
          aria-label="Позвонить: +7 (812) 416-4500"
          className="hidden items-center gap-2 text-sm text-[var(--color-secondary)]/80 transition-colors hover:text-[var(--color-secondary)] md:inline-flex"
        >
          <Phone size={14} strokeWidth={1.75} aria-hidden="true" />
          <span className="font-mono tracking-[0.02em]">
            +7 (812) 416-4500
          </span>
        </Link>

        {/* Mobile trigger is a placeholder — Stage 2 will wire the
            full-screen menu with Framer Motion AnimatePresence. */}
        <button
          type="button"
          aria-label="Открыть меню"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-secondary)]/20 text-[var(--color-secondary)] md:hidden"
          data-cursor="hover"
        >
          <span className="sr-only">Меню</span>
          <span aria-hidden="true" className="block h-px w-5 bg-current" />
        </button>
      </div>
    </motion.header>
  );
}
