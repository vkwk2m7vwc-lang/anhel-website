"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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
 * Tile sizes deliberately mirror CasesCarousel below — same visual
 * weight on the page, no jarring step-down between sections. Click
 * any tile → fullscreen lightbox with arrow + ESC nav.
 *
 * On viewport <md the lane keeps its horizontal-scroll behaviour but
 * each tile sizes down so two are partially visible, hinting at the
 * scroll affordance. No manual prev/next buttons — the CustomCursor
 * drag + native scroll-snap carry the weight.
 */
export function GalleryRail({ content }: { content: GalleryContent }) {
  // Реальные фото с filename. Skeleton-плейсхолдеры (без `src`) больше
  // не показываются — заказчик попросил убрать заглушки до появления
  // реальных снимков. Если у продукта вообще нет фото — секция
  // скрывается целиком.
  const photos = content.photos.filter((p) => p.src);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((idx: number) => setLightboxIndex(idx), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const next = useCallback(
    () =>
      setLightboxIndex((i) =>
        i === null ? null : (i + 1) % photos.length
      ),
    [photos.length]
  );
  const prev = useCallback(
    () =>
      setLightboxIndex((i) =>
        i === null ? null : (i - 1 + photos.length) % photos.length
      ),
    [photos.length]
  );

  // Keyboard nav — only when lightbox is open
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    // Lock body scroll while lightbox is open
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxIndex, closeLightbox, next, prev]);

  if (photos.length === 0) return null;

  return (
    <>
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
            {photos.map((photo, i) => (
              <GalleryTile
                key={photo.id}
                photo={photo}
                index={i}
                onOpen={() => openLightbox(i)}
              />
            ))}
            {/* Trailing spacer so the last tile can fully snap to the left
                edge rather than ending against the right viewport wall. */}
            <li aria-hidden="true" className="shrink-0 pl-2" />
          </ul>
        </div>
      </section>

      <Lightbox
        photos={photos}
        index={lightboxIndex}
        onClose={closeLightbox}
        onNext={next}
        onPrev={prev}
      />
    </>
  );
}

function GalleryTile({
  photo,
  index,
  onOpen,
}: {
  photo: GalleryPhoto;
  index: number;
  onOpen: () => void;
}) {
  const tUi = useTranslations("common.ui");
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
      className="group shrink-0 snap-start"
    >
      <button
        type="button"
        onClick={onOpen}
        data-cursor="hover"
        aria-label={tUi("gallery.open_photo", { n: index + 1 })}
        className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary)]/60"
      >
        {/* Tile widths match CasesCarousel below (200/280/340) — keeps
            two horizontal photo sections visually paired rather than
            stepping down jarringly. Click → lightbox. */}
        <div
          className="relative w-[200px] overflow-hidden bg-[#141414] md:w-[280px] lg:w-[340px]"
          style={{ aspectRatio: aspect }}
        >
          {photo.src ? (
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 1024px) 340px, (min-width: 768px) 280px, 200px"
              className="object-cover transition-transform duration-[600ms] ease-out-expo group-hover:scale-[1.04]"
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
      </button>
    </motion.li>
  );
}

/**
 * Lightbox — fullscreen modal showing the active photo at intrinsic
 * aspect ratio. Backdrop = primary bg at 95% opacity; image is centred
 * with object-contain so wide и tall photos both fit без обрезки.
 *
 * Nav: ←/→ keys, ESC to close, click outside image OR × button.
 * Mobile-friendly: tap area for prev/next via on-image taps could be
 * добавить позже — пока полагаемся на arrow buttons и swipe.
 */
function Lightbox({
  photos,
  index,
  onClose,
  onNext,
  onPrev,
}: {
  photos: GalleryPhoto[];
  index: number | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const tUi = useTranslations("common.ui");
  return (
    <AnimatePresence>
      {index !== null ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--color-primary)]/95 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={tUi("gallery.viewer_label")}
        >
          {/* Close button — top right */}
          <button
            type="button"
            onClick={onClose}
            data-cursor="hover"
            aria-label={tUi("gallery.close")}
            className="absolute right-6 top-6 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-secondary)]/20 bg-[var(--color-primary)]/60 text-[var(--color-secondary)] transition-colors hover:border-[var(--color-secondary)]/60 md:right-10 md:top-10"
          >
            <span aria-hidden="true" className="text-xl leading-none">×</span>
          </button>

          {/* Index counter — top left */}
          <div className="absolute left-6 top-6 z-10 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/70 md:left-10 md:top-10">
            {String(index + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
          </div>

          {/* Prev arrow */}
          {photos.length > 1 ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              data-cursor="hover"
              aria-label={tUi("gallery.prev")}
              className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--color-secondary)]/20 bg-[var(--color-primary)]/60 font-mono text-[var(--color-secondary)] transition-colors hover:border-[var(--color-secondary)]/60 md:left-10"
            >
              <span aria-hidden="true">←</span>
            </button>
          ) : null}

          {/* Image — клик внутри изображения не закрывает (stopPropagation).
              max-w-[1440px] чтобы не растягивать сильно на 4K мониторах.
              max-h-[85vh] чтобы оставить дыхание сверху и снизу. */}
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative mx-4 flex max-h-[85vh] w-full max-w-[1440px] items-center justify-center md:mx-20"
          >
            <div className="relative w-full" style={{ maxHeight: "85vh" }}>
              {photos[index].src ? (
                /* Используем native <img> вместо next/image — нужен
                   intrinsic aspect ratio без принудительного размера
                   контейнера. object-contain в комбинации с max-h ниже
                   гарантирует что фото никогда не обрежется. */
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={photos[index].src}
                  alt={photos[index].alt}
                  className="mx-auto block max-h-[85vh] w-auto object-contain"
                />
              ) : null}
            </div>
          </motion.div>

          {/* Next arrow */}
          {photos.length > 1 ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              data-cursor="hover"
              aria-label={tUi("gallery.next")}
              className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--color-secondary)]/20 bg-[var(--color-primary)]/60 font-mono text-[var(--color-secondary)] transition-colors hover:border-[var(--color-secondary)]/60 md:right-10"
            >
              <span aria-hidden="true">→</span>
            </button>
          ) : null}
        </motion.div>
      ) : null}
    </AnimatePresence>
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
