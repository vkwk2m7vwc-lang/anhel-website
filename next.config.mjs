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
   * Раздаём собранную статику (`/_next/static` — JS/CSS чанки с
   * content-hash в имени) с поддомена Yandex Cloud CDN, а не с
   * единственного origin в Москве. Под CDN уходят ТОЛЬКО неизменяемые
   * чанки: HTML, `/api` (POST-формы), `/_next/image` и `/public`
   * остаются на anhelspb.com (шлюз) — поэтому ни один POST не попадает
   * на CDN (Yandex CDN не умеет проксировать POST). Origin уже отдаёт
   * `immutable` + `Access-Control-Allow-Origin: *`, CDN это сохраняет,
   * поэтому шрифты и кросс-доменные чанки грузятся без CORS-проблем.
   * Откат: убрать эту строку и передеплоить.
   */
  /*
   * Применяем CDN-префикс ТОЛЬКО на боевой сборке Yandex Cloud (Docker:
   * NODE_ENV=production и нет переменной VERCEL). Почему с условием:
   *   - `next dev` локально: NODE_ENV=development → префикс undefined,
   *     иначе dev тянет /_next/static с cdn.anhelspb.com (там только
   *     боевые хэши прод-сборки) → 404 → страница без стилей.
   *   - Vercel preview/prod: переменная VERCEL выставлена → префикс
   *     undefined, чтобы превью грузило свои чанки со своего *.vercel.app,
   *     а не с CDN, где их нет (иначе превью тоже без стилей).
   *   - Yandex Docker (боевой): NODE_ENV=production, VERCEL нет → префикс
   *     активен, поведение прод-сайта не меняется.
   * Откат: вернуть безусловный `assetPrefix: "https://cdn.anhelspb.com"`.
   */
  assetPrefix:
    process.env.NODE_ENV === "production" && !process.env.VERCEL
      ? "https://cdn.anhelspb.com"
      : undefined,
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
     * Кастомный loader: раздаём оптимизированные картинки через Yandex
     * CDN (cdn.anhelspb.com), а не с единственного московского origin.
     * Edge-кэш кодирует каждое фото один раз и дальше отдаёт мгновенно
     * всем посетителям + переживает редеплои — поведение, которое было
     * на Vercel. Реализация — src/lib/image-loader.ts.
     */
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    /**
     * Ширины srcset = ровно те, что предгенерируются в
     * scripts/pregen-images.mjs и которые понимает src/lib/image-loader.ts.
     * Так next/image запрашивает только готовые файлы (1:1 с /_img/...),
     * без лишних вариантов. Формат один — WebP (зашит в предгенерации);
     * встроенный рантайм-оптимизатор Next (/_next/image) не используется.
     */
    imageSizes: [256, 384],
    deviceSizes: [640, 828, 1080, 1200, 1920, 2048],
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
      {
        // Предгенерированные WebP-картинки (scripts/pregen-images.mjs).
        // Неизменяемые → агрессивный кэш в браузере и на edge CDN.
        source: "/_img/:path*",
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
