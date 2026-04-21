# 01. Hero-секция

## Задача

Создать hero главной страницы, который сразу даёт ощущение «Apple-уровень, не сайт-каталог».

## Структура

```
┌─────────────────────────────────────────────────┐
│  ANHEL®       [меню]              [+7 812...]   │  ← шапка
│                                                  │
│  01 / 04 · ИНЖЕНЕРНОЕ ОБОРУДОВАНИЕ               │  ← тех-подпись
│                                                  │
│  Оборудование,                                   │
│  которое работает                                │  ← массивный
│  десятилетиями.                                  │    заголовок
│                                                  │
│                                                  │
│  [Смотреть каталог →]   [Опросный лист]          │  ← CTA
│                                                  │
│                    150+   12    04               │
│                    объектов лет  напр.           │  ← счётчики
│                                                  │
│  ПРОЕКТИРОВАНИЕ · ПРОИЗВОДСТВО · АВТОМАТИЗАЦИЯ   │  ← футер-подпись
│                              ПРОКРУТИТЬ ↓        │
└─────────────────────────────────────────────────┘
```

## Фоновое видео

### Что снимать / генерить

- 4K, 10-15 секунд, бесшовный loop
- Содержание:
  - Сталь крупным планом
  - Капли воды падают на полированную поверхность
  - Проворачивается крыльчатка насоса (замедленно)
  - Загорается панель управления (мягкий свет)
  - Труба в разрезе, поток воды внутри
- Музыки нет (автоплей без звука)
- Цветокоррекция: холодный тон, увеличенный контраст, приглушённые тёмные

### Технические требования

```
formats: WebM (VP9) + MP4 (H.264 fallback)
resolution: 3840×2160 (4K)
framerate: 24fps
bitrate: 8-12 Mbps
duration: 10-15s
size: ≤ 3 MB на hero
preload: metadata (не auto)
```

### Оверлеи

```css
/* Затемнение для читаемости текста */
.hero-overlay {
  background: linear-gradient(
    180deg,
    rgba(10, 10, 10, 0.4) 0%,
    rgba(10, 10, 10, 0.5) 50%,
    rgba(10, 10, 10, 0.7) 100%
  );
}

/* Сетка-паттерн поверх (как на прототипе) */
.hero-grid {
  background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 40px 40px;
}
```

## Заголовок

### Текст

```
Оборудование,
которое работает
десятилетиями.
```

Вторая строка — приглушённая (opacity 0.5), что создаёт ощущение «акцента» на первой и третьей.

### Стиль

```css
h1.hero-title {
  font-family: 'Neue Haas Grotesk Display', 'Inter Tight', sans-serif;
  font-size: clamp(56px, 8vw, 180px);
  font-weight: 500;
  line-height: 0.95;
  letter-spacing: -0.025em;
  color: #F5F5F3;
}

h1 span.muted {
  color: rgba(245, 245, 243, 0.5);
}
```

### Анимация появления

```javascript
// GSAP SplitText: разбить на слова и буквы
// Каждое слово появляется снизу с opacity 0→1
// Stagger 0.04s между словами
// Easing: expo.out, duration 1.2s

import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

const split = new SplitText('.hero-title', { type: 'words, chars' });

gsap.from(split.words, {
  y: 100,
  opacity: 0,
  duration: 1.2,
  ease: 'expo.out',
  stagger: 0.04,
});
```

### Интерактив на hover (опционально)

Лёгкое искажение букв при наведении — как через воду. Не навязчиво.

```javascript
// Через WebGL displacement shader или GSAP
// При mouseleave — плавно возвращается к исходному виду
```

## Кнопки CTA

### Основная — «Смотреть каталог»

```css
.btn-primary {
  background: #F5F5F3;
  color: #0A0A0A;
  padding: 14px 22px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition: transform 300ms ease-out;
}

.btn-primary:hover {
  transform: translateX(4px);
}

.btn-primary .arrow {
  font-family: 'JetBrains Mono', monospace;
  transition: transform 300ms ease-out;
}

.btn-primary:hover .arrow {
  transform: translateX(4px);
}
```

### Вторичная — «Опросный лист»

