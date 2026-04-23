import type { InstallationType } from "./types";

/**
 * Section 4 «Типы установок» — firefighting.
 *
 * Four tabs ship across commits 4.1 and 4.2:
 *   - 4.1: «спринклерная», «дренчерная» (this file, indices 0-1)
 *   - 4.2: «ВПВ», «совмещённая» (appended below, indices 2-3)
 *
 * Each entry drives both the tab-rail (mono, title) and the active-tab
 * detail block (tagline, body, objects). The `kind` field is the
 * discriminator that `InstallationScene` reads to pick which interior
 * elements light up on the shared building silhouette — see
 * memory/project_section_4_installation_types.md for the rationale behind
 * the single-scene tab pattern.
 *
 * Copy rule (see memory/feedback_copy_style_step_rails.md): `title` stays
 * one word. Technical nuance (spray diameters, cabinet types) belongs in
 * `body`, not in the tab label.
 */
export const firefightingInstallationTypes: readonly InstallationType[] = [
  {
    kind: "sprinkler",
    mono: "01",
    title: "Спринклерная",
    tagline: "Точечное тушение там, где загорелось.",
    body:
      "Срабатывает только спринклер над очагом — колба лопается при 68–93 °C и подаёт воду на локальную зону. Остальные остаются закрытыми: минимум ущерба для помещений рядом.",
    objects: ["Офисы", "Склады", "Торговые центры", "Паркинги"],
  },
  {
    kind: "drencher",
    mono: "02",
    title: "Дренчерная",
    tagline: "Водяная завеса по всей площади этажа.",
    body:
      "Открытые оросители включаются одновременно по сигналу пожарной автоматики. Создаёт сплошную завесу — отсекает огонь, охлаждает конструкции, защищает проёмы.",
    objects: ["Производство", "Энергетика", "Ангары", "Театральные сцены"],
  },
];
