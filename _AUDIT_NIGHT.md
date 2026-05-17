# Ночной аудит ANHEL — 2026-05-17

> Автономный спринт пока Алексей спит.
> Старт ~02:30, цель к 10:00.

---

## Статус Resend production

**ПРОПУЩЕНО** на старте по правилу инструкции.

**Причина:** в sandbox-окружении нет:
- доступа к telephone Алексея для SMS-кодов NIC.RU и Resend Dashboard;
- сохранённых паролей от nic.ru / resend.com;
- доступа к Vercel ENV без auth-токена.

**Что нужно от Алексея:**
1. Залогиниться на resend.com → Domains → Add Domain `anhelspb.com` (region EU) → выписать SPF/DKIM/DMARC.
2. Залогиниться на nic.ru → добавить 3 TXT-записи (НЕ трогать A/NS/MX).
3. Vercel → Project → Settings → Environment Variables:
   - `QUIZ_RECIPIENT_EMAIL=info@anhelspb.com`
   - `QUIZ_BCC_EMAIL=anurin7@gmail.com`
4. Через 15–30 мин — Resend → Verify.
5. Когда verified → создать ветку `feat/resend-production`, переключить `fromAddress`:

```ts
// src/lib/email/sendEmail.ts
const fromAddress = process.env.NODE_ENV === 'production'
  ? 'ANHEL® <noreply@anhelspb.com>'
  : 'onboarding@resend.dev';
```

После аудита я **не трогаю** sendEmail.ts — переключение делается атомарно вместе с verify.

---

## Метрики аудита (обновляется в процессе)

- Дата старта: 2026-05-17 ~02:30
- Method: grep-driven systematic audit (без скриншотов, экономия контекста)
- Stack baseline: main = v1.20.7, Next.js 14.2.35

---

## Найдено по приоритету (итог по проходам)

- 🔴 Критичных: **1** (H1 — schema-org address, **исправлено в коммите dfdfb88**)
- 🟡 Видимых: **6** (C1 hardcoded accent hex, E4 ТИТАН, H2 logo, H3 lang, H4 postal-fix, H5 og-image, H6 sitemap)
- 🟢 Косметических: **3** (C3 image placeholder, D4 footer contacts link, i18n aria-label)
- ✅ Исправлено автоматически (`fix/night-audit-1` коммит `dfdfb88`): **3** правки в 6 файлах
- ⏸ Ждёт решения Алексея: **5**

---

## ПРОБЛЕМЫ (по областям)

### A. ВИЗУАЛЬНАЯ КОНСИСТЕНТНОСТЬ

#### #A1 — Скругление `rounded-lg` (12px) объявлено в tailwind.config, но не используется в коде

**Где:** `tailwind.config.ts:143` определяет `lg: "12px"`; grep по `rounded-lg\b` в `src/` — **0 совпадений**.
**Приоритет:** 🟡 (видимое — карточки секций крупного формата без скругления, как было в дизайн-системе предусмотрено)
**Категория:** Design tokens / unused
**Статус:** задокументировано

**Описание:**
Дизайн-система задаёт 5-уровневую шкалу `0 / 4 / 6 / 12 / full`. На практике используются только `sm` (4), default (6), `full` (9999). Большие 12px-карточки нигде не применены — все cards рендерятся `rounded-sm` (4px), что даёт жёсткий «инженерный» вид. Это либо стилистическое решение, либо оставшийся пробел.

**Предлагаемый фикс:**
1. Если 4px — намеренный outcome → удалить `lg: "12px"` из tailwind.config, чтобы шкала не врала.
2. Если 12px должны быть на больших cards (`/products` плитки разделов, `/projects` карты-portfolio, BrandsStrip) → применить `rounded-lg` целенаправленно.

**Ждёт решения Алексея.**

---

### B. ТИПОГРАФИКА

#### #B1 — Type scale полностью чистая

`grep "font-(thin|extralight|light|black|extrabold)"` → **0 матчей**. Веса ограничены 400/500/600/700 как и заявлено в tailwind.config. ✅

#### #B2 — `tabular-nums` присутствует в правильных местах

Найдено в 6 файлах: `HeroCounters`, `HeroCountersMobile`, `TechSpecsGrid`, `VpuModificationsTable`, `QuickQuoteSection`, `globals.css` (class). ✅

---

### C. ЦВЕТА И СКРУГЛЕНИЯ

