/** @type {import('next').NextConfig} */
const nextConfig = {
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
};

export default nextConfig;
