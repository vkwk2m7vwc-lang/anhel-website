/**
 * Branded PDF questionnaire generator (server-side, Node runtime).
 *
 * Why not the Python `_scripts/build_*_questionnaire.py` generators:
 *   they run reportlab/PyMuPDF — Python isn't available on Vercel's
 *   serverless runtime. Filling the existing AcroForm masters was viable
 *   for 4 of the quizzes but the control-systems master is the
 *   un-rebranded MFMC original (generic field names), so a single
 *   reliable codepath wins: this builds the PDF from scratch with
 *   `pdf-lib` (pure JS, zero native deps) in the same light B2B visual
 *   language as the v2 email — ANHEL header, product accent rule,
 *   contact panel, fields grouped by step, auto-paginated.
 *
 * Cyrillic: DejaVu Sans / Sans-Bold TTFs are bundled into the /api
 * function via `outputFileTracingIncludes` (next.config.mjs) and read
 * from disk here.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { PDFDocument, rgb, type PDFFont, type PDFPage } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import type { EmailCustomer, EmailLocale, EmailSection } from '@/lib/email/payload';

const LOCALE_LABEL: Record<EmailLocale, string> = { ru: 'RU', en: 'EN', tr: 'TR' };

// Light B2B palette — mirrors the v2 email (_layout.ts).
const TEXT = rgb(0.1, 0.1, 0.1);
const HEADING = rgb(0.04, 0.04, 0.04);
const MUTED = rgb(0.43, 0.43, 0.43);
const HAIRLINE = rgb(0.85, 0.85, 0.85);
const PANEL = rgb(0.965, 0.965, 0.96);

const A4 = { w: 595.28, h: 841.89 };
const MARGIN = 48;
const CONTENT_W = A4.w - MARGIN * 2;
const LABEL_W = 200; // left column
const VALUE_X = MARGIN + LABEL_W + 14;
const VALUE_W = A4.w - MARGIN - VALUE_X;
const BOTTOM_LIMIT = MARGIN + 28; // keep clear of the footer

function hexToRgb(hex: string) {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.replace(/(.)/g, '$1$1') : h, 16);
  return rgb(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
}

/** Greedy word-wrap to a max width. Falls back to hard-splitting very long words. */
function wrapText(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
  const out: string[] = [];
  for (const rawLine of String(text ?? '').split(/\r?\n/)) {
    const words = rawLine.split(/\s+/).filter(Boolean);
    if (words.length === 0) {
      out.push('');
      continue;
    }
    let line = '';
    for (const word of words) {
      const probe = line ? `${line} ${word}` : word;
      if (font.widthOfTextAtSize(probe, size) <= maxWidth) {
        line = probe;
        continue;
      }
      if (line) out.push(line);
      // word itself wider than the column — hard-split it
      if (font.widthOfTextAtSize(word, size) > maxWidth) {
        let chunk = '';
        for (const ch of word) {
          if (font.widthOfTextAtSize(chunk + ch, size) > maxWidth) {
            out.push(chunk);
            chunk = ch;
          } else {
            chunk += ch;
          }
        }
        line = chunk;
      } else {
        line = word;
      }
    }
    if (line) out.push(line);
  }
  return out.length ? out : [''];
}

export type QuestionnairePdfData = {
  /** Full document title, e.g. "Опросный лист — БИТП". */
  documentTitle: string;
  /** Product accent hex — tints the rule, ® mark, section labels. */
  accentHex: string;
  /** Visitor UI locale — shown as a tag, like the email. */
  locale: EmailLocale;
  customer: EmailCustomer;
  /** Ordered, pre-formatted sections (Russian labels from the source config). */
  sections: EmailSection[];
};

/**
 * Render the questionnaire PDF. Returns the raw bytes (Uint8Array) —
 * the caller wraps it in a Buffer for the Resend attachment.
 */
