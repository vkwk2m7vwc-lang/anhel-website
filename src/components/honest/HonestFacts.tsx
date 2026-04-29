"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * HonestFacts — список проверяемых фактов под героем.
 *
 * Каждый факт состоит из четырёх частей:
 *   1. Mono-индекс (01..06) + анкер-id для глубокой ссылки из hero
 *   2. Plain claim — без рекламной лексики, без знаков «!»
 *   3. Объяснение в 1-2 строки — почему это правда
 *   4. «↗ proof» pointer — линк на конкретное доказательство
 *      (объекты в портфолио, OK ВЭД в выписке, документы и т.п.)
 *
 * Дизайн нарочно «газетный»: широкие колонки, hairline-разделители,
 * чёрный текст на белом, без cards. Это контраст к hero (чёрный
 * канвас): когда читатель доехал до фактов — фон становится белым,
 * как «откройте справку и проверьте сами».
 */
type Fact = {
  id: string;
  index: string;
  claim: string;
  body: string;
  proof: { label: string; href: string };
};

const FACTS: Fact[] = [
  {
    id: "fact-factory",
    index: "01",
    claim: "Один завод. В Москве.",
    body: "Не «партнёрское производство», не «контрактная сборка». Свой цех, своё ОТК, серийная сборка — каждая станция проходит гидро-испытания перед отгрузкой.",
    proof: {
      label: "См. реальные объекты с адресами",
      href: "/projects",
    },
  },
  {
    id: "fact-lifecycle",
    index: "02",
    claim: "30 лет — это срок службы, а не маркетинг.",
    body: "В ТУ серии указано «не менее 10 лет до планового капитального обслуживания». На реальных объектах — больше 20. Цифра 30 — реалистичный потолок, не круглая лозунговая «вечность».",
    proof: {
      label: "Декларации ТР ТС с серийным номером",
      href: "/products/pumps/firefighting#documents",
    },
  },
  {
    id: "fact-portfolio",
    index: "03",
    claim: "13 объектов с фотографиями и адресами.",
    body: "Это не «более 100 проектов» курсивом на заглавной. Тринадцать — те, на которые мы готовы дать ссылку. Когда станет двадцать — будет двадцать. Когда сорок — сорок.",
    proof: {
      label: "Открыть портфолио объектов",
      href: "/projects",
    },
  },
  {
    id: "fact-pricing",
    index: "04",
    claim: "Без наценок «за бренд».",
    body: "Серия HVS-NU собирается на той же базе, что и АЛЬФА Stream. Шильдик другой. КП — тоже. Если разница в цене больше 5% — пришлите конкурентское и докажем по позициям.",
    proof: {
      label: "Прислать своё КП на сравнение",
      href: "mailto:info@anhelspb.com?subject=Сравнение КП",
    },
  },
  {
    id: "fact-engineer",
    index: "05",
    claim: "Отвечает инженер. Не менеджер по продажам.",
    body: "Когда вы пишете на info@anhelspb.com — отвечает человек, который потом будет считать гидравлику. Не call-центр, не «передаём вашу заявку».",
    proof: {
      label: "+7 (812) 416-4500 · прямой",
      href: "tel:+78124164500",
    },
  },
  {
    id: "fact-tz",
    index: "06",
    claim: "Если ТЗ выходит за стандарт — пишем сразу.",
    body: "«Адаптируем под наши возможности» молча — нет. Если расход или температура выходят за стандарт серии — указываем это в первом ответе и предлагаем либо нестандартное исполнение, либо альтернативу.",
    proof: {
      label: "Опросный лист — 5 минут",
      href: "/products/pumps/firefighting#quiz",
    },
  },
];

export function HonestFacts() {
  return (
    <section
      id="proof"
      className="relative isolate bg-[#fafafa] text-[#0a0a0a]"
    >
      {/* Section opener — простой как первый абзац статьи */}
      <div className="mx-auto max-w-[1200px] px-6 pt-32 md:px-12 md:pt-44">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#0a0a0a]/55">
          Проверяемые факты · 2026
        </p>
        <h2
          className="mt-8 max-w-[900px] font-display"
          style={{
            fontSize: "clamp(32px, 4vw, 56px)",
            fontWeight: 500,
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
          }}
        >
          Шесть ответов на вопрос «почему честно».
          <span className="block opacity-50">
            На каждый — ссылка на доказательство.
          </span>
        </h2>
      </div>

      {/* Stack — каждый факт это row с hairline-разделителем */}
      <div className="mx-auto mt-16 max-w-[1200px] border-t border-[rgba(10,10,10,0.12)] px-6 md:mt-24 md:px-12">
        {FACTS.map((fact) => (
          <FactRow key={fact.id} fact={fact} />
        ))}
      </div>

      {/* Footer-line — последний штрих, тон-в-тон со страницей.
          Нарочно «слабый» CTA — без громкого «Получить КП». */}
      <div className="mx-auto max-w-[1200px] px-6 py-24 md:px-12 md:py-32">
        <p className="max-w-[640px] text-base leading-relaxed text-[#0a0a0a]/65 md:text-lg">
          Если что-то здесь оказалось неправдой — напишите на{" "}
          <a
            href="mailto:info@anhelspb.com?subject=Замечание по сайту"
            className="border-b border-[#0a0a0a]/30 hover:border-[#0a0a0a]"
          >
            info@anhelspb.com
          </a>
          . Поправим страницу в течение суток. Ответ — от инженера, не от пресс-службы.
        </p>
      </div>
    </section>
  );
}

function FactRow({ fact }: { fact: Fact }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <motion.div
      ref={ref}
      id={fact.id}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="grid scroll-mt-24 grid-cols-12 gap-6 border-b border-[rgba(10,10,10,0.12)] py-12 md:py-16"
    >
      {/* Index */}
      <div className="col-span-12 md:col-span-1">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#0a0a0a]/55">
          {fact.index}
        </span>
      </div>

      {/* Claim */}
      <div className="col-span-12 md:col-span-7">
        <h3
          className="font-display"
          style={{
            fontSize: "clamp(24px, 2.6vw, 40px)",
            fontWeight: 500,
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
          }}
        >
          {fact.claim}
        </h3>
        <p className="mt-4 max-w-[560px] text-base leading-relaxed text-[#0a0a0a]/70 md:text-[17px]">
          {fact.body}
        </p>
      </div>

      {/* Proof pointer — узкая правая колонка. Линк
          ведёт на конкретное доказательство. */}
      <div className="col-span-12 md:col-span-4 md:pl-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0a0a0a]/45">
          ПРОВЕРИТЬ
        </p>
        <Link
          href={fact.proof.href}
          data-cursor="hover"
          className="group mt-3 inline-flex items-baseline gap-2 border-b border-[#0a0a0a]/30 pb-1 text-[15px] leading-snug text-[#0a0a0a] transition-colors hover:border-[#0a0a0a]"
        >
          <span>{fact.proof.label}</span>
          <span
            aria-hidden="true"
            className="font-mono text-[12px] transition-transform duration-200 group-hover:translate-x-1"
          >
            ↗
          </span>
        </Link>
      </div>
    </motion.div>
  );
}