#### #C1 — 🔴 Hardcoded hex для `treatment`/`heat` в JS не совпадают с light-вариантами CSS-переменных

**Где:**
- `src/components/product-page/ProductHero.tsx:23-28` — `ACCENT_HEX.treatment="#8A94A0", heat="#E8873B"`
- `src/lib/hero-products.ts` — те же hardcoded hex для accent
- `src/lib/products.ts` — `accentHex` тоже dark-вариант

`globals.css`:
```
:root  --accent-treatment: #5c6670;  --accent-heat: #c7711e;   (light)
.dark  --accent-treatment: #8a94a0;  --accent-heat: #e8873b;   (dark)
```
**Приоритет:** 🟡 (по факту светлая тема — это default `:root`, но `defaultTheme="dark"` в next-themes; невидимо большинству пользователей, но критично если переключатель темы используется)
**Категория:** Theming / glow math
**Локали:** все
**Статус:** задокументировано

**Описание:**
В ProductHero glow-эффект и tilt-математика используют hardcoded hex, заявленные в комментарии как «in sync with globals.css». Но синхронизация только с `.dark`. В light theme на страницах `/products/water-treatment`, `/products/heating-unit` glow вокруг продукта будет иметь другой hue, чем рамки/иконки тех же продуктов через CSS-vars.

**Предлагаемый фикс:**
Считывать computed value переменной `--accent-current` через `getComputedStyle` или переключать ACCENT_HEX по `useTheme()` resolved theme.

#### #C2 — `#FF6B35` (audit checklist) — нигде, кроме одной SVG-сцены

Единственное вхождение: `src/components/products/firefighting/lakhta/LakhtaScene.tsx:680` — это **внутри SVG-иллюстрации** (искра/уголёк), цвет визуально отличается от `--accent-fire`=#D72638. Намеренная палитра внутри сцены. ✅ ОК.

#### #C3 — `bg-[#141414]` hardcoded в CasesCarousel

**Где:** `src/components/product-page/CasesCarousel.tsx:84`
**Приоритет:** 🟢
**Статус:** ✅ исправлено в ветке `fix/night-audit-tokens` (см. ниже)

**Описание:**
Тёмный плейсхолдер за слайдом cases — должен быть `bg-[var(--color-image-placeholder)]` для корректной работы в обеих темах.

---

### D. ССЫЛКИ И НАВИГАЦИЯ

#### #D1 — ✅ Header nav order соответствует правилу проекта

`src/components/layout/Header.tsx:67-72`:
Products · Projects · Documents · About (`/#about`) · Service · Contacts. ✅ Соответствует правилу `feedback_header_no_megamenu`.

#### #D2 — ✅ Все `target="_blank"` имеют `rel="noopener noreferrer"`

Проверено 5 файлов: DocumentsGrid, BrandsStrip, contacts page, documents page, VpuModificationsTable. ✅

#### #D3 — ✅ Все якорные ссылки имеют целевые элементы

- `/#about` → `id="about"` в `AboutSection.tsx:29` ✅
- `/documents#questionnaires|#catalogs|#certificates` → все три id присутствуют в `documents/page.tsx` ✅
- `/contacts#requisites` → `id="requisites"` в `contacts/page.tsx:189` ✅

#### #D4 — 🟢 Footer не содержит ссылку на саму страницу `/contacts`

**Где:** `src/components/layout/Footer.tsx:87-107` — пятая колонка озаглавлена "Контакты", но содержит **прямые** mailto/tel/адрес, а не Link на `/contacts`.
**Приоритет:** 🟢 (рассмотрено как UX-фича — даём пользователю прямой контакт, а не редирект на страницу)
**Статус:** ⏸ к обсуждению с Алексеем

Если хочется добавить — заголовок «Контакты» можно сделать кликабельным `/contacts`, а данные оставить ниже как сейчас.

---

### E. КОНТЕНТНАЯ ВЫВЕРКА

#### #E1 — ✅ `sales@anhelspb.com` отсутствует в `src/`

Grep по всему src — 0 совпадений. (Только в `_PROGRESS.md` — историческая запись.) ✅

#### #E2 — ✅ `info@anhelspb.com` единый источник

14 файлов: layout email-шаблона, PDF КП, контактные lib/contacts.ts, документы/quiz/service шаги, i18n messages всех 3 локалей. ✅

#### #E3 — ✅ MFMC только в комментариях кода

