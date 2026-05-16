import type { ProjectItem, ProjectCategory } from "./types";

/**
 * Единый реестр объектов для портфолио ANHEL.
 *
 * Только проекты с насосными станциями или водоподготовкой.
 * Cover-фото скачаны с profitspb.com/projects (Tilda CDN — публичные карточки
 * головной компании, dual-source с реестром «Список проектов.xlsx»).
 *
 * i18n: title/equipment/coverAlt живут в `messages/<locale>/projects.{items,equipment_lines}.<key>`.
 * Здесь — slug (ключ), category, cover-путь, equipment-ключи.
 */
export const PROJECTS: ProjectItem[] = [
  {
    slug: "sogaz-medical-complex",
    category: "pumps",
    equipment: ["pumps_pressure_fire"],
    cover: "/assets/projects/sogaz-medical-complex/cover.jpg",
  },
  {
    slug: "zhk-imperial-club",
    category: "pumps",
    equipment: ["pumps_pressure_fire_anhel"],
    cover: "/assets/projects/zhk-imperial-club/cover.jpg",
  },
  {
    slug: "zhk-grand-view",
    category: "mixed",
    equipment: ["pumps_pressure_fire_anhel", "water_treatment_anhel"],
    cover: "/assets/projects/zhk-grand-view/cover.jpg",
  },
  {
    slug: "zhk-svetlana-park",
    category: "mixed",
    equipment: ["pumps_pressure_fire_anhel", "water_treatment_anhel"],
    cover: "/assets/projects/zhk-svetlana-park/cover.jpg",
  },
  {
    slug: "zhk-astra-continental",
    category: "mixed",
    equipment: ["pumps_pressure_fire_anhel", "water_treatment_anhel"],
    cover: "/assets/projects/zhk-astra-continental/cover.jpg",
  },
  {
    slug: "zhk-astra-marine",
    category: "mixed",
    equipment: ["pumps_pressure_fire_anhel", "water_treatment_anhel"],
    cover: "/assets/projects/zhk-astra-marine/cover.jpg",
  },
  {
    slug: "zhk-titul",
    category: "mixed",
    equipment: ["pumps_pressure_fire_anhel", "water_treatment_anhel"],
    cover: "/assets/projects/zhk-titul/cover.jpg",
  },
  {
    slug: "zhk-amber-club",
    category: "mixed",
    equipment: ["pumps_pressure_fire_anhel", "water_treatment_anhel"],
    cover: "/assets/projects/zhk-amber-club/cover.jpg",
  },
  {
    slug: "zhk-senat",
    category: "mixed",
    equipment: ["pumps_pressure_fire_anhel", "water_treatment_anhel"],
    cover: "/assets/projects/zhk-senat/cover.jpg",
  },
  {
    slug: "zhk-panorama-park",
    category: "mixed",
    equipment: ["pumps_pressure_fire_anhel", "water_treatment_anhel"],
    cover: "/assets/projects/zhk-panorama-park/cover.jpg",
  },
  {
    slug: "zhk-vitebsky-park",
    category: "pumps",
    equipment: ["pumps_pressure_anhel"],
    cover: "/assets/projects/zhk-vitebsky-park/cover.jpg",
  },
  {
    slug: "zhk-upoint",
    category: "pumps",
    equipment: ["pumps_pressure_anhel"],
    cover: "/assets/projects/zhk-upoint/cover.jpg",
  },
  {
    slug: "zhk-graf-orlov",
    category: "pumps",
    equipment: ["pumps_pressure_anhel"],
    cover: "/assets/projects/zhk-graf-orlov/cover.jpg",
  },
  // --- Расширение портфолио, май 2026 — феа/portfolio-residential-projects ---
  // Жилые комплексы 2019+: водоподготовка ANHEL появилась с 2021 года,
  // поэтому для более ранних объектов категория ограничена pumps.
  {
    slug: "zhk-petrovsky-kvartal-na-vode",
    category: "pumps",
    equipment: ["pumps_pressure_fire_anhel"],
    cover: "/assets/projects/zhk-petrovsky-kvartal-na-vode/cover.jpg",
  },
  {
    slug: "zhk-art-line",
    category: "mixed",
    equipment: ["pumps_pressure_fire_anhel", "water_treatment_anhel"],
    cover: "/assets/projects/zhk-art-line/cover.jpg",
  },
  {
    slug: "zhk-avtograf-v-centre",
    category: "mixed",
    equipment: ["pumps_pressure_fire_anhel", "water_treatment_anhel"],
    cover: "/assets/projects/zhk-avtograf-v-centre/cover.jpg",
  },
  {
    slug: "zhk-prityazhenie",
    category: "mixed",
    equipment: ["pumps_pressure_fire_anhel", "water_treatment_anhel"],
    cover: "/assets/projects/zhk-prityazhenie/cover.jpg",
  },
  {
    slug: "zhk-pulse-premier",
    category: "mixed",
    equipment: ["pumps_pressure_fire_anhel", "water_treatment_anhel"],
    cover: "/assets/projects/zhk-pulse-premier/cover.jpg",
  },
  {
    slug: "zhk-solnechny-gorod-rezidentsii",
    category: "mixed",
    equipment: ["pumps_pressure_fire_anhel", "water_treatment_anhel"],
    cover: "/assets/projects/zhk-solnechny-gorod-rezidentsii/cover.jpg",
  },
  {
    slug: "zhk-strizhi-v-nevskom",
    category: "mixed",
    equipment: ["pumps_pressure_fire_anhel", "water_treatment_anhel"],
    cover: "/assets/projects/zhk-strizhi-v-nevskom/cover.jpg",
  },
  {
    slug: "zhk-bionika-zapovednaya",
    category: "mixed",
    equipment: ["pumps_pressure_fire_anhel", "water_treatment_anhel"],
    cover: "/assets/projects/zhk-bionika-zapovednaya/cover.jpg",
  },
  {
    slug: "zhk-gorod-zvezd",
    category: "mixed",
    equipment: ["pumps_pressure_fire_anhel", "water_treatment_anhel"],
    cover: "/assets/projects/zhk-gorod-zvezd/cover.jpg",
  },
  {
    slug: "zhk-univer-city",
    category: "mixed",
    equipment: ["pumps_pressure_fire_anhel", "water_treatment_anhel"],
    cover: "/assets/projects/zhk-univer-city/cover.jpg",
  },
  {
    slug: "zhk-dvortsovy-fasad",
    category: "mixed",
    equipment: ["pumps_pressure_fire_anhel", "water_treatment_anhel"],
    cover: "/assets/projects/zhk-dvortsovy-fasad/cover.jpg",
  },
  {
    slug: "zhk-praim-primorsky",
    category: "mixed",
    equipment: ["pumps_pressure_fire_anhel", "water_treatment_anhel"],
    cover: "/assets/projects/zhk-praim-primorsky/cover.jpg",
  },
  {
    slug: "zhk-paradny-ansambl",
    category: "mixed",
    equipment: ["pumps_pressure_fire_anhel", "water_treatment_anhel"],
    cover: "/assets/projects/zhk-paradny-ansambl/cover.jpg",
  },
];

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getProjectsByCategory(
  cat: ProjectCategory | "all",
): ProjectItem[] {
  if (cat === "all") return PROJECTS;
  if (cat === "mixed") return PROJECTS.filter((p) => p.category === "mixed");
  // For "pumps", include both pumps and mixed; same for "water-treatment".
  return PROJECTS.filter(
    (p) => p.category === cat || p.category === "mixed",
  );
}
