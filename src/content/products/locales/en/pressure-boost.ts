import type { ProductContent } from "../../types";

export const content: ProductContent = {
  slug: "pressure-boost",
  accent: "treatment",

  metaTitle: "ANHEL automatic pressure-boosting units",
  metaDescription:
    "ANHEL automatic pressure-boosting units (APBU) for closed heating and cooling networks. Up to 3 pumps in parallel, pressure-holding accuracy down to ±0.01 bar, expansion vessel 200–10 000 L, working pressure up to 25 bar.",

  hero: {
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Catalogue", href: "/products" },
      { label: "Pumping stations", href: "/products/pumps" },
      { label: "Pressure boosting" },
    ],
    sectionTag: "01 · PUMPING STATIONS · PRESSURE BOOSTING",
    title: "ANHEL pressure-boosting units",
    subtitle:
      "Automatic pressure-boosting unit (APBU) — a hydraulic module with pumps, an expansion vessel and intelligent automation. Maintains a constant system pressure to ±0.01 bar, with automatic deaeration and compensation of thermal expansion.",
    image: {
      src: "/assets/products/pressure-boost.webp",
      alt: "ANHEL — automatic pressure-boosting unit: control cabinet, pump group and membrane expansion vessel",
    },
    primaryCta: { label: "Fill in online", href: "/quiz/pumps?from=pressure-boost", variant: "primary" },
    secondaryCta: { label: "Specification sheet", href: "/docs/pressure-boost/oprosnyi-list.pdf", variant: "ghost" },
  },

  techSpecs: [
    { label: "Pumps in parallel", value: "2 – 3", unit: "standard" },
    { label: "Control type", value: "DOL / VFD / per-pump VFD", unit: "with controller" },
    { label: "Pressure-holding accuracy", value: "up to ±0.01", unit: "bar" },
    { label: "Max. fluid temperature", value: "120", unit: "°C" },
    { label: "Max. working pressure", value: "up to 25", unit: "bar" },
    { label: "Expansion vessel volume", value: "200 – 10 000", unit: "L" },
    { label: "Mains voltage", value: "3 × 380", unit: "V" },
    { label: "Unit design life", value: "min. 10", unit: "years" },
  ],

  description: {
    tag: "03 · DESCRIPTION",
    title: "Purpose and operating principle",
    paragraphs: [
      "ANHEL automatic pressure-boosting unit (APBU) — a hydraulic module with pumps, an expansion vessel and intelligent automation. Maintains a constant pressure in closed heating and cooling networks to ±0.01 bar.",
      "Automatic deaeration, compensation of thermal expansion and automatic make-up metering — no manual maintenance required. A 7-inch operator LCD displays the hydraulic schematic and the pressure trend; Modbus / Ethernet integration delivers the data to the site SCADA.",
    ],
  },

  applications: {
    tag: "03 · APPLICATIONS",
    title: "Where it is deployed",
    lede: "Closed heating and cooling networks in residential, commercial and industrial buildings, central heat substations, boiler houses and ventilation systems.",
    items: [
      { id: "central-heating", mono: "01", title: "Central heat substations", example: "Pressure holding in district heat-substation loops" },
      { id: "boiler", mono: "02", title: "Boiler houses", example: "Deaeration and make-up in closed networks" },
      { id: "residential", mono: "03", title: "Multi-occupancy residential", example: "Closed heating and cooling loops in apartment buildings" },
      { id: "industrial", mono: "04", title: "Industrial facilities", example: "Process heating networks in production plants" },
      { id: "ventilation", mono: "05", title: "Ventilation systems", example: "Pressure holding in fresh-air heating loops" },
      { id: "cooling-loops", mono: "06", title: "Cooling loops", example: "Cooling supply systems in mixed-use buildings" },
    ],
  },

  brands: {
    tag: "04 · BRANDS",
    title: "Built from equipment of leading manufacturers",
    lede: "Pumps — CRV, CDM, LVR, Boosta, RVP. Automation and components — European and Russian.",
    rowPumps: [
      { id: "vandjord", name: "Vandjord", series: "CRV" },
      { id: "cnp", name: "CNP", series: "CDM", href: "https://www.cnppumps.com/" },
      { id: "leo", name: "Leo", series: "LVR", href: "https://www.leo.cn/" },
      { id: "gms", name: "HMS", series: "Boosta", href: "https://hms.ru/" },
      { id: "aquadeus", name: "AquaDeus", series: "RVP", href: "https://aquadeus.ru/" },
      { id: "kq", name: "KQ Pumps", series: "KQDP, KQDS", href: "https://kq.com.ru/" },
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
    lede: "High-precision automation, reliable hydraulics and fully redundant controls.",
    items: [
      { id: "precision", mono: "01", title: "Precise pressure holding", body: "Control algorithms keep the working pressure inside a tight band of ±0.01 bar." },
      { id: "custom", mono: "02", title: "Built to design brief", body: "Unit parameters, expansion-vessel volume and automation built to the project parameters." },
      { id: "frame", mono: "03", title: "Heavy-duty frame and AISI 304 manifold", body: "Frame in 4-mm high-tensile steel, manifold in stainless steel AISI 304." },
      { id: "membrane", mono: "04", title: "Membrane expansion vessel", body: "Volume 200–10 000 L matched to the system. Optional membrane-rupture sensor and intermediate vessel." },
      { id: "deaeration", mono: "05", title: "Automatic deaeration", body: "Air is removed from the heat carrier automatically — no manual maintenance." },
      { id: "diagnostics", mono: "06", title: "Fault-tolerant automation", body: "Self-diagnostics, redundant controls, Modbus / Ethernet for SCADA. 7\" LCD shows the hydraulic schematic and pressure trend." },
    ],
  },

  gallery: {
    tag: "06 · GALLERY",
    title: "Manufacturing and installation",
    lede: "Assembly shop, test bench, on-site units.",
    photos: [
      { id: "shop-01", alt: "ANHEL assembly shop, general view", caption: "Shop, Moscow", aspect: "4/5" },
      { id: "shop-02", alt: "APBU pump-group assembly", caption: "Pump group installation", aspect: "4/5" },
      { id: "shop-03", alt: "APBU control cabinet, close-up", caption: "Control cabinet with PLC", aspect: "4/5" },
      { id: "test-01", alt: "Hydraulic testing of the APBU", caption: "Test bench", aspect: "4/5" },
      { id: "site-01", alt: "Finished unit before shipment", caption: "QC acceptance", aspect: "4/5" },
      { id: "site-02", alt: "APBU installed in a heat substation", caption: "Site — Moscow", aspect: "4/5" },
      { id: "detail-01", alt: "Membrane expansion vessel", caption: "Expansion vessel", aspect: "4/5" },
      { id: "detail-02", alt: "AISI 304 manifold", caption: "Stainless steel manifold", aspect: "4/5" },
    ],
  },

  cases: {
    tag: "07 · CASE STUDIES",
    title: "Already in operation",
    lede: "Heat substations and closed heating networks running our APBUs.",
    items: [
      { id: "ctp-placeholder", title: "Residential district heat substation", location: "Moscow", equipment: "ANHEL APBU, pressure holding in heating loops", photo: { alt: "Central heat substation, general view" } },
      { id: "boiler-placeholder", title: "Industrial boiler house", location: "Moscow region", equipment: "ANHEL APBU, deaeration and make-up", photo: { alt: "Industrial boiler house, general view" } },
      { id: "zhk-placeholder", title: "Residential complex (example)", location: "St. Petersburg", equipment: "ANHEL APBU, pressure holding in an apartment building", photo: { alt: "Residential complex, general view" } },
    ],
  },

  quiz: { tag: "08 · SPECIFICATION SHEET", title: "Sizing for your project", lede: "Six steps — from contact details to the technical system parameters. We respond within one working day." },

  documents: {
    tag: "09 · DOCUMENTATION",
    title: "Documents and certificates",
    lede: "Specification sheet, certificates and manual — for design and acceptance.",
    items: [
      { id: "oprosnik", title: "Pumping-station specification sheet", size: "1.49 MB", href: "/docs/pressure-boost/oprosnyi-list.pdf" },
      { id: "cert-deklaratsiya", title: "EAEU Conformity Declaration — ANHEL® pressure-boosting units", size: "0.86 MB", href: "/docs/pressure-boost/cert-deklaratsiya.pdf" },
      { id: "manual", title: "Operating manual — ANHEL® SPD-type pumping stations", size: "61 KB", href: "/docs/pressure-boost/manual-en.pdf" },
    ],
  },

  footerCta: {
    tag: "10 · REQUEST A QUOTE",
    title: "Configure an APBU for your network",
    subtitle: "We respond within one working day. Sizing is free of charge.",
    cta: { label: "Open the specification sheet", href: "#documents" },
    neighboursCaption: "Other sections",
  },
};