Все `mfmc`/`МФМК` упоминания — только в TS-комментариях как ссылки на OEM-источник (`Источник: mfmc.ru/...`). Не попадают в рендер. Соответствует правилу проекта. ✅

#### #E4 — ⚠ `ТИТАН Контрол` / `TITAN Control` в BrandsStrip 5 продуктов

**Где:** в RU/EN/TR локалях:
- `src/content/products/locales/{ru,en,tr}/firefighting.ts`
- `src/content/products/locales/{ru,en,tr}/heating-cooling.ts`
- `src/content/products/locales/{ru,en,tr}/water-supply.ts`
- `src/content/products/locales/{ru,en,tr}/pressure-boost.ts`
- `src/content/products/locales/{ru,en,tr}/special.ts`

`{ id: "titan", name: "ТИТАН Контрол" }` в массиве brands. Без `href`.

**Приоритет:** ⏸ ждёт решения
**Категория:** Контент / форбидден-листинг

**Описание:**
Аудит-инструкция перечисляет `ТИТАН` как запрещённое (наряду с АЛЬФА/ОМЕГА — старые названия MFMC-линеек). Здесь это выглядит как реальный российский бренд электрооборудования («ТИТАН-Контрол» — производитель ВРУ/АВР), а не MFMC-наследие. Появляется как **компонентный поставщик** наряду с Weintek, IEK, КЭАЗ, EKF, ГМС.

**Решение Алексея:**
1. Если это легитимный поставщик контроллеров для шкафов → оставить, добавить `href`.
2. Если это MFMC-фрагмент из импорта → удалить из всех 5×3=15 файлов локалей.

#### #E8 — Прочее: TODO-комментарии для Алексея (не для запуска критично)

`src/content/products/vpu-anhel-series-modifications.ts:88,108,148`:
```
TODO Алексей: заменить на подпапку «2 линии» в Яндекс.Диске
TODO Алексей: заменить на подпапку «3 линии» в Яндекс.Диске
TODO Алексей: заменить на подпапку «5 линий» в Яндекс.Диске
```
Это placeholder-пути на Яндекс.Диск для галерей VPU-модификаций. К запуску можно жить.

#### #E9 — `console.log/error` в коде

Все `console.*` calls только в API routes (`src/app/api/**`) — серверные, идут в Vercel runtime logs. Клиентских debug-логов нет. ✅

#### #E5 — ✅ Счётчики 150 / 12 / 4 / 24 синхронизированы

`HeroCounters` (desktop), `HeroCountersMobile`, `meta.json description` — везде 150+ объектов. Лет: 12 (везде). Гарантия: 24 мес. ✅

`срок службы не менее 10 лет` в продуктовых описаниях — это product lifetime, **другая метрика**, не company experience. ✅

#### #E6 — ✅ `Setl`/`ПИК`/`Эталон`(=холдинг) — отсутствуют

В коде/мессаджах/content/projects — 0 совпадений как названий клиентов. `Эталон` встречается только в TS-комментариях как русское слово «образец» («Эталон правки — /products + /service»). Соответствует правилу проекта `project_setl_portfolio_coverage`. ✅

#### #E7 — Реквизиты ПРОФИТ в `lib/legal.ts`, `messages/{ru,en,tr}/contacts.json`, PDF-шапке — синхронизированы

ОГРН 1137847188357, ИНН 7802825464, КПП 780201001 — везде одинаковы. Адрес «Политехническая ул., д. 6, стр. 1, помещ. Н-7» — везде. ✅

ОДНО исключение → #H1 ниже.

---

### F. ДОКУМЕНТЫ
**Проверено через grep:**
- ✅ Все PDF-шаблоны (`src/lib/pdf/generate-kp.ts`, `src/lib/pdf/questionnaire-pdf.ts`) содержат `info@anhelspb.com` + `ОГРН 1137847188357 · ИНН 7802825464 · КПП 780201001` + правильный адрес «Политехническая ул., 6, стр. 1, пом. Н-7».
- ✅ PDF в `/public/docs/` присутствуют по 8 категориям + service-request-anhel*.pdf (RU/EN/TR).
- ⏸ Открытие каждого PDF и визуальная проверка (шрифт без кракозябр, шапка с ANHEL®) — не сделана автоматически. Выборочно проверить вручную утром.

---

### G. РАЗРЕШЁННЫЕ ОЕМ-БРЕНДЫ

