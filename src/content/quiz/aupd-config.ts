import { aupdSteps } from './aupd-fields';
import { aupdQuizSchema, aupdDefaults, aupdStepFieldNames } from './aupd-schema';
import type { QuizConfig } from './quiz-config';

export const aupdQuizConfig: QuizConfig = {
  kind: 'aupd',
  title: 'Подбор автоматической установки поддержания давления',
  description: 'АУПД для систем отопления и вентиляции',
  steps: aupdSteps,
  schema: aupdQuizSchema,
  defaults: aupdDefaults,
  stepFieldNames: aupdStepFieldNames,
  storageKey: 'anhel-quiz-aupd-v1',
  catalogHref: '/products/pumps/pressure-boost',
  catalogLabel: 'К поддержанию давления',
};
