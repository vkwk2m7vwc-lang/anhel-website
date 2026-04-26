/**
 * QuizConfig для опросника подбора насосных установок.
 * Объединяет content (pumps-fields) и schema (pumps-schema) в один объект,
 * который передаётся в <QuizShell />.
 */
import { pumpsSteps } from './pumps-fields';
import { pumpsDefaults, stepFieldNames as pumpsStepFieldNames } from './pumps-schema';
import type { QuizConfig } from './quiz-config';

export const pumpsQuizConfig: QuizConfig = {
  kind: 'pumps',
  title: 'Подбор насосной установки',
  steps: pumpsSteps,
  defaults: pumpsDefaults,
  stepFieldNames: pumpsStepFieldNames,
  storageKey: 'anhel-quiz-pumps-v1',
  catalogHref: '/products/pumps',
  catalogLabel: 'В каталог насосных',
  customSections: {
    head: {
      component: 'intake-chooser',
      excludeFieldNames: ['intake_pond', 'intake_under', 'intake_semi', 'intake_above'],
    },
  },
};
