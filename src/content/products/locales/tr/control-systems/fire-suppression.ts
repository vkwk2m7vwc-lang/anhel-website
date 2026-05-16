import type { ProductContent } from "../../../types";

export const content: ProductContent = {
  slug: "fire-suppression",
  accent: "fire",

  metaTitle: "Yangın söndürme sistemleri için kontrol panoları",
  metaDescription:
    "ANHEL® yangın söndürme sistemi kontrol panoları — drençerli, sprinkler ve B sınıfı köpük. «Yangın» sinyaliyle otomatik başlatma, ATS, yangın kontrol paneli ve basınç şalteri izleme. 500 kW'a kadar 4 pompaya kadar.",

  hero: {
    breadcrumbs: [
      { label: "Ana Sayfa", href: "/" },
      { label: "Katalog", href: "/products" },
      { label: "Kontrol panoları", href: "/products/control-systems" },
      { label: "Yangın söndürme sistemleri için" },
    ],
    sectionTag: "01 · KONTROL PANOLARI · YANGIN SÖNDÜRME",
    title: "Yangın söndürme sistemleri için ANHEL® kontrol panoları",
    subtitle:
      "Yangın söndürme sistemlerinde su basıncını ve rezervini hem bekleme modunda hem de yangın sırasında koruyan ana ve takviye pompaların yönetimi. «Yangın» sinyaliyle otomatik başlatma, yangın söndürme için su önceliği, besleme tarafında ATS.",
    image: {
      src: "/assets/products/control-systems/fire-suppression/hero.webp",
      alt: "ANHEL — yangın söndürme sistemleri için kontrol panosu, mimik şemalı uzun kırmızı pano",
    },
    primaryCta: { label: "Teklif iste", href: "#documents", variant: "primary" },
    secondaryCta: { label: "Teknik veri formu", href: "/quiz/control-systems", variant: "ghost" },
  },

  techSpecs: [
    { label: "Pompa sayısı", value: "1 – 4" },
    { label: "Pompa başına güç", value: "0,37 – 500", unit: "kW" },
    { label: "Akım değeri", value: "1 – 3000", unit: "A" },
    { label: "Besleme gerilimi", value: "380", unit: "V" },
    { label: "Güç beslemesi", value: "ATS'li 2 / 3 giriş" },
    { label: "İklim sınıfı", value: "UKhL1 – UKhL4" },
    { label: "Kontrol tipi", value: "yerel / uzak" },
    { label: "Sertifikasyon", value: "FZ-123 (yangın güvenliği)" },
  ],

  description: {
    tag: "03 · AÇIKLAMA",
    title: "Amaç ve çalışma prensibi",
    paragraphs: [
      "Yangın söndürme için ANHEL® kontrol panosu, yangın kontrol panelinden gelen «Yangın» sinyaliyle otomatik başlatmayla ana ve yedek pompaları yönetir. Sprinkler ve drençer algoritmalarını, B sınıfı yangınlar için köpük konsantresiyle çalışmayı ve yangın söndürme için su önceliğini destekler.",
      "Yangın kontrol paneline, basınç şalterlerine ve operatör iş istasyonuna kadar olan kabloların bütünlüğünü izler. Ana pompada arıza olduğunda yedek pompa otomatik olarak çalışır; faz dengesizliği, faz kaybı veya gerilim sapması durumunda pano yedek beslemeye geçer. Motorların aşırı yük ve kısa devre korumaları standarttır.",
    ],
  },

  applications: {
    tag: "04 · UYGULAMALAR",
    title: "Nerelerde kullanılır",
    lede: "Konut, ticari ve endüstriyel tesisler için sulu ve köpüklü yangın söndürme sistemleri.",
    items: [
      { id: "drencher", mono: "01", title: "Drençer sistemleri", example: "Perdeler, bölmeler, yüksek yoğunluklu alanlar" },
      { id: "sprinkler", mono: "02", title: "Sprinkler sistemleri", example: "Ticari ve depo gayrimenkullerinde hedefli söndürme" },
      { id: "foam", mono: "03", title: "Köpüklü söndürme", example: "B sınıfı — petrol ürünleri, yakıt depoları, parlayıcı sıvı depoları" },
      { id: "combined", mono: "04", title: "Kombine sistemler", example: "Kullanım suyu + yangın suyu temini" },
      { id: "industrial", mono: "05", title: "Endüstriyel tesisler", example: "Fabrikalar, depolar, enerji üretim tesisleri" },
      { id: "residential", mono: "06", title: "Konut kompleksleri", example: "Yüksek katlı konutlarda iç yangın suyu hattı, otoparklar" },
    ],
  },

  brands: {
    tag: "05 · MARKALAR",
    title: "Endüstriyel bileşenler",
    lede: "Orion ve Rubezh yangın panelleri, yumuşak yol vericiler ve ATS kontrolörleriyle uyum.",
    rowPumps: [
      { id: "schneider", name: "Schneider Electric", series: "ATV320, ATV630" },
      { id: "abb", name: "ABB", series: "ACS580, PSE Soft Starter" },
      { id: "siemens", name: "Siemens", series: "Sirius, Sinamics" },
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
    lede: "FZ-123 yangın güvenliği sertifikası, acil durumlarda güvenilirlik ve yangın alarm sistemleriyle entegrasyon.",
    items: [
      { id: "fz123", mono: "01", title: "FZ-123 yangın güvenliği sertifikası", body: "Rus yangın güvenliği mevzuatına uygunluk — otomatik yangın söndürme sistemleri için zorunlu koşul." },
      { id: "auto-start", mono: "02", title: "«Yangın» sinyaliyle otomatik başlatma", body: "Yangın kontrol panelinden, basınç şalterlerinden ve damper konum rölelerinden doğrudan giriş; hat bütünlüğü izlemesiyle açık devre ve kısa devre teşhisi." },
      { id: "avr", mono: "03", title: "2 veya 3 besleme girişinde ATS", body: "Faz dengesizliği, faz kaybı ve gerilim sapmasında otomatik transfer — operatör müdahalesi gerekmez." },
      { id: "redundancy", mono: "04", title: "Pompa yedekliliği", body: "Ana pompa arızasında yedek pompanın otomatik başlatılması; her pompa girişinde su varlığı izlemesi." },
      { id: "integrations", mono: "05", title: "Orion ve Rubezh entegrasyonu", body: "Tesisin mevcut yangın alarm sistemine gömme için hazır varyantlar." },
      { id: "documentation", mono: "06", title: "GOST montajı ve tam belge paketi", body: "Sertifikalar, beyannameler ve pasaportlar teslimata dahildir. Çözüm geliştirme aşamasında proje desteği." },
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
    lede: "ANHEL® yangın söndürme panolarıyla tamamlanmış projeler.",
    items: [
      { id: "evolution-tower", title: "Evolution Tower, Moskova-City", location: "Moskova", equipment: "Yangın pompası kontrol panoları", photo: { alt: "Moskova-City, Evolution Tower" } },
      { id: "arcus", title: "Arcus 4 iş merkezi", location: "Moskova", equipment: "31 pano (yangın söndürme dahil)", photo: { alt: "Arcus 4 iş merkezi" } },
      { id: "warehouse", title: "Lojistik merkez", location: "Moskova bölgesi", equipment: "Drençer ve sprinkler sistemleri için panolar", photo: { alt: "Lojistik depo, Moskova bölgesi" } },
    ],
  },

  quiz: { tag: "09 · TEKNİK VERİ FORMU", title: "Projenize özel boyutlandırma", lede: "Yedi adım — iletişim bilgilerinden yangın söndürme sisteminin teknik parametrelerine kadar." },

  documents: {
    tag: "10 · BELGELER",
    title: "Belgeler ve teknik veri formu",
    lede: "Teknik veri formu — tasarım ve kabul için PDF veya otomatik kaydetmeli çevrimiçi form.",
    items: [
      { id: "oprosnik-pdf", title: "Kontrol panosu teknik veri formu (PDF)", size: "0,46 MB", href: "/docs/control-systems/oprosnyi-list-tr.pdf" },
      { id: "oprosnik-online", title: "Teknik veri formunu çevrimiçi doldur", href: "/quiz/control-systems" },
    ],
  },

  footerCta: {
    tag: "11 · TEKLİF TALEBİ",
    title: "Projeniz için yangın söndürme panosu yapılandırın",
    subtitle: "Bir iş günü içinde yanıt veriyoruz. Boyutlandırma ücretsizdir.",
    cta: { label: "Teknik veri formunu aç", href: "/quiz/control-systems" },
    neighboursCaption: "Diğer bölümler",
  },
};
