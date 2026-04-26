/**
 * Контент страницы /service.
 *
 * Тексты собраны в один файл, чтобы page.tsx был чистой сборкой секций.
 * Структура соответствует ТЗ (cowork_prompt_service.md): 5 секций +
 * контактный блок, всё одной длины — страница умещается в один scroll.
 */

import type { LucideIcon } from 'lucide-react';
import { Wrench, Zap, ClipboardCheck, FileCode } from 'lucide-react';

export type ServiceCard = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type TariffCard = {
  /** Главная цифра/срок: «12 000 ₽», «3-5 дн.» */
  value: string;
  /** Подпись под цифрой */
  label: string;
};

export type RequirementItem = {
  title: string;
  description: string;
};

export const SERVICE_CARDS: readonly ServiceCard[] = [
  {
    title: 'Сервис и диагностика',
    description:
      'Выезд инженера на объект, диагностика неисправностей, рекомендации по ремонту и замене комплектующих.',
    icon: Wrench,
  },
  {
    title: 'Пусконаладочные работы',
    description:
      'Запуск оборудования в эксплуатацию: проверка параметров, настройка автоматики, тестовые режимы.',
    icon: Zap,
  },
  {
    title: 'Шефмонтажные работы',
    description:
      'Технический надзор за монтажом оборудования силами заказчика. Контроль соответствия проекту.',
    icon: ClipboardCheck,
  },
  {
    title: 'Восстановление ПО и техдокументация',
    description:
      'Перепрошивка контроллеров, восстановление настроек, предоставление сервисной документации.',
    icon: FileCode,
  },
];

export const TARIFF_CARDS: readonly TariffCard[] = [
  { value: '12 000 ₽', label: 'Диагностика 1 ед. оборудования (СПб)' },
  { value: '12 000 ₽', label: 'Холостой выезд (если объект не подготовлен)' },
  { value: '3–5 дн.', label: 'С момента получения пропечатанной заявки' },
  { value: '7–10 / 5–7 дн.', label: 'Механика / ПО — ориентировочные сроки' },
];

export const TARIFF_FOOTNOTE =
  'Если случай признан негарантийным, Клиент оплачивает расходы (выезд, диагностика, ремонт) в течение пяти рабочих дней с момента выставления счёта. Регионы вне Санкт-Петербурга рассчитываются отдельно.';

export const REQUIREMENTS: readonly RequirementItem[] = [
  {
    title: 'Представитель на объекте',
    description:
      'С правом подписи в Сервисном протоколе и печати на Акте выполненных работ.',
  },
  {
    title: 'Готовность оборудования',
    description:
      'Доступ к оборудованию, возможность включения/отключения электропитания на ШУ, возможность подачи и перекрытия воды, возможность расхода воды на отметках.',
  },
  {
    title: 'Заполненная заявка',
    description:
      'Направленная на info@anhelspb.com — заполненная и пропечатанная.',
  },
];

export const SERVICE_PDF_HREF = '/documents/service-request-anhel.pdf';
export const SERVICE_REQUEST_HREF = '/service/request';

export const CTA_NOTE =
  'Заполните и направьте на info@anhelspb.com. Решение о выезде сервисного инженера принимается после получения заполненного и пропечатанного обращения.';
