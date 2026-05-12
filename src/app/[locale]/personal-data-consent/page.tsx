import type { Metadata } from "next";
import Link from "next/link";
import { CONTACTS } from "@/lib/contacts";
import { LEGAL_ENTITY } from "@/lib/legal";

/**
 * `/personal-data-consent` — Согласие субъекта на обработку
 * персональных данных.
 *
 * Закрывает C4 (152-ФЗ). Связанный документ с /privacy-policy:
 *   - Политика описывает порядок обработки в целом
 *   - Согласие фиксирует юридический акт «субъект согласен с этим
 *     порядком и состав данных, которые передаёт»
 *
 * Текст оформлен как формальное согласие от первого лица — субъект
 * считается принявшим его при отметке чекбокса на любой форме сайта
 * (квизы, /service/request, /contacts).
 */
export const metadata: Metadata = {
  title: "Согласие на обработку персональных данных",
  description:
    "Согласие субъекта персональных данных на обработку, передаваемое ANHEL® (ООО «Профит») при заполнении форм на сайте anhelspb.com.",
};

const EFFECTIVE_DATE = "12 мая 2026 года";
const LEGAL_PRIVACY_EMAIL = CONTACTS.email;

export default function PersonalDataConsentPage() {
  return (
    <main className="pt-24 md:pt-32">
      <article className="mx-auto max-w-3xl px-6 pb-24 text-[var(--color-secondary)] md:px-8 md:pb-32">
        <p className="mono-tag mb-6">Документ</p>
        <h1 className="font-display text-3xl leading-tight md:text-5xl">
          Согласие на обработку персональных данных
        </h1>
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-secondary)]/55">
          Действует с {EFFECTIVE_DATE}
        </p>

        <Block>
          <p>
            Отправляя любую форму на сайте{" "}
            <a href="https://anhelspb.com" className="underline decoration-[var(--color-hairline)] underline-offset-[3px] hover:decoration-[var(--color-secondary)]">
              anhelspb.com
            </a>
            {" "}и проставляя отметку «Я даю согласие на обработку моих персональных данных», я (далее — «Субъект»), в соответствии с требованиями Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных», свободно, своей волей и в своём интересе даю согласие {LEGAL_ENTITY.fullName} (ИНН {LEGAL_ENTITY.inn}, ОГРН {LEGAL_ENTITY.ogrn}, юридический адрес: {LEGAL_ENTITY.legalAddressFull}; далее — «Оператор») на обработку моих персональных данных, указанных ниже.
          </p>
        </Block>

        <Block title="Состав персональных данных">
          <p>Перечень обрабатываемых персональных данных Субъекта:</p>
          <ul>
            <li>фамилия, имя, отчество;</li>
            <li>контактный телефон;</li>
            <li>адрес электронной почты;</li>
            <li>наименование организации и должность;</li>
            <li>ИНН организации;</li>
            <li>содержание сообщения и технические параметры объекта, переданные Субъектом в свободной форме.</li>
          </ul>
        </Block>

        <Block title="Цели обработки">
          <p>Согласие даётся для следующих целей:</p>
          <ul>
            <li>обработка обращения и обратная связь по нему;</li>
            <li>подготовка коммерческого предложения и технических расчётов;</li>
            <li>заключение, исполнение и сопровождение договора поставки оборудования, монтажа или сервисного обслуживания;</li>
            <li>информирование о статусе заказа и сервисных уведомлений по согласованным каналам связи;</li>
            <li>исполнение обязательств, предусмотренных законодательством Российской Федерации.</li>
          </ul>
        </Block>

        <Block title="Перечень действий с персональными данными">
          <p>Согласие распространяется на следующие действия Оператора:</p>
          <ul>
            <li>сбор, запись, систематизация и накопление;</li>
            <li>хранение, уточнение (обновление, изменение), извлечение;</li>
            <li>использование, передача (предоставление, доступ);</li>
            <li>обезличивание, блокирование, удаление и уничтожение.</li>
          </ul>
          <p>
            Обработка может осуществляться как с использованием средств автоматизации, так и без них (включая обработку в бумажных документах при оформлении договоров и актов выполненных работ).
          </p>
        </Block>

        <Block title="Срок действия согласия">
          <p>
            Настоящее согласие действует 5 (пять) лет с момента его предоставления либо до момента его отзыва Субъектом.
          </p>
          <p>
            Согласие может быть отозвано Субъектом в любой момент путём направления письменного обращения на адрес электронной почты Оператора:{" "}
            <a href={`mailto:${LEGAL_PRIVACY_EMAIL}`} className="underline decoration-[var(--color-hairline)] underline-offset-[3px] hover:decoration-[var(--color-secondary)]">
              {LEGAL_PRIVACY_EMAIL}
            </a>
            . В обращении необходимо указать фамилию, имя, отчество и контактные данные, по которым Оператор сможет идентифицировать Субъекта.
          </p>
          <p>
            Оператор прекращает обработку персональных данных Субъекта в течение 30 дней с момента получения отзыва, за исключением данных, обработка которых обязательна в силу закона.
          </p>
        </Block>

        <Block title="Передача персональных данных">
          <p>
            Субъект соглашается с возможностью передачи персональных данных третьим лицам в объёме и по основаниям, указанным в{" "}
            <Link
              href="/privacy-policy"
              className="underline decoration-[var(--color-hairline)] underline-offset-[3px] hover:decoration-[var(--color-secondary)]"
            >
              Политике обработки персональных данных
            </Link>
            . Передача персональных данных в иностранные государства не осуществляется.
          </p>
        </Block>

        <Block title="Подтверждение Субъекта">
          <p>
            Субъект подтверждает, что предоставляет персональные данные добровольно, ознакомлен с правами, предусмотренными статьями 14–16 Федерального закона № 152-ФЗ, и согласен с положениями{" "}
            <Link
              href="/privacy-policy"
              className="underline decoration-[var(--color-hairline)] underline-offset-[3px] hover:decoration-[var(--color-secondary)]"
            >
              Политики обработки персональных данных
            </Link>
            {" "}Оператора.
          </p>
        </Block>

        <div className="mt-20 flex flex-col gap-2 border-t border-[var(--color-hairline)] pt-8 text-sm text-[var(--color-secondary)]/65 md:flex-row md:items-center md:justify-between">
          <p>{LEGAL_ENTITY.shortName} · ИНН {LEGAL_ENTITY.inn}</p>
          <Link
            href="/privacy-policy"
            className="underline decoration-[var(--color-hairline)] underline-offset-[3px] hover:decoration-[var(--color-secondary)]"
          >
            ← Политика обработки ПД
          </Link>
        </div>
      </article>
    </main>
  );
}

function Block({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12 border-t border-[var(--color-hairline)] pt-8 md:mt-16 md:pt-10">
      {title ? (
        <h2 className="font-display text-xl md:text-2xl">{title}</h2>
      ) : null}
      <div
        className={
          "space-y-4 text-[15px] leading-relaxed text-[var(--color-secondary)]/85 [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1 [&_ul]:space-y-2 " +
          (title ? "mt-5" : "")
        }
      >
        {children}
      </div>
    </section>
  );
}
