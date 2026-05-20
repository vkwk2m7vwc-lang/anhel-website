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
   * `output: 'standalone'` — Next генерирует минимальный self-contained
   * сервер в `.next/standalone/`. В нём только runtime-зависимости,
   * без `node_modules`. Используется в Docker-образе для Yandex Cloud
   * Serverless Containers: cold-start быстрее, образ ~150 MB вместо 1+ GB.
   *
   * Vercel игнорирует этот флаг — для Vercel deployment остаётся как был.
   */
  output: "standalone",
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
    /**
     * Cache optimized images (/_next/image output) for 1 year in the
     * browser. Default is 60s + must-revalidate, which on Yandex (no CDN,
     * x-nextjs-cache MISS per ephemeral container) made every hero slide
     * switch re-fetch + re-encode via sharp → product appeared late.
     * On Vercel the edge CDN absorbed this; here we lean on the browser.
     */
    minimumCacheTTL: 31536000,
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
      {
        // anhelspb.com (apex) → www, which is the CDN-served canonical host.
        // The apex stays on the gateway and 301s here. Loop-safe: the CDN
        // forwards origin requests with Host: www.anhelspb.com, so this rule
        // (host = anhelspb.com) never fires for CDN/www traffic — only for
        // visitors hitting the bare domain directly.
        source: "/:path*",
        has: [{ type: "host", value: "anhelspb.com" }],
        destination: "https://www.anhelspb.com/:path*",
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
  /**
   * Long-cache raw static assets in /assets (product photos, hero images
   * referenced directly, etc.). They were served with `max-age=0`, so the
   * browser re-validated on every navigation — a big part of the "site
   * feels laggy" now that there is no CDN. Bust by renaming the file (or
   * adding a ?v= query) when an asset changes.
   */
  async headers() {
    return [
      {
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
