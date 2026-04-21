# 06. Производительность и SEO

## Цели Lighthouse

| Метрика | Target |
|---------|--------|
| Performance | ≥ 90 |
| Accessibility | ≥ 95 |
| SEO | 100 |
| Best Practices | ≥ 95 |

## Core Web Vitals

| Метрика | Target |
|---------|--------|
| LCP (Largest Contentful Paint) | < 2.5s |
| FID (First Input Delay) | < 100ms |
| CLS (Cumulative Layout Shift) | < 0.1 |
| INP (Interaction to Next Paint) | < 200ms |

---

## Оптимизация изображений

### Правила

- **Формат:** AVIF → WebP → JPG (fallback chain через `<picture>`)
- **Размеры:** 2-3 варианта под breakpoints (mobile/tablet/desktop)
- **Lazy loading:** все изображения ниже фолда
- **Приоритет:** hero-изображение с `priority` в Next/Image

### Next/Image

```jsx
import Image from 'next/image';

<Image
  src="/products/hvs-nu.png"
  alt="Насосная станция водоснабжения"
  width={1200}
  height={900}
  priority // для hero
  placeholder="blur" // автоматический blur placeholder
  quality={85}
/>
```

### Конфиг next.config.js

```javascript
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 дней
  },
};
```

## Оптимизация видео

### Hero-видео

- **Формат:** WebM (VP9) + MP4 (H.264 fallback)
- **Размер:** ≤ 3 МБ
- **Resolution:** 1920×1080 (не 4K для web)
- **Bitrate:** 2-4 Mbps
- **Preload:** metadata

```html
<video
  autoplay
  muted
  loop
  playsinline
  preload="metadata"
  poster="/hero-poster.jpg"
>
  <source src="/hero.webm" type="video/webm" />
  <source src="/hero.mp4" type="video/mp4" />
</video>
```

### Сжатие командой ffmpeg

```bash
# WebM
ffmpeg -i source.mp4 -c:v libvpx-vp9 -crf 30 -b:v 2M -vf "scale=1920:1080" hero.webm

# MP4
ffmpeg -i source.mp4 -c:v libx264 -crf 23 -preset slow -vf "scale=1920:1080" hero.mp4
```

### IntersectionObserver — играть только в viewport

```jsx
const HeroVideo = () => {
  const ref = useRef(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play();
        else video.pause();
      },
      { threshold: 0.3 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return <video ref={ref} {...props} />;
};
```

## Оптимизация 3D-моделей

### Формат GLB

- Draco-сжатие обязательно
- Размер ≤ 2 МБ на модель
- Текстуры в KTX2 (Basis Universal) — на 5-10х меньше чем PNG

### Lazy loading

3D грузится **только на странице продукта**, не на главной:

```jsx
import dynamic from 'next/dynamic';

const Product3DViewer = dynamic(
  () => import('@/components/Product3DViewer'),
  {
    ssr: false,
    loading: () => <StaticRender />,
  }
);
```

### Draco-декодер

```jsx
import { useGLTF } from '@react-three/drei';

// Настройка Draco-декодера
useGLTF.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');

const Model = () => {
  const { scene } = useGLTF('/models/hvs-nu.glb');
  return <primitive object={scene} />;
};
```

## Code splitting

### Next.js App Router делает это автоматически

- Каждая страница — отдельный бандл
- Динамический импорт тяжёлых компонентов

```jsx
// Тяжёлые компоненты грузим только когда нужно
const HeavyAnimation = dynamic(() => import('./HeavyAnimation'), {
  loading: () => <Skeleton />,
});
```

### Bundle analyzer

```bash
npm install --save-dev @next/bundle-analyzer
ANALYZE=true npm run build
```

## Шрифты

### Правильная загрузка

```jsx
// app/layout.tsx
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-sans',
});

const mono = JetBrains_Mono({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-mono',
});

<html className={`${inter.variable} ${mono.variable}`}>
```

### Preload критических шрифтов

```jsx
<link
  rel="preload"
  href="/fonts/NeueHaas-Display.woff2"
  as="font"
  type="font/woff2"
  crossOrigin="anonymous"
/>
```

## Кеширование

### Next.js Static Generation (SSG) где возможно

```javascript
// Для страниц с контентом из CMS
export const revalidate = 3600; // пересборка раз в час

// Или ISR по запросу (через webhook из Sanity)
```

### HTTP-заголовки (Vercel)

```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/assets/:all*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
```

---

## SEO

### Мета-теги (под каждую страницу)