export async function buildQuestionnairePdf(
  data: QuestionnairePdfData,
): Promise<Uint8Array> {
  const accent = hexToRgb(data.accentHex);

  const fontsDir = path.join(process.cwd(), 'src/lib/pdf/fonts');
  const regularBytes = readFileSync(path.join(fontsDir, 'DejaVuSans.ttf'));
  const boldBytes = readFileSync(path.join(fontsDir, 'DejaVuSans-Bold.ttf'));

  const pdf = await PDFDocument.create();
  pdf.registerFontkit(fontkit);
  const regular = await pdf.embedFont(regularBytes, { subset: true });
  const bold = await pdf.embedFont(boldBytes, { subset: true });

  pdf.setTitle(data.documentTitle);
  pdf.setProducer('ANHEL anhelspb.com');
  pdf.setCreator('ANHEL anhelspb.com');

  let page: PDFPage = pdf.addPage([A4.w, A4.h]);
  let y = A4.h - MARGIN;

  /** Draw the page footer (called for every page at the very end). */
  const drawFooter = (p: PDFPage, n: number, total: number) => {
    p.drawLine({
      start: { x: MARGIN, y: MARGIN + 16 },
      end: { x: A4.w - MARGIN, y: MARGIN + 16 },
      thickness: 0.75,
      color: HAIRLINE,
    });
    p.drawText('ANHEL® · ООО «ПРОФИТ» · anhelspb.com · info@anhelspb.com', {
      x: MARGIN,
      y: MARGIN + 4,
      size: 7.5,
      font: regular,
      color: MUTED,
    });
    const pageLabel = `${n} / ${total}`;
    p.drawText(pageLabel, {
      x: A4.w - MARGIN - regular.widthOfTextAtSize(pageLabel, 7.5),
      y: MARGIN + 4,
      size: 7.5,
      font: regular,
      color: MUTED,
    });
  };

  /** Move to a fresh page when the current one is full. */
  const newPage = () => {
    page = pdf.addPage([A4.w, A4.h]);
    y = A4.h - MARGIN;
  };
  const ensure = (needed: number) => {
    if (y - needed < BOTTOM_LIMIT) newPage();
  };

  // ── Header: ANHEL logo + locale tag ──────────────────────────────
  page.drawText('ANHEL', { x: MARGIN, y: y - 16, size: 18, font: bold, color: HEADING });
  const anhelW = bold.widthOfTextAtSize('ANHEL', 18);
  page.drawText('®', {
    x: MARGIN + anhelW + 1,
    y: y - 10,
    size: 9,
    font: bold,
    color: accent,
  });
  const localeText = `ЯЗЫК: ${LOCALE_LABEL[data.locale]}`;
  page.drawText(localeText, {
    x: A4.w - MARGIN - regular.widthOfTextAtSize(localeText, 9),
    y: y - 14,
    size: 9,
    font: regular,
    color: MUTED,
  });
  y -= 30;

  // accent rule
  page.drawRectangle({ x: MARGIN, y: y - 3, width: CONTENT_W, height: 3, color: accent });
  y -= 22;

  // ── Title + timestamp ────────────────────────────────────────────
  for (const line of wrapText(data.documentTitle, bold, 15, CONTENT_W)) {
    page.drawText(line, { x: MARGIN, y: y - 13, size: 15, font: bold, color: HEADING });
    y -= 19;
  }
  const ts = new Intl.DateTimeFormat('ru-RU', {
    timeZone: 'Europe/Moscow',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date());
  page.drawText(`${ts} МСК`, { x: MARGIN, y: y - 10, size: 9, font: regular, color: MUTED });
  y -= 26;

  // ── Contact panel ────────────────────────────────────────────────
  const c = data.customer;
  const contactRows: Array<[string, string]> = [];
  if (c.company) contactRows.push(['Компания', c.company]);
  contactRows.push(['Контактное лицо', c.name]);
  if (c.position) contactRows.push(['Должность', c.position]);
  if (c.phone) contactRows.push(['Телефон', c.phone]);
  if (c.email) contactRows.push(['E-mail', c.email]);
  if (c.city) contactRows.push(['Город', c.city]);
  if (c.objectName) contactRows.push(['Объект', c.objectName]);
  if (c.objectAddress) contactRows.push(['Адрес объекта', c.objectAddress]);

  const panelPadding = 14;
  const panelRowH = 16;
  const panelH = panelPadding * 2 + 18 + contactRows.length * panelRowH;
  ensure(panelH + 10);
  page.drawRectangle({
    x: MARGIN,
    y: y - panelH,
    width: CONTENT_W,
    height: panelH,
    color: PANEL,
    borderColor: HAIRLINE,
    borderWidth: 0.75,
  });
  page.drawRectangle({ x: MARGIN, y: y - panelH, width: 3, height: panelH, color: accent });
  let py = y - panelPadding - 8;
  page.drawText('КОНТАКТ', { x: MARGIN + panelPadding, y: py, size: 8.5, font: bold, color: accent });
  py -= 18;
  for (const [label, value] of contactRows) {
    page.drawText(label, {
      x: MARGIN + panelPadding,
      y: py,
      size: 9,
      font: regular,
      color: MUTED,
    });
    page.drawText(String(value), {
      x: MARGIN + panelPadding + 130,
      y: py,
      size: 9.5,
      font: regular,
      color: TEXT,
    });
    py -= panelRowH;
  }
  y -= panelH + 24;

  // ── Sections (fields grouped by step) ────────────────────────────
  for (const section of data.sections) {
    if (!section.rows.length) continue;

    ensure(34);
    if (section.title) {
      page.drawText(section.title.toUpperCase(), {
        x: MARGIN,
        y: y - 9,
        size: 8.5,
        font: bold,
        color: accent,
      });
      y -= 18;
    }

    for (const row of section.rows) {
      const labelLines = wrapText(row.label, regular, 9, LABEL_W);
      const valueLines = wrapText(row.value || '—', regular, 9.5, VALUE_W);
      const lineCount = Math.max(labelLines.length, valueLines.length);
      const rowH = lineCount * 12 + 7;

      ensure(rowH);
      // hairline above the row
      page.drawLine({
        start: { x: MARGIN, y },
        end: { x: A4.w - MARGIN, y },
        thickness: 0.5,
        color: HAIRLINE,
      });
      let ly = y - 12;
      for (const l of labelLines) {
        page.drawText(l, { x: MARGIN, y: ly, size: 9, font: regular, color: MUTED });
        ly -= 12;
      }
      let vy = y - 12;
      for (const l of valueLines) {
        page.drawText(l, { x: VALUE_X, y: vy, size: 9.5, font: regular, color: TEXT });
        vy -= 12;
      }
      y -= rowH;
    }
    y -= 16;
  }

  // ── Footers (now that the page count is known) ───────────────────
  const pages = pdf.getPages();
  pages.forEach((p, i) => drawFooter(p, i + 1, pages.length));

  return pdf.save();
}
