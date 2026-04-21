# 02. Блок каталога 4 продуктов

## Задача

Основной блок главной страницы — показать все 4 направления ANHEL в кинематографичном формате.

## Механика: горизонтальный pinned-скролл

Пользователь крутит колесо вниз → карточки продуктов проезжают **горизонтально** (блок «приклеен» к viewport через `position: sticky`). Всего 4 экрана, затем страница продолжает обычный вертикальный скролл.

### Реализация через GSAP ScrollTrigger

```javascript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const container = document.querySelector('.products-horizontal');
const panels = gsap.utils.toArray('.product-panel');

gsap.to(panels, {
  xPercent: -100 * (panels.length - 1),
  ease: 'none',
  scrollTrigger: {
    trigger: container,
    pin: true,
    scrub: 1,
    snap: 1 / (panels.length - 1),
    end: () => `+=${container.offsetWidth}`,
  },
});
```

## 4 продукта (порядок)

### 01. Насосная станция водоснабжения (HVS-NU)

- **Акцент:** синий `#1E6FD9`
- **Рендер:** `assets/products/hvs-nu.png`
- **Краткий оффер:** «Бесперебойное водоснабжение для ЖК, офисов, промышленных объектов»
- **Параметры на карточке:**
  - `Q: 5-500 м³/ч` (производительность)
  - `H: 20-150 м` (напор)
  - `P: до 250 кВт` (мощность)

### 02. Насосная станция пожаротушения

- **Акцент:** красный `#D72638`
- **Рендер:** `assets/products/hvs-nu-red2.png`
- **Краткий оффер:** «Дренчерные, спринклерные, пенные системы и совмещённые с водоснабжением»
- **Параметры:**
  - `Q: 10-300 л/с`
  - `P: до 160 кВт`
  - `Соответствие СП 10.13130`

### 03. Установка водоподготовки (VPU)

- **Акцент:** стальной `#8A94A0`
- **Рендер:** `assets/products/vpu.png`
- **Краткий оффер:** «Очистка воды любой сложности — от фильтрации до обратного осмоса»
- **Параметры:**
  - `Q: 1-1000 м³/ч`
  - `Производство: собственное`
  - `Под любую задачу заказчика`

### 04. Блочный тепловой пункт (ANHEL® HEAT)

- **Акцент:** оранжевый `#E8873B`
- **Рендер:** `assets/products/heat.png` (пока нет — запросить у заказчика)
- **Краткий оффер:** «Модульный тепловой пункт с энергоэффективной автоматикой»
- **Параметры:**
  - `Q: 0.1-20 МВт` (тепловая мощность)
  - `Автоматика на базе лидеров рынка`
  - `Монтаж под ключ`

## Структура одной панели

```
┌────────────────────────────────────────────────┐
│                                                 │
│              [рендер продукта]     01 / 04      │
│                                                 │
│                                    ПРОДУКТ      │
│                                    Насосная     │
│                                    станция      │
│                                    водоснабжения│
│                                                 │
│                                    Q: 5-500 м³/ч│
│                                    H: 20-150 м  │
│                                    P: до 250 кВт│
│                                                 │
│                                    [Подробнее →]│
│                                                 │
└────────────────────────────────────────────────┘
```

### HTML-структура

```jsx
<section className="product-panel" data-product="water-supply">
  <div className="product-visual">
    <img src="/assets/products/hvs-nu.png" alt="Насосная станция водоснабжения" />

    {/* Тех-выноски появляются при входе в viewport */}
    <svg className="callouts">
      <line x1="30%" y1="40%" x2="60%" y2="50%" className="callout-line" />
      <text x="30%" y="35%" className="callout-label">НАСОСНЫЙ БЛОК</text>
    </svg>
  </div>

  <div className="product-content">
    <div className="product-meta">
      <span className="product-number">01 / 04</span>
      <span className="product-type">НАСОСНАЯ СТАНЦИЯ</span>
    </div>

    <h2 className="product-title">
      Бесперебойное<br />
      водоснабжение.
    </h2>

    <p className="product-description">
      Для ЖК, офисов, промышленных объектов.
      Работает 20+ лет без капитального ремонта.
    </p>

    <div className="product-specs">
      <Spec label="Q" value="5-500" unit="м³/ч" />
      <Spec label="H" value="20-150" unit="м" />
      <Spec label="P" value="до 250" unit="кВт" />
    </div>

    <a href="/products/water-supply" className="btn-ghost">
      Подробнее
      <span className="arrow">→</span>
    </a>
  </div>
</section>
```

