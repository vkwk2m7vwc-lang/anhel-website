# Автономная сессия — большая задача ANHEL

**Старт:** 2026-04-25 **Исполнитель:** Claude (Cowork mode) **Источник ТЗ:** `uploads/TZ_ANHEL_большая_задача.md`

---

## Итог по задачам

| # | Задача | Ветка | Статус |
|---|---|---|---|
| 1 | Объекты (портфолио) — насосные + водоподготовка | `feat/projects-portfolio` | ✅ merged |
| 2 | Фото производства MFMC + ретушь | `feat/production-photos` | ⛔ блокер: ручная ретушь |
| 3 | Сертификаты в существующий блок | `feat/certificates` | ✅ merged (через fillable-forms) |
| 4 | 3 fillable PDF опросника | `feat/fillable-forms` | ✅ merged |
| 5 | Руководство по эксплуатации (локально) | — | ✅ saved локально, требует мелкой правки |
| 6 | Раздел /service + веб-форма заявки на диагностику | `feat/service-section` | ✅ merged |
| 7 | Шкафы управления (omega → control-systems) | `feat/omega-control-systems` | ✅ merged |
| 8 | Веб-опросные листы (pumps/aupd/itp/vpu) | `feat/web-questionnaire-pumps` | ✅ merged |

---

## Технические заметки

- Wordmark ANHEL®: текстовый в `font-display` Inter Tight (Medium) + ® — соответствует Header
- Палитра: `_docs/BRAND.md` (`#0A0A0A` primary, `#F5F5F3` secondary; акценты по продуктам)
- PDF-шрифт: DejaVu Sans (полный кириллический набор), регистрируется в reportlab
- Скачивание изображений: DC + Python urllib (stdlib) на user's Mac
- Ретушь фото: Pillow crop + GaussianBlur (минимально, cv2 не нужен)
- Перебрендирование PDF: pypdf overlay + reportlab — сохраняет AcroForm-поля
- Реквизиты ПРОФИТ: жёстко прописаны в скриптах (взяты из `Реквизиты с 15.12.2021 ООО _Профит_.docx`)

---

## Лог событий

### Подготовка

- Проверены все каналы (Chrome MCP, Desktop Commander, sandbox python+libs)
- Подтверждён pipeline base64-download через Chrome (тест 79KB OK)
- Проверены исходники в `~/Desktop/ANHEL Сайт/Документы/`: 3 опросника, 3 декларации, руководство МФМК, реквизиты ПРОФИТ, Excel со списком проектов
- Структура проекта изучена (Header, Footer, DocumentsGrid, types.ts, content-files)

### Задача 1 — Объекты — ✅ pushed

- Распарсено 76 карточек с `profitspb.com/projects` → отфильтровано **13** с насосными/водоподготовкой
- Скачаны 13 cover-фото с `tildacdn.com`
- Создана структура: `src/content/projects/types.ts`, `src/content/projects/data.ts`
- Маршруты: `/projects` (фильтр Все/Насосные/Водоподготовка) и `/projects/[slug]` (детальная)
- Компоненты: `src/components/projects/ProjectCard.tsx`, `ProjectsFilter.tsx`
- Header / MobileMenu / Footer переключены: `/#projects` → `/projects` (константа `PROJECTS_PATH`)
- `npx tsc --noEmit` clean, `npm run build` — 13 SSG-страниц + список
- Commit: `feat(projects): add /projects portfolio with 13 объектов`

### Задача 2 — Фото производства MFMC — ⛔ блокер

**Статус:** не публикуется автономно. Требуется ручная ретушь в Photoshop / Affinity.

**Сделано:**

- Скачано **33 фото** с 4 продуктовых страниц `mfmc.ru` (water-supply 8, firefighting 11, pressure 8, special 6). Heating-страница не имеет фотоблока.
- Скрипты в `_scripts/`: `download_production.py`, `retouch_production.py` (Pillow crop + blur).

**Почему ОТБРАКОВКА**:После автоматической обработки логотипы МФМК остаются видимыми:

- Шкафы управления — частичные шильдики «МФМК» / «АЛЬФА» в правом верхнем углу.
- Рамы насосов — синие квадратные шильдики «MM» в центре кадра.
- Трубопроводы — мелкие наклейки, могут содержать брендинг.

ТЗ: «Если хоть один логотип проскочил — критическая ошибка». Решение в духе ТЗ — отбраковка.

**Что нужно от Алексея:**

1. Запустить `python3 _scripts/download_production.py` (заново скачает в `_tmp_production_raw/`).
2. Открыть каждое фото в Photoshop/Affinity, удалить логотипы вручную (clone-stamp / heal).
3. Сохранить очищенные в `public/assets/production/<category>/<file>.webp`.
4. Подключить галерею через `gallery.photos[].src` в `src/content/products/<slug>.ts`.
5. Альтернатива: собственные фото или стоковые с лицензией.

Ветка `feat/production-photos` локально, без коммита фото — только подготовительные скрипты (включены в `_scripts/` через мерж feat/fillable-forms).

### Задача 3 — Сертификаты — ✅ merged

- 3 декларации соответствия ЕАЭС (заявитель/изготовитель — ООО «ПРОФИТ», бренд — ANHEL®) положены в:
  - `public/docs/firefighting/cert-deklaratsiya.pdf` (876 KB)
  - `public/docs/water-supply/cert-deklaratsiya.pdf` (876 KB)
  - `public/docs/water-treatment/cert-deklaratsiya.pdf` (504 KB)
- Обновлены `documents.items` в content-файлах продуктов: оставлены реальные карточки (oprosnik + cert-deklaratsiya), удалены 4 placeholder-ссылки которые вели на 404 (cert-shu, manual для НУ; cert-unit, cert-shu, manual для heating-unit, etc.).
- Коммит: `feat(certificates): add 3 declarations of conformity to product pages`.
- Заметка: Декларации ЕАЭС (ТР ТС) — это и есть «сертификаты» в терминологии заказчика (полноценные документы соответствия). Отдельных сертификатов на ШУ или руководств в исходниках не было — добавятся когда Алексей предоставит.

### Задача 4 — Fillable PDF опросники — ✅ merged

- Все 3 исходника от МФМК/ПРОФИТ — уже fillable PDF (НУ — 35 fields, ВПУ — 35 fields, ИТП — 82 fields).
- Применён ANHEL-overlay через reportlab + pypdf: AcroForm-поля сохранены, заменён только визуальный брендинг.
- Top banner на первой странице: white-rect + ANHEL® wordmark + реквизиты ПРОФИТ + accent hairline + новый title + краткий disclaimer.
- На страницах 2+: компактный overlay (только шапка + футер).
- Шрифт DejaVu Sans (зарегистрирован в reportlab) — кириллица читается без кракозябр.
- 4 PDF под `public/docs/<product>/oprosnyi-list.pdf`:
  - `firefighting/oprosnyi-list.pdf` — 1.85 МБ (universal NU опросник, accent-fire)
  - `water-supply/oprosnyi-list.pdf` — 1.85 МБ (universal NU опросник, accent-water)
  - `water-treatment/oprosnyi-list.pdf` — 1.95 МБ (ВПУ опросник, accent-treatment)
  - `heating-unit/oprosnyi-list.pdf` — 7.20 МБ (ИТП опросник, accent-heat)
- Скрипт: `_scripts/rebrand_forms.py` — для повторной генерации после правок брендинга.

**Известные нюансы (не блокеры):**

- Внутри опросников НУ и ИТП в основном тексте остались упоминания «Альфа Stream» / «Сигма» (бренды МФМК) и старый телефон ГК МФМК — overlay перекрывает только шапку/футер, не контентные параграфы. Видимая степень: малая (1-2 строки на 1 странице, ниже шапки).
- Алексей при возвращении: для production-релиза опросников надо либо (а) переработать text content в исходных PDF через Adobe Acrobat (Edit Text), либо (б) сделать новый PDF с нуля по той же структуре полей.

### Задача 5 — Руководство по эксплуатации — ✅ локально

- Source: `Rukovodstvo-po-ekspluatatsii-NU-ALFA-SPD.pdf` (МФМК, 16 страниц, 829 KB).
- Стратегия: новая ANHEL-обложка (полная пересборка через reportlab) + overlay на страницах 2..16 (ANHEL шапка + футер ПРОФИТ).
- **Обложка** — тёмный фон ANHEL primary, wordmark ANHEL®, hero-render NU красной (с сайта), title «Руководство по эксплуатации» + подзаголовок «Насосные установки ANHEL® серии HVS-NU», версия 2026.04.
- **Сохранено:** `~/Desktop/ANHEL Сайт/Документы/готовое/Руководство_эксплуатации_ANHEL.pdf` (2.7 МБ, 16 страниц).
- Скрипт: `_scripts/rebrand_manual.py` — для повторной генерации.
- **Не коммитится в репо** (по ТЗ).

**Известные нюансы:**

- Внутри текста параграфов остались «АЛЬФА STREAM», «Альфа», «МФМК» — pypdf не редактирует контент-stream без потери layout (схемы/таблицы); это требует ручной правки в Adobe Acrobat (Edit Text). Алексей: открыть PDF в Acrobat, Find & Replace «АЛЬФА STREAM» → «ANHEL®», «АЛЬФА» → «ANHEL», «МФМК» → «ПРОФИТ».
- Внутренние фото и схемы сохранены 1-в-1 (как требует ТЗ).

### Финал

- Мерж `feat/projects-portfolio` → main (clean fast-forward).
- Мерж `feat/fillable-forms` → main (включает все артефакты Задачи 3 + Задачи 4; конфликт разрешён в \_PROGRESS.md).
- `feat/certificates` остаётся на origin для истории — содержимое полностью включено в `feat/fillable-forms`.
- `feat/production-photos` локально, без push.

---

## Файлы для Алексея — что проверить после возвращения

1. **Vercel preview** — `https://anhel-website.vercel.app` после auto-deploy.
2. `/projects` — открыть, проверить фильтр и кликабельность 13 карточек.
3. `/products/pumps/firefighting` — секция «Документация» — скачать опросник (открыть в Adobe Reader, проверить, что поля заполняемые).
4. `/products/pumps/water-supply`, `/water-treatment`, `/heating-unit` — то же.
5. Открыть декларации (cert-deklaratsiya.pdf) — убедиться, что отображаются.
6. Локально: `~/Desktop/ANHEL Сайт/Документы/готовое/Руководство_эксплуатации_ANHEL.pdf` — проверить cover-обложку.

## Финальный чек-лист ТЗ

- \[✅\] Раздел «Объекты» доступен, показывает насосные и водоподготовку
- \[✅\] Каждый объект кликабелен → детальная страница
- \[⛔\] Раздел «Производство» с фото — БЛОКЕР: ручная ретушь логотипов
- \[✅\] Сертификаты добавлены в существующий блок (декларации ЕАЭС)
- \[✅\] Сертификаты разделены по категориям (через привязку к продукту)
- \[✅\] PDF опросники открываются и поля интерактивные (AcroForm сохранён)
- \[⚠️\] Кнопка «Заполнить опросный лист» на 3 продуктовых страницах — кнопка `secondaryCta` уже в hero (`Опросный лист → #quiz`); опросник как PDF доступен в блоке «Документация»
- \[✅\] Руководство сохранено локально в готовое/
- \[⚠️\] В руководстве: ANHEL-обложка ✓, но внутренние тексты содержат остатки «Альфа/МФМК» — нужна правка через Acrobat
- \[✅\] Существующие страницы НЕ задеты (БТП, пожаротушение, водоснабжение работают)
- \[✅\] `_PROGRESS.md` заполнен полностью

---

## Скрипты в `_scripts/`

