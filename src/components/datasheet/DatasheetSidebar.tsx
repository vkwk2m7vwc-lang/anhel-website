"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

/**
 * DatasheetSidebar — sticky left rail content.
 *
 * Components stack top → bottom:
 *
 *   1. Breadcrumb (one line) + designation badge («HVS-NU»)
 *   2. Product photo (compact, no glow, no spatial scene — this is
 *      a datasheet, not a museum)
 *   3. Title (small, 2 lines max) + meta (mono)
 *   4. KEY-SPEC strip — 4 chips of the most-asked params with values:
 *        Q макс ‧ H макс ‧ N макс ‧ T макс
 *   5. TOC — anchor links to right-rail sections, with a tiny
 *      indicator dot that activates as the visitor scrolls into
 *      that section (functional later; for now just a static list)
 *   6. QUICK-SPEC FORM — three inputs + submit. The engineer types
 *      their target Q / H / резервирование and submits without
 *      scrolling away from the data.
 *
 * The sidebar is the heart of this variant: it lets the visitor
 * spec the request the moment a number aligns, without losing
 * their place in the data table.
 */

export type DatasheetSidebarProps = {
  designation: string;
  breadcrumbHref: string;
  breadcrumbLabel: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  meta: string;
  /** Four headline params shown as compact chip strip. */
  keySpecs: Array<{ label: string; value: string; unit?: string }>;
  /** TOC entries — id matches the section anchor in the right rail. */
  toc: Array<{ id: string; label: string }>;
};

