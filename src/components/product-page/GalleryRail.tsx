"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { GalleryContent, GalleryPhoto } from "@/content/products/types";

/**
 * Gallery rail — section 8.
 *
 * Horizontal photo lane with snap-scroll. Each tile is aspect-locked
 * (4:5 by default) so the rail stays visually stable regardless of
 * the underlying image size or whether a real file has landed yet.
 * When `photo.src` is missing we render a skeleton — a subtly
 * hatched rectangle that reads as "render pending" without shouting
 * about it; the surrounding typography (caption, index) ships in
 * full so the layout can be reviewed before the final shoot.
 *
 * On viewport <md the lane keeps its horizontal-scroll behaviour but
 * each tile sizes down so two are partially visible, hinting at the
 * scroll affordance. No manual prev/next buttons — the CustomCursor
 * drag + native scroll-snap carry the weight.
 */
export function GalleryRail({ content }: { content: GalleryContent }) {
  return (
    <section
      id="gallery"
      aria-labelledby="gallery-title"
      className="relative border-t border-[var(--color-hairline)] bg-[var(--color-primary)]"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 py-20 md:px-12 md:py-28">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mono-tag">{content.tag}</p>
            <h2
              id="gallery-title"
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

      {/* Rail is full-bleed — it ignores the 1440 max-width wrapper so
          the horizontal scroll feels like the product wants to walk off
          the edge. The inner padding matches the section for a clean
          left-alignment at rest. */}
      <div className="relative">
        <ul className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-16 pt-4 md:gap-8 md:px-12">
          {content.photos.map((photo, i) => (
            <GalleryTile key={photo.id} photo={photo} index={i} />
          ))}
          {/* Trailing spacer so the last tile can fully snap to the left
              edge rather than ending against the right viewport wall. */}
          <li aria-hidden="true" className="shrink-0 pl-2" />
        </ul>
      </div>
    </section>
  );
}

function GalleryTile({ photo, index }: { photo: GalleryPhoto; index: number }) {
  const aspect = photo.aspect ?? "4/5";

  return (
    <motion.li
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: Math.min(index, 5) * 0.05,
      }}
      className="shrink-0 snap-start"
    >
      <div
        className="relative w-[240px] overflow-hidden bg-[#141414] md:w-[360px] lg:w-[420px]"
        style={{ aspectRatio: aspect }}
      >
        {photo.src ? (
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 1024px) 420px, (min-width: 768px) 360px, 240px"
            className="object-cover"
          />
        ) : (
          <GallerySkeleton />
        )}
      </div>

      {/* Caption row — mono index on the left, caption on the right.
          Keeps both visible even when the image itself is a skeleton
          so the layout reads as intended during review. */}
      <div className="mt-4 flex items-start justify-between gap-4">
        <span
          aria-hidden="true"
          className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/65"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        {photo.caption ? (
          <span className="max-w-[280px] text-right text-[12px] text-[var(--color-secondary)]/60 md:text-sm">
            {photo.caption}
          </span>
        ) : null}
      </div>
    </motion.li>
  );
}

/**
 * Skeleton — a faint diagonal-hatched block that reads as "awaiting
 * content" without drawing attention. Uses a single `linear-gradient`
 * stripe over the darker tile colour so the cost is one extra paint,
 * no images.
 */
function GallerySkeleton() {
  return (
    <>
      {/* Diagonal hatch — reads as "draft / awaiting content" */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(255,255,255,0.08) 0 1px, transparent 1px 12px)",
          backgroundSize: "16px 16px",
        }}
      />
      {/* Centre label so the skeleton is unambiguous at a glance */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/55">
          Фото появится
        </span>
      </div>
    </>
  );
}