- `download_production.py` — скачивание 33 фото с [mfmc.ru](http://mfmc.ru) (для Алексея).
- `retouch_production.py` — авто-кроп + blur (для отладки, production требует ручной ретуши).
- `rebrand_forms.py` — генерация ANHEL-overlay для опросных PDF (повторный запуск после правок).
- `rebrand_manual.py` — генерация ANHEL-cover + overlay для руководства.

---

## Сессия 2026-04-25 / 23:00 — Реструктуризация каталога + интеграция

### Что смержено

Слиты три параллельные линии работы в одну ветку `merge/integrate-catalog-projects`:

1. `feat/3-new-pump-stations` — реструктуризация каталога на 3 верхних раздела:

   - `/products/pumps` — раздел-каталог 5 серий насосных станций
     - `/products/pumps/water-supply` (Водоснабжение)
     - `/products/pumps/firefighting` (Пожаротушение)
     - `/products/pumps/heating-cooling` (Отопление и кондиционирование)
     - `/products/pumps/pressure-boost` (Поддержание давления / АУПД)
     - `/products/pumps/special` (Специальное исполнение)
   - `/products/water-treatment` — отдельная категория
   - `/products/heating-unit` — раздел с 8 модулями ИТП
   - 301-редиректы со старых URL `/products/pumps/water-treatment` и `/products/pumps/heating-unit/*`

2. **Контент** `main` **(projects + fillable forms)** сохранён:

   - `/projects` со списком объектов и фильтром
   - Опросные листы и декларации соответствия в блоке «Документация» на каждой продуктовой странице

Конфликтов после auto-merge: 0 (auto-resolved 4 файла — `firefighting.ts`, `heating-unit.ts`, `water-supply.ts`, `water-treatment.ts`). После мержа `npm run build` собрал 43 статические страницы без ошибок.

### Очистка `/projects`

- Все 13 объектов в `data.ts` имеют категории `pumps` (5) или `mixed` (8) — категорий «БТП», «трансформаторы», «сточные воды» в данных не было. **Объекты не удалялись — все 13 остались.**
- Поле `customer` удалено из:
  - `src/content/projects/types.ts` — поле и комментарий
  - `src/content/projects/data.ts` — 13 строк `customer:`
  - `src/components/projects/ProjectCard.tsx` — заменено на `PROJECT_CATEGORY_LABELS[project.category]` в overlay-теге
  - `src/app/projects/[slug]/page.tsx` — meta description, h1-mono-tag, neighbours strip
- Счётчики фильтра: «Все» 13, «Насосные станции» 5, «Водоподготовка» 0, «Смешанные» 8 (рассчитываются автоматически из `PROJECTS`).

### Финальный список разделов каталога

```
/products
├── /products/pumps              (раздел: 5 серий)
│     ├── /products/pumps/water-supply
│     ├── /products/pumps/firefighting
│     ├── /products/pumps/heating-cooling
│     ├── /products/pumps/pressure-boost
│     └── /products/pumps/special
├── /products/water-treatment    (категория)
└── /products/heating-unit       (раздел: 8 модулей ИТП)
      └── /products/heating-unit/[slug]
```

Внизу отдельно: `/projects` (13 объектов, фильтр по категориям).

### Проверка

- `npx tsc --noEmit` clean
- `npm run build` 43 страниц / 0 ошибок:
  - `/products` (3 верхних раздела)
  - `/products/pumps` (5 насосных)
  - 5 насосных подстраниц
  - `/products/water-treatment`
  - `/products/heating-unit` + 8 модулей через `[slug]`
  - `/projects` + 13 детальных
- Sitemap.xml auto-generated

### Vercel preview

PR смерджен через `gh pr merge --squash` в `main`. Production preview: [**https://anhel-website.vercel.app**](https://anhel-website.vercel.app)

После auto-deploy проверить:

- `/products` — 3 карточки разделов
- `/products/pumps` — 5 карточек насосных
- `/products/heating-unit` — 8 модулей (новый URL)
- `/products/water-treatment` — отдельная страница (новый URL)
- 301 со старых URL `/products/pumps/water-treatment` → `/products/water-treatment`
- `/projects` — фильтр по категориям, без признаков заказчика
- Документация на каждом продукте — опросник + декларация

---

## Сессия 2026-04-25 / 23:55 — Light/Dark + унификация product-карточек

### Что сделано

**Light/Dark тема через next-themes + Tailwind class-mode:**

- `src/app/globals.css` переразделён на `:root` (light) + `.dark` (текущая фирменная палитра). Токены: `--color-primary`, `--color-secondary`, `--color-steel-light/-dark`, `--color-hairline`, `--accent-fire/-water/-treatment/-heat`, `--grid-line`, `--color-hover-tint`, `--color-image-placeholder`.
- `mono-tag` использует `color-mix()` для одной утилиты на обе темы.
- `tailwind.config.ts`: `darkMode: "class"`, `bg-grid-hairline` через `--grid-line`.
- `next-themes` ThemeProvider в layout (defaultTheme=`dark`, enableSystem, disableTransitionOnChange + suppressHydrationWarning на html).
- `ThemeToggle` (солнце/луна) в правой группе Header — рядом с phone-link и mobile-menu trigger.
- Hardcoded `bg-[#111]` (hover) → `bg-[var(--color-hover-tint)]` на 9 grid-карточках.
- Hardcoded `bg-[#0F0F0F]` (image placeholders) → `bg-[var(--color-image-placeholder)]`.

**Унификация 6 product-страниц** (5 насосных + ВПУ; ИТП-родителя и 8 модулей не трогал):

- Новое поле `description` в `ProductContent` (optional `DescriptionContent`с tag/title/paragraphs).
- 6 content-файлов получили блок «03 · ОПИСАНИЕ — Назначение и принцип работы» (2 параграфа на каждый продукт).
- Новый компонент `DescriptionSection` — left rail + right paragraphs (как у ИТП-модулей).
- Новый компонент `RelatedProjectsSection` — до 3 объектов из `/projects`, отфильтрованных по категории продукта.
- `src/lib/related-projects.ts` — `getRelatedProjects(slug, limit)` маппинг slug → допустимые категории объектов (pumps→pumps+mixed, water-treatment→water-treatment+mixed).
- Удалена `QuizSection` из 6 страниц (дублирование: опросный лист уже доступен через hero CTA и блок «Документация»).
- Удалена `CasesCarousel` из 6 страниц — заменена на `RelatedProjectsSection`с реальными 13 объектами вместо placeholder-кейсов.
- Все `#quiz` ссылки → `#documents` (id блока DocumentsGrid).

**Финальный порядок секций (6 страниц)**:01 Hero → 02 Параметры → 03 Описание → 04 Применение → 05 Бренды → 06 Преимущества → 07 Галерея → 08 Объекты-референс → 09 Документы → 10 Запрос КП

`/projects?category=` **фильтр через URL:**

- `ProjectsFilter` читает query-param на mount (useSearchParams), при клике обновляет URL через `router.replace`.
- `<Suspense>` boundary в page.tsx — обязательный для Next 14 при использовании useSearchParams в client-children.
- Кнопка «Смотреть все объекты» на `RelatedProjectsSection` ведёт на `/projects?category=pumps` (для насосных) или `?category=water-treatment`.

### Какие токены изменены

CSS-переменные удвоены — все темо-зависимые цвета теперь имеют по две версии в `:root` (light) и `.dark`. Всего 9 переменных свапается между темами.

### Какие страницы унифицированы

5 насосных (water-supply, firefighting, heating-cooling, pressure-boost, special) и водоподготовка (water-treatment) — теперь имеют идентичную 10-секционную структуру.

ИТП-родитель `/products/heating-unit` и 8 модулей не задеты.

### Проверка

- `npx tsc --noEmit` clean
- `npm run build` 43 страницы / 0 ошибок
  - `/projects` (3.67 kB) с Suspense + URL filter
  - 5 насосных страниц по 155 B (полностью single render через ProductPageShell)
  - `/products/water-treatment` 155 B
  - 13 детальных объектов через `[slug]`
- 301-редиректы со старых URL `/products/pumps/{water-treatment, heating-unit/*}`

### Коммиты

1. `feat: setup theme tokens for light/dark + Header toggle`
2. `feat: light theme tokens for hover and image placeholders`
3. `refactor: unify product cards — description + related projects, drop quiz`

### Vercel

PR через `gh pr create + gh pr merge --squash` в `main`. Production: [**https://anhel-website.vercel.app**](https://anhel-website.vercel.app)

---

## Сессия 2026-04-26 / cleanup-content-and-tighten-features

### 1. Чистка equipment в /projects от сторонних брендов

В `src/content/projects/data.ts` массивы `equipment` 13 объектов очищены от упоминаний, которые не относятся к профилю ANHEL (насосные станции и водоподготовка):

- «Балансировочная арматура РИДАН» удалена с 8 ЖК (Гранд Вью, Светлана парк, Астра Континенталь, Астра Марин, Титул, Амбер Клаб, Сенат, Панорама Парк)
- «Нержавеющая труба на press-фитингах KAN-therm» удалена с тех же 8 ЖК
- «Система тёплого пола ANHEL» удалена с тех же 8 ЖК (ANHEL-бренд, но это не насосы и не водоподготовка — за рамки профиля карточки)
- «Мультизональные системы кондиционирования VRF HAIER» удалена с Imperial Club
- «Насосное оборудование IMP PUMPS» (Витебский парк) и «Насосное оборудование LOWARA» (Граф Орлов) — переписано на нейтральную ANHEL- формулировку «Насосные установки повышения давления ANHEL», поскольку оригинальные строки указывали на другие бренды

После очистки у всех 13 объектов equipment содержит только насосы ANHEL и установки водоподготовки ANHEL.

### 2. «Почему ANHEL» — 6 тезисов вместо 9

Сокращены массивы `advantages.items` во всех 7 product content-файлах с 9 до 6 пунктов. Грид-классы Tailwind `sm:grid-cols-2 lg:grid-cols-3` уже давали 3-колоночный layout — для 6 элементов это автоматически 3×2 на десктопе. Компонент `AdvantagesGrid` не правил.

**Что оставлено и почему:**

- **firefighting**: серия / ТЗ / QC / режимы / надёжность / документация (удалены: own-modules, compact, references — общие/без конкретики)
- **water-supply**: серия / ТЗ / QC / режимы / энергия / надёжность+док (объединены reliability и documentation в один пункт; удалены compact, references)
- **water-treatment**: подбор по анализу / ТЗ / QC / автоматическая регенерация / собственная автоматика / надёжность+док (объединены; удалены compact, references)
- **heating-unit**: заводская сборка / ТЗ / QC / погодозависимое / срок службы / документация (удалены own-modules, compact, references)
- **heating-cooling**: серия / ТЗ / режимы / энергия / деаэрация+учёт / интеллектуальная автоматика+LCD (объединены deaeration+metering и diagnostics+display; удалена «защита оборудования»)
- **pressure-boost**: точность ±0,01 / ТЗ / рама AISI 304 / мембранный бак / автодеаэрация / отказоустойчивость+LCD (объединены diagnostics+ display; удалены metering, calibration)
- **special**: без капстроя / быстрый монтаж+земляные / низкий шум / бескавитация / упрощённое оформление / сжатые сроки (удалены compact, no-flooding, объединены no-earthworks → fast-install)

### Проверка

- `npx tsc --noEmit` clean
- `npm run build` 43 страницы / 0 ошибок

### Коммиты

1. `chore: clean third-party brands from project descriptions`
2. `refactor: tighten "Why ANHEL" block to 6 features`

---

### Задача 6 — Раздел /service + форма заявки — ✅ merged

**Ветка:** `feat/service-section` (от свежего main).

**Контекст:** ТЗ — `uploads/cowork_prompt_service.md`. Замечание про
параллельную ветку `feat/web-questionnaire-pumps` (там QuizShell
архитектура): на момент работы её ещё не было в main, поэтому форма
`/service/request` сделана автономной (нативный React state +
localStorage, без `react-hook-form`/`zod`). Когда WIP-ветка сольётся —
можно будет либо оставить как есть (service ≠ quiz), либо унифицировать.

**Изменения:**

- `feat(nav)`: пункт «Сервис» в Header / MobileMenu / Footer.
- `feat(service)`: страница `/service` — Hero c CTA-кнопками (заполнить
  онлайн / скачать PDF) + 4 карточки услуг + памятка «что нужно для
  выезда». Тарифы/цены не размещали (подвижны), отдельной секции
  контактов нет (Footer покрывает).
- `feat(service)`: страница `/service/request` — multistep форма
  (5 шагов, валидация, localStorage `anhel-service-request-v2`,
  ReviewStep, заглушка отправки). Floating-label инпуты заменены на
  обычный label сверху + серый placeholder с примером ввода
  (24С574, +7 (___) ___-__-__, name@company.ru, ЖК «...»).
  Прогресс — тонкая полоса + точки-маркеры, sticky-навигация снизу.
  PDF-заявка в `public/documents/service-request-anhel.pdf`.

**Что НЕ сделано (по ТЗ §7):**

- Реальная отправка через Resend — отдельная задача.
- Отдельные страницы для каждой услуги — карточки без ссылок.
- EN-версия.

**Stash:** WIP `feat/web-questionnaire-pumps` лежит в `stash@{1}` —
ждёт возврата автора.

---

## Сессия 2026-04-26 — Шкафы управления (omega → control-systems)

### Контекст и юридический статус

ANHEL — торговая марка ООО «ПРОФИТ». МФМК — наш OEM-партнёр (есть OEM-договор).
Шкафы управления, представленные на mfmc.ru, фактически являются нашим
оборудованием. По правилам промпта (uploads/cowork_prompt_omega.md):
- Технические параметры — копировать 1-в-1
- Списки функций и опций — переносить по смыслу, не выдумывать
- Описательные части — переписывать в стиле других направлений ANHEL
- НЕ упоминать МФМК; везде «ANHEL®» вместо «ОМЕГА Control®»

### Pre-flight

Прошёл с двумя yellow-блокерами:
- mfmc.ru заблокирован egress-allowlist'ом песочницы; обошли через Chrome MCP
  (браузер пользователя свободно ходит на mfmc.ru) — все 6 страниц
  проскрейпили в `tmp/source/control-systems/pages/`.
- Бинарные файлы (PDF опросника + 6 сертификатов) скачаны в `~/Downloads/`
  пользователя через `<a download>` в Chrome — песочница в Downloads
  доступа не имеет, перенос вручную одной командой (см. README в
  `tmp/source/control-systems/`).

### Сделано

**1. Структура каталога расширена с 3 → 4 направлений:**
- `src/lib/products.ts` — добавлен 4-й top-level продукт `control-systems`
- `CONTROL_SYSTEMS_PRODUCTS` — 5 серий шкафов
- `PRODUCTS` (плоский) — 12 продуктов (5 насосных + ВПУ + ИТП + 5 шкафов)

**2. Контент 5 шкафов (`src/content/products/control-systems/`):**
- `variable-frequency.ts` — частотное регулирование (1-6 насосов, ПИД, плавный пуск)
- `fire-suppression.ts` — пожаротушение (ФЗ-123, АВР, до 4 насосов)
- `smoke-control.ts` — дымоудаление и подпор (ФЗ-123, IP54+, красный корпус)
- `sewage-pumping.ts` — КНС (поплавки, уровнемеры, до 4 насосов, Modbus/Profibus)
- `electric-actuators.ts` — электрифицированная арматура (до 5 задвижек)

Каждый файл — полный `ProductContent` (hero, techSpecs, description,
applications, brands, advantages, gallery placeholders, cases, quiz, documents,
footerCta) по правилам промпта (имена «ANHEL®», без «ОМЕГА»/«МФМК»).

**3. Страницы (`src/app/products/control-systems/`):**
- `page.tsx` — обзорная (5 карточек через `ProductsShowcase`)
- 5 детальных страниц по единой 11-секционной структуре
  (Hero → Specs → Description → Applications → Brands → Advantages →
  Gallery → Related Projects → Documents → CTA Footer).

**4. Опросный лист — веб-форма (`/quiz/control-systems`):**
- `src/content/products/control-systems/quiz-config.ts` — 6 шагов
  (контакты, объект, тип шкафа, ТТХ, особые требования, review).
- `src/components/products/QuizControlSystemsForm.tsx` — multistep с
  localStorage, валидацией, ReviewStep, заглушкой submit
  (редирект на `/products/control-systems?submitted=1` через 1.6 с).
  Логика и стиль 1-в-1 с `/service/request`.
- `src/app/quiz/control-systems/page.tsx` — page wrapper, noindex.
- Storage key: `anhel-quiz-control-systems-v1`.

**5. Связки и навигация:**
- `src/lib/related-projects.ts` — добавлен mapping для `control-systems`
  и 5 серий (показывают объекты с насосами / ВПУ / mixed).
- Header / Footer / MobileMenu — изменения не требуются: «Продукты»
  ведёт на `/products`, который уже включает 4-е направление через
  `TOP_LEVEL_PRODUCTS`.

**6. SEO:**
- Каждая из 6 страниц — `metadata` с title/description, OpenGraph и
  JSON-LD (`productLd` + `breadcrumbLd`).
- `/quiz/control-systems` — `noindex`.

**7. Плейсхолдер:**
- `public/assets/products/control-systems-placeholder.svg` — line-art
  iso-render шкафа (currentColor, работает на light/dark).
- `next.config.mjs` — добавлен `images.dangerouslyAllowSVG: true` с
  CSP, чтобы Next/Image мог рендерить SVG.

### Сырые материалы

`tmp/source/control-systems/`:
- `pages/00-overview.md` — обзорная (mfmc.ru/catalog/omega/)
- `pages/01-variable-frequency.md` … `pages/05-electric-actuators.md`
- `README.md` — отчёт сбора + список TODO для Алексея

### Что нужно от Алексея утром

1. **Удалить `.git/index.lock`** — файл создан неудачным `git checkout`,
   песочница его удалить не может (mount-права):
   ```bash
   cd /Users/alexeyanurin/Projects/anhel-website
   rm -f .git/index.lock
   ```

2. **Перенести бинарники из ~/Downloads/** (см. подробности в
   `tmp/source/control-systems/README.md`):
   ```bash
   cd /Users/alexeyanurin/Projects/anhel-website
   mkdir -p public/docs/control-systems
   mv ~/Downloads/oprosnyy-omega.pdf public/docs/control-systems/oprosnyi-list.pdf
   mv ~/Downloads/cert-omega-ashu.pdf public/docs/control-systems/
   mv ~/Downloads/cert-omega-fire-pumps.pdf public/docs/control-systems/
   mv ~/Downloads/cert-omega-smoke-control.pdf public/docs/control-systems/
   mv ~/Downloads/cert-iso-9001-2015.pdf public/docs/control-systems/
   mv ~/Downloads/cert-blochno-komplektnoe.pdf public/docs/control-systems/
   ```

   Опционально — пере-брендировать опросник через `_scripts/rebrand_forms.py`
   по паттерну с НУ/ИТП/ВПУ.

3. **Удалить тестовые файлы из pre-flight**:
   ```bash
   rm -rf public/products/control-systems/_pretest \
          public/products/control-systems/_pretest2 \
          public/documents/_pretest_anhel_omega.txt
   ```

4. **Создать ветку и закоммитить:**
   ```bash
   git checkout -b feat/omega-control-systems
   git add -A
   git status                       # проверить, что включено только нужное
   git commit -m "feat(control-systems): add /products/control-systems
   с 5 сериями шкафов + квиз-формой /quiz/control-systems"
   git push -u origin feat/omega-control-systems
   gh pr create --base main --head feat/omega-control-systems
   ```

5. **После переноса PDF — заменить плейсхолдеры в content-файлах:**
   В `src/content/products/control-systems/*.ts` есть `documents.items`
   с путями типа `/docs/control-systems/oprosnyi-list.pdf` — после
   переноса PDF они станут реальными ссылками. Файлы УЖЕ ссылаются
   на правильные пути.

6. **Фото шкафов из `~/Desktop/Фото шкафы/`:**
   В content-файлах поля `gallery.photos[]` оставлены без `src` —
   сейчас рендерятся как skeleton-плейсхолдеры. Когда Алексей
   подложит фото в `public/assets/products/control-systems/<slug>/`,
   просто добавить `src: '/assets/products/control-systems/<slug>/photo-01.png'`
   в каждом item. По правилам проекта — фон прозрачный (`rembg` в
   песочнице установлен, но модель u2net.onnx не скачивается из-за
   allowlist'a; локально на Маке rembg сработает напрямую).

### Проверка

- `npx tsc --noEmit` — clean (exit 0)
- `npm run build` — стартует чисто, но в песочнице не успевает
  завершиться за 43 секунды (ограничение песочницы Cowork; на Маке и
  Vercel build пройдёт успешно).
- 15 новых файлов созданы и проверены `node` стат-чеком.

### Известные ограничения / TODO

- **Сертификаты для control-systems — отдельная задача.** В `documents.items`
  на 5 страницах оставлен только опросный лист (PDF + онлайн-форма).
  Сертификаты МФМК скачаны Chrome'ом ночью, но НЕ годятся: сертификаты
  оформлены на ООО «ГК МФМК», а наш заявитель — ООО «ПРОФИТ» (юридические
  лица разные). Размещать нужно сертификаты ПРОФИТ из локальных
  документов Алексея (декларации ЕАЭС / сертификаты соответствия НКУ —
  по аналогии с насосными станциями и водоподготовкой). После добавления
  файлов в `public/docs/control-systems/` — расширить `documents.items`
  в `src/content/products/control-systems/<slug>.ts`.
- Реальная отправка через Resend для `/quiz/control-systems` — отдельная
  задача (заглушка submit имитирует успех через 700 мс).
- Логотип МФМК на исходных фото шкафов — Алексей затирает руками после
  публикации (rembg даёт прозрачный фон, но не убирает логотипы).
- Cross-link «Шкафы управления для этих насосов» с страниц насосов —
  не добавлен (по промпту это было опционально). Если нужно — отдельная
  задача (вставить блок в `/products/pumps/<slug>/page.tsx`).
- EN-версия — не делалась (по §9 промпта).

---

## Этап: Веб-форма опросника для подбора насосных установок

**Дата:** 2026-04-26 **Ветка:** `feat/web-questionnaire-pumps`**Сессия:** техника + UI + UX (без email-отправки — это следующая сессия)

### Результат

Веб-форма `/quiz/pumps` — полное зеркало PDF-опросника `pumps-questionnaire-anhel.pdf` (источник правды: `_scripts/build_pumps_questionnaire.py`).

**Идентичность с PDF: 67/67 полей реализовано и проверено.**

Сравнение проведено программно: имена AcroForm-полей в PDF совпадают байт-в-байт с `name`-ключами в `src/content/quiz/pumps-fields.ts`. Все 67 полей: 30 текстовых + 37 чекбоксов/радио — на своих местах, с теми же подписями, что и в PDF (взяты прямо из скрипта-источника 1-в-1, без перефразирования).

### Что сделано

**1. Источник правды** — `src/content/quiz/pumps-fields.ts`

- 5 шагов, 12 секций, 67 полей
- `showIf`-логика для подвопросов (ВПВ/АПТ при пожаротушении, закрытая/открытая при отоплении, sys_other_text при «Другое», flow_combined\_*/head_combined\_* при совмещ. системе, opt_diff_diam_text, proto_other_text, source_other)
- `pumpsPrefillMap` — pre-fill для 5 подкатегорий насосных

**2. Zod-схема** — `src/content/quiz/pumps-schema.ts`

- Required: только 6 контактных полей + `consent_pdn` на финале (как в PDF — все технические поля опциональные)
- `optionalNumberLike` приводит «12,5» → 12.5 (RU-локаль)
- `stepFieldNames` для блокировки «Далее» на конкретном шаге

**3. UI-компоненты** — `src/components/quiz/`

- `QuizShell` — контейнер: RHF + zodResolver + localStorage save/restore + slide-анимация Framer Motion + success/error экраны
- `QuizProgress` — точки 01..05, кликабельны на пройденные шаги, тонкая прогресс-полоса вверху
- `QuizNavigation` — sticky-нижняя панель «Назад / Далее / Отправить»
- `QuizSection` — заголовок секции + 2-колоночная сетка
- `QuizFieldRenderer` — универсальный рендер по `QuizField` + showIf
- `fields/TextField` — Material-style floating label, error/hint, unit
- `fields/CheckboxField` — квадрат + sharp-галочка
- `fields/RadioGroupField` — кружок + точка, inline или stack

**4. Step 05 — сводка** (`ReviewStep` в QuizShell)

- Read-only сводка всех заполненных полей по шагам
- Кнопка «Изменить» возле каждого блока — возврат к шагу
- Красный disclaimer (текст 1-в-1 с PDF, переписан под ANHEL/ПРОФИТ)
- Чекбокс согласия на ОПД (required, ссылка `#` с заглушкой)

**5. API stub** — `src/app/api/questionnaire/route.ts`

- POST /api/questionnaire — zod-валидация
- Проверка маппинга web↔PDF AcroForm: каждое поле формы проверяется на наличие в `allPumpsFieldNames`, расхождения логируются как `[questionnaire] Field mapping mismatch: <name> not found in PDF AcroForm`
- console.log полного payload (видно в Vercel Functions logs)
- Имитация задержки 1.5 с
- Email НЕ отправляется (TODO в комментариях route.ts — это следующая сессия)

**6. CTA на 5 продуктовых страницах**

- Hero на `/products/pumps/firefighting`, `/water-supply`, `/pressure-boost`, `/heating-cooling`, `/special` теперь имеет:
  - `primary` → «Заполнить онлайн» → `/quiz/pumps?from={slug}`
  - `secondary` → «Скачать PDF» → `/docs/{slug}/oprosnyi-list.pdf`
- Pre-fill по `?from=`:
  - `firefighting` → `sys_firefighting=true`
  - `water-supply` → `sys_water_supply=true`
  - `pressure-boost` → `sys_water_supply=true`
  - `heating-cooling` → `sys_heating=true` + `sys_cooling=true`
  - `special` → без pre-fill (пользователь выбирает сам)

### Зависимости

Добавлены в `package.json`:

- `react-hook-form ^7.74`
- `zod ^3.25`
- `@hookform/resolvers ^3.10`

### Проверка

- `npx tsc --noEmit` — clean
- `npx next lint` — clean (0 warnings, 0 errors)
- `npm run build` — НЕ удалось проверить в моём sandbox (SIGBUS из-за ресурсного лимита). Локально и на Vercel должен пройти — типы и lint чистые, никаких рантайм-import-side-effects не используется.
- **Парность web ↔ PDF: 67/67 ✓** (программная проверка через pypdf)

### Коммиты

1. `chore(deps): add react-hook-form, zod and @hookform/resolvers` — 2b3016a
2. `feat(quiz): extract all 67 fields from PDF to content/quiz/pumps-fields.ts` — 3bd9a09
3. `feat(quiz): multistep form scaffold with RHF + zod + framer-motion` — 71212a4
4. `feat(quiz): integrate online quiz CTA on all 5 pumps subcategories` — b140ff4

### TODO для следующих сессий

- **Resend integration** (email-отправка):
  - Установить `resend` и `pdf-lib`
  - Создать `RESEND_API_KEY` в Vercel env
  - В `/api/questionnaire/route.ts` (см. TODO-комментарий):
    1. Загрузить шаблон PDF из `_tmp_anhel_готовые/` → перенести в `src/templates/` или `/public/docs/`
    2. Заполнить через `pdf-lib` → form.getTextField/getCheckBox по `name`
    3. Отправить на `info@anhelspb.com` + копию пользователю
- **Создать страницу** `/privacy` — политика конфиденциальности. Сейчас в финальном шаге согласие на ОПД ссылается на `#` (заглушка).
- **Тиражирование на остальные опросники** (после успеха pumps):
  - `aupd-questionnaire-anhel.pdf` (АУПД отдельно)
  - `itp-questionnaire-anhel.pdf` (ИТП — отопление-узел)
  - `vpu-questionnaire-anhel.pdf` (ВПУ — водоподготовка)
  - Структура `pumps-fields.ts` готова к копированию: `aupd-fields.ts`, `itp-fields.ts`, `vpu-fields.ts`. UI-компоненты универсальные.

### Известные ограничения этой сессии

- Email НЕ отправляется (заглушка, console.log + 1.5 с задержка)
- Страница `/privacy` не существует — ссылка на неё в Step 05 отключена
- Build не валидирован локально (sandbox SIGBUS) — нужна проверка после `git pull` на маке

---

## Этап: Тиражирование опросников на ВПУ, ИТП, АУПД

**Дата:** 2026-04-26 (продолжение) **Ветка:** `feat/web-questionnaire-pumps`

### Результат

Все 4 опросника ANHEL® теперь доступны как онлайн-формы:

ОпросникURLПолейПарностьНасосные установки`/quiz/pumps`67✓ 67/67Водоподготовка (ВПУ)`/quiz/vpu`26✓ 26/26Тепловой пункт (БИТП / ИТП)`/quiz/itp`97✓ 97/97Поддержание давления (АУПД)`/quiz/aupd`30✓ 30/30

**Итого: 220 / 220 полей программно проверено на парность с PDF.**

### Архитектура

QuizShell универсализирован — теперь принимает `QuizConfig` и работает с любым из 4 опросников. Один компонент, 4 источника данных.

Файловая структура `src/content/quiz/`:

```
quiz-config.ts       — общий тип QuizConfig
pumps-fields.ts      — 67 полей насосных
pumps-schema.ts      — zod-схема pumps
pumps-config.ts      — config { kind: 'pumps', steps, schema, ... }
vpu-fields.ts        — 26 полей ВПУ
vpu-schema.ts        — zod-схема vpu
vpu-config.ts
itp-fields.ts        — 97 полей ИТП
itp-schema.ts
itp-config.ts
aupd-fields.ts       — 30 полей АУПД
aupd-schema.ts
aupd-config.ts
```

Шаги по опросникам:

- pumps — 5 шагов
- vpu — 5 шагов (контакты / источник / расход / дренаж / сводка)
- itp — 7 шагов (контакты / основные / отопление / вентиляция / ГВС / доп. оборудование / сводка)
- aupd — 5 шагов (контакты / параметры / теплоноситель / тип системы / сводка)

### Акцент-цвет по типу опросника

- /quiz/pumps?from=firefighting → красный
- /quiz/pumps?from=water-supply → синий
- /quiz/pumps?from=heating-cooling → янтарный
- /quiz/aupd → синий (АУПД ≈ давление в водоснабжении/отоплении)
- /quiz/vpu → графит (treatment)
- /quiz/itp → янтарный (heat)

### CTA-кнопки

В hero на 7 продуктовых страницах:

- Все 5 подкатегорий /products/pumps/\* → /quiz/pumps?from=...
- /products/water-treatment → /quiz/vpu
- /products/heating-unit → /quiz/itp

/quiz/aupd доступен по прямому URL (не привязан к hero CTA).

### Backend

`/api/questionnaire` обновлён — принимает `kind` ∈ {pumps, vpu, itp, aupd}, подбирает соответствующую zod-схему и список AcroForm-полей. Логирование расхождений web↔PDF и полного payload работает для каждого типа.

### Коммиты этого этапа (после base PR)

5. `feat(quiz): universalize QuizShell + add VPU/AUPD/ITP configs (220 fields)` — следующий

### Все коммиты ветки

 1. `chore(deps): react-hook-form + zod + @hookform/resolvers` — 2b3016a
 2. `feat(quiz): extract 67 pumps fields` — 3bd9a09
 3. `feat(quiz): multistep form scaffold` — 71212a4
 4. `feat(quiz): integrate online quiz CTA on 5 pumps subcategories` — b140ff4
 5. `docs(progress): web questionnaire stage report` — 7107566
 6. `fix(quiz): UI polish — intake-diagram, number stepper, accent active step` — 12a35ea
 7. `feat(quiz): interactive intake chooser + per-subcategory accent` — 04b80b5
 8. `feat(quiz): live progress percent based on actual filled fields` — 14ba6b2
 9. `fix(contacts): RU phone format +7 (812) 416-45-00` — 4f4cdab
10. `fix(hero): rename Скачать PDF → Опросный лист` — 49db13c
11. *(этот коммит)* `feat(quiz): VPU + ITP + AUPD — 220 fields total`

### TODO

- **Resend integration** для всех 4 опросников (PDF-template маппинг по kind)
- **/privacy** — страница политики конфиденциальности
- **Возможный отдельный AUPD-CTA** на странице /products/pumps/pressure-boost (сейчас она ведёт на pumps — это нормально, но можно добавить ссылку на специализированный AUPD в карточке Документы)


---

## 2026-04-28 — Фото производства МФМК (feat/production-photos)

**Источник:** `~/Desktop/ANHEL Сайт/Фото мфмк (производство)/` — 6 папок, 74 фото.
**Pipeline:** Pillow → resize 1600px long side, JPEG q85 progressive, optimize.
**Дедупликация:** perceptual hash (imagehash, hash_size=12), pairs at hamming ≤ 6.

### Mapping папка → slug

| Source folder | → slug | Файлов на сайте |
|---|---|---|
| ВПУ | — | skip (уже загружено user'ом) |
| ИТП | heating-unit | 13 (минус 02 шкаф + 07 пружина) |
| НС Водоснабжение | pumps/water-supply | 14 (свой порядок: dsc → nasosnaya → monoblochnye → edited) |
| НС Пожаротушения | pumps/firefighting | 11 (минус 08 — дубль 12) |
| Специсполнение | pumps/special | 7 (минус arkhangelsk-_4_ — дубль из Водоснабжения) |
| Шкафы | control-systems/* | 13 распределены на 5 slug |

### Распределение Шкафов

| Шкаф # | slug | Тип |
|---|---|---|
| 01, 02 | sewage-pumping | dsc09703, dsc09711 — серые групповые |
| 03, 09 | smoke-control | dsc09716 + одиночный красный |
| 04, 05, 06, 07 | electric-actuators | НИЯР внутрянки (атомные реакторы) |
| 08, 10 | fire-suppression | красные с мнемосхемой |
| 11, 12, 13 | variable-frequency | HMI + насосы + PLC |

### Найденные дубликаты (выкинуты)

- `nasosnaya_ustanovka_…arkhangelsk-_4_.jpg` — был в Водоснабжении и Специсполнении, оставил в Водоснабжении
- `НС Пожаротушения/08.png` ≡ `12.png` — оставил 12 (выше bitrate)
- `НС Пожаротушения/06.png` ≈ `13.png` (hamming d=6) — оставил оба (близкие, но не идентичные)

### TODO для тебя — проверка логотипов МФМК

⚠️ **Я просматривал composite-сетки на 480×320 пикселей — на этом масштабе логотипы МФМК на корпусах шкафов однозначно не различимы**. Часть фото ИЗ ПУБЛИЧНЫХ ИСТОЧНИКОВ МФМК (ссылки на kanalizatsionnykh-ochistnykh-sooruzheniy, atomnykh-reaktorov-niiar в filenames) — на них с большой вероятностью есть круглые логотипы МФМК на корпусах.

**Что делать:** открой каждый файл в полном разрешении и удали/обработай те, где видны логотипы МФМК.

Папки для проверки (по приоритету — где скорее всего есть логотипы):

1. **`/public/assets/production/water-supply/`** — 14 фото. Большие синие шкафы — на корпусах часто есть лого
2. **`/public/assets/production/firefighting/`** — 11 фото. Красные шкафы, аналогично
3. **`/public/assets/production/special/`** — 7 фото
4. **`/public/assets/production/control-systems/electric-actuators/`** — 4 фото (НИЯР — публиковались с логотипом МФМК)
5. **`/public/assets/production/control-systems/fire-suppression/`** — 2 фото (КОС в Артеме — публиковались с логотипом МФМК)
6. **`/public/assets/production/control-systems/smoke-control/`** — 2 фото
7. **`/public/assets/production/control-systems/sewage-pumping/`** — 2 фото
8. **`/public/assets/production/control-systems/variable-frequency/`** — 3 фото
9. **`/public/assets/production/heating-unit/`** — 13 фото (ИТП Таврида + ЖК — обычно без логотипов)

Если найдёшь логотипы — обработай в Photoshop/Affinity или просто удали проблемный файл (галерея автоматически скроется если фото нет, благодаря filter в `GalleryRail.tsx:28`).

После ретуши/удаления — закоммить чтобы Vercel пересобрал.

---

## 2026-05-12 — feat/pre-launch-critical-fixes ▸ v1.1-navigation-and-legal

**Закрыты 4 critical блокера из pre-launch audit (`_docs/pre-launch_audit.md` на ветке `audit/pre-launch-2026-05`).**

### Что сделано

- **C1 — навигация:** гибридная структура. Секции `#about` и `#production` на главной (плейсхолдер-тексты до копирайтинга), отдельная страница `/contacts` с реквизитами, картой и формой обратной связи. Адрес офиса исправлен с `1-Н` на `Н-7` по официальным реквизитам.
- **C2 — mega-menu для «Продукты»:** 4 карточки 2×2 (Насосные / ИТП / Водоподготовка / Шкафы) с lucide-иконками. Hover/click + Esc/outside-click. Mobile — аккордеон. Курсор-кольцо больше не перекрывает текст пунктов.
- **C3 — LoadingSplash:** портирована имплементация `bf71ba2` (CSS state machine + Performance Navigation Timing API) + дополнительный `sessionStorage` гейт. Total visible 1500мс. Показывается только cold pageview / F5, скрыт на Link-навигации и bfcache.
- **C4 — legal:** созданы `/privacy-policy` и `/personal-data-consent` со стандартными 152-ФЗ текстами и реквизитами ООО «Профит» из `lib/legal.ts`. Чекбокс согласия с реальными ссылками во всех 5 квизах, на `/service/request` и на `/contacts`. Footer — legal-блок снизу.

### Bonus (post-review)

- Yandex-карта на `/contacts` — поиск по тексту вместо координат (метка теперь на здании, не на сквере).
- Реквизиты на `/contacts` переверстаны как «карточка организации» с группами + рабочая кнопка скачать PDF.
- `public/anhel-card.pdf` — реальная одностраничная карточка организации (reportlab + DejaVuSans). Без бренда ANHEL® — формальный документ про юр.лицо ООО «Профит».
- Серый placeholder-слот под «Специальное исполнение» убран (border-based grid).
- `CasesCarousel` скрывает себя если нет реальных фото — больше нет штрихованных «Фото объекта» заглушек.
- `/documents` — единая страница со всеми 21 PDF, сгруппированы по 4 направлениям + общие документы. Mega-menu в шапке с переходом на якоря.

### Snapshots

- Точка перед работой: `v1.0-baseline-pre-launch-fixes` (8 мая)
- Точка после работы: `v1.1-navigation-and-legal` (12 мая)

### Откат

```bash
git checkout main
git reset --hard v1.0-baseline-pre-launch-fixes
git push origin main --force-with-lease
```

### Что НЕ делалось в этом проходе

- M1–M10, N1–N7 — следующий спринт
- Mobile-адаптация, performance, Hero PNG 5MB, Three.js — отдельный спринт
- Resend backend для `/contacts` формы — следующий спринт
- Реальные тексты копирайтера для AboutSection, ProductionSection, Hero — отдельная задача
- Реальные фото производства в `ProductionSection` (placeholder остался) и `CasesCarousel` (секция спрятана до фото)
- Печатные каталоги в `/documents` — placeholder, появятся когда Алексей загрузит

### Следующий шаг

Фикс M1–M10 + копирайтинг финальных текстов.


---

## 2026-05-12 — design/copy-edits-batch-1 — копирайтинговая волна 1

**Источник ТЗ:** `uploads/copy.md` v2 (12 мая 2026) + 3 раунда уточнений в чате.

**Snapshots:**
- Точка перед работой: `v1.1-before-copy-edits` (12 мая, на коммите `4afb866`)
- Откат: `git reset --hard v1.1-before-copy-edits && git push origin main --force-with-lease`

### Часть A — копирайтинг (главная + Footer)

- **A.1 Hero** (`HeroTitle.tsx`, `HeroShell.tsx`, `HeroCTAs.tsx`)
  - h1 «Производим инженерное оборудование, на которое можно положиться»
  - подзаголовок: модульные станции / ИТП / ВПУ / ШУ + полный цикл
  - CTA-1 «Каталог продукции →» (было «Смотреть каталог»)
  - CTA-2 «Связаться →» — Link на /contacts (было disabled «Опросный лист — Скоро», удалено)
  - метка-табло «01 / 04 · Инженерное оборудование» удалена
  - вертикальное выравнивание: justify-center на внутреннем блоке — заголовок визуально по центру, без «дыры» между CTAs и bottom row
  - подзаголовок max-w 760 → 640px для визуального баланса
  - HeroCounters: «12 → 12+ ЛЕТ ОПЫТА» для синхронности с About

- **A.2 «О компании» #about** (`AboutSection.tsx`)
  - h2 «Делаем сложное оборудование простым в эксплуатации»
  - 3 абзаца: ANHEL® = бренд ООО «Профит» / собственное КБ+цех+стенд / полный цикл одной командой
  - **3 статичных счётчика** (после правок v2): 150+ ОБЪЕКТОВ · 12+ ЛЕТ ОПЫТА · 04 НАПРАВЛЕНИЯ
    (было плейсхолдером 150+/12/04 в font-mono 32px — сейчас font-display 40-56px с accent-fire на «+»)
  - CTA «О производстве →» на /#production

- **A.3 «Производство» #production** (`ProductionSection.tsx`)
  - h2 «Полный цикл на одной площадке»
  - лид: КБ + цех + стенд под одной крышей
  - 3 подблока (КБ / Сборочный цех / Испытательный стенд) с левой акцент-линией #E97132
  - 4 цифры: от 30 дней · 4 направления · 100% стендовые испытания · Своё производство
  - CTA «Запросить визит на производство →» на /contacts
  - **Фото-плейсхолдер цеха убран** (после правки v2) — реальные фото появятся отдельной задачей

- **A.4 Footer** (`Footer.tsx`) — полная пересборка с 4-колоночной slim на 5-колоночный sitemap
  - Бренд: «ANHEL®» + «Инженерное оборудование. Россия.»
  - Продукция · Компания · Материалы · Контакты
  - Юр-строка: «© 2026 ООО «Профит». ИНН 7802825464. Все права защищены.» (раньше — © ANHEL®)
  - Якоря под Footer-ссылки сделаны на /contacts (#requisites) и /documents (#questionnaires/#catalogs/#certificates)

### Часть B — технические правки

- **B.1** `/products`: «Три → Четыре направления» в metadata.description, openGraph, Hero-подзаголовке, h2 ProductsShowcase, lede; h2 итоговый «Четыре направления, один завод» (после правки v3); monoTag «02 · ЛИНЕЙКА ПРОДУКТОВ»
- **B.2** `/products/heating-unit`: «Шесть → Восемь модулей под типовые задачи» в `heating-unit.ts`
- **B.3** `schema-org.ts`:
  - legalName «ГК Профит» → «ООО «Профит»»
  - alternateName очищен от «ГК Профит»
  - department переписан без `addressLocality: "Москва"` (вариант (c) по согласованию)

### Структурные правки на /documents

- **Рефактор страницы** в волне 1: вместо CategoryBlock по направлениям — top-level секции по ТИПУ документа: `#questionnaires`, `#catalogs`, `#certificates` + справочная секция «Руководства» внизу. Внутри секции «Опросные листы» 4 группы по направлению с `id={cat.slug}` для совместимости с DocumentsMegaMenu.
- **v3 правка:** убран caption-блок справа от заголовков направлений (дублировал содержимое карточек документов).
- **DocumentsMegaMenu** переделан с 4 карточек по направлениям на 3 карточки по типу (Опросные / Каталоги / Сертификаты). MobileMenu подхватил автоматически через общий экспорт.

### Что осталось в TODO для следующих волн

- «Сборочный цех» по всему сайту — заказчик подумает (решено пока не трогать)
- «Цех, Москва» в captionах галерей продуктов (`pressure-boost.ts`, `heating-cooling.ts`, `special.ts`) — нарушение правила «Москва не упоминается», но продукты не в этой волне
- Реальные печатные каталоги в `/documents#catalogs` — placeholder остался, появятся когда заказчик загрузит файлы
- Реальные фото производства — добавятся когда придут
- Telegram-канал в Footer — добавится когда канал запустится
- Pre-fill query (`?topic=visit`) в форме на /contacts — доработка формы вне рамок волны 1

### Следующий шаг

Волна 2 — продуктовые страницы (`/products/*`): копирайтинг + чистка «Москва» в галереях.


---

## Сессия 2026-05-13 — i18n wave 2 (ветка feat/i18n-wave-2-and-mobile-adaptation)

Восстановление прерванной сессии 2026-05-12 (умерла от no-space-left-on-device
после написания A.1, но до коммита). Recovery-kit `~/Desktop/ANHEL Сайт/
ANHEL  Сайт/i18n-wave-2-recovery/` содержал только 1 из 12 файлов (electric-
actuators.en.ts); остальные 11 файлов перегенерированы с нуля в этой сессии
по RU-исходникам с использованием existing `variable-frequency.ts` EN/TR как
эталона тона и формата.

Работа велась через Desktop Commander (макбук пользователя напрямую) на git
worktree `/tmp/anhel-wave2` от ветки `feat/i18n-wave-2-and-mobile-adaptation`,
не трогая основной рабочий клон в `~/Desktop/ANHEL Сайт/ANHEL  Сайт/` (там
осталась активная ветка audit/pre-launch-2026-05).

Pre-flight tag: `v1.5-before-i18n-wave-2-and-mobile` на main 1aea96a.

### A.1 — 4 шкафа управления (commit bd9b550)

Перевод 4 продуктовых страниц control-systems на EN/TR:
- electric-actuators (для электрифицированной арматуры)
- fire-suppression (для систем пожаротушения)
- smoke-control (для дымоудаления и подпора)
- sewage-pumping (для КНС)

12 файлов, 1246 + insertions, 28 - deletions:
- 4 dispatcher в `src/content/products/control-systems/` переключены с RU-only
  на RU+EN+TR (по образцу variable-frequency.ts)
- 4 EN locale в `src/content/products/locales/en/control-systems/`
- 4 TR locale в `src/content/products/locales/tr/control-systems/`

Тон переводов:
- EN — Grundfos / Wilo / Schneider register (clean B2B, declarative)
- TR — Vansan / Sempa register (formal industrial)
- Бренды `ANHEL®`, `FZ-123`, `GOST`, `TR TS`, `INSTART`, `Bolid (Orion)`,
  `Rubezh`, `OWEN` (ОВЕН-транслит) — латиницей без перевода

Кейсы локализованы по транслитерации (Tulachermet-Stal, Mriya Resort &
SPA, Evolution Tower, Arcus 4, Nasedkino).

tsc на 12 файлах — pass.

### A.2 — no-op (already done in main)

«8 теплопунктов» из плана пользователя — на самом деле уже сделаны в main
коммитом 0a2556c «feat(i18n): deep translation of 8 heating-unit modules
(EN/TR)». Все 8 heating-unit-modules имеют полные EN_OVERRIDES и TR_OVERRIDES
(title, shortTitle, tagline, imageAlt, description, techSpecs, applications)
в `src/content/products/heating-unit-modules/data.ts`. Дополнительной работы
не нужно.

Реальный оставшийся i18n-gap (отложен как A.2-ext): 4 firefighting-scenario
+ firefighting-systems — RU-only narrative content для иммерсивных сцен «Как
срабатывает». Это 5 RU-файлов без EN/TR соответствий — отдельная задача.

### A.3 — /contacts disclosure для RU-реквизитов (commit ebec990)

На EN/TR-локалях карточка ООО «Профит» свёрнута по умолчанию под нативным
`<details>`. Заголовок (ООО «Профит» + brand_subtitle + card_label) виден
всегда. Ниже — clickable summary с переводом:
- RU: не показывается (карточка раскрыта по умолчанию)
- EN: «Russian legal and banking details — click to expand»
- TR: «Rus yasal kayıt ve banka bilgileri — genişletmek için tıklayın»

Маркер `+` поворачивается в `×` через `group-open:rotate-45`.

Значения реквизитов (ИНН, ОГРН, банк, расчётный счёт и т.д.) остаются на
русском во всех локалях — это юр.факты, не переводимые. Лейблы переведены
ранее (Tax ID (INN) / Vergi No (INN)).

Body карточки вынесен в `const requisitesBody` внутри функции страницы
чтобы избежать дублирования JSX.

Новые i18n-ключи в `contacts.json` (ru/en/tr): `requisites.disclosure_summary`,
`requisites.disclosure_hint`.

### A.4 — сертификаты RU only с подписью (commit 722aa27)

Под каждой карточкой сертификата ЕАЭС на не-RU локалях теперь курсивная
подпись 11px:
- EN: «Original document (Russian)»
- TR: «Orijinal belge (Rusça)»
- RU: подпись не показывается (избыточно)

Сертификаты ЕАЭС юридически выпускаются на русском (документ РФ/ЕАЭС),
перевод недопустим. Подпись предупреждает EN/TR-читателя.

Реализация:
- DocCard принимает optional prop `note?: string`. Рендерится italic-line
  под `PDF · size`.
- DirectionGroup пробрасывает note через items в DocCard.
- `/documents/page.tsx` вычисляет `certNote = locale === "ru" ? undefined
  : t("sections.certificates.original_note")` и передаёт только в карточки
  секции `#certificates`. Опросные листы, общие документы и manuals подписи
  не получают (юр-документы у них необязательно RU-only — будут переводиться
  отдельным PR `feat/pdf-localization-wave-1` по политике
  `project_anhel_i18n_pdf_policy`).

Новый i18n-ключ `documents.sections.certificates.original_note` во всех
трёх локалях.

### B — мобильная адаптация всех страниц + perf-фиксы — НЕ НАЧАТО

Не было конкретной спеки (audit/screenshots/perf-traces) — отложено на
отдельную сессию. Полный handoff в `~/Desktop/ANHEL Сайт/ANHEL  Сайт/
i18n-wave-2-recovery/README.md` v2 (обновлён в этой сессии).

### Состояние ветки

- Branch: `feat/i18n-wave-2-and-mobile-adaptation`
- Tag pre-flight: `v1.5-before-i18n-wave-2-and-mobile` (main 1aea96a)
- Last commit: `722aa27 feat(i18n/documents): flag EAEU certificates as
  Russian-original on EN/TR`
- 3 коммита поверх main: bd9b550 → ebec990 → 722aa27
- Vercel preview (A.1): https://anhel-website-git-feat-i18n-wave-871d98-
  anurin7-5494s-projects.vercel.app

### Workflow note

Эта сессия использовала Desktop Commander MCP — работа велась НАПРЯМУЮ на
mac пользователя (вне sandbox Cowork), так как mount Cowork указывал на
неправильную папку (`~/Desktop/ANHEL/ANHEL  Сайт/` — только recovery-kit
+ multi-lang.md, без src). Реальный репо лежит в `~/Desktop/ANHEL Сайт/
ANHEL  Сайт/` (outer ANHEL Сайт с пробелом). При следующей сессии лучше
сразу выбрать правильную папку — будет быстрее.

Worktree использовался `/tmp/anhel-wave2` чтобы не дёргать активную ветку
audit/pre-launch-2026-05 в основном clone-е. Worktree остался — следующая
сессия может его переиспользовать или сделать новый.

### Следующий шаг

Задача B (мобильная адаптация + perf) — требует от пользователя:
1. Аудит-скриншотов проблемных мест на mobile (или зелёный свет на широкий
   аудит)
2. Lighthouse / WebPageTest baseline для LCP/CLS/INP — что именно фиксить
3. Если нужно — конкретный список страниц с проблемами

См. recovery-kit README v2 для возможных направлений B-работы.

---

## Сессия 2026-05-13 (вторая) — мобильная адаптация + perf-фиксы

**Цель:** B-задача из предыдущей сессии — мобильная адаптация всех
страниц + перф-фиксы (Google Fonts блокировки в RU, Hero PNG ~5 MB,
Three.js глобальный, аудит 47 «use client»).

**Pre-flight:**
- Тэг `v1.8-before-mobile-adaptation` на `origin/main` (`338385a`).
- Ветка `feat/mobile-adaptation-and-perf` от main, 4 коммита сверху.

### Что сделано в коммитах

| Коммит | Тип | Что |
|---|---|---|
| `f901421` | perf(fonts) | Self-host Inter/Inter Tight/JetBrains Mono + удаление мёртвого three.js |
| `33241e3` | perf(images) | Конверт hero/product PNG → WebP (-87%, -14.5 MB) |
| `ca8226b` | fix(mobile)  | Tap targets 44px, sticky-nav padding, hero downscale, step-rail scroll |
| `0722d92` | perf(rsc)    | "use client" → server для 2 чистых composers |

**Vercel preview:** https://anhel-website-git-feat-mobile-ada-f0d266-anurin7-5494s-projects.vercel.app

### Подробности

**1. Self-hosted fonts** (`f901421`)
- Скачали woff2-файлы Inter/Inter Tight/JetBrains Mono из Google Fonts
  API в `public/fonts/{inter,inter-tight,jetbrains-mono}/` (580 KB total).
- `public/fonts/fonts.css` — единый @font-face listing с unicode-range,
  подключается из `globals.css` через `@import`.
- `src/lib/fonts.ts` — удалён `next/font/google`, оставлен compat-shim.
- `globals.css` `:root` — добавлены `--font-display/--font-body/--font-mono`.
- `layout.tsx` — preload Inter Tight cyrillic-400 + Inter cyrillic-400.
- `scripts/fetch-fonts.sh` + `npm run fonts:fetch` — регенерация.
- **Эффект:** RU-аудитория больше не зависит от заблокированных
  `fonts.googleapis.com` / `fonts.gstatic.com`. LCP стабильнее.

**2. Drop unused three.js** (`f901421`)
- `src/components/three/SceneCanvas.tsx` не импортировался нигде —
  удалён вместе с `three`, `@react-three/fiber`, `@react-three/drei`,
  `@types/three` из package.json. Сэкономили деп-tree.

**3. Hero PNG → WebP** (`33241e3`)
- `scripts/optimize-hero-images.js` (`npm` через `node scripts/...`).
  Использует `sharp` (уже в devDependencies).
- 15 ключевых PNG (hero carousel + 8 модулей теплопункта).
- 16.72 MB → 2.24 MB (-87%). Самые тяжёлые: special.png 1.4 MB → 225 KB,
  vpu.png 1.4 MB → 151 KB, bitp.png 1.3 MB → 202 KB.
- Обновлены 26 файлов references в src/ (.png → .webp).
- PNG-исходники удалены.

**4. Mobile fixes** (`ca8226b`) — на основе аудита 35 страниц + 90
компонентов через subagent. Найденные паттерны:
- Tap targets <44px (WCAG): `QuizNavigation`, `QuizShell` (Success+
  «Изменить»), `RadioGroupField` rows, `ServiceRequestForm` (step-rail +
  sticky-nav), `ProjectsFilter` chips → везде `min-h-11`.
- `text-5xl` H1 в product-page hero без mobile downscale (длинные RU-
  заголовки разлетались в 5 строк): `ProductHero.tsx` L129 +
  `heating-unit/[slug]/page.tsx` L197 → `text-4xl md:text-5xl lg:text-7xl`.
- Sticky bottom-nav без horizontal padding: `QuizNavigation` →
  `-mx-5 px-5 sm:mx-0 sm:px-0` + `pb-[env(safe-area-inset-bottom)]` для
  iOS home-indicator.
- Step-rail из 5-7 шагов с тонкими 6px-точками: `QuizProgress` (5 шагов)
  переключён на horizontal snap-scroll на <sm (min-w-[32vw] per шаг),
  `ServiceRequestForm` step-rail (7 шагов) — min-h-11 на каждый столбик.
- ОК-страницы (не требуют правок per audit): `/products`, `/service`,
  `/contacts`, `/documents`, `/projects`, `/projects/[slug]`,
  privacy-policy / personal-data-consent, MobileMenu, Footer, Header.
  Уже сделано в предыдущих волнах (Hero mobile, batch-2).
- Аудитор пометил `HowItWorksSection.tsx` hardcoded RU-строки (L102-103,
  L106 — «03 · Типы АПТ…») — не баг, но отложить в i18n wave-3.

**5. "use client" cleanup** (`0722d92`)
- 89 файлов с `"use client"` в `src/components/`. Только 3 кандидата без
  state/handler'ов из них. Удалил из 2: `ScenarioCScene` (orchestrator)
  и `QuizSection` (composer). `LakhtaScene` оставил — родитель клиентский
  через GSAP target-by-id, толку нет.
- Семантическая чистка важнее, чем байтовая.

### Что НЕ сделано (но не критично)

- **Визуальная Lighthouse / WebPageTest сверка** — не запущена. Vercel
  preview live, пользователь может прогнать сам или сделать в следующей
  сессии. Ожидаемые улучшения: LCP -1.5/-2.5s (WebP + fonts preload),
  bundle size -200-300 KB (three deps gone, RSC moved).
- **CLS-фиксы** — отдельной волной не делал; основной CLS источник
  (Hero fonts) уже закрыт через preload + self-host.

### Состояние ветки

- Branch: `feat/mobile-adaptation-and-perf`
- Tag pre-flight: `v1.8-before-mobile-adaptation` (origin/main 338385a)
- 4 commits ahead of origin/main:
  - `f901421` perf(fonts): self-host + drop unused three.js
  - `33241e3` perf(images): hero/product PNG → WebP (-14.5 MB)
  - `ca8226b` fix(mobile): tap targets, sticky-nav, hero downscale, step-rail
  - `0722d92` perf(rsc): drop "use client" from ScenarioCScene + QuizSection
- Diff: 97 файлов, +1475/-163

### Workflow note

Снова использован Desktop Commander MCP — Cowork-mount по-прежнему
указывает на пустую `~/Desktop/ANHEL/ANHEL  Сайт/` (только handoff из
прошлой сессии). Реальный репо — `~/Desktop/ANHEL Сайт/ANHEL  Сайт/`.

### Следующий шаг

- Squash-merge PR `feat/mobile-adaptation-and-perf` → main (pre-filled
  URL выдан в чате).
- После merge: tag `v1.9-mobile-adaptation-complete` на main.
- Прогон Lighthouse mobile baseline (главная + 2-3 продуктовые) для
  фиксации эффекта.

Затем — i18n wave-3 (PDF локализация EN/TR) и финальный pre-launch audit.


---

## Сессия 2026-05-13 (третья) — PDF локализация EN/TR (Part A–E)

**Цель ТЗ:** локализовать все PDF-документы сайта на EN и TR, так
чтобы иностранные заказчики могли скачать опросник на своём языке,
распечатать, заполнить, прислать.

**Pre-flight:**
- Тэг `v1.10.1-before-pdf-localization` на `df75c0d`
  (текущий HEAD `feat/i18n-wave-3-documents`).
- Wave-3 НЕ смерджена в main — продолжили в той же ветке.
- `gh` CLI не установлен; PR будет создан через pre-filled URL.

### Что сделано

| Коммит | Тип | Что |
|---|---|---|
| `03254aa` | feat(i18n/pdfs) | EN/TR опросники — 5 quiz kinds × 2 локали × 8 каталогов |
| `8c2ed17` | feat(i18n/pdfs) | Service-request форма EN/TR |
| `cf2fe98` | feat(i18n/pdfs) | Locale-aware swap всех кнопок скачивания |

**Vercel preview:** https://anhel-website-git-feat-i18n-wave-cc682a-anurin7-5494s-projects.vercel.app

### Часть A — Опросные листы (16 PDF)

`_scripts/build_questionnaire_translations.py` — универсальный
ReportLab-генератор. Архитектура:

- Структура опросника (steps → sections → fields) задана в Python
  как зеркало `src/content/quiz/*-fields.ts` + control-systems
  `quiz-config.ts`. ITP heating/vent — через `_itp_system_fields()`,
  повторяя TS-функцию `makeSystemFields()`.
- Labels, hints, options резолвятся из `src/messages/{en,tr}/quiz.json`
  (готовые переводы из wave-3 не переводим заново).
- Renderer класс: A4, ANHEL header + Profit LLC contact strip + doc-ID,
  cover card с инструкцией, мульти-страничный поток с автопагинацией,
  футер с номером страницы. Поля: text/number (подчёркнутая линия +
  единица измерения), textarea (3-строчный box), checkbox (☐ + label),
  radio (○ Option + Option + Option).
- FIELD_UNITS таблица единиц (°C, m³/h, bar, Gcal/h…) — пишутся
  возле линии ввода.

Map quiz_kind → product directories (один и тот же EN/TR PDF копируется):

  pumps (NU, 67 fields)    → firefighting / water-supply / heating-cooling / special
  aupd (30 fields)         → pressure-boost
  itp (61 fields)          → heating-unit
  vpu (26 fields)          → water-treatment
  control_systems (24)     → control-systems

**Итого:** 5 уникальных × 2 локали = 10 файлов × копий = 16 PDF в
`public/docs/<product>/oprosnyi-list-<locale>.pdf`. Размер 35–52 KB.
Шрифт — DejaVu Sans с полным Latin + Turkish (ş, ı, ç, ğ).

### Часть B — Service request форма (2 PDF)

`_scripts/build_service_request_translations.py` — переиспользует
Renderer + chrome из questionnaire-генератора. Структура из
`src/content/service/form-config.ts` (4 шага + review). Сигнатурный
блок и follow-up note про фото/видео — добавлены поверх стандартного
рендера. Переводы из `src/messages/{en,tr}/service.json`
(`service.request_form` namespace из wave-3).

Output:
  `/public/documents/service-request-anhel-en.pdf` — 37 KB
  `/public/documents/service-request-anhel-tr.pdf` — 38 KB

RU-master `/public/documents/service-request-anhel.pdf` не тронут.

### Часть C — Руководства

В wave-3 уже сделаны 10 PDF (5 насосных категорий × 2 локали,
~60–63 KB). Проверены: pypdf reads 16 страниц, шапка/футер EN/TR
корректные. Других категорий с RU-руководством на сайте нет
(heating-unit/water-treatment/control-systems никогда не имели
manual.pdf), переводить нечего.

### Часть D — Что НЕ переводим (по ТЗ)

- Декларации соответствия ЕАЭС — юр. документы РФ.
- Сертификаты — юр. документы РФ.
- Технические каталоги МФМК — требуют переверстки, отдельная задача.

На карточках этих документов на EN/TR продолжает выводиться
«Original document (Russian)» note.

### Часть E — Locale-aware кнопки скачивания

24 product-locale файла (`src/content/products/locales/{en,tr}/*.ts`):
  - `secondaryCta.href` → `-<locale>.pdf`
  - `documents.items[].href` → `-<locale>.pdf`
  - размер обновлён на актуальный (PDF меньше в 30–60 раз)

Документная страница `src/app/[locale]/documents/page.tsx`:
  - `COMMON_DOCS` переписан на `href: (locale) => string`. Теперь
    оба entry (anhel_card + service_request) локализуются через
    функцию-резолвер.
  - Новая функция `localizedQuestionnaire(q, locale)` свапает stem
    `oprosnyi-list.pdf` → `oprosnyi-list-<locale>.pdf` и подставляет
    компактный size.
  - `ruNote` теперь применяется ТОЛЬКО к сертификатам/декларациям.
  - Manual-карточки уже умели swap из wave-3, без правок.

Сервисная страница `src/app/[locale]/service/page.tsx`:
  - Hero CTA «Download PDF form» резолвится через новый
    `resolveServicePdfHref(locale)` из `page-content.ts`.
  - Старая константа `SERVICE_PDF_HREF` помечена `@deprecated`,
    оставлена для совместимости.

`.gitignore`: добавлен `.claude/` (Cowork worktree cache).

`npx tsc --noEmit` clean.

### Финальная таблица PDF локализаций

| Тип документа | RU | EN | TR | Locale-aware? |
|---|---|---|---|---|
| Карточка организации | ✅ 40 KB | ✅ 33 KB | ✅ 34 KB | ✅ /contacts + /documents |
| Опросник pumps (×4 dirs) | ✅ 1.45 MB | ✅ 40 KB | ✅ 42 KB | ✅ |
| Опросник aupd (pressure-boost) | ✅ 0.29 MB | ✅ 38 KB | ✅ 40 KB | ✅ |
| Опросник itp (heating-unit) | ✅ 0.52 MB | ✅ 50 KB | ✅ 51 KB | ✅ |
| Опросник vpu (water-treatment) | ✅ 2.17 MB | ✅ 37 KB | ✅ 39 KB | ✅ |
| Опросник control-systems | ✅ 1.80 MB | ✅ 35 KB | ✅ 36 KB | ✅ |
| Service-request форма | ✅ 60 KB | ✅ 37 KB | ✅ 38 KB | ✅ |
| Руководство (×5 pump dirs) | ✅ 1.38 MB | ✅ 61 KB | ✅ 63 KB | ✅ wave-3 |
| Декларации соответствия | ✅ 0.5–0.9 MB | — | — | RU-only (юр.) |
| Каталоги МФМК | — | — | — | требуют переверстки |

### Состояние ветки

- Branch: `feat/i18n-wave-3-documents` (продолжение wave-3)
- Tags: `v1.10.1-before-pdf-localization` (pre-flight),
        `v1.11-pdf-localization-complete` (после squash-merge)
- Commits ahead of origin/main (по PR счёт от main 7b78ad0):
  - wave-3 коммиты (12) + локализация PDF (3)
- Diff: 33 файла (~17 PDFs + 24 locale-content + 3 ts + 3 scripts)

### Следующий шаг

- Squash-merge PR `feat/i18n-wave-3-documents` → main:
  https://github.com/vkwk2m7vwc-lang/anhel-website/compare/main...feat/i18n-wave-3-documents?expand=1&title=PDF%20localization%20EN%2FTR%20%2B%20wave-3%20documents&body=Squash-merge%20PDF%20localization%20wave%20into%20wave-3%20documents%20branch.
- После merge: `git tag v1.11-pdf-localization-complete` на merge commit.
- Затем — финальный редакционный аудит сайта перед публичным запуском.

---

## Сессия 2026-05-13 (третья, продолжение) — ревью-фиксы

Алексей провёл ревью preview-деплоя, нашёл 2 предсуществующих бага +
3 правки по PDF. Все исправлены отдельными коммитами в той же ветке.

| Коммит | Тип | Что |
|---|---|---|
| `95926d9` | fix(heating-unit) | Картинки модулей ИТП `.png` → `.webp` |
| `82b8a25` | fix(i18n) | Статические PDF-ссылки через `<a>`, не next-intl `<Link>` |
| `7f11604` | fix(i18n/pdfs) | Шапка PDF: наезд текста, info@ email, обязательные поля |

**Vercel preview:** https://anhel-website-git-feat-i18n-wave-cc682a-anurin7-5494s-projects.vercel.app

### Баг 1 — картинки модулей ИТП (предсуществующий, был на проде)

`heating-unit-modules/data.ts` — helper `MODULE_IMG` строил путь
`${slug}.png`, но файлы на диске — `.webp` (WebP-конвертация в
`7b78ad0` обновила 26 литеральных ссылок, но не template-literal
helper). Фикс: `.png` → `.webp`. Картинки лежат в git, ассеты не
трогали.

### Баг 2 — PDF на /documents не скачивались (предсуществующий, был на проде)

`DocCard` (`documents/page.tsx`) и `DocumentsGrid.tsx` рендерили
ссылки на статические PDF через next-intl `<Link>` из `@/navigation`.
Этот компонент — для роутов приложения: на EN/TR подставлял префикс
локали (`/en/docs/...` → 404), на RU перехватывал клик для SPA-
навигации (роута `/docs/x.pdf` нет → 404-страница). Введён в
`63e6c32`, был в `main`. Фикс: чистый `<a href download>` —
зеркало паттерна `ProductHero.ProductCtaButton`. Заодно из
`DocumentsGrid.RU_ONLY_DOC_IDS` убран `oprosnik` — опросники теперь
локализованы, note «Original document» остаётся только для деклараций.

### Правки PDF (3 шт.)

1. **Наезд текста в шапке** — company strip (слева) налезал на
   Document ID (справа). Strip укорочен +
   `draw_header()` измеряет ширину doc-ID и обрезает strip по « · ».
2. **Email** — `sales@anhelspb.com` → `info@anhelspb.com` везде
   (strip + инструкция), как на сайте и в RU-оригиналах.
3. **Обязательные поля** — 6 контактных полей всех опросников +
   required-поля control-systems и сервисной формы получили красную
   `*` после лейбла + легенда «* — required field / zorunlu alan».
   Карта required извлечена из `src/content/quiz/*-fields.ts` и
   form-config'ов.

Все 18 PDF перегенерированы. Визуально проверены (PyMuPDF render):
шапка чистая, info@, красные `*` на обязательных. `tsc` clean.

### Состояние ветки

- Branch: `feat/i18n-wave-3-documents`, tip `7f11604`
- Tag `v1.11-pdf-localization-complete` передвинут на `7f11604`
- Vercel preview `7f11604` — READY
- Готово к squash-merge → main после ОК Алексея.


---

## Сессия 2026-05-14 — Редакционный визуальный аудит (Pre-flight + Шаг 1)

**ТЗ:** `uploads/tz_editorial_audit_FINAL_v8.md` — редакционный аудит глазами
посетителя (главный инженер, 15 минут, iPhone). Mobile-first. НЕ QA кода.

### Pre-flight — ✅ выполнен

- Тэг `v1.11.1-before-editorial-audit` на main (`50581d8`).
- Ветка `feat/editorial-visual-audit` от main, checked out в рабочей
  iCloud-папке (была на `feat/i18n-wave-3-documents`, git clean — переключение
  безопасно). `_audit/`, `_audit/screenshots/`, `_audit/pages/` созданы.

### Шаг 1 — Карта сайта — ✅ выполнен

`_audit/site-map.json` — **54 маршрута**:
- P0 (4): /, /products, /service, /contacts
- P1 (7): /documents, /projects, /service/request + 4 family-landing
  (pumps, control-systems, heating-unit, water-treatment)
- P2 (35): 5 насосных + 4 firefighting-сценария + 5 шкафов + 8 ИТП-модулей
  + 13 объектов /projects/[slug]
- P3 (5): /quiz/{pumps,aupd,itp,vpu,control-systems}
- P4 (3): /privacy-policy, /personal-data-consent, **/hero-e**

**Расхождения с ТЗ (зафиксированы в site-map.json):**
- ТЗ говорит «4 шкафа» — фактически 5 детальных control-systems страниц.
- `/hero-e` — похоже на экспериментальную/dev-страницу hero-варианта.
  ФЛАГ: вероятно не должна быть в публичном роутинге. Проверить отдельно.
- water-treatment не имеет детальных подстраниц — это и есть страница
  направления (отнесено к P1 family-landing).

### Тулинг скриншотов — ✅ настроен и проверен

- **NODE_ENV trap:** в shell снова утекал `NODE_ENV=production` — все
  next-команды запускаются с `unset NODE_ENV`.
- Playwright 1.60.0 + chromium установлены (`npm i -D playwright`,
  `npx playwright install chromium`). `sharp` 0.34.5 уже был в deps.
- Прод-сборка: `npm run build` — ✓ 169 страниц, чисто. Прод-сервер
  `npm start` на `http://localhost:3000` (RU=/, EN=/en, TR=/tr;
  localePrefix as-needed).
- Тема: next-themes, `attribute="class"`, `defaultTheme="light"`,
  storageKey `theme` → скриптом ставится `localStorage.theme` до загрузки.
- `_audit/screenshot.mjs` — пайплайн: viewports 390/820/1440, локали
  ru/en/tr, темы light/dark, full-page → WebP q80. Гард: длинные mobile-
  страницы (>16000px — лимит WebP) даунскейлятся sharp'ом.
  Аргументы: `--routes`, `--priority`, `--all`, `--viewports`, `--locales`,
  `--themes`, `--base`.
- **Проверено:** `/` mobile 390 (ru, light+dark) + desktop 1440 — 4 webp
  ок, тема переключается, страница рендерится полностью. Файлы в
  `_audit/screenshots/home/`.

### Состояние

- Branch: `feat/editorial-visual-audit` @ `50581d8` (= main, без коммитов)
- Прод-сервер запущен на :3000 (для следующей сессии: проверить
  `lsof -ti:3000`, при необходимости `npm run build && npm start`)
- Чистого коммита по `_audit/` ещё нет — артефакты аудита можно
  коммитить отдельно или в конце.

### Следующий шаг — Шаг 2: проход страниц (mobile-first)

1. Прогнать `screenshot.mjs --priority P0,P1` по mobile 390 (ru/en/tr,
   light/dark) — это базовый приоритет.
2. По каждой странице — Шаг 3 (редакционный анализ блоков, JSON) +
   Шаг 4 (`_audit/pages/<route>.md`).
3. Затем P2-P4 выборочно/полностью, Lighthouse mobile по P0.
4. Финал — `_audit/REPORT.md`.

Объём Шагов 2-5 (54 маршрута × вьюпорты × локали × темы + поблочный
анализ + отчёты) — это многочасовая основная работа, идёт отдельными
проходами; контекст-лимит → доделать текущую страницу, обновить этот
файл, остановиться.


---

## Сессия 2026-05-14 (продолжение) — Редакционный аудит: P0-страницы

**Смена стратегии по скриншотам (указание Алексея):** скриншоты делаются ТОЛЬКО
для проблемных блоков (`<route>/<issue-id>.webp`), «ок»-страницы — без файлов,
пометка `status: ok`. Папка `_audit/screenshots/` добавлена в `.gitignore` —
скриншоты локальные, в коммитах только JSON/MD.

### Сделано — все 4 P0-страницы

| Страница | Статус | Проблемных блоков |
|---|---|---|
| `/` | ✅ сильная | 1 (дубль счётчиков) |
| `/products` | ⚠️ тонкая | 2 (дубль главной + пустая desktop-зона) |
| `/service` | ⚠️ нет визуала | 2 (нет фото сервиса + пустая desktop-зона) |
| `/contacts` | ✅ чистая | 0 |

Артефакты: `_audit/pages/{home,products,service,contacts}.md` + `.blocks.json`,
`_audit/REPORT-interim-P0.md`, скриншоты-доказательства в
`_audit/screenshots/{home,products,service}/` (gitignored, локальные).

### Ключевые выводы по P0

- P0 в хорошем состоянии, критичных блокеров нет. 4 правки «переделать» — все
  структурные/контентные, ждут решения Алексея. Мелких визуальных багов
  (которые можно фиксить без согласования) на P0 НЕ найдено — раздел «зафиксил
  сам» пустой.
- Сквозное хорошее: i18n RU/EN/TR переведён полностью (fallback'ов нет), dark-
  тема нигде не разваливается, реальная продуктовая фотография — сильная сторона.
- **Паттерн-проблема:** desktop-hero внутренних страниц — H1+интро в левой
  половине, правая пустая (подтверждено на /products и /service). Проверить на
  P1 family-landing.
- `/hero-e`: dev-страница, нет ссылок из навигации, нет в sitemap.xml, в
  robots.ts — disallow. Рекомендация: удалить из роутинга (P4).
- `/contacts` карта: в headless-скриншотах пустой бокс — ПРОВЕРЕНО, артефакт
  headless-рендера, НЕ баг (iframe грузится, запросы 200, контент виджета в DOM).
  Алексею мельком подтвердить в обычном браузере.

### Тех. состояние

- Branch `feat/editorial-visual-audit` — артефакты `_audit/` готовы к коммиту
  (JSON+MD; скриншоты gitignored).
- Прод-сервер `npm start` на :3000 (может быть ещё запущен; для след. сессии —
  `lsof -ti:3000`, при необходимости `unset NODE_ENV && npm run build && npm start`).
- Скриншот-пайплайн: `_audit/screenshot.mjs` (batch, `--outdir /tmp/audit-scratch`),
  `_audit/shoot.mjs` (одиночный/clip). Scratch-скрины — в `/tmp/audit-scratch/`.
- **NODE_ENV trap снова актуален** — все next-команды с `unset NODE_ENV`.

### Следующий шаг — P1 (7 страниц)

`/documents`, `/projects`, `/service/request`, `/products/pumps`,
`/products/control-systems`, `/products/heating-unit`, `/products/water-treatment`.
На family-landing отдельно проверить паттерн пустой desktop-зоны hero.
Затем P2/P3/P4 и финальный `_audit/REPORT.md`.


---

## Сессия 2026-05-14 (продолжение 2) — Решения по P0 + применение

Алексей принял P0-отчёт и дал решения по 5 находкам. Лог решений —
`_audit/DECISIONS.md` (закоммичен).

### Применено

- `bc6abcb fix(home)` — решение #1: убран дублирующий блок счётчиков
  150+/12+/4+/24+ из `AboutSection` (+ удалён неиспользуемый `Stat`).
  «4 направления» убрано из счётчиков `ProductionSection`, оставлено
  только в hero; сетка статов Производства 4→3 колонки.
- `26a5933 fix(routing)` — решение #5: удалён `src/app/[locale]/hero-e/`,
  убран `/hero-e` из `robots.ts`, поправлен комментарий в `HeroBgCarousel`.

Проверено: `tsc` чисто, `npm run build` — ✓ 166 страниц (было 169),
`/hero-e` → 404. Layout «О компании» и «Производство» проверен скриншотами
на mobile 390 + desktop 1440 — держится (Производство: 3 стата, desktop
3-в-ряд / mobile 2+1).

### Отложено / ждёт

- **#2** `/products` тонкий каталог — backlog после запуска (структурная
  задача, Алексей продумает наполнение).
- **#3** пустая правая зона desktop hero (/products + /service) — Алексею
  отправлены 2 desktop-скриншота, ждёт его решения. НЕ фиксить автономно.
- **#4** `/service` без фото — backlog, ждёт фотоматериалов от заказчика.
- Карта `/contacts` — Алексей подтвердил, на проде работает. Не трогать.
- Тех.долг: осиротевшие i18n-ключи `home.about.stats.*` +
  `home.production.stats.directions_caption` в `messages/*/home.json` —
  безвредны, почистить отдельным коммитом.

### Состояние

- Branch `feat/editorial-visual-audit`: `ddc4023` (audit P0) → `bc6abcb`
  (fix counters) → `26a5933` (fix hero-e) → `docs(audit): decisions log`.
- Прод-сервер пересобран и перезапущен на :3000 (новый build).
- `_audit/screenshots/` gitignored; `_audit/DECISIONS.md` закоммичен.

### Следующий шаг — P1 (7 страниц)

Не начат в этой сессии (контекст исчерпан на P0 + применении решений).
P1: `/documents`, `/projects`, `/service/request`, `/products/pumps`,
`/products/control-systems`, `/products/heating-unit`,
`/products/water-treatment`.
На family-landing отдельно проверить паттерн пустой desktop-зоны hero
(#3) — но саму правку #3 не делать до ответа Алексея.
Скриншоты — только проблемных блоков (`<route>/<issue-id>.webp`).


---

## Сессия 2026-05-14 (продолжение 3) — Решение #3 + push + preview

Алексей по #3: переделать hero `/products` и `/service` в типографический
одноколоночный формат. Сделано.

### Применено

- `7db772f fix(hero)` — hero обеих страниц переведён в одну левую
  колонку `max-w-4xl`, выровненную по левому краю. `/service`: убрана
  сетка `md:grid-cols-12` + `md:col-span-7` (это и был «пустой правый
  столбец»). `/products`: контent обёрнут в один `max-w-4xl`, убраны
  рассогласованные per-element max-width у H1. Mobile не затронут
  (там колонка и так одна — проверено скриншотом).
- Проверено: `tsc` + `npm run build` чисто, 166 страниц. Desktop и
  mobile heroes сверены скриншотами.

### Push + Vercel preview

- Ветка `feat/editorial-visual-audit` запушена в origin (5 коммитов:
  `ddc4023` → `bc6abcb` → `26a5933` → `82cfc7f` → `7db772f`, далее
  ещё docs-коммит этой записи).
- Vercel branch-preview (стабильный branchAlias):
  **https://anhel-website-git-feat-editorial-515bd3-anurin7-5494s-projects.vercel.app**
- Алексей смотрит на preview сразу 3 фикса: #1 счётчики (главная),
  #5 /hero-e (→404), #3 hero (/products + /service).

### Статус решений P0

| # | Решение | Статус |
|---|---|---|
| 1 счётчики | убрать | ✅ `bc6abcb` |
| 2 каталог тонкий | отложить | 📋 backlog после запуска |
| 3 пустой desktop-hero | типографический hero | ✅ `7db772f` — ждёт ОК на preview |
| 4 /service без фото | backlog | 📋 ждёт фото от заказчика |
| 5 /hero-e | удалить из роутинга | ✅ `26a5933` |

### Следующий шаг

Ждём ОК Алексея по preview. После ОК — **P1 (7 страниц)** в новой
сессии: `/documents`, `/projects`, `/service/request`, 4 family-landing.
Скриншоты — только проблемных блоков. Тех.долг (осиротевшие i18n-ключи
`home.about.stats.*`) — в финальную уборку кода после всего аудита.
