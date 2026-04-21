# 04. Внутренняя страница продукта

## Задача

Страница, на которую попадает технический заказчик — проектировщик, главный инженер, закупщик. Должна закрывать все их вопросы и подводить к запросу КП.

## URL и роутинг

```
/products/water-supply       — Насосная станция водоснабжения
/products/fire-fighting      — Насосная станция пожаротушения
/products/water-treatment    — Установка водоподготовки
/products/heat-unit          — Блочный тепловой пункт
```

## Структура страницы

```
┌─────────────────────────────────────────┐
│  [3D-модель]    │   Название             │
│                 │   Описание (2-3 стр)   │
│  [виды/разрез]  │   Параметры таблицей   │
│  [зум]          │   [Запросить КП]       │
│                 │   [Опросный лист]      │
│                 │   [Техлист PDF]        │
├─────────────────────────────────────────┤
│  Назначение (4-6 типов объектов)         │
├─────────────────────────────────────────┤
│  Технические характеристики              │
│  (таблица с фильтром по модели)          │
├─────────────────────────────────────────┤
│  Состав и комплектация                   │
│  (список с интерактивной подсветкой на 3D)│
├─────────────────────────────────────────┤
│  Схема подключения                       │
│  (SVG с анимацией потока воды)           │
├─────────────────────────────────────────┤
│  Кейсы реализации (3-5)                  │
├─────────────────────────────────────────┤
│  Сертификаты и документация              │
├─────────────────────────────────────────┤
│  Блок «Запросить коммерческое»           │
└─────────────────────────────────────────┘
```

---

## 1. Hero продукта (первый экран)

### Слева — 3D-модель

React Three Fiber, интерактивная:

- **Drag** — вращение модели
- **Scroll** — зум внутрь (ограничен)
- **Кнопки** сверху над моделью:
  - `Общий вид`
  - `Сверху`
  - `Сбоку`
  - `В разрезе` (показывает внутреннюю структуру)
- **Кнопка** «Полный экран» — раскрывает в full-viewport

### Справа — текстовая часть

```jsx
<div className="product-info">
  <div className="product-meta">
    <span className="code">MODEL HVS-NU</span>
    <span className="category">НАСОСНАЯ СТАНЦИЯ</span>
  </div>

  <h1>Насосная станция водоснабжения</h1>

  <p className="lead">
    Модульное решение для зданий любой высоты.
    Автоматический режим работы с резервированием.
    Собственное производство в Санкт-Петербурге.
  </p>

  <div className="key-specs">
    <div><span>Q</span> 5-500 м³/ч</div>
    <div><span>H</span> 20-150 м</div>
    <div><span>P</span> до 250 кВт</div>
  </div>

  <div className="cta-group">
    <button className="btn-primary">Запросить КП</button>
    <button className="btn-ghost">Скачать опросный лист</button>
    <a href="/docs/hvs-nu.pdf" className="btn-ghost">Техлист PDF</a>
  </div>
</div>
```

## 2. Секция «Назначение»

4-6 типов объектов с иконками:

- Жилые комплексы
- Бизнес-центры и офисы
- Торговые центры
- Промышленные предприятия
- Гостиницы
- Инфраструктурные объекты

```jsx
<section className="purpose">
  <h2>Назначение</h2>
  <div className="purpose-grid">
    {purposes.map(p => (
      <div className="purpose-card" key={p.id}>
        <Icon name={p.icon} />
        <h3>{p.title}</h3>
        <p>{p.description}</p>
      </div>
    ))}
  </div>
</section>
```

## 3. Технические характеристики (интерактивная таблица)

### Фильтр по модели сверху

```
┌────────────────────────────────────────┐
│  HVS-NU-125  [▼]                       │
│                                         │
│  Q, м³/ч         │   25                 │
│  H, м            │   45                 │
│  Мощность, кВт   │   7.5                │
│  Количество      │   2 + 1 резерв       │
│  насосов         │                      │
│  ...                                    │
└────────────────────────────────────────┘
```

### Реализация

```jsx
const [selectedModel, setSelectedModel] = useState('HVS-NU-125');

<select value={selectedModel} onChange={e => setSelectedModel(e.target.value)}>
  <option>HVS-NU-125</option>
  <option>HVS-NU-250</option>
  <option>HVS-NU-500</option>
  {/* ... */}
</select>

<motion.table
  key={selectedModel}
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
>
  {/* строки таблицы */}
</motion.table>
```

При смене модели — таблица плавно меняет значения (fade + slight translate).

## 4. Состав и комплектация (интерактив с 3D)

Слева — список комплектации. При наведении на пункт — соответствующий узел **подсвечивается на 3D-модели** справа.

```jsx
const [hoveredPart, setHoveredPart] = useState(null);

<div className="composition-layout">
  <div className="parts-list">
    <div
      onMouseEnter={() => setHoveredPart('pump')}
      onMouseLeave={() => setHoveredPart(null)}
    >
      Насосные агрегаты (Grundfos / Wilo)
    </div>
    <div onMouseEnter={() => setHoveredPart('controller')}>
      Шкаф управления с ПЛК
    </div>
    {/* ... */}
  </div>

  <div className="product-3d">
    <Canvas>
      <Model highlightedPart={hoveredPart} />
    </Canvas>
  </div>
</div>
```

