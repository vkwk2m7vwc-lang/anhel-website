"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Droplet, Flame, Filter, Cpu, type LucideIcon } from "lucide-react";

/**
 * Мега-меню «Продукты» — закрывает C2 из pre-launch audit.
 *
 * Шапка раньше показывала пункт «Продукты» как простую ссылку.
 * На hover вокруг текста появлялся белый круг (`anhel-cursor-active`
 * follower-ring увеличивался в 2× на hover) — посетители принимали
 * его за пустое выпадающее меню и терялись. Подменю физически не
 * существовало — все 6 пунктов NAV были `<Link>` без вложений.
 *
 * Теперь — выпадающая панель с 4 карточками категорий: насосные,
 * ИТП, водоподготовка, шкафы. State (open/close, hover delay) живёт
 * в ProductsMenu — этот компонент только рендерит содержимое.
 *
 * Layout — grid 2×2, фиксированная ширина 720px (по ТЗ), карточки с
 * иконкой Lucide, заголовком и одной строкой описания. Активная
 * категория (если `pathname` стартует с её URL) подсвечивается.
 *
 * Mobile эквивалент — accordion в MobileMenu.tsx, не этот компонент.
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
    href: "/products/pumps",
    description:
      "5 серий: водоснабжение, пожаротушение, отопление, повысительные, специальные",
    Icon: Droplet,
  },
  {
    title: "Тепловые пункты",
    href: "/products/heating-unit",
    description: "8 модулей ИТП: ввод, отопление, ГВС, подпитка",
    Icon: Flame,
  },
  {
    title: "Водоподготовка",
    href: "/products/water-treatment",
    description: "Установки фильтрации и умягчения для котельных и ИТП",
    Icon: Filter,
  },
  {
    title: "Шкафы управления",
    href: "/products/control-systems",
    description: "5 серий: ЧРП, электропривода, ППА, ПДВ, КНС",
    Icon: Cpu,
  },
];

export function MegaMenu({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();

  return (
    <motion.div
      role="menu"
      aria-label="Продукты — категории"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="absolute left-1/2 top-full z-40 mt-3 w-[720px] -translate-x-1/2 rounded-md border border-[var(--color-secondary)]/15 bg-[var(--color-primary)]/95 p-3 shadow-2xl shadow-black/30 backdrop-blur-xl"
    >
      <ul className="grid grid-cols-2 gap-2">
        {CATEGORIES.map((cat) => {
          const isActive = pathname.startsWith(cat.href);
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
export const PRODUCTS_MEGA_CATEGORIES: readonly MegaMenuCategory[] = CATEGORIES;
