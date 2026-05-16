/**
 * Генератор PDF КП — Серия ВПУ ANHEL (6 страниц).
 *
 * Структура подсмотрена с «ПРИМЕР ТКП.pdf» (`~/Desktop/ANHEL Сайт/ВПУ/
 * Доки техника/`) — инженерно-сухой стиль, без рекламных эпитетов.
 * Подставляются:
 *   - Введённая производительность (м³/ч)
 *   - Подобранная модификация (Тип 2/3/4/5 → нужный чертёж/схема)
 *   - Объект (адрес)
 *   - Заказчик (компания)
 *   - Контакт менеджера ANHEL (статика, не данные клиента)
 *
 * Картинки (чертежи, схемы, скан декларации, фото установки) лежат под
 * `public/kp/` и читаются с диска. Бандлятся в /api функцию через
 * `outputFileTracingIncludes` в next.config.mjs (см. отдельный апдейт).
 *
 * Шрифт: DejaVu Sans + Bold (тот же, что в questionnaire-pdf.ts).
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { PDFDocument, rgb, type PDFFont, type PDFPage, PDFImage } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import type { VpuModification } from "@/content/products/vpu-anhel-series-modifications";

// Палитра (как в email-шаблонах v2 + PDF questionnaire).
const TEXT = rgb(0.04, 0.04, 0.04);
const HEADING = rgb(0.02, 0.02, 0.02);
const MUTED = rgb(0.43, 0.43, 0.43);
const HAIRLINE = rgb(0.85, 0.85, 0.85);
const PANEL = rgb(0.965, 0.965, 0.96);
// Акцент PDF — чёрный. Максимально нейтрально: цвет не несёт
// эмоционального заряда, акценты передаются через шрифт/жирность/
// расстояния. Альтернативы (менять одной строкой по запросу заказчика):
//   navy        #0F2F5C  — классический инженерный B2B
//   graphite    #33363B  — почти чёрный с холодной нотой
//   deep-green  #1F4D3B  — эко / чистая вода
//   steel-blue  #3B4A5C  — холодный инженерный
//   teal        #0E7C86  — ISO 14726-1 drinking water
const ACCENT = rgb(0x0f / 255, 0x2f / 255, 0x5c / 255); // #0F2F5C (navy heavy)

const A4 = { w: 595.28, h: 841.89 };
const MARGIN = 48;
const CONTENT_W = A4.w - MARGIN * 2;
const FOOTER_BOTTOM = 26;

// ──────────────────────────────────────────────────────────────────────
// Утилиты

function readPublicAsset(relPath: string): Uint8Array {
  // process.cwd() в API роуте указывает на root проекта Vercel-сборки.
  const abs = path.join(process.cwd(), "public", relPath);
  return readFileSync(abs);
}

function readFontFile(relName: string): Uint8Array {
  // Шрифты живут в src/lib/pdf/fonts/ и бандлятся через
  // outputFileTracingIncludes (next.config.mjs).
  const abs = path.join(process.cwd(), "src", "lib", "pdf", "fonts", relName);
  return readFileSync(abs);
}

/** Greedy word-wrap. */
function wrapText(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
  const out: string[] = [];
  for (const rawLine of String(text ?? "").split(/\r?\n/)) {
    const words = rawLine.split(/\s+/).filter(Boolean);
    if (words.length === 0) {
      out.push("");
      continue;
    }
    let line = "";
    for (const word of words) {
      const probe = line ? `${line} ${word}` : word;
      if (font.widthOfTextAtSize(probe, size) <= maxWidth) {
        line = probe;
        continue;
      }
      if (line) out.push(line);
      if (font.widthOfTextAtSize(word, size) > maxWidth) {
        let chunk = "";
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
  return out.length ? out : [""];
}

function drawText(
  page: PDFPage,
  text: string,
  x: number,
  y: number,
  opts: { font: PDFFont; size: number; color?: ReturnType<typeof rgb> },
) {
  page.drawText(text, { x, y, font: opts.font, size: opts.size, color: opts.color ?? TEXT });
}

function drawWrappedText(
  page: PDFPage,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  opts: { font: PDFFont; size: number; color?: ReturnType<typeof rgb>; lineHeight?: number },
): number {
  const lines = wrapText(text, opts.font, opts.size, maxWidth);
  const lineHeight = opts.lineHeight ?? opts.size * 1.4;
  for (const line of lines) {
    drawText(page, line, x, y, opts);
    y -= lineHeight;
  }
  return y;
}

function drawHairline(page: PDFPage, x: number, y: number, width: number) {
  page.drawRectangle({ x, y, width, height: 0.6, color: HAIRLINE });
}

function drawPanel(page: PDFPage, x: number, y: number, width: number, height: number) {
  page.drawRectangle({ x, y, width, height, color: PANEL });
}

function drawAccentBar(page: PDFPage, x: number, y: number, width: number) {
  page.drawRectangle({ x, y, width, height: 2, color: ACCENT });
}

// ──────────────────────────────────────────────────────────────────────
// Header / Footer

function drawHeader(page: PDFPage, fontBold: PDFFont) {
  drawText(page, "ANHEL®", MARGIN, A4.h - MARGIN, { font: fontBold, size: 16, color: HEADING });
  drawText(
    page,
    "Серия ВПУ — коммерческое предложение",
    A4.w - MARGIN - 250,
    A4.h - MARGIN,
    { font: fontBold, size: 9, color: MUTED },
  );
  drawAccentBar(page, MARGIN, A4.h - MARGIN - 10, CONTENT_W);
}

function drawFooter(page: PDFPage, font: PDFFont, fontBold: PDFFont, pageNo: number, total: number) {
  drawHairline(page, MARGIN, FOOTER_BOTTOM + 16, CONTENT_W);
  drawText(
    page,
    "ANHEL® · ООО «ПРОФИТ» · ОГРН 1137847188357 · ИНН 7802825464 · КПП 780201001",
    MARGIN,
    FOOTER_BOTTOM + 6,
    { font, size: 7, color: MUTED },
  );
  drawText(
    page,
    "Санкт-Петербург, Политехническая ул., 6, стр. 1, пом. Н-7 · info@anhelspb.com",
    MARGIN,
    FOOTER_BOTTOM - 4,
    { font, size: 7, color: MUTED },
  );
  drawText(
    page,
    `${pageNo} / ${total}`,
    A4.w - MARGIN - 24,
    FOOTER_BOTTOM,
    { font: fontBold, size: 8, color: MUTED },
  );
}

// ──────────────────────────────────────────────────────────────────────
// Pages

async function drawTitlePage(args: {
  page: PDFPage;
  font: PDFFont;
  fontBold: PDFFont;
  doc: PDFDocument;
  flow: number;
  modification: VpuModification;
  objectAddress: string;
  cadastralNumber?: string;
  customerCompany: string;
  developerCompany: string;
  date: Date;
}) {
  const {
    page,
    font,
    fontBold,
    doc,
    flow,
    modification,
    objectAddress,
    cadastralNumber,
    customerCompany,
    developerCompany,
    date,
  } = args;

  drawHeader(page, fontBold);
  let y = A4.h - MARGIN - 80;

  drawText(page, "КОММЕРЧЕСКОЕ ПРЕДЛОЖЕНИЕ", MARGIN, y, {
    font: fontBold,
    size: 10,
    color: ACCENT,
  });
  y -= 28;

  // Заголовок — категория продукта. Длинная строка («…водоподготовки
  // ANHEL» с кириллицей) на 22 pt не помещается в CONTENT_W — режется
  // на правом краю. Решение: автоперенос через wrapText + понижение до
  // 21 pt с межстрочным интервалом 1.15. ANHEL обычно встаёт во вторую
  // строку как акцент.
  const titleText = "Комплексная система водоподготовки ANHEL";
  const titleSize = 21;
  const titleLineHeight = titleSize * 1.15;
  const titleLines = wrapText(titleText, fontBold, titleSize, CONTENT_W);
  for (const line of titleLines) {
    drawText(page, line, MARGIN, y, {
      font: fontBold,
      size: titleSize,
      color: HEADING,
    });
    y -= titleLineHeight;
  }
  y -= 16;

  // Flow callout + Тип pill — главный «маркер» подбора.
  // Слева: ▍ 25 м³/час / ПРОИЗВОДИТЕЛЬНОСТЬ ПО ОЧИЩЕННОЙ ВОДЕ
  // Справа: ┌─────┐
  //         │Тип 3│  капсула с тонкой accent-обводкой
  //         └─────┘
  // Логически это пара «ввод клиента → результат подбора», поэтому
  // они стоят на одной горизонтали.
  const calloutTop = y;
  // Vertical accent rule slева
  page.drawRectangle({
    x: MARGIN,
    y: calloutTop - 44,
    width: 2,
    height: 44,
    color: ACCENT,
  });
  // Большое число + «м³/час» меньше рядом
  const flowStr = formatFlow(flow);
  drawText(page, flowStr, MARGIN + 14, calloutTop - 32, {
    font: fontBold,
    size: 32,
    color: HEADING,
  });
  const flowWidth = fontBold.widthOfTextAtSize(flowStr, 32);
  drawText(page, "м³/час", MARGIN + 14 + flowWidth + 8, calloutTop - 24, {
    font,
    size: 14,
    color: MUTED,
  });
  // Подпись снизу — mono small caps muted
  drawText(
    page,
    "ПРОИЗВОДИТЕЛЬНОСТЬ ПО ОЧИЩЕННОЙ ВОДЕ",
    MARGIN + 14,
    calloutTop - 48,
    { font, size: 8, color: MUTED },
  );

  // Тип-капсула справа. Размер пилюли подобран под typeLabel ("Тип N").
  const typeLabel = modification.typeLabel;
  const typeFontSize = 16;
  const typeTextW = fontBold.widthOfTextAtSize(typeLabel, typeFontSize);
  const pillPaddingX = 16;
  const pillW = typeTextW + pillPaddingX * 2;
  const pillH = 36;
  const pillX = A4.w - MARGIN - pillW;
  const pillY = calloutTop - 38; // выравнивание по центру с большим числом
  page.drawRectangle({
    x: pillX,
    y: pillY,
    width: pillW,
    height: pillH,
    color: rgb(1, 1, 1),
    borderColor: ACCENT,
    borderWidth: 0.7,
  });
  drawText(
    page,
    typeLabel,
    pillX + (pillW - typeTextW) / 2,
    pillY + (pillH - typeFontSize) / 2 + 2,
    { font: fontBold, size: typeFontSize, color: HEADING },
  );

  y -= 64;

  // Карточка «Объект» — объект + (опц.) кадастр + застройщик + получатель КП.
  // Высота карточки динамическая: если кадастра нет, не оставляем пустую
  // строку «Кадастровый: —».
  const hasCadastral = Boolean(cadastralNumber && cadastralNumber.trim());
  const cardH = hasCadastral ? 124 : 112;
  drawPanel(page, MARGIN, y - cardH, CONTENT_W, cardH);
  drawText(page, "ОБЪЕКТ И УЧАСТНИКИ", MARGIN + 16, y - 20, {
    font: fontBold,
    size: 9,
    color: ACCENT,
  });
  let cy = y - 38;
  // Объект — крупно
  cy = drawWrappedText(page, objectAddress || "Не указан", MARGIN + 16, cy, CONTENT_W - 32, {
    font: fontBold,
    size: 12,
    color: HEADING,
  });
  cy -= 4;

  // Опциональная строка кадастрового номера. Печатается ТОЛЬКО если есть.
  if (hasCadastral) {
    drawText(page, "Кадастровый №:", MARGIN + 16, cy, { font, size: 9, color: MUTED });
    drawText(page, cadastralNumber as string, MARGIN + 16 + 96, cy, {
      font: fontBold,
      size: 9,
      color: TEXT,
    });
    cy -= 12;
  }

  // Застройщик / Подготовлено для — нейтральная формулировка вместо
  // «Получатель КП» (та звучала канцелярски). «Подготовлено для» не
  // приписывает роль (это может быть проектная компания или фрилансер).
  const fieldRows: Array<[string, string]> = [
    ["Застройщик:", developerCompany || "Не указан"],
    ["Подготовлено для:", customerCompany || "Не указан"],
  ];
  for (const [label, value] of fieldRows) {
    drawText(page, label, MARGIN + 16, cy, { font, size: 9, color: MUTED });
    drawText(page, value, MARGIN + 16 + 96, cy, { font: fontBold, size: 9, color: TEXT });
    cy -= 12;
  }
  y -= cardH + 24;

  // Фото установки (если есть)
  try {
    const photoBytes = readPublicAsset("kp/unit-photo.png");
    const photo = await doc.embedPng(photoBytes);
    const maxW = CONTENT_W;
    const maxH = 280;
    const scale = Math.min(maxW / photo.width, maxH / photo.height);
    const w = photo.width * scale;
    const h = photo.height * scale;
    const x = MARGIN + (CONTENT_W - w) / 2;
    page.drawImage(photo, { x, y: y - h, width: w, height: h });
    y -= h + 12;
  } catch {
    // photo optional — skip if missing
  }

  // Контакты внизу
  const dateStr = new Intl.DateTimeFormat("ru-RU", {
    timeZone: "Europe/Moscow",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);

  drawText(page, "ООО «ПРОФИТ» · +7 (812) 416-45-00 · info@anhelspb.com", MARGIN, MARGIN + 50, {
    font,
    size: 10,
    color: TEXT,
  });
  drawText(page, `Санкт-Петербург, ${dateStr}`, MARGIN, MARGIN + 38, {
    font,
    size: 9,
    color: MUTED,
  });
}

function drawPurposePage(args: {
  page: PDFPage;
  font: PDFFont;
  fontBold: PDFFont;
  modification: VpuModification;
}) {
  const { page, font, fontBold, modification } = args;

  drawHeader(page, fontBold);
  let y = A4.h - MARGIN - 80;

  drawText(page, "1 · НАЗНАЧЕНИЕ", MARGIN, y, { font: fontBold, size: 10, color: ACCENT });
  y -= 24;

  y = drawWrappedText(
    page,
    "Установка Anhel ВПУ® предназначена для получения очищенной воды.",
    MARGIN,
    y,
    CONTENT_W,
    { font, size: 12, color: TEXT, lineHeight: 18 },
  );
  y -= 12;

  drawText(page, "Состав исходной воды:", MARGIN, y, { font: fontBold, size: 11, color: HEADING });
  y -= 16;
  y = drawWrappedText(
    page,
    "Источник исходной воды — водопроводная вода, соответствующая СанПиН 2.1.4.1074-01 (питьевая).",
    MARGIN,
    y,
    CONTENT_W,
    { font, size: 11, color: TEXT, lineHeight: 16 },
  );
  y -= 24;

  // Технологическая схема
  drawText(page, "ТЕХНОЛОГИЧЕСКАЯ СХЕМА", MARGIN, y, {
    font: fontBold,
    size: 10,
    color: ACCENT,
  });
  y -= 14;
  drawText(
    page,
    `${modification.nameRu} — производительность: ${modification.flowLabel.ru}`,
    MARGIN,
    y,
    { font, size: 10, color: MUTED },
  );
  y -= 18;

  return y;
}

async function embedAndDrawImage(args: {
  page: PDFPage;
  doc: PDFDocument;
  publicPath: string;
  x: number;
  y: number;
  maxW: number;
  maxH: number;
}): Promise<{ width: number; height: number } | null> {
  try {
    const bytes = readPublicAsset(args.publicPath);
    const isJpg = /\.jpe?g$/i.test(args.publicPath);
    const img: PDFImage = isJpg
      ? await args.doc.embedJpg(bytes)
      : await args.doc.embedPng(bytes);
    const scale = Math.min(args.maxW / img.width, args.maxH / img.height);
    const w = img.width * scale;
    const h = img.height * scale;
    const dx = args.x + (args.maxW - w) / 2;
    args.page.drawImage(img, { x: dx, y: args.y - h, width: w, height: h });
    return { width: w, height: h };
  } catch {
    return null;
  }
}

function drawSpecsPage(args: {
  page: PDFPage;
  font: PDFFont;
  fontBold: PDFFont;
  flow: number;
  modification: VpuModification;
}) {
  const { page, font, fontBold, flow, modification } = args;

  drawHeader(page, fontBold);
  let y = A4.h - MARGIN - 80;

  drawText(page, "2 · ХАРАКТЕРИСТИКИ УСТАНОВКИ", MARGIN, y, {
    font: fontBold,
    size: 10,
    color: ACCENT,
  });
  y -= 22;

  // Параметры
  const rows: Array<[string, string]> = [
    ["Подача исходной воды на ВПУ", `${formatFlow(flow)} м³/ч`],
    ["Производительность по очищенной воде", `${formatFlow(flow)} м³/ч`],
    ["Максимальное давление на систему", "до 6 бар"],
    ["Максимальное давление на выходе", "до 4,5 бар"],
    ["Потеря давления на установке", "0,8 / 1,5 бар (начальная / перед заменой)"],
    [
      "Электропотребление",
      modification.powerNote ?? "уточняется при подборе",
    ],
    [
      "Масса",
      modification.weightNote ?? "уточняется при подборе",
    ],
    ["Габариты В × Ш × Г, мм", modification.dimensions],
    ["Передача данных со шкафа управления", "RS-485, сухие контакты"],
    ["Режим работы", "непрерывный, 365 дней, 24 часа"],
  ];

  for (const [label, value] of rows) {
    drawText(page, label, MARGIN, y, { font, size: 10, color: MUTED });
    drawText(page, value, MARGIN + 260, y, { font: fontBold, size: 10, color: HEADING });
    drawHairline(page, MARGIN, y - 4, CONTENT_W);
    y -= 18;
  }

  y -= 12;

  // Автоматизация
  drawText(page, "АВТОМАТИЗАЦИЯ", MARGIN, y, { font: fontBold, size: 10, color: ACCENT });
  y -= 16;
  y = drawWrappedText(
    page,
    "Узел автоматики: КИП, шкаф управления с контроллером и визуализацией процесса, поддержка RS-485. Вывод на диспетчерский пункт: работа установки, давление на входе, предупреждение о замене фильтрующих элементов, работа УФ-лампы, давление после установки.",
    MARGIN,
    y,
    CONTENT_W,
    { font, size: 10, color: TEXT, lineHeight: 14 },
  );
  y -= 16;

  // 5 преимуществ из ТКП
  drawText(page, "ПРЕИМУЩЕСТВА РЕШЕНИЯ", MARGIN, y, {
    font: fontBold,
    size: 10,
    color: ACCENT,
  });
  y -= 16;
  const advantages = [
    "Высокая эффективность очистки исходной воды.",
    "Низкие эксплуатационные затраты.",
    "Возможность размещения оборудования на нескольких уровнях.",
    "Высокая химическая стойкость и долговечность оборудования.",
    "Модульность исполнения — возможность увеличения производительности.",
  ];
  for (const a of advantages) {
    drawText(page, "•", MARGIN, y, { font: fontBold, size: 10, color: ACCENT });
    y = drawWrappedText(page, a, MARGIN + 12, y, CONTENT_W - 12, {
      font,
      size: 10,
      color: TEXT,
      lineHeight: 14,
    });
    y -= 4;
  }
}

// ──────────────────────────────────────────────────────────────────────
// Format helpers

function formatFlow(flow: number): string {
  // RU formatting: dot → comma, ≤2 decimals
  const rounded = Math.round(flow * 100) / 100;
  return rounded.toFixed(rounded % 1 === 0 ? 0 : rounded * 10 % 1 === 0 ? 1 : 2).replace(".", ",");
}

// ──────────────────────────────────────────────────────────────────────
// Top-level

export type KpPdfInput = {
  flow: number;
  modification: VpuModification;
  objectAddress: string;
  /**
   * Кадастровый номер участка — опционально. Если задан, печатается
   * отдельной строкой в карточке «Объект» на титуле. Если undefined
   * или пустая строка — строка не печатается (никаких «—»).
   */
  cadastralNumber?: string;
  customerCompany: string;
  /** Застройщик (developer / building owner). */
  developerCompany: string;
  date: Date;
};

export async function generateVpuKpPdf(input: KpPdfInput): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  doc.registerFontkit(fontkit);

  const font = await doc.embedFont(readFontFile("DejaVuSans.ttf"));
  const fontBold = await doc.embedFont(readFontFile("DejaVuSans-Bold.ttf"));

  const TOTAL_PAGES = 6;

  // Page 1 — Title
  const p1 = doc.addPage([A4.w, A4.h]);
  await drawTitlePage({
    page: p1,
    font,
    fontBold,
    doc,
    flow: input.flow,
    modification: input.modification,
    objectAddress: input.objectAddress,
    cadastralNumber: input.cadastralNumber,
    customerCompany: input.customerCompany,
    developerCompany: input.developerCompany,
    date: input.date,
  });
  drawFooter(p1, font, fontBold, 1, TOTAL_PAGES);

  // Page 2 — Purpose + Scheme
  const p2 = doc.addPage([A4.w, A4.h]);
  const yAfterText = drawPurposePage({ page: p2, font, fontBold, modification: input.modification });
  // Embed scheme below the text
  await embedAndDrawImage({
    page: p2,
    doc,
    publicPath: input.modification.schemePath.replace(/^\//, ""),
    x: MARGIN,
    y: yAfterText,
    maxW: CONTENT_W,
    maxH: yAfterText - FOOTER_BOTTOM - 40,
  });
  drawText(
    p2,
    "Схема технологическая принципиальная · PROFIT 617.00.00.00 ТХ",
    MARGIN,
    FOOTER_BOTTOM + 32,
    { font, size: 8, color: MUTED },
  );
  drawFooter(p2, font, fontBold, 2, TOTAL_PAGES);

  // Page 3 — Specs
  const p3 = doc.addPage([A4.w, A4.h]);
  drawSpecsPage({ page: p3, font, fontBold, flow: input.flow, modification: input.modification });
  drawFooter(p3, font, fontBold, 3, TOTAL_PAGES);

  // Page 4 — Drawing. По образцу старого КП клиента — чертёж занимает
  // почти всю страницу, обвязка минимальная: шапка ANHEL® + один
  // короткий заголовок + чертёж на максимум, внизу DWG-ссылка и
  // финальная сноска про размеры.
  const p4 = doc.addPage([A4.w, A4.h]);
  drawHeader(p4, fontBold);
  let p4y = A4.h - MARGIN - 60; // короче, чем на других страницах
  drawText(p4, "3 · ГАБАРИТНЫЙ ЧЕРТЁЖ", MARGIN, p4y, {
    font: fontBold,
    size: 10,
    color: ACCENT,
  });
  p4y -= 14;
  drawText(
    p4,
    `${input.modification.nameRu} · ${input.modification.dimensions} мм`,
    MARGIN,
    p4y,
    { font, size: 9, color: MUTED },
  );
  p4y -= 10;

  // Сужаем поля под чертёж: 24 pt по краям вместо 48. Высота — всё
  // что есть до подвала с DWG/сноской (44 pt снизу под текст).
  const drawingMargin = 24;
  const drawingW = A4.w - drawingMargin * 2;
  const annotationY = FOOTER_BOTTOM + 50;
  const drawingH = p4y - annotationY - 8;
  await embedAndDrawImage({
    page: p4,
    doc,
    publicPath: input.modification.drawingPath.replace(/^\//, ""),
    x: drawingMargin,
    y: p4y,
    maxW: drawingW,
    maxH: drawingH,
  });

  // DWG-ссылка — печатается только если у модификации задан
  // drawingDwgUrl. 4 линии пока без линка (папка не выложена). Лейбл и
  // URL разводятся динамически по ширине лейбла, чтобы текст не слипался.
  if (input.modification.drawingDwgUrl) {
    const dwgLabel = "DWG-версия чертежа:";
    const dwgLabelSize = 9;
    const dwgLabelWidth = fontBold.widthOfTextAtSize(dwgLabel, dwgLabelSize);
    drawText(p4, dwgLabel, MARGIN, annotationY, {
      font: fontBold,
      size: dwgLabelSize,
      color: ACCENT,
    });
    drawText(
      p4,
      input.modification.drawingDwgUrl,
      MARGIN + dwgLabelWidth + 10,
      annotationY,
      { font, size: dwgLabelSize, color: TEXT },
    );
  }
  drawText(
    p4,
    "Размеры справочные. Покрытие — RAL 5005 (по согласованию). Масса — см. характеристики.",
    MARGIN,
    annotationY - 14,
    { font, size: 8, color: MUTED },
  );
  drawFooter(p4, font, fontBold, 4, TOTAL_PAGES);

  // Page 5 — Certificate p1
  const p5 = doc.addPage([A4.w, A4.h]);
  drawHeader(p5, fontBold);
  let p5y = A4.h - MARGIN - 80;
  drawText(p5, "4 · СЕРТИФИКАТЫ", MARGIN, p5y, { font: fontBold, size: 10, color: ACCENT });
  p5y -= 18;
  drawText(
    p5,
    "Декларация о соответствии ЕАЭС № RU Д-RU.РA01.B.55819/21 от 11.10.2021",
    MARGIN,
    p5y,
    { font: fontBold, size: 11, color: HEADING },
  );
  p5y -= 22;
  await embedAndDrawImage({
    page: p5,
    doc,
    publicPath: "kp/certificate-p1.png",
    x: MARGIN,
    y: p5y,
    maxW: CONTENT_W,
    maxH: p5y - FOOTER_BOTTOM - 30,
  });
  drawFooter(p5, font, fontBold, 5, TOTAL_PAGES);

  // Page 6 — Certificate p2
  const p6 = doc.addPage([A4.w, A4.h]);
  drawHeader(p6, fontBold);
  let p6y = A4.h - MARGIN - 80;
  drawText(p6, "4 · СЕРТИФИКАТЫ (приложение)", MARGIN, p6y, {
    font: fontBold,
    size: 10,
    color: ACCENT,
  });
  p6y -= 18;
  drawText(
    p6,
    "Перечень оборудования серии Anhel — приложение к декларации.",
    MARGIN,
    p6y,
    { font, size: 10, color: MUTED },
  );
  p6y -= 14;
  await embedAndDrawImage({
    page: p6,
    doc,
    publicPath: "kp/certificate-p2.png",
    x: MARGIN,
    y: p6y,
    maxW: CONTENT_W,
    maxH: p6y - FOOTER_BOTTOM - 30,
  });
  drawFooter(p6, font, fontBold, 6, TOTAL_PAGES);

  return await doc.save();
}
