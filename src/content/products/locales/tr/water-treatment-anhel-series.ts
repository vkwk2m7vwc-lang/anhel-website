import type { ProductContent } from "../../types";
import type { VpuModificationsContent } from "@/components/products/water-treatment/VpuModificationsTable";
import type { CompositionContent } from "@/components/products/water-treatment/CompositionList";
import type { AutomationContent } from "@/components/products/water-treatment/AutomationSection";

/**
 * VPU ANHEL Series — TR translation. RU master in
 * ./../ru/water-treatment-anhel-series.ts. SanPiN and ГОСТ names kept
 * in their official forms (industry / regulatory references).
 */
export const content: ProductContent = {
  slug: "anhel-series",
  accent: "treatment",

  metaTitle: "ANHEL Su Arıtma Serisi — 56 m³/saat'e kadar — ANHEL®",
  metaDescription:
    "ANHEL Su Arıtma Serisi — 56 m³/saat'e kadar kapasiteli su arıtma üniteleri. Filtrasyon hatlarına göre 4 modifikasyon. Çok kademeli filtrasyon ve UV dezenfeksiyon. СанПиН 2.1.4.1074-01 uyumlu.",

  hero: {
    breadcrumbs: [
      { label: "Ana sayfa", href: "/" },
      { label: "Katalog", href: "/products" },
      { label: "Su arıtma", href: "/products/water-treatment" },
      { label: "ANHEL Su Arıtma Serisi" },
    ],
    sectionTag: "01 · ENDÜSTRİYEL EKİPMAN · SU ARITMA",
    title: "ANHEL Su Arıtma Serisi",
    subtitle:
      "56 m³/saat'e kadar su arıtma üniteleri. Çok kademeli mekanik filtrasyon ve ultraviyole dezenfeksiyon. Filtrasyon hatlarına göre 4 modifikasyon — tesisinizin debisine göre seçilir.",
    image: {
      src: "/assets/products/water-treatment/anhel-series/hero.webp",
      alt: "ANHEL Su Arıtma Serisi — 2-hatlı modifikasyon örneği",
    },
    imageCaption:
      "Fotoğrafta — 2-hatlı modifikasyon örneği. Gerçek konfigürasyon seri modeline göre değişir.",
    primaryCta: {
      label: "Teklif al",
      href: "/quiz/vpu",
      variant: "primary",
    },
    secondaryCta: {
      label: "Anket formu",
      href: "/quiz/vpu",
      variant: "ghost",
    },
  },

  techSpecs: [
    { label: "Çalışma basıncı", value: "6'ya kadar", unit: "bar" },
    { label: "Giriş suyu sıcaklığı", value: "+60'a kadar", unit: "°C" },
    { label: "Mahal hava sıcaklığı", value: "+5 ile +30 arası", unit: "°C" },
    { label: "Bağıl nem", value: "≤ 75", unit: "%" },
    { label: "İklim sınıfı", value: "У4 (ГОСТ 15150-69)" },
    { label: "UV dozu", value: "≥ 40", unit: "mJ/cm²" },
    { label: "Garanti", value: "24", unit: "ay" },
    { label: "Servis ömrü", value: "20", unit: "yıl" },
  ],

  description: {
    tag: "03 · AMAÇ",
    title: "СанПиН gerekliliklerine uygun içme suyu",
    paragraphs: [
      "ANHEL Su Arıtma Serisi, СанПиН 2.1.4.1074-01 (İçme suyu. Merkezi içme suyu sağlama sistemlerinin su kalitesine ilişkin hijyenik gereklilikler. Kalite kontrolü) uyarınca arıtılmış su üretmek için tasarlanmıştır. Merkezi içme suyu şebekesinden gelen suyun dezenfeksiyonu ve arıtılması için kullanılır.",
      "Uygulamalar; konut ve iş merkezlerini, tıbbi ve kamu kurumlarını, basınç yükseltme pompa istasyonları öncesindeki su hazırlığını ve teknolojik su kalitesi gereksinimleri olan üretim tesislerini kapsar. Ünite, binanın su besleme sistemindeki basınç yükseltme pompa istasyonları öncesinde, kapalı ve ısıtılan bir mahale yerleştirilir.",
    ],
  },

  applications: {
    tag: "04 · UYGULAMA",
    title: "Seri nerelerde kullanılır",
    lede: "Konut sitelerinden tıbbi kurumlara — СанПиН 2.1.4.1074-01 gereksinimleri olan tesisler.",
    items: [
      {
        id: "residential",
        mono: "01",
        title: "Konut siteleri",
        example: "Çok daireli konutlar, daireler, karma kullanımlı projeler",
      },
      {
        id: "business",
        mono: "02",
        title: "İş merkezleri",
        example: "Ofis binaları, çok fonksiyonlu kompleksler",
      },
      {
        id: "medical",
        mono: "03",
        title: "Tıbbi kurumlar",
        example: "Hastaneler, klinikler, rehabilitasyon merkezleri",
      },
      {
        id: "public",
        mono: "04",
        title: "Kamu kurumları",
        example: "Okullar, anaokulları, eğitim merkezleri",
      },
      {
        id: "boost-station",
        mono: "05",
        title: "Basınç yükseltme pompası öncesi",
        example: "Konut ve ticari tesislerde PBS için su hazırlığı",
      },
      {
        id: "industrial",
        mono: "06",
        title: "Üretim tesisleri",
        example: "Temizlik gereksinimleri olan teknolojik su",
      },
    ],
  },

  brands: {
    tag: "",
    title: "",
    rowPumps: [],
    rowComponents: [],
  },

  advantages: {
    tag: "09 · AVANTAJLAR",
    title: "Neden ANHEL Serisi",
    lede: "Her debi için model yelpazesi, çok kademeli arıtma ve Rusya'da üretim.",
    items: [
      {
        id: "modular-range",
        mono: "01",
        title: "Her debi için model yelpazesi",
        body: "Seride 4 modifikasyon — 22 ila 56 m³/saat. Tesisin gerçek debisine göre seçim.",
      },
      {
        id: "multi-stage",
        mono: "02",
        title: "Çok kademeli arıtma",
        body: "Üç kademeli mekanik filtrasyon (130 µm → 25 µm → 5 µm) ve en az 40 mJ/cm² dozlu UV dezenfeksiyon.",
      },
      {
        id: "industrial-automation",
        mono: "03",
        title: "Endüstriyel otomasyon",
        body: "Kontrol panosunda dokunmatik HMI, Modbus RTU üzerinden uzaktan izleme, üç erişim düzeyi: kullanıcı / yönetici / geliştirici.",
      },
      {
        id: "factory-skid",
        mono: "04",
        title: "Şase üzerinde fabrika montajı",
        body: "Modüler tasarım — ünite sahaya bağlantıya hazır gelir. Borulama, vanalar ve kontrol panosu fabrikada monte edilip test edilir.",
      },
      {
        id: "sanpin",
        mono: "05",
        title: "СанПиН 2.1.4.1074-01 uyumu",
        body: "Çıkış suyu, merkezi sistemlerin içme suyu gereksinimlerini karşılar. EAEU uygunluk beyanı № RU Д-RU.РA01.B.55819/21.",
      },
      {
        id: "russian-mfg",
        mono: "06",
        title: "Rusya'da üretim",
        body: "ANHEL® kendi montaj tesisi, Profit LLC mühendisliği, Saint Petersburg. 24 ay garanti, 20 yıl servis ömrü.",
      },
    ],
  },

  gallery: {
    tag: "",
    title: "",
    photos: [],
  },

  cases: {
    tag: "",
    title: "",
    items: [],
  },

  quiz: {
    tag: "",
    title: "",
  },

  documents: {
    tag: "10 · DOKÜMANTASYON",
    title: "Belgeler ve sertifikalar",
    lede: "EAEU uygunluk beyanı ve anket formu — geniş ANHEL su arıtma yelpazesiyle paylaşılır.",
    items: [
      {
        id: "oprosnik",
        title: "Su arıtma ünitesi seçimi için anket formu",
        size: "2,23 MB",
        href: "/docs/water-treatment/oprosnyi-list-tr.pdf",
      },
      {
        id: "cert-deklaratsiya",
        title: "EAEU uygunluk beyanı — ANHEL® su arıtma üniteleri",
        size: "0,49 MB",
        href: "/docs/water-treatment/cert-deklaratsiya.pdf",
      },
    ],
  },

  footerCta: {
    tag: "11 · TEKLİF TALEBİ",
    title: "Tesisinizin debisine göre modifikasyon seçeriz",
    subtitle:
      "Anket formunu doldurun — bir iş günü içinde yanıtlıyoruz. Boyutlandırma ücretsizdir.",
    cta: { label: "Teklif al", href: "/quiz/vpu" },
    secondaryCta: { label: "İletişime geç", href: "/contacts" },
    neighboursCaption: "Diğer bölümler",
  },
};

