import type { ProductContent } from "../../../types";

export const content: ProductContent = {
  slug: "sewage-pumping",
  accent: "water",

  metaTitle: "Control cabinets for sewage-pumping stations",
  metaDescription:
    "ANHEL® control cabinets for sewage-pumping stations (KNS), drainage pumps, stormwater drainage and storage tanks. Up to 4 pumps, float switches and level transmitters, Modbus RTU/TCP and Profibus DP.",

  hero: {
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Catalogue", href: "/products" },
      { label: "Control cabinets", href: "/products/control-systems" },
      { label: "For sewage-pumping stations" },
    ],
    sectionTag: "01 · CONTROL CABINETS · SEWAGE PUMPING",
    title: "ANHEL® control cabinets for sewage-pumping stations",
    subtitle:
      "Control of drainage and sewage pumps, stormwater and foul-water flows, and storage tanks. Inputs from float switches, electrodes and level transmitters. Local and automatic modes — switched from the front panel.",
    image: {
      src: "/assets/products/control-systems/sewage-pumping/hero.png",
      alt: "ANHEL — control cabinet for sewage-pumping stations, grey enclosure with a transparent door",
    },
    primaryCta: { label: "Request a quote", href: "#documents", variant: "primary" },
    secondaryCta: { label: "Specification sheet", href: "/quiz/control-systems", variant: "ghost" },
  },

  techSpecs: [
    { label: "Number of pumps", value: "1 – 4" },
    { label: "Power per pump", value: "0.37 – 500", unit: "kW" },
    { label: "Current rating", value: "1 – 5000", unit: "A" },
    { label: "Supply voltage", value: "3×380", unit: "V" },
    { label: "Start method", value: "DOL / soft start / VFD" },
    { label: "Power supply", value: "single / dual ATS" },
    { label: "Climate rating", value: "UKhL1, UKhL4 (0…+40 °C)" },
    { label: "Protocols", value: "Modbus RTU/TCP, Profibus DP" },
  ],

  description: {
    tag: "03 · DESCRIPTION",
    title: "Purpose and operating principle",
    paragraphs: [
      "The ANHEL® control cabinet for sewage-pumping stations (KNS) automates pumping stations of every kind — from drainage sumps to sewage-transfer stations for wastewater. It is driven by external level sensors (float switches, electrodes, level transmitters) and shows the state of each pump and each float switch on the front panel.",
      "Local mode allows pump start/stop from the front panel; automatic mode is driven by the level sensors. Motor protection, voltage monitoring and audible alarm come as standard. Integration with supervisory systems via Modbus RTU/TCP and Profibus DP.",
    ],
  },

  applications: {
    tag: "04 · APPLICATIONS",
    title: "Where it is deployed",
    lede: "Wherever automatic liquid transfer and level monitoring are required.",
    items: [
      { id: "kns", mono: "01", title: "Sewage-pumping stations", example: "Wastewater and foul-water transfer" },
      { id: "drainage", mono: "02", title: "Drainage sumps", example: "Discharge from basements, technical floors, tunnels" },
      { id: "stormwater", mono: "03", title: "Stormwater drainage", example: "Control of stormwater pumps" },
      { id: "treatment", mono: "04", title: "Treatment works", example: "Transfer and process-liquid feed" },
      { id: "tanks", mono: "05", title: "Tanks and reservoirs", example: "Fill control of storage tanks" },
      { id: "construction", mono: "06", title: "Construction pits", example: "Groundwater discharge during construction" },
    ],
  },

  brands: {
    tag: "05 · BRANDS",
    title: "Industrial components",
    lede: "Float switches, level transmitters and controllers from leading manufacturers.",
    rowPumps: [
      { id: "schneider", name: "Schneider Electric" },
      { id: "abb", name: "ABB" },
      { id: "siemens", name: "Siemens" },
      { id: "instart", name: "INSTART" },
      { id: "vesper", name: "Vesper" },
    ],
    rowComponents: [
      { id: "owen", name: "OWEN", href: "https://owen.ru/" },
      { id: "weintek", name: "Weintek", href: "https://www.weintek.com/" },
      { id: "vega", name: "Vega", series: "level transmitters" },
      { id: "endress", name: "Endress+Hauser", href: "https://www.endress.com/" },
      { id: "dekraft", name: "DEKraft", href: "https://dekraft.ru/" },
      { id: "iek", name: "IEK", href: "https://www.iek.ru/" },
      { id: "ekf", name: "EKF", href: "https://ekfgroup.com/ru-ru" },
      { id: "finder", name: "Finder", href: "https://www.findernet.com/" },
    ],
  },

  advantages: {
    tag: "06 · ADVANTAGES",
    title: "Why ANHEL®",
    lede: "Support for several level-sensor types and supervisory protocols.",
    items: [
      { id: "sensors", mono: "01", title: "Float switches, electrodes, level transmitters", body: "Flexible integration of any level-sensor type — choose the right solution for the site." },
      { id: "modes", mono: "02", title: "Local and automatic modes", body: "Mode selection for commissioning and maintenance; per-pump status indication." },
      { id: "protocols", mono: "03", title: "Modbus RTU/TCP, Profibus DP", body: "Direct integration with supervisory systems — no extra gateways required." },
      { id: "starts", mono: "04", title: "DOL, soft start and VFD", body: "Flexibility on start method — lower inrush currents and less wear on the pumping equipment." },
      { id: "alarm", mono: "05", title: "Audible alarm and supply monitoring", body: "Operator notification on alarms; voltage and phase monitoring as standard." },
      { id: "documentation", mono: "06", title: "GOST assembly and TR TS certification", body: "Factory assembly, quality control, declarations and passports — included with delivery." },
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
    lede: "Completed projects with ANHEL® control cabinets for KNS and treatment works.",
    items: [
      { id: "primorye-treatment", title: "Treatment works, Primorye", location: "Artyom, Primorsky Krai", equipment: "KNS control cabinets", photo: { alt: "Treatment works, Primorsky Krai" } },
      { id: "mriya", title: "Mriya Resort & SPA", location: "Yalta, Crimea", equipment: "Control-cabinet system", photo: { alt: "Mriya Resort, Yalta" } },
      { id: "industrial-zone", title: "Industrial site", location: "Moscow region", equipment: "Cabinets for drainage and KNS", photo: { alt: "Industrial site, Moscow region" } },
    ],
  },

  quiz: { tag: "09 · SPECIFICATION SHEET", title: "Sizing for your project", lede: "Seven steps — from contact details to the technical parameters of the KNS." },

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
    title: "Configure a KNS control cabinet for your project",
    subtitle: "We respond within one working day. Sizing is free of charge.",
    cta: { label: "Open the specification sheet", href: "/quiz/control-systems" },
    neighboursCaption: "Other sections",
  },
};
