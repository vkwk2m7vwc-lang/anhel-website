/**
 * POST /api/vpu-quote-quick — быстрый подбор серии ВПУ.
 *
 * Поток:
 *   1. Zod-валидация полей формы (расход + минимальные контакты)
 *   2. `selectVpuModification(flow)` → модификация или null
 *   3. Параллельно:
 *      • Генерирует PDF КП (`generateVpuKpPdf`) с подставленными данными
 *      • Отправляет письмо менеджеру через Resend + PDF в attachment
 *   4. Возвращает клиенту PDF с заголовком Content-Disposition:attachment
 *
 * Двойной канал доставки — клиент получает файл сразу (browser
 * download), менеджер получает копию + контакты для перезвона. Это
 * критично: без копии в почтовом ящике компании менеджер не узнает,
 * что и кому отправили.
 *
 * Email — `QUIZ_RECIPIENT_EMAIL` (anurin7@gmail.com на тест-этапе).
 */
import { NextResponse } from "next/server";
import { Buffer } from "node:buffer";
import { z } from "zod";

import { generateVpuKpPdf } from "@/lib/pdf/generate-kp";
import {
  selectVpuModification,
  buildKpFilename,
} from "@/lib/vpu-anhel-selector";
import { VPU_ANHEL_MAX_TYPICAL_FLOW } from "@/content/products/vpu-anhel-series-modifications";
import { sendEmail } from "@/lib/email/sendEmail";
import { SOURCE_TO_ACCENT, accentHex } from "@/lib/email/accents";
import { renderVpuQuoteQuickEmail } from "@/lib/email/templates/vpu-quote-quick";
import { coerceLocale } from "@/lib/email/payload";

export const runtime = "nodejs";

const quoteSchema = z.object({
  flow: z
    .number()
    .positive("Производительность должна быть положительной")
    .max(VPU_ANHEL_MAX_TYPICAL_FLOW, "Расход больше типового — нужен нестандартный подбор"),
  customerName: z.string().min(2, "Укажите контактное лицо").max(120),
  customerPhone: z.string().min(5, "Укажите телефон").max(40),
  customerEmail: z.string().email("Некорректный email").max(120),
  customerCompany: z.string().max(200).optional().default(""),
  objectAddress: z.string().min(2, "Укажите объект").max(300),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Требуется согласие на обработку ПД" }),
  }),
  locale: z.enum(["ru", "en", "tr"]).optional().default("ru"),
});

export async function POST(req: Request) {
  // 1. Parse JSON
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Невалидный JSON" },
      { status: 400 },
    );
  }

  // 2. Validate
  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    console.error("[vpu-quote-quick] validation failed:", fieldErrors);
    return NextResponse.json(
      {
        success: false,
        message: "Не прошла валидация",
        fieldErrors,
      },
      { status: 422 },
    );
  }
  const data = parsed.data;

  // 3. Select modification
  const modification = selectVpuModification(data.flow);
  if (!modification) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Расход вне типового диапазона серии. Свяжитесь с нами для подбора нестандартной модификации.",
      },
      { status: 422 },
    );
  }

  // 4. Generate PDF
  const now = new Date();
  let pdfBytes: Uint8Array;
  try {
    pdfBytes = await generateVpuKpPdf({
      flow: data.flow,
      modification,
      objectAddress: data.objectAddress,
      customerCompany: data.customerCompany || "—",
      date: now,
    });
  } catch (err) {
    console.error("[vpu-quote-quick] PDF generation failed:", err);
    return NextResponse.json(
      { success: false, message: "Не удалось сформировать PDF. Попробуйте позже." },
      { status: 500 },
    );
  }
  const pdfBuffer = Buffer.from(pdfBytes);
  const filename = buildKpFilename({
    modification,
    objectAddress: data.objectAddress,
    date: now,
  });

  // 5. Send manager email (best-effort: ошибка отправки не блокирует
  //    выдачу PDF клиенту — он своё КП всё равно получит, а проблема
  //    Resend попадёт в Vercel logs).
  const accent = SOURCE_TO_ACCENT["vpu-quote-quick"];
  const accentValue = accentHex(accent);
  const locale = coerceLocale(data.locale);

  const { subject, html } = renderVpuQuoteQuickEmail({
    locale,
    accent: accentValue,
    customer: {
      name: data.customerName,
      email: data.customerEmail,
      phone: data.customerPhone,
      company: data.customerCompany || undefined,
      objectAddress: data.objectAddress,
    },
    flow: data.flow,
    modificationName: modification.nameRu,
    modificationType: modification.typeLabel,
    modificationFlowRange: modification.flowLabel.ru,
  });

  const recipient = process.env.QUIZ_RECIPIENT_EMAIL ?? "";
  const sent = await sendEmail({
    to: recipient,
    subject,
    html,
    replyTo: data.customerEmail,
    attachments: [
      {
        filename,
        content: pdfBuffer,
        contentType: "application/pdf",
      },
    ],
  });

  if (!sent.ok) {
    console.error("[vpu-quote-quick] manager email failed:", sent.error);
    // Continue: клиент всё равно получит PDF, но в респонсе сигнализируем,
    // что менеджеру письмо не ушло — поможет в дебаге.
  } else {
    console.log(
      `[vpu-quote-quick] email sent id=${sent.id} → ${recipient} (filename: ${filename})`,
    );
  }

  // 6. Stream PDF back to client
  return new NextResponse(pdfBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Content-Length": String(pdfBuffer.byteLength),
      "Cache-Control": "no-store",
      "X-Manager-Email-Sent": sent.ok ? "1" : "0",
    },
  });
}
