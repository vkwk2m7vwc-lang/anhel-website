import type { ProductContent } from "../../../types";

export const content: ProductContent = {
  slug: "variable-frequency",
  accent: "water",

  metaTitle: "Variable-frequency control cabinets",
  metaDescription:
    "ANHEL® variable-frequency control cabinets for pressure-boosting pumps. PID control, soft start, cascade control of up to 6 pumps up to 500 kW. For domestic hot water, cold-water supply, heating and cooling.",

  hero: {
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Catalogue", href: "/products" },
      { label: "Control cabinets", href: "/products/control-systems" },
      { label: "Variable-frequency" },
    ],
    sectionTag: "01 · CONTROL CABINETS · VARIABLE-FREQUENCY",
    title: "ANHEL® variable-frequency control cabinets",
    subtitle:
      "Control of pressure-boosting pump groups with asynchronous motors. PID control, soft start, cascade control of up to 6 pumps. For cold-water, DHW, heating, cooling systems and modernisation of existing pumping stations.",
    image: {
      src: "/assets/products/control-systems/variable-frequency/hero.webp",
      alt: "ANHEL — variable-frequency control cabinet, 4-section assembly with HMI and controller",
    },
    primaryCta: { label: "Request a quote", href: "#documents", variant: "primary" },
    secondaryCta: { label: "Specification sheet", href: "/quiz/control-systems", variant: "ghost" },
  },

  techSpecs: [
    { label: "Number of pumps", value: "1 – 6" },
    { label: "Power per pump", value: "0.37 – 500", unit: "kW" },
    { label: "Current rating", value: "1 – 4000", unit: "A" },
    { label: "Supply voltage", value: "3×380 / 660 V / 6 / 10", unit: "kV" },
    { label: "Start method", value: "VFD / soft starter / DOL" },
    { label: "Power supply", value: "single / dual ATS" },
    { label: "Climate rating", value: "UKhL1 – UKhL4" },
    { label: "Control type", value: "local / remote" },
  ],

  description: {
    tag: "03 · DESCRIPTION",
    title: "Purpose and operating principle",
    paragraphs: [
      "The ANHEL® variable-frequency control cabinet handles pump groups of 1 to 6 units with automatic duty / standby rotation, running-hours equalisation and cascade pressure control.",
      "With three or more pumps the frequency drive modulates the lead pump's speed; when capacity is reached the next pump joins, and at peak demand a third pump runs direct on line. The scheme suppresses water hammer, extends pump life and lowers energy consumption.",
    ],
  },

  applications: {
    tag: "04 · APPLICATIONS",
    title: "Where it is deployed",
    lede: "From residential developments to industrial pump rooms — wherever stable pressure and a smooth start are required.",
    items: [
      { id: "residential", mono: "01", title: "Residential and high-rise", example: "Cold-water and DHW systems in residential complexes" },
      { id: "commercial", mono: "02", title: "Commercial property", example: "Offices, shopping centres, hotels — pressure boosting" },
      { id: "heating", mono: "03", title: "Heating", example: "Circulation loops of closed systems" },
      { id: "cooling", mono: "04", title: "Air conditioning", example: "Chiller / fan-coil, chilled-water loops" },
      { id: "modernization", mono: "05", title: "Utility upgrades", example: "Replacement of obsolete cabinets at CHP and pumping stations" },
      { id: "industrial", mono: "06", title: "Industry", example: "Process pumping with variable flow" },
    ],
  },

  brands: {
    tag: "05 · BRANDS",
    title: "Industrial components",
    lede: "Frequency drives, controllers and automation — from global and Russian manufacturers.",
    rowPumps: [
      { id: "schneider", name: "Schneider Electric", series: "ATV320, ATV630" },
      { id: "abb", name: "ABB", series: "ACS580, ACS880" },
      { id: "siemens", name: "Siemens", series: "Sinamics G120" },
      { id: "danfoss", name: "Danfoss", series: "VLT FC202" },
      { id: "instart", name: "INSTART", series: "MCI, FCI" },
      { id: "vesper", name: "Vesper", series: "EI-9011" },
    ],
    rowComponents: [
      { id: "weintek", name: "Weintek", series: "MT8000", href: "https://www.weintek.com/" },
      { id: "owen", name: "OWEN", series: "PLC110", href: "https://owen.ru/" },
      { id: "dekraft", name: "DEKraft", href: "https://dekraft.ru/" },
      { id: "iek", name: "IEK", href: "https://www.iek.ru/" },
      { id: "keaz", name: "KEAZ", href: "https://keaz.ru/" },
      { id: "ekf", name: "EKF", href: "https://ekfgroup.com/ru-ru" },
      { id: "finder", name: "Finder", href: "https://www.findernet.com/" },
      { id: "phoenix", name: "Phoenix Contact", href: "https://www.phoenixcontact.com/" },
    ],
  },

  advantages: {
    tag: "06 · ADVANTAGES",
    title: "Why ANHEL®",
    lede: "Flexible bill-of-materials, PID control and built-in SCADA integration.",
    items: [
      { id: "pid", mono: "01", title: "PID control", body: "Precise pressure holding through speed modulation." },
      { id: "soft-start", mono: "02", title: "Soft start and stop", body: "Lower inrush currents, water-hammer protection, longer pump life." },
      { id: "cascade", mono: "03", title: "Cascade control", body: "Flexible group configurations for up to 6 pumps with priority and ATS." },
      { id: "modbus", mono: "04", title: "SCADA integration", body: "Modbus TCP, EasyAccess, VNC + dry contacts for remote monitoring." },
      { id: "protection", mono: "05", title: "Comprehensive protection", body: "Phase monitoring, dry-run, differential pressure, flow switch, motor thermal protection." },
      { id: "qc", mono: "06", title: "GOST assembly and TR TS certification", body: "Factory assembly, quality control, declarations and certificates included." },
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
    lede: "Completed projects with ANHEL® control cabinets.",
    items: [
      { id: "moscow-osk", title: "Capital construction project", location: "Moscow", equipment: "Automation cabinet + distribution cabinet", photo: { alt: "Capital construction site, Moscow" } },
      { id: "sibcable-cooling", title: "Sibkabel — shop cooling system", location: "Tomsk", equipment: "Chilled-water loop automation", photo: { alt: "Production shop, Tomsk" } },
      { id: "tula-pumps", title: "Tulachermet-Stal", location: "Tula", equipment: "Pump-system automation and software", photo: { alt: "Industrial pumping station, Tula" } },
    ],
  },

  quiz: { tag: "09 · SPECIFICATION SHEET", title: "Sizing for your project", lede: "Seven steps — from contact details to the cabinet's technical parameters. We respond within one working day." },

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
    title: "Configure a control cabinet for your project",
    subtitle: "We respond within one working day. Sizing is free of charge.",
    cta: { label: "Open the specification sheet", href: "/quiz/control-systems" },
    neighboursCaption: "Other sections",
  },
};
