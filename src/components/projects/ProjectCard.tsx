import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import type { ProjectItem } from "@/content/projects/types";

/**
 * Карточка объекта на странице /projects.
 *
 * Layout: cover-фото 4:3 ratio с mono-tag overlay (категория объекта), затем
 * подложка с названием и кратким перечнем поставленного оборудования.
 *
 * Visual idiom matches existing engineering-restraint pages: hairline
 * borders, mono-uppercase tags, accent ring on hover, no decorative noise.
 *
 * i18n: title/equipment/coverAlt/category-label резолвятся через t()
 * по стабильным ключам — данные карточки приходят без локализованных
 * полей, только slug + category + equipment-keys + cover.
 */
export function ProjectCard({ project }: { project: ProjectItem }) {
  const tItems = useTranslations("projects.items");
  const tEquipment = useTranslations("projects.equipment_lines");
  const tCovers = useTranslations("projects.cover_alt_suffix");
  const tCats = useTranslations("projects.category_labels");
  const tCard = useTranslations("projects.card");

  // Show top-2 equipment lines on the card; full list lives on the detail page.
  const equipmentPreview = project.equipment.slice(0, 2);
  const remainingCount = project.equipment.length - equipmentPreview.length;

  const title = tItems(`${project.slug}.title` as never) as string;
  const coverSuffixKey = tItems(`${project.slug}.cover_alt_suffix` as never) as string;
  const coverAlt = `${title} — ${tCovers(coverSuffixKey as never)}`;

  return (
    <Link
      href={`/projects/${project.slug}`}
      data-cursor="hover"
      className="group flex h-full flex-col bg-[var(--color-primary)] transition-colors hover:bg-[var(--color-hover-tint)]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--color-image-placeholder)]">
        <Image
          src={project.cover}
          alt={coverAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
        />
        <span className="absolute left-4 top-4 inline-flex items-center rounded-full border border-[var(--color-secondary)]/30 bg-[var(--color-primary)]/85 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-secondary)] backdrop-blur-sm">
          {/* категория объекта */}
          {tCats(project.category)}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <h3 className="font-display text-[20px] font-medium leading-snug text-[var(--color-secondary)] md:text-[22px]">
          {title}
        </h3>

        <ul className="flex flex-1 flex-col gap-1.5 text-[13px] leading-snug text-[var(--color-secondary)]/65">
          {equipmentPreview.map((key) => (
            <li key={key} className="line-clamp-2">
              · {tEquipment(key)}
            </li>
          ))}
          {remainingCount > 0 ? (
            <li className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/45">
              {tCard("remaining", { count: remainingCount })}
            </li>
          ) : null}
        </ul>

        <span className="mt-auto inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-secondary)]/60 transition-colors group-hover:text-[var(--color-secondary)]">
          {tCard("details")}
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
