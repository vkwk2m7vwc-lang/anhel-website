/**
 * Структурные данные страницы /service.
 *
 * Хранит только icon-маппинги и ключи. Тексты (title, description) —
 * в `messages/<locale>/service.json`, резолвятся при рендере через
 * useTranslations('service.*'). Тарифы и сроки сознательно не хранятся —
 * они подвижны, держать в коде рискованно, обсуждаются с клиентом устно.
 */

import type { LucideIcon } from 'lucide-react';
import { Wrench, Zap, ClipboardCheck, FileCode } from 'lucide-react';

export type ServiceCardKey = 'diagnostics' | 'commissioning' | 'supervision' | 'software';
export type RequirementKey = 'representative' | 'readiness' | 'request';

export const SERVICE_CARDS: readonly { key: ServiceCardKey; icon: LucideIcon }[] = [
  { key: 'diagnostics', icon: Wrench },
  { key: 'commissioning', icon: Zap },
  { key: 'supervision', icon: ClipboardCheck },
  { key: 'software', icon: FileCode },
];

export const REQUIREMENTS: readonly { key: RequirementKey }[] = [
  { key: 'representative' },
  { key: 'readiness' },
  { key: 'request' },
];

export const SERVICE_PDF_HREF = '/documents/service-request-anhel.pdf';
export const SERVICE_REQUEST_HREF = '/service/request';
