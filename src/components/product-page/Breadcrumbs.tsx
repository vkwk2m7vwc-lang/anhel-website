import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { BreadcrumbLink } from "@/content/products/types";

/**
 * Product-page breadcrumb trail.
 *
 * Renders `items` left-to-right with a thin chevron separator. The final
 * item is treated as the current page: rendered as plain text, not a
 * link, with reduced opacity. This matches how every premium B2B site
 * we're modelling after (Terminal, Mont-Fort, Resend) handles the trail
 * — no underlines, no pills, just quiet mono-cap breadcrumbs that read
 * as wayfinding, not navigation chrome.
 *
 * Accessibility: wrapped in a <nav aria-label="Breadcrumb"> + ordered
 * list with the last item marked `aria-current="page"`. Screen readers
 * announce the full trail and skip straight to the current page.
 */
export function Breadcrumbs({ items }: { items: readonly BreadcrumbLink[] }) {
  return (
    <nav aria-label="Хлебные крошки" className="font-mono text-[11px]">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 uppercase tracking-[0.08em]">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  data-cursor="hover"
                  className="text-[var(--color-secondary)]/65 transition-colors hover:text-[var(--color-secondary)]"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className="text-[var(--color-secondary)]/80"
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <ChevronRight
                  aria-hidden="true"
                  size={12}
                  strokeWidth={1.5}
                  className="text-[var(--color-secondary)]/55"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
