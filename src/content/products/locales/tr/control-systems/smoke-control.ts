import type { ProductContent } from "../../../types";

export const content: ProductContent = {
  slug: "smoke-control",
  accent: "fire",

  metaTitle: "Duman tahliye ve basınçlandırma sistemleri için kontrol panoları",
  metaDescription:
    "ANHEL® duman tahliye havalandırması için kontrol panoları — duman tahliyesi ve hava basınçlandırma. FZ-123 yangın sertifikası, IP54+, fan ve damper izleme. Ticari, endüstriyel ve konut tesisleri için.",

  hero: {
    breadcrumbs: [
      { label: "Ana Sayfa", href: "/" },
      { label: "Katalog", href: "/products" },
      { label: "Kontrol panoları", href: "/products/control-systems" },
      { label: "Duman tahliye ve hava basınçlandırma için" },
    ],
    sectionTag: "01 · KONTROL PANOLARI · DUMAN TAHLİYE",
    title: "Duman tahliye havalandırması için ANHEL® kontrol panoları",
    subtitle:
      "Duman tahliye fanlarının, damperlerin ve hava basınçlandırma sistemlerinin yönetimi. «Yangın» sinyaliyle duman tahliye moduna otomatik geçiş. FZ-123 yangın güvenliği sertifikası, IP54+, ayırt edici kırmızı gövde.",
    image: {
      src: "/assets/products/control-systems/smoke-control/hero.webp",
      alt: "ANHEL — duman tahliye havalandırması kontrol panosu, fan kumanda elemanlı kırmızı gövde",
    },
    primaryCta: { label: "Teklif iste", href: "#documents", variant: "primary" },
    secondaryCta: { label: "Teknik veri formu", href: "/quiz/control-systems", variant: "ghost" },
  },

  techSpecs: [
    { label: "Güç beslemesi", value: "Dahili ATS'li 1 / 2 giriş" },
    { label: "Besleme gerilimi", value: "1×220 / 3×380", unit: "V" },
    { label: "Koruma sınıfı", value: "IP54 (opsiyonel IP69'a kadar)" },
    { label: "İklim sınıfı", value: "UKhL4 (opsiyonel UKhL1, UKhL2)" },
    { label: "Gövde", value: "kırmızı (yangın güvenliği)" },
    { label: "Sertifikasyon", value: "FZ-123 (yangın güvenliği)" },
    { label: "Damper kontrolü", value: "destekleniyor" },
    { label: "Kontrol tipi", value: "yerel / uzak" },
  ],

  description: {
    tag: "03 · AÇIKLAMA",
    title: "Amaç ve çalışma prensibi",
    paragraphs: [
      "ANHEL® duman tahliye panosu, «Yangın» sinyaliyle devreye girer, duman tahliye ve basınçlandırma fanlarını otomatik olarak başlatır, yangın damperlerini açar ve sistemin bütünlüğünü izler. Tek katlı şemalardan çok bölgeli şemalara kadar her tür duman tahliye topolojisini destekler.",
      "Giriş kabloları üzerinde açık devre ve kısa devre teşhisi yapar, motor sargılarını kontrol eder ve bir güç arızasında yedek beslemeye geçer. Hareket kısıtlı kişilerin korunaklı bölgeleri için ısıtıcı kontrolü opsiyoneldir. Pano, yoğun duman ve yüksek sıcaklık koşullarında çalışacak şekilde tasarlanmıştır.",
    ],
  },

  applications: {
    tag: "04 · UYGULAMALAR",
    title: "Nerelerde kullanılır",
    lede: "Zorunlu duman tahliye sistemi gereken her tür bina.",
    items: [
      { id: "commercial", mono: "01", title: "Ticari gayrimenkul", example: "İş merkezleri, AVM'ler, oteller, çok amaçlı binalar" },
      { id: "residential", mono: "02", title: "Konut kompleksleri", example: "Yüksek katlı konutlar, otoparklar, merdiven boşlukları" },
      { id: "industrial", mono: "03", title: "Endüstriyel tesisler", example: "Yangın tehlike sınıflandırmalı üretim atölyeleri ve depolar" },
      { id: "mgn", mono: "04", title: "Hareket kısıtlı kişiler bölgeleri", example: "Isıtıcı kontrolüyle korunaklı sığınma alanları" },
      { id: "tunnels", mono: "05", title: "Yer altı yapıları", example: "Tüneller, bodrum otoparkları, teknik katlar" },
      { id: "social", mono: "06", title: "Kamu binaları", example: "Okullar, anaokulları, hastaneler — yüksek doluluklu tesisler" },
    ],
  },

  brands: {
    tag: "05 · MARKALAR",
    title: "Endüstriyel bileşenler",
    lede: "Yangın alarm sistemleri, yumuşak yol vericiler ve frekans sürücüleriyle uyum.",
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
    tag: "06 · AVANTAJLAR",
    title: "Neden ANHEL®",
    lede: "Yangın güvenliği sertifikası, yüksek koruma derecesi ve hat bütünlüğü teşhisi.",
    items: [
      { id: "fz123", mono: "01", title: "FZ-123 yangın güvenliği sertifikası", body: "Yangın koruma sistemlerinin parçası olarak çalışabilirliği onaylı — yüksek sıcaklık ve dumana karşı test edilmiştir." },
      { id: "ip54", mono: "02", title: "IP54+ koruma sınıfı", body: "Standart IP54, opsiyonel IP69 — zorlu işletim koşulları için." },
      { id: "monitoring", mono: "03", title: "Hat ve sargı izleme", body: "Giriş kablolarında açık devre ve kısa devre teşhisi, motor sargı kontrolü — arıza oluşmadan önce tespit." },
      { id: "modes", mono: "04", title: "Yerel ve otomatik mod", body: "Test ve bakım için mod seçimi. «Yangın» sinyaliyle duman tahliye moduna otomatik geçiş." },
      { id: "redundancy", mono: "05", title: "Besleme yedekliliği ve ATS", body: "Dahili ATS'li bir veya iki giriş; yedek UPS beslemeleri." },
      { id: "compliance", mono: "06", title: "PB, SP ve GOST uyumu", body: "Rus yangın güvenliği yönetmeliklerine uygun montaj ve işletim; kırmızı gövde yangın güvenliği işaretidir." },
    ],
  },

  gallery: {
    tag: "07 · GALERİ",
    title: "Üretimden",
    lede: "Fotoğraflar fabrika çekimleri rötuşlandıktan sonra yayınlanacak.",
    photos: [
      { id: "cabinets-01", src: "/assets/production/cabinets/cabinets-01.jpg", alt: "ANHEL — kontrol panosu üretimi, fotoğraf 1", aspect: "4/5" },
      { id: "cabinets-02", src: "/assets/production/cabinets/cabinets-02.jpg", alt: "ANHEL — kontrol panosu üretimi, fotoğraf 2", aspect: "4/5" },
      { id: "cabinets-03", src: "/assets/production/cabinets/cabinets-03.jpg", alt: "ANHEL — kontrol panosu üretimi, fotoğraf 3", aspect: "4/5" },
      { id: "cabinets-04", src: "/assets/production/cabinets/cabinets-04.jpg", alt: "ANHEL — kontrol panosu üretimi, fotoğraf 4", aspect: "4/5" },
      { id: "cabinets-05", src: "/assets/production/cabinets/cabinets-05.jpg", alt: "ANHEL — kontrol panosu üretimi, fotoğraf 5", aspect: "4/5" },
      { id: "cabinets-06", src: "/assets/production/cabinets/cabinets-06.jpg", alt: "ANHEL — kontrol panosu üretimi, fotoğraf 6", aspect: "4/5" },
      { id: "cabinets-07", src: "/assets/production/cabinets/cabinets-07.jpg", alt: "ANHEL — kontrol panosu üretimi, fotoğraf 7", aspect: "4/5" },
      { id: "cabinets-08", src: "/assets/production/cabinets/cabinets-08.jpg", alt: "ANHEL — kontrol panosu üretimi, fotoğraf 8", aspect: "4/5" },
      { id: "cabinets-09", src: "/assets/production/cabinets/cabinets-09.jpg", alt: "ANHEL — kontrol panosu üretimi, fotoğraf 9", aspect: "4/5" },
      { id: "cabinets-10", src: "/assets/production/cabinets/cabinets-10.jpg", alt: "ANHEL — kontrol panosu üretimi, fotoğraf 10", aspect: "4/5" },
      { id: "cabinets-11", src: "/assets/production/cabinets/cabinets-11.jpg", alt: "ANHEL — kontrol panosu üretimi, fotoğraf 11", aspect: "4/5" },
      { id: "cabinets-12", src: "/assets/production/cabinets/cabinets-12.jpg", alt: "ANHEL — kontrol panosu üretimi, fotoğraf 12", aspect: "4/5" },
      { id: "cabinets-13", src: "/assets/production/cabinets/cabinets-13.jpg", alt: "ANHEL — kontrol panosu üretimi, fotoğraf 13", aspect: "4/5" },
    ],
  },

  cases: {
    tag: "08 · VAKA ÇALIŞMALARI",
    title: "Halihazırda çalışıyor",
    lede: "ANHEL® duman tahliye panolarıyla tamamlanmış projeler.",
    items: [
      { id: "life-warsaw", title: "Life Varshavskaya konut kompleksi", location: "Moskova", equipment: "50 duman tahliye panosu", photo: { alt: "Life Varshavskaya konut kompleksi" } },
      { id: "arcus-smoke", title: "Arcus 4 iş merkezi", location: "Moskova", equipment: "31 duman tahliye panosu", photo: { alt: "Arcus 4 iş merkezi" } },
      { id: "nasedkino", title: "Nasedkino altın madeni projesi", location: "Trans-Baykal", equipment: "Duman tahliye dahil 34 kontrol panosu", photo: { alt: "Nasedkino altın madeni tesisi" } },
    ],
  },

  quiz: { tag: "09 · TEKNİK VERİ FORMU", title: "Projenize özel boyutlandırma", lede: "Yedi adım — iletişim bilgilerinden duman tahliye sistemi konfigürasyonuna kadar." },

  documents: {
    tag: "10 · BELGELER",
    title: "Belgeler ve teknik veri formu",
    lede: "Teknik veri formu — tasarım ve kabul için PDF veya otomatik kaydetmeli çevrimiçi form.",
    items: [
      { id: "oprosnik-pdf", title: "Kontrol panosu teknik veri formu (PDF)", size: "1,8 MB", href: "/docs/control-systems/oprosnyi-list-tr.pdf" },
      { id: "oprosnik-online", title: "Teknik veri formunu çevrimiçi doldur", href: "/quiz/control-systems" },
    ],
  },

  footerCta: {
    tag: "11 · TEKLİF TALEBİ",
    title: "Projeniz için duman tahliye panosu yapılandırın",
    subtitle: "Bir iş günü içinde yanıt veriyoruz. Boyutlandırma ücretsizdir.",
    cta: { label: "Teknik veri formunu aç", href: "/quiz/control-systems" },
    neighboursCaption: "Diğer bölümler",
  },
};
