"use client";

import { Link } from "@/navigation";
import { usePathname } from "@/navigation";
import { motion } from "framer-motion";
import { FileText, BookOpen, FileBadge, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";

/**
 * Мега-меню «Документация» — выбор сразу по ТИПУ документа.
 *
 * Историческая версия (v1) была по направлениям (Насосные / ИТП /
 * ВПУ / ШУ). v2 (12.05.2026) — переход на структуру «по типу»:
 * Опросные / Каталоги / Сертификаты. Согласуется с:
 *   - Footer-колонкой «Материалы» (/documents#questionnaires|catalogs|certificates)
 *   - top-level якорями на странице /documents
 *
 * Раньше у конкретного направления было удобно сразу попасть в его
 * блок документов; теперь — обратная логика: «мне нужен опросный
 * лист» → клик → секция «Опросные листы» с подгруппами по
 * направлению. Внутри секции направление-anchors (`#pumps`, и т.д.)
 * сохранены — старые external-ссылки на /documents#pumps продолжают
 * работать.
 *
 * 3 пункта рендерятся горизонтально (grid-cols-3), меню чуть шире
 * чем 4-карточный продуктовый — это намеренный визуальный контраст,
 * чтобы две dropdown'ы в шапке не смотрелись одинаково.
 *
 * i18n: title/description приходят из `common.mega_menu.documents.<key>`,
 * чтобы тот же словарь использовался и в MobileMenu.
 */

type MegaMenuCategoryData = {
  /**
   * Key inside `common.mega_menu.documents.*` — resolves title and
   * description. Stays language-neutral because next-intl handles
   * resolution per-request.
   */
  key: "questionnaires" | "catalogs" | "certificates";
  href: string;
  Icon: LucideIcon;
};

const CATEGORIES: readonly MegaMenuCategoryData[] = [
  { key: "questionnaires", href: "/documents#questionnaires", Icon: FileText },
  { key: "catalogs", href: "/documents#catalogs", Icon: BookOpen },
  { key: "certificates", href: "/documents#certificates", Icon: FileBadge },
];

export function DocumentsMegaMenu({ onClose }: { onClose: () => void }) {
  const t = useTranslations("common.mega_menu.documents");
  const pathname = usePathname();

  return (
    <motion.div
      role="menu"
      aria-label={t("aria_label")}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="absolute left-1/2 top-full z-40 mt-3 w-[780px] -translate-x-1/2 rounded border border-[var(--color-secondary)]/15 bg-[var(--color-primary)] p-3 shadow-2xl shadow-black/30 backdrop-blur-sm"
    >
      <ul className="grid grid-cols-3 gap-2">
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
                  "group flex h-full items-start gap-4 rounded-sm border border-transparent p-4 transition-colors " +
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
                    {t(`${cat.key}.title`)}
                  </span>
                  <span className="text-[13px] leading-snug text-[var(--color-secondary)]/65">
                    {t(`${cat.key}.description`)}
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
export const DOCUMENTS_MEGA_CATEGORIES: readonly MegaMenuCategoryData[] =
  CATEGORIES;