export const modifications: VpuModificationsContent = {
  tag: "05 · MODEL YELPAZESİ",
  title: "Filtrasyon hatlarına göre 4 modifikasyon",
  lede: "Seri kapasitesi paralel hat sayısıyla artar — çalışma prensibi tüm modellerde aynıdır.",
  headerStation: "İstasyon tipi",
  headerLines: "Hatlar",
  headerFlow: "Maks. debi",
  rows: [
    {
      id: "lines-2",
      station: "ANHEL Su Arıtma (2 hat)",
      linesLabel: "2 hat",
      flow: "21,9'a kadar",
      flowUnit: "m³/saat",
    },
    {
      id: "lines-3",
      station: "ANHEL Su Arıtma (3 hat)",
      linesLabel: "3 hat",
      flow: "22,0 ile 35,9 arası",
      flowUnit: "m³/saat",
    },
    {
      id: "lines-4",
      station: "ANHEL Su Arıtma (4 hat)",
      linesLabel: "4 hat",
      flow: "36,0 ile 45,9 arası",
      flowUnit: "m³/saat",
    },
    {
      id: "lines-5",
      station: "ANHEL Su Arıtma (5 hat)",
      linesLabel: "5 hat",
      flow: "46,0 ile 55,9 arası",
      flowUnit: "m³/saat",
    },
  ],
  footnote:
    "Kurulu güç ve genel boyutlar modifikasyona göre değişir ve boyutlandırma sırasında belirlenir. Anket formu, model seçimi için gereken tüm parametreleri içerir.",
};

