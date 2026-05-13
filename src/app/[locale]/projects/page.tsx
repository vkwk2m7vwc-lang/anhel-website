import type { Metadata } from "next";
import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PROJECTS } from "@/content/projects/data";
import { ProjectsFilter } from "@/components/projects/ProjectsFilter";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "projects.meta" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: "/projects" },
  };
}

/**
 * /projects — портфолио объектов.
 *
 * i18n: hero/note/filter — из `projects.*`. Заголовки карточек,
 * подписи к фото и строки оборудования резолвятся при рендере по
 * slug/EquipmentKey из `projects.items.<slug>` и
 * `projects.equipment_lines.<key>`.
 */
export default function ProjectsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = useTranslations("projects");
  const totalProjects = PROJECTS.length;

  return (
    <div className="bg-[var(--color-primary)] text-[var(--color-secondary)]">
      <section
        aria-labelledby="projects-title"
        className="relative border-b border-[var(--color-hairline)]"
      >
        <div className="mx-auto w-full max-w-[1440px] px-6 pb-12 pt-32 md:px-12 md:pb-20 md:pt-40">
          <p className="mono-tag">
            {t("hero.mono_tag", {
              count: totalProjects.toString().padStart(2, "0"),
            })}
          </p>
          <h1
            id="projects-title"
            className="mt-6 max-w-[900px] font-display text-section font-medium tracking-[-0.02em]"
          >
            {t("hero.title")}
          </h1>
          <p className="mt-6 max-w-[640px] text-[var(--color-secondary)]/70 md:text-[18px] md:leading-[1.55]">
            {t("hero.lede")}
          </p>

          {/* Suspense boundary required by Next 14 для useSearchParams. */}
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
              <p className="mono-tag">{t("note.mono_tag")}</p>
              <h2
                id="projects-note-title"
                className="mt-4 font-display text-h2 font-medium"
              >
                {t("note.title")}
              </h2>
            </div>
            <p className="text-[var(--color-secondary)]/70 md:text-[17px] md:leading-[1.6]">
              {t("note.body")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
