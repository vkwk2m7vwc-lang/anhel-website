"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { CasesContent, CaseItem } from "@/content/products/types";

/**
 * Cases carousel — section 9.
 *
 * 3-5 implemented-project cards laid out as a horizontal snap rail.
 * Each card: hero photo (placeholder until we have real shots), a
 * mono location line, the project title, and a one-liner equipment
 * summary. Photos use the same `src?:` pattern as GalleryRail so
 * "no file yet" is a first-class state, not a broken image.
 *
 * Why a rail, not a full grid: case lists grow over time — 3 today,
 * maybe 8 next year. A horizontal snap rail scales gracefully
 * without the heavy visual cost of a 2-row grid, and the same shape
 * slots onto other product pages without edge cases. Manual arrows
 * stay off the design in line with the Gallery decision.
 */
export function CasesCarousel({ content }: { content: CasesContent }) {
  return (
    <section
      id="cases"
      aria-labelledby="cases-title"
      className="relative border-t border-[var(--color-hairline)] bg-[var(--color-primary)]"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 py-20 md:px-12 md:py-28">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mono-tag">{content.tag}</p>
            <h2
              id="cases-title"
              className="mt-4 max-w-[640px] font-display text-h2 font-medium text-[var(--color-secondary)]"
            >
              {content.title}
            </h2>
          </div>
          {content.lede ? (
            <p className="max-w-[420px] text-sm text-[var(--color-secondary)]/60 md:text-right">
              {content.lede}
            </p>
          ) : null}
        </div>
      </div>

      <div className="relative">
        <ul className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-16 md:gap-8 md:px-12">
          {content.items.map((item, i) => (
            <CaseCard key={item.id} item={item} index={i} />
          ))}
          <li aria-hidden="true" className="shrink-0 pl-2" />
        </ul>
      </div>
    </section>
  );
}

function CaseCard({ item, index }: { item: CaseItem; index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
        delay: Math.min(index, 4) * 0.08,
      }}
      className="group shrink-0 snap-start"
    >
      <article className="flex w-[300px] flex-col gap-5 md:w-[440px] lg:w-[520px]">
        {/* Photo — 16:10 hero rectangle. Placeholder when no src. */}
        <div
          className="relative w-full overflow-hidden bg-[#141414]"
          style={{ aspectRatio: "16/10" }}
        >
          {item.photo?.src ? (
            <Image
              src={item.photo.src}
              alt={item.photo.alt}
              fill
              sizes="(min-width: 1024px) 520px, (min-width: 768px) 440px, 300px"
              className="object-cover transition-transform duration-[600ms] ease-out-expo group-hover:scale-[1.02]"
            />
          ) : (
            <CaseSkeleton />
          )}

          {/* Mono index sits in the top-left of the photo — same treatment
              as TechSpecsGrid/ApplicationsGrid, so the page feels cohesive
              even when it swaps from text blocks to imagery. */}
          <span
            aria-hidden="true"
            className="absolute left-4 top-4 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/70 md:left-6 md:top-6"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Copy block — location mono, title display, equipment line mono */}
        <div className="flex flex-col gap-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/65">
            {item.location}
          </p>
          <h3 className="font-display text-[22px] font-medium leading-tight text-[var(--color-secondary)] md:text-[26px]">
            {item.title}
          </h3>
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--color-secondary)]/60">
            {item.equipment}
          </p>
        </div>
      </article>
    </motion.li>
  );
}

function CaseSkeleton() {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(255,255,255,0.08) 0 1px, transparent 1px 12px)",
          backgroundSize: "16px 16px",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/55">
          Фото объекта
        </span>
      </div>
    </>
  );
}
