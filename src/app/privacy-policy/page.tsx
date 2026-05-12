import type { Metadata } from "next";
import Link from "next/link";
import { CONTACTS } from "@/lib/contacts";
import { LEGAL_ENTITY } from "@/lib/legal";

/**
 * `/privacy-policy` — Политика обработки персональных данных.
 *
 * Закрывает C4 из pre-launch audit (нарушение 152-ФЗ — нет страницы
 * политики, ссылок на неё в формах и в footer). Шаблон — стандартный
 * для B2B-сайта с формами заявок. Оператор и его реквизиты тянутся из
 * `lib/legal.ts` — поменяются регистрационные данные, текст сам подтянет.
 *
 * Дата вступления в силу — статическая. При материальных правках
 * обновлять `EFFECTIVE_DATE` + добавлять в /personal-data-consent
 * запись о версии. Косметические правки тексту даты не двигают.
 *
 * Email для запросов субъектов ПД сейчас — тот же info@. Когда заведём
 * отдельный privacy@anhelspb.com, поменять только `LEGAL_PRIVACY_EMAIL`
 * ниже — пол-страницы текста подтянет.
 */
export const metadata: Metadata = {
  title: "Политика обработки персональных данных",
  description:
    "Политика обработки персональных данных ANHEL® (ООО «Профит»). Цели обработки, состав данных, права субъекта ПД, контакты для запросов в соответствии с 152-ФЗ.",
};

const EFFECTIVE_DATE = "12 мая 2026 года";
const LEGAL_PRIVACY_EMAIL = CONTACTS.email;

