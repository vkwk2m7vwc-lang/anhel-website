"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type {
  DocumentsContent,
  DocumentItem,
} from "@/content/products/types";

/**
 * Documents grid — section 11.
 *
 * 3–4 PDF cards arranged in a responsive grid. Each card is a real
 * anchor (download when the href is relative and the browser can
 * resolve it, new-tab when the `external` flag is set). Layout is
 * minimal on purpose — the engineering audience is here to collect
 * PDFs, not to enjoy animations.
 *
 * Visual shell: hairline card, mono file-size line, big download icon
 * on hover — nothing that distracts from the primary action. Same
 * `gap-px bg-hairline` cell-border trick as the other grids.
 */
export function DocumentsGrid({ content }: { content: DocumentsContent }) {
  return (
    <section
      id="documents"
      aria-labelledby="documents-title"
      className="relative border-t border-[var(--color-hairline)] bg-[var(--color-primary)]"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 py-20 md:px-12 md:py-28">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mono-tag">{content.tag}</p>
            <h2
              id="documents-title"
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

        {/* 1 × 4 → 2 × 2 → 4 × 1. Works cleanly with either 3 or 4 items. */}
        <ul className="mt-12 grid grid-cols-1 gap-px bg-[var(--color-hairline)] md:mt-16 md:grid-cols-2 lg:grid-cols-4">
          {content.items.map((doc, i) => (
            <DocCard key={doc.id} doc={doc} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function DocCard({ doc, index }: { doc: DocumentItem; index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1],
        delay: Math.min(index, 3) * 0.06,
      }}
      className="relative"
    >
      <Link
        href={doc.href}
        target={doc.external ? "_blank" : undefined}
        rel={doc.external ? "noreferrer noopener" : undefined}
        data-cursor="hover"
        download={doc.external ? undefined : doc.title}
        className="group relative flex min-h-[220px] flex-col justify-between bg-[var(--color-primary)] p-6 transition-colors duration-300 hover:bg-[#111] md:min-h-[260px] md:p-8"
      >
        {/* Accent ring — same language as the Applications/Advantages
            grids, so every card on the page reads as a single family. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 ring-1 ring-transparent transition-[box-shadow,ring-color] duration-300 group-hover:ring-[var(--accent-current)]"
        />

        {/* Top row: PDF badge + file size. Badge is plain text (`PDF`) in
            the accent-current ink on hover; helps the card read as a
            document at a glance. */}
        <div className="flex items-start justify-between gap-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/40 transition-colors group-hover:text-[var(--accent-current)]">
            PDF
          </span>
          {doc.size ? (
            <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-secondary)]/40">
              {doc.size}
            </span>
          ) : null}
        </div>

        {/* Title + download affordance */}
        <div className="mt-10 flex flex-col gap-4">
          <h3 className="font-display text-[18px] font-medium leading-snug text-[var(--color-secondary)] md:text-[20px]">
            {doc.title}
          </h3>
          <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/55 transition-colors group-hover:text-[var(--color-secondary)]">
            {doc.external ? "Открыть" : "Скачать"}
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
            >
              →
            </span>
          </span>
        </div>
      </Link>
    </motion.li>
  );
}
