import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PROJECTS, getProjectBySlug } from "@/content/projects/data";
import { locales } from "@/i18n";

type Params = { locale: string; slug: string };

/**
 * Pre-render every (locale × slug) pair so each route is statically
 * available at /ru/projects/<slug>, /en/projects/<slug>, /tr/projects/<slug>.
 */
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  // Next collects this list once per [locale] segment; returning the
  // slug-only objects is enough — the [locale] params come from the
  // parent route segment.
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "projects",
  });
  const project = getProjectBySlug(params.slug);
  if (!project) return { title: t("detail.not_found_title") };

  const title = t(`items.${project.slug}.title` as never);
  const equipment = project.equipment
    .map((k) => t(`equipment_lines.${k}` as never))
    .join(", ");

  return {
    title: t("detail.meta_title_template", { title }),
    description: t("detail.meta_description_template", { title, equipment }),
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

/**
 * /projects/<slug> — детальная страница объекта.
 *
 * i18n: title/equipment/coverAlt подтягиваются по slug/EquipmentKey
 * из `projects.items.<slug>` и `projects.equipment_lines.<key>`.
 * Категория переводится через `projects.category_labels.<category>`.
 *
 * Locale `locales` импортируется только для статической типизации
 * — `setRequestLocale` принимает значение из params (валидация
 * выполнена middleware-ом).
 */
export default function ProjectDetailPage({ params }: { params: Params }) {
  setRequestLocale(params.locale);
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const t = useTranslations("projects");
  const tItems = useTranslations("projects.items");
  const tEquipment = useTranslations("projects.equipment_lines");
  const tCovers = useTranslations("projects.cover_alt_suffix");
  const tCats = useTranslations("projects.category_labels");

  const otherProjects = PROJECTS.filter(
    (p) => p.slug !== project.slug,
  ).slice(0, 4);

  const title = tItems(`${project.slug}.title` as never) as string;
  const coverSuffixKey = tItems(`${project.slug}.cover_alt_suffix` as never) as string;
  const coverAlt = `${title} — ${tCovers(coverSuffixKey as never)}`;

  // Touching `locales` keeps the import non-dead for build-time
  // verification that the locale param matches the configured set.
  void locales;

  return (
    <article className="bg-[var(--color-primary)] text-[var(--color-secondary)]">
      {/* Top breadcrumb / back-link */}
      <div className="mx-auto w-full max-w-[1440px] px-6 pt-28 md:px-12 md:pt-36">
        <Link
          href="/projects"
          data-cursor="hover"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-secondary)]/65 transition-colors hover:text-[var(--color-secondary)]"
        >
          <ArrowLeft size={14} strokeWidth={1.5} aria-hidden="true" />
          {t("detail.back_link")}
        </Link>
      </div>

      {/* Hero */}
      <header
        aria-labelledby="project-title"
        className="mx-auto w-full max-w-[1440px] px-6 pb-12 pt-8 md:px-12 md:pb-20 md:pt-12"
      >
        <p className="mono-tag">{tCats(project.category)}</p>
        <h1
          id="project-title"
          className="mt-6 max-w-[1100px] font-display text-section font-medium tracking-[-0.02em]"
        >
          {title}
        </h1>

        <div className="relative mt-12 aspect-[16/9] w-full overflow-hidden bg-[var(--color-image-placeholder)] md:mt-16">
          <Image
            src={project.cover}
            alt={coverAlt}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
        </div>
      </header>

      {/* Equipment list */}
      <section
        aria-labelledby="equipment-title"
        className="border-y border-[var(--color-hairline)]"
      >
        <div className="mx-auto w-full max-w-[1440px] px-6 py-16 md:px-12 md:py-24">
          <div className="grid gap-10 md:grid-cols-[280px_1fr] md:gap-16">
            <div>
              <p className="mono-tag">{t("detail.equipment_tag")}</p>
              <h2
                id="equipment-title"
                className="mt-4 font-display text-h2 font-medium"
              >
                {t("detail.equipment_title")}
              </h2>
              <p className="mt-4 max-w-[260px] text-sm text-[var(--color-secondary)]/60">
                {t("detail.equipment_caption")}
              </p>
            </div>

            <ul className="flex flex-col">
              {project.equipment.map((key, i) => (
                <li
                  key={key}
                  className="flex gap-6 border-b border-[var(--color-hairline)] py-4 last:border-b-0 md:py-6"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-secondary)]/50">
                    {(i + 1).toString().padStart(2, "0")}
                  </span>
                  <span className="text-[15px] leading-snug text-[var(--color-secondary)]/90 md:text-[17px]">
                    {tEquipment(key)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Other projects strip */}
      <section
        aria-labelledby="other-projects-title"
        className="border-b border-[var(--color-hairline)]"
      >
        <div className="mx-auto w-full max-w-[1440px] px-6 py-16 md:px-12 md:py-20">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mono-tag">{t("detail.other_tag")}</p>
              <h2
                id="other-projects-title"
                className="mt-4 font-display text-h2 font-medium"
              >
                {t("detail.other_title")}
              </h2>
            </div>
            <Link
              href="/projects"
              data-cursor="hover"
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-secondary)]/65 transition-colors hover:text-[var(--color-secondary)]"
            >
              {t("detail.other_all_link")}
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <ul className="mt-10 grid grid-cols-1 gap-px bg-[var(--color-hairline)] sm:grid-cols-2 md:mt-14 lg:grid-cols-4">
            {otherProjects.map((p) => {
              const pTitle = tItems(`${p.slug}.title` as never) as string;
              const pSuffix = tItems(`${p.slug}.cover_alt_suffix` as never) as string;
              const pAlt = `${pTitle} — ${tCovers(pSuffix as never)}`;
              return (
                <li key={p.slug} className="bg-[var(--color-primary)]">
                  <Link
                    href={`/projects/${p.slug}`}
                    data-cursor="hover"
                    className="group flex h-full flex-col"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--color-image-placeholder)]">
                      <Image
                        src={p.cover}
                        alt={pAlt}
                        fill
                        sizes="(min-width: 1024px) 25vw, 50vw"
                        className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-2 p-5">
                      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/60">
                        {tCats(p.category)}
                      </span>
                      <p className="font-display text-[16px] font-medium leading-snug">
                        {pTitle}
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </article>
  );
}
