import type { ProductContent } from "../../types";

export const content: ProductContent = {
  slug: "pressure-boost",
  accent: "treatment",

  metaTitle: "ANHEL otomatik basınç koruma üniteleri",
  metaDescription:
    "Kapalı ısıtma ve soğutma şebekeleri için ANHEL otomatik basınç koruma üniteleri (APBU). Paralel 3 pompaya kadar, ±0,01 bar'a kadar basınç koruma doğruluğu, genleşme tankı 200–10 000 L, çalışma basıncı 25 bar'a kadar.",

  hero: {
    breadcrumbs: [
      { label: "Ana Sayfa", href: "/" },
      { label: "Katalog", href: "/products" },
      { label: "Pompa istasyonları", href: "/products/pumps" },
      { label: "Basınç koruma" },
    ],
    sectionTag: "01 · POMPA İSTASYONLARI · BASINÇ KORUMA",
    title: "ANHEL basınç koruma üniteleri",
    subtitle:
      "Otomatik basınç koruma ünitesi (APBU) — pompalı, genleşme tanklı ve akıllı otomasyonlu hidrolik modül. Sistem basıncını ±0,01 bar'a kadar sabit tutar, otomatik hava giderme ve ısıl genleşmeyi telafi eder.",
    image: {
      src: "/assets/products/pressure-boost.webp",
      alt: "ANHEL — otomatik basınç koruma ünitesi: kontrol panosu, pompa grubu ve membranlı genleşme tankı",
    },
    primaryCta: { label: "Çevrimiçi doldur", href: "/quiz/pumps?from=pressure-boost", variant: "primary" },
    secondaryCta: { label: "Teknik veri formu", href: "/docs/pressure-boost/oprosnyi-list.pdf", variant: "ghost" },
  },

  techSpecs: [
    { label: "Paralel pompa sayısı", value: "2 – 3", unit: "standart" },
    { label: "Kontrol tipi", value: "DOL / VFD / pompa başına VFD", unit: "kontrolör ile" },
    { label: "Basınç koruma doğruluğu", value: "azami ±0,01", unit: "bar" },
    { label: "Azami akışkan sıcaklığı", value: "120", unit: "°C" },
    { label: "Azami çalışma basıncı", value: "azami 25", unit: "bar" },
    { label: "Genleşme tankı hacmi", value: "200 – 10 000", unit: "L" },
    { label: "Şebeke gerilimi", value: "3 × 380", unit: "V" },
    { label: "Ünite tasarım ömrü", value: "asgari 10", unit: "yıl" },
  ],

  description: {
    tag: "03 · AÇIKLAMA",
    title: "Amaç ve çalışma prensibi",
    paragraphs: [
      "ANHEL otomatik basınç koruma ünitesi (APBU) — pompalı, genleşme tanklı ve akıllı otomasyonlu hidrolik modül. Kapalı ısıtma ve soğutma şebekelerinde basıncı ±0,01 bar'a kadar sabit tutar.",
      "Otomatik hava giderme, ısıl genleşmenin telafisi ve otomatik takviye sayımı — manuel bakım gerekmez. 7 inç operatör LCD'si hidrolik şemayı ve basınç eğilimini gösterir; Modbus / Ethernet entegrasyonu verileri saha SCADA'sına iletir.",
    ],
  },

  applications: {
    tag: "03 · UYGULAMALAR",
    title: "Nerelerde kullanılır",
    lede: "Konut, ticari ve endüstriyel binalarda kapalı ısıtma ve soğutma şebekeleri, merkezi ısı istasyonları, kazan daireleri ve havalandırma sistemleri.",
    items: [
      { id: "central-heating", mono: "01", title: "Merkezi ısı istasyonları", example: "Bölge ısı istasyonu devrelerinde basınç koruma" },
      { id: "boiler", mono: "02", title: "Kazan daireleri", example: "Kapalı şebekelerde hava giderme ve takviye" },
      { id: "residential", mono: "03", title: "Çok aileli konutlar", example: "Apartman binalarında kapalı ısıtma ve soğutma devreleri" },
      { id: "industrial", mono: "04", title: "Endüstriyel tesisler", example: "Üretim tesislerinde proses ısıtma şebekeleri" },
      { id: "ventilation", mono: "05", title: "Havalandırma sistemleri", example: "Taze hava ısıtma devrelerinde basınç koruma" },
      { id: "cooling-loops", mono: "06", title: "Soğutma devreleri", example: "Karma kullanımlı binalarda soğutma temin sistemleri" },
    ],
  },

  brands: {
    tag: "04 · MARKALAR",
    title: "Önde gelen üreticilerin ekipmanlarından üretilmiştir",
    lede: "Pompalar — CRV, CDM, LVR, Boosta, RVP. Otomasyon ve bileşenler — Avrupa ve Rusya.",
    rowPumps: [
      { id: "vandjord", name: "Vandjord", series: "CRV" },
      { id: "cnp", name: "CNP", series: "CDM", href: "https://www.cnppumps.com/" },
      { id: "leo", name: "Leo", series: "LVR", href: "https://www.leo.cn/" },
      { id: "gms", name: "HMS", series: "Boosta", href: "https://hms.ru/" },
      { id: "aquadeus", name: "AquaDeus", series: "RVP", href: "https://aquadeus.ru/" },
      { id: "kq", name: "KQ Pumps", series: "KQDP, KQDS", href: "https://kq.com.ru/" },
    ],
    rowComponents: [
      { id: "dekraft", name: "DEKraft", href: "https://dekraft.ru/" },
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
    tag: "05 · AVANTAJLAR",
    title: "Neden ANHEL",
    lede: "Yüksek hassasiyetli otomasyon, güvenilir hidrolik ve tam yedekli kontroller.",
    items: [
      { id: "precision", mono: "01", title: "Hassas basınç koruma", body: "Kontrol algoritmaları çalışma basıncını ±0,01 bar gibi dar bir bantta tutar." },
      { id: "custom", mono: "02", title: "Şartnameye göre üretim", body: "Ünite parametreleri, genleşme tankı hacmi ve otomasyon proje parametrelerine göre üretilir." },
      { id: "frame", mono: "03", title: "Ağır hizmet şasesi ve AISI 304 kolektör", body: "4 mm yüksek mukavemetli çelik şase, AISI 304 paslanmaz çelik kolektör." },
      { id: "membrane", mono: "04", title: "Membranlı genleşme tankı", body: "Sisteme uygun 200–10 000 L hacim. Opsiyonel membran patlama sensörü ve ara tank." },
      { id: "deaeration", mono: "05", title: "Otomatik hava giderme", body: "Isı taşıyıcısından hava otomatik olarak alınır — manuel bakım gerekmez." },
      { id: "diagnostics", mono: "06", title: "Hata toleranslı otomasyon", body: "Kendi kendine teşhis, yedekli kontroller, SCADA için Modbus / Ethernet. 7\" LCD hidrolik şemayı ve basınç eğilimini gösterir." },
    ],
  },

  gallery: {
    tag: "06 · GALERİ",
    title: "Üretim ve montaj",
    lede: "Montaj atölyesi, test tezgâhı, sahadaki üniteler.",
    photos: [
      { id: "shop-01", alt: "ANHEL montaj atölyesi, genel görünüm", caption: "Atölye, Moskova", aspect: "4/5" },
      { id: "shop-02", alt: "APBU pompa grubu montajı", caption: "Pompa grubu montajı", aspect: "4/5" },
      { id: "shop-03", alt: "APBU kontrol panosu, yakın çekim", caption: "PLC'li kontrol panosu", aspect: "4/5" },
      { id: "test-01", alt: "APBU hidrolik testi", caption: "Test tezgâhı", aspect: "4/5" },
      { id: "site-01", alt: "Sevkiyat öncesi bitmiş ünite", caption: "QC kabulü", aspect: "4/5" },
      { id: "site-02", alt: "Isı istasyonuna monte edilmiş APBU", caption: "Saha — Moskova", aspect: "4/5" },
      { id: "detail-01", alt: "Membranlı genleşme tankı", caption: "Genleşme tankı", aspect: "4/5" },
      { id: "detail-02", alt: "AISI 304 kolektör", caption: "Paslanmaz çelik kolektör", aspect: "4/5" },
    ],
  },

  cases: {
    tag: "07 · VAKA ÇALIŞMALARI",
    title: "Halihazırda çalışıyor",
    lede: "APBU'larımızı kullanan ısı istasyonları ve kapalı ısıtma şebekeleri.",
    items: [
      { id: "ctp-placeholder", title: "Konut bölgesi ısı istasyonu", location: "Moskova", equipment: "ANHEL APBU, ısıtma devrelerinde basınç koruma", photo: { alt: "Merkezi ısı istasyonu, genel görünüm" } },
      { id: "boiler-placeholder", title: "Endüstriyel kazan dairesi", location: "Moskova bölgesi", equipment: "ANHEL APBU, hava giderme ve takviye", photo: { alt: "Endüstriyel kazan dairesi, genel görünüm" } },
      { id: "zhk-placeholder", title: "Konut kompleksi (örnek)", location: "St. Petersburg", equipment: "ANHEL APBU, apartman binasında basınç koruma", photo: { alt: "Konut kompleksi, genel görünüm" } },
    ],
  },

  quiz: { tag: "08 · TEKNİK VERİ FORMU", title: "Projenize özel boyutlandırma", lede: "Altı adım — iletişim bilgilerinden teknik sistem parametrelerine kadar. Bir iş günü içinde yanıt veriyoruz." },

  documents: {
    tag: "09 · BELGELER",
    title: "Belgeler ve sertifikalar",
    lede: "Teknik veri formu, sertifikalar ve kılavuz — tasarım ve kabul için.",
    items: [
      { id: "oprosnik", title: "Pompa istasyonu teknik veri formu", size: "1,49 MB", href: "/docs/pressure-boost/oprosnyi-list.pdf" },
      { id: "cert-deklaratsiya", title: "EAEU Uygunluk Beyannamesi — ANHEL® basınç koruma üniteleri", size: "0,86 MB", href: "/docs/pressure-boost/cert-deklaratsiya.pdf" },
      { id: "manual", title: "Kullanım kılavuzu — ANHEL® SPD tipi pompa istasyonları", size: "1,41 MB", href: "/docs/pressure-boost/manual.pdf" },
    ],
  },

  footerCta: {
    tag: "10 · TEKLİF TALEBİ",
    title: "Şebekeniz için APBU yapılandırın",
    subtitle: "Bir iş günü içinde yanıt veriyoruz. Boyutlandırma ücretsizdir.",
    cta: { label: "Teknik veri formunu aç", href: "#documents" },
    neighboursCaption: "Diğer bölümler",
  },
};
