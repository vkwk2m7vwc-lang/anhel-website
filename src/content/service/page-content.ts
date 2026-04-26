/**
 * Контент страницы /service.
 *
 * Тексты собраны в один файл, чтобы page.tsx был чистой сборкой секций.
 * Тарифы и сроки сознательно не хранятся — они подвижны, держать в коде
 * рискованно, обсуждаются с клиентом устно.
 */

import type { LucideIcon } from 'lucide-react';
import { Wrench, Zap, ClipboardCheck, FileCode } from 'lucide-react';

export type ServiceCard = {
  title: string;
  description: string;
  icon: LucideIcon;
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
