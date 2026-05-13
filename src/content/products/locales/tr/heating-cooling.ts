import type { ProductContent } from "../../types";

/**
 * Isıtma ve soğutma pompa istasyonu — Türkçe.
 */
export const content: ProductContent = {
  slug: "heating-cooling",
  accent: "treatment",

  metaTitle: "Isıtma ve soğutma sistemleri için ANHEL pompa istasyonları",
  metaDescription:
    "Isıtma, soğutma ve iklimlendirme sistemlerinde ısıtma akışkanı ve soğutulmuş su sirkülasyonu için ANHEL pompa istasyonları. 2–6 pompa, 0,37–90 kW, akışkan sıcaklığı 0–120 °C (talep üzerine 180 °C'ye kadar), VFD kontrol, tasarım ömrü ≥ 10 yıl.",

  hero: {
    breadcrumbs: [
      { label: "Ana Sayfa", href: "/" },
      { label: "Katalog", href: "/products" },
      { label: "Pompa istasyonları", href: "/products/pumps" },
      { label: "Isıtma ve soğutma" },
    ],
    sectionTag: "01 · POMPA İSTASYONLARI · ISITMA VE SOĞUTMA",
    title: "Isıtma ve soğutma sistemleri için ANHEL pompa istasyonları",
    subtitle:
      "Merkezi ısıtma, soğutma ve iklimlendirme sistemlerinde ısıtma akışkanı veya soğutulmuş su sirkülasyonu sağlayan üniteler. Hassas basınç kontrolü, motor koruması ve asgari enerji tüketimi için ayarlanmış kontrol algoritmaları.",
    image: {
      src: "/assets/products/heating-cooling.webp",
      alt: "ANHEL — ısıtma ve soğutma sistemleri için pompa istasyonu: genleşme tankı, pompa grubu ve kontrol panosu",
    },
    primaryCta: { label: "Çevrimiçi doldur", href: "/quiz/pumps?from=heating-cooling", variant: "primary" },
    secondaryCta: { label: "Teknik veri formu", href: "/docs/heating-cooling/oprosnyi-list.pdf", variant: "ghost" },
  },

  techSpecs: [
    { label: "Pompa sayısı", value: "2 – 6", unit: "standart" },
    { label: "Kontrol tipi", value: "DOL / VFD / pompa başına VFD", unit: "kontrolör ile" },
    { label: "Akışkan sıcaklığı", value: "0 – 120", unit: "°C (talep üzerine 180 °C'ye kadar)" },
    { label: "Şebeke gerilimi", value: "3 × 380", unit: "V" },
    { label: "Azami ortam sıcaklığı", value: "40", unit: "°C" },
    { label: "Pompa başına güç", value: "0,37 – 90", unit: "kW (standart)" },
    { label: "Dönme hızı", value: "2900 / 1450 / 970", unit: "d/dk" },
    { label: "Ünite tasarım ömrü", value: "asgari 10", unit: "yıl" },
  ],

  description: {
    tag: "03 · AÇIKLAMA",
    title: "Amaç ve çalışma prensibi",
    paragraphs: [
      "Bu üniteler, konut ve endüstriyel binalarda merkezi ısıtma, soğutma ve iklimlendirme sistemlerinde ısıtma akışkanı veya soğutulmuş su sirkülasyonu sağlar. Hassas basınç kontrolü, motor koruması ve asgari enerji tüketimi için ayarlanmış kontrol algoritmaları sunarlar.",
      "Geniş bir sıcaklık aralığında (0–120 °C, talep üzerine 180 °C'ye kadar) su ve su-glikol karışımlarıyla çalışırlar. Kontrol paketi devreye göre seçilir: yumuşak yol vericili DOL, kontrolörlü VFD veya pompa başına VFD.",
    ],
  },

  applications: {
    tag: "03 · UYGULAMALAR",
    title: "Nerelerde kullanılır",
    lede: "Konut ve endüstriyel binalar, merkezi ısıtma ve soğutma sistemleri, proses devreleri.",
    items: [
      { id: "heating", mono: "01", title: "Isıtma sistemleri", example: "Boru hatlarında ve radyatörlerde ısıtma akışkanı sirkülasyonu" },
      { id: "cooling", mono: "02", title: "Soğutma temini", example: "AVM, ofis ve veri merkezleri için merkezi soğutma" },
      { id: "ventilation", mono: "03", title: "İklimlendirme", example: "Klima santrallerinde soğutulmuş su sirkülasyonu" },
      { id: "industrial", mono: "04", title: "Endüstriyel binalar", example: "Proses ısıtma ve soğutma devreleri" },
      { id: "residential", mono: "05", title: "Konut kompleksleri", example: "Yüksek katlı yapılarda merkezi ısıtma ve soğutma" },
      { id: "tech-process", mono: "06", title: "Proses uygulamaları", example: "Üretim devrelerinde kararlı işletmenin sürdürülmesi" },
    ],
  },

  brands: {
    tag: "04 · MARKALAR",
    title: "Önde gelen üreticilerin ekipmanlarından üretilmiştir",
    lede: "Pompalar — RCP, RHP, RMP, TD, KML, LPP. Otomasyon ve bileşenler — Avrupa ve Rusya.",
    rowPumps: [
      { id: "aquadeus", name: "AquaDeus", series: "RCP, RHP, RMP", href: "https://aquadeus.ru/" },
      { id: "cnp", name: "CNP", series: "TD", href: "https://www.cnppumps.com/" },
      { id: "gms", name: "HMS", series: "KML", href: "https://hms.ru/" },
      { id: "leo", name: "Leo", series: "LPP", href: "https://www.leo.cn/" },
      { id: "wilo", name: "Wilo", series: "talep üzerine", href: "https://wilo.com/ru/ru/" },
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
    lede: "Fabrika montajı, çoklu kontrol modu ve kendi kendine teşhisli akıllı otomasyon.",
    items: [
      { id: "serial", mono: "01", title: "Profesyonel seri üretim", body: "Uzmanlaşmış OEM tesisinde fabrika montajı, her ünitenin sevkiyat öncesi hidrolik ve elektrik testi." },
      { id: "custom", mono: "02", title: "Şartnameye göre üretim", body: "Hidrolik parametreler, pompa grubu konfigürasyonu ve otomasyon proje parametrelerine göre üretilir." },
      { id: "control-modes", mono: "03", title: "Çoklu kontrol modu", body: "Yumuşak yol vericili DOL, kontrolörlü VFD, pompa başına VFD — sistem görevine uyacak şekilde seçilir." },
      { id: "energy", mono: "04", title: "Enerji verimli tasarım", body: "Yumuşak yol verici şebeke yükünü düşürür; kontrol algoritmaları asgari güç tüketimi için ayarlanır." },
      { id: "deaeration", mono: "05", title: "Otomatik hava giderme", body: "Isı taşıyıcısından otomatik hava giderme — manuel bakım gerekmez. Uzaktan okuma ile otomatik debi sayacı." },
      { id: "diagnostics", mono: "06", title: "Akıllı otomasyon", body: "Kendi kendine teşhis, durdurma olmadan bakım için yedekli kontrol. 7\" LCD hidrolik şemayı ve olay günlüğünü gösterir." },
    ],
  },

  gallery: {
    tag: "06 · GALERİ",
    title: "Üretim ve montaj",
    lede: "Montaj atölyesi, test tezgâhı, sahadaki üniteler.",
    photos: [
      { id: "shop-01", alt: "ANHEL montaj atölyesi, genel görünüm", caption: "Atölye, Moskova", aspect: "4/5" },
      { id: "shop-02", alt: "Montaj altındaki sirkülasyon pompaları", caption: "Pompa grubu montajı", aspect: "4/5" },
      { id: "shop-03", alt: "Kontrol panosu, yakın çekim", caption: "PLC'li kontrol panosu", aspect: "4/5" },
      { id: "test-01", alt: "Ünitenin hidrolik testi", caption: "Test tezgâhı", aspect: "4/5" },
      { id: "site-01", alt: "Sevkiyat öncesi bitmiş istasyon", caption: "QC kabulü", aspect: "4/5" },
      { id: "site-02", alt: "Sahaya monte edilmiş istasyon", caption: "Saha — Moskova", aspect: "4/5" },
      { id: "detail-01", alt: "Ünitenin parçası olarak genleşme tankı", caption: "Genleşme tankı", aspect: "4/5" },
      { id: "detail-02", alt: "Hidrolik şemalı operatör LCD paneli", caption: "Operatör paneli", aspect: "4/5" },
    ],
  },

  cases: {
    tag: "07 · VAKA ÇALIŞMALARI",
    title: "Halihazırda çalışıyor",
    lede: "Isıtma ve soğutma ünitelerimizi kullanan konut ve ticari binalar.",
    items: [
      { id: "zhk-placeholder-1", title: "Konut kompleksi (örnek 1)", location: "Moskova", equipment: "Isıtma sistemi için ANHEL pompa istasyonu", photo: { alt: "Konut kompleksi, genel görünüm" } },
      { id: "trc-placeholder", title: "A sınıfı AVM", location: "St. Petersburg", equipment: "Soğutma sistemi için ANHEL pompa istasyonu", photo: { alt: "AVM, genel görünüm" } },
      { id: "bc-placeholder", title: "Ofis binası", location: "Moskova", equipment: "Isıtma ve soğutma sistemleri için ANHEL pompa istasyonu", photo: { alt: "Ofis binası, genel görünüm" } },
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
    lede: "Teknik veri formu, sertifikalar ve kılavuz — tasarım ve kabul için.",
    items: [
      { id: "oprosnik", title: "Pompa istasyonu teknik veri formu", size: "1,49 MB", href: "/docs/heating-cooling/oprosnyi-list.pdf" },
      { id: "cert-deklaratsiya", title: "EAEU Uygunluk Beyannamesi — ANHEL® ısıtma-soğutma pompa istasyonları", size: "0,86 MB", href: "/docs/heating-cooling/cert-deklaratsiya.pdf" },
      { id: "manual", title: "Kullanım kılavuzu — ANHEL® SPD tipi pompa istasyonları", size: "63 KB", href: "/docs/heating-cooling/manual-tr.pdf" },
    ],
  },

  footerCta: {
    tag: "10 · TEKLİF TALEBİ",
    title: "Isıtma veya soğutma pompa istasyonunuzu yapılandırın",
    subtitle: "Bir iş günü içinde yanıt veriyoruz. Boyutlandırma ücretsizdir.",
    cta: { label: "Teknik veri formunu aç", href: "#documents" },
    neighboursCaption: "Diğer bölümler",
  },
};
