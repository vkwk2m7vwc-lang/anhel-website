/**
 * Кастомный loader для next/image — отдаёт ПРЕДГЕНЕРИРОВАННЫЕ статические
 * картинки через Yandex CDN (cdn.anhelspb.com).
 *
 * Почему так: каталог фото у нас фиксированный и не меняется. Поэтому все
 * нужные размеры в WebP генерируются ОДИН РАЗ на этапе сборки
 * (scripts/pregen-images.mjs → public/_img/...) и дальше отдаются как
 * обычные неизменяемые файлы с edge-кэша CDN. Рантайм-кодирования нет
 * вообще — поэтому даже самый первый заход мгновенный, и так на всех
 * страницах, у всех посетителей, и переживает любые деплои.
 *
 * Маршрутизация:
 *  - растровые картинки из /public → cdn/_img/<путь-без-расширения>/<W>.webp
 *  - .svg → исходник напрямую через CDN (оптимизировать нечего)
 *  - внешние http(s) и data:-URL → без изменений
 *
 * Ширины ДОЛЖНЫ совпадать с генерируемыми в scripts/pregen-images.mjs
 * и с deviceSizes/imageSizes в next.config.mjs.
 */
const CDN = "https://cdn.anhelspb.com";

// Должно совпадать с PREGEN_WIDTHS в scripts/pregen-images.mjs
// и с (imageSizes ∪ deviceSizes) в next.config.mjs.
const WIDTHS = [256, 384, 640, 828, 1080, 1200, 1920, 2048] as const;

type LoaderArgs = { src: string; width: number; quality?: number };

export default function cdnImageLoader({ src, width }: LoaderArgs): string {
  // Внешние URL и data: — отдаём как есть.
  if (/^(https?:)?\/\//.test(src) || src.startsWith("data:")) return src;

  const path = src.startsWith("/") ? src : `/${src}`;

  // SVG — исходник напрямую через CDN, без растеризации.
  if (path.endsWith(".svg")) return `${CDN}${path}`;

  // Берём ближайшую сгенерированную ширину >= запрошенной (с запасом —
  // на случай нестандартной ширины, чтобы не упереться в 404).
  const w = WIDTHS.find((x) => x >= width) ?? WIDTHS[WIDTHS.length - 1];

  // Расширение оставляем в пути (как отдельную папку), чтобы не было
  // коллизий между hero.png и hero.webp в одной директории.
  // /assets/products/hvs-nu.webp -> /_img/assets/products/hvs-nu.webp/828.webp
  return `${CDN}/_img${path}/${w}.webp`;
}
