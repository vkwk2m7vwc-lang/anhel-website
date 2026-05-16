import type { ProductContent } from "../../types";
import type { VpuModificationsContent } from "@/components/products/water-treatment/VpuModificationsTable";
import type { CompositionContent } from "@/components/products/water-treatment/CompositionList";
import type { AutomationContent } from "@/components/products/water-treatment/AutomationSection";

/**
 * VPU ANHEL Series — EN translation. RU master in
 * ./../ru/water-treatment-anhel-series.ts; this file mirrors the same
 * structure with localized strings. SanPiN / Russian regulatory names
 * kept in original Cyrillic where naming is officially registered
 * (СанПиН 2.1.4.1074-01, ГОСТ 15150-69, ТУ).
 */
export const content: ProductContent = {
  slug: "anhel-series",
  accent: "treatment",

  metaTitle: "ANHEL Water Treatment Series — up to 56 m³/h — ANHEL®",
  metaDescription:
    "ANHEL Water Treatment Series — water treatment units with capacity up to 56 m³/h. Four modifications by number of filtration lines. Multi-stage filtration with UV disinfection. Compliant with СанПиН 2.1.4.1074-01.",

  hero: {
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Catalogue", href: "/products" },
      { label: "Water treatment", href: "/products/water-treatment" },
      { label: "ANHEL Water Treatment Series" },
    ],
    sectionTag: "01 · ENGINEERED EQUIPMENT · WATER TREATMENT",
    title: "ANHEL Water Treatment Series",
    subtitle:
      "Water treatment units up to 56 m³/h. Multi-stage mechanical filtration and ultraviolet disinfection. Four modifications by filtration lines — matched to the flow of your facility.",
    image: {
      src: "/assets/products/water-treatment/anhel-series/hero.webp",
      alt: "ANHEL Water Treatment Series — 2-line modification (example)",
    },
    imageCaption:
      "Photo shows the 2-line modification as an example. The actual configuration depends on the series model.",
    primaryCta: {
      label: "Request a quote",
      href: "/quiz/vpu",
      variant: "primary",
    },
    secondaryCta: {
      label: "Questionnaire",
      href: "/quiz/vpu",
      variant: "ghost",
    },
  },

  techSpecs: [
    { label: "Working pressure", value: "up to 6", unit: "bar" },
    { label: "Inlet water temperature", value: "up to +60", unit: "°C" },
    { label: "Room air temperature", value: "+5 to +30", unit: "°C" },
    { label: "Relative humidity", value: "≤ 75", unit: "%" },
    { label: "Climate class", value: "У4 per ГОСТ 15150-69" },
    { label: "UV dose", value: "≥ 40", unit: "mJ/cm²" },
    { label: "Warranty", value: "24", unit: "months" },
    { label: "Service life", value: "20", unit: "years" },
  ],

  description: {
    tag: "03 · PURPOSE",
    title: "Potable water in line with СанПиН requirements",
    paragraphs: [
      "The ANHEL Water Treatment Series is designed to produce purified water in line with СанПиН 2.1.4.1074-01 (Drinking water. Hygienic requirements for water quality of centralised drinking water supply systems. Quality control). Units are used for disinfection and purification of water from the central drinking-water supply.",
      "Applications include residential and business complexes, medical and public institutions, water preparation upstream of pressure-boosting pump stations, and production facilities with technological-water quality requirements. The unit is installed in an enclosed heated room upstream of the pressure-boosting pump stations within the building's water supply system.",
    ],
  },

  applications: {
    tag: "04 · APPLICATION",
    title: "Where the series fits",
    lede: "From residential complexes to medical institutions — facilities with СанПиН 2.1.4.1074-01 requirements.",
    items: [
      {
        id: "residential",
        mono: "01",
        title: "Residential complexes",
        example: "Multi-unit residential, apartments, mixed-use developments",
      },
      {
        id: "business",
        mono: "02",
        title: "Business centres",
        example: "Office buildings, multifunctional complexes",
      },
      {
        id: "medical",
        mono: "03",
        title: "Medical institutions",
        example: "Hospitals, clinics, rehabilitation centres",
      },
      {
        id: "public",
        mono: "04",
        title: "Public institutions",
        example: "Schools, kindergartens, training centres",
      },
      {
        id: "boost-station",
        mono: "05",
        title: "Upstream of pressure-boosting pumps",
        example: "Water preparation for PBS at residential and commercial sites",
      },
      {
        id: "industrial",
        mono: "06",
        title: "Production facilities",
        example: "Technological water with cleanliness requirements",
      },
    ],
  },

  brands: {
    tag: "",
    title: "",
    rowPumps: [],
    rowComponents: [],
  },

  advantages: {
    tag: "09 · ADVANTAGES",
    title: "Why the ANHEL Series",
    lede: "Model range to cover any flow rate, multi-stage purification and Russian manufacturing.",
    items: [
      {
        id: "modular-range",
        mono: "01",
        title: "Model range for any flow rate",
        body: "Four modifications in the series — from 22 to 56 m³/h. Selection by the facility's actual flow rate.",
      },
      {
        id: "multi-stage",
        mono: "02",
        title: "Multi-stage purification",
        body: "Three levels of mechanical filtration (130 µm → 25 µm → 5 µm) plus UV disinfection with a dose of at least 40 mJ/cm².",
      },
      {
        id: "industrial-automation",
        mono: "03",
        title: "Industrial automation",
        body: "Touchscreen HMI in the control cabinet, Modbus RTU dispatching, three access levels: user / administrator / developer.",
      },
      {
        id: "factory-skid",
        mono: "04",
        title: "Factory skid assembly",
        body: "Modular design — the unit arrives on site ready for connection. Piping, valves and the control cabinet are assembled and tested at the factory.",
      },
      {
        id: "sanpin",
        mono: "05",
        title: "СанПиН 2.1.4.1074-01 compliance",
        body: "Output water meets the requirements for drinking water of centralised systems. EAEU declaration of conformity № RU Д-RU.РA01.B.55819/21.",
      },
      {
        id: "russian-mfg",
        mono: "06",
        title: "Manufactured in Russia",
        body: "ANHEL® in-house assembly facility, engineering by Profit LLC, Saint Petersburg. 24-month warranty, 20-year service life.",
      },
    ],
  },

  gallery: {
    tag: "",
    title: "",
    photos: [],
  },

  cases: {
    tag: "",
    title: "",
    items: [],
  },

  quiz: {
    tag: "",
    title: "",
  },

  documents: {
    tag: "10 · DOCUMENTATION",
    title: "Documents and certificates",
    lede: "EAEU declaration of conformity and the questionnaire — shared with the broader ANHEL water treatment range.",
    items: [
      {
        id: "oprosnik",
        title: "Questionnaire for water treatment unit selection",
        size: "2.23 MB",
        href: "/docs/water-treatment/oprosnyi-list-en.pdf",
      },
      {
        id: "cert-deklaratsiya",
        title: "EAEU declaration of conformity — ANHEL® water treatment units",
        size: "0.49 MB",
        href: "/docs/water-treatment/cert-deklaratsiya.pdf",
      },
    ],
  },

  footerCta: {
    tag: "11 · QUOTE REQUEST",
    title: "We'll match a modification to your facility's flow rate",
    subtitle:
      "Fill in the questionnaire — we respond within one business day. Sizing is free of charge.",
    cta: { label: "Request a quote", href: "/quiz/vpu" },
    secondaryCta: { label: "Contact us", href: "/contacts" },
    neighboursCaption: "Other sections",
  },
};