export const principle = {
  tag: "06 · ÇALIŞMA PRENSİBİ",
  title: "Dört arıtma kademesi",
  lede: "Çok kademeli işlem — su, mekanik filtrasyon ve UV sterilizasyondan sırasıyla geçer.",
  items: [
    {
      id: "step-1",
      mono: "01",
      title: "Diskli filtre",
      body: "130 µm kaba mekanik filtrasyon. Büyük askıda partikülleri tutar. Manuel yıkama.",
    },
    {
      id: "step-2",
      mono: "02",
      title: "Torba filtrasyon",
      body: "İki ince filtrasyon kademesi: 25 µm + 5 µm. Mekanik ve koloidal partikülleri tutar. Diferansiyel basınç ile izlenir; ΔP > 1 bar olduğunda kartuşlar değiştirilir.",
    },
    {
      id: "step-3",
      mono: "03",
      title: "UV sterilizasyon",
      body: "Kuvars amalgam UV lambası. En az 40 mJ/cm² UV dozu. Lamba servis ömrü — 8800 saat / 1 yıl.",
    },
    {
      id: "step-4",
      mono: "04",
      title: "Kontrol panosu",
      body: "Dokunmatik HMI, otomatik ve manuel modlar, Modbus RTU üzerinden uzaktan izleme, üç erişim düzeyi.",
    },
  ],
};

export const composition: CompositionContent = {
  tag: "07 · ÜNİTE BİLEŞENLERİ",
  title: "Üniteye dahil olanlar",
  lede: "Şase üzerinde fabrika montajı. Ünite sahaya bağlantıya hazır gelir.",
  items: [
    "Ortak şase üzerinde proses borulama seti",
    "Diskli filtre (kaba filtrasyon)",
    "İki kademeli torba filtreler (25 µm + 5 µm)",
    "Ultraviyole sterilizatör (UV lamba)",
    "Dokunmatik HMI'lı kontrol panosu",
    "Gösterge manometreleri",
    "Basınç vericileri (giriş ve çıkış)",
    "Kapatma ve regülasyon vanaları",
    "Çek valfler",
  ],
};

export const automation: AutomationContent = {
  tag: "08 · MODLAR VE OTOMASYON",
  title: "Kontrol ve uzaktan izleme",
  lede: "Dokunmatik HMI, erişim seviyesi ayrımı, Modbus RTU üzerinden uzaktan izleme ve kapsamlı koruma seti.",
  blocks: [
    {
      mono: "01",
      title: "Çalışma modları",
      items: [
        "Otomatik — tüm UV lambaları kesikli Başlat/Durdur sinyaliyle eş zamanlı açılır/kapanır",
        "Manuel — her lamba operatör panelinden ayrı ayrı kontrol edilir",
      ],
    },
    {
      mono: "02",
      title: "Arayüz ve uzaktan izleme",
      items: [
        "Kontrol panosunun içinde dokunmatik operatör paneli",
        "Üç erişim düzeyi: kullanıcı / yönetici / geliştirici",
        "Kayıt: operasyonel mesajlar ve 24 saatlik arşiv",
        "Modbus RTU — parametre aktarımı (giriş/çıkış basıncı, fark, lamba durumu, genel alarm)",
      ],
    },
    {
      mono: "03",
      title: "Korumalar ve kilitlemeler",
      items: [
        "Giriş ve çıkış basınç izleme (< 0,5 bar'da koruma)",
        "UV lamba aşırı ısınma izleme",
        "Basınç vericilerinde açık devre ve kısa devre izleme",
      ],
    },
  ],
};
