import type { ProductContent } from "../../types";

/**
 * Block Heat Substation (BITP) — content file, English locale.
 *
 * Engineering EN tone (Grundfos / Wilo / IMI register). Brand names
 * (ANHEL, Profit LLC, Wilo, Lowara, etc.) stay latin. Heat-engineering
 * terminology follows EN industrial conventions: 'heat substation' for
 * ИТП, 'heat exchanger' for теплообменник, 'DHW' for ГВС.
 */
export const content: ProductContent = {
  slug: "heating-unit",
  accent: "heat",

  metaTitle: "ANHEL block heat substations",
  metaDescription:
    "ANHEL block heat substations — heating, DHW and cooling modules. Factory assembly, weather-compensated control, design life 15+ years.",

  hero: {
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Catalogue", href: "/products" },
      { label: "Heat substations" },
    ],
    sectionTag: "01 · HEAT SUBSTATIONS",
    title: "ANHEL block heat substations",
    subtitle:
      "Modular equipment for heating, domestic hot water and cooling. Factory assembly, weather-compensated control and a complete set of regulatory documentation.",
    image: {
      src: "/assets/products/bitp.png",
      alt: "ANHEL® — block heat substation, modular configuration",
    },
    primaryCta: {
      label: "Fill in online",
      href: "/quiz/itp",
      variant: "primary",
    },
    secondaryCta: {
      label: "Specification sheet",
      href: "/docs/heating-unit/oprosnyi-list.pdf",
      variant: "ghost",
    },
  },

  techSpecs: [
    { label: "Thermal capacity", value: "50 – 3000", unit: "kW" },
    { label: "Primary-side temperature", value: "up to 150", unit: "°C" },
    { label: "Secondary-side temperature", value: "70 / 95", unit: "°C" },
    { label: "Primary-side pressure", value: "up to 16", unit: "bar" },
    { label: "Secondary-side pressure", value: "up to 10", unit: "bar" },
    { label: "Heat carrier", value: "water / glycol" },
    { label: "Control type", value: "weather-compensated" },
    { label: "Design life", value: "min. 15", unit: "years" },
  ],

  applications: {
    tag: "02 · MODULE LINE-UP",
    title: "Eight modules for any project",
    lede: "From stand-alone heating to combined heating-and-cooling assemblies. Any combination can be built into a single block.",
    items: [
      { id: "heating-closed", mono: "01", title: "Closed heating circuit", example: "For residential and commercial buildings with a dedicated heat intake" },
      { id: "heating-open", mono: "02", title: "Open heating circuit", example: "Direct draw from the heat network with hot-water tap-off" },
      { id: "dhw", mono: "03", title: "Domestic hot water (DHW)", example: "Single- or two-stage water-heater configuration" },
      { id: "combined", mono: "04", title: "Combined: heating + DHW", example: "Universal solution for residential buildings" },
      { id: "cooling", mono: "05", title: "Cooling", example: "Cooling module for shopping centres, offices, data centres" },
      { id: "ventilation", mono: "06", title: "Supply-air heating", example: "Air-heating module with heat recovery" },
    ],
  },

  brands: {
    tag: "03 · BRANDS",
    title: "Built from globally recognised equipment",
    lede: "Heat exchangers, control valves and pumps — from proven manufacturers.",
    rowPumps: [
      { id: "ridan", name: "Ridan", series: "NN, S-series" },
      { id: "alfa-laval", name: "Alfa Laval", series: "M-series, T-series" },
      { id: "wilo", name: "Wilo", series: "Stratos, Yonos", href: "https://wilo.com/ru/ru/" },
      { id: "lowara", name: "Lowara", series: "ecocirc", href: "https://www.xylem.com/ru-ru/brands/lowara/" },
      { id: "gms", name: "HMS", series: "centrifugal pumps", href: "https://hms.ru/" },
    ],
    rowComponents: [
      { id: "danfoss", name: "Danfoss", href: "https://www.danfoss.com/" },
      { id: "siemens", name: "Siemens", href: "https://www.siemens.com/" },
      { id: "dekraft", name: "DEKraft", href: "https://dekraft.ru/" },
      { id: "iek", name: "IEK", href: "https://www.iek.ru/" },
      { id: "keaz", name: "KEAZ", href: "https://keaz.ru/" },
      { id: "ekf", name: "EKF", href: "https://ekfgroup.com/ru-ru" },
      { id: "weintek", name: "Weintek", href: "https://www.weintek.com/" },
      { id: "unitronics", name: "Unitronics", href: "https://unitronicsplc.com/" },
    ],
  },

  advantages: {
    tag: "03 · ADVANTAGES",
    title: "Why ANHEL®",
    lede: "Factory assembly, quality control and our own automation.",
    items: [
      { id: "serial", mono: "01", title: "Factory assembly", body: "Block-modular construction — not improvised on-site assembly in the basement." },
      { id: "custom", mono: "02", title: "Made to order", body: "Built to the heat-network design parameters with flexible capacity and heat-carrier options." },
      { id: "qc", mono: "03", title: "Quality control", body: "Every module passes hydraulic and electrical testing before shipment." },
      { id: "control", mono: "04", title: "Weather-compensated control", body: "Automatic parameter selection from the outdoor sensor. Integrates with the building SCADA." },
      { id: "reliability", mono: "05", title: "Long design life", body: "Average service life of at least 15 years in normal operation." },
      { id: "documentation", mono: "06", title: "Complete documentation set", body: "Regulatory, operational and passport documents — all supplied with the delivery." },
    ],
  },

  gallery: {
    tag: "04 · GALLERY",
    title: "From the factory floor",
    photos: [
      { id: "heating-unit-01", src: "/assets/production/heating-unit/heating-unit-01.jpg", alt: "ANHEL — block heat substation in manufacturing, photo 1", aspect: "4/5" },
      { id: "heating-unit-02", src: "/assets/production/heating-unit/heating-unit-02.jpg", alt: "ANHEL — block heat substation in manufacturing, photo 2", aspect: "4/5" },
      { id: "heating-unit-03", src: "/assets/production/heating-unit/heating-unit-03.jpg", alt: "ANHEL — block heat substation in manufacturing, photo 3", aspect: "4/5" },
      { id: "heating-unit-04", src: "/assets/production/heating-unit/heating-unit-04.jpg", alt: "ANHEL — block heat substation in manufacturing, photo 4", aspect: "4/5" },
      { id: "heating-unit-05", src: "/assets/production/heating-unit/heating-unit-05.jpg", alt: "ANHEL — block heat substation in manufacturing, photo 5", aspect: "4/5" },
      { id: "heating-unit-06", src: "/assets/production/heating-unit/heating-unit-06.jpg", alt: "ANHEL — block heat substation in manufacturing, photo 6", aspect: "4/5" },
      { id: "heating-unit-07", src: "/assets/production/heating-unit/heating-unit-07.jpg", alt: "ANHEL — block heat substation in manufacturing, photo 7", aspect: "4/5" },
      { id: "heating-unit-08", src: "/assets/production/heating-unit/heating-unit-08.jpg", alt: "ANHEL — block heat substation in manufacturing, photo 8", aspect: "4/5" },
      { id: "heating-unit-09", src: "/assets/production/heating-unit/heating-unit-09.jpg", alt: "ANHEL — block heat substation in manufacturing, photo 9", aspect: "4/5" },
      { id: "heating-unit-10", src: "/assets/production/heating-unit/heating-unit-10.jpg", alt: "ANHEL — block heat substation in manufacturing, photo 10", aspect: "4/5" },
      { id: "heating-unit-11", src: "/assets/production/heating-unit/heating-unit-11.jpg", alt: "ANHEL — block heat substation in manufacturing, photo 11", aspect: "4/5" },
      { id: "heating-unit-12", src: "/assets/production/heating-unit/heating-unit-12.jpg", alt: "ANHEL — block heat substation in manufacturing, photo 12", aspect: "4/5" },
      { id: "heating-unit-13", src: "/assets/production/heating-unit/heating-unit-13.jpg", alt: "ANHEL — block heat substation in manufacturing, photo 13", aspect: "4/5" },
    ],
  },

  cases: {
    tag: "06 · CASE STUDIES",
    title: "Already in operation",
    lede: "Residential and commercial buildings using our heat substations.",
    items: [
      { id: "zhk-placeholder-1", title: "Residential complex (example 1)", location: "Moscow", equipment: "ANHEL heat substation, heating + DHW", photo: { alt: "Residential complex, general view" } },
      { id: "zhk-placeholder-2", title: "Residential complex (example 2)", location: "St. Petersburg", equipment: "ANHEL heat substation, closed heating circuit", photo: { alt: "Residential complex, general view" } },
      { id: "bc-placeholder", title: "Class-A office building", location: "Moscow", equipment: "ANHEL heat substation, combined + cooling", photo: { alt: "Office building, general view" } },
    ],
  },

  quiz: {
    tag: "07 · SPECIFICATION SHEET",
    title: "Sizing for your project",
    lede: "Six steps — from contact details to the technical system parameters. We respond within one working day.",
  },

  documents: {
    tag: "05 · DOCUMENTATION",
    title: "Documents and certificates",
    lede: "Specification sheet and certificate — for design and acceptance.",
    items: [
      { id: "oprosnik", title: "Heat-substation specification sheet", size: "0.54 MB", href: "/docs/heating-unit/oprosnyi-list.pdf" },
      { id: "cert-deklaratsiya", title: "Certificate — ANHEL® block heat substations", size: "2.32 MB", href: "/docs/heating-unit/cert-deklaratsiya.pdf" },
    ],
  },

  footerCta: {
    tag: "06 · REQUEST A QUOTE",
    title: "Configure your heat substation",
    subtitle: "We respond within one working day. Sizing is free of charge.",
    cta: { label: "Open the specification sheet", href: "#documents" },
    neighboursCaption: "Other sections",
  },
};