## Стили панели

```css
.product-panel {
  flex: 0 0 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 48px;
  padding: 80px 120px;
  background: #0A0A0A;
  position: relative;
}

/* Фоновый градиент под цвет продукта */
.product-panel[data-product="water-supply"] {
  background: radial-gradient(
    ellipse at 30% 50%,
    rgba(30, 111, 217, 0.15) 0%,
    #0A0A0A 70%
  );
}

.product-panel[data-product="fire-fighting"] {
  background: radial-gradient(
    ellipse at 30% 50%,
    rgba(215, 38, 56, 0.15) 0%,
    #0A0A0A 70%
  );
}

/* ... и т.д. для остальных */
```

## Анимация выносок (callouts)

При входе панели в viewport, с задержкой 400ms после продукта:

```javascript
// SVG-линии прорисовываются через stroke-dashoffset
.callout-line {
  stroke: currentColor;
  stroke-width: 0.5;
  stroke-dasharray: 200;
  stroke-dashoffset: 200;
}

// При активации:
gsap.to('.callout-line', {
  strokeDashoffset: 0,
  duration: 1.2,
  ease: 'power3.out',
  stagger: 0.2,
});

// Подписи появляются следом
gsap.from('.callout-label', {
  opacity: 0,
  y: 10,
  duration: 0.6,
  stagger: 0.2,
  delay: 0.4,
});
```

## Tilt-эффект на продукте

При движении мыши над продуктом — лёгкий наклон (максимум 5°):

```javascript
import { useMotionValue, useTransform } from 'framer-motion';

const x = useMotionValue(0);
const y = useMotionValue(0);
const rotateX = useTransform(y, [-100, 100], [5, -5]);
const rotateY = useTransform(x, [-100, 100], [-5, 5]);

<motion.img
  src={render}
  style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
  onMouseMove={(e) => {
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }}
  onMouseLeave={() => { x.set(0); y.set(0); }}
/>
```

## Индикатор прогресса

Сверху панели — тонкая линия, показывает какой из 4 продуктов сейчас активен:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
●━━━━○━━━━○━━━━○   ← 01 активна
○━━━━●━━━━○━━━━○   ← прокрутили к 02
```

```jsx
<div className="products-progress">
  {[0, 1, 2, 3].map((i) => (
    <div key={i} className={i === activeIndex ? 'active' : ''} />
  ))}
</div>
```

## Мобильная адаптация

На тач-устройствах (< 1024px):
- Pin-скролл отключается
- Продукты становятся вертикальным слайдером-каруселью (Swiper.js)
- Параметры продукта под картинкой
- Tilt-эффект отключён

```jsx
{isMobile ? (
  <Swiper modules={[Pagination]} pagination={{ clickable: true }}>
    {products.map(p => (
      <SwiperSlide key={p.id}>
        <ProductCard {...p} />
      </SwiperSlide>
    ))}
  </Swiper>
) : (
  <HorizontalScrollProducts products={products} />
)}
```

## Acceptance criteria

- [ ] 4 продукта проезжают горизонтально при вертикальном скролле
- [ ] Snap к каждой панели (нельзя остановиться между)
- [ ] Фоновый градиент плавно меняется под цвет активного продукта
- [ ] Выноски прорисовываются при входе в viewport
- [ ] Tilt-эффект на продукте работает на десктопе
- [ ] Индикатор прогресса сверху показывает текущий продукт
- [ ] На мобильном — вертикальный слайдер вместо pin-скролла
- [ ] Клик по «Подробнее» ведёт на страницу продукта