```jsx
// app/products/water-supply/page.tsx
export const metadata = {
  title: 'Насосная станция водоснабжения ANHEL — купить в СПб',
  description: 'Модульные насосные станции для ЖК, офисов, промышленных объектов. Собственное производство. Гарантия 5 лет. Запросите расчёт.',
  keywords: ['насосная станция', 'водоснабжение', 'anhel', 'санкт-петербург'],
  openGraph: {
    title: 'Насосная станция водоснабжения ANHEL',
    description: 'Модульные насосные станции от производителя.',
    images: ['/og/water-supply.jpg'],
    type: 'website',
    locale: 'ru_RU',
  },
  twitter: {
    card: 'summary_large_image',
  },
};
```

### Schema.org (structured data)

```jsx
// Для страницы продукта
const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Насосная станция водоснабжения HVS-NU',
  brand: { '@type': 'Brand', name: 'ANHEL' },
  manufacturer: {
    '@type': 'Organization',
    name: 'ANHEL',
    address: 'Санкт-Петербург, Политехническая ул., д. 6',
  },
  description: '...',
  image: ['...'],
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    priceCurrency: 'RUB',
  },
};

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
/>
```

### Sitemap.xml

```javascript
// app/sitemap.ts
export default async function sitemap() {
  return [
    { url: 'https://anhelspb.com', lastModified: new Date(), priority: 1 },
    { url: 'https://anhelspb.com/products/water-supply', priority: 0.9 },
    { url: 'https://anhelspb.com/products/fire-fighting', priority: 0.9 },
    { url: 'https://anhelspb.com/products/water-treatment', priority: 0.9 },
    { url: 'https://anhelspb.com/products/heat-unit', priority: 0.9 },
    { url: 'https://anhelspb.com/applications', priority: 0.8 },
    { url: 'https://anhelspb.com/about', priority: 0.7 },
    { url: 'https://anhelspb.com/contacts', priority: 0.7 },
  ];
}
```

### Robots.txt

```
User-agent: *
Allow: /

Sitemap: https://anhelspb.com/sitemap.xml
```

### Semantic HTML

```jsx
<main>
  <article>
    <header>
      <h1>...</h1>
    </header>
    <section>
      <h2>...</h2>
    </section>
    <footer>...</footer>
  </article>
</main>
```

## Доступность (a11y)

### Обязательное

- Все interactive-элементы достижимы с **Tab**
- Visible focus ring на фокусе: `outline: 2px solid #1E6FD9; outline-offset: 2px`
- Контраст текста ≥ 4.5:1 (для крупного — 3:1)
- `alt` на всех изображениях (декоративные — `alt=""`)
- `aria-label` на иконках-кнопках
- `role="img"` + `<title>` в SVG

### Skip link

```jsx
<a href="#main-content" className="skip-link">
  Перейти к основному содержимому
</a>
```

### Проверка

- axe DevTools (плагин для Chrome)
- Lighthouse → Accessibility
- WAVE Browser Extension
- Проверить с reader (VoiceOver на Mac, NVDA на Windows)

## Локализация (RU / EN)

### Структура

```
/[locale]/...

где locale: 'ru' | 'en'
```

### Next.js i18n

```javascript
// next.config.js
module.exports = {
  i18n: {
    locales: ['ru', 'en'],
    defaultLocale: 'ru',
  },
};
```

### Контент в Sanity

Каждое поле имеет варианты для обоих языков.

**RU — первая очередь** (основной рынок)  
**EN — вторая очередь** (экспорт, презентация на международных выставках)

## Мониторинг в продакшене

### Sentry (опционально)

Для отслеживания ошибок.

### Яндекс.Метрика

```jsx
// app/layout.tsx
<Script
  id="yandex-metrika"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      (function(m,e,t,r,i,k,a){...})
      (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
      ym(YOUR_COUNTER_ID, "init", {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true
      });
    `,
  }}
/>
```

### События в Метрике

- `download_pdf` — скачивание документа
- `request_quote` — отправка формы запроса КП
- `call_click` — клик по телефону
- `whatsapp_click` — клик по WhatsApp (если будет)
- `product_view` — просмотр страницы продукта

## Acceptance criteria

- [ ] Lighthouse Performance ≥ 90
- [ ] Lighthouse SEO 100
- [ ] Lighthouse Accessibility ≥ 95
- [ ] LCP < 2.5s на 4G
- [ ] CLS < 0.1
- [ ] Все изображения в AVIF/WebP
- [ ] Hero-видео ≤ 3 МБ
- [ ] 3D-модели ≤ 2 МБ и lazy-loaded
- [ ] Sitemap.xml и robots.txt присутствуют
- [ ] Schema.org на страницах продуктов
- [ ] Мета-теги OG для всех страниц
- [ ] Яндекс.Метрика подключена с events
- [ ] Cross-browser: Chrome, Safari, Firefox, Edge
- [ ] Mobile-friendly (Google Mobile-Friendly Test)
