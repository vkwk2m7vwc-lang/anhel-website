import type { ProductContent } from "../../types";

/**
 * Blok Isı İstasyonu (BITP) — içerik dosyası, Türkçe.
 *
 * Endüstriyel mühendislik tonu (Vansan / Sempa / Esmaksan kaydı).
 * Marka adları (ANHEL, Profit LLC, Wilo, Lowara vb.) Latince kalır.
 */
export const content: ProductContent = {
  slug: "heating-unit",
  accent: "heat",

  metaTitle: "ANHEL blok ısı istasyonları",
  metaDescription:
    "ANHEL blok ısı istasyonları — ısıtma, sıcak kullanım suyu ve soğutma modülleri. Fabrika montajı, hava durumuna bağlı kontrol, 15+ yıl tasarım ömrü.",

  hero: {
    breadcrumbs: [
      { label: "Ana Sayfa", href: "/" },
      { label: "Katalog", href: "/products" },
      { label: "Isı istasyonları" },
    ],
    sectionTag: "01 · ISI İSTASYONLARI",
    title: "ANHEL blok ısı istasyonları",
    subtitle:
      "Isıtma, sıcak kullanım suyu ve soğutma için modüler ekipman. Fabrika montajı, hava durumuna bağlı kontrol ve eksiksiz mevzuat belgeleri.",
    image: {
      src: "/assets/products/bitp.png",
      alt: "ANHEL® — blok ısı istasyonu, modüler konfigürasyon",
    },
    primaryCta: {
      label: "Çevrimiçi doldur",
      href: "/quiz/itp",
      variant: "primary",
    },
    secondaryCta: {
      label: "Teknik veri formu",
      href: "/docs/heating-unit/oprosnyi-list.pdf",
      variant: "ghost",
    },
  },

  techSpecs: [
    { label: "Isıl kapasite", value: "50 – 3000", unit: "kW" },
    { label: "Birincil taraf sıcaklığı", value: "azami 150", unit: "°C" },
    { label: "İkincil taraf sıcaklığı", value: "70 / 95", unit: "°C" },
    { label: "Birincil taraf basıncı", value: "azami 16", unit: "bar" },
    { label: "İkincil taraf basıncı", value: "azami 10", unit: "bar" },
    { label: "Isı taşıyıcısı", value: "su / glikol" },
    { label: "Kontrol tipi", value: "hava durumuna bağlı" },
    { label: "Tasarım ömrü", value: "asgari 15", unit: "yıl" },
  ],

  applications: {
    tag: "02 · MODÜL HATTI",
    title: "Sekiz modül, her proje için",
    lede: "Bağımsız ısıtmadan kombine ısıtma-soğutma sistemlerine kadar. Her kombinasyon tek bir blok olarak monte edilebilir.",
    items: [
      { id: "heating-closed", mono: "01", title: "Kapalı ısıtma devresi", example: "Bağımsız ısı girişine sahip konut ve ticari binalar için" },
      { id: "heating-open", mono: "02", title: "Açık ısıtma devresi", example: "Isı şebekesinden doğrudan çekiş, sıcak su ayrımıyla" },
      { id: "dhw", mono: "03", title: "Sıcak kullanım suyu (DHW)", example: "Tek veya iki kademeli su ısıtıcı konfigürasyonu" },
      { id: "combined", mono: "04", title: "Kombine: ısıtma + DHW", example: "Konut binaları için evrensel çözüm" },
      { id: "cooling", mono: "05", title: "Soğutma", example: "AVM, ofis ve veri merkezleri için soğutma modülü" },
      { id: "ventilation", mono: "06", title: "Taze hava ısıtma", example: "Isı geri kazanımlı hava ısıtma modülü" },
    ],
  },

  brands: {
    tag: "03 · MARKALAR",
    title: "Küresel olarak tanınmış ekipmanlardan üretilmiştir",
    lede: "Eşanjörler, kontrol vanaları ve pompalar — kanıtlanmış üreticilerden.",
    rowPumps: [
      { id: "ridan", name: "Ridan", series: "NN, S serisi" },
      { id: "alfa-laval", name: "Alfa Laval", series: "M serisi, T serisi" },
      { id: "wilo", name: "Wilo", series: "Stratos, Yonos", href: "https://wilo.com/ru/ru/" },
      { id: "lowara", name: "Lowara", series: "ecocirc", href: "https://www.xylem.com/ru-ru/brands/lowara/" },
      { id: "gms", name: "HMS", series: "santrifüj pompalar", href: "https://hms.ru/" },
    ],
    rowComponents: [
      { id: "danfoss", name: "Danfoss", href: "https://www.danfoss.com/" },
      { id: "siemens", name: "Siemens", href: "https://www.siemens.com/" },
      { id: "dekraft", name: "DEKraft", href: "https://dekraft.ru/" },
      { id: "iek", name: "IEK", href: "https://www.iek.ru/" },
      { id: "keaz", name: "KEAZ", href: "https://keaz.ru/" },
      { id: "ekf", name: "EKF", href: "https://ekfgroup.com/ru-ru" },
      { id: "weintek", name: "Weintek", href: "https://www.weintek.com/" },
      { id: "unitronics", name: "Unitronics", href: "https://unitronicsplc.com/" },
    ],
  },

  advantages: {
    tag: "03 · AVANTAJLAR",
    title: "Neden ANHEL®",
    lede: "Fabrika montajı, kalite kontrolü ve kendi otomasyonumuz.",
    items: [
      { id: "serial", mono: "01", title: "Fabrika montajı", body: "Blok-modüler yapı — sahada bodrumda doğaçlama montaj değil." },
      { id: "custom", mono: "02", title: "Siparişe göre üretim", body: "Isı şebekesi tasarım parametrelerine göre üretim, esnek kapasite ve ısı taşıyıcı seçenekleri." },
      { id: "qc", mono: "03", title: "Kalite kontrolü", body: "Her modül sevkiyat öncesi hidrolik ve elektrik testinden geçer." },
      { id: "control", mono: "04", title: "Hava durumuna bağlı kontrol", body: "Dış sensörden otomatik parametre seçimi. Bina SCADA sistemine entegrasyon." },
      { id: "reliability", mono: "05", title: "Uzun tasarım ömrü", body: "Normal işletmede ortalama hizmet ömrü en az 15 yıl." },
      { id: "documentation", mono: "06", title: "Tam belge seti", body: "Mevzuat, işletme ve pasaport belgeleri — tüm belgeler teslimatla birlikte." },
    ],
  },

  gallery: {
    tag: "04 · GALERİ",
    title: "Üretimden",
    photos: [
      { id: "heating-unit-01", src: "/assets/production/heating-unit/heating-unit-01.jpg", alt: "ANHEL — üretimdeki blok ısı istasyonu, fotoğraf 1", aspect: "4/5" },
      { id: "heating-unit-02", src: "/assets/production/heating-unit/heating-unit-02.jpg", alt: "ANHEL — üretimdeki blok ısı istasyonu, fotoğraf 2", aspect: "4/5" },
      { id: "heating-unit-03", src: "/assets/production/heating-unit/heating-unit-03.jpg", alt: "ANHEL — üretimdeki blok ısı istasyonu, fotoğraf 3", aspect: "4/5" },
      { id: "heating-unit-04", src: "/assets/production/heating-unit/heating-unit-04.jpg", alt: "ANHEL — üretimdeki blok ısı istasyonu, fotoğraf 4", aspect: "4/5" },
      { id: "heating-unit-05", src: "/assets/production/heating-unit/heating-unit-05.jpg", alt: "ANHEL — üretimdeki blok ısı istasyonu, fotoğraf 5", aspect: "4/5" },
      { id: "heating-unit-06", src: "/assets/production/heating-unit/heating-unit-06.jpg", alt: "ANHEL — üretimdeki blok ısı istasyonu, fotoğraf 6", aspect: "4/5" },
      { id: "heating-unit-07", src: "/assets/production/heating-unit/heating-unit-07.jpg", alt: "ANHEL — üretimdeki blok ısı istasyonu, fotoğraf 7", aspect: "4/5" },
      { id: "heating-unit-08", src: "/assets/production/heating-unit/heating-unit-08.jpg", alt: "ANHEL — üretimdeki blok ısı istasyonu, fotoğraf 8", aspect: "4/5" },
      { id: "heating-unit-09", src: "/assets/production/heating-unit/heating-unit-09.jpg", alt: "ANHEL — üretimdeki blok ısı istasyonu, fotoğraf 9", aspect: "4/5" },
      { id: "heating-unit-10", src: "/assets/production/heating-unit/heating-unit-10.jpg", alt: "ANHEL — üretimdeki blok ısı istasyonu, fotoğraf 10", aspect: "4/5" },
      { id: "heating-unit-11", src: "/assets/production/heating-unit/heating-unit-11.jpg", alt: "ANHEL — üretimdeki blok ısı istasyonu, fotoğraf 11", aspect: "4/5" },
      { id: "heating-unit-12", src: "/assets/production/heating-unit/heating-unit-12.jpg", alt: "ANHEL — üretimdeki blok ısı istasyonu, fotoğraf 12", aspect: "4/5" },
      { id: "heating-unit-13", src: "/assets/production/heating-unit/heating-unit-13.jpg", alt: "ANHEL — üretimdeki blok ısı istasyonu, fotoğraf 13", aspect: "4/5" },
    ],
  },

  cases: {
    tag: "06 · VAKA ÇALIŞMALARI",
    title: "Halihazırda çalışıyor",
    lede: "Isı istasyonlarımızı kullanan konut ve ticari binalar.",
    items: [
      { id: "zhk-placeholder-1", title: "Konut kompleksi (örnek 1)", location: "Moskova", equipment: "ANHEL ısı istasyonu, ısıtma + DHW", photo: { alt: "Konut kompleksi, genel görünüm" } },
      { id: "zhk-placeholder-2", title: "Konut kompleksi (örnek 2)", location: "St. Petersburg", equipment: "ANHEL ısı istasyonu, kapalı ısıtma devresi", photo: { alt: "Konut kompleksi, genel görünüm" } },
      { id: "bc-placeholder", title: "A sınıfı ofis binası", location: "Moskova", equipment: "ANHEL ısı istasyonu, kombine + soğutma", photo: { alt: "Ofis binası, genel görünüm" } },
    ],
  },

  quiz: {
    tag: "07 · TEKNİK VERİ FORMU",
    title: "Projenize özel boyutlandırma",
    lede: "Altı adım — iletişim bilgilerinden teknik sistem parametrelerine kadar. Bir iş günü içinde yanıt veriyoruz.",
  },

  documents: {
    tag: "05 · BELGELER",
    title: "Belgeler ve sertifikalar",
    lede: "Teknik veri formu ve sertifika — tasarım ve kabul için.",
    items: [
      { id: "oprosnik", title: "Isı istasyonu teknik veri formu", size: "0.54 MB", href: "/docs/heating-unit/oprosnyi-list.pdf" },
      { id: "cert-deklaratsiya", title: "Sertifika — ANHEL® blok ısı istasyonları", size: "2.32 MB", href: "/docs/heating-unit/cert-deklaratsiya.pdf" },
    ],
  },

  footerCta: {
    tag: "06 · TEKLİF TALEBİ",
    title: "Isı istasyonunuzu yapılandırın",
    subtitle: "Bir iş günü içinde yanıt veriyoruz. Boyutlandırma ücretsizdir.",
    cta: { label: "Teknik veri formunu aç", href: "#documents" },
    neighboursCaption: "Diğer bölümler",
  },
};