#### #G1 — Wilo/Grundfos/Danfoss/Ridan/Alfa Laval/Lowara — допустимы в Section 05 (BrandsStrip)

Section 05 по проектной структуре — «Бренды-партнёры, с которыми мы работаем». Это **исключение** из общего правила о сторонних брендах (правило цитирует «только если в исключениях»). У всех брендов есть `href` на их официальные сайты. ✅

---

### H. SEO И META

#### #H1 — 🔴 schema-org `streetAddress` имеет неправильный номер помещения

**Где:** `src/lib/schema-org.ts:52`

```ts
streetAddress: "Политехническая ул., д. 6, стр. 1, пом. 1-Н",   // ❌ "1-Н"
```

Везде остальном — `пом. Н-7` (lib/legal.ts, lib/contacts.ts, i18n contacts.json все 3 локали, PDF КП, Footer).

**Приоритет:** 🔴 (структурированные данные для Google — снижают качество индексации, могут попасть в knowledge graph)
**Категория:** SEO / Schema.org
**Локали:** RU (schema-org встроена в layout для всех локалей)
**Статус:** ✅ исправлено — см. `fix/night-audit-seo`

**Фикс:** заменить `пом. 1-Н` → `пом. Н-7`.

#### #H2 — 🟡 schema-org logo указывает на изображение продукта, не на бренд-лого

**Где:** `src/lib/schema-org.ts:47` — `logo: ${SITE_URL}/assets/products/hvs-nu.webp`

**Приоритет:** 🟡
**Категория:** SEO / Schema.org
**Статус:** ⏸ ждёт решения

**Описание:**
Google использует `Organization.logo` для отображения в результатах поиска. Сейчас указано фото насоса. Правильнее — `/logo.svg` или `/assets/brand/anhel-logo.svg`, если такой есть.

**Решение Алексея:**
Указать путь до бренд-лого (вероятно `/icon.svg` или подобный) и обновить запись.

#### #H3 — 🟡 schema-org `availableLanguage` указывает только `["ru"]`, но сайт мультиязычный

**Где:** `src/lib/schema-org.ts:63`
**Приоритет:** 🟡
**Категория:** SEO / i18n
**Статус:** ✅ исправлено — см. `fix/night-audit-seo`

**Фикс:** `availableLanguage: ["ru", "en", "tr"]`.

#### #H4 — 🟡 schema-org `address` не содержит `postalCode: "194021"`

**Где:** `src/lib/schema-org.ts:50-55`
**Приоритет:** 🟡
**Категория:** SEO / структурированные данные
**Статус:** ✅ исправлено — см. `fix/night-audit-seo`

**Фикс:** добавить `postalCode: "194021"` в `PostalAddress`.

#### #H5 — 🟡 OG-картинка (`openGraph.images`) не задана ни в layout, ни в продуктовых страницах

**Где:** `src/app/[locale]/layout.tsx:94-101` — `openGraph` без `images`. Также не задано в `generateMetadata` каждой страницы.
**Приоритет:** 🟡
**Категория:** SEO / соц-превью
**Локали:** все 3
**Статус:** ⏸ ждёт решения

**Описание:**
Telegram, WhatsApp, FB, LinkedIn — при шаринге любой страницы покажут пустой или дефолтный превью. Для B2B-маркетинга это видимо снижает CTR ссылок.

**Что нужно от Алексея:**
1. Создать брендированный OG-image (1200×630, `/public/og/default.png`) — простой layout: лого ANHEL® + tagline + темный фон.
2. (Опционально) per-product OG: hero-фото продукта + надпись.
3. Добавить в layout.tsx:
```ts
openGraph: {
  ...,
  images: [{ url: '/og/default.png', width: 1200, height: 630, alt: 'ANHEL®' }],
},
twitter: {
  ...,
  images: ['/og/default.png'],
},
```

#### #H6 — 🟡 `sitemap.xml` не включает половину публичных маршрутов

**Где:** `src/app/sitemap.ts:54-58` — итерируется только `["/", ...PRODUCTS.href]`.
**Приоритет:** 🟡
**Категория:** SEO / индексация
**Статус:** ⏸ ждёт решения

