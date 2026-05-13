import type { ProductContent } from "../../../types";

export const content: ProductContent = {
  slug: "smoke-control",
  accent: "fire",

  metaTitle: "Control cabinets for smoke-control and air-pressurisation systems",
  metaDescription:
    "ANHEL® control cabinets for smoke-control ventilation — smoke extraction and air pressurisation. FZ-123 fire-safety certification, IP54+, monitoring of fans and dampers. For commercial, industrial and residential property.",

  hero: {
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Catalogue", href: "/products" },
      { label: "Control cabinets", href: "/products/control-systems" },
      { label: "For smoke control and air pressurisation" },
    ],
    sectionTag: "01 · CONTROL CABINETS · SMOKE CONTROL",
    title: "ANHEL® control cabinets for smoke-control ventilation",
    subtitle:
      "Control of smoke-extraction fans, dampers and air-pressurisation systems. Automatic transfer to smoke-extraction mode on the Fire signal. FZ-123 fire-safety certification, IP54+, distinctive red enclosure.",
    image: {
      src: "/assets/products/control-systems/smoke-control/hero.png",
      alt: "ANHEL — smoke-control ventilation cabinet, red enclosure with fan control elements",
    },
    primaryCta: { label: "Request a quote", href: "#documents", variant: "primary" },
    secondaryCta: { label: "Specification sheet", href: "/quiz/control-systems", variant: "ghost" },
  },

  techSpecs: [
    { label: "Power supply", value: "1 / 2 inputs with built-in ATS" },
    { label: "Supply voltage", value: "1×220 / 3×380", unit: "V" },
    { label: "Ingress protection", value: "IP54 (opt. up to IP69)" },
    { label: "Climate rating", value: "UKhL4 (opt. UKhL1, UKhL2)" },
    { label: "Enclosure", value: "red (fire-rated)" },
    { label: "Certification", value: "FZ-123 (fire safety)" },
    { label: "Damper control", value: "supported" },
    { label: "Control type", value: "local / remote" },
  ],

  description: {
    tag: "03 · DESCRIPTION",
    title: "Purpose and operating principle",
    paragraphs: [
      "The ANHEL® smoke-control cabinet is armed by the Fire signal, automatically starts the smoke-extraction and pressurisation fans, opens the fire dampers and monitors the integrity of the system as a whole. It supports any smoke-control topology — from single-storey to multi-zone schemes.",
      "It diagnoses incoming control wiring for open circuits and short circuits, checks motor windings, and transfers to the backup supply on a power fault. For protected-zone occupancy of people with reduced mobility, heater control is an option. The build supports operation in extreme smoke and high-temperature conditions.",
    ],
  },

  applications: {
    tag: "04 · APPLICATIONS",
    title: "Where it is deployed",
    lede: "Buildings of any type with a mandatory smoke-control system.",
    items: [
      { id: "commercial", mono: "01", title: "Commercial property", example: "Offices, shopping centres, hotels, mixed-use buildings" },
      { id: "residential", mono: "02", title: "Residential complexes", example: "High-rise housing, car parks, stair shafts" },
      { id: "industrial", mono: "03", title: "Industrial sites", example: "Production shops and warehouses with fire-hazard category" },
      { id: "mgn", mono: "04", title: "PRM safety zones", example: "Refuge areas for people with reduced mobility, with heater control" },
      { id: "tunnels", mono: "05", title: "Underground structures", example: "Tunnels, basement parking, technical floors" },
      { id: "social", mono: "06", title: "Public buildings", example: "Schools, kindergartens, hospitals — high-occupancy facilities" },
    ],
  },

  brands: {
    tag: "05 · BRANDS",
    title: "Industrial components",
    lede: "Compatibility with fire-alarm systems, soft starters and frequency drives.",
    rowPumps: [
      { id: "schneider", name: "Schneider Electric" },
      { id: "abb", name: "ABB", series: "PSE Soft Starter" },
      { id: "siemens", name: "Siemens", series: "Sirius" },
      { id: "instart", name: "INSTART" },
      { id: "vesper", name: "Vesper" },
    ],
    rowComponents: [
      { id: "bolid", name: "Bolid (Orion)", href: "https://bolid.ru/" },
      { id: "rubezh", name: "Rubezh", href: "https://rubezh.ru/" },
      { id: "owen", name: "OWEN", href: "https://owen.ru/" },
      { id: "weintek", name: "Weintek", href: "https://www.weintek.com/" },
      { id: "dekraft", name: "DEKraft", href: "https://dekraft.ru/" },
      { id: "iek", name: "IEK", href: "https://www.iek.ru/" },
      { id: "ekf", name: "EKF", href: "https://ekfgroup.com/ru-ru" },
      { id: "finder", name: "Finder", href: "https://www.findernet.com/" },
    ],
  },

  advantages: {
    tag: "06 · ADVANTAGES",
    title: "Why ANHEL®",
    lede: "Fire-safety certification, high ingress protection and line-integrity diagnostics.",
    items: [
      { id: "fz123", mono: "01", title: "FZ-123 fire-safety certification", body: "Verified operability as part of fire-protection systems — tested for resistance to high temperature and smoke." },
      { id: "ip54", mono: "02", title: "IP54+ ingress protection", body: "IP54 as standard with optional IP69 — for harsh service environments." },
      { id: "monitoring", mono: "03", title: "Line and winding monitoring", body: "Open-circuit and short-circuit diagnostics on the input wiring, motor-winding check — fault detection before failure." },
      { id: "modes", mono: "04", title: "Local and automatic modes", body: "Mode selection for testing and maintenance. Automatic transfer to smoke-extraction mode on the Fire signal." },
      { id: "redundancy", mono: "05", title: "Supply redundancy and ATS", body: "One or two inputs with built-in ATS; backup UPS feeds." },
      { id: "compliance", mono: "06", title: "Compliance with PB, SP and GOST", body: "Installation and operation to Russian fire-safety codes; red enclosure as the standard fire-rated marking." },
    ],
  },

  gallery: {
    tag: "07 · GALLERY",
    title: "From the factory floor",
    lede: "Photos will be published after retouching of the factory shots.",
    photos: [
      { id: "cabinets-01", src: "/assets/production/cabinets/cabinets-01.jpg", alt: "ANHEL — control cabinet manufacturing, photo 1", aspect: "4/5" },
      { id: "cabinets-02", src: "/assets/production/cabinets/cabinets-02.jpg", alt: "ANHEL — control cabinet manufacturing, photo 2", aspect: "4/5" },
      { id: "cabinets-03", src: "/assets/production/cabinets/cabinets-03.jpg", alt: "ANHEL — control cabinet manufacturing, photo 3", aspect: "4/5" },
      { id: "cabinets-04", src: "/assets/production/cabinets/cabinets-04.jpg", alt: "ANHEL — control cabinet manufacturing, photo 4", aspect: "4/5" },
      { id: "cabinets-05", src: "/assets/production/cabinets/cabinets-05.jpg", alt: "ANHEL — control cabinet manufacturing, photo 5", aspect: "4/5" },
      { id: "cabinets-06", src: "/assets/production/cabinets/cabinets-06.jpg", alt: "ANHEL — control cabinet manufacturing, photo 6", aspect: "4/5" },
      { id: "cabinets-07", src: "/assets/production/cabinets/cabinets-07.jpg", alt: "ANHEL — control cabinet manufacturing, photo 7", aspect: "4/5" },
      { id: "cabinets-08", src: "/assets/production/cabinets/cabinets-08.jpg", alt: "ANHEL — control cabinet manufacturing, photo 8", aspect: "4/5" },
      { id: "cabinets-09", src: "/assets/production/cabinets/cabinets-09.jpg", alt: "ANHEL — control cabinet manufacturing, photo 9", aspect: "4/5" },
      { id: "cabinets-10", src: "/assets/production/cabinets/cabinets-10.jpg", alt: "ANHEL — control cabinet manufacturing, photo 10", aspect: "4/5" },
      { id: "cabinets-11", src: "/assets/production/cabinets/cabinets-11.jpg", alt: "ANHEL — control cabinet manufacturing, photo 11", aspect: "4/5" },
      { id: "cabinets-12", src: "/assets/production/cabinets/cabinets-12.jpg", alt: "ANHEL — control cabinet manufacturing, photo 12", aspect: "4/5" },
      { id: "cabinets-13", src: "/assets/production/cabinets/cabinets-13.jpg", alt: "ANHEL — control cabinet manufacturing, photo 13", aspect: "4/5" },
    ],
  },

  cases: {
    tag: "08 · CASE STUDIES",
    title: "Already in operation",
    lede: "Completed projects with ANHEL® smoke-control cabinets.",
    items: [
      { id: "life-warsaw", title: "Life Varshavskaya residential complex", location: "Moscow", equipment: "50 smoke-control cabinets", photo: { alt: "Life Varshavskaya residential complex" } },
      { id: "arcus-smoke", title: "Arcus 4 business centre", location: "Moscow", equipment: "31 smoke-control cabinets", photo: { alt: "Arcus 4 business centre" } },
      { id: "nasedkino", title: "Nasedkino gold-mining project", location: "Trans-Baikal", equipment: "34 control cabinets including smoke control", photo: { alt: "Nasedkino gold-mining facility" } },
    ],
  },

  quiz: { tag: "09 · SPECIFICATION SHEET", title: "Sizing for your project", lede: "Seven steps — from contact details to the smoke-control system configuration." },

  documents: {
    tag: "10 · DOCUMENTATION",
    title: "Documents and specification sheet",
    lede: "Specification sheet — PDF for design and acceptance, or online form with autosave.",
    items: [
      { id: "oprosnik-pdf", title: "Control-cabinet specification sheet (PDF)", size: "1.8 MB", href: "/docs/control-systems/oprosnyi-list.pdf" },
      { id: "oprosnik-online", title: "Fill in the specification sheet online", href: "/quiz/control-systems" },
    ],
  },

  footerCta: {
    tag: "11 · REQUEST A QUOTE",
    title: "Configure a smoke-control cabinet for your project",
    subtitle: "We respond within one working day. Sizing is free of charge.",
    cta: { label: "Open the specification sheet", href: "/quiz/control-systems" },
    neighboursCaption: "Other sections",
  },
};
