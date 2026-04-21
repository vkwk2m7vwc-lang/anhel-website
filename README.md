# ANHEL — корпоративный сайт

Производитель инженерного оборудования в Санкт-Петербурге. `anhelspb.com`.

## Стек

Next.js 14 · TypeScript · Tailwind · Framer Motion · GSAP · Lenis · Three.js · shadcn/ui · 21st.dev.

## Как запустить у себя

```bash
npm install        # установить зависимости (один раз)
npm run dev        # dev-сервер на http://localhost:3000
npm run build      # production-сборка
npm run start      # запустить production-сборку локально
npm run typecheck  # проверить типы без сборки
npm run lint       # ESLint
```

Для форм и интеграций скопируй `.env.local.example` → `.env.local` и заполни переменные.

## Где что лежит

- `src/app/` — страницы App Router.
- `src/components/` — UI-компоненты (`layout/`, `providers/`, `three/`).
- `src/hooks/` — React-хуки (`usePrefersReducedMotion`, `useMagnetic`, `useIsTouch`).
- `src/lib/` — `gsap.ts` регистрация плагинов, `fonts.ts` шрифты, `utils.ts` `cn()`.
- `public/assets/products/` — 3D-рендеры продуктов.
- `_docs/` — ТЗ, BRAND.md, детальные документы по разделам и старый README.

## ТЗ и бренд

Главное ТЗ: [`_docs/TZ_ANHEL.md`](./_docs/TZ_ANHEL.md). Палитра и типографика: [`_docs/BRAND.md`](./_docs/BRAND.md). Детали по секциям: `_docs/docs/`.

## Коммиты

Префиксы: `feat:` / `fix:` / `style:` / `docs:`. Код и имена — по-английски, тексты сайта — по-русски.
