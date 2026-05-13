import type { ProductContent } from "../../../types";

export const content: ProductContent = {
  slug: "fire-suppression",
  accent: "fire",

  metaTitle: "Control cabinets for fire-suppression systems",
  metaDescription:
    "ANHEL® control cabinets for fire-suppression systems — deluge, sprinkler and class-B foam. Automatic start on the Fire signal, ATS, monitoring of the fire control panel and pressure switches. Up to 4 pumps rated up to 500 kW.",

  hero: {
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Catalogue", href: "/products" },
      { label: "Control cabinets", href: "/products/control-systems" },
      { label: "For fire-suppression systems" },
    ],
    sectionTag: "01 · CONTROL CABINETS · FIRE SUPPRESSION",
    title: "ANHEL® control cabinets for fire-suppression systems",
    subtitle:
      "Control of duty and jockey pumps that hold pressure and water reserve in fire-suppression systems — both in standby and during a fire. Automatic start on the Fire signal, priority of water for fire suppression, ATS on the supply side.",
    image: {
      src: "/assets/products/control-systems/fire-suppression/hero.png",
      alt: "ANHEL — control cabinet for fire-suppression systems, tall red enclosure with mimic diagram",
    },
    primaryCta: { label: "Request a quote", href: "#documents", variant: "primary" },
    secondaryCta: { label: "Specification sheet", href: "/quiz/control-systems", variant: "ghost" },
  },

  techSpecs: [
    { label: "Number of pumps", value: "1 – 4" },
    { label: "Power per pump", value: "0.37 – 500", unit: "kW" },
    { label: "Current rating", value: "1 – 3000", unit: "A" },
    { label: "Supply voltage", value: "380", unit: "V" },
    { label: "Power supply", value: "2 / 3 inputs with ATS" },
    { label: "Climate rating", value: "UKhL1 – UKhL4" },
    { label: "Control type", value: "local / remote" },
    { label: "Certification", value: "FZ-123 (fire safety)" },
  ],

  description: {
    tag: "03 · DESCRIPTION",
    title: "Purpose and operating principle",
    paragraphs: [
      "The ANHEL® control cabinet for fire suppression drives the duty and standby pumps with automatic start on the Fire signal received from the fire control panel. It supports sprinkler and deluge algorithms, operation with foam concentrate for class-B fires, and priority of water for fire-suppression duty.",
      "It monitors the integrity of the wiring back to the fire control panel, the pressure switches and the operator workstation. On duty-pump failure the standby pump starts automatically; on phase imbalance, phase loss or voltage deviation the cabinet transfers to the backup feed. Overload and short-circuit protection of the motors comes as standard.",
    ],
  },

  applications: {
    tag: "04 · APPLICATIONS",
    title: "Where it is deployed",
    lede: "Water and foam fire-suppression systems for residential, commercial and industrial sites.",
    items: [
      { id: "drencher", mono: "01", title: "Deluge systems", example: "Curtains, compartments, areas with high occupancy" },
      { id: "sprinkler", mono: "02", title: "Sprinkler systems", example: "Targeted suppression in commercial and warehouse property" },
      { id: "foam", mono: "03", title: "Foam suppression", example: "Class B — petroleum products, fuel depots, flammable-liquid stores" },
      { id: "combined", mono: "04", title: "Combined systems", example: "Domestic water + fire-water supply" },
      { id: "industrial", mono: "05", title: "Industrial sites", example: "Plants, warehouses, power-generation facilities" },
      { id: "residential", mono: "06", title: "Residential complexes", example: "Internal fire-water mains in high-rise housing, car parks" },
    ],
  },

  brands: {
    tag: "05 · BRANDS",
    title: "Industrial components",
    lede: "Compatibility with Orion and Rubezh fire panels, soft starters and ATS controllers.",
    rowPumps: [
      { id: "schneider", name: "Schneider Electric", series: "ATV320, ATV630" },
      { id: "abb", name: "ABB", series: "ACS580, PSE Soft Starter" },
      { id: "siemens", name: "Siemens", series: "Sirius, Sinamics" },
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
    lede: "FZ-123 fire-safety certification, reliability in emergencies and integration with fire alarm systems.",
    items: [
      { id: "fz123", mono: "01", title: "FZ-123 fire-safety certification", body: "Conformity with Russian fire-safety regulations — a mandatory requirement for automatic fire-suppression systems." },
      { id: "auto-start", mono: "02", title: "Auto-start on the Fire signal", body: "Direct input from the fire control panel, pressure switches and damper-position relays; monitoring of line integrity with open-circuit and short-circuit diagnostics." },
      { id: "avr", mono: "03", title: "ATS on 2 or 3 supply inputs", body: "Automatic transfer on phase imbalance, phase loss and voltage deviation — without operator intervention." },
      { id: "redundancy", mono: "04", title: "Pump redundancy", body: "Automatic start of the standby pump on duty-pump failure, with water-presence monitoring at each pump inlet." },
      { id: "integrations", mono: "05", title: "Orion and Rubezh integration", body: "Off-the-shelf variants for embedding into the site's existing fire alarm system." },
      { id: "documentation", mono: "06", title: "GOST assembly and full documentation pack", body: "Certificates, declarations and passports included. Designer support during the solution-development stage." },
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
    lede: "Completed projects with ANHEL® fire-suppression cabinets.",
    items: [
      { id: "evolution-tower", title: "Evolution Tower, Moscow-City", location: "Moscow", equipment: "Fire-pump control cabinets", photo: { alt: "Moscow-City, Evolution Tower" } },
      { id: "arcus", title: "Arcus 4 business centre", location: "Moscow", equipment: "31 cabinets (including fire suppression)", photo: { alt: "Arcus 4 business centre" } },
      { id: "warehouse", title: "Logistics centre", location: "Moscow region", equipment: "Cabinets for deluge and sprinkler systems", photo: { alt: "Logistics warehouse, Moscow region" } },
    ],
  },

  quiz: { tag: "09 · SPECIFICATION SHEET", title: "Sizing for your project", lede: "Seven steps — from contact details to the technical parameters of the fire-suppression system." },

  documents: {
    tag: "10 · DOCUMENTATION",
    title: "Documents and specification sheet",
    lede: "Specification sheet — PDF for design and acceptance, or online form with autosave.",
    items: [
      { id: "oprosnik-pdf", title: "Control-cabinet specification sheet (PDF)", size: "1.8 MB", href: "/docs/control-systems/oprosnyi-list-en.pdf" },
      { id: "oprosnik-online", title: "Fill in the specification sheet online", href: "/quiz/control-systems" },
    ],
  },

  footerCta: {
    tag: "11 · REQUEST A QUOTE",
    title: "Configure a fire-suppression cabinet for your project",
    subtitle: "We respond within one working day. Sizing is free of charge.",
    cta: { label: "Open the specification sheet", href: "/quiz/control-systems" },
    neighboursCaption: "Other sections",
  },
};
