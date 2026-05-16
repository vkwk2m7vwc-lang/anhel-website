import type { ProductContent } from "../../../types";

export const content: ProductContent = {
  slug: "variable-frequency",
  accent: "water",

  metaTitle: "Değişken frekanslı kontrol panoları",
  metaDescription:
    "Basınç artırma pompaları için ANHEL® değişken frekanslı kontrol panoları. PID kontrol, yumuşak yol verme, 500 kW'a kadar 6 pompaya kadar kademe kontrolü. Sıcak ve soğuk kullanım suyu, ısıtma ve soğutma için.",

  hero: {
    breadcrumbs: [
      { label: "Ana Sayfa", href: "/" },
      { label: "Katalog", href: "/products" },
      { label: "Kontrol panoları", href: "/products/control-systems" },
      { label: "Değişken frekanslı" },
    ],
    sectionTag: "01 · KONTROL PANOLARI · DEĞİŞKEN FREKANSLI",
    title: "ANHEL® değişken frekanslı kontrol panoları",
    subtitle:
      "Asenkron motorlu basınç artırma pompa gruplarının kontrolü. PID kontrol, yumuşak yol verme, 6 pompaya kadar kademe kontrolü. Soğuk su, sıcak kullanım suyu, ısıtma, soğutma sistemleri ve mevcut pompa istasyonlarının modernizasyonu için.",
    image: {
      src: "/assets/products/control-systems/variable-frequency/hero.webp",
      alt: "ANHEL — değişken frekanslı kontrol panosu, HMI ve kontrolörlü 4 bölmeli montaj",
    },
    primaryCta: { label: "Teklif iste", href: "#documents", variant: "primary" },
    secondaryCta: { label: "Teknik veri formu", href: "/quiz/control-systems", variant: "ghost" },
  },

  techSpecs: [
    { label: "Pompa sayısı", value: "1 – 6" },
    { label: "Pompa başına güç", value: "0,37 – 500", unit: "kW" },
    { label: "Akım değeri", value: "1 – 4000", unit: "A" },
    { label: "Besleme gerilimi", value: "3×380 / 660 V / 6 / 10", unit: "kV" },
    { label: "Yol verme yöntemi", value: "VFD / yumuşak yol verici / DOL" },
    { label: "Güç beslemesi", value: "tek / çift ATS" },
    { label: "İklim sınıfı", value: "UKhL1 – UKhL4" },
    { label: "Kontrol tipi", value: "yerel / uzak" },
  ],

  description: {
    tag: "03 · AÇIKLAMA",
    title: "Amaç ve çalışma prensibi",
    paragraphs: [
      "ANHEL® değişken frekanslı kontrol panosu, 1 ila 6 pompalık grupları otomatik görev / yedek rotasyonu, çalışma saatleri dengelemesi ve kademe basınç kontrolü ile yönetir.",
      "Üç veya daha fazla pompayla, frekans sürücüsü baş pompanın hızını modüle eder; kapasite yetersiz kaldığında bir sonraki pompa katılır ve pik talepte üçüncü pompa doğrudan şebekeden çalışır. Bu şema su darbesini bastırır, pompa ömrünü uzatır ve enerji tüketimini düşürür.",
    ],
  },

  applications: {
    tag: "04 · UYGULAMALAR",
    title: "Nerelerde kullanılır",
    lede: "Konut sitelerinden endüstriyel pompa dairelerine kadar — kararlı basınç ve yumuşak yol verme gereken her yerde.",
    items: [
      { id: "residential", mono: "01", title: "Konut ve yüksek yapılar", example: "Konut komplekslerinde soğuk su ve DHW sistemleri" },
      { id: "commercial", mono: "02", title: "Ticari gayrimenkul", example: "Ofisler, AVM'ler, oteller — basınç artırma" },
      { id: "heating", mono: "03", title: "Isıtma", example: "Kapalı sistemlerin sirkülasyon devreleri" },
      { id: "cooling", mono: "04", title: "İklimlendirme", example: "Chiller / fan-coil, soğutulmuş su devreleri" },
      { id: "modernization", mono: "05", title: "Altyapı yenileme", example: "CHP ve pompa istasyonlarında eski panoların değişimi" },
      { id: "industrial", mono: "06", title: "Endüstri", example: "Değişken debili proses pompalama" },
    ],
  },

  brands: {
    tag: "05 · MARKALAR",
    title: "Endüstriyel bileşenler",
    lede: "Frekans sürücüleri, kontrolörler ve otomasyon — küresel ve Rus üreticilerden.",
    rowPumps: [
      { id: "schneider", name: "Schneider Electric", series: "ATV320, ATV630" },
      { id: "abb", name: "ABB", series: "ACS580, ACS880" },
      { id: "siemens", name: "Siemens", series: "Sinamics G120" },
      { id: "danfoss", name: "Danfoss", series: "VLT FC202" },
      { id: "instart", name: "INSTART", series: "MCI, FCI" },
      { id: "vesper", name: "Vesper", series: "EI-9011" },
    ],
    rowComponents: [
      { id: "weintek", name: "Weintek", series: "MT8000", href: "https://www.weintek.com/" },
      { id: "owen", name: "OWEN", series: "PLC110", href: "https://owen.ru/" },
      { id: "dekraft", name: "DEKraft", href: "https://dekraft.ru/" },
      { id: "iek", name: "IEK", href: "https://www.iek.ru/" },
      { id: "keaz", name: "KEAZ", href: "https://keaz.ru/" },
      { id: "ekf", name: "EKF", href: "https://ekfgroup.com/ru-ru" },
      { id: "finder", name: "Finder", href: "https://www.findernet.com/" },
      { id: "phoenix", name: "Phoenix Contact", href: "https://www.phoenixcontact.com/" },
    ],
  },

  advantages: {
    tag: "06 · AVANTAJLAR",
    title: "Neden ANHEL®",
    lede: "Esnek malzeme listesi, PID kontrol ve dahili SCADA entegrasyonu.",
    items: [
      { id: "pid", mono: "01", title: "PID kontrol", body: "Hız modülasyonu ile hassas basınç koruma." },
      { id: "soft-start", mono: "02", title: "Yumuşak yol verme ve durdurma", body: "Daha düşük yol verme akımı, su darbesi koruması, daha uzun pompa ömrü." },
      { id: "cascade", mono: "03", title: "Kademe kontrolü", body: "6 pompaya kadar grup için öncelik ve ATS ile esnek konfigürasyonlar." },
      { id: "modbus", mono: "04", title: "SCADA entegrasyonu", body: "Modbus TCP, EasyAccess, VNC + uzak izleme için kuru kontaklar." },
      { id: "protection", mono: "05", title: "Kapsamlı koruma", body: "Faz izleme, kuru çalışma, diferansiyel basınç, akış şalteri, motor termik koruması." },
      { id: "qc", mono: "06", title: "GOST montajı ve TR TS sertifikası", body: "Fabrika montajı, kalite kontrolü, beyannameler ve sertifikalar dahildir." },
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
    lede: "ANHEL® kontrol panolarıyla tamamlanmış projeler.",
    items: [
      { id: "moscow-osk", title: "Yapı inşaat projesi", location: "Moskova", equipment: "Otomasyon panosu + dağıtım panosu", photo: { alt: "Yapı inşaat sahası, Moskova" } },
      { id: "sibcable-cooling", title: "Sibkabel — atölye soğutma sistemi", location: "Tomsk", equipment: "Soğutulmuş su devresi otomasyonu", photo: { alt: "Üretim atölyesi, Tomsk" } },
      { id: "tula-pumps", title: "Tulachermet-Stal", location: "Tula", equipment: "Pompa sistemi otomasyonu ve yazılımı", photo: { alt: "Endüstriyel pompa istasyonu, Tula" } },
    ],
  },

  quiz: { tag: "09 · TEKNİK VERİ FORMU", title: "Projenize özel boyutlandırma", lede: "Yedi adım — iletişim bilgilerinden panonun teknik parametrelerine kadar. Bir iş günü içinde yanıt veriyoruz." },

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
    title: "Projeniz için kontrol panosu yapılandırın",
    subtitle: "Bir iş günü içinde yanıt veriyoruz. Boyutlandırma ücretsizdir.",
    cta: { label: "Teknik veri formunu aç", href: "/quiz/control-systems" },
    neighboursCaption: "Diğer bölümler",
  },
};
