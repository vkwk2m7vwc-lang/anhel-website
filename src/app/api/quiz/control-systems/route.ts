import { NextResponse } from 'next/server';
import { parseSubmissionPayload, looksLikeEmail } from '@/lib/email/payload';
import { accentHex } from '@/lib/email/accents';
import { renderQuizResultEmail } from '@/lib/email/templates/quiz-result';
import { sendEmail } from '@/lib/email/sendEmail';

export const runtime = 'nodejs';

/**
 * Опросный лист на шкафы управления (/quiz/control-systems).
 *
 * Форма QuizControlSystemsForm — step-based (FormStep/FormField), без
 * zod-схемы как у QuizShell-квизов, поэтому валидация лёгкая: проверяем
 * контактное лицо и корректный e-mail (клиент уже валидирует на «Далее»,
 * это вторая линия защиты). Дальше — рендер общего quiz-result шаблона и
 * отправка через Resend на QUIZ_RECIPIENT_EMAIL.
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
    console.error('[quiz:control-systems] payload error:', payloadResult.error);
    return NextResponse.json(
      { success: false, message: payloadResult.error },
      { status: 400 },
    );
  }
  const { payload } = payloadResult;

  if (!looksLikeEmail(payload.customer.email)) {
    console.error('[quiz:control-systems] missing or invalid customer email');
    return NextResponse.json(
      { success: false, message: 'Укажите корректный e-mail для ответа.' },
      { status: 422 },
    );
  }

  // Generic control-systems quiz covers all 5 cabinet series — no single
  // product colour fits, so the email uses the neutral graphite accent.
  const { subject, html } = renderQuizResultEmail({
    productName: 'Шкафы управления',
    locale: payload.locale,
    accent: accentHex('neutral'),
    customer: payload.customer,
    sections: payload.sections,
  });

  const recipient = process.env.QUIZ_RECIPIENT_EMAIL ?? '';
  const sent = await sendEmail({
    to: recipient,
    subject,
    html,
    replyTo: payload.customer.email,
  });

  if (!sent.ok) {
    console.error('[quiz:control-systems] email send failed:', sent.error);
    return NextResponse.json(
      { success: false, message: 'Не удалось отправить заявку. Попробуйте позже.' },
      { status: 500 },
    );
  }

  console.log(
    `[quiz:control-systems] email sent id=${sent.id} → ${recipient} ` +
      `(sections: ${payload.sections.length})`,
  );

  return NextResponse.json({
    success: true,
    message: 'Заявка отправлена. Менеджер свяжется с вами в течение рабочего дня.',
  });
}
