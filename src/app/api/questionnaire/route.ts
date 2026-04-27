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

export const runtime = 'nodejs';

type Kind = 'pumps' | 'vpu' | 'itp' | 'aupd';

type Payload = {
  kind: Kind;
  values: Record<string, unknown>;
};

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

const KIND_LABELS: Record<Kind, string> = {
  pumps: 'Насосные установки',
  vpu: 'Водоподготовка',
  itp: 'БИТП',
  aupd: 'АУПД',
};

/**
 * Stub-обработчик опросников (4 типа: pumps / vpu / itp / aupd).
 * В этой сессии — только zod-валидация, проверка маппинга web↔PDF AcroForm
 * и console.log заявки. Реальной отправки email НЕТ.
 *
 * TODO (next session): Resend integration
 *   1. RESEND_API_KEY в .env / Vercel env
 *   2. Заполнение PDF через pdf-lib для каждого kind:
 *        const tplMap = {
 *          pumps: 'public/docs/pressure-boost/oprosnyi-list.pdf',
 *          vpu:   'public/docs/water-treatment/oprosnyi-list.pdf',
 *          itp:   'public/docs/heating-unit/oprosnyi-list.pdf',
 *          aupd:  'public/docs/pressure-boost/oprosnyi-list.pdf',
 *        }
 *      ВНИМАНИЕ: для pumps/aupd шаблоны разные — у каждой подкатегории насосных
 *      свой PDF. Возможно вместо подкаталогов держать ANHEL-PDF в src/templates/.
 *   3. Resend SDK — отправка info@anhelspb.com + копия user.contact_email.
 */
export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json(
      { success: false, message: 'Невалидный JSON в теле запроса' },
      { status: 400 },
    );
  }

  const schema = SCHEMAS[body.kind];
  const pdfFields = FIELD_NAMES[body.kind];
  if (!schema || !pdfFields) {
    return NextResponse.json(
      { success: false, message: `Неизвестный тип опросника: ${body.kind}` },
      { status: 400 },
    );
  }

  // === Валидация zod ===
  const parsed = schema.safeParse(body.values);
  if (!parsed.success) {
    const flat = parsed.error.flatten();
    console.error(`[questionnaire:${body.kind}] validation failed:`, flat.fieldErrors);
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

  // === ПРОВЕРКА МАППИНГА web ↔ PDF AcroForm ===
  const pdfFieldSet = new Set(pdfFields);
  const reservedKeys = new Set(['consent_pdn']);
  const sentKeys = Object.keys(data);
  const mismatches: string[] = [];
  for (const key of sentKeys) {
    if (reservedKeys.has(key)) continue;
    if (!pdfFieldSet.has(key)) {
      mismatches.push(key);
      console.error(
        `[questionnaire:${body.kind}] Field mapping mismatch: ${key} not found in PDF AcroForm`,
      );
    }
  }

  // === Отчёт ===
  const contact =
    `${(data.contact_organization as string) || '?'} / ` +
    `${(data.contact_fullname as string) || '?'} / ` +
    `${(data.contact_email as string) || '?'} / ` +
    `${(data.contact_phone as string) || '?'}`;

  console.log(
    `\n=========== ANHEL Questionnaire — TEST MODE (${KIND_LABELS[body.kind]}) ===========`,
    `\n[${new Date().toISOString()}] kind=${body.kind}`,
    `\nContact: ${contact}`,
    `\nFields submitted: ${sentKeys.length}, mapped to PDF: ${sentKeys.length - mismatches.length}, mismatches: ${mismatches.length}`,
    `\n--- Full payload ---\n${JSON.stringify(data, null, 2)}`,
    '\n========================================================\n',
  );

  await new Promise((r) => setTimeout(r, 1500));

  return NextResponse.json({
    success: true,
    message: 'Заявка получена (тестовый режим — email не отправляется в этой сессии).',
    debug: {
      kind: body.kind,
      fields: sentKeys.length,
      mismatches,
    },
  });
}
