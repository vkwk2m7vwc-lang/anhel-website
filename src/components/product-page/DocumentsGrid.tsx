"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type {
  DocumentsContent,
  DocumentItem,
} from "@/content/products/types";

/**
 * IDs of documents whose PDF body is RU-only. On non-RU locales we
 * surface a small "Original document (Russian)" line under the card
 * so the visitor isn't surprised when the file opens in Russian.
 *
 * `cert-deklaratsiya` — EAEU Declaration of Conformity (legally
 *  issued in Russian; translation is not permitted).
 *
 * NOT included (these are locale-swapped at the data layer — the
 * per-locale product content points at `*-en.pdf` / `*-tr.pdf`):
 *   - `oprosnik` — questionnaire, now has EN/TR variants
 *     (oprosnyi-list-en.pdf / -tr.pdf, PR feat/pdf-localization-wave-1)
 *   - `manual` — operating manual (manual-en.pdf / manual-tr.pdf)
 */
const RU_ONLY_DOC_IDS = new Set(["cert-deklaratsiya"]);

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
  // Если документов нет — секция полностью скрывается. Раньше пустые
  // ячейки 4-col грида рисовали серый прямоугольник справа от двух
  // реальных карточек на широком экране.
  const items = content.items.filter((d) => d.href);
  if (items.length === 0) return null;

  // Подбираем grid-cols по количеству карточек. 2 элемента → 2 колонки,
  // 3 → 3 колонки, 4+ → 4 колонки. Без пустых ячеек справа.
  const lgCols =
    items.length >= 4
      ? "lg:grid-cols-4"
      : items.length === 3
        ? "lg:grid-cols-3"
        : "lg:grid-cols-2";
  const smCols = items.length >= 2 ? "sm:grid-cols-2" : "sm:grid-cols-1";

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

        <ul
          className={`mt-12 grid grid-cols-1 gap-px bg-[var(--color-hairline)] md:mt-16 ${smCols} ${lgCols}`}
        >
          {items.map((doc, i) => (
            <DocCard key={doc.id} doc={doc} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function DocCard({ doc, index }: { doc: DocumentItem; index: number }) {
  const tUi = useTranslations("common.ui");
  const tDocs = useTranslations("documents.sections.certificates");
  const locale = useLocale();
  // Surface "Original document (Russian)" under RU-only cards on EN/TR.
  // Reuses the same translation key the /documents page uses for the
  // EAEU certificate badge so all "RU master" indicators read identically.
  const ruNote =
    locale !== "ru" && RU_ONLY_DOC_IDS.has(doc.id)
      ? tDocs("original_note")
      : undefined;

  // Static PDF / external file — plain <a>, NOT next-intl <Link>. The
  // i18n <Link> would prepend the locale prefix on EN/TR (→ /en/docs/…
  // → 404) and intercept the click for SPA routing on RU.
  //
  // Local PDFs get two actions: the card body opens the file inline in
  // a new tab (preview — `target="_blank"`, no `download` attribute,
  // the combination iOS Safari handles reliably) and a separate
  // bordered «Download» segment carries the `download` attribute.
  // `doc.external` links have no local file to save, so they keep the
  // single open-in-new-tab affordance.
  const cardBase = [
    "group relative flex bg-[var(--color-primary)] transition-colors duration-300",
    "min-h-[64px] flex-row items-stretch",
    "sm:min-h-[220px] sm:flex-col md:min-h-[260px]",
  ].join(" ");
  const accentRing = (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 ring-1 ring-transparent transition-[box-shadow,ring-color] duration-300 [@media(hover:hover)]:group-hover:ring-[var(--accent-current)]"
    />
  );

  if (doc.external) {
    return (
      <motion.li
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: Math.min(index, 3) * 0.06 }}
        className="relative"
      >
        <a
          href={doc.href}
          target="_blank"
          rel="noreferrer noopener"
          data-cursor="hover"
          className={`${cardBase} items-center gap-3 px-4 py-3 sm:items-stretch sm:justify-between sm:p-6 md:p-8 [@media(hover:hover)]:hover:bg-[var(--color-hover-tint)] active:ring-1 active:ring-[var(--accent-current)]`}
        >
          {accentRing}
          <CardMeta doc={doc} ruNote={ruNote} />
          <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/55 sm:mt-auto sm:ml-0">
            {tUi("open_external")} <span aria-hidden="true">→</span>
          </span>
        </a>
      </motion.li>
    );
  }

  return (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: Math.min(index, 3) * 0.06 }}
      className="relative"
    >
      <div className={cardBase}>
        {accentRing}
        {/* Preview — opens the PDF inline in a new tab. */}
        <a
          href={doc.href}
          target="_blank"
          rel="noreferrer noopener"
          data-cursor="hover"
          title={`${tUi("preview")} — ${doc.title}`}
          className="flex min-w-0 flex-1 flex-row items-center gap-3 px-4 py-3 transition-colors sm:flex-col sm:items-stretch sm:justify-between sm:gap-0 sm:p-6 md:p-8 [@media(hover:hover)]:hover:bg-[var(--color-hover-tint)] active:ring-1 active:ring-[var(--accent-current)]"
        >
          <CardMeta doc={doc} ruNote={ruNote} />
        </a>
        {/* Download — separate segment, forces save. Border-left on the
            mobile row, border-top on the sm+ block card. */}
        <a
          href={doc.href}
          download={doc.title}
          data-cursor="hover"
          aria-label={`${tUi("download")} — ${doc.title}`}
          title={`${tUi("download")} — ${doc.title}`}
          className="flex shrink-0 items-center justify-center gap-1.5 self-stretch border-l border-[var(--color-hairline)] px-4 text-[var(--color-secondary)]/60 transition-colors sm:self-auto sm:border-l-0 sm:border-t sm:px-6 sm:py-4 [@media(hover:hover)]:hover:bg-[var(--color-hover-tint)] [@media(hover:hover)]:hover:text-[var(--color-secondary)] active:text-[var(--accent-current)]"
        >
          <Download size={16} strokeWidth={1.5} aria-hidden="true" />
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.12em] sm:inline">
            {tUi("download")}
          </span>
        </a>
      </div>
    </motion.li>
  );
}

/** Shared inner content of a document card — PDF badge, title, size,
 *  and the optional «Original document (Russian)» note. */
function CardMeta({
  doc,
  ruNote,
}: {
  doc: DocumentItem;
  ruNote: string | undefined;
}) {
  return (
    <>
      {/* PDF badge: inline-left on mobile, top-row block on sm+. */}
      <div className="flex items-start gap-3 sm:justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/65 transition-colors [@media(hover:hover)]:group-hover:text-[var(--accent-current)] sm:text-[11px]">
          PDF
        </span>
        {doc.size ? (
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-secondary)]/65 sm:inline">
            {doc.size}
          </span>
        ) : null}
      </div>
      {/* Title + (mobile-inline size) + optional RU-only note. */}
      <div className="flex min-w-0 flex-1 flex-col gap-0.5 sm:mt-10 sm:flex-none sm:gap-4">
        <h3 className="font-display text-[13px] font-medium leading-snug text-[var(--color-secondary)] sm:text-[18px] md:text-[20px]">
          {doc.title}
        </h3>
        {doc.size ? (
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-secondary)]/55 sm:hidden">
            {doc.size}
          </span>
        ) : null}
        {ruNote ? (
          <span className="text-[11px] italic text-[var(--color-secondary)]/45 sm:text-xs">
            {ruNote}
          </span>
        ) : null}
      </div>
    </>
  );
}
