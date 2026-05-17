import createNextIntlPlugin from "next-intl/plugin";

/**
 * next-intl plugin — points at our locale-aware request config.
 *
 * The plugin sets up module aliases so `useTranslations()` inside
 * Server Components resolves to the messages loaded by the function
 * exported from `src/i18n.ts`. No middleware required for this step
 * alone — middleware is added in C2 together with the `[locale]`
 * route segment.
 */
const withNextIntl = createNextIntlPlugin("./src/i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Bundle the Cyrillic TTF fonts into the API serverless functions.
   *
   * The transactional-email routes generate a PDF questionnaire at
   * request time (pdf-lib) and embed DejaVu Sans for Cyrillic. Font
   * files aren't traced automatically because they're read via `fs`,
   * not `import`-ed — this forces them into every /api function bundle.
   */
  experimental: {
    outputFileTracingIncludes: {
      // Шрифты для всех PDF-генераторов (questionnaire + KP)
      "/api/**": ["./src/lib/pdf/fonts/**"],
      // Картинки для генератора КП серии ВПУ (чертежи, схемы, скан
      // декларации, фото). Серверная функция читает их через
      // fs.readFileSync, поэтому Next не может автоматически их
      // протрассировать — форсируем включение.
      "/api/vpu-quote-quick": ["./public/kp/**"],
    },
  },
  /**
   * Image optimization config.
   *
   * `dangerouslyAllowSVG: true` — нужно потому что мы используем
   * собственные SVG-плейсхолдеры (для control-systems пока нет
   * фоторендеров, ставим isometric line-art SVG). Источник — только
   * наш /public, не пользовательские загрузки, поэтому безопасно.
   * `contentDispositionType: "attachment"` — стандартная защитная мера
   * на случай если SVG открывают по прямой ссылке.
   */
  images: {
    /**
     * Этап 5 / Сессия 1 (perf-audit): AVIF поставили первым в очереди,
     * чтобы next/image при поддержке браузером отдавал .avif вместо
     * .webp. На photo-картинках это даёт ~30-50% выигрыш в весе
     * относительно WebP (сильнее всего бьёт LCP на мобиле).
     * Браузеры без AVIF получат WebP fallback (по факту это всё, что
     * мы поддерживаем — старее WebP-стэк уже не входит в целевую
     * аудиторию для 2026 года).
     */
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  /**
   * 301 redirects для перенесённых разделов после реструктуризации
   * каталога (feat/3-tier-catalog).
   *
   * Раньше водоподготовка и ИТП жили под /products/pumps/, потому что
   * это был единственный продуктовый раздел. После добавления
   * подкаталога /products/pumps (5 серий насосных станций), не-насосные
   * категории логично переехали в корень /products.
   *
   *   /products/pumps/water-treatment      →  /products/water-treatment
   *   /products/pumps/heating-unit         →  /products/heating-unit
   *   /products/pumps/heating-unit/<slug>  →  /products/heating-unit/<slug>
   *
   * `permanent: true` = 301 (постоянный редирект), чтобы поисковые
   * системы перенесли вес ссылок на новые URL.
   */
  async redirects() {
    return [
      /**
       * Vercel Hobby даёт default `<project>.vercel.app` URL, который
       * — на этом тарифе — нельзя спрятать через Deployment Protection
       * (Standard Protection покрывает только preview, но не production
       * vercel.app alias; «All Deployments» требует Pro plan).
       *
       * Поэтому ловим хост на edge и 308-редиректим всё на canonical
       * домен `anhelspb.com`. Это закрывает:
       *   • SEO-дубль (Google индексирует только anhelspb.com);
       *   • случайные находки конкурентами через vercel.app slug;
       *   • технический leak («мы на Vercel» — это всё равно видно
       *     по `server: Vercel` header, но slug проекта прячется).
       *
       * Preview-deploys остаются за Vercel Authentication.
       */
      {
        source: "/:path*",
        has: [{ type: "host", value: "anhel-website.vercel.app" }],
        destination: "https://anhelspb.com/:path*",
        permanent: true,
      },
      {
        source: "/products/pumps/water-treatment",
        destination: "/products/water-treatment",
        permanent: true,
      },
      {
        source: "/products/pumps/heating-unit",
        destination: "/products/heating-unit",
        permanent: true,
      },
      {
        source: "/products/pumps/heating-unit/:slug",
        destination: "/products/heating-unit/:slug",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
