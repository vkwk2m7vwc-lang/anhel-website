import type { ProductContent } from "../../types";

/**
 * Su temini pompa istasyonu — içerik dosyası, Türkçe.
 *
 * Endüstriyel mühendislik tonu. Marka adları Latince. Terimler:
 * 'basınç artırma', 'çok kademeli dikey pompa', 'frekans kontrolü'.
 */
export const content: ProductContent = {
  slug: "water-supply",
  accent: "water",

  metaTitle: "Su temini sistemleri için ANHEL pompa istasyonları",
  metaDescription:
    "Soğuk su, sıcak kullanım suyu ve sirkülasyon sistemlerinde basınç artırma ve sabit basınç koruma için ANHEL pompa istasyonları. 2 ila 6 pompa, frekans kontrolü, 0,37 ila 90 kW, tasarım ömrü ≥ 10 yıl.",

  hero: {
    breadcrumbs: [
      { label: "Ana Sayfa", href: "/" },
      { label: "Katalog", href: "/products" },
      { label: "Pompa istasyonları", href: "/products/pumps" },
      { label: "Su temini" },
    ],
    sectionTag: "01 · POMPA İSTASYONLARI · SU TEMİNİ",
    title: "Su temini sistemleri için ANHEL pompa istasyonları",
    subtitle:
      "Basıncı artırmak ve sabit tutmak ya da gerekli basınç farkını oluşturmak için üniteler. Proje parametrelerine göre çok kademeli dikey, uçtan emişli veya yakın eşlenikli yatay pompalar üzerine inşa edilir.",
    image: {
      src: "/assets/products/hvs-nu.webp",
      alt: "ANHEL® — soğuk su pompa istasyonu, HVS-NU serisi",
    },
    primaryCta: {
      label: "Çevrimiçi doldur",
      href: "/quiz/pumps?from=water-supply",
      variant: "primary",
    },
    secondaryCta: {
      label: "Teknik veri formu",
      href: "/docs/water-supply/oprosnyi-list.pdf",
      variant: "ghost",
    },
  },

  techSpecs: [
    { label: "Pompa sayısı", value: "2 – 6", unit: "standart" },
    { label: "Kontrol tipi", value: "DOL / VFD / pompa başına VFD", unit: "kontrolör ile" },
    { label: "Azami sıvı sıcaklığı", value: "120", unit: "°C (talep üzerine 180 °C'ye kadar)" },
    { label: "Şebeke gerilimi", value: "3 × 380", unit: "V" },
    { label: "Azami ortam sıcaklığı", value: "40", unit: "°C" },
    { label: "Pompa başına güç", value: "0,37 – 90", unit: "kW (standart)" },
    { label: "Dönme hızı", value: "2900 / 1450", unit: "d/dk" },
    { label: "Azami sistem basıncı", value: "azami 40", unit: "bar" },
  ],

  description: {
    tag: "03 · AÇIKLAMA",
    title: "Amaç ve çalışma prensibi",
    paragraphs: [
      "Soğuk su, sıcak su ve endüstriyel su temini sistemleri için ANHEL pompa istasyonları. Sabit şebeke basıncı sağlar, boru hattını darbe basıncından korur ve frekans kontrolü ile yumuşak yol verme sayesinde enerji tasarrufu yapar.",
      "Çok kademeli dikey, uçtan emişli veya yakın eşlenikli yatay pompalar üzerine inşa edilir. Konfigürasyon proje hidroliğine göre seçilir; kontrol modu — DOL, VFD veya pompa başına VFD — sistem görevine uyacak şekilde seçilir.",
    ],
  },

  applications: {
    tag: "03 · UYGULAMALAR",
    title: "Nerelerde kullanılır",
    lede: "Konut su temini, endüstri, özel amaçlı tesisler ve sirkülasyon sistemleri. Her ünite proje parametrelerine göre üretilir.",
    items: [
      { id: "residential", mono: "01", title: "Konut su temini", example: "Konut yapıları, kamu ve sosyal tesisler" },
      { id: "commercial", mono: "02", title: "Ticari binalar", example: "Ofisler, AVM'ler, apart-oteller, 3–5★ oteller" },
      { id: "industrial", mono: "03", title: "Endüstriyel su temini", example: "Endüstriyel binalar ve proses suyu" },
      { id: "specialised", mono: "04", title: "Özel amaçlı tesisler", example: "Spor kompleksleri, sağlık tesisleri, fuar merkezleri" },
      { id: "circulation", mono: "05", title: "Sirkülasyon sistemleri", example: "Isıtma, soğutma, bina hizmetleri" },
      { id: "boost", mono: "06", title: "Basınç artırma", example: "Ana hatlarda kararlı yük ve darbe basıncı koruması" },
    ],
  },

  brands: {
    tag: "04 · MARKALAR",
    title: "Önde gelen üreticilerin ekipmanlarından üretilmiştir",
    lede: "Pompalar — RVP, CDM, LVR, Boosta. Otomasyon ve bileşenler — Avrupa ve Rusya.",
    rowPumps: [
      { id: "aquadeus", name: "AquaDeus", series: "RVP", href: "https://aquadeus.ru/" },
      { id: "cnp", name: "CNP", series: "CDM", href: "https://www.cnppumps.com/" },
      { id: "leo", name: "Leo", series: "LVR", href: "https://www.leo.cn/" },
      { id: "gms", name: "HMS", series: "Boosta", href: "https://hms.ru/" },
      { id: "wilo", name: "Wilo", series: "talep üzerine", href: "https://wilo.com/ru/ru/" },
      { id: "lowara", name: "Lowara", series: "talep üzerine", href: "https://www.xylem.com/ru-ru/brands/lowara/" },
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
    tag: "05 · AVANTAJLAR",
    title: "Neden ANHEL",
    lede: "Seri üretim, çoklu kontrol modu ve tam bir mevzuat belge seti.",
    items: [
      { id: "serial", mono: "01", title: "Profesyonel seri üretim", body: "Sahada doğaçlama montaj değil, uzmanlaşmış OEM tesisinde fabrika montajı." },
      { id: "custom", mono: "02", title: "Şartnameye göre üretim", body: "Hidrolik parametreler, pompa grubu konfigürasyonu ve otomasyon proje parametrelerine göre üretilir." },
      { id: "qc", mono: "03", title: "Her üniteye kalite kontrolü", body: "Her istasyonun sevkiyat öncesi hidrolik ve elektrik testi." },
      { id: "control-modes", mono: "04", title: "Çoklu kontrol modu", body: "DOL, VFD, pompa başına VFD — sistem görevine uyacak şekilde seçilir." },
      { id: "energy", mono: "05", title: "Enerji verimli tasarım", body: "Asgari güç tüketimi için hidrolik özellikler ve kontrol algoritmaları seçilir." },
      { id: "reliability", mono: "06", title: "Garantili güvenilirlik", body: "Normal işletmede ortalama hizmet ömrü en az 10 yıl. Uygunluk beyannameleri ve pasaportlar temin edilir." },
    ],
  },

  gallery: {
    tag: "06 · GALERİ",
    title: "Üretimden",
    photos: [
      { id: "water-supply-01", src: "/assets/production/water-supply/water-supply-01.jpg", alt: "ANHEL — üretimdeki su temini pompa istasyonu, fotoğraf 1", aspect: "4/5" },
      { id: "water-supply-02", src: "/assets/production/water-supply/water-supply-02.jpg", alt: "ANHEL — üretimdeki su temini pompa istasyonu, fotoğraf 2", aspect: "4/5" },
      { id: "water-supply-03", src: "/assets/production/water-supply/water-supply-03.jpg", alt: "ANHEL — üretimdeki su temini pompa istasyonu, fotoğraf 3", aspect: "4/5" },
      { id: "water-supply-04", src: "/assets/production/water-supply/water-supply-04.jpg", alt: "ANHEL — üretimdeki su temini pompa istasyonu, fotoğraf 4", aspect: "4/5" },
      { id: "water-supply-05", src: "/assets/production/water-supply/water-supply-05.jpg", alt: "ANHEL — üretimdeki su temini pompa istasyonu, fotoğraf 5", aspect: "4/5" },
      { id: "water-supply-06", src: "/assets/production/water-supply/water-supply-06.jpg", alt: "ANHEL — üretimdeki su temini pompa istasyonu, fotoğraf 6", aspect: "4/5" },
      { id: "water-supply-07", src: "/assets/production/water-supply/water-supply-07.jpg", alt: "ANHEL — üretimdeki su temini pompa istasyonu, fotoğraf 7", aspect: "4/5" },
      { id: "water-supply-08", src: "/assets/production/water-supply/water-supply-08.jpg", alt: "ANHEL — üretimdeki su temini pompa istasyonu, fotoğraf 8", aspect: "4/5" },
      { id: "water-supply-09", src: "/assets/production/water-supply/water-supply-09.jpg", alt: "ANHEL — üretimdeki su temini pompa istasyonu, fotoğraf 9", aspect: "4/5" },
      { id: "water-supply-10", src: "/assets/production/water-supply/water-supply-10.jpg", alt: "ANHEL — üretimdeki su temini pompa istasyonu, fotoğraf 10", aspect: "4/5" },
      { id: "water-supply-11", src: "/assets/production/water-supply/water-supply-11.jpg", alt: "ANHEL — üretimdeki su temini pompa istasyonu, fotoğraf 11", aspect: "4/5" },
      { id: "water-supply-12", src: "/assets/production/water-supply/water-supply-12.jpg", alt: "ANHEL — üretimdeki su temini pompa istasyonu, fotoğraf 12", aspect: "4/5" },
      { id: "water-supply-13", src: "/assets/production/water-supply/water-supply-13.jpg", alt: "ANHEL — üretimdeki su temini pompa istasyonu, fotoğraf 13", aspect: "4/5" },
      { id: "water-supply-14", src: "/assets/production/water-supply/water-supply-14.jpg", alt: "ANHEL — üretimdeki su temini pompa istasyonu, fotoğraf 14", aspect: "4/5" },
    ],
  },

  cases: {
    tag: "07 · VAKA ÇALIŞMALARI",
    title: "Halihazırda çalışıyor",
    lede: "Soğuk su / DHW istasyonlarımızı kullanan konut ve ticari binalar.",
    items: [
      { id: "zhk-placeholder-1", title: "Konut kompleksi (örnek 1)", location: "Moskova", equipment: "ANHEL soğuk su pompa istasyonu", photo: { alt: "Konut kompleksi, genel görünüm" } },
      { id: "zhk-placeholder-2", title: "Konut kompleksi (örnek 2)", location: "St. Petersburg", equipment: "ANHEL basınç artırma istasyonu", photo: { alt: "Konut kompleksi, genel görünüm" } },
      { id: "bc-placeholder", title: "A sınıfı ofis binası", location: "Moskova", equipment: "ANHEL soğuk su + DHW istasyonu", photo: { alt: "Ofis binası, genel görünüm" } },
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
      { id: "oprosnik", title: "Pompa istasyonu teknik veri formu", size: "1,49 MB", href: "/docs/water-supply/oprosnyi-list.pdf" },
      { id: "cert-deklaratsiya", title: "EAEU Uygunluk Beyannamesi — ANHEL® su temini pompa istasyonları", size: "0,86 MB", href: "/docs/water-supply/cert-deklaratsiya.pdf" },
      { id: "manual", title: "Kullanım kılavuzu — ANHEL® SPD tipi pompa istasyonları", size: "1,41 MB", href: "/docs/water-supply/manual.pdf" },
    ],
  },

  footerCta: {
    tag: "10 · TEKLİF TALEBİ",
    title: "Soğuk su / DHW istasyonunuzu yapılandırın",
    subtitle: "Bir iş günü içinde yanıt veriyoruz. Boyutlandırma ücretsizdir.",
    cta: { label: "Teknik veri formunu aç", href: "#documents" },
    neighboursCaption: "Diğer bölümler",
  },
};
