import type { ProductContent } from "../../types";

export const content: ProductContent = {
  slug: "special",
  accent: "treatment",

  metaTitle: "ANHEL special-configuration pumping stations",
  metaDescription:
    "ANHEL pumping stations in special configurations: container-mounted and GRP-vessel assemblies. Up to 6 pumps in parallel, up to 250 kW per pump, working pressure up to 40 bar, ambient temperature −50 °C to +50 °C. Universal solution for water supply, fire protection and building services.",

  hero: {
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Catalogue", href: "/products" },
      { label: "Pumping stations", href: "/products/pumps" },
      { label: "Special configuration" },
    ],
    sectionTag: "01 · PUMPING STATIONS · SPECIAL CONFIGURATION",
    title: "ANHEL pumping stations — special configurations",
    subtitle:
      "High-tech equipment for sites that need rapid adaptation to operating conditions. Two formats — insulated container or GRP vessel. Universal solution for water supply, fire protection, heating and cooling.",
    image: {
      src: "/assets/products/special.webp",
      alt: "ANHEL — special-configuration pumping station: modular manifolds and pump-group assembly",
    },
    primaryCta: { label: "Fill in online", href: "/quiz/pumps?from=special", variant: "primary" },
    secondaryCta: { label: "Specification sheet", href: "/docs/special/oprosnyi-list.pdf", variant: "ghost" },
  },

  techSpecs: [
    { label: "Pumps in parallel", value: "2 – 6", unit: "standard" },
    { label: "Power per pump", value: "up to 250", unit: "kW" },
    { label: "Max. working pressure", value: "up to 40", unit: "bar" },
    { label: "Mains voltage", value: "3 × 380 / 3 × 660", unit: "V" },
    { label: "Ambient temperature", value: "−50 to +50", unit: "°C (container)" },
    { label: "Fire safety category", value: "I / II / III", unit: "class" },
    { label: "Rotation speed", value: "2900 / 1450 / 970", unit: "rpm" },
    { label: "Unit design life", value: "min. 10", unit: "years" },
  ],

  description: {
    tag: "03 · DESCRIPTION",
    title: "Purpose and operating principle",
    paragraphs: [
      "Pumping stations in special configurations for sites that need rapid adaptation to operating conditions. Two assembly formats — insulated container or GRP vessel. No permanent civil works for a plant room required: the unit arrives ready to connect to piping and power.",
      "Universal solution for water supply, fire protection, heating, cooling and pressure boosting. The container configuration operates at outdoor temperatures from −50 °C to +50 °C and withstands working pressure up to 40 bar. The GRP-vessel configuration delivers quiet, cavitation-free operation with a UKhL4 / UKhL1 outdoor control cabinet.",
    ],
  },

  applications: {
    tag: "03 · APPLICATIONS",
    title: "Where it is deployed",
    lede: "Sites that need fast installation and self-sufficiency: container configurations for remote locations, GRP vessels for retrofits without a separate plant room.",
    items: [
      { id: "water-supply", mono: "01", title: "Water supply", example: "Cold and hot water, including potable" },
      { id: "fire", mono: "02", title: "Fire protection", example: "Sprinkler, deluge and foam systems" },
      { id: "combined", mono: "03", title: "Combined systems", example: "Domestic + fire protection in a single module" },
      { id: "heating", mono: "04", title: "Heating and cooling", example: "Heating-fluid and chilled-water circulation in building services" },
      { id: "industrial", mono: "05", title: "Process applications", example: "Industrial sites with demanding operating conditions" },
      { id: "remote", mono: "06", title: "Remote locations", example: "Sites without a permanent plant-room build" },
    ],
  },

  brands: {
    tag: "04 · BRANDS",
    title: "Built from equipment of leading manufacturers",
    lede: "Pumps — selected to the project parameters. Automation and components — European and Russian.",
    rowPumps: [
      { id: "aquadeus", name: "AquaDeus", series: "on request", href: "https://aquadeus.ru/" },
      { id: "cnp", name: "CNP", series: "on request", href: "https://www.cnppumps.com/" },
      { id: "leo", name: "Leo", series: "on request", href: "https://www.leo.cn/" },
      { id: "gms", name: "HMS", series: "on request", href: "https://hms.ru/" },
      { id: "wilo", name: "Wilo", series: "on request", href: "https://wilo.com/ru/ru/" },
      { id: "lowara", name: "Lowara", series: "on request", href: "https://www.xylem.com/ru-ru/brands/lowara/" },
      { id: "kq", name: "KQ Pumps", series: "on request", href: "https://kq.com.ru/" },
    ],
    rowComponents: [
      { id: "dekraft", name: "DEKraft", href: "https://dekraft.ru/" },
      { id: "iek", name: "IEK", href: "https://www.iek.ru/" },
      { id: "keaz", name: "KEAZ", href: "https://keaz.ru/" },
      { id: "ekf", name: "EKF", href: "https://ekfgroup.com/ru-ru" },
      { id: "chint", name: "CHINT", href: "https://chint.ru/" },
      { id: "dkc", name: "DKC", href: "https://www.dkc.ru/" },
      { id: "weintek", name: "Weintek", href: "https://www.weintek.com/" },
      { id: "titan", name: "TITAN Control" },
    ],
  },

  advantages: {
    tag: "05 · ADVANTAGES",
    title: "Why ANHEL",
    lede: "An alternative to building a permanent plant room — simpler approvals and faster delivery.",
    items: [
      { id: "no-construction", mono: "01", title: "No permanent civil works", body: "No separate technical room or plant room required — the unit arrives ready to connect." },
      { id: "fast-install", mono: "02", title: "Fast site installation", body: "The unit is delivered fully assembled; on-site work is piping, power and cabling. No excavation or foundation works." },
      { id: "low-noise", mono: "03", title: "Low noise level", body: "The GRP-vessel format runs quietly — the unit can be placed without separate sound insulation." },
      { id: "cavitation-free", mono: "04", title: "Cavitation-free operation", body: "The hydraulic layout of the GRP variant prevents pump cavitation and extends service life." },
      { id: "permits", mono: "05", title: "Simpler approvals", body: "Smaller permit package than for a permanent plant-room build." },
      { id: "delivery", mono: "06", title: "Faster delivery", body: "Serial factory assembly to order shortens the time from brief to commissioning." },
    ],
  },

  gallery: {
    tag: "06 · GALLERY",
    title: "Manufacturing and installation",
    lede: "Assembly shop, test bench, on-site units.",
    photos: [
      { id: "special-01", src: "/assets/production/special/special-01.jpg", alt: "ANHEL — special-configuration station in manufacturing, photo 1", aspect: "4/5" },
      { id: "special-02", src: "/assets/production/special/special-02.jpg", alt: "ANHEL — special-configuration station in manufacturing, photo 2", aspect: "4/5" },
      { id: "special-03", src: "/assets/production/special/special-03.jpg", alt: "ANHEL — special-configuration station in manufacturing, photo 3", aspect: "4/5" },
      { id: "special-04", src: "/assets/production/special/special-04.jpg", alt: "ANHEL — special-configuration station in manufacturing, photo 4", aspect: "4/5" },
      { id: "special-05", src: "/assets/production/special/special-05.jpg", alt: "ANHEL — special-configuration station in manufacturing, photo 5", aspect: "4/5" },
      { id: "special-06", src: "/assets/production/special/special-06.jpg", alt: "ANHEL — special-configuration station in manufacturing, photo 6", aspect: "4/5" },
      { id: "special-07", src: "/assets/production/special/special-07.jpg", alt: "ANHEL — special-configuration station in manufacturing, photo 7", aspect: "4/5" },
    ],
  },

  cases: {
    tag: "07 · CASE STUDIES",
    title: "Already in operation",
    lede: "Remote locations and projects with specific layout requirements.",
    items: [
      { id: "industrial-placeholder", title: "Industrial site", location: "Moscow region", equipment: "ANHEL container unit, water supply", photo: { alt: "Industrial site, general view" } },
      { id: "fire-placeholder", title: "Logistics centre", location: "Leningrad region", equipment: "ANHEL container unit, fire protection", photo: { alt: "Logistics centre, general view" } },
      { id: "fiberglass-placeholder", title: "Residential complex", location: "Moscow", equipment: "ANHEL GRP unit, cold-water supply", photo: { alt: "Residential complex, general view" } },
    ],
  },

  quiz: { tag: "08 · SPECIFICATION SHEET", title: "Sizing for your project", lede: "Six steps — from contact details to the technical system parameters. We respond within one working day." },

  documents: {
    tag: "09 · DOCUMENTATION",
    title: "Documents and certificates",
    lede: "Specification sheet, certificates and manual — for design and acceptance.",
    items: [
      { id: "oprosnik", title: "Pumping-station specification sheet", size: "1.49 MB", href: "/docs/special/oprosnyi-list.pdf" },
      { id: "cert-deklaratsiya", title: "EAEU Conformity Declaration — ANHEL® special-configuration pumping stations", size: "0.86 MB", href: "/docs/special/cert-deklaratsiya.pdf" },
      { id: "manual", title: "Operating manual — ANHEL® SPD-type pumping stations", size: "61 KB", href: "/docs/special/manual-en.pdf" },
    ],
  },

  footerCta: {
    tag: "10 · REQUEST A QUOTE",
    title: "Configure a special-configuration unit",
    subtitle: "We respond within one working day. Sizing is free of charge.",
    cta: { label: "Open the specification sheet", href: "#documents" },
    neighboursCaption: "Other sections",
  },
};
