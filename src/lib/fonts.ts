/**
 * ANHEL typography stack — self-hosted edition.
 *
 * BRAND.md asks for Neue Haas Grotesk Display + Söhne (paid). We use the
 * documented fallbacks (Inter Tight / Inter / JetBrains Mono).
 *
 * Перформанс-история этого файла: раньше тут жил `next/font/google` —
 * Next подтягивал woff2-файлы с fonts.gstatic.com на билде, кэшировал
 * их у себя и оборачивал в className. С точки зрения RU-аудитории это
 * было проблемой: Роскомнадзор блокирует google-домены ровно из-за
 * fonts.googleapis.com / fonts.gstatic.com, и Next в production пытается
 * проксировать через тот же CDN-путь. Эпизодически у пользователей
 * шрифт «прыгал» на системный.
 *
 * Решение — раздать те же woff2-файлы с собственного origin:
 *   public/fonts/inter/*.woff2
 *   public/fonts/inter-tight/*.woff2
 *   public/fonts/jetbrains-mono/*.woff2
 *
 * @font-face блоки сгенерированы из Google Fonts API и лежат в
 * public/fonts/fonts.css. Этот файл подключается тегом <link> в
 * `src/app/[locale]/layout.tsx` <head>, плюс preload критических
 * подмножеств (Cyrillic 400) — это даёт ту же latency, что и
 * Google CDN, но без блокировок и без зависимости от внешнего сервиса.
 *
 * Tailwind config продолжает читать font-family через CSS-переменные
 * --font-display / --font-body / --font-mono — их теперь декларирует
 * `globals.css` (раньше их вписывал next/font в className на <html>).
 *
 * Регенерация шрифтов — `npm run fonts:fetch` (см. scripts/fetch-fonts.sh).
 */

/**
 * Compatibility shim — раньше `fontVariables` шёл в className на <html>,
 * чтобы next/font's runtime CSS-variables подцепились к корню. Сейчас
 * переменные сидят в globals.css :root, и className пуст. Оставлен
 * экспорт для обратной совместимости — layout.tsx по-прежнему может
 * передавать его в className без эффекта.
 */
export const fontVariables = "";
