# ANHEL — Редизайн корпоративного сайта

Проект редизайна сайта [anhelspb.com](https://anhelspb.com/main/) — производителя инженерного оборудования в Санкт-Петербурге.

**Цель:** уровень [terminal-industries.com](https://terminal-industries.com) и [mont-fort.com](https://mont-fort.com). Без компромиссов.

## Структура проекта

```
anhel_website/
├── README.md                    ← этот файл
├── PROMPT_COWORK.md             ← готовый промпт для Cowork
├── TZ_ANHEL.md                  ← полное техническое задание
├── BRAND.md                     ← палитра, шрифты, тон
├── docs/
│   ├── 01_hero_section.md       ← hero с видеофоном
│   ├── 02_products_catalog.md   ← горизонтальный скролл 4 продуктов
│   ├── 03_applications.md       ← интерактивный 3D-разрез здания
│   ├── 04_product_page.md       ← страница продукта с 3D
│   ├── 05_animations.md         ← все анимации
│   └── 06_performance_seo.md    ← производительность и SEO
├── references/                  ← скриншоты референсов
└── assets/
    └── products/                ← рендеры продуктов
```

## Продукты (4 направления)

1. **Насосная станция водоснабжения** (HVS-NU) — акцент синий
2. **Насосная станция пожаротушения** — акцент красный
3. **Установка водоподготовки** (VPU) — акцент стальной
4. **Блочный индивидуальный тепловой пункт** (БИТП HEAT) — акцент тёплый

## Референсы

- [terminal-industries.com](https://terminal-industries.com) — видеофоны, scroll-storytelling, счётчики
- [mont-fort.com](https://mont-fort.com) — премиум B2B, плавный смуз-скролл, горизонтальные секции
- Apple Product Pages — интерактивные 3D-модели продуктов

## Стек

**Frontend:** Next.js 14 · TypeScript · Tailwind CSS · Framer Motion · GSAP · Lenis · Three.js / React Three Fiber · shadcn/ui · 21st.dev

**Backend/CMS:** Sanity · Resend · reCAPTCHA v3

**Инфраструктура:** Vercel · Yandex.Metrika

## Старт работы в Cowork

1. Распакуй папку в директорию на диске
2. Подключи **21st.dev** как MCP в Cowork (2 минуты — регистрация + API-ключ)
3. Создай проект в Cowork, укажи эту папку
4. Создай новый чат с названием `01_Инициализация`
5. В первое сообщение скопируй содержимое `PROMPT_COWORK.md`
6. Дальше идём по этапам 1 → 9

## Что ещё понадобится (подключишь по ходу)

- **21st.dev** — API-ключ на [21st.dev](https://21st.dev)
- **Sanity** — бесплатный аккаунт на [sanity.io](https://sanity.io) (этап 7)
- **Resend** — API-ключ на [resend.com](https://resend.com) (этап 7)
- **reCAPTCHA v3** — ключи на [google.com/recaptcha](https://www.google.com/recaptcha) (этап 7)
- **Vercel** — через GitHub-аккаунт на [vercel.com](https://vercel.com) (этап 9)
- **Yandex.Metrika** — счётчик на [metrika.yandex.ru](https://metrika.yandex.ru) (этап 9)

## Контакты

Санкт-Петербург, Политехническая ул., д. 6, стр. 1, пом. 1-Н
+7 (812) 416-4500 · info@anhelspb.com