export const modifications: VpuModificationsContent = {
  tag: "05 · MODEL RANGE",
  title: "Four modifications by filtration lines",
  lede: "Series throughput scales with the number of parallel lines — the working principle is the same across all models.",
  headerStation: "Station type",
  headerLines: "Lines",
  headerFlow: "Maximum flow",
  rows: [
    {
      id: "lines-2",
      station: "ANHEL Water Treatment (2 lines)",
      linesLabel: "2 lines",
      flow: "up to 21.9",
      flowUnit: "m³/h",
    },
    {
      id: "lines-3",
      station: "ANHEL Water Treatment (3 lines)",
      linesLabel: "3 lines",
      flow: "22.0 to 35.9",
      flowUnit: "m³/h",
    },
    {
      id: "lines-4",
      station: "ANHEL Water Treatment (4 lines)",
      linesLabel: "4 lines",
      flow: "36.0 to 45.9",
      flowUnit: "m³/h",
    },
    {
      id: "lines-5",
      station: "ANHEL Water Treatment (5 lines)",
      linesLabel: "5 lines",
      flow: "46.0 to 55.9",
      flowUnit: "m³/h",
    },
  ],
  footnote:
    "Installed power and overall dimensions depend on the modification and are confirmed during sizing. The questionnaire covers every parameter required to pick a model.",
};

