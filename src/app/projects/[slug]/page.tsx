import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  PROJECTS,
  PROJECT_CATEGORY_LABELS,
  getProjectBySlug,
} from "@/content/projects/data";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);
  if (!project) return { title: "Объект не найден" };
  return {
    title: `${project.title} — объект ANHEL®`,
    description: `${project.title} (${project.customer}) — поставлено: ${project.equipment.join(", ")}`,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

/**
 * /projects/<slug> — детальная страница объекта.
 *
 * Layout:
 *   01 Breadcrumb + back-link
 *   02 Hero: cover-фото на всю ширину, поверх — заказчик и название
 *   03 Equipment table — полный перечень поставленного оборудования
 *   04 Footer: link «Все объекты» + soft CTA «Запросить расчёт»
 *
 * Тон страницы — engineering-документация, не маркетинговый питч.
 * Минимум воды, максимум фактов из реестра.
 */
export default function ProjectDetailPage({ params }: { params: Params }) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const otherProjects = PROJECTS.filter(
    (p) => p.slug !== project.slug,
  ).slice(0, 4);

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
          Все объекты
        </Link>
      </div>

      {/* Hero */}
      <header
        aria-labelledby="project-title"
        className="mx-auto w-full max-w-[1440px] px-6 pb-12 pt-8 md:px-12 md:pb-20 md:pt-12"
      >
        <p className="mono-tag">
          {project.customer} · {PROJECT_CATEGORY_LABELS[project.category]}
        </p>
        <h1
          id="project-title"
          className="mt-6 max-w-[1100px] font-display text-section font-medium tracking-[-0.02em]"
        >
          {project.title}
        </h1>

        <div className="relative mt-12 aspect-[16/9] w-full overflow-hidden bg-[#0F0F0F] md:mt-16">
          <Image
            src={project.cover}
            alt={project.coverAlt}
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
              <p className="mono-tag">01 · ПОСТАВЛЕНО</p>
              <h2
                id="equipment-title"
                className="mt-4 font-display text-h2 font-medium"
              >
                Оборудование
              </h2>
              <p className="mt-4 max-w-[260px] text-sm text-[var(--color-secondary)]/60">
                Состав поставки на объекте. Спроектировано и собрано под ТЗ
                проекта.
              </p>
            </div>

            <ul className="flex flex-col">
              {project.equipment.map((line, i) => (
                <li
                  key={line}
                  className="flex gap-6 border-b border-[var(--color-hairline)] py-4 last:border-b-0 md:py-6"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-secondary)]/50">
                    {(i + 1).toString().padStart(2, "0")}
                  </span>
                  <span className="text-[15px] leading-snug text-[var(--color-secondary)]/90 md:text-[17px]">
                    {line}
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
              <p className="mono-tag">02 · ДРУГИЕ ОБЪЕКТЫ</p>
              <h2
                id="other-projects-title"
                className="mt-4 font-display text-h2 font-medium"
              >
                Похожие реализации
              </h2>
            </div>
            <Link
              href="/projects"
              data-cursor="hover"
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-secondary)]/65 transition-colors hover:text-[var(--color-secondary)]"
            >
              Все объекты
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <ul className="mt-10 grid grid-cols-1 gap-px bg-[var(--color-hairline)] sm:grid-cols-2 md:mt-14 lg:grid-cols-4">
            {otherProjects.map((p) => (
              <li key={p.slug} className="bg-[var(--color-primary)]">
                <Link
                  href={`/projects/${p.slug}`}
                  data-cursor="hover"
                  className="group flex h-full flex-col"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0F0F0F]">
                    <Image
                      src={p.cover}
                      alt={p.coverAlt}
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/60">
                      {p.customer}
                    </span>
                    <p className="font-display text-[16px] font-medium leading-snug">
                      {p.title}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}
