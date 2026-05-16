import { NextResponse } from 'next/server';
import type { ZodTypeAny } from 'zod';
import { pumpsQuizSchema } from '@/content/quiz/pumps-schema';
import { vpuQuizSchema } from '@/content/quiz/vpu-schema';
import { itpQuizSchema } from '@/content/quiz/itp-schema';
import { aupdQuizSchema } from '@/content/quiz/aupd-schema';
import { allPumpsFieldNames } from '@/content/quiz/pumps-fields';
import { allVpuFieldNames } from '@/content/quiz/vpu-fields';
import { allItpFieldNames } from '@/content/quiz/itp-fields';
import { allAupdFieldNames } from '@/content/quiz/aupd-fields';
import { parseSubmissionPayload } from '@/lib/email/payload';
import { accentHex } from '@/lib/email/accents';
import { renderQuizResultEmail } from '@/lib/email/templates/quiz-result';
import { sendEmail } from '@/lib/email/sendEmail';
import { fillQuestionnaire } from '@/lib/pdf/fill-questionnaire';

export const runtime = 'nodejs';

type Kind = 'pumps' | 'vpu' | 'itp' | 'aupd';

const SCHEMAS: Record<Kind, ZodTypeAny> = {
  pumps: pumpsQuizSchema,
  vpu: vpuQuizSchema,
  itp: itpQuizSchema,
  aupd: aupdQuizSchema,
};

const FIELD_NAMES: Record<Kind, readonly string[]> = {
  pumps: allPumpsFieldNames,
  vpu: allVpuFieldNames,
  itp: allItpFieldNames,
  aupd: allAupdFieldNames,
};

/** Human product name — goes into the email subject and heading. */
const PRODUCT_NAMES: Record<Kind, string> = {
  pumps: 'Насосные установки',
  vpu: 'Водоподготовка',
  itp: 'БИТП',
  aupd: 'АУПД',
};

/**
 * Опросники QuizShell (4 типа: pumps / vpu / itp / aupd).
 *
 * Поток:
 *   1. zod-валидация `values` по схеме типа (защита от мусора с клиента).
 *   2. Диагностика маппинга web↔PDF AcroForm — только в лог, не блокирует.
 *   3. Парсинг email-payload (customer + sections, русские лейблы из
 *      исходного конфига — собираются на клиенте в QuizShell).
 *   4. Рендер HTML-шаблона quiz-result и отправка через Resend на
 *      QUIZ_RECIPIENT_EMAIL. replyTo = email клиента.
 */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, message: 'Невалидный JSON в теле запроса' },
      { status: 400 },
    );
  }

  const root = (body ?? {}) as Record<string, unknown>;
  const kind = root.kind as Kind;
  const schema = SCHEMAS[kind];
  const pdfFields = FIELD_NAMES[kind];
  if (!schema || !pdfFields) {
    return NextResponse.json(
      { success: false, message: `Неизвестный тип опросника: ${String(kind)}` },
      { status: 400 },
    );
  }

  // === 1. zod-валидация значений формы ===
  const parsed = schema.safeParse(root.values);
  if (!parsed.success) {
    const flat = parsed.error.flatten();
    console.error(`[questionnaire:${kind}] validation failed:`, flat.fieldErrors);
    return NextResponse.json(
      {
        success: false,
        message: 'Заявка не прошла валидацию',
        fieldErrors: flat.fieldErrors,
      },
      { status: 422 },
    );
  }
  const data = parsed.data as Record<string, unknown>;

  // === 2. Диагностика маппинга web ↔ PDF AcroForm (только лог) ===
  const pdfFieldSet = new Set(pdfFields);
  const reservedKeys = new Set(['consent_pdn']);
  const mismatches: string[] = [];
  for (const key of Object.keys(data)) {
    if (reservedKeys.has(key)) continue;
    if (!pdfFieldSet.has(key)) {
      mismatches.push(key);
      console.error(
        `[questionnaire:${kind}] Field mapping mismatch: ${key} not found in PDF AcroForm`,
      );
    }
  }

  // === 3. Парсинг email-payload (customer + sections) ===
  const payloadResult = parseSubmissionPayload(body);
  if (!payloadResult.ok) {
    console.error(`[questionnaire:${kind}] payload error:`, payloadResult.error);
    return NextResponse.json(
      { success: false, message: payloadResult.error },
      { status: 400 },
    );
  }
  const { payload } = payloadResult;

  // === 4. PDF-вложение (полный опросный лист) + короткое тело письма ===
  const accentValue = accentHex(payload.accent);
  const fieldCount = payload.sections.reduce((acc, s) => acc + s.rows.length, 0);

  let pdf;
  try {
    pdf = await fillQuestionnaire({
      kind: 'quiz',
      productName: PRODUCT_NAMES[kind],
      accentHex: accentValue,
      locale: payload.locale,
      customer: payload.customer,
      sections: payload.sections,
    });
  } catch (err) {
    console.error(`[questionnaire:${kind}] PDF generation failed:`, err);
    return NextResponse.json(
      { success: false, message: 'Не удалось сформировать опросный лист. Попробуйте позже.' },
      { status: 500 },
    );
  }

  const { subject, html } = renderQuizResultEmail({
    productName: PRODUCT_NAMES[kind],
    locale: payload.locale,
    accent: accentValue,
    customer: payload.customer,
    fieldCount,
  });

  const recipient = process.env.QUIZ_RECIPIENT_EMAIL ?? '';
  const sent = await sendEmail({
    to: recipient,
    subject,
    html,
    replyTo: payload.customer.email,
    attachments: [
      { filename: pdf.filename, content: pdf.content, contentType: 'application/pdf' },
    ],
  });

  if (!sent.ok) {
    console.error(`[questionnaire:${kind}] email send failed:`, sent.error);
    return NextResponse.json(
      { success: false, message: 'Не удалось отправить заявку. Попробуйте позже.' },
      { status: 500 },
    );
  }

  console.log(
    `[questionnaire:${kind}] email sent id=${sent.id} → ${recipient} ` +
      `(fields: ${Object.keys(data).length}, PDF mismatches: ${mismatches.length}, ` +
      `PDF: ${pdf.filename})`,
  );

  return NextResponse.json({
    success: true,
    message: 'Заявка отправлена. Менеджер свяжется с вами в течение рабочего дня.',
  });
}
