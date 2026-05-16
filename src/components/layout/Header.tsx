"use client";

import { Link } from "@/navigation";
import { usePathname } from "@/navigation";
import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { CONTACTS } from "@/lib/contacts";
import { PROJECTS_PATH } from "@/lib/routes";
import { MobileMenu } from "./MobileMenu";
import { ProductsMenu } from "./ProductsMenu";
import { DocumentsMenu } from "./DocumentsMenu";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";

/**
 * Fixed header with two behaviours:
 *  1. Scroll-down → hide. Scroll-up → show. This keeps content breathing
 *     room while letting the user reach navigation instantly on the way back.
 *  2. After a small scroll threshold we darken/blur the bar so it stays
 *     legible over any hero content.
 *
 * Navigation: гибридная структура — Производство и О компании ведут на
 * якоря секций главной (#production, #about), Контакты — отдельная
 * страница `/contacts` с реквизитами, картой и формой обратной связи.
 *
 * i18n: nav labels and aria-strings are pulled from the `common`
 * namespace. The href targets are locale-agnostic — next-intl's
 * `Link` from `next/link` is fine here because middleware does the
 * locale prefix work transparently.
 */

export function Header() {
  const t = useTranslations("common");
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  /**
   * NAV is rebuilt on every render because labels depend on the
   * translation function `t`. Stable hrefs only — keys come from the
   * common.nav namespace. Order preserved from the previous
   * hardcoded array: Objects · Production · Service · About · Contacts.
   * «Products» and «Documents» live in their own dropdown components
   * (ProductsMenu, DocumentsMenu) and are inserted around this slice.
   */
  const NAV = [
    { label: t("nav.projects"), href: PROJECTS_PATH },
    { label: t("nav.production"), href: "/#production" },
    { label: t("nav.service"), href: "/service" },
    { label: t("nav.about"), href: "/#about" },
    { label: t("nav.contacts"), href: "/contacts" },
  ];

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
            aria-label={t("aria.home_link")}
          >
            {t("brand.name")}
          </Link>

          <nav
            aria-label={t("aria.main_nav")}
            className="hidden items-center gap-6 md:flex lg:gap-8"
          >
            <ProductsMenu />
            {NAV.slice(0, 3).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                data-cursor="hover"
                className="text-sm text-[var(--color-secondary)]/70 transition-colors hover:text-[var(--color-secondary)]"
              >
                {item.label}
              </Link>
            ))}
            <DocumentsMenu />
            {NAV.slice(3).map((item) => (
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

          <div className="flex items-center gap-3">
            <Link
              href={`tel:${CONTACTS.phoneTel}`}
              data-cursor="hover"
              aria-label={t("aria.call_phone", { phone: CONTACTS.phone })}
              className="hidden items-center gap-2 text-sm text-[var(--color-secondary)]/80 transition-colors hover:text-[var(--color-secondary)] md:inline-flex"
            >
              <Phone size={14} strokeWidth={1.5} aria-hidden="true" />
              <span className="font-mono tracking-[0.02em]">{CONTACTS.phone}</span>
            </Link>

            {/* Language switcher — `RU/EN/TR` dropdown next to the
                theme toggle. Same visual cluster, identical h-10 height
                so the right-hand group reads as one unit. */}
            <LanguageSwitcher />

            {/* Theme toggle — солнце/луна. Кнопка-иконка такого же размера,
                как mobile-menu trigger; стоит в правой группе после телефона. */}
            <ThemeToggle />

            {/* Mobile menu trigger — full-screen menu lives in MobileMenu.tsx. */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={t("aria.open_menu")}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-secondary)]/20 text-[var(--color-secondary)] md:hidden"
              data-cursor="hover"
            >
              <Menu size={18} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