**Описание:**
sitemap содержит только главную + детальные страницы продуктов. **НЕ включены:**
- `/products` (catalog index)
- `/products/pumps`, `/products/water-treatment`, `/products/heating-unit`, `/products/control-systems` (категориальные)
- `/products/heating-unit/[slug]` (8 модулей)
- `/projects`, `/projects/[slug]` (портфолио)
- `/documents`, `/service`, `/service/request`, `/contacts`
- `/quiz/{pumps,vpu,itp,aupd,control-systems}` (5 страниц)
- `/privacy-policy`, `/personal-data-consent`

Это значит Google не получит явное приглашение индексировать эти URL'ы (они индексируемы через crawling, но sitemap = explicit hint).

**Предлагаемый фикс:**
В `sitemap.ts` собрать `paths` из:
- `["/", "/products", "/projects", "/documents", "/service", "/service/request", "/contacts", "/privacy-policy", "/personal-data-consent"]`
- + `PRODUCTS.map(p => p.href)` (как сейчас)
- + список 8 heating-unit modules (нужен импорт из `src/content/products/heating-unit-modules/data.ts`)
- + 4 category indices (`/products/pumps`, etc.)
- + 5 quiz pages
- + список `/projects/[slug]` из projects content

#### #H7 — 🟢 На /service нет страницы 404 для несуществующих PDF-ссылок в footer-карточках

Beyond scope of this audit, just noting in case Алексей хочет проверить — все ссылки в FooterCta и DocumentsGrid читают `href` из content-объектов; невалидные пути дадут 404 от Next. Можно добавить middleware валидацию.

---


## Итог ночного аудита

**Проходов сделано:** 7 (grep-driven, без скриншотов)

1. **Pass 1 — Customer Journey** — пропущен (без рендера в headless невозможно без скринов; покрыто статически через структуру `app/[locale]/*`)
2. **Pass 2 — Designer/Visual consistency** — частично через grep (radius/typography/tokens)
3. **Pass 3 — Typography** ✅ → ноль нарушений type scale
4. **Pass 4 — Radius + colors** ✅ → ноль `rounded-md/2xl/3xl/pill`; найдены 3 hardcoded-hex проблемы
5. **Pass 5 — Content/i18n** ✅ → `sales@` и `Setl/ПИК/Эталон` чисто; `ТИТАН Контрол` требует решения
6. **Pass 6 — Links/Nav/Footer** ✅ → `rel="noopener"` везде; якоря рабочие
7. **Pass 7 — SEO/a11y** ✅ → найдена реальная критичная проблема в schema-org

### Найдено и закоммичено в `fix/night-audit-1` (`dfdfb88`)

| # | Файл | Что сделано |
|---|---|---|
| H1 🔴 | `src/lib/schema-org.ts` | `пом. 1-Н` → `пом. Н-7` (синхр. с lib/legal.ts) |
| H3+H4 🟡 | `src/lib/schema-org.ts` | + `postalCode: "194021"`, `availableLanguage: [ru,en,tr]` |
| C3 🟢 | `src/components/product-page/CasesCarousel.tsx` | `bg-[#141414]` → `bg-[var(--color-image-placeholder)]` |
| a11y 🟢 | `src/components/layout/LanguageSwitcher.tsx` + 3 common.json | hardcoded EN aria-label → i18n |

Typecheck: ✅ зелёный (`npx tsc --noEmit` clean).

### Ждёт решения Алексея

1. **#C1 — accent hex для light-темы** — `ACCENT_HEX.treatment="#8A94A0"` в ProductHero/hero-products/products — это dark-вариант. В light theme glow эффекта не совпадёт с CSS-vars (`--accent-treatment: #5c6670`). Аналогично для `heat` (`#E8873B` vs `#c7711e`). Видимая проблема только на сайте при переключении темы.
   **Что выбрать:** считать `--accent-current` через `getComputedStyle` ИЛИ переключать ACCENT_HEX по `useTheme()` resolved theme.

2. **#A1 — `rounded-lg` (12px) определён, но не используется** — все cards рендерятся `rounded-sm` (4px). Или удалить из шкалы, или прицельно применить на крупные карточки (`/products` плитки, `/projects` карты, BrandsStrip).
   **Что выбрать:** 4px-only (удалить lg) или 12px на section-level cards.

3. **#E4 — ТИТАН Контрол** в BrandsStrip 5 продуктов × 3 локали (15 файлов). Аудит-инструкция перечисляет `ТИТАН` как запрещённое. Возможно реальный российский бренд, не MFMC-наследие.
   **Что выбрать:** оставить (с добавлением href) или удалить из всех 15 файлов.

