"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Видеоплеер для раздела «Производство» — слой-фон с автозапуском,
 * без звука, с loop и оптимизацией под мобильные / reduced-motion.
 *
 * Поведение:
 *   - SSR / first paint: показываем poster JPG (быстрая первая отрисовка).
 *   - Когда контейнер попадает в зону видимости (200px до viewport),
 *     инициализируем <video> и начинаем грузить metadata + первый сегмент.
 *   - На viewport `< 768px` подкладываем `<source>` на mobile-файл.
 *   - `prefers-reduced-motion: reduce` — видео не инициализируется
 *     никогда, остаётся только poster.
 *
 * Файлы:
 *   - {base}.webm           — основной для современных браузеров (VP9)
 *   - {base}.mp4            — fallback (Safari iOS, старые)
 *   - {base}-mobile.mp4     — лёгкий 640px вариант для < 768px
 *   - {base}-poster.jpg     — статичный кадр (always)
 *
 * Все треки — без аудио (-an в ffmpeg), 8с loop, 30 fps.
 *
 * Назначение в DOM:
 *   - `aria-hidden="true"` — декоративный fill, не озвучивается
 *     скринридерами; смыслонесущая подпись передаётся отдельно через
 *     визуально-читаемый текст рядом с видео.
 */
export function ProductionVideoPlayer({
  base,
  poster,
  aspectClass,
  className = "",
  rounded = false,
}: {
  /** Имя файла без расширения, относительно `/videos/production/` */
  base: string;
  /** Имя файла постера, относительно `/videos/production/` */
  poster: string;
  /** Tailwind-классы соотношения сторон контейнера (например, "aspect-[21/9]") */
  aspectClass: string;
  className?: string;
  /** Скруглять ли углы контейнера (для inline-видео в середине раздела) */
  rounded?: boolean;
}) {
  const prefersReduced = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Lazy: загружаем видео только когда контейнер близок к viewport.
  useEffect(() => {
    if (prefersReduced) return;
    const el = containerRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReduced]);

  // Mobile detection — для выбора облегчённого источника на <768px.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const posterUrl = `/videos/production/${poster}`;

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden bg-black ${aspectClass} ${
        rounded ? "rounded-md" : ""
      } ${className}`}
      aria-hidden="true"
    >
      {/* Постер виден сразу: до момента, когда видео реально начало
          играть, и всегда — при reduced motion. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={posterUrl}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        decoding="async"
      />

      {shouldLoad && !prefersReduced ? (
        <video
          key={isMobile ? "mobile" : "desktop"}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={posterUrl}
        >
          {/* Mobile: только лёгкий 640px mp4 — webm/desktop пропускаем. */}
          {isMobile ? (
            <source
              src={`/videos/production/${base}-mobile.mp4`}
              type="video/mp4"
            />
          ) : (
            <>
              <source src={`/videos/production/${base}.webm`} type="video/webm" />
              <source src={`/videos/production/${base}.mp4`} type="video/mp4" />
            </>
          )}
        </video>
      ) : null}
    </div>
  );
}
