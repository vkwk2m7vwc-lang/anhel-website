# Промпт для Cowork — боевой режим

## Первое сообщение в Cowork

---

Стартуем новый проект: редизайн корпоративного сайта **ANHEL** (anhelspb.com) — производителя инженерного оборудования в Санкт-Петербурге.

**Цель:** сайт уровня [terminal-industries.com](https://terminal-industries.com) и [mont-fort.com](https://mont-fort.com). Кинематографичный, премиум B2B, с вау-эффектом. Без компромиссов на «для соло-разработчика» — делаем полный стек сразу.

### Полная документация в корне проекта

- `README.md` — обзор
- `TZ_ANHEL.md` — полное ТЗ
- `BRAND.md` — палитра, шрифты, тон
- `docs/01_hero_section.md` — hero с видеофоном
- `docs/02_products_catalog.md` — горизонтальный pinned-скролл 4 продуктов
- `docs/03_applications.md` — интерактивный 3D-разрез здания (Three.js)
- `docs/04_product_page.md` — страница продукта с 3D-моделью
- `docs/05_animations.md` — все анимации с кодом
- `docs/06_performance_seo.md` — производительность и SEO

### Стек — полный

- **Next.js 14** (App Router) + React 18 + TypeScript
- **Tailwind CSS** + CSS-переменные из `BRAND.md`
- **Framer Motion** — микровзаимодействия, page transitions
- **GSAP** (ScrollTrigger, SplitText) — сложный скроллинг, text reveal
- **Lenis** — плавный смуз-скролл
- **Three.js** + **React Three Fiber** + **Drei** — 3D-модели продуктов и разрез здания
- **shadcn/ui** — базовые UI-компоненты
- **21st.dev** (MCP) — готовые премиум-блоки для ускорения
- **Sanity CMS** — headless-CMS для контента
- **Resend** — отправка писем из форм
- **reCAPTCHA v3** — защита форм
- **Yandex.Metrika** — аналитика
- **Vercel** — деплой

### План работы по этапам

**Этап 1 — инициализация:**
1. Создай Next.js 14 проект со всеми зависимостями из стека
2. Настрой Tailwind с кастомными переменными из `BRAND.md`
3. Подключи Google Fonts: Inter Tight (headings), Inter (body), JetBrains Mono (mono)
4. Настрой Lenis smooth scroll глобально
5. Зарегистрируй GSAP плагины (ScrollTrigger, SplitText)
6. Настрой React Three Fiber Canvas (глобальный, lazy-loaded)
7. Создай базовый layout.tsx с шапкой (скрывается при скролле вниз) и футером
8. Кастомный курсор с магнитным эффектом
9. Page transitions через чёрный занавес
10. Loading splash-screen

**Этап 2 — hero главной страницы:**
- По `docs/01_hero_section.md`
- Заглушка вместо видео: красивый динамический градиент + SVG-сетка + частицы (как на прототипе в `references/`)
- Массивный заголовок 120-180px с GSAP SplitText (появление по словам)
- CTA с магнитным эффектом
- Счётчики с одометр-анимацией

**Этап 3 — блок 4 продуктов (горизонтальный скролл):**
- По `docs/02_products_catalog.md`
- GSAP ScrollTrigger pin + horizontal scroll + snap
- Все 4 рендера продуктов уже лежат в `assets/products/`
- Tilt-эффект на продуктах
- Фоновый градиент меняется под цвет продукта
- SVG-выноски с прорисовкой линий (stroke-dashoffset)
- Индикатор прогресса сверху

**Этап 4 — страница продукта:**
- По `docs/04_product_page.md`
- 3D-модель через React Three Fiber (пока placeholder GLB с примитивными формами — заменим на реальные потом)
- Переключатель видов (общий / сверху / сбоку / разрез)
- Интерактивная таблица характеристик
- Hover на комплектации подсвечивает узел на 3D
- SVG-схема подключения с анимацией потока воды
- Форма запроса КП

**Этап 5 — блок «Применение» (Вариант A, 3D-разрез):**
- По `docs/03_applications.md`, раздел Вариант A
- 4 типа зданий: ЖК / БЦ / Завод / ТРЦ
- Three.js сцена с изометрическим разрезом
- Pulse-маркеры оборудования
- OrbitControls + auto-rotate + зум камеры при клике
- Выезжающая панель с информацией
- Пока упрощённая геометрия зданий (примитивы), детальные модели закажем потом

**Этап 6 — остальные страницы:**
- Главная: секции «О компании», «Кейсы», «Контакты»
- `/about` — история, производство, команда
- `/applications` — развёрнутая страница применений
- `/documentation` — каталог PDF
- `/contacts` — форма + Яндекс.Карта

**Этап 7 — CMS + интеграции:**
- Настройка Sanity Studio
- Модели контента: Product, Case, Application, Document, Article
- Миграция всех текстов в CMS
- Подключение форм через Resend + Telegram-уведомления
- reCAPTCHA v3 на всех формах
- Яндекс.Метрика + events

**Этап 8 — оптимизация:**
- Lighthouse 90+ по всем метрикам
- Lazy loading 3D-моделей
- Преобразование картинок в AVIF/WebP
- Схема Schema.org Product
- Sitemap.xml, robots.txt, OG-теги
- Mobile-адаптация (без pin-scroll, свайп-карусели вместо)
- `prefers-reduced-motion` support

**Этап 9 — деплой:**
- Vercel с custom domain
- Настройка окружений (dev/staging/prod)
- SSL, headers, кеширование
- Тестирование на разных девайсах

### Правила работы

- **Перед каждым этапом** показываешь план, ждёшь моего «ок»
- **Коммиты** с префиксами: `feat:`, `fix:`, `style:`, `refactor:`, `docs:`, `chore:`
- **TypeScript strict mode** — никаких `any`
- **Все анимации** уважают `prefers-reduced-motion`
- **Семантический HTML** — `<header>`, `<main>`, `<section>`, `<article>`
- **ARIA-labels** на всех интерактивных элементах
- **Responsive** — mobile-first, breakpoints: 640 / 768 / 1024 / 1280 / 1536
- **Код на английском**, тексты сайта на русском
- Рендеры в `assets/products/` — только читаем, не меняем
- Используй **21st.dev** когда можно взять готовый блок и адаптировать — не делай всё с нуля

### Подсказки для ускорения через 21st.dev

На этапах 2-6 прежде чем верстать с нуля — проверяй 21st.dev:
- Этап 2 (hero) — «animated hero with gradient background»
- Этап 3 (horizontal scroll) — «horizontal scroll products»
- Этап 6 (forms) — «contact form with validation»
- Этап 6 (карусели кейсов) — «testimonials slider»

Найди подходящий компонент → адаптируй под `BRAND.md` палитру и шрифты.

### Начни с Этапа 1

1. Прочитай `TZ_ANHEL.md` и `BRAND.md` полностью
2. Посмотри референсы в `references/` и прототип hero
3. Покажи развёрнутый план Этапа 1: какие команды, какая структура файлов, что в каком файле
4. Жду подтверждения перед запуском