```css
.btn-ghost {
  background: transparent;
  color: #F5F5F3;
  border: 0.5px solid rgba(245, 245, 243, 0.4);
  padding: 14px 22px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
}

.btn-ghost:hover {
  background: rgba(245, 245, 243, 0.05);
  border-color: rgba(245, 245, 243, 0.7);
}
```

### Магнитный эффект

Обе кнопки «притягиваются» к курсору при приближении (3-6px).

```javascript
// useMagneticButton custom hook
const handleMouseMove = (e) => {
  const rect = button.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;

  gsap.to(button, {
    x: x * 0.3,
    y: y * 0.3,
    duration: 0.3,
    ease: 'power2.out',
  });
};

const handleMouseLeave = () => {
  gsap.to(button, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out' });
};
```

## Счётчики

### Структура

```jsx
<div className="hero-stats">
  <Counter value={150} suffix="+" label="ОБЪЕКТОВ" />
  <Counter value={12} label="ЛЕТ ОПЫТА" />
  <Counter value={4} prefix="0" label="НАПРАВЛЕНИЯ" />
</div>
```

### Анимация flip-одометра

```javascript
// При появлении в viewport — цифры «прокручиваются» от 0 до целевого значения
// Вариант 1: GSAP CountUp
gsap.from(counter, {
  innerText: 0,
  duration: 2,
  ease: 'power2.out',
  snap: { innerText: 1 },
  onUpdate: function() {
    counter.innerText = Math.round(this.targets()[0].innerText);
  }
});

// Вариант 2: библиотека react-countup
<CountUp end={150} duration={2} suffix="+" />
```

### Стиль

```css
.counter-value {
  font-family: 'JetBrains Mono', monospace;
  font-size: 32px;
  font-weight: 500;
  color: #F5F5F3;
  line-height: 1;
}

.counter-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  color: rgba(245, 245, 243, 0.5);
  letter-spacing: 1px;
  margin-top: 4px;
  text-transform: uppercase;
}

/* + в числе выделяется красным акцентом */
.counter-suffix {
  color: #D72638;
}
```

## Шапка (хедер)

### Поведение при скролле

- При скролле вниз — прячется
- При скролле вверх — появляется с blur-фоном

```javascript
// Framer Motion useScroll + transform
const { scrollY } = useScroll();
const headerY = useTransform(scrollY, [0, 100, 200], [0, 0, -100]);
const headerBg = useTransform(scrollY, [0, 100], ['transparent', 'rgba(10,10,10,0.7)']);
```

### Стиль

```css
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  padding: 20px 24px;
  backdrop-filter: blur(16px);
  transition: background 300ms;
}
```

## Адаптивность

### Desktop (> 1024px)

- Заголовок: 120-180px
- Полноценное видео на фоне

### Tablet (768-1024px)

- Заголовок: 72-96px
- Видео остаётся, меню в hamburger

### Mobile (< 768px)

- Заголовок: 48-64px
- Видео заменяется на статичный рендер (high-quality JPG с overlay)
- Счётчики под CTA в одну колонку
- `playsinline` обязателен, но по умолчанию показываем картинку

```javascript
// Определение мобильного устройства
const isMobile = window.innerWidth < 768;

// Условный рендер
{isMobile ? (
  <img src="/hero-fallback.jpg" alt="" />
) : (
  <video autoPlay muted loop playsInline>
    <source src="/hero.webm" type="video/webm" />
    <source src="/hero.mp4" type="video/mp4" />
  </video>
)}
```

## Доступность

```html
<!-- Видео должно быть помечено decorative -->
<video aria-hidden="true" role="presentation"></video>

<!-- prefers-reduced-motion -->
<style>
  @media (prefers-reduced-motion: reduce) {
    video { display: none; }
    .hero-fallback-image { display: block; }
  }
</style>
```

## Acceptance criteria

- [ ] Заголовок появляется по словам при загрузке (через 200ms после DOMContentLoaded)
- [ ] Видео автоплеится без звука, loop без склейки
- [ ] Счётчики откручиваются при появлении в viewport
- [ ] CTA-кнопки магнитятся к курсору
- [ ] Шапка прячется при скролле вниз, показывается при скролле вверх с blur-фоном
- [ ] На мобильном видео заменяется на JPG
- [ ] `prefers-reduced-motion` отключает все анимации
- [ ] Lighthouse Performance на этой секции ≥ 90
