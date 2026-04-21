# 05. Анимации — полный список

## Базовая инфраструктура

### Зависимости

```json
{
  "framer-motion": "^11.0.0",
  "gsap": "^3.12.0",
  "lenis": "^1.0.0",
  "@studio-freight/react-lenis": "^0.0.47",
  "three": "^0.160.0",
  "@react-three/fiber": "^8.15.0",
  "@react-three/drei": "^9.92.0"
}
```

### Инициализация Lenis (smooth scroll)

```jsx
// app/layout.tsx или _app.tsx
import { ReactLenis } from '@studio-freight/react-lenis';

<ReactLenis root options={{
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
  smoothTouch: false,
}}>
  {children}
</ReactLenis>
```

### GSAP регистрация

```javascript
// utils/gsap.ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

export { gsap, ScrollTrigger, SplitText };
```

---

## Глобальные анимации

### 1. Кастомный курсор

Две точки — маленькая (следует за курсором мгновенно) + большой круг (с lag).

```jsx
// components/Cursor.tsx
const Cursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [variant, setVariant] = useState<'default' | 'button' | 'video'>('default');

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <>
      <div
        className="cursor-dot"
        style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
      />
      <motion.div
        className="cursor-ring"
        animate={{ x: pos.x, y: pos.y }}
        transition={{ type: 'spring', mass: 0.3 }}
      />
    </>
  );
};
```

На hover по кнопкам — круг увеличивается и превращается в стрелку.
На hover по видео — превращается в «play».

### 2. Магнитные кнопки

```jsx
// hooks/useMagnetic.ts
export const useMagnetic = (ref, strength = 0.3) => {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(el, { x: x * strength, y: y * strength, duration: 0.3 });
    };

    const handleLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
    };

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [strength]);
};
```

### 3. Переходы между страницами

Next.js App Router + Framer Motion:

```jsx
// app/template.tsx
'use client';
import { motion } from 'framer-motion';

export default function Template({ children }) {
  return (
    <>
      <motion.div
        className="page-curtain"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: 'fixed',
          inset: 0,
          background: '#0A0A0A',
          zIndex: 100,
          transformOrigin: 'bottom',
        }}
      />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {children}
      </motion.main>
    </>
  );
}
```

### 4. Прогресс-бар скролла сверху

```jsx
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: '#F5F5F3',
        transformOrigin: 'left',
        scaleX,
        zIndex: 999,
      }}
    />
  );
};
```

---

## Анимации при скролле

### 5. Text reveal (текст по словам)

```javascript
// utils/textReveal.ts
export const animateText = (element) => {
  const split = new SplitText(element, { type: 'words, chars' });

  gsap.from(split.words, {
    y: 100,
    opacity: 0,
    duration: 1.2,
    ease: 'expo.out',
    stagger: 0.04,
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      once: true,
    },
  });
};

// Применение:
useEffect(() => {
  const elements = document.querySelectorAll('[data-reveal]');
  elements.forEach(animateText);
}, []);
```

```jsx
<h2 data-reveal>
  Оборудование, которое работает десятилетиями.
</h2>
```

### 6. Image parallax

```jsx
import { useScroll, useTransform, motion } from 'framer-motion';

const ParallaxImage = ({ src }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);

  return (
    <div ref={ref} style={{ overflow: 'hidden' }}>
      <motion.img src={src} style={{ y }} />
    </div>
  );
};
```

### 7. Number counters (одометр)

```jsx
import { useInView, useMotionValue, useSpring } from 'framer-motion';

const Counter = ({ target, duration = 2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: duration * 1000 });

  useEffect(() => {
    if (isInView) motionValue.set(target);
  }, [isInView, target]);

  useEffect(() => {
    return springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.round(latest).toString();
      }
    });
  }, []);

  return <span ref={ref}>0</span>;
};
```

### 8. Horizontal pinned sections

Уже разобрано в `02_products_catalog.md` и `03_applications.md`. Суть:

```javascript
gsap.to(panels, {
  xPercent: -100 * (panels.length - 1),
  scrollTrigger: {
    trigger: container,
    pin: true,
    scrub: 1,
    snap: 1 / (panels.length - 1),
    end: () => `+=${container.offsetWidth}`,
  },
});
```

---

## Микровзаимодействия

### 9. Hover на карточках

```css
.product-card {
  transition: transform 400ms cubic-bezier(0.16, 1, 0.3, 1);
}
.product-card:hover {
  transform: scale(1.02) translateY(-4px);
}
```

### 10. Навигация скрывается/появляется при скролле

```jsx
const Header = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      const prev = scrollY.getPrevious();
      setHidden(latest > prev && latest > 100);
    });
  }, []);

  return (
    <motion.header
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {/* ... */}
    </motion.header>
  );
};
```

### 11. Loading splash-screen

При первой загрузке сайта (макс 1.5 сек):

```jsx
const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : p + 5));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {progress < 100 && (
        <motion.div
          exit={{ y: '-100%' }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="loading-screen"
        >
          <img src="/anhel-logo.svg" alt="ANHEL" />
          <div className="progress-bar">
            <div style={{ width: `${progress}%` }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
```

---

## Prefers-reduced-motion

Всё уважает настройку пользователя:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  video[autoplay] { display: none; }
  .hero-fallback-image { display: block !important; }
}
```

На уровне JS:

```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  // запускаем все анимации
} else {
  // пропускаем, показываем статику
}
```

## Производительность

### Правила

1. **Анимируем только `transform` и `opacity`** — GPU-ускорение. Никогда не анимируем `width`, `height`, `top`, `left`, `margin`.

2. **Will-change** — только на элементах, которые точно будут анимироваться, и только во время анимации:

```javascript
element.style.willChange = 'transform';
// ... анимация
element.style.willChange = 'auto';
```

3. **RequestAnimationFrame** — уже встроено в Framer Motion и GSAP.

4. **Intersection Observer** для lazy-анимаций — не мониторим скролл руками.

5. **Cleanup** — всегда отписываемся от событий и ScrollTrigger:

```javascript
useEffect(() => {
  const trigger = ScrollTrigger.create({ ... });
  return () => trigger.kill();
}, []);
```

## Acceptance criteria

- [ ] Все анимации работают плавно 60fps
- [ ] Lenis smooth scroll активен
- [ ] Кастомный курсор работает на десктопе
- [ ] Магнитные кнопки работают
- [ ] Text reveal анимирует при скролле
- [ ] Parallax на изображениях активен
- [ ] Counters анимируются при входе в viewport
- [ ] Page transitions между страницами работают
- [ ] Loading screen показывается при первой загрузке
- [ ] Prefers-reduced-motion полностью отключает анимации
- [ ] Нет layout-shifts (CLS < 0.1)
