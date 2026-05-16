import type { ProductContent } from "../../../types";

export const content: ProductContent = {
  slug: "electric-actuators",
  accent: "treatment",

  metaTitle: "Elektrikli aktüatörlü vanalar için kontrol panoları",
  metaDescription:
    "Kesme ve kontrol vanalarındaki elektrikli aktüatörler için ANHEL® kontrol panoları. 5 vanaya kadar, sürücü gücü 0,37–7,5 kW, doğrudan yol verme, yerel ve uzak kontrol.",

  hero: {
    breadcrumbs: [
      { label: "Ana Sayfa", href: "/" },
      { label: "Katalog", href: "/products" },
      { label: "Kontrol panoları", href: "/products/control-systems" },
      { label: "Elektrikli aktüatörlü vanalar için" },
    ],
    sectionTag: "01 · KONTROL PANOLARI · AKTÜATÖRLÜ VANALAR",
    title: "Elektrikli aktüatörlü vanalar için ANHEL® kontrol panoları",
    subtitle:
      "Otomasyon sisteminden gelen sinyallere göre kesme ve kontrol vanalarındaki elektrikli aktüatörlerin yönetimi. Yerel mod — ön paneldeki seçici anahtar ve vana durum göstergesi. Uzak mod — harici dijital sinyaller.",
    image: {
      src: "/assets/products/control-systems/electric-actuators/hero.webp",
      alt: "ANHEL — elektrikli aktüatörlü vanalar için kontrol panosu, vana durum göstergeli gri pano",
    },
    primaryCta: { label: "Teklif iste", href: "#documents", variant: "primary" },
    secondaryCta: { label: "Teknik veri formu", href: "/quiz/control-systems", variant: "ghost" },
  },

  techSpecs: [
    { label: "Vana sayısı", value: "1 – 5" },
    { label: "Aktüatör gücü", value: "0,37 – 7,5", unit: "kW" },
    { label: "Yol verme yöntemi", value: "doğrudan (DOL)" },
    { label: "Besleme gerilimi", value: "220 – 380", unit: "V" },
    { label: "Güç beslemesi", value: "tek / ATS'li çift" },
    { label: "Kontrol tipi", value: "yerel / uzak" },
    { label: "İklim sınıfı", value: "UKhL4 (opsiyonel UKhL1, UKhL2)" },
    { label: "Protokoller", value: "Modbus RTU/TCP" },
  ],

  description: {
    tag: "03 · AÇIKLAMA",
    title: "Amaç ve çalışma prensibi",
    paragraphs: [
      "Elektrikli aktüatörlü vanalar için ANHEL® kontrol panosu, kesme ve kontrol vanalarındaki aktüatörleri — sincap kafesli asenkron üç fazlı motorları — yönetir. Çalışma, otomasyon sisteminden gelen giriş sinyallerinin işlenmesine dayanır.",
      "Yerel modda vananın açılması ve kapanması, durum göstergesiyle birlikte ön paneldeki seçici anahtardan yapılır. Uzak modda harici dijital sinyaller işlenir ve pano aktüatöre kumanda komutları üretir. Aşırı yük, kısa devre ve arıza korumaları standarttır.",
    ],
  },

  applications: {
    tag: "04 · UYGULAMALAR",
    title: "Nerelerde kullanılır",
    lede: "Proses hatlarındaki kesme ve kontrol vanaları.",
    items: [
      { id: "shutoff", mono: "01", title: "Kesme vanaları", example: "Pompa istasyonlarında akış izolasyonu" },
      { id: "control", mono: "02", title: "Kontrol vanaları", example: "Proses set noktalarının korunması" },
      { id: "heating", mono: "03", title: "Isıtma", example: "Isıtma ve DHW devrelerinin modülasyonu" },
      { id: "industrial", mono: "04", title: "Endüstri", example: "Elektrikli aktüatörlü vanaları olan proses üniteleri" },
      { id: "water-supply", mono: "05", title: "Su temini", example: "Ana hat vana kontrolü" },
      { id: "scada", mono: "06", title: "SCADA entegrasyonu", example: "Dijital ve Modbus kontrolü" },
    ],
  },

  brands: {
    tag: "05 · MARKALAR",
    title: "Endüstriyel bileşenler",
    lede: "Önde gelen üreticilerden kontrolörler, röleler ve güç bileşenleri.",
    rowPumps: [
      { id: "schneider", name: "Schneider Electric" },
      { id: "abb", name: "ABB" },
      { id: "siemens", name: "Siemens" },
      { id: "auma", name: "AUMA", series: "elektrikli aktüatörler" },
      { id: "regada", name: "Regada", series: "elektrikli aktüatörler" },
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
    tag: "06 · AVANTAJLAR",
    title: "Neden ANHEL®",
    lede: "Hassas kontrol, koruma ve SCADA entegrasyonu.",
    items: [
      { id: "modes", mono: "01", title: "Yerel ve uzak mod", body: "Ön panelden modlar arasında geçiş; yerel modda vana durum göstergeli seçici anahtar." },
      { id: "protection", mono: "02", title: "Aktüatör koruması", body: "Aşırı yük, kısa devre ve arıza durumu izlemesi — daha uzun vana ömrü." },
      { id: "modbus", mono: "03", title: "Modbus RTU/TCP", body: "Üst seviye SCADA ile doğrudan entegrasyon — ek ağ geçidi gerekmez." },
      { id: "avr", mono: "04", title: "Tek veya çift besleme ATS'i", body: "Otomatik transferli çift besleme — kritik proses üniteleri için." },
      { id: "compact", mono: "05", title: "Kompakt yapı", body: "Tek panoda 5 vanaya kadar — kontrol odasında zemin alanından tasarruf." },
      { id: "documentation", mono: "06", title: "Tam belge paketi", body: "Sertifikalar, beyannameler, pasaportlar ve kullanım kılavuzu — teslimata dahildir." },
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
    lede: "ANHEL® vana kontrol panolarıyla tamamlanmış projeler.",
    items: [
      { id: "tula-pumps", title: "Tulachermet-Stal — pompa otomasyonu", location: "Tula", equipment: "Kontrol panoları + yazılım", photo: { alt: "Tulachermet-Stal, Tula" } },
      { id: "varton", title: "Varton fabrikası", location: "Obninsk", equipment: "Elektrikli aktüatörlü endüstriyel soğutma sistemi", photo: { alt: "Varton fabrikası, Obninsk" } },
      { id: "nasedkino", title: "Nasedkino altın madeni projesi", location: "Trans-Baykal", equipment: "Vanalar dahil 34 kontrol panosu", photo: { alt: "Nasedkino altın madeni tesisi" } },
    ],
  },

  quiz: { tag: "09 · TEKNİK VERİ FORMU", title: "Projenize özel boyutlandırma", lede: "Yedi adım — iletişim bilgilerinden vana panosu konfigürasyonuna kadar." },

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
    title: "Projeniz için vana kontrol panosu yapılandırın",
    subtitle: "Bir iş günü içinde yanıt veriyoruz. Boyutlandırma ücretsizdir.",
    cta: { label: "Teknik veri formunu aç", href: "/quiz/control-systems" },
    neighboursCaption: "Diğer bölümler",
  },
};
