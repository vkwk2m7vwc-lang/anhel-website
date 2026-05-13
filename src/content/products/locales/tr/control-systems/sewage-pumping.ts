import type { ProductContent } from "../../../types";

export const content: ProductContent = {
  slug: "sewage-pumping",
  accent: "water",

  metaTitle: "Kanalizasyon pompa istasyonları için kontrol panoları",
  metaDescription:
    "ANHEL® kanalizasyon pompa istasyonları (KNS), drenaj pompaları, yağmur suyu drenajı ve depolama tankları için kontrol panoları. 4 pompaya kadar, şamandıra anahtarlar ve seviye transmiterleri, Modbus RTU/TCP ve Profibus DP.",

  hero: {
    breadcrumbs: [
      { label: "Ana Sayfa", href: "/" },
      { label: "Katalog", href: "/products" },
      { label: "Kontrol panoları", href: "/products/control-systems" },
      { label: "Kanalizasyon pompa istasyonları için" },
    ],
    sectionTag: "01 · KONTROL PANOLARI · KANALİZASYON POMPALAMA",
    title: "Kanalizasyon pompa istasyonları için ANHEL® kontrol panoları",
    subtitle:
      "Drenaj ve kanalizasyon pompalarının, yağmur suyu ve atık su akışlarının ve depolama tanklarının yönetimi. Şamandıra anahtarlardan, elektrotlardan ve seviye transmiterlerinden gelen sinyaller. Ön panelden geçiş yapılan yerel ve otomatik modlar.",
    image: {
      src: "/assets/products/control-systems/sewage-pumping/hero.png",
      alt: "ANHEL — kanalizasyon pompa istasyonları için kontrol panosu, şeffaf kapılı gri pano",
    },
    primaryCta: { label: "Teklif iste", href: "#documents", variant: "primary" },
    secondaryCta: { label: "Teknik veri formu", href: "/quiz/control-systems", variant: "ghost" },
  },

  techSpecs: [
    { label: "Pompa sayısı", value: "1 – 4" },
    { label: "Pompa başına güç", value: "0,37 – 500", unit: "kW" },
    { label: "Akım değeri", value: "1 – 5000", unit: "A" },
    { label: "Besleme gerilimi", value: "3×380", unit: "V" },
    { label: "Yol verme yöntemi", value: "DOL / yumuşak yol verme / VFD" },
    { label: "Güç beslemesi", value: "tek / çift ATS" },
    { label: "İklim sınıfı", value: "UKhL1, UKhL4 (0…+40 °C)" },
    { label: "Protokoller", value: "Modbus RTU/TCP, Profibus DP" },
  ],

  description: {
    tag: "03 · AÇIKLAMA",
    title: "Amaç ve çalışma prensibi",
    paragraphs: [
      "Kanalizasyon pompa istasyonları (KNS) için ANHEL® kontrol panosu, drenaj çukurlarından atık su transfer istasyonlarına kadar her tür pompa istasyonunu otomatize eder. Harici seviye sensörleriyle (şamandıra anahtarlar, elektrotlar, seviye transmiterleri) çalışır ve her pompa ile her şamandıra anahtarın durumunu ön panelde gösterir.",
      "Yerel mod, pompa başlatma/durdurmaya ön panelden izin verir; otomatik mod ise seviye sensörleri tarafından sürülür. Motor koruması, gerilim izleme ve sesli alarm standarttır. Üst seviye sistemlerle entegrasyon Modbus RTU/TCP ve Profibus DP üzerinden yapılır.",
    ],
  },

  applications: {
    tag: "04 · UYGULAMALAR",
    title: "Nerelerde kullanılır",
    lede: "Otomatik sıvı transferi ve seviye izleme gereken her yerde.",
    items: [
      { id: "kns", mono: "01", title: "Kanalizasyon pompa istasyonları", example: "Atık su ve kanalizasyon transferi" },
      { id: "drainage", mono: "02", title: "Drenaj çukurları", example: "Bodrum, teknik kat ve tünellerden tahliye" },
      { id: "stormwater", mono: "03", title: "Yağmur suyu drenajı", example: "Yağmur suyu pompalarının kontrolü" },
      { id: "treatment", mono: "04", title: "Arıtma tesisleri", example: "Transfer ve proses sıvısı beslemesi" },
      { id: "tanks", mono: "05", title: "Tanklar ve rezervuarlar", example: "Depolama tanklarının dolum kontrolü" },
      { id: "construction", mono: "06", title: "İnşaat çukurları", example: "İnşaat sırasında yeraltı suyu tahliyesi" },
    ],
  },

  brands: {
    tag: "05 · MARKALAR",
    title: "Endüstriyel bileşenler",
    lede: "Önde gelen üreticilerden şamandıra anahtarlar, seviye transmiterleri ve kontrolörler.",
    rowPumps: [
      { id: "schneider", name: "Schneider Electric" },
      { id: "abb", name: "ABB" },
      { id: "siemens", name: "Siemens" },
      { id: "instart", name: "INSTART" },
      { id: "vesper", name: "Vesper" },
    ],
    rowComponents: [
      { id: "owen", name: "OWEN", href: "https://owen.ru/" },
      { id: "weintek", name: "Weintek", href: "https://www.weintek.com/" },
      { id: "vega", name: "Vega", series: "seviye transmiterleri" },
      { id: "endress", name: "Endress+Hauser", href: "https://www.endress.com/" },
      { id: "dekraft", name: "DEKraft", href: "https://dekraft.ru/" },
      { id: "iek", name: "IEK", href: "https://www.iek.ru/" },
      { id: "ekf", name: "EKF", href: "https://ekfgroup.com/ru-ru" },
      { id: "finder", name: "Finder", href: "https://www.findernet.com/" },
    ],
  },

  advantages: {
    tag: "06 · AVANTAJLAR",
    title: "Neden ANHEL®",
    lede: "Birden fazla seviye sensörü tipi ve üst seviye protokol desteği.",
    items: [
      { id: "sensors", mono: "01", title: "Şamandıra anahtar, elektrot, seviye transmiteri", body: "Her tür seviye sensörünün esnek entegrasyonu — tesise uygun çözümün seçimi." },
      { id: "modes", mono: "02", title: "Yerel ve otomatik mod", body: "Devreye alma ve bakım için modlar arasında geçiş; her pompa için durum göstergesi." },
      { id: "protocols", mono: "03", title: "Modbus RTU/TCP, Profibus DP", body: "Üst seviye SCADA ile doğrudan entegrasyon — ek ağ geçidi gerekmez." },
      { id: "starts", mono: "04", title: "DOL, yumuşak yol verme ve VFD", body: "Yol verme yöntemi esnekliği — daha düşük yol verme akımı ve pompa ekipmanında daha az aşınma." },
      { id: "alarm", mono: "05", title: "Sesli alarm ve besleme izleme", body: "Operatöre arıza bildirimi; gerilim ve faz izleme standarttır." },
      { id: "documentation", mono: "06", title: "GOST montajı ve TR TS sertifikası", body: "Fabrika montajı, kalite kontrolü, beyannameler ve pasaportlar teslimata dahildir." },
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
    lede: "KNS ve arıtma tesisleri için ANHEL® kontrol panolarıyla tamamlanmış projeler.",
    items: [
      { id: "primorye-treatment", title: "Primorye arıtma tesisleri", location: "Artyom, Primorsky Krai", equipment: "KNS kontrol panoları", photo: { alt: "Arıtma tesisi, Primorsky Krai" } },
      { id: "mriya", title: "Mriya Resort & SPA", location: "Yalta, Kırım", equipment: "Kontrol panosu sistemi", photo: { alt: "Mriya Resort, Yalta" } },
      { id: "industrial-zone", title: "Endüstriyel saha", location: "Moskova bölgesi", equipment: "Drenaj ve KNS panoları", photo: { alt: "Endüstriyel saha, Moskova bölgesi" } },
    ],
  },

  quiz: { tag: "09 · TEKNİK VERİ FORMU", title: "Projenize özel boyutlandırma", lede: "Yedi adım — iletişim bilgilerinden KNS'nin teknik parametrelerine kadar." },

  documents: {
    tag: "10 · BELGELER",
    title: "Belgeler ve teknik veri formu",
    lede: "Teknik veri formu — tasarım ve kabul için PDF veya otomatik kaydetmeli çevrimiçi form.",
    items: [
      { id: "oprosnik-pdf", title: "Kontrol panosu teknik veri formu (PDF)", size: "1,8 MB", href: "/docs/control-systems/oprosnyi-list.pdf" },
      { id: "oprosnik-online", title: "Teknik veri formunu çevrimiçi doldur", href: "/quiz/control-systems" },
    ],
  },

  footerCta: {
    tag: "11 · TEKLİF TALEBİ",
    title: "Projeniz için KNS kontrol panosu yapılandırın",
    subtitle: "Bir iş günü içinde yanıt veriyoruz. Boyutlandırma ücretsizdir.",
    cta: { label: "Teknik veri formunu aç", href: "/quiz/control-systems" },
    neighboursCaption: "Diğer bölümler",
  },
};
