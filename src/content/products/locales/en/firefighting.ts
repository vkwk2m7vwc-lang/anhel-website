import type { ProductContent } from "../../types";

export const content: ProductContent = {
  slug: "firefighting",
  accent: "fire",

  metaTitle: "ANHEL pumping stations for fire-protection systems",
  metaDescription:
    "ANHEL pumping stations for fire-protection systems. Deliver the required pressure and flow on standby and during a fire response. 2 to 6 pumps, DOL/VFD control, design life ≥ 10 years.",

  hero: {
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Catalogue", href: "/products" },
      { label: "Pumping stations", href: "/products/pumps" },
      { label: "Fire protection" },
    ],
    sectionTag: "01 · PUMPING STATIONS · FIRE PROTECTION",
    title: "ANHEL pumping stations for fire-protection systems",
    subtitle:
      "Units that maintain the required pressure and flow in the fire-protection system both on standby and during the increased demand of a fire response. Automatic start, hot redundancy and a complete set of regulatory documentation.",
    image: {
      src: "/assets/products/hvs-nu-red2.webp",
      alt: "ANHEL® — fire-protection pumping station in a red enclosure, HVS-NU series",
    },
    primaryCta: { label: "Fill in online", href: "/quiz/pumps?from=firefighting", variant: "primary" },
    secondaryCta: { label: "Specification sheet", href: "/docs/firefighting/oprosnyi-list.pdf", variant: "ghost" },
  },

  techSpecs: [
    { label: "Number of pumps", value: "2 – 6", unit: "standard" },
    { label: "DOL control", value: "with controller / with soft starter" },
    { label: "VFD control", value: "with controller / per-pump / with soft start" },
    { label: "Max. fluid temperature", value: "70", unit: "°C" },
    { label: "Mains voltage", value: "3 × 380", unit: "V" },
    { label: "Power per pump", value: "0.37 – 250", unit: "kW" },
    { label: "Rotation speed", value: "2900 / 1450", unit: "rpm" },
    { label: "Design life", value: "min. 10", unit: "years" },
  ],

  description: {
    tag: "03 · DESCRIPTION",
    title: "Purpose and operating principle",
    paragraphs: [
      "ANHEL fire-protection pumping stations maintain the required pressure and flow in sprinkler, hydrant and combined fire-protection systems. Automatic start on a signal from the fire alarm panel or on a system pressure drop, hot redundancy and condition monitoring on every pump.",
      "The unit is built on a single frame with a control cabinet and a full set of shut-off valves. The configuration — number of pumps, working pressure, control modes — is selected from the project parameters.",
    ],
  },

  applications: {
    tag: "04 · APPLICATIONS",
    title: "Where it is deployed",
    lede: "From residential complexes to infrastructure facilities. Every unit is built to the project.",
    items: [
      { id: "residential", mono: "01", title: "Residential complexes", example: "Dmitrovsky Park residential complex, Moscow" },
      { id: "business", mono: "02", title: "Office buildings", example: "Class-A office, 20+ floors" },
      { id: "retail", mono: "03", title: "Shopping centres", example: "Shopping centres with covered car parks" },
      { id: "industrial", mono: "04", title: "Industrial sites", example: "Warehouses, production halls" },
      { id: "hotels", mono: "05", title: "Hotels", example: "4–5★ hotels, apart-hotels" },
      { id: "infrastructure", mono: "06", title: "Infrastructure facilities", example: "Airports, railway stations, stadiums" },
    ],
  },

  brands: {
    tag: "05 · BRANDS",
    title: "Built from globally recognised equipment",
    lede: "Pumps from proven manufacturers; automation in-house and imported.",
    rowPumps: [
      { id: "aquadeus", name: "AquaDeus", series: "RCP, RHP", href: "https://aquadeus.ru/" },
      { id: "cnp", name: "CNP", series: "NIS, TD", href: "https://www.cnppumps.com/" },
      { id: "wilo", name: "Wilo", series: "Helix, SCP", href: "https://wilo.com/ru/ru/" },
      { id: "lowara", name: "Lowara", series: "e-SV, NSC", href: "https://www.xylem.com/ru-ru/brands/lowara/" },
      { id: "leo", name: "Leo", series: "Lez", href: "https://www.leo.cn/" },
      { id: "gms", name: "HMS", series: "KM", href: "https://hms.ru/" },
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
    tag: "06 · ADVANTAGES",
    title: "Why ANHEL®",
    lede: "Serial production, quality control and our own automation.",
    items: [
      { id: "serial", mono: "01", title: "Serial production", body: "Professional assembly cycle — not improvised on-site assembly." },
      { id: "custom", mono: "02", title: "Built to design brief", body: "Assembly to the client's brief, flexible project-specific configuration." },
      { id: "qc", mono: "03", title: "Quality control", body: "Every station undergoes hydraulic and electrical testing before shipment." },
      { id: "control-modes", mono: "04", title: "Multiple control modes", body: "DOL, VFD, controller with soft start — matched to the site's duty." },
      { id: "reliability", mono: "05", title: "Reliability and long service life", body: "Full average service life of at least 10 years in normal operation." },
      { id: "documentation", mono: "06", title: "Complete documentation set", body: "Regulatory and operational documents — all certificates and passports supplied." },
    ],
  },

  gallery: {
    tag: "07 · GALLERY",
    title: "From the factory floor",
    photos: [
      { id: "firefighting-01", src: "/assets/production/firefighting/firefighting-01.jpg", alt: "ANHEL — fire-protection station in manufacturing, photo 1", aspect: "4/5" },
      { id: "firefighting-02", src: "/assets/production/firefighting/firefighting-02.jpg", alt: "ANHEL — fire-protection station in manufacturing, photo 2", aspect: "4/5" },
      { id: "firefighting-03", src: "/assets/production/firefighting/firefighting-03.jpg", alt: "ANHEL — fire-protection station in manufacturing, photo 3", aspect: "4/5" },
      { id: "firefighting-04", src: "/assets/production/firefighting/firefighting-04.jpg", alt: "ANHEL — fire-protection station in manufacturing, photo 4", aspect: "4/5" },
      { id: "firefighting-05", src: "/assets/production/firefighting/firefighting-05.jpg", alt: "ANHEL — fire-protection station in manufacturing, photo 5", aspect: "4/5" },
      { id: "firefighting-06", src: "/assets/production/firefighting/firefighting-06.jpg", alt: "ANHEL — fire-protection station in manufacturing, photo 6", aspect: "4/5" },
      { id: "firefighting-07", src: "/assets/production/firefighting/firefighting-07.jpg", alt: "ANHEL — fire-protection station in manufacturing, photo 7", aspect: "4/5" },
      { id: "firefighting-08", src: "/assets/production/firefighting/firefighting-08.jpg", alt: "ANHEL — fire-protection station in manufacturing, photo 8", aspect: "4/5" },
      { id: "firefighting-09", src: "/assets/production/firefighting/firefighting-09.jpg", alt: "ANHEL — fire-protection station in manufacturing, photo 9", aspect: "4/5" },
      { id: "firefighting-10", src: "/assets/production/firefighting/firefighting-10.jpg", alt: "ANHEL — fire-protection station in manufacturing, photo 10", aspect: "4/5" },
      { id: "firefighting-11", src: "/assets/production/firefighting/firefighting-11.jpg", alt: "ANHEL — fire-protection station in manufacturing, photo 11", aspect: "4/5" },
    ],
  },

  cases: {
    tag: "08 · CASE STUDIES",
    title: "Already in operation",
    lede: "Residential complexes and industrial sites running our stations.",
    items: [
      { id: "zhk-dmitrovsky", title: "Dmitrovsky Park residential complex", location: "Moscow, 2023", equipment: "5 ANHEL HVS-NU pumping units for sprinkler", photo: { alt: "Dmitrovsky Park residential complex, general view" } },
      { id: "zhk-odingrad", title: "Odingrad residential complex", location: "Odintsovo, 2022", equipment: "ANHEL HVS-NU sprinkler pumping unit", photo: { alt: "Odingrad residential complex, general view" } },
    ],
  },

  quiz: { tag: "09 · SPECIFICATION SHEET", title: "Sizing for your project", lede: "Six steps — from contact details to the technical system parameters. We respond within one working day." },

  documents: {
    tag: "10 · DOCUMENTATION",
    title: "Documents and certificates",
    lede: "EAEU Conformity Declaration, specification sheet and manual — for design and acceptance.",
    items: [
      { id: "oprosnik", title: "Pumping-station specification sheet", size: "1.49 MB", href: "/docs/firefighting/oprosnyi-list.pdf" },
      { id: "cert-deklaratsiya", title: "EAEU Conformity Declaration — ANHEL® fire-protection pumping stations", size: "0.86 MB", href: "/docs/firefighting/cert-deklaratsiya.pdf" },
      { id: "manual", title: "Operating manual — ANHEL® SPD-type pumping stations", size: "1.41 MB", href: "/docs/firefighting/manual.pdf" },
    ],
  },

  footerCta: {
    tag: "11 · REQUEST A QUOTE",
    title: "Configure your station to the project",
    subtitle: "We respond within one working day. Sizing is free of charge.",
    cta: { label: "Open the specification sheet", href: "#documents" },
    neighboursCaption: "Other sections",
  },
};