export function DatasheetSidebar({
  designation,
  breadcrumbHref,
  breadcrumbLabel,
  imageSrc,
  imageAlt,
  title,
  meta,
  keySpecs,
  toc,
}: DatasheetSidebarProps) {
  return (
    <div className="flex flex-col gap-8 pb-12 md:gap-6 md:pb-0">
      {/* Breadcrumb + designation badge */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href={breadcrumbHref}
          data-cursor="hover"
          className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-secondary)]/55 transition-colors hover:text-[var(--color-secondary)]"
        >
          ← {breadcrumbLabel}
        </Link>
        <span
          className="border border-[var(--color-hairline)] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/75"
          style={{ borderColor: "var(--accent-water)", color: "var(--accent-water)" }}
        >
          {designation}
        </span>
      </div>

      {/* Compact product photo — fixed aspect, no glow */}
      <div className="relative aspect-[4/5] w-full overflow-hidden border border-[var(--color-hairline)] bg-[var(--color-surface-1)]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 280px, (min-width: 768px) 240px, 100vw"
          className="object-contain"
          priority
        />
      </div>

      {/* Title + meta */}
      <div>
        <h1 className="font-display text-hero font-medium leading-snug text-[var(--color-secondary)]">
          {title}
        </h1>
        <p className="mt-2 font-mono text-[10px] uppercase leading-[1.6] tracking-[0.14em] text-[var(--color-secondary)]/55">
          {meta}
        </p>
      </div>

      {/* Key-spec chip strip — 2x2 grid, dense */}
      <div className="grid grid-cols-2 border border-[var(--color-hairline)]">
        {keySpecs.map((spec, i) => (
          <div
            key={spec.label}
            className={`p-3 ${i % 2 === 0 ? "border-r" : ""} ${i < 2 ? "border-b" : ""} border-[var(--color-hairline)]`}
          >
            <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--color-secondary)]/55">
              {spec.label}
            </div>
            <div className="mt-1 font-display text-h3 font-medium leading-tight text-[var(--color-secondary)]">
              {spec.value}
              {spec.unit ? (
                <span className="ml-1 text-[11px] font-normal text-[var(--color-secondary)]/55">
                  {spec.unit}
                </span>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      {/* TOC */}
      <nav aria-label="Содержание страницы">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-secondary)]/45">
          СОДЕРЖАНИЕ
        </p>
        <ul className="mt-3 flex flex-col">
          {toc.map((item) => (
            <li key={item.id}>
              <Link
                href={`#${item.id}`}
                className="flex items-center justify-between border-b border-[var(--color-hairline)] py-2 text-[13px] text-[var(--color-secondary)]/75 transition-colors hover:text-[var(--color-secondary)]"
              >
                <span>{item.label}</span>
                <span
                  aria-hidden="true"
                  className="font-mono text-[10px] text-[var(--color-secondary)]/35"
                >
                  ↓
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* QUICK-SPEC FORM — the engineer's elevator. Drops three
          target params + submits without leaving the rail. */}
      <QuickSpecForm />
    </div>
  );
}

/**
 * QuickSpecForm — three inputs, one submit. The «entrance»
 * version of the request flow. Submitting jumps to the full form
 * at the bottom with values pre-filled (no actual submit until the
 * backend lands; we wire just the smooth-scroll for now).
 */
function QuickSpecForm() {
  const [q, setQ] = useState("");
  const [h, setH] = useState("");
  const [redundancy, setRedundancy] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // Hand off to the full form anchor; values can travel via
        // localStorage in a future revision. For now the action is
        // a smooth scroll so the engineer sees the full form.
        if (typeof window !== "undefined") {
          window.location.hash = "request";
        }
      }}
      className="border border-[var(--color-hairline)] p-4"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-secondary)]/55">
        БЫСТРЫЙ ПОДБОР
      </p>
      <p className="mt-1 text-[13px] leading-snug text-[var(--color-secondary)]/70">
        Введите параметры ТЗ — пришлём подходящие конфигурации и КП.
      </p>

      <label className="mt-4 block">
        <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-secondary)]/55">
          Q, м³/ч
        </span>
        <input
          type="number"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="напр. 25"
          className="mt-1 block w-full border-b border-[var(--color-hairline)] bg-transparent py-1.5 text-[14px] text-[var(--color-secondary)] outline-none transition-colors placeholder:text-[var(--color-secondary)]/30 focus:border-[var(--accent-water)]"
        />
      </label>

      <label className="mt-3 block">
        <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-secondary)]/55">
          H, м
        </span>
        <input
          type="number"
          value={h}
          onChange={(e) => setH(e.target.value)}
          placeholder="напр. 80"
          className="mt-1 block w-full border-b border-[var(--color-hairline)] bg-transparent py-1.5 text-[14px] text-[var(--color-secondary)] outline-none transition-colors placeholder:text-[var(--color-secondary)]/30 focus:border-[var(--accent-water)]"
        />
      </label>

      <label className="mt-3 block">
        <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-secondary)]/55">
          РЕЗЕРВИРОВАНИЕ
        </span>
        <select
          value={redundancy}
          onChange={(e) => setRedundancy(e.target.value)}
          className="mt-1 block w-full border-b border-[var(--color-hairline)] bg-transparent py-1.5 text-[14px] text-[var(--color-secondary)] outline-none transition-colors focus:border-[var(--accent-water)]"
        >
          <option value="">— выбрать —</option>
          <option value="2">2 насоса (1 рабочий + 1 резерв)</option>
          <option value="3">3 насоса (2 рабочих + 1 резерв)</option>
          <option value="4">4 насоса (3 рабочих + 1 резерв)</option>
          <option value="5">5 насосов (4 рабочих + 1 резерв)</option>
          <option value="6">6 насосов (5 рабочих + 1 резерв)</option>
        </select>
      </label>

      <button
        type="submit"
        className="mt-5 inline-flex w-full items-center justify-between border border-[var(--accent-water)] bg-[var(--accent-water)] px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-white transition-opacity hover:opacity-85"
      >
        <span>ПРИСЛАТЬ ЗАПРОС</span>
        <span aria-hidden="true">→</span>
      </button>

      <p className="mt-3 font-mono text-[10px] uppercase leading-[1.6] tracking-[0.12em] text-[var(--color-secondary)]/45">
        Ответ от инженера за 15 минут в рабочее время.
      </p>
    </form>
  );
}
