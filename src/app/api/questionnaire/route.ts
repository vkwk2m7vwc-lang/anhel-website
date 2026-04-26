import { NextResponse } from 'next/server';
import { pumpsQuizSchema } from '@/content/quiz/pumps-schema';
import { allPumpsFieldNames } from '@/content/quiz/pumps-fields';

export const runtime = 'nodejs';

type Payload = {
  kind: string;
  values: Record<string, unknown>;
};

/**
 * Stub-обработчик опросника.
 * В этой сессии — только валидация zod, проверка маппинга web↔PDF AcroForm
 * и console.log заявки. Реальной отправки email НЕТ.
 *
 * TODO (next session): Resend integration
 *   1. Configure RESEND_API_KEY in .env (.env.local + Vercel env)
 *   2. Generate filled PDF from form data using pdf-lib:
 *        import { PDFDocument } from 'pdf-lib'
 *        const tplPath = path.join(process.cwd(), 'public/docs/pressure-boost/oprosnyi-list.pdf')
 *          // или путь к ANHEL-PDF из _tmp_anhel_готовые/ (после того как PDF
 *          // переедет в src/templates/ или /public/docs/)
 *        const pdfBytes = await fs.readFile(tplPath)
 *        const pdf = await PDFDocument.load(pdfBytes)
 *        const form = pdf.getForm()
 *        for (const [name, value] of Object.entries(formData)) {
 *          if (typeof value === 'boolean') form.getCheckBox(name).check()
 *          else form.getTextField(name).setText(String(value))
 *        }
 *        const filledBytes = await pdf.save()
 *   3. Send email to info@anhelspb.com with PDF attachment via Resend SDK
 *   4. Send confirmation copy to user.contact_email
 *   5. Return { success: true, emailSent: true }
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

  if (body.kind !== 'pumps') {
    return NextResponse.json(
      { success: false, message: `Неизвестный тип опросника: ${body.kind}` },
      { status: 400 },
    );
  }

  // === Валидация zod ===
  const parsed = pumpsQuizSchema.safeParse(body.values);
  if (!parsed.success) {
    const flat = parsed.error.flatten();
    console.error('[questionnaire] validation failed:', flat.fieldErrors);
    return NextResponse.json(
      {
        success: false,
        message: 'Заявка не прошла валидацию',
        fieldErrors: flat.fieldErrors,
      },
      { status: 422 },
    );
  }

  const data = parsed.data;

  // === ПРОВЕРКА МАППИНГА: каждое поле формы → AcroForm в PDF ===
  const pdfFieldSet = new Set(allPumpsFieldNames);
  const reservedKeys = new Set(['consent_pdn']); // только для UX, не идёт в PDF
  const sentKeys = Object.keys(data);
  const mismatches: string[] = [];
  for (const key of sentKeys) {
    if (reservedKeys.has(key)) continue;
    if (!pdfFieldSet.has(key)) {
      mismatches.push(key);
      console.error(`[questionnaire] Field mapping mismatch: ${key} not found in PDF AcroForm`);
    }
  }

  // === Отчёт ===
  console.log(
    '\n=========== ANHEL Questionnaire — TEST MODE ===========',
    `\n[${new Date().toISOString()}] kind=${body.kind}`,
    `\nContact: ${data.contact_organization} / ${data.contact_fullname} / ${data.contact_email} / ${data.contact_phone}`,
    `\nFields submitted: ${sentKeys.length}, mapped to PDF: ${sentKeys.length - mismatches.length}, mismatches: ${mismatches.length}`,
    `\n--- Full payload ---\n${JSON.stringify(data, null, 2)}`,
    '\n========================================================\n',
  );

  // Имитация задержки 1.5 сек
  await new Promise((r) => setTimeout(r, 1500));

  return NextResponse.json({
    success: true,
    message: 'Заявка получена (тестовый режим — email не отправляется в этой сессии).',
    debug: {
      fields: sentKeys.length,
      mismatches,
    },
  });
}
