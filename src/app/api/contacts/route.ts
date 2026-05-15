import { NextResponse } from 'next/server';
import { coerceLocale, looksLikeEmail } from '@/lib/email/payload';
import { accentHex } from '@/lib/email/accents';
import { renderContactFormEmail } from '@/lib/email/templates/contact-form';
import { sendEmail } from '@/lib/email/sendEmail';

export const runtime = 'nodejs';

/**
 * Контактная форма (/contacts).
 *
 * Самая простая из форм: имя / телефон / e-mail / сообщение. Валидация —
 * имя и корректный e-mail обязательны. Рендер contact-form шаблона и
 * отправка через Resend на QUIZ_RECIPIENT_EMAIL, replyTo = email клиента.
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
  const customer = (root.customer ?? {}) as Record<string, unknown>;

  const name = typeof customer.name === 'string' ? customer.name.trim() : '';
  const email = typeof customer.email === 'string' ? customer.email.trim() : '';
  const phone = typeof customer.phone === 'string' ? customer.phone.trim() : '';
  const message = typeof root.message === 'string' ? root.message.trim() : '';

  if (!name) {
    return NextResponse.json(
      { success: false, message: 'Укажите имя.' },
      { status: 422 },
    );
  }
  if (!looksLikeEmail(email)) {
    return NextResponse.json(
      { success: false, message: 'Укажите корректный e-mail для ответа.' },
      { status: 422 },
    );
  }

  const { subject, html } = renderContactFormEmail({
    locale: coerceLocale(root.locale),
    accent: accentHex('neutral'),
    customer: { name, email, phone: phone || undefined },
    message,
  });

  const recipient = process.env.QUIZ_RECIPIENT_EMAIL ?? '';
  const sent = await sendEmail({ to: recipient, subject, html, replyTo: email });

  if (!sent.ok) {
    console.error('[contacts] email send failed:', sent.error);
    return NextResponse.json(
      { success: false, message: 'Не удалось отправить сообщение. Попробуйте позже.' },
      { status: 500 },
    );
  }

  console.log(`[contacts] email sent id=${sent.id} → ${recipient}`);

  return NextResponse.json({
    success: true,
    message: 'Сообщение отправлено. Менеджер свяжется с вами в течение рабочего дня.',
  });
}
