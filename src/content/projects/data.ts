import type { ProjectItem } from "./types";

/**
 * Единый реестр объектов для портфолио ANHEL.
 *
 * Только проекты с насосными станциями или водоподготовкой
 * (исключаются БТП, теплообменное оборудование, голая запорная арматура).
 *
 * Cover-фото скачаны с profitspb.com/projects (Tilda CDN — публичные карточки
 * головной компании, dual-source с реестром «Список проектов.xlsx»).
 */
export const PROJECTS: ProjectItem[] = [
  {
    slug: "sogaz-medical-complex",
    title: "Многофункциональный медицинский комплекс",
    category: "pumps",
    equipment: ["Насосные установки повышения давления и пожаротушения"],
    cover: "/assets/projects/sogaz-medical-complex/cover.jpg",
    coverAlt: "Многофункциональный медицинский комплекс — фасад",
  },
  {
    slug: "zhk-imperial-club",
    title: "ЖК Imperial Club",
    category: "pumps",
    equipment: [
      "Насосные установки повышения давления и пожаротушения ANHEL",
    ],
    cover: "/assets/projects/zhk-imperial-club/cover.jpg",
    coverAlt: "ЖК Imperial Club — комплекс",
  },
  {
    slug: "zhk-grand-view",
    title: "ЖК «Гранд Вью»",
    category: "mixed",
    equipment: [
      "Насосные установки повышения давления и пожаротушения ANHEL",
      "Комплексная установка водоподготовки ANHEL",
    ],
    cover: "/assets/projects/zhk-grand-view/cover.jpg",
    coverAlt: "ЖК «Гранд Вью» — фасад",
  },
  {
    slug: "zhk-svetlana-park",
    title: "ЖК «Светлана парк»",
    category: "mixed",
    equipment: [
      "Насосные установки повышения давления и пожаротушения ANHEL",
      "Комплексная установка водоподготовки ANHEL",
    ],
    cover: "/assets/projects/zhk-svetlana-park/cover.jpg",
    coverAlt: "ЖК «Светлана парк» — застройка",
  },
  {
    slug: "zhk-astra-continental",
    title: "ЖК «Астра Континенталь»",
    category: "mixed",
    equipment: [
      "Насосные установки повышения давления и пожаротушения ANHEL",
      "Комплексная установка водоподготовки ANHEL",
    ],
    cover: "/assets/projects/zhk-astra-continental/cover.jpg",
    coverAlt: "ЖК «Астра Континенталь» — фасад",
  },
  {
    slug: "zhk-astra-marine",
    title: "ЖК «Астра Марин»",
    category: "mixed",
    equipment: [
      "Насосные установки повышения давления и пожаротушения ANHEL",
      "Комплексная установка водоподготовки ANHEL",
    ],
    cover: "/assets/projects/zhk-astra-marine/cover.jpg",
    coverAlt: "ЖК «Астра Марин» — фасад",
  },
  {
    slug: "zhk-titul",
    title: "ЖК «Титул»",
    category: "mixed",
    equipment: [
      "Насосные установки повышения давления и пожаротушения ANHEL",
      "Комплексная установка водоподготовки ANHEL",
    ],
    cover: "/assets/projects/zhk-titul/cover.jpg",
    coverAlt: "ЖК «Титул» — застройка",
  },
  {
    slug: "zhk-amber-club",
    title: "ЖК «Амбер Клаб»",
    category: "mixed",
    equipment: [
      "Насосные установки повышения давления и пожаротушения ANHEL",
      "Комплексная установка водоподготовки ANHEL",
    ],
    cover: "/assets/projects/zhk-amber-club/cover.jpg",
    coverAlt: "ЖК «Амбер Клаб» — фасад",
  },
  {
    slug: "zhk-senat",
    title: "ЖК «Сенат»",
    category: "mixed",
    equipment: [
      "Насосные установки повышения давления и пожаротушения ANHEL",
      "Комплексная установка водоподготовки ANHEL",
    ],
    cover: "/assets/projects/zhk-senat/cover.jpg",
    coverAlt: "ЖК «Сенат» — фасад",
  },
  {
    slug: "zhk-panorama-park",
    title: "ЖК «Панорама Парк»",
    category: "mixed",
    equipment: [
      "Насосные установки повышения давления и пожаротушения ANHEL",
      "Комплексная установка водоподготовки ANHEL",
    ],
    cover: "/assets/projects/zhk-panorama-park/cover.jpg",
    coverAlt: "ЖК «Панорама Парк» — застройка",
  },
  {
    slug: "zhk-vitebsky-park",
    title: "ЖК «Витебский парк»",
    category: "pumps",
    equipment: ["Насосные установки повышения давления ANHEL"],
    cover: "/assets/projects/zhk-vitebsky-park/cover.jpg",
    coverAlt: "ЖК «Витебский парк» — застройка",
  },
  {
    slug: "zhk-upoint",
    title: "ЖК Upoint",
    category: "pumps",
    equipment: ["Насосные установки повышения давления ANHEL"],
    cover: "/assets/projects/zhk-upoint/cover.jpg",
    coverAlt: "ЖК Upoint — фасад",
  },
  {
    slug: "zhk-graf-orlov",
    title: "ЖК «Граф Орлов»",
    category: "pumps",
    equipment: ["Насосные установки повышения давления ANHEL"],
    cover: "/assets/projects/zhk-graf-orlov/cover.jpg",
    coverAlt: "ЖК «Граф Орлов» — фасад",
  },
];

export const PROJECT_CATEGORY_LABELS: Record<ProjectItem["category"], string> = {
  pumps: "Насосные станции",
  "water-treatment": "Водоподготовка",
  mixed: "Насосные + водоподготовка",
};

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getProjectsByCategory(
  cat: ProjectItem["category"] | "all",
): ProjectItem[] {
  if (cat === "all") return PROJECTS;
  if (cat === "mixed")
    return PROJECTS.filter((p) => p.category === "mixed");
  // For "pumps" category, include both pumps and mixed (mixed projects also have pumps)
  // For "water-treatment", include both water-treatment and mixed
  return PROJECTS.filter(
    (p) => p.category === cat || p.category === "mixed",
  );
}
