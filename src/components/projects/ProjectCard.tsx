import Image from "next/image";
import Link from "next/link";
import type { ProjectItem } from "@/content/projects/types";

/**
 * Single project card — appears inside ProjectsGrid.
 *
 * Layout: hero photo with mono-tag overlay (категория и заказчик), затем
 * подложка с названием и кратким переченем поставленного оборудования.
 *
 * Visual idiom matches existing engineering-restraint pages: hairline
 * borders, mono-uppercase tags, accent ring on hover, no decorative noise.
 * Image mode = `cover` ratio 4:3 — стабильная сетка вне зависимости от
 * исходного формата, который варьирует по типу объекта.
 */
export function ProjectCard({ project }: { project: ProjectItem }) {
  // Show top-2 equipment lines on the card; full list lives on the detail page.
  const equipmentPreview = project.equipment.slice(0, 2);
  const remainingCount = project.equipment.length - equipmentPreview.length;

  return (
    <Link
      href={`/projects/${project.slug}`}
      data-cursor="hover"
      className="group relative flex flex-col overflow-hidden border border-[var(--color-hairline)] bg-[var(--color-primary)] transition-colors duration-300 hover:border-[var(--color-secondary)]/30"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0F0F0F]">
        <Image
          src={project.cover}
          alt={project.coverAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
        />
        {/* Top-left mono tag — заказчик */}
        <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)]/85 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/85 backdrop-blur-sm">
          {project.customer}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <h3 className="font-display text-[20px] font-medium leading-snug text-[var(--color-secondary)] md:text-[22px]">
          {project.title}
        </h3>

        <ul className="flex flex-1 flex-col gap-1.5 text-[13px] leading-snug text-[var(--color-secondary)]/65">
          {equipmentPreview.map((line) => (
            <li key={line} className="line-clamp-2">
              · {line}
            </li>
          ))}
          {remainingCount > 0 ? (
            <li className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/45">
              +{remainingCount} позиций
            </li>
          ) : null}
        </ul>

        <span className="mt-auto inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-secondary)]/60 transition-colors group-hover:text-[var(--color-secondary)]">
          Подробнее
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
