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

/**
 * Phone — допускаем «+», цифры, пробелы, дефисы, скобки. После очистки
 * должно остаться 7-15 цифр (E.164 без верхней границы 15).
 */
const phoneSchema = z
  .string()
  .min(5, "Укажите телефон")
  .max(40)
  .refine((v) => {
    const digits = v.replace(/\D/g, "");
    return digits.length >= 7 && digits.length <= 15;
  }, "Некорректный телефон — нужны 7–15 цифр");

const quoteSchema = z.object({
  flow: z
    .number()
    .positive("Производительность должна быть положительной")
    .max(VPU_ANHEL_MAX_TYPICAL_FLOW, "Расход больше типового — нужен нестандартный подбор"),
  customerName: z.string().min(2, "Укажите контактное лицо").max(120),
  customerPhone: phoneSchema,
  customerEmail: z.string().email("Некорректный email").max(120),
  // Теперь обязательное: КП обычно запрашивают проектные компании
  // или фрилансеры-проектировщики. «Ваша компания» = название
  // проектной/эксплуатационной фирмы или ИП фрилансера.
  customerCompany: z.string().min(2, "Укажите вашу компанию").max(200),
  // Застройщик — обязательное B2B-поле. Знаем кто заказчик объекта,
  // чтобы менеджер сразу строил разговор в правильной плоскости.
  developerCompany: z.string().min(2, "Укажите застройщика").max(200),
  objectAddress: z.string().min(2, "Укажите объект").max(300),
  // Кадастровый номер участка — опционально. Если есть — попадает на
  // титул КП в карточке «Объект»; если нет — строка не печатается
  // (в PDF не остаётся пустое поле «Кадастровый: —»).
  cadastralNumber: z.string().max(60).optional().default(""),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Требуется согласие на обработку ПД" }),
  }),
  locale: z.enum(["ru", "en", "tr"]).optional().default("ru"),
  /**
   * Двух-этапный submit:
   *   false (default) — preview: API генерирует PDF и возвращает его,
   *                      email НЕ отправляется. Клиент показывает
   *                      превью; лид логируется как «просмотрел КП».
   *   true            — confirm: PDF + email менеджеру + лид логируется
   *                      как «подтвердил отправку».
   *
   * Без флага клиент мог бы получить PDF, но менеджер получал бы спам
   * от пользователей, которые передумали или просто проверяли подбор.
   */
  confirm: z.boolean().optional().default(false),
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
      cadastralNumber: data.cadastralNumber || undefined,
      customerCompany: data.customerCompany,
      developerCompany: data.developerCompany,
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

  // 5. Lead tracking — каждое касание логируем (preview и confirm),
  //    так менеджер потом сможет посмотреть в Vercel logs «кто
  //    смотрел КП, кто подтвердил». В прод-варианте логи уедут в
  //    отдельную таблицу/Sentry/Slack, пока — Vercel runtime logs.
  const stage = data.confirm ? "confirm" : "preview";
  console.log(
    `[vpu-quote-quick:${stage}] flow=${data.flow} → ${modification.typeLabel}` +
      ` · company="${data.customerCompany}" developer="${data.developerCompany}"` +
      ` object="${data.objectAddress}"` +
      (data.cadastralNumber ? ` cadastral="${data.cadastralNumber}"` : "") +
      ` · ${data.customerName} <${data.customerEmail}> ${data.customerPhone}`,
  );

  // 6. Email менеджеру — только на confirm. На превью клиент видит
  //    PDF локально (в blob iframe), менеджер ничего не получает.
  let emailSent = false;
  if (data.confirm) {
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
        company: data.customerCompany,
        objectAddress: data.objectAddress,
      },
      flow: data.flow,
      modificationName: modification.nameRu,
      modificationType: modification.typeLabel,
      modificationFlowRange: modification.flowLabel.ru,
      developerCompany: data.developerCompany,
      cadastralNumber: data.cadastralNumber || undefined,
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
      console.error("[vpu-quote-quick:confirm] manager email failed:", sent.error);
    } else {
      emailSent = true;
      console.log(
        `[vpu-quote-quick:confirm] email sent id=${sent.id} → ${recipient} (filename: ${filename})`,
      );
    }
  }

  // 7. Stream PDF back to client — content-disposition зависит от стадии:
  //    preview → inline (показываем в iframe), confirm → attachment
  //    (браузер скачивает).
  const disposition = data.confirm ? "attachment" : "inline";
  return new NextResponse(pdfBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `${disposition}; filename="${filename}"`,
      "Content-Length": String(pdfBuffer.byteLength),
      "Cache-Control": "no-store",
      "X-Stage": stage,
      "X-Manager-Email-Sent": emailSent ? "1" : "0",
    },
  });
}
