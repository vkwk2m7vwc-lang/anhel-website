import { vpuSteps } from './vpu-fields';
import { vpuQuizSchema, vpuDefaults, vpuStepFieldNames } from './vpu-schema';
import type { QuizConfig } from './quiz-config';

export const vpuQuizConfig: QuizConfig = {
  kind: 'vpu',
  title: 'Подбор установки водоподготовки',
  steps: vpuSteps,
  schema: vpuQuizSchema,
  defaults: vpuDefaults,
  stepFieldNames: vpuStepFieldNames,
  storageKey: 'anhel-quiz-vpu-v1',
  catalogHref: '/products/water-treatment',
  catalogLabel: 'В каталог водоподготовки',
};
