import { NextResponse } from 'next/server';
import { parseSubmissionPayload, looksLikeEmail } from '@/lib/email/payload';
import { accentHex } from '@/lib/email/accents';
import { renderServiceRequestEmail } from '@/lib/email/templates/service-request';
import { sendEmail } from '@/lib/email/sendEmail';
import { fillQuestionnaire } from '@/lib/pdf/fill-questionnaire';

export const runtime = 'nodejs';

/**
 * Заявка на сервисное обслуживание (/service/request).
 *
 * Форма ServiceRequestForm — step-based, без zod-схемы. Валидация лёгкая:
 * контактное лицо + корректный e-mail (клиент валидирует на «Далее»).
 * Дальше — рендер service-request шаблона и отправка через Resend на
 * QUIZ_RECIPIENT_EMAIL, replyTo = email клиента.
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

  const payloadResult = parseSubmissionPayload(body);
  if (!payloadResult.ok) {
    console.error('[service-request] payload error:', payloadResult.error);
    return NextResponse.json(
      { success: false, message: payloadResult.error },
      { status: 400 },
    );
  }
  const { payload } = payloadResult;

  if (!looksLikeEmail(payload.customer.email)) {
    console.error('[service-request] missing or invalid customer email');
    return NextResponse.json(
      { success: false, message: 'Укажите корректный e-mail для ответа.' },
      { status: 422 },
    );
  }

  // Service request isn't tied to one product line — neutral graphite accent.
  const accentValue = accentHex('neutral');
  const fieldCount = payload.sections.reduce((acc, s) => acc + s.rows.length, 0);

  let pdf;
  try {
    pdf = await fillQuestionnaire({
      kind: 'service',
      productName: '',
      accentHex: accentValue,
      locale: payload.locale,
      customer: payload.customer,
      sections: payload.sections,
    });
  } catch (err) {
    console.error('[service-request] PDF generation failed:', err);
    return NextResponse.json(
      { success: false, message: 'Не удалось сформировать заявку. Попробуйте позже.' },
      { status: 500 },
    );
  }

  const { subject, html } = renderServiceRequestEmail({
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
    console.error('[service-request] email send failed:', sent.error);
    return NextResponse.json(
      { success: false, message: 'Не удалось отправить заявку. Попробуйте позже.' },
      { status: 500 },
    );
  }

  console.log(
    `[service-request] email sent id=${sent.id} → ${recipient} ` +
      `(sections: ${payload.sections.length}, PDF: ${pdf.filename})`,
  );

  return NextResponse.json({
    success: true,
    message: 'Заявка на сервис отправлена. Мы согласуем выезд инженера.',
  });
}
