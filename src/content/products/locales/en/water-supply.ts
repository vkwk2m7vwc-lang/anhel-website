import type { ProductContent } from "../../types";

/**
 * Water-supply pump station — content file, English locale.
 *
 * Engineering EN register. Brand names latin. Terms follow EN
 * conventions: 'pressure boosting', 'multi-stage vertical pumps',
 * 'frequency control', 'pump station'.
 */
export const content: ProductContent = {
  slug: "water-supply",
  accent: "water",

  metaTitle: "ANHEL pumping stations for water-supply systems",
  metaDescription:
    "ANHEL pumping stations for pressure boosting and maintaining constant pressure in cold-water, domestic-hot-water and circulation systems. 2 to 6 pumps, variable-frequency control, 0.37 to 90 kW, design life ≥ 10 years.",

  hero: {
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Catalogue", href: "/products" },
      { label: "Pumping stations", href: "/products/pumps" },
      { label: "Water supply" },
    ],
    sectionTag: "01 · PUMPING STATIONS · WATER SUPPLY",
    title: "ANHEL pumping stations for water-supply systems",
    subtitle:
      "Units for boosting and maintaining constant pressure or generating a required pressure differential. Built around multi-stage vertical, end-suction or close-coupled horizontal pumps, configured to the project parameters.",
    image: {
      src: "/assets/products/hvs-nu.webp",
      alt: "ANHEL® — cold-water pumping station, HVS-NU series",
    },
    primaryCta: {
      label: "Fill in online",
      href: "/quiz/pumps?from=water-supply",
      variant: "primary",
    },
    secondaryCta: {
      label: "Specification sheet",
      href: "/docs/water-supply/oprosnyi-list-en.pdf",
      variant: "ghost",
    },
  },

  techSpecs: [
    { label: "Number of pumps", value: "2 to 6", unit: "standard" },
    { label: "Control type", value: "DOL / VFD / per-pump VFD", unit: "with controller" },
    { label: "Max. fluid temperature", value: "120", unit: "°C (on request up to 180 °C)" },
    { label: "Mains voltage", value: "3 × 380", unit: "V" },
    { label: "Max. ambient temperature", value: "40", unit: "°C" },
    { label: "Power per pump", value: "0.37 – 90", unit: "kW (standard)" },
    { label: "Rotation speed", value: "2900 / 1450", unit: "rpm" },
    { label: "Max. system pressure", value: "up to 40", unit: "bar" },
  ],

  description: {
    tag: "03 · DESCRIPTION",
    title: "Purpose and operating principle",
    paragraphs: [
      "ANHEL pumping stations for cold water, hot water and industrial water-supply systems. Maintain a constant network pressure, protect the pipework from water hammer and save energy through variable-frequency control and soft start.",
      "Built around multi-stage vertical, end-suction or close-coupled horizontal pumps. Configuration is selected from the project hydraulics; the control mode — DOL, VFD or per-pump VFD — is chosen to match the system duty.",
    ],
  },

  applications: {
    tag: "03 · APPLICATIONS",
    title: "Where it is deployed",
    lede: "Domestic water supply, industry, special-purpose facilities and circulation systems. Every unit is built to the project parameters.",
    items: [
      { id: "residential", mono: "01", title: "Domestic water supply", example: "Residential buildings, public and social facilities" },
      { id: "commercial", mono: "02", title: "Commercial buildings", example: "Offices, shopping centres, apart-hotels, 3–5★ hotels" },
      { id: "industrial", mono: "03", title: "Industrial water supply", example: "Industrial buildings and process water" },
      { id: "specialised", mono: "04", title: "Special-purpose facilities", example: "Sports complexes, healthcare, exhibition centres" },
      { id: "circulation", mono: "05", title: "Circulation systems", example: "Heating, cooling, building services" },
      { id: "boost", mono: "06", title: "Pressure boosting", example: "Stable head and water-hammer protection on trunk lines" },
    ],
  },

  brands: {
    tag: "04 · BRANDS",
    title: "Built from equipment of leading manufacturers",
    lede: "Pumps — RVP, CDM, LVR, Boosta. Automation and components — European and Russian.",
    rowPumps: [
      { id: "aquadeus", name: "AquaDeus", series: "RVP", href: "https://aquadeus.ru/" },
      { id: "cnp", name: "CNP", series: "CDM", href: "https://www.cnppumps.com/" },
      { id: "leo", name: "Leo", series: "LVR", href: "https://www.leo.cn/" },
      { id: "gms", name: "HMS", series: "Boosta", href: "https://hms.ru/" },
      { id: "wilo", name: "Wilo", series: "on request", href: "https://wilo.com/ru/ru/" },
      { id: "lowara", name: "Lowara", series: "on request", href: "https://www.xylem.com/ru-ru/brands/lowara/" },
      { id: "kq", name: "KQ Pumps", series: "KQDP, KQDS", href: "https://kq.com.ru/" },
    ],
    rowComponents: [
      { id: "dekraft", name: "DEKraft", href: "https://dekraft.ru/" },
      { id: "unitronics", name: "Unitronics", href: "https://unitronicsplc.com/" },
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
    lede: "Serial production, multiple control modes and a full set of regulatory documentation.",
    items: [
      { id: "serial", mono: "01", title: "Professional serial production", body: "Factory assembly on a specialised OEM facility, not improvised installation on site." },
      { id: "custom", mono: "02", title: "Built to design brief", body: "Hydraulic parameters, pump group configuration and automation built to the project parameters." },
      { id: "qc", mono: "03", title: "Quality control on every unit", body: "Hydraulic and electrical testing of every station before shipment." },
      { id: "control-modes", mono: "04", title: "Multiple control modes", body: "DOL, VFD, per-pump VFD — chosen to match the system duty." },
      { id: "energy", mono: "05", title: "Energy-efficient design", body: "Hydraulic characteristics and control algorithms selected for minimum power consumption." },
      { id: "reliability", mono: "06", title: "Guaranteed reliability", body: "Full average service life of at least 10 years in normal operation. Conformity declarations and passports supplied." },
    ],
  },

  gallery: {
    tag: "06 · GALLERY",
    title: "From the factory floor",
    photos: [
      { id: "water-supply-01", src: "/assets/production/water-supply/water-supply-01.jpg", alt: "ANHEL — water-supply pumping station in manufacturing, photo 1", aspect: "4/5" },
      { id: "water-supply-02", src: "/assets/production/water-supply/water-supply-02.jpg", alt: "ANHEL — water-supply pumping station in manufacturing, photo 2", aspect: "4/5" },
      { id: "water-supply-03", src: "/assets/production/water-supply/water-supply-03.jpg", alt: "ANHEL — water-supply pumping station in manufacturing, photo 3", aspect: "4/5" },
      { id: "water-supply-04", src: "/assets/production/water-supply/water-supply-04.jpg", alt: "ANHEL — water-supply pumping station in manufacturing, photo 4", aspect: "4/5" },
      { id: "water-supply-05", src: "/assets/production/water-supply/water-supply-05.jpg", alt: "ANHEL — water-supply pumping station in manufacturing, photo 5", aspect: "4/5" },
      { id: "water-supply-06", src: "/assets/production/water-supply/water-supply-06.jpg", alt: "ANHEL — water-supply pumping station in manufacturing, photo 6", aspect: "4/5" },
      { id: "water-supply-07", src: "/assets/production/water-supply/water-supply-07.jpg", alt: "ANHEL — water-supply pumping station in manufacturing, photo 7", aspect: "4/5" },
      { id: "water-supply-08", src: "/assets/production/water-supply/water-supply-08.jpg", alt: "ANHEL — water-supply pumping station in manufacturing, photo 8", aspect: "4/5" },
      { id: "water-supply-09", src: "/assets/production/water-supply/water-supply-09.jpg", alt: "ANHEL — water-supply pumping station in manufacturing, photo 9", aspect: "4/5" },
      { id: "water-supply-10", src: "/assets/production/water-supply/water-supply-10.jpg", alt: "ANHEL — water-supply pumping station in manufacturing, photo 10", aspect: "4/5" },
      { id: "water-supply-11", src: "/assets/production/water-supply/water-supply-11.jpg", alt: "ANHEL — water-supply pumping station in manufacturing, photo 11", aspect: "4/5" },
      { id: "water-supply-12", src: "/assets/production/water-supply/water-supply-12.jpg", alt: "ANHEL — water-supply pumping station in manufacturing, photo 12", aspect: "4/5" },
      { id: "water-supply-13", src: "/assets/production/water-supply/water-supply-13.jpg", alt: "ANHEL — water-supply pumping station in manufacturing, photo 13", aspect: "4/5" },
      { id: "water-supply-14", src: "/assets/production/water-supply/water-supply-14.jpg", alt: "ANHEL — water-supply pumping station in manufacturing, photo 14", aspect: "4/5" },
    ],
  },

  cases: {
    tag: "07 · CASE STUDIES",
    title: "Already in operation",
    lede: "Residential and commercial buildings running our cold-water / DHW stations.",
    items: [
      { id: "zhk-placeholder-1", title: "Residential complex (example 1)", location: "Moscow", equipment: "ANHEL cold-water pumping station", photo: { alt: "Residential complex, general view" } },
      { id: "zhk-placeholder-2", title: "Residential complex (example 2)", location: "St. Petersburg", equipment: "ANHEL pressure-boosting station", photo: { alt: "Residential complex, general view" } },
      { id: "bc-placeholder", title: "Class-A office building", location: "Moscow", equipment: "ANHEL cold-water + DHW station", photo: { alt: "Office building, general view" } },
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
      { id: "oprosnik", title: "Pumping-station specification sheet", size: "40 KB", href: "/docs/water-supply/oprosnyi-list-en.pdf" },
      { id: "cert-deklaratsiya", title: "EAEU Conformity Declaration — ANHEL® water-supply pumping stations", size: "0.86 MB", href: "/docs/water-supply/cert-deklaratsiya.pdf" },
      { id: "manual", title: "Operating manual — ANHEL® SPD-type pumping stations", size: "61 KB", href: "/docs/water-supply/manual-en.pdf" },
    ],
  },

  footerCta: {
    tag: "10 · REQUEST A QUOTE",
    title: "Configure your cold-water / DHW station",
    subtitle: "We respond within one working day. Sizing is free of charge.",
    cta: { label: "Open the specification sheet", href: "#documents" },
    neighboursCaption: "Other sections",
  },
};