В компоненте `Model` — при `highlightedPart === 'pump'` — насос светится акцентным цветом.

## 5. Схема подключения (SVG с анимацией потока)

SVG-диаграмма с движущимися точками по трубам:

```svg
<svg viewBox="0 0 800 400">
  <!-- Трубы -->
  <path id="main-pipe" d="M 50 200 L 400 200 L 400 100 L 750 100"
        stroke="#8A94A0" stroke-width="8" fill="none" />

  <!-- Движущиеся точки (поток воды) -->
  <circle r="4" fill="#1E6FD9">
    <animateMotion dur="2s" repeatCount="indefinite">
      <mpath href="#main-pipe" />
    </animateMotion>
  </circle>

  <!-- Ещё несколько точек со смещением -->
  <circle r="4" fill="#1E6FD9">
    <animateMotion dur="2s" repeatCount="indefinite" begin="0.5s">
      <mpath href="#main-pipe" />
    </animateMotion>
  </circle>
</svg>
```

Точки движутся по трубам с разными смещениями — создаётся ощущение потока.

## 6. Кейсы реализации

Карусель из 3-5 реализованных объектов:

```jsx
<section className="cases">
  <h2>Где работает</h2>
  <Swiper slidesPerView={1.2} spaceBetween={24}>
    {cases.map(c => (
      <SwiperSlide key={c.id}>
        <div className="case-card">
          <img src={c.photo} alt={c.title} />
          <div className="case-info">
            <h3>{c.title}</h3>
            <p>{c.city}, {c.year}</p>
            <p className="case-tech">
              Установлено: {c.equipment}
            </p>
          </div>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</section>
```

## 7. Сертификаты и документация

Карусель PDF-превью + кнопки скачивания.

```jsx
<section className="documents">
  <h2>Документация</h2>
  <div className="docs-grid">
    <DocCard
      title="Опросный лист"
      size="1.05 МБ"
      href="/docs/oprosniy_list.pdf"
    />
    <DocCard
      title="Технический паспорт"
      size="2.3 МБ"
      href="/docs/tech-passport.pdf"
    />
    <DocCard
      title="Сертификат соответствия"
      size="840 КБ"
      href="/docs/cert.pdf"
    />
  </div>
</section>
```

## 8. Форма запроса КП (футер продукта)

```jsx
<section className="quote-form">
  <div className="form-left">
    <h2>Запросить коммерческое предложение</h2>
    <p>
      Ответим в течение рабочего дня.
      Расчёт бесплатный.
    </p>
    <ul>
      <li>Подбор оборудования под ТЗ</li>
      <li>Расчёт параметров</li>
      <li>Коммерческое предложение</li>
      <li>Сроки изготовления</li>
    </ul>
  </div>

  <form className="form-right">
    <input type="text" placeholder="Имя *" required />
    <input type="tel" placeholder="Телефон *" required />
    <input type="email" placeholder="Email" />
    <input type="text" placeholder="Компания" />
    <textarea placeholder="Задача / объект" />
    <input type="file" label="Прикрепить ТЗ или опросный лист" />

    <button type="submit">Отправить запрос →</button>

    <p className="legal">
      Нажимая «Отправить», вы соглашаетесь с политикой обработки персональных данных
    </p>
  </form>
</section>
```

### Обработка формы

- Отправка на `info@anhelspb.com` через Nodemailer/Resend
- Параллельно — уведомление в Telegram-бот отдела продаж
- reCAPTCHA v3 (невидимая)
- Показать success-state: «Спасибо! Мы свяжемся в течение рабочего дня»

## 3D-модели: требования к моделлеру

Для каждого из 4 продуктов — GLB-файл со следующими условиями:

- **Формат:** GLB (бинарный GLTF 2.0)
- **Сжатие:** Draco (обязательно)
- **Размер файла:** ≤ 2 МБ
- **Полигонов:** 30-80k (баланс качества/веса)
- **Текстуры:** 2K максимум, формат KTX2 (Basis Universal)
- **Named parts:** каждый узел (pump, controller, valve, pipe, tank) должен быть отдельным mesh с именем для программной подсветки
- **PBR-материалы:** metallness, roughness для реалистичной стали

## Acceptance criteria

- [ ] 3D-модель загружается < 3 секунд
- [ ] Переключение между видами работает плавно
- [ ] Режим «В разрезе» показывает внутреннее устройство
- [ ] Фильтр таблицы характеристик меняет значения без перезагрузки
- [ ] Hover по компоненту подсвечивает узел на 3D
- [ ] SVG-схема с анимацией потока работает
- [ ] Карусель кейсов работает на тач-устройствах
- [ ] Форма отправляется, reCAPTCHA проходит
- [ ] На мобильном 3D → 360°-свайп из PNG