4. **#H2 — schema-org logo** указывает на фото продукта (`/assets/products/hvs-nu.webp`), не на бренд-лого.
   **Что выбрать:** путь до canonical брендового лого.

5. **#H5 — OG-image нет** ни в layout, ни в page-level metadata. Соц-превью пустые.
   **Что нужно:** дизайнер делает `/public/og/default.png` (1200×630). Я могу прописать в layout.tsx ссылку, когда файл готов.

6. **#H6 — sitemap.xml неполный** — отсутствует ~15 публичных маршрутов (/projects/[slug], /quiz/*, /documents, /service, /service/request, /contacts, /privacy-policy, /personal-data-consent, /products + 4 категории, 8 heating-unit модулей).
   **Что выбрать:** генерировать sitemap из единого манифеста маршрутов; помочь сделать первый патч могу.

7. **#D4 — нет ссылки на `/contacts`** в футере, только данные (телефон/email/адрес). Решение UX-стилистическое.

### Resend production

**Не выполнено.** В Cowork sandbox нет:
- доступа к телефону для SMS NIC.RU / Resend Dashboard;
- сохранённых паролей resend.com / nic.ru;
- доступа к Vercel ENV без OAuth.

См. секцию «Статус Resend production» вверху файла — список действий для Алексея.

### Lighthouse

**Не запущен** — нет рабочего dev-сервера / chrome-headless внутри sandbox. На офисном iMac утром:
```
npm run build && npm start &
npx lighthouse http://localhost:3000 --view --preset=desktop
npx lighthouse http://localhost:3000/products/pumps/firefighting --view
npx lighthouse http://localhost:3000/quiz/pumps --view
```

### Что не успел проверить

- Реальный рендер страниц (нужен dev-сервер или Chrome MCP):
  - визуальная высота Hero на 18 продуктовых страницах
  - mono-tag формат «01 ·» vs «01·» на каждой странице
  - 6 пунктов в AdvantagesGrid на каждой продуктовой
  - длинные тексты / эмодзи / SQL в формах (edge cases)
  - mobile menu drag-to-close
  - LoadingSplash в обеих темах
- PDF-файлы в `/public/docs/`:
  - открываются?
  - кириллица без кракозябр?
  - брендинг ANHEL® на всех?
  - footer одинаковый?
- Lighthouse + axe-core + pa11y
- Open Graph image preview в Twitter Card validator / Facebook Sharing Debugger

### Готовность к запуску

**Оценка: ~92%**

Основания:
- Дизайн-система чистая (typography, radii) ✅
- Контент чистый (sales@, Setl, ПИК — нигде) ✅
- Реквизиты синхронизированы (после schema-org-фикса) ✅
- Email production не подключен → quiz/forms не доедут до клиента (**КРИТИЧНО для запуска**)
- OG-image отсутствует → социальные шаринги выглядят непрофессионально (**не блокер запуска**)
- sitemap неполный → Google всё равно crawl-ит, но медленнее (**не блокер**)
- Один структурный вопрос (ТИТАН Контрол) — решается за 5 минут

**Блокер запуска № 1:** Resend production (без него ни одна форма не работает на anhelspb.com).
**Блокер запуска № 2:** OG-image хотя бы дефолтный.

Всё остальное — пост-запуск.

---

## Команды для Алексея утром

```bash
# 1) посмотреть что закоммичено
git log --oneline main..fix/night-audit-1

# 2) посмотреть diff
git diff main..fix/night-audit-1

# 3) запушить ветку для Vercel preview
git push origin fix/night-audit-1

# 4) если ок — merge в main (squash или merge-commit)
git checkout main && git pull && git merge fix/night-audit-1 --no-ff -m "merge: night audit fixes"
git push origin main

# 5) опционально — тэг
git tag v1.20.8-night-audit
git push origin v1.20.8-night-audit
```

**Изменённые файлы (4 + 1 markdown):**
- `src/lib/schema-org.ts` (3 правки) 🔴 SEO-критичная
- `src/components/product-page/CasesCarousel.tsx` (1 правка)
- `src/components/layout/LanguageSwitcher.tsx` (3 правки)
- `src/messages/{ru,en,tr}/common.json` (по 1 ключу-пару в каждом)
- `_AUDIT_NIGHT.md` (этот файл, доку аудита)
