import { itpSteps } from './itp-fields';
import { itpDefaults, itpStepFieldNames } from './itp-schema';
import type { QuizConfig } from './quiz-config';

export const itpQuizConfig: QuizConfig = {
  kind: 'itp',
  title: 'Подбор блочного индивидуального теплового пункта',
  description: 'БИТП для отопления, вентиляции и ГВС',
  steps: itpSteps,
  defaults: itpDefaults,
  stepFieldNames: itpStepFieldNames,
  storageKey: 'anhel-quiz-itp-v1',
  catalogHref: '/products/heating-unit',
  catalogLabel: 'В каталог тепловых пунктов',
};
