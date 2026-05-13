import type { ProductContent } from "../../types";

export const content: ProductContent = {
  slug: "firefighting",
  accent: "fire",

  metaTitle: "Yangın koruma sistemleri için ANHEL pompa istasyonları",
  metaDescription:
    "Yangın koruma sistemleri için ANHEL pompa istasyonları. Hem bekleme hem de yangın müdahalesi sırasında gerekli basıncı ve debiyi sağlar. 2–6 pompa, DOL/VFD kontrol, tasarım ömrü ≥ 10 yıl.",

  hero: {
    breadcrumbs: [
      { label: "Ana Sayfa", href: "/" },
      { label: "Katalog", href: "/products" },
      { label: "Pompa istasyonları", href: "/products/pumps" },
      { label: "Yangın koruma" },
    ],
    sectionTag: "01 · POMPA İSTASYONLARI · YANGIN KORUMA",
    title: "Yangın koruma sistemleri için ANHEL pompa istasyonları",
    subtitle:
      "Yangın koruma sisteminde hem bekleme hem de yangın müdahalesi sırasındaki artan talep boyunca gerekli basıncı ve debiyi sağlayan üniteler. Otomatik başlatma, sıcak yedekleme ve tam mevzuat belgeleri.",
    image: {
      src: "/assets/products/hvs-nu-red2.webp",
      alt: "ANHEL® — kırmızı muhafazada yangın koruma pompa istasyonu, HVS-NU serisi",
    },
    primaryCta: { label: "Çevrimiçi doldur", href: "/quiz/pumps?from=firefighting", variant: "primary" },
    secondaryCta: { label: "Teknik veri formu", href: "/docs/firefighting/oprosnyi-list.pdf", variant: "ghost" },
  },

  techSpecs: [
    { label: "Pompa sayısı", value: "2 – 6", unit: "standart" },
    { label: "DOL kontrol", value: "kontrolör ile / yumuşak yol verici ile" },
    { label: "VFD kontrol", value: "kontrolör ile / pompa başına / yumuşak yolla" },
    { label: "Azami akışkan sıcaklığı", value: "70", unit: "°C" },
    { label: "Şebeke gerilimi", value: "3 × 380", unit: "V" },
    { label: "Pompa başına güç", value: "0,37 – 250", unit: "kW" },
    { label: "Dönme hızı", value: "2900 / 1450", unit: "d/dk" },
    { label: "Tasarım ömrü", value: "asgari 10", unit: "yıl" },
  ],

  description: {
    tag: "03 · AÇIKLAMA",
    title: "Amaç ve çalışma prensibi",
    paragraphs: [
      "ANHEL yangın koruma pompa istasyonları, sprinkler, hidrant ve kombine yangın koruma sistemlerinde gerekli basıncı ve debiyi sağlar. Yangın alarm panelinden gelen sinyalle veya sistem basıncı düşüşüyle otomatik başlatma, sıcak yedekleme ve her pompada durum izleme.",
      "Ünite, kontrol panosu ve tam kapatma vanası seti ile tek bir şase üzerine inşa edilir. Konfigürasyon — pompa sayısı, çalışma basıncı, kontrol modları — proje parametrelerinden seçilir.",
    ],
  },

  applications: {
    tag: "04 · UYGULAMALAR",
    title: "Nerelerde kullanılır",
    lede: "Konut komplekslerinden altyapı tesislerine kadar. Her ünite projeye göre üretilir.",
    items: [
      { id: "residential", mono: "01", title: "Konut kompleksleri", example: "Dmitrovsky Park konut kompleksi, Moskova" },
      { id: "business", mono: "02", title: "Ofis binaları", example: "A sınıfı ofis, 20+ kat" },
      { id: "retail", mono: "03", title: "AVM'ler", example: "Kapalı otoparklı AVM'ler" },
      { id: "industrial", mono: "04", title: "Endüstriyel tesisler", example: "Depolar, üretim salonları" },
      { id: "hotels", mono: "05", title: "Oteller", example: "4–5★ oteller, apart-oteller" },
      { id: "infrastructure", mono: "06", title: "Altyapı tesisleri", example: "Havalimanları, tren istasyonları, stadyumlar" },
    ],
  },

  brands: {
    tag: "05 · MARKALAR",
    title: "Küresel olarak tanınmış ekipmanlardan üretilmiştir",
    lede: "Kanıtlanmış üreticilerden pompalar; otomasyon kendi içimizde ve ithal.",
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
    tag: "06 · AVANTAJLAR",
    title: "Neden ANHEL®",
    lede: "Seri üretim, kalite kontrolü ve kendi otomasyonumuz.",
    items: [
      { id: "serial", mono: "01", title: "Seri üretim", body: "Profesyonel montaj döngüsü — sahada doğaçlama montaj değil." },
      { id: "custom", mono: "02", title: "Şartnameye göre üretim", body: "Müşterinin şartnamesine göre montaj, projeye özel esnek konfigürasyon." },
      { id: "qc", mono: "03", title: "Kalite kontrolü", body: "Her istasyon sevkiyat öncesi hidrolik ve elektrik testinden geçer." },
      { id: "control-modes", mono: "04", title: "Çoklu kontrol modu", body: "DOL, VFD, yumuşak yol vericili kontrolör — sahanın görevine göre seçilir." },
      { id: "reliability", mono: "05", title: "Güvenilirlik ve uzun servis ömrü", body: "Normal işletmede ortalama hizmet ömrü en az 10 yıl." },
      { id: "documentation", mono: "06", title: "Tam belge seti", body: "Mevzuat ve işletme belgeleri — tüm sertifikalar ve pasaportlar temin edilir." },
    ],
  },

  gallery: {
    tag: "07 · GALERİ",
    title: "Üretimden",
    photos: [
      { id: "firefighting-01", src: "/assets/production/firefighting/firefighting-01.jpg", alt: "ANHEL — üretimdeki yangın koruma istasyonu, fotoğraf 1", aspect: "4/5" },
      { id: "firefighting-02", src: "/assets/production/firefighting/firefighting-02.jpg", alt: "ANHEL — üretimdeki yangın koruma istasyonu, fotoğraf 2", aspect: "4/5" },
      { id: "firefighting-03", src: "/assets/production/firefighting/firefighting-03.jpg", alt: "ANHEL — üretimdeki yangın koruma istasyonu, fotoğraf 3", aspect: "4/5" },
      { id: "firefighting-04", src: "/assets/production/firefighting/firefighting-04.jpg", alt: "ANHEL — üretimdeki yangın koruma istasyonu, fotoğraf 4", aspect: "4/5" },
      { id: "firefighting-05", src: "/assets/production/firefighting/firefighting-05.jpg", alt: "ANHEL — üretimdeki yangın koruma istasyonu, fotoğraf 5", aspect: "4/5" },
      { id: "firefighting-06", src: "/assets/production/firefighting/firefighting-06.jpg", alt: "ANHEL — üretimdeki yangın koruma istasyonu, fotoğraf 6", aspect: "4/5" },
      { id: "firefighting-07", src: "/assets/production/firefighting/firefighting-07.jpg", alt: "ANHEL — üretimdeki yangın koruma istasyonu, fotoğraf 7", aspect: "4/5" },
      { id: "firefighting-08", src: "/assets/production/firefighting/firefighting-08.jpg", alt: "ANHEL — üretimdeki yangın koruma istasyonu, fotoğraf 8", aspect: "4/5" },
      { id: "firefighting-09", src: "/assets/production/firefighting/firefighting-09.jpg", alt: "ANHEL — üretimdeki yangın koruma istasyonu, fotoğraf 9", aspect: "4/5" },
      { id: "firefighting-10", src: "/assets/production/firefighting/firefighting-10.jpg", alt: "ANHEL — üretimdeki yangın koruma istasyonu, fotoğraf 10", aspect: "4/5" },
      { id: "firefighting-11", src: "/assets/production/firefighting/firefighting-11.jpg", alt: "ANHEL — üretimdeki yangın koruma istasyonu, fotoğraf 11", aspect: "4/5" },
    ],
  },

  cases: {
    tag: "08 · VAKA ÇALIŞMALARI",
    title: "Halihazırda çalışıyor",
    lede: "İstasyonlarımızı kullanan konut kompleksleri ve endüstriyel tesisler.",
    items: [
      { id: "zhk-dmitrovsky", title: "Dmitrovsky Park konut kompleksi", location: "Moskova, 2023", equipment: "Sprinkler için 5 adet ANHEL HVS-NU pompa ünitesi", photo: { alt: "Dmitrovsky Park konut kompleksi, genel görünüm" } },
      { id: "zhk-odingrad", title: "Odingrad konut kompleksi", location: "Odintsovo, 2022", equipment: "ANHEL HVS-NU sprinkler pompa ünitesi", photo: { alt: "Odingrad konut kompleksi, genel görünüm" } },
    ],
  },

  quiz: { tag: "09 · TEKNİK VERİ FORMU", title: "Projenize özel boyutlandırma", lede: "Altı adım — iletişim bilgilerinden teknik sistem parametrelerine kadar. Bir iş günü içinde yanıt veriyoruz." },

  documents: {
    tag: "10 · BELGELER",
    title: "Belgeler ve sertifikalar",
    lede: "EAEU Uygunluk Beyannamesi, teknik veri formu ve kılavuz — tasarım ve kabul için.",
    items: [
      { id: "oprosnik", title: "Pompa istasyonu teknik veri formu", size: "1,49 MB", href: "/docs/firefighting/oprosnyi-list.pdf" },
      { id: "cert-deklaratsiya", title: "EAEU Uygunluk Beyannamesi — ANHEL® yangın koruma pompa istasyonları", size: "0,86 MB", href: "/docs/firefighting/cert-deklaratsiya.pdf" },
      { id: "manual", title: "Kullanım kılavuzu — ANHEL® SPD tipi pompa istasyonları", size: "63 KB", href: "/docs/firefighting/manual-tr.pdf" },
    ],
  },

  footerCta: {
    tag: "11 · TEKLİF TALEBİ",
    title: "İstasyonunuzu projeye göre yapılandırın",
    subtitle: "Bir iş günü içinde yanıt veriyoruz. Boyutlandırma ücretsizdir.",
    cta: { label: "Teknik veri formunu aç", href: "#documents" },
    neighboursCaption: "Diğer bölümler",
  },
};
