import type { ProductContent } from "../../types";
import type { VpuModificationsContent } from "@/components/products/water-treatment/VpuModificationsTable";
import type { CompositionContent } from "@/components/products/water-treatment/CompositionList";
import type { AutomationContent } from "@/components/products/water-treatment/AutomationSection";
import type { QuickQuoteContent } from "@/components/products/water-treatment/QuickQuoteSection";

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

  metaTitle: "ANHEL Water Treatment Series — for new residential developments up to 56 m³/h — ANHEL®",
  metaDescription:
    "ANHEL Water Treatment Series for new multi-unit residential developments. Capacity up to 56 m³/h, four modifications by filtration lines, UV disinfection. Compliant with СанПиН 2.1.4.1074-01.",

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
      "Water treatment units up to 56 m³/h for new multi-unit residential developments. Multi-stage mechanical filtration and ultraviolet disinfection. Four modifications by filtration lines — matched to the building's flow rate.",
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
    title: "Potable water for new residential developments",
    paragraphs: [
      "The ANHEL Water Treatment Series is built primarily for water treatment in new multi-unit residential developments. The unit sits in the building's plant room upstream of the pressure-boosting pump station and brings central drinking-water supply up to the level required by СанПиН 2.1.4.1074-01 (Drinking water. Hygienic requirements for water quality of centralised drinking water supply systems. Quality control).",
      "Beyond residential, the series serves business centres, medical and public institutions, and production facilities with technological-water quality requirements. The unit must be installed in an enclosed heated room upstream of the pressure-boosting pump station in the building's water supply system.",
    ],
  },

  applications: {
    tag: "04 · APPLICATION",
    title: "Where the series fits",
    lede: "Primary application — new multi-unit residential construction. Also used at other sites with СанПиН 2.1.4.1074-01 requirements.",
    items: [
      {
        id: "residential",
        mono: "01",
        title: "New residential developments",
        example: "New multi-unit residential buildings — the primary use case",
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
  headerDimensions: "Dimensions H × W × D, mm",
  headerLamps: "UV lamps",
  footnote:
    "Installed power and weight depend on the modification and are confirmed during sizing. The questionnaire covers every parameter required to pick a model.",
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

export const quickQuote: QuickQuoteContent = {
  tag: "02 · QUICK QUOTE",
  title: "PDF quote by email in 30 seconds",
  lede: "Enter the required flow rate — we'll match a modification and generate a commercial proposal in PDF.",
  flowLabel: "Flow rate",
  flowPlaceholder: "25",
  flowUnit: "m³/h",
  matchedTag: "MATCHED",
  emptyLabel: "Enter the flow — the modification will be matched automatically",
  oversizeTitle: "Flow above the typical range",
  oversizeBody:
    "The series is designed for up to 55.9 m³/h. For a non-standard configuration, contact us — we'll size the unit for your facility.",
  oversizeCtaLabel: "Contact us",
  oversizeCtaHref: "/contacts",
  ctaPrimaryLabel: "Get the quote",
  ctaSecondaryLabel: "Questionnaire",
  ctaSecondaryHref: "/quiz/vpu",
  divider: "or",
  formTitle: "Contact details for the quote",
  fieldName: "Contact person",
  fieldNamePlaceholder: "John Smith",
  fieldPhone: "Phone",
  fieldPhonePlaceholder: "+7 ...",
  fieldEmail: "Email",
  fieldEmailPlaceholder: "name@company.com",
  fieldCompany: "Company (optional)",
  fieldCompanyPlaceholder: "Your company",
  fieldObject: "Facility address",
  fieldObjectPlaceholder: "City, project name, building...",
  consentLabel:
    "I consent to the processing of my personal data in accordance with the privacy policy.",
  submitLabel: "Get the quote",
  submitting: "Generating…",
  successTitle: "Quote generated and sent",
  successBody:
    "The PDF quote downloaded automatically. A copy with the same parameters has gone to the ANHEL sales team — we'll call you within one business day.",
  errorTitle: "Sending failed",
  errorGeneric: "Something went wrong. Please try again or contact us directly.",
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
