import type { ProductContent } from "../../../types";

export const content: ProductContent = {
  slug: "electric-actuators",
  accent: "treatment",

  metaTitle: "Control cabinets for electric-actuated valves",
  metaDescription:
    "ANHEL® control cabinets for electric actuators on shut-off and modulating valves. Up to 5 valves, drive power 0.37–7.5 kW, direct-on-line start, local and remote control.",

  hero: {
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Catalogue", href: "/products" },
      { label: "Control cabinets", href: "/products/control-systems" },
      { label: "For electric-actuated valves" },
    ],
    sectionTag: "01 · CONTROL CABINETS · ACTUATED VALVES",
    title: "ANHEL® control cabinets for electric-actuated valves",
    subtitle:
      "Control of electric actuators on shut-off and modulating valves driven by signals from the supervisory system. Local mode — front-panel selector with valve-state indication. Remote mode — external discrete signals.",
    image: {
      src: "/assets/products/control-systems/electric-actuators/hero.png",
      alt: "ANHEL — control cabinet for electric-actuated valves, grey enclosure with valve-state indication",
    },
    primaryCta: { label: "Request a quote", href: "#documents", variant: "primary" },
    secondaryCta: { label: "Specification sheet", href: "/quiz/control-systems", variant: "ghost" },
  },

  techSpecs: [
    { label: "Number of valves", value: "1 – 5" },
    { label: "Actuator power", value: "0.37 – 7.5", unit: "kW" },
    { label: "Start method", value: "direct on line" },
    { label: "Supply voltage", value: "220 – 380", unit: "V" },
    { label: "Power supply", value: "single / dual ATS" },
    { label: "Control type", value: "local / remote" },
    { label: "Climate rating", value: "UKhL4 (opt. UKhL1, UKhL2)" },
    { label: "Protocols", value: "Modbus RTU/TCP" },
  ],

  description: {
    tag: "03 · DESCRIPTION",
    title: "Purpose and operating principle",
    paragraphs: [
      "The ANHEL® control cabinet for electric-actuated valves drives shut-off and modulating valve actuators — standard three-phase squirrel-cage asynchronous motors. Operation is based on processing input signals from the supervisory system.",
      "In local mode, opening and closing is performed from a front-panel selector with state indication. In remote mode, external discrete signals are processed and the cabinet generates control commands to the actuator. Overload, short-circuit and emergency protection are included as standard.",
    ],
  },

  applications: {
    tag: "04 · APPLICATIONS",
    title: "Where it is deployed",
    lede: "Shut-off and modulating valves in process pipelines.",
    items: [
      { id: "shutoff", mono: "01", title: "Shut-off valves", example: "Flow isolation in pumping stations" },
      { id: "control", mono: "02", title: "Modulating valves", example: "Holding process setpoints" },
      { id: "heating", mono: "03", title: "Heating", example: "Modulation of heating and DHW loops" },
      { id: "industrial", mono: "04", title: "Industry", example: "Process nodes with electric-actuated valves" },
      { id: "water-supply", mono: "05", title: "Water supply", example: "Mains-line valve control" },
      { id: "scada", mono: "06", title: "SCADA integration", example: "Discrete and Modbus control" },
    ],
  },

  brands: {
    tag: "05 · BRANDS",
    title: "Industrial components",
    lede: "Controllers, relays and power components from leading manufacturers.",
    rowPumps: [
      { id: "schneider", name: "Schneider Electric" },
      { id: "abb", name: "ABB" },
      { id: "siemens", name: "Siemens" },
      { id: "auma", name: "AUMA", series: "electric actuators" },
      { id: "regada", name: "Regada", series: "electric actuators" },
    ],
    rowComponents: [
      { id: "owen", name: "OWEN", href: "https://owen.ru/" },
      { id: "weintek", name: "Weintek", href: "https://www.weintek.com/" },
      { id: "dekraft", name: "DEKraft", href: "https://dekraft.ru/" },
      { id: "iek", name: "IEK", href: "https://www.iek.ru/" },
      { id: "ekf", name: "EKF", href: "https://ekfgroup.com/ru-ru" },
      { id: "finder", name: "Finder", href: "https://www.findernet.com/" },
      { id: "phoenix", name: "Phoenix Contact", href: "https://www.phoenixcontact.com/" },
    ],
  },

  advantages: {
    tag: "06 · ADVANTAGES",
    title: "Why ANHEL®",
    lede: "Precise control, protection and SCADA integration.",
    items: [
      { id: "modes", mono: "01", title: "Local and remote modes", body: "Switched from the front panel; in local mode a selector with valve-state indication." },
      { id: "protection", mono: "02", title: "Actuator protection", body: "Overload, short-circuit and emergency monitoring — longer valve service life." },
      { id: "modbus", mono: "03", title: "Modbus RTU/TCP", body: "Direct integration with the supervisory level — no extra gateways required." },
      { id: "avr", mono: "04", title: "Single or dual-feed ATS", body: "Dual feed with automatic transfer — for mission-critical process nodes." },
      { id: "compact", mono: "05", title: "Compact build", body: "Up to 5 valves in a single cabinet — saves floor space in the control room." },
      { id: "documentation", mono: "06", title: "Full documentation pack", body: "Certificates, declarations, passports and an operating manual — included with delivery." },
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
    lede: "Completed projects with ANHEL® valve-control cabinets.",
    items: [
      { id: "tula-pumps", title: "Tulachermet-Stal — pump automation", location: "Tula", equipment: "Control cabinets + software", photo: { alt: "Tulachermet-Stal, Tula" } },
      { id: "varton", title: "Varton plant", location: "Obninsk", equipment: "Industrial cooling system with electric-actuated valves", photo: { alt: "Varton plant, Obninsk" } },
      { id: "nasedkino", title: "Nasedkino gold-mining project", location: "Trans-Baikal", equipment: "34 control cabinets, valves included", photo: { alt: "Nasedkino gold-mining facility" } },
    ],
  },

  quiz: { tag: "09 · SPECIFICATION SHEET", title: "Sizing for your project", lede: "Seven steps — from contact details to valve-cabinet configuration." },

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
    title: "Configure a valve-control cabinet for your project",
    subtitle: "We respond within one working day. Sizing is free of charge.",
    cta: { label: "Open the specification sheet", href: "/quiz/control-systems" },
    neighboursCaption: "Other sections",
  },
};