export const principle = {
  tag: "06 · WORKING PRINCIPLE",
  title: "Four stages of purification",
  lede: "Multi-stage processing — water passes sequentially through mechanical filtration and UV sterilisation.",
  items: [
    {
      id: "step-1",
      mono: "01",
      title: "Disc filter",
      body: "Coarse mechanical filtration at 130 µm. Captures large suspended particles. Manual flushing.",
    },
    {
      id: "step-2",
      mono: "02",
      title: "Bag filtration",
      body: "Two fine-filtration stages: 25 µm + 5 µm. Captures mechanical and colloidal particles. Differential-pressure monitoring; cartridges replaced when ΔP > 1 bar.",
    },
    {
      id: "step-3",
      mono: "03",
      title: "UV sterilisation",
      body: "Quartz amalgam UV lamp. UV dose at least 40 mJ/cm². Lamp service life — 8800 hours / 1 year.",
    },
    {
      id: "step-4",
      mono: "04",
      title: "Control cabinet",
      body: "Touchscreen HMI, automatic and manual modes, Modbus RTU dispatching, three access levels.",
    },
  ],
};

export const composition: CompositionContent = {
  tag: "07 · UNIT COMPOSITION",
  title: "What the unit includes",
  lede: "Factory skid assembly. The unit arrives on site ready for connection.",
  items: [
    "Process piping kit on a common skid",
    "Disc filter (coarse filtration)",
    "Two-stage bag filters (25 µm + 5 µm)",
    "Ultraviolet steriliser (UV lamp)",
    "Control cabinet with touchscreen HMI",
    "Indicating pressure gauges",
    "Pressure transmitters (inlet and outlet)",
    "Shut-off and regulating valves",
    "Check valves",
  ],
};

export const automation: AutomationContent = {
  tag: "08 · MODES & AUTOMATION",
  title: "Control and dispatching",
  lede: "Touchscreen HMI, access-level separation, Modbus RTU dispatching and a comprehensive protection set.",
  blocks: [
    {
      mono: "01",
      title: "Operating modes",
      items: [
        "Automatic — all UV lamps switch on/off simultaneously by a discrete Start/Stop signal",
        "Manual — each lamp is controlled individually from the operator panel",
      ],
    },
    {
      mono: "02",
      title: "Interface and dispatching",
      items: [
        "Touchscreen operator panel inside the control cabinet",
        "Three access levels: user / administrator / developer",
        "Logging: operational messages and a 24-hour archive",
        "Modbus RTU — transmits parameters (inlet/outlet pressure, differential, lamp states, common alarm)",
      ],
    },
    {
      mono: "03",
      title: "Protections and interlocks",
      items: [
        "Inlet and outlet pressure monitoring (protection at < 0.5 bar)",
        "UV-lamp overheating monitoring",
        "Open-circuit and short-circuit monitoring of pressure transmitters",
      ],
    },
  ],
};
