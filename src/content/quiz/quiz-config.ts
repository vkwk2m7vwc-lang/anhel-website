/**
 * Универсальный конфиг опросника. Все 4 quiz-типа (pumps / vpu / itp / aupd)
 * передают такой объект в `<QuizShell />`. Это позволяет:
 *   — переиспользовать всю UX-обвязку (steps, progress, localStorage, slide,
 *     ReviewStep, success/error экраны)
 *   — иметь свои поля, схему, акценты у каждого типа
 *   — добавлять новые опросники в одно место без правок UI
 */
import type { ZodTypeAny } from 'zod';
import type { QuizStep } from './pumps-fields';

export type QuizCustomSection = {
  /** Какой кастомный рендер вставить ВМЕСТО списка чекбоксов внутри секции */
  component: 'intake-chooser';
  /** Имена полей, которые рендерятся кастомно (исключаются из обычной сетки) */
  excludeFieldNames: readonly string[];
};

export type QuizConfig = {
  /** Машинный идентификатор опросника — отправляется на бэкенд как `kind`. */
  kind: 'pumps' | 'vpu' | 'itp' | 'aupd';
  /** Заголовок страницы (под mono-tag «Опросный лист») */
  title: string;
  /** Описание в hero (1 предложение) */
  description?: string;
  /** Шаги формы */
  steps: QuizStep[];
  /** Серверная zod-схема (та же используется и на клиенте) */
  schema: ZodTypeAny;
  /** Дефолтные значения формы */
  defaults: Record<string, unknown>;
  /** Поля, валидируемые на конкретном шаге (для блокировки «Далее») */
  stepFieldNames: Record<number, string[]>;
  /** Уникальный ключ localStorage — версия включена для будущих миграций */
  storageKey: string;
  /** Куда возвращаться после успешной отправки (кнопка «В каталог») */
  catalogHref: string;
  /** Подпись под кнопкой возврата */
  catalogLabel: string;
  /**
   * Спец-секции, которые рендерятся не списком полей, а кастомным компонентом.
   * Ключ — `section.id`. Сейчас поддерживается только 'intake-chooser' (pumps).
   */
  customSections?: Record<string, QuizCustomSection>;
};
