# Home page content pass (отчёт)

**Ветка:** `feat/home-page-content-pass`
**Базовая:** `main` (commit `a469cb0`)
**Коммит:** `ad4ca61`

---

## Что сделано

Единственная правка: `src/lib/hero-products.ts` — все 4 product-слайда главной карусели получили `href`, ведущий на их детальные страницы.

| Слайд | href |
|---|---|
| pump-water | `/products/pumps/water-supply` |
| pump-fire | `/products/pumps/firefighting` (было) |
| water-treatment | `/products/pumps/water-treatment` |
| heating-unit | `/products/pumps/heating-unit` |

Никаких изменений в `HeroBgCarousel.tsx` — компонент уже умеет рендерить `<Link>` когда `href` есть, и «Скоро»-чип когда `undefined`. P5 чисто content-level.

---

## ⚠ Зависимость по мержу

Эта ветка **должна мерджиться ПОСЛЕ** `feat/water-supply-page` + `feat/heating-unit-page` + `feat/water-treatment-page`. Иначе 3 из 4 слайдов будут кликать в 404.

В комментарии шапки `hero-products.ts` добавлен explicit warning для maintainer'а.

**Рекомендуемый порядок мержа:**
1. `feat/group2-firefighting` (улучшение существующей firefighting)
2. `feat/water-supply-page`
3. `feat/heating-unit-page`
4. `feat/water-treatment-page`
5. `feat/home-page-content-pass` (этот)

---

## Что проверил (но не трогал)

- **Header nav** (`Header.tsx`) — 5 пунктов:
  - «Продукты» → `/products/pumps/firefighting` (self-link к flagship, OK)
  - «Объекты/О компании/Производство/Контакты» → якоря на home `/#projects` etc. — якоря не 404-ят (даже если секции ещё не реализованы, скролл просто остаётся на главной).
- **Footer nav** (`Footer.tsx`) — тот же набор, same conclusion.
- **MobileMenu** (`MobileMenu.tsx`) — читает `PRODUCTS` из `lib/products.ts`, автоматически отобразит все флипы `comingSoon: false` после мержа P2/P3/P4. Не требует отдельной правки.

---

## Чего НЕ делал

- **Обновление текста на главной** — хедлайн, stats, секция «О компании» — не трогал. Scope P5 был «битые ссылки», это сделал.
- **Проверка home hero counters** (150+, 12, 04) — оставлены как есть, gap требует подтверждения цифр от заказчика (аудит round 1 помечал это как «источник не найден»).
- **Home hero secondary text** — работает, не оптимизировал.

---

## TypeScript

`npx tsc --noEmit` — чисто на `ad4ca61`.
