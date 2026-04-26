import type { Metadata } from "next";
import { Suspense } from "react";
import { PROJECTS } from "@/content/projects/data";
import { ProjectsFilter } from "@/components/projects/ProjectsFilter";

export const metadata: Metadata = {
  title: "Объекты — портфолио ANHEL®",
  description:
    "Реализованные объекты ANHEL®: насосные станции и установки водоподготовки в жилых комплексах и медицинских комплексах.",
  alternates: { canonical: "/projects" },
};

/**
 * /projects — портфолио объектов.
 *
 * Source-of-truth содержимого: src/content/projects/data.ts. Каждый
 * объект имеет slug → детальная страница /projects/<slug>.
 *
 * Layout: hero-секция с моно-тегом, заголовком и числом объектов,
 * затем filter-row (Все / Насосные / Водоподготовка) и грид-сетка
 * 1/2/3 колонки с hairline-border-grid (как DocumentsGrid).
 *
 * Категория «Все» — default. Mixed-проекты учитываются при фильтре
 * pumps и water-treatment, чтобы не «прятать» их под одной из узких меток.
 */
export default function ProjectsPage() {
  const totalProjects = PROJECTS.length;

  return (
    <div className="bg-[var(--color-primary)] text-[var(--color-secondary)]">
      <section
        aria-labelledby="projects-title"
        className="relative border-b border-[var(--color-hairline)]"
      >
        <div className="mx-auto w-full max-w-[1440px] px-6 pb-12 pt-32 md:px-12 md:pb-20 md:pt-40">
          <p className="mono-tag">Объекты · {totalProjects.toString().padStart(2, "0")}</p>
          <h1
            id="projects-title"
            className="mt-6 max-w-[900px] font-display text-section font-medium tracking-[-0.02em]"
          >
            Где работают наши установки.
          </h1>
          <p className="mt-6 max-w-[640px] text-[var(--color-secondary)]/70 md:text-[18px] md:leading-[1.55]">
            Реализованные объекты с насосными станциями и системами
            водоподготовки ANHEL®. Жилые комплексы Setl Group и ПИК,
            медицинские комплексы, БЦ. Полный перечень — с указанием
            поставленного оборудования по каждому проекту.
          </p>

          {/* Suspense boundary required by Next 14 для useSearchParams
              в client-children при static prerender. fallback повторяет
              минимальный скелетон filter-row, чтобы не было layout shift. */}
          <Suspense
            fallback={
              <div className="mt-10 h-[44px] md:mt-14" aria-hidden="true" />
            }
          >
            <ProjectsFilter projects={PROJECTS} />
          </Suspense>
        </div>
      </section>

      <section
        aria-labelledby="projects-note-title"
        className="border-b border-[var(--color-hairline)]"
      >
        <div className="mx-auto w-full max-w-[1440px] px-6 py-16 md:px-12 md:py-20">
          <div className="grid gap-8 md:grid-cols-2 md:gap-16">
            <div>
              <p className="mono-tag">Примечание</p>
              <h2
                id="projects-note-title"
                className="mt-4 font-display text-h2 font-medium"
              >
                Не каждый объект полностью на нашем оборудовании.
              </h2>
            </div>
            <p className="text-[var(--color-secondary)]/70 md:text-[17px] md:leading-[1.6]">
              На больших проектах состав поставки часто меняется по очередям —
              где-то насосная ANHEL® со шкафом управления, где-то от сторонних
              брендов под требования заказчика. В карточке указано то, что
              физически было поставлено и смонтировано на конкретном объекте.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
