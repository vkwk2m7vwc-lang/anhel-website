import type { ProductContent } from "../../types";

/**
 * Heating + cooling pumping station — English locale.
 */
export const content: ProductContent = {
  slug: "heating-cooling",
  accent: "treatment",

  metaTitle: "ANHEL pumping stations for heating and cooling systems",
  metaDescription:
    "ANHEL pumping stations for circulating heating fluid and chilled water in heating, cooling and air-conditioning systems. 2 to 6 pumps, 0.37 to 90 kW, fluid temperature 0–120 °C (on request up to 180 °C), VFD control, design life ≥ 10 years.",

  hero: {
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Catalogue", href: "/products" },
      { label: "Pumping stations", href: "/products/pumps" },
      { label: "Heating and cooling" },
    ],
    sectionTag: "01 · PUMPING STATIONS · HEATING AND COOLING",
    title: "ANHEL pumping stations for heating and cooling systems",
    subtitle:
      "Units that circulate heating fluid or chilled water in central heating, cooling and air-conditioning systems. Precise pressure control, motor protection and control algorithms tuned for minimum energy consumption.",
    image: {
      src: "/assets/products/heating-cooling.webp",
      alt: "ANHEL — pumping station for heating and cooling systems: expansion tank, pump group and control cabinet",
    },
    primaryCta: { label: "Fill in online", href: "/quiz/pumps?from=heating-cooling", variant: "primary" },
    secondaryCta: { label: "Specification sheet", href: "/docs/heating-cooling/oprosnyi-list.pdf", variant: "ghost" },
  },

  techSpecs: [
    { label: "Number of pumps", value: "2 – 6", unit: "standard" },
    { label: "Control type", value: "DOL / VFD / per-pump VFD", unit: "with controller" },
    { label: "Fluid temperature", value: "0 – 120", unit: "°C (on request up to 180 °C)" },
    { label: "Mains voltage", value: "3 × 380", unit: "V" },
    { label: "Max. ambient temperature", value: "40", unit: "°C" },
    { label: "Power per pump", value: "0.37 – 90", unit: "kW (standard)" },
    { label: "Rotation speed", value: "2900 / 1450 / 970", unit: "rpm" },
    { label: "Unit design life", value: "min. 10", unit: "years" },
  ],

  description: {
    tag: "03 · DESCRIPTION",
    title: "Purpose and operating principle",
    paragraphs: [
      "These units circulate heating fluid or chilled water in central heating, cooling and air-conditioning systems for residential and industrial buildings. They provide precise pressure control, motor protection and control algorithms tuned for minimum power consumption.",
      "They operate with water and water-glycol mixtures across a wide temperature range (0–120 °C, on request up to 180 °C). The control package is matched to the circuit: DOL with soft start, VFD with a controller, or per-pump VFD.",
    ],
  },

  applications: {
    tag: "03 · APPLICATIONS",
    title: "Where it is deployed",
    lede: "Residential and industrial buildings, central heating and cooling systems, process loops.",
    items: [
      { id: "heating", mono: "01", title: "Heating systems", example: "Circulation of heating fluid through pipework and radiators" },
      { id: "cooling", mono: "02", title: "Cooling supply", example: "Central cooling for shopping centres, offices, data centres" },
      { id: "ventilation", mono: "03", title: "Air conditioning", example: "Chilled-water circulation in air-handling units" },
      { id: "industrial", mono: "04", title: "Industrial buildings", example: "Process heating and cooling circuits" },
      { id: "residential", mono: "05", title: "Residential complexes", example: "Central heating and cooling in high-rise developments" },
      { id: "tech-process", mono: "06", title: "Process applications", example: "Maintaining stable operation in production circuits" },
    ],
  },

  brands: {
    tag: "04 · BRANDS",
    title: "Built from equipment of leading manufacturers",
    lede: "Pumps — RCP, RHP, RMP, TD, KML, LPP. Automation and components — European and Russian.",
    rowPumps: [
      { id: "aquadeus", name: "AquaDeus", series: "RCP, RHP, RMP", href: "https://aquadeus.ru/" },
      { id: "cnp", name: "CNP", series: "TD", href: "https://www.cnppumps.com/" },
      { id: "gms", name: "HMS", series: "KML", href: "https://hms.ru/" },
      { id: "leo", name: "Leo", series: "LPP", href: "https://www.leo.cn/" },
      { id: "wilo", name: "Wilo", series: "on request", href: "https://wilo.com/ru/ru/" },
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
    lede: "Factory assembly, multiple control modes and intelligent automation with self-diagnostics.",
    items: [
      { id: "serial", mono: "01", title: "Professional serial production", body: "Factory assembly on a specialised OEM facility, hydraulic and electrical testing of every unit before shipment." },
      { id: "custom", mono: "02", title: "Built to design brief", body: "Hydraulic parameters, pump group configuration and automation built to the project parameters." },
      { id: "control-modes", mono: "03", title: "Multiple control modes", body: "DOL with soft start, VFD with a controller, per-pump VFD — chosen to match the system duty." },
      { id: "energy", mono: "04", title: "Energy-efficient design", body: "Soft start lowers the mains load; control algorithms tuned for minimum power consumption." },
      { id: "deaeration", mono: "05", title: "Automatic deaeration", body: "Automatic removal of air from the heat carrier — no manual maintenance. Automatic flow metering with remote readout." },
      { id: "diagnostics", mono: "06", title: "Intelligent automation", body: "Self-diagnostics, redundant control for maintenance without shutdown. 7\" LCD shows the hydraulic schematic and the event log." },
    ],
  },

  gallery: {
    tag: "06 · GALLERY",
    title: "Manufacturing and installation",
    lede: "Assembly shop, test bench, on-site units.",
    photos: [
      { id: "shop-01", alt: "ANHEL assembly shop, general view", caption: "Shop, Moscow", aspect: "4/5" },
      { id: "shop-02", alt: "Circulation pumps under assembly", caption: "Pump group installation", aspect: "4/5" },
      { id: "shop-03", alt: "Control cabinet, close-up", caption: "Control cabinet with PLC", aspect: "4/5" },
      { id: "test-01", alt: "Hydraulic testing of the unit", caption: "Test bench", aspect: "4/5" },
      { id: "site-01", alt: "Finished station before shipment", caption: "QC acceptance", aspect: "4/5" },
      { id: "site-02", alt: "Installed station on site", caption: "Site — Moscow", aspect: "4/5" },
      { id: "detail-01", alt: "Expansion tank as part of the unit", caption: "Expansion tank", aspect: "4/5" },
      { id: "detail-02", alt: "Operator LCD panel with hydraulic schematic", caption: "Operator panel", aspect: "4/5" },
    ],
  },

  cases: {
    tag: "07 · CASE STUDIES",
    title: "Already in operation",
    lede: "Residential and commercial buildings running our heating and cooling units.",
    items: [
      { id: "zhk-placeholder-1", title: "Residential complex (example 1)", location: "Moscow", equipment: "ANHEL pumping station for the heating system", photo: { alt: "Residential complex, general view" } },
      { id: "trc-placeholder", title: "Class-A shopping centre", location: "St. Petersburg", equipment: "ANHEL pumping station for the cooling system", photo: { alt: "Shopping centre, general view" } },
      { id: "bc-placeholder", title: "Office building", location: "Moscow", equipment: "ANHEL pumping station for heating and cooling systems", photo: { alt: "Office building, general view" } },
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
    lede: "Specification sheet, certificates and manual — for design and acceptance.",
    items: [
      { id: "oprosnik", title: "Pumping-station specification sheet", size: "1.49 MB", href: "/docs/heating-cooling/oprosnyi-list.pdf" },
      { id: "cert-deklaratsiya", title: "EAEU Conformity Declaration — ANHEL® heating-and-cooling pumping stations", size: "0.86 MB", href: "/docs/heating-cooling/cert-deklaratsiya.pdf" },
      { id: "manual", title: "Operating manual — ANHEL® SPD-type pumping stations", size: "61 KB", href: "/docs/heating-cooling/manual-en.pdf" },
    ],
  },

  footerCta: {
    tag: "10 · REQUEST A QUOTE",
    title: "Configure your heating or cooling pumping station",
    subtitle: "We respond within one working day. Sizing is free of charge.",
    cta: { label: "Open the specification sheet", href: "#documents" },
    neighboursCaption: "Other sections",
  },
};
