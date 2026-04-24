"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { CONTACTS } from "@/lib/contacts";
import { MobileMenu } from "./MobileMenu";

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
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    // Past 80px we care about direction. Above that we always show.
    setScrolled(latest > 8);
    if (latest > 120 && latest > previous) setHidden(true);
    else setHidden(false);
  });

  // On route change (client-side nav) force the header to reappear
  // and close the mobile menu so the new page isn't buried behind it.
  useEffect(() => {
    setHidden(false);
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: hidden ? "-100%" : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          scrolled
            ? "bg-[var(--color-primary)]/80 backdrop-blur-md"
            : "bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 md:h-20 md:px-12">
          <Link
            href="/"
            data-cursor="hover"
            className="font-display text-lg tracking-tight text-[var(--color-secondary)]"
            aria-label="ANHEL® — на главную"
          >
            ANHEL®
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
            href={`tel:${CONTACTS.phoneTel}`}
            data-cursor="hover"
            aria-label={`Позвонить: ${CONTACTS.phone}`}
            className="hidden items-center gap-2 text-sm text-[var(--color-secondary)]/80 transition-colors hover:text-[var(--color-secondary)] md:inline-flex"
          >
            <Phone size={14} strokeWidth={1.75} aria-hidden="true" />
            <span className="font-mono tracking-[0.02em]">{CONTACTS.phone}</span>
          </Link>

          {/* Mobile menu trigger — full-screen menu lives in MobileMenu.tsx. */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Открыть меню"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-secondary)]/20 text-[var(--color-secondary)] md:hidden"
            data-cursor="hover"
          >
            <Menu size={18} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
      </motion.header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
