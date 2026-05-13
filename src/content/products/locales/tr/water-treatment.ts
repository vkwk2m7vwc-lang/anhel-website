import type { ProductContent } from "../../types";

/**
 * Su arıtma ünitesi — içerik dosyası, Türkçe.
 *
 * Endüstriyel mühendislik tonu. Marka adları Latince kalır. Su arıtma
 * terminolojisi: 'ters osmoz', 'yumuşatma', 'demir giderme', 'rejenerasyon'.
 */
export const content: ProductContent = {
  slug: "water-treatment",
  accent: "treatment",

  metaTitle: "ANHEL su arıtma üniteleri",
  metaDescription:
    "ANHEL su arıtma üniteleri — enerji verimli otomasyon ve önde gelen küresel üreticilerden bileşenlere sahip yüksek teknolojili ekipman. Filtreleme, yumuşatma, demir giderme, ters osmoz. Endüstri, gıda üretimi ve konut yapıları için.",

  hero: {
    breadcrumbs: [
      { label: "Ana Sayfa", href: "/" },
      { label: "Katalog", href: "/products" },
      { label: "Su arıtma" },
    ],
    sectionTag: "01 · ENDÜSTRİYEL EKİPMAN · SU ARITMA",
    title: "ANHEL su arıtma üniteleri",
    subtitle:
      "Son teknoloji proses, yapısal ve enerji tasarrufu tasarımını birleştiren yüksek teknolojili ekipman. Filtreleme, yumuşatma, demir giderme ve ters osmoz — önde gelen küresel üreticilerden otomasyon ve bileşenlerle birlikte tek pakette teslim edilir.",
    image: {
      src: "/assets/products/vpu.webp",
      alt: "ANHEL — çelik filtre tanklı su arıtma ünitesi",
    },
    primaryCta: {
      label: "Çevrimiçi doldur",
      href: "/quiz/vpu",
      variant: "primary",
    },
    secondaryCta: {
      label: "Teknik veri formu",
      href: "/docs/water-treatment/oprosnyi-list-tr.pdf",
      variant: "ghost",
    },
  },

  techSpecs: [
    { label: "Debi", value: "0,5 – 80", unit: "m³/h" },
    { label: "Giriş basıncı", value: "2 – 6", unit: "bar" },
    { label: "Çıkış basıncı", value: "azami 10", unit: "bar" },
    { label: "Su sıcaklığı", value: "5 – 35", unit: "°C" },
    { label: "Yumuşatma sonrası sertlik", value: "< 0,1", unit: "mEq/L" },
    { label: "Demir giderme sonrası demir", value: "< 0,3", unit: "mg/L" },
    { label: "RO red oranı", value: "azami 99,5", unit: "%" },
    { label: "Ünite tasarım ömrü", value: "asgari 10", unit: "yıl" },
  ],

  description: {
    tag: "03 · AÇIKLAMA",
    title: "Amaç ve çalışma prensibi",
    paragraphs: [
      "ANHEL su arıtma üniteleri filtreleme, yumuşatma, demir giderme ve ters osmozu birleştirir. Konfigürasyon, giriş suyunun kimyasal analizine ve istenen çıkış kalitesine göre seçilir — konut, ticari ve endüstriyel tesisler için.",
      "Önde gelen küresel üreticilerden filtre ortamı ve RO membranları. Zaman veya debi bazlı otomatik rejenerasyon, SCADA entegrasyonu ve müşteriye teslim öncesi çıkış suyu kontrol analizleriyle devreye alma.",
    ],
  },

  applications: {
    tag: "03 · UYGULAMALAR",
    title: "Nerelerde kullanılır",
    lede: "Konutlardan ağır sanayiye kadar. Konfigürasyon, giriş suyu kalitesi ve çıkış suyu gereksinimlerine göre seçilir.",
    items: [
      { id: "residential", mono: "01", title: "Konut", example: "Müstakil evler ve özel su temini olan konut kompleksleri" },
      { id: "boiler", mono: "02", title: "Kazan daireleri", example: "Takviye suyu arıtma" },
      { id: "industrial", mono: "03", title: "Endüstri", example: "Proses suyu, üretim" },
      { id: "food", mono: "04", title: "Gıda üretimi", example: "İçecekler, gıda işleme" },
      { id: "hospitality", mono: "05", title: "HoReCa", example: "Oteller, restoranlar, SPA merkezleri" },
      { id: "medical", mono: "06", title: "Sağlık ve ilaç", example: "Hastaneler, laboratuvarlar, ilaç üretimi" },
    ],
  },

  brands: {
    tag: "04 · MARKALAR",
    title: "Küresel olarak tanınmış ekipmanlardan üretilmiştir",
    lede: "Filtre ortamı, kontrol vanaları ve RO membranları — kanıtlanmış üreticilerden.",
    rowPumps: [
      { id: "clack", name: "Clack", series: "WS1, WS2" },
      { id: "runxin", name: "Runxin", series: "F63, F75" },
      { id: "filmtec", name: "Dow FilmTec", series: "BW, TW" },
      { id: "vontron", name: "Vontron", series: "ULP, LP" },
      { id: "ecosoft", name: "Ecosoft" },
      { id: "aquachem", name: "AquaChem" },
    ],
    rowComponents: [
      { id: "grundfos", name: "Grundfos", series: "DDA", href: "https://www.grundfos.com/" },
      { id: "dosatron", name: "Dosatron" },
      { id: "dekraft", name: "DEKraft", href: "https://dekraft.ru/" },
      { id: "iek", name: "IEK", href: "https://www.iek.ru/" },
      { id: "keaz", name: "KEAZ", href: "https://keaz.ru/" },
      { id: "ekf", name: "EKF", href: "https://ekfgroup.com/ru-ru" },
      { id: "weintek", name: "Weintek", href: "https://www.weintek.com/" },
      { id: "unitronics", name: "Unitronics", href: "https://unitronicsplc.com/" },
    ],
  },

  advantages: {
    tag: "05 · AVANTAJLAR",
    title: "Neden ANHEL®",
    lede: "Giriş suyu analizine göre tasarım, kalite kontrolü ve kendi otomasyonumuzla.",
    items: [
      { id: "analysis", mono: "01", title: "Su analizine göre boyutlandırma", body: "Giriş suyunun kimyasal analizi her tesis için konfigürasyonu belirler." },
      { id: "custom", mono: "02", title: "Siparişe göre üretim", body: "Debi ve çıkış kalitesi hedeflerine göre üretim, esnek bileşen seçimi." },
      { id: "qc", mono: "03", title: "Kalite kontrolü", body: "Teslim öncesi çıkış suyu kontrol analizleriyle devreye alma." },
      { id: "automation", mono: "04", title: "Otomatik rejenerasyon", body: "Zaman veya debi bazlı — filtreler operatör müdahalesi olmadan kendini yeniler." },
      { id: "own-modules", mono: "05", title: "Kendi otomasyonumuz", body: "Kontrol panosu ve SCADA kendi atölyemizde üretilir." },
      { id: "documentation", mono: "06", title: "Güvenilirlik ve tam belge seti", body: "Tank tasarım ömrü ≥ 10 yıl; ortamlar ve membranlar sarf malzemesidir. Uygunluk beyannameleri ve ekipman pasaportları temin edilir." },
    ],
  },

  gallery: {
    tag: "06 · GALERİ",
    title: "Üretimden",
    photos: [
      { id: "udokan-01", src: "/assets/production/water-treatment/udokan-01.jpg", alt: "Çelik şase üzerinde ANHEL® ters osmoz ünitesi", aspect: "4/5" },
      { id: "udokan-02", src: "/assets/production/water-treatment/udokan-02.jpg", alt: "ANHEL® ters osmoz membran modülleri", aspect: "4/5" },
      { id: "udokan-03", src: "/assets/production/water-treatment/udokan-03.jpg", alt: "ANHEL® ünite borulama ve armatürler", aspect: "4/5" },
      { id: "udokan-04", src: "/assets/production/water-treatment/udokan-04.jpg", alt: "ANHEL® membran elemanlarının yakın çekimi", aspect: "4/5" },
      { id: "udokan-05", src: "/assets/production/water-treatment/udokan-05.jpg", alt: "ANHEL® ünite enstrümanları", aspect: "4/5" },
      { id: "udokan-06", src: "/assets/production/water-treatment/udokan-06.jpg", alt: "ANHEL® ünite — uç görünüm", aspect: "4/5" },
      { id: "udokan-07", src: "/assets/production/water-treatment/udokan-07.jpg", alt: "ANHEL® ünite çelik şase ve borulama", aspect: "4/5" },
      { id: "udokan-08", src: "/assets/production/water-treatment/udokan-08.jpg", alt: "ANHEL® ünite — genel görünüm", aspect: "4/5" },
    ],
  },

  cases: {
    tag: "07 · VAKA ÇALIŞMALARI",
    title: "Halihazırda çalışıyor",
    lede: "Su arıtma ünitelerimizi kullanan endüstriyel ve ticari tesisler.",
    items: [
      { id: "industrial-placeholder", title: "Endüstriyel tesis", location: "Moskova bölgesi", equipment: "ANHEL ünite, yumuşatma + demir giderme", photo: { alt: "Endüstriyel tesis, genel görünüm" } },
      { id: "hotel-placeholder", title: "5★ otel", location: "St. Petersburg", equipment: "ANHEL ünite, tam su arıtma", photo: { alt: "Otel kompleksi, genel görünüm" } },
      { id: "zhk-placeholder", title: "Konut kompleksi (örnek)", location: "Moskova", equipment: "ANHEL ünite, DHW için yumuşatma", photo: { alt: "Konut kompleksi, genel görünüm" } },
    ],
  },

  quiz: {
    tag: "08 · TEKNİK VERİ FORMU",
    title: "Projenize özel boyutlandırma",
    lede: "Altı adım — iletişim bilgilerinden teknik sistem parametrelerine kadar. Bir iş günü içinde yanıt veriyoruz.",
  },

  documents: {
    tag: "09 · BELGELER",
    title: "Belgeler ve sertifikalar",
    lede: "EAEU Uygunluk Beyannamesi, teknik veri formu ve kılavuz — tasarım ve kabul için.",
    items: [
      { id: "oprosnik", title: "Su arıtma ünitesi teknik veri formu", size: "39 KB", href: "/docs/water-treatment/oprosnyi-list-tr.pdf" },
      { id: "cert-deklaratsiya", title: "EAEU Uygunluk Beyannamesi — ANHEL® su arıtma üniteleri", size: "0,49 MB", href: "/docs/water-treatment/cert-deklaratsiya.pdf" },
    ],
  },

  footerCta: {
    tag: "10 · TEKLİF TALEBİ",
    title: "Su arıtma ünitenizi yapılandırın",
    subtitle: "Bir iş günü içinde yanıt veriyoruz. Boyutlandırma ücretsizdir.",
    cta: { label: "Teknik veri formunu aç", href: "#documents" },
    neighboursCaption: "Diğer bölümler",
  },
};
