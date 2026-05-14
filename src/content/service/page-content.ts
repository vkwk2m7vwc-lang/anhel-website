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

/**
 * Locale-aware download URL for the service-request PDF.
 *
 * RU keeps the original AcroForm at `/documents/service-request-anhel.pdf`.
 * EN/TR resolve to ReportLab re-renders produced by
 * `_scripts/build_service_request_translations.py`.
 *
 * Use this helper instead of hardcoding the path so all download
 * buttons stay in sync when a new locale is added.
 */
export function resolveServicePdfHref(locale: string): string {
  return locale === 'ru'
    ? '/documents/service-request-anhel.pdf'
    : `/documents/service-request-anhel-${locale}.pdf`;
}

/** @deprecated — RU-only path. Use `resolveServicePdfHref(locale)`. */
export const SERVICE_PDF_HREF = '/documents/service-request-anhel.pdf';
export const SERVICE_REQUEST_HREF = '/service/request';
