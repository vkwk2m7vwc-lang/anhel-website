import type { ProductContent } from "../../types";

/**
 * Water-treatment installation — content file, English locale.
 *
 * Engineering EN tone. Brand names stay latin. Water-treatment
 * terminology follows EN industrial conventions ('reverse osmosis',
 * 'softening', 'iron removal', 'regeneration').
 */
export const content: ProductContent = {
  slug: "water-treatment",
  accent: "treatment",

  metaTitle: "ANHEL water-treatment units",
  metaDescription:
    "ANHEL water-treatment units — high-tech equipment with energy-efficient automation and components from leading global manufacturers. Filtration, softening, iron removal, reverse osmosis. For industry, food production and residential buildings.",

  hero: {
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Catalogue", href: "/products" },
      { label: "Water treatment" },
    ],
    sectionTag: "01 · ENGINEERING EQUIPMENT · WATER TREATMENT",
    title: "ANHEL water-treatment units",
    subtitle:
      "High-tech equipment combining state-of-the-art process, structural and energy-saving design. Filtration, softening, iron removal and reverse osmosis — delivered as a single package with automation and components from leading global manufacturers.",
    image: {
      src: "/assets/products/vpu.webp",
      alt: "ANHEL — water-treatment unit with steel filter vessels",
    },
    primaryCta: {
      label: "Fill in online",
      href: "/quiz/vpu",
      variant: "primary",
    },
    secondaryCta: {
      label: "Specification sheet",
      href: "/docs/water-treatment/oprosnyi-list-en.pdf",
      variant: "ghost",
    },
  },

  techSpecs: [
    { label: "Flow rate", value: "0.5 – 80", unit: "m³/h" },
    { label: "Inlet pressure", value: "2 – 6", unit: "bar" },
    { label: "Outlet pressure", value: "up to 10", unit: "bar" },
    { label: "Water temperature", value: "5 – 35", unit: "°C" },
    { label: "Hardness after softening", value: "< 0.1", unit: "mEq/L" },
    { label: "Iron after iron removal", value: "< 0.3", unit: "mg/L" },
    { label: "RO rejection rate", value: "up to 99.5", unit: "%" },
    { label: "Unit design life", value: "min. 10", unit: "years" },
  ],

  description: {
    tag: "03 · DESCRIPTION",
    title: "Purpose and operating principle",
    paragraphs: [
      "ANHEL water-treatment units combine filtration, softening, iron removal and reverse osmosis. The configuration is selected from the chemical analysis of the inlet water and the required outlet quality — for residential, commercial and industrial sites.",
      "Filter media and RO membranes from leading global manufacturers. Automatic regeneration on time or flow basis, SCADA integration, and commissioning with outlet-water control analyses before handover to the client.",
    ],
  },

  applications: {
    tag: "03 · APPLICATIONS",
    title: "Where it is deployed",
    lede: "From residential to heavy industry. Configuration is selected from inlet-water quality and outlet-water requirements.",
    items: [
      { id: "residential", mono: "01", title: "Residential", example: "Detached houses and residential complexes with private water supply" },
      { id: "boiler", mono: "02", title: "Boiler houses", example: "Make-up water treatment" },
      { id: "industrial", mono: "03", title: "Industry", example: "Process water, manufacturing" },
      { id: "food", mono: "04", title: "Food production", example: "Beverages, food processing" },
      { id: "hospitality", mono: "05", title: "HoReCa", example: "Hotels, restaurants, SPA centres" },
      { id: "medical", mono: "06", title: "Healthcare and pharma", example: "Hospitals, laboratories, pharmaceutical production" },
    ],
  },

  brands: {
    tag: "04 · BRANDS",
    title: "Built from globally recognised equipment",
    lede: "Filter media, control valves and RO membranes — from proven manufacturers.",
    rowPumps: [
      { id: "clack", name: "Clack", series: "WS1, WS2" },
      { id: "runxin", name: "Runxin", series: "F63, F75" },
      { id: "filmtec", name: "Dow FilmTec", series: "BW, TW" },
      { id: "vontron", name: "Vontron", series: "ULP, LP" },
      { id: "ecosoft", name: "Ecosoft" },
      { id: "aquachem", name: "AquaChem" },
    ],
    rowComponents: [
      { id: "grundfos", name: "Grundfos", series: "DDA", href: "https://www.grundfos.com/" },
      { id: "dosatron", name: "Dosatron" },
      { id: "dekraft", name: "DEKraft", href: "https://dekraft.ru/" },
      { id: "iek", name: "IEK", href: "https://www.iek.ru/" },
      { id: "keaz", name: "KEAZ", href: "https://keaz.ru/" },
      { id: "ekf", name: "EKF", href: "https://ekfgroup.com/ru-ru" },
      { id: "weintek", name: "Weintek", href: "https://www.weintek.com/" },
      { id: "unitronics", name: "Unitronics", href: "https://unitronicsplc.com/" },
    ],
  },

  advantages: {
    tag: "05 · ADVANTAGES",
    title: "Why ANHEL®",
    lede: "Engineered to the inlet-water analysis, with quality control and our own automation.",
    items: [
      { id: "analysis", mono: "01", title: "Sized from a water analysis", body: "Chemical analysis of the inlet water drives the configuration for each site." },
      { id: "custom", mono: "02", title: "Made to order", body: "Built to flow rate and outlet-quality targets, flexible component selection." },
      { id: "qc", mono: "03", title: "Quality control", body: "Commissioning with outlet-water control analyses before handover." },
      { id: "automation", mono: "04", title: "Automatic regeneration", body: "Time- or flow-based — filters self-regenerate without operator intervention." },
      { id: "own-modules", mono: "05", title: "In-house automation", body: "Control cabinet and SCADA built in our own workshop." },
      { id: "documentation", mono: "06", title: "Reliability and full documentation set", body: "Vessel design life ≥ 10 years; media and membranes are consumables. Conformity declarations and equipment passports supplied." },
    ],
  },

  gallery: {
    tag: "06 · GALLERY",
    title: "From the factory floor",
    photos: [
      { id: "udokan-01", src: "/assets/production/water-treatment/udokan-01.jpg", alt: "ANHEL® reverse-osmosis unit on a steel frame", aspect: "4/5" },
      { id: "udokan-02", src: "/assets/production/water-treatment/udokan-02.jpg", alt: "ANHEL® reverse-osmosis membrane modules", aspect: "4/5" },
      { id: "udokan-03", src: "/assets/production/water-treatment/udokan-03.jpg", alt: "ANHEL® unit piping and valves", aspect: "4/5" },
      { id: "udokan-04", src: "/assets/production/water-treatment/udokan-04.jpg", alt: "Close-up of ANHEL® membrane elements", aspect: "4/5" },
      { id: "udokan-05", src: "/assets/production/water-treatment/udokan-05.jpg", alt: "ANHEL® unit instrumentation", aspect: "4/5" },
      { id: "udokan-06", src: "/assets/production/water-treatment/udokan-06.jpg", alt: "ANHEL® unit — end view", aspect: "4/5" },
      { id: "udokan-07", src: "/assets/production/water-treatment/udokan-07.jpg", alt: "Steel frame and piping of an ANHEL® unit", aspect: "4/5" },
      { id: "udokan-08", src: "/assets/production/water-treatment/udokan-08.jpg", alt: "ANHEL® unit — general view", aspect: "4/5" },
    ],
  },

  cases: {
    tag: "07 · CASE STUDIES",
    title: "Already in operation",
    lede: "Industrial and commercial sites using our water-treatment units.",
    items: [
      { id: "industrial-placeholder", title: "Industrial site", location: "Moscow region", equipment: "ANHEL unit, softening + iron removal", photo: { alt: "Industrial site, general view" } },
      { id: "hotel-placeholder", title: "5★ hotel", location: "St. Petersburg", equipment: "ANHEL unit, full water treatment", photo: { alt: "Hotel complex, general view" } },
      { id: "zhk-placeholder", title: "Residential complex (example)", location: "Moscow", equipment: "ANHEL unit, softening for DHW", photo: { alt: "Residential complex, general view" } },
    ],
  },

  quiz: {
    tag: "08 · SPECIFICATION SHEET",
    title: "Sizing for your project",
    lede: "Six steps — from contact details to the technical system parameters. We respond within one working day.",
  },

  documents: {
    tag: "09 · DOCUMENTATION",
    title: "Documents and certificates",
    lede: "EAEU Conformity Declaration, specification sheet and manual — for design and acceptance.",
    items: [
      { id: "oprosnik", title: "Water-treatment unit specification sheet", size: "37 KB", href: "/docs/water-treatment/oprosnyi-list-en.pdf" },
      { id: "cert-deklaratsiya", title: "EAEU Conformity Declaration — ANHEL® water-treatment units", size: "0.49 MB", href: "/docs/water-treatment/cert-deklaratsiya.pdf" },
    ],
  },

  footerCta: {
    tag: "10 · REQUEST A QUOTE",
    title: "Configure your water-treatment unit",
    subtitle: "We respond within one working day. Sizing is free of charge.",
    cta: { label: "Open the specification sheet", href: "#documents" },
    neighboursCaption: "Other sections",
  },
};