export default function PrivacyPolicyPage() {
  return (
    <main className="pt-24 md:pt-32">
      <article className="mx-auto max-w-3xl px-6 pb-24 text-[var(--color-secondary)] md:px-8 md:pb-32">
        <p className="mono-tag mb-6">Документ</p>
        <h1 className="font-display text-3xl leading-tight md:text-5xl">
          Политика обработки персональных данных
        </h1>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/55">
          Действует с {EFFECTIVE_DATE}
        </p>

        <Block n="1" title="Общие положения">
          <p>
            Настоящая Политика обработки персональных данных (далее — «Политика») разработана в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных» и определяет порядок обработки персональных данных и меры по обеспечению их безопасности в {LEGAL_ENTITY.fullName} (далее — «Оператор»).
          </p>
          <p>
            Политика распространяется на все процессы сбора, хранения, использования, передачи, обезличивания и уничтожения персональных данных, осуществляемые Оператором в связи с эксплуатацией сайта{" "}
            <a href="https://anhelspb.com" className="underline decoration-[var(--color-hairline)] underline-offset-[3px] hover:decoration-[var(--color-secondary)]">
              anhelspb.com
            </a>
            .
          </p>
        </Block>

        <Block n="2" title="Оператор">
          <dl className="grid gap-x-6 gap-y-3 md:grid-cols-[max-content_1fr]">
            <Term>Полное наименование</Term>
            <Definition>{LEGAL_ENTITY.fullName}</Definition>
            <Term>Сокращённое наименование</Term>
            <Definition>{LEGAL_ENTITY.shortName}</Definition>
            <Term>ИНН</Term>
            <Definition mono>{LEGAL_ENTITY.inn}</Definition>
            <Term>ОГРН</Term>
            <Definition mono>{LEGAL_ENTITY.ogrn}</Definition>
            <Term>Юридический адрес</Term>
            <Definition>{LEGAL_ENTITY.legalAddressFull}</Definition>
            <Term>Email для запросов</Term>
            <Definition mono>
              <a href={`mailto:${LEGAL_PRIVACY_EMAIL}`} className="underline decoration-[var(--color-hairline)] underline-offset-[3px] hover:decoration-[var(--color-secondary)]">
                {LEGAL_PRIVACY_EMAIL}
              </a>
            </Definition>
          </dl>
        </Block>

        <Block n="3" title="Цели обработки персональных данных">
          <p>Оператор обрабатывает персональные данные пользователей сайта в следующих целях:</p>
          <ul>
            <li>обратная связь по обращениям, заявкам и запросам коммерческих предложений;</li>
            <li>подготовка технических предложений и расчётов по опросным листам, заполненным на сайте;</li>
            <li>заключение, исполнение и сопровождение договоров поставки, монтажа и сервисного обслуживания;</li>
            <li>информирование о статусе заявок, изменении статуса заказа и сервисных уведомлений;</li>
            <li>исполнение обязательств, предусмотренных законодательством Российской Федерации (бухгалтерский и налоговый учёт, ответы на запросы государственных органов).</li>
          </ul>
        </Block>

        <Block n="4" title="Состав обрабатываемых персональных данных">
          <p>Оператор обрабатывает следующие категории персональных данных, предоставленных субъектом самостоятельно через формы на сайте:</p>
          <ul>
            <li>фамилия, имя, отчество;</li>
            <li>контактный телефон;</li>
            <li>адрес электронной почты;</li>
            <li>наименование организации и должность (при заполнении заявок от юридического лица);</li>
            <li>ИНН организации (при подготовке коммерческого предложения);</li>
            <li>содержание сообщения, технические параметры объекта, описание задачи — данные, добровольно переданные субъектом в свободной форме.</li>
          </ul>
          <p>
            Специальные категории персональных данных (раса, политические убеждения, состояние здоровья, интимная жизнь) и биометрические персональные данные Оператор не обрабатывает.
          </p>
        </Block>

        <Block n="5" title="Правовое основание обработки">
          <p>
            Оператор обрабатывает персональные данные на основании согласия субъекта, которое выражается путём отметки чекбокса «Я даю согласие на обработку моих персональных данных» при отправке любой формы на сайте, а также на основаниях, предусмотренных пунктами 2 и 5 части 1 статьи 6 Федерального закона № 152-ФЗ.
          </p>
        </Block>

        <Block n="6" title="Способы и сроки обработки">
          <p>
            Обработка персональных данных осуществляется как с использованием средств автоматизации, так и без них. Оператор хранит персональные данные на серверах, расположенных на территории Российской Федерации.
          </p>
          <p>
            Срок обработки персональных данных составляет 5 (пять) лет с момента получения, если иное не установлено законодательством Российской Федерации или договором с субъектом. По истечении срока обработки персональные данные подлежат уничтожению либо обезличиванию.
          </p>
          <p>
            Субъект персональных данных вправе в любой момент отозвать согласие, направив соответствующее обращение на адрес{" "}
            <a href={`mailto:${LEGAL_PRIVACY_EMAIL}`} className="underline decoration-[var(--color-hairline)] underline-offset-[3px] hover:decoration-[var(--color-secondary)]">
              {LEGAL_PRIVACY_EMAIL}
            </a>
            . Отзыв согласия не препятствует обработке, осуществляемой на основаниях, не требующих согласия.
          </p>
        </Block>

        <Block n="7" title="Передача персональных данных">
          <p>
            Оператор не передаёт персональные данные третьим лицам, за исключением случаев, когда такая передача необходима для:
          </p>
          <ul>
            <li>исполнения договорных обязательств перед субъектом (доставка оборудования, монтажные и сервисные работы);</li>
            <li>исполнения требований законодательства Российской Федерации, в том числе по запросам государственных органов в порядке, предусмотренном законом;</li>
            <li>обработки писем и сообщений через сервисы электронной почты и сервисы рассылок, обеспечивающих конфиденциальность данных в соответствии с условиями обслуживания.</li>
          </ul>
          <p>
            Трансграничная передача персональных данных на территории иностранных государств Оператором не осуществляется.
          </p>
        </Block>

        <Block n="8" title="Меры защиты">
          <p>Оператор принимает необходимые правовые, организационные и технические меры для защиты персональных данных от неправомерного доступа, уничтожения, изменения, блокирования, копирования, распространения, а также от иных неправомерных действий, в том числе:</p>
          <ul>
            <li>назначение лиц, ответственных за организацию обработки персональных данных;</li>
            <li>ограничение доступа сотрудников Оператора к персональным данным по принципу служебной необходимости;</li>
            <li>использование защищённых каналов передачи данных (HTTPS);</li>
            <li>резервное копирование и контроль целостности баз данных;</li>
            <li>регулярная оценка эффективности принимаемых мер защиты.</li>
          </ul>
        </Block>

        <Block n="9" title="Права субъекта персональных данных">
          <p>Субъект персональных данных имеет право:</p>
          <ul>
            <li>получать информацию об обработке своих персональных данных Оператором;</li>
            <li>требовать уточнения, блокирования или уничтожения своих персональных данных, если они являются неполными, устаревшими, неточными или незаконно полученными;</li>
            <li>отозвать ранее данное согласие на обработку персональных данных;</li>
            <li>обжаловать действия или бездействие Оператора в уполномоченный орган по защите прав субъектов персональных данных (Роскомнадзор) или в суд.</li>
          </ul>
          <p>
            Запросы по реализации прав направляются в письменной форме по адресу:{" "}
            <a href={`mailto:${LEGAL_PRIVACY_EMAIL}`} className="underline decoration-[var(--color-hairline)] underline-offset-[3px] hover:decoration-[var(--color-secondary)]">
              {LEGAL_PRIVACY_EMAIL}
            </a>
            . Срок ответа — 30 дней с момента получения запроса.
          </p>
        </Block>

        <Block n="10" title="Изменения Политики">
          <p>
            Оператор вправе вносить изменения в настоящую Политику. Актуальная редакция Политики размещается по адресу{" "}
            <a href="https://anhelspb.com/privacy-policy" className="underline decoration-[var(--color-hairline)] underline-offset-[3px] hover:decoration-[var(--color-secondary)]">
              anhelspb.com/privacy-policy
            </a>
            . Дата актуальной редакции указана в начале документа.
          </p>
        </Block>

        <div className="mt-20 flex flex-col gap-2 border-t border-[var(--color-hairline)] pt-8 text-sm text-[var(--color-secondary)]/65 md:flex-row md:items-center md:justify-between">
          <p>{LEGAL_ENTITY.shortName} · ИНН {LEGAL_ENTITY.inn}</p>
          <Link
            href="/personal-data-consent"
            className="underline decoration-[var(--color-hairline)] underline-offset-[3px] hover:decoration-[var(--color-secondary)]"
          >
            Согласие на обработку ПД →
          </Link>
        </div>
      </article>
    </main>
  );
}

function Block({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12 border-t border-[var(--color-hairline)] pt-8 md:mt-16 md:pt-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/55">
        {n}
      </p>
      <h2 className="mt-2 font-display text-xl md:text-2xl">{title}</h2>
      <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-[var(--color-secondary)]/85 [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1 [&_ul]:space-y-2">
        {children}
      </div>
    </section>
  );
}

function Term({ children }: { children: React.ReactNode }) {
  return (
    <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/55 md:py-1">
      {children}
    </dt>
  );
}

function Definition({
  children,
  mono,
}: {
  children: React.ReactNode;
  mono?: boolean;
}) {
  return (
    <dd
      className={
        "text-[var(--color-secondary)]/90 " +
        (mono ? "font-mono text-sm tracking-[0.02em]" : "")
      }
    >
      {children}
    </dd>
  );
}
