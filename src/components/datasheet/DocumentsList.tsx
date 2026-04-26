"use client";

import Link from "next/link";

/**
 * DocumentsList — table of file downloads with explicit type and
 * size, the way an engineer expects (think Mouser product page).
 *
 * Each row: file icon | name | type | size | download button.
 * The download is a hard link to the PDF, not a modal.
 */
export type DocItem = {
  /** Visible name */
  name: string;
  href: string;
  /** «PDF» / «STEP» / «DWG» — short uppercase tag */
  format: string;
  /** Human-readable size, e.g. «1.85 МБ». Empty allowed. */
  size?: string;
};

export function DocumentsList({ items }: { items: DocItem[] }) {
  return (
    <ul className="border-t border-[var(--color-hairline)]">
      {items.map((doc) => (
        <li
          key={doc.href + doc.name}
          className="border-b border-[var(--color-hairline)]"
        >
          <Link
            href={doc.href}
            data-cursor="hover"
            target="_blank"
            rel="noopener"
            className="group flex items-center gap-4 py-3 transition-colors hover:bg-[var(--color-surface-1)]"
          >
            {/* Format chip */}
            <span
              className="inline-flex h-7 min-w-[44px] items-center justify-center border border-[var(--color-hairline)] px-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/70"
            >
              {doc.format}
            </span>
            {/* File name */}
            <span className="flex-1 text-[14px] text-[var(--color-secondary)] group-hover:text-[var(--accent-water)]">
              {doc.name}
            </span>
            {/* Size */}
            {doc.size ? (
              <span className="font-mono text-[11px] tabular-nums text-[var(--color-secondary)]/55">
                {doc.size}
              </span>
            ) : null}
            {/* Download arrow */}
            <span
              aria-hidden="true"
              className="font-mono text-[12px] text-[var(--color-secondary)]/55 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[var(--accent-water)]"
            >
              ↓
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
