"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Droplet, Flame, Filter, Cpu, type LucideIcon } from "lucide-react";

/**
 * Мега-меню «Документация» — структурно идентично MegaMenu (продукты):
 * grid 2×2, 4 карточки направлений, fade-slide появление.
 *
 * Ссылки ведут на якоря внутри `/documents`, а не на отдельные
 * страницы — все PDF (опросные листы, сертификаты, руководства)
 * собраны в одной странице, mega-menu даёт быстрый прыжок в
 * нужный раздел без скролла руками.
 *
 * Те же иконки lucide, что в MegaMenu, чтобы шапка читалась
 * целостно: один и тот же логический язык в обоих dropdown.
 */

type MegaMenuCategory = {
  title: string;
  href: string;
  description: string;
  Icon: LucideIcon;
};

const CATEGORIES: readonly MegaMenuCategory[] = [
  {
    title: "Насосные станции",
    href: "/documents#pumps",
    description: "5 опросных листов, 5 деклараций ЕАЭС, 5 руководств",
    Icon: Droplet,
  },
  {
    title: "Тепловые пункты",
    href: "/documents#heating-unit",
    description: "Опросный лист и декларация ЕАЭС соответствия",
    Icon: Flame,
  },
  {
    title: "Водоподготовка",
    href: "/documents#water-treatment",
    description: "Опросный лист и декларация ЕАЭС",
    Icon: Filter,
  },
  {
    title: "Шкафы управления",
    href: "/documents#control-systems",
    description: "Опросный лист по 5 сериям шкафов",
    Icon: Cpu,
  },
];

export function DocumentsMegaMenu({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();

  return (
    <motion.div
      role="menu"
      aria-label="Документация — направления"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="absolute left-1/2 top-full z-40 mt-3 w-[720px] -translate-x-1/2 rounded-md border border-[var(--color-secondary)]/15 bg-[var(--color-primary)]/95 p-3 shadow-2xl shadow-black/30 backdrop-blur-xl"
    >
      <ul className="grid grid-cols-2 gap-2">
        {CATEGORIES.map((cat) => {
          const isActive = pathname === "/documents";
          const Icon = cat.Icon;
          return (
            <li key={cat.href}>
              <Link
                href={cat.href}
                role="menuitem"
                data-cursor="hover"
                onClick={onClose}
                className={
                  "group flex items-start gap-4 rounded-sm border border-transparent p-4 transition-colors " +
                  (isActive
                    ? "border-[var(--color-secondary)]/20 bg-[var(--color-hover-tint)]"
                    : "hover:border-[var(--color-secondary)]/15 hover:bg-[var(--color-hover-tint)]")
                }
              >
                <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--color-hairline)] text-[var(--color-secondary)] transition-transform duration-200 ease-out group-hover:translate-x-0.5">
                  <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <span className="flex flex-col gap-1.5">
                  <span className="font-display text-base font-medium leading-tight text-[var(--color-secondary)]">
                    {cat.title}
                  </span>
                  <span className="text-[13px] leading-snug text-[var(--color-secondary)]/65">
                    {cat.description}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}

/** Экспортируем для аккордеона в MobileMenu, чтобы не дублировать данные. */
export const DOCUMENTS_MEGA_CATEGORIES: readonly MegaMenuCategory[] = CATEGORIES;
