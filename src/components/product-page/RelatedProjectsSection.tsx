import Image from "next/image";
import Link from "next/link";
import {
  getRelatedProjects,
  getRelatedProjectsCategoryFilter,
} from "@/lib/related-projects";

/**
 * «Объекты-референс» — компактный блок до 3 реализованных объектов,
 * привязанных к категории текущего продукта. Лежит на product-странице
 * между галереей и блоком «Документация».
 *
 * Логика выборки в `lib/related-projects.ts`. Если связанных нет — секция
 * не рендерится (return null), чтобы не показывать пустой блок.
 *
 * UX-приём из ИТП-направления: подзаголовок справа, грид-карточки с
 * cover-фото, мини-CTA «Смотреть все объекты» в правом углу заголовка.
 */
export function RelatedProjectsSection({
  productSlug,
  tag,
}: {
  /** slug продукта, для которого собираем релевантные объекты */
  productSlug: string;
  /** Mono-tag слева вверху, e.g. «08 · ОБЪЕКТЫ». */
  tag: string;
}) {
  const projects = getRelatedProjects(productSlug, 3);
  if (projects.length === 0) return null;

  const categoryFilter = getRelatedProjectsCategoryFilter(productSlug);
  const allObjectsHref =
    categoryFilter === "all"
      ? "/projects"
      : `/projects?category=${categoryFilter}`;

  return (
    <section
      id="references"
      aria-labelledby="references-title"
      className="relative border-t border-[var(--color-hairline)] bg-[var(--color-primary)]"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 py-20 md:px-12 md:py-28">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mono-tag">{tag}</p>
            <h2
              id="references-title"
              className="mt-4 max-w-[640px] font-display text-h2 font-medium text-[var(--color-secondary)]"
            >
              Где уже работает
            </h2>
          </div>
          <Link
            href={allObjectsHref}
            data-cursor="hover"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-secondary)]/65 transition-colors hover:text-[var(--color-secondary)]"
          >
            Смотреть все объекты
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Grid — 1×3 на mobile, 2×2 на sm, 3×1 на lg. До трёх объектов. */}
        <ul className="mt-12 grid grid-cols-1 gap-px bg-[var(--color-hairline)] sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
          {projects.map((p) => (
            <li key={p.slug} className="bg-[var(--color-primary)]">
              <Link
                href={`/projects/${p.slug}`}
                data-cursor="hover"
                className="group flex h-full flex-col"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--color-image-placeholder)]">
                  <Image
                    src={p.cover}
                    alt={p.coverAlt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5 md:p-6">
                  <p className="font-display text-[18px] font-medium leading-snug text-[var(--color-secondary)] md:text-[20px]">
                    {p.title}
                  </p>
                  {p.location ? (
                    <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/55">
                      {p.location}
                      {p.year ? ` · ${p.year}` : ""}
                    </p>
                  ) : null}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
