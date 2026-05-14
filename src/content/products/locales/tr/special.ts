import type { ProductContent } from "../../types";

export const content: ProductContent = {
  slug: "special",
  accent: "treatment",

  metaTitle: "ANHEL özel konfigürasyonlu pompa istasyonları",
  metaDescription:
    "Özel konfigürasyonlarda ANHEL pompa istasyonları: konteyner montajlı ve CTP tank montajlı. Paralel 6 pompaya kadar, pompa başına 250 kW'a kadar, çalışma basıncı 40 bar'a kadar, ortam sıcaklığı −50 °C ila +50 °C. Su temini, yangın koruma ve bina hizmetleri için evrensel çözüm.",

  hero: {
    breadcrumbs: [
      { label: "Ana Sayfa", href: "/" },
      { label: "Katalog", href: "/products" },
      { label: "Pompa istasyonları", href: "/products/pumps" },
      { label: "Özel konfigürasyon" },
    ],
    sectionTag: "01 · POMPA İSTASYONLARI · ÖZEL KONFİGÜRASYON",
    title: "ANHEL pompa istasyonları — özel konfigürasyonlar",
    subtitle:
      "Çalışma koşullarına hızlı adaptasyon gerektiren tesisler için yüksek teknolojili ekipman. İki format — yalıtımlı konteyner veya CTP tank. Su temini, yangın koruma, ısıtma ve soğutma için evrensel çözüm.",
    image: {
      src: "/assets/products/special.webp",
      alt: "ANHEL — özel konfigürasyonlu pompa istasyonu: modüler kolektörler ve pompa grubu montajı",
    },
    primaryCta: { label: "Çevrimiçi doldur", href: "/quiz/pumps?from=special", variant: "primary" },
    secondaryCta: { label: "Teknik veri formu", href: "/docs/special/oprosnyi-list-tr.pdf", variant: "ghost" },
  },

  techSpecs: [
    { label: "Paralel pompa sayısı", value: "2 – 6", unit: "standart" },
    { label: "Pompa başına güç", value: "azami 250", unit: "kW" },
    { label: "Azami çalışma basıncı", value: "azami 40", unit: "bar" },
    { label: "Şebeke gerilimi", value: "3 × 380 / 3 × 660", unit: "V" },
    { label: "Ortam sıcaklığı", value: "−50 ila +50", unit: "°C (konteyner)" },
    { label: "Yangın güvenlik kategorisi", value: "I / II / III", unit: "sınıf" },
    { label: "Dönme hızı", value: "2900 / 1450 / 970", unit: "d/dk" },
    { label: "Ünite tasarım ömrü", value: "asgari 10", unit: "yıl" },
  ],

  description: {
    tag: "03 · AÇIKLAMA",
    title: "Amaç ve çalışma prensibi",
    paragraphs: [
      "Çalışma koşullarına hızlı adaptasyon gerektiren tesisler için özel konfigürasyonlarda pompa istasyonları. İki montaj formatı — yalıtımlı konteyner veya CTP tank. Makine dairesi için kalıcı yapısal işler gerekmez: ünite borulamaya ve enerjiye bağlanmaya hazır şekilde gelir.",
      "Su temini, yangın koruma, ısıtma, soğutma ve basınç artırma için evrensel çözüm. Konteyner konfigürasyonu −50 °C ila +50 °C dış sıcaklıklarda çalışır ve 40 bar'a kadar çalışma basıncına dayanır. CTP tank konfigürasyonu UKhL4 / UKhL1 dış kontrol panosuyla sessiz, kavitasyonsuz çalışma sunar.",
    ],
  },

  applications: {
    tag: "03 · UYGULAMALAR",
    title: "Nerelerde kullanılır",
    lede: "Hızlı kurulum ve kendi kendine yetebilme gerektiren tesisler: uzak lokasyonlar için konteyner konfigürasyonu, ayrı makine dairesi olmadan tadilatlar için CTP tanklar.",
    items: [
      { id: "water-supply", mono: "01", title: "Su temini", example: "İçme suyu dahil soğuk ve sıcak su" },
      { id: "fire", mono: "02", title: "Yangın koruma", example: "Sprinkler, deluge ve köpük sistemleri" },
      { id: "combined", mono: "03", title: "Kombine sistemler", example: "Tek modülde kullanma + yangın koruma" },
      { id: "heating", mono: "04", title: "Isıtma ve soğutma", example: "Bina hizmetlerinde ısıtma akışkanı ve soğutulmuş su sirkülasyonu" },
      { id: "industrial", mono: "05", title: "Proses uygulamaları", example: "Zorlu işletme koşullarına sahip endüstriyel tesisler" },
      { id: "remote", mono: "06", title: "Uzak lokasyonlar", example: "Kalıcı makine dairesi yapımı olmayan tesisler" },
    ],
  },

  brands: {
    tag: "04 · MARKALAR",
    title: "Önde gelen üreticilerin ekipmanlarından üretilmiştir",
    lede: "Pompalar — proje parametrelerine göre seçilir. Otomasyon ve bileşenler — Avrupa ve Rusya.",
    rowPumps: [
      { id: "aquadeus", name: "AquaDeus", series: "talep üzerine", href: "https://aquadeus.ru/" },
      { id: "cnp", name: "CNP", series: "talep üzerine", href: "https://www.cnppumps.com/" },
      { id: "leo", name: "Leo", series: "talep üzerine", href: "https://www.leo.cn/" },
      { id: "gms", name: "HMS", series: "talep üzerine", href: "https://hms.ru/" },
      { id: "wilo", name: "Wilo", series: "talep üzerine", href: "https://wilo.com/ru/ru/" },
      { id: "lowara", name: "Lowara", series: "talep üzerine", href: "https://www.xylem.com/ru-ru/brands/lowara/" },
      { id: "kq", name: "KQ Pumps", series: "talep üzerine", href: "https://kq.com.ru/" },
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
    lede: "Kalıcı makine dairesi yapımına alternatif — daha basit onaylar ve daha hızlı teslimat.",
    items: [
      { id: "no-construction", mono: "01", title: "Kalıcı yapısal iş yok", body: "Ayrı teknik oda veya makine dairesi gerekmez — ünite bağlantıya hazır şekilde gelir." },
      { id: "fast-install", mono: "02", title: "Sahada hızlı kurulum", body: "Ünite tam monte teslim edilir; sahadaki iş borulama, enerji ve kablajdır. Kazı veya temel işi yoktur." },
      { id: "low-noise", mono: "03", title: "Düşük gürültü seviyesi", body: "CTP tank formatı sessiz çalışır — ünite ayrı ses yalıtımı olmadan yerleştirilebilir." },
      { id: "cavitation-free", mono: "04", title: "Kavitasyonsuz çalışma", body: "CTP varyantın hidrolik düzeni pompa kavitasyonunu önler ve servis ömrünü uzatır." },
      { id: "permits", mono: "05", title: "Daha basit onaylar", body: "Kalıcı makine dairesi yapımına göre daha küçük izin paketi." },
      { id: "delivery", mono: "06", title: "Daha hızlı teslimat", body: "Siparişe göre seri fabrika montajı, şartnameden devreye almaya kadar geçen süreyi kısaltır." },
    ],
  },

  gallery: {
    tag: "06 · GALERİ",
    title: "Üretim ve montaj",
    lede: "Montaj atölyesi, test tezgâhı, sahadaki üniteler.",
    photos: [
      { id: "special-01", src: "/assets/production/special/special-01.jpg", alt: "ANHEL — üretimdeki özel konfigürasyon istasyonu, fotoğraf 1", aspect: "4/5" },
      { id: "special-02", src: "/assets/production/special/special-02.jpg", alt: "ANHEL — üretimdeki özel konfigürasyon istasyonu, fotoğraf 2", aspect: "4/5" },
      { id: "special-03", src: "/assets/production/special/special-03.jpg", alt: "ANHEL — üretimdeki özel konfigürasyon istasyonu, fotoğraf 3", aspect: "4/5" },
      { id: "special-04", src: "/assets/production/special/special-04.jpg", alt: "ANHEL — üretimdeki özel konfigürasyon istasyonu, fotoğraf 4", aspect: "4/5" },
      { id: "special-05", src: "/assets/production/special/special-05.jpg", alt: "ANHEL — üretimdeki özel konfigürasyon istasyonu, fotoğraf 5", aspect: "4/5" },
      { id: "special-06", src: "/assets/production/special/special-06.jpg", alt: "ANHEL — üretimdeki özel konfigürasyon istasyonu, fotoğraf 6", aspect: "4/5" },
      { id: "special-07", src: "/assets/production/special/special-07.jpg", alt: "ANHEL — üretimdeki özel konfigürasyon istasyonu, fotoğraf 7", aspect: "4/5" },
    ],
  },

  cases: {
    tag: "07 · VAKA ÇALIŞMALARI",
    title: "Halihazırda çalışıyor",
    lede: "Uzak lokasyonlar ve özel yerleşim gereksinimleri olan projeler.",
    items: [
      { id: "industrial-placeholder", title: "Endüstriyel tesis", location: "Moskova bölgesi", equipment: "ANHEL konteyner ünite, su temini", photo: { alt: "Endüstriyel tesis, genel görünüm" } },
      { id: "fire-placeholder", title: "Lojistik merkez", location: "Leningrad bölgesi", equipment: "ANHEL konteyner ünite, yangın koruma", photo: { alt: "Lojistik merkez, genel görünüm" } },
      { id: "fiberglass-placeholder", title: "Konut kompleksi", location: "Moskova", equipment: "ANHEL CTP ünite, soğuk su temini", photo: { alt: "Konut kompleksi, genel görünüm" } },
    ],
  },

  quiz: { tag: "08 · TEKNİK VERİ FORMU", title: "Projenize özel boyutlandırma", lede: "Altı adım — iletişim bilgilerinden teknik sistem parametrelerine kadar. Bir iş günü içinde yanıt veriyoruz." },

  documents: {
    tag: "09 · BELGELER",
    title: "Belgeler ve sertifikalar",
    lede: "Teknik veri formu, sertifikalar ve kılavuz — tasarım ve kabul için.",
    items: [
      { id: "oprosnik", title: "Pompa istasyonu teknik veri formu", size: "42 KB", href: "/docs/special/oprosnyi-list-tr.pdf" },
      { id: "cert-deklaratsiya", title: "EAEU Uygunluk Beyannamesi — ANHEL® özel konfigürasyon pompa istasyonları", size: "0,86 MB", href: "/docs/special/cert-deklaratsiya.pdf" },
      { id: "manual", title: "Kullanım kılavuzu — ANHEL® SPD tipi pompa istasyonları", size: "63 KB", href: "/docs/special/manual-tr.pdf" },
    ],
  },

  footerCta: {
    tag: "10 · TEKLİF TALEBİ",
    title: "Özel konfigürasyonlu üniteyi yapılandırın",
    subtitle: "Bir iş günü içinde yanıt veriyoruz. Boyutlandırma ücretsizdir.",
    cta: { label: "Teknik veri formunu aç", href: "#documents" },
    neighboursCaption: "Diğer bölümler",
  },
};
