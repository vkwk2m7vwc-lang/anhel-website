"use client";

import { useEffect, useState, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "./ProjectCard";
import type { ProjectItem } from "@/content/projects/types";

type FilterKey = "all" | "pumps" | "water-treatment";

const VALID_KEYS: readonly FilterKey[] = ["all", "pumps", "water-treatment"];

const FILTERS: { key: FilterKey; label: string; count?: (items: ProjectItem[]) => number }[] = [
  {
    key: "all",
    label: "Все",
    count: (items) => items.length,
  },
  {
    key: "pumps",
    label: "Насосные станции",
    count: (items) =>
      items.filter((p) => p.category === "pumps" || p.category === "mixed").length,
  },
  {
    key: "water-treatment",
    label: "Водоподготовка",
    count: (items) =>
      items.filter(
        (p) => p.category === "water-treatment" || p.category === "mixed",
      ).length,
  },
];

/**
 * Client-side projects grid with category filter.
 *
 * URL-sync: при заходе с `/projects?category=pumps` (или
 * `?category=water-treatment`) preselect соответствующий фильтр; при
 * клике пользователь меняет URL через `router.replace`, чтобы share-link
 * был стабилен. Хеш и scroll не трогаем.
 *
 * Это позволяет ссылке «Смотреть все объекты» с product-страницы
 * (`<RelatedProjectsSection>`) предустанавливать релевантную категорию.
 *
 * Сама сетка — 1 / 2 / 3 col; промежуток на десктопе hairline-border-grid
 * как в DocumentsGrid и ApplicationsGrid (визуальная согласованность).
 */
export function ProjectsFilter({ projects }: { projects: ProjectItem[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Initial value читается из URL: ?category=pumps|water-treatment|all.
  // Невалидное значение → fallback "all".
  const initialFromUrl = (() => {
    const raw = searchParams.get("category");
    return (VALID_KEYS as readonly string[]).includes(raw ?? "")
      ? (raw as FilterKey)
      : "all";
  })();
  const [filter, setFilter] = useState<FilterKey>(initialFromUrl);

  // Если URL меняется снаружи (back/forward, deep-link) — синхронизируем
  // локальный state. Reverse-направление обрабатывается onSetFilter ниже.
  useEffect(() => {
    const raw = searchParams.get("category");
    const next: FilterKey = (VALID_KEYS as readonly string[]).includes(
      raw ?? "",
    )
      ? (raw as FilterKey)
      : "all";
    setFilter((prev) => (prev === next ? prev : next));
  }, [searchParams]);

  const onSetFilter = (key: FilterKey) => {
    setFilter(key);
    // `replace` чтобы клик по фильтру не плодил истории back; параметр
    // сохраняется в URL для shareable-ссылок и SEO.
    const params = new URLSearchParams(searchParams.toString());
    if (key === "all") {
      params.delete("category");
    } else {
      params.set("category", key);
    }
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const filtered = useMemo(() => {
    if (filter === "all") return projects;
    if (filter === "pumps")
      return projects.filter(
        (p) => p.category === "pumps" || p.category === "mixed",
      );
    return projects.filter(
      (p) => p.category === "water-treatment" || p.category === "mixed",
    );
  }, [filter, projects]);

  return (
    <>
      <div className="mt-10 flex flex-wrap gap-2 md:mt-14">
        {FILTERS.map((f) => {
          const count = f.count ? f.count(projects) : projects.length;
          const active = filter === f.key;
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => onSetFilter(f.key)}
              data-cursor="hover"
              aria-pressed={active}
              className={[
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors duration-300",
                active
                  ? "border-[var(--color-secondary)] bg-[var(--color-secondary)] text-[var(--color-primary)]"
                  : "border-[var(--color-hairline)] text-[var(--color-secondary)]/70 hover:border-[var(--color-secondary)]/40 hover:text-[var(--color-secondary)]",
              ].join(" ")}
            >
              <span>{f.label}</span>
              <span className={active ? "opacity-60" : "opacity-50"}>
                {count.toString().padStart(2, "0")}
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.ul
          key={filter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 grid grid-cols-1 gap-px bg-[var(--color-hairline)] sm:grid-cols-2 md:mt-16 lg:grid-cols-3"
        >
          {filtered.map((project, i) => (
            <motion.li
              key={project.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                ease: [0.16, 1, 0.3, 1],
                delay: Math.min(i, 8) * 0.04,
              }}
              className="bg-[var(--color-primary)]"
            >
              <ProjectCard project={project} />
            </motion.li>
          ))}
        </motion.ul>
      </AnimatePresence>

      {filtered.length === 0 ? (
        <p className="mt-16 text-sm text-[var(--color-secondary)]/60">
          В этой категории пока нет объектов.
        </p>
      ) : null}
    </>
  );
}
