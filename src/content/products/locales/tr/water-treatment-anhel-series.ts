import type { ProductContent } from "../../types";
import type { VpuModificationsContent } from "@/components/products/water-treatment/VpuModificationsTable";
import type { CompositionContent } from "@/components/products/water-treatment/CompositionList";
import type { AutomationContent } from "@/components/products/water-treatment/AutomationSection";
import type { QuickQuoteContent } from "@/components/products/water-treatment/QuickQuoteSection";

/**
 * VPU ANHEL Series — TR translation. RU master in
 * ./../ru/water-treatment-anhel-series.ts. SanPiN and ГОСТ names kept
 * in their official forms (industry / regulatory references).
 */
export const content: ProductContent = {
  slug: "anhel-series",
  accent: "treatment",

  metaTitle: "ANHEL Su Arıtma Serisi — çok daireli konutlar için 56 m³/saat'e kadar — ANHEL®",
  metaDescription:
    "Çok daireli konut yapıları ve siteler için ANHEL Su Arıtma Serisi — yeni inşaat ve yenileme. 56 m³/saat'e kadar kapasite, filtrasyon hatlarına göre 4 modifikasyon, UV dezenfeksiyon. СанПиН 2.1.4.1074-01 uyumlu.",

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
      "Çok daireli konut yapıları ve siteler için 56 m³/saat'e kadar su arıtma üniteleri — yeni inşaat ve yenileme. Çok kademeli mekanik filtrasyon ve ultraviyole dezenfeksiyon. Filtrasyon hatlarına göre 4 modifikasyon — binanın debisine göre seçilir.",
    image: {
      src: "/assets/products/water-treatment/anhel-series/hero.webp",
      alt: "ANHEL Su Arıtma Serisi — 2-hatlı modifikasyon örneği",
    },
    imageCaption:
      "Fotoğrafta — 2-hatlı modifikasyon örneği. Gerçek konfigürasyon seri modeline göre değişir.",
    primaryCta: {
      label: "Teklif al",
      href: "#quick-quote",
      variant: "primary",
    },
    secondaryCta: {
      label: "Anket formu",
      href: "/docs/water-treatment/oprosnyi-list-tr.pdf",
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
    title: "СанПиН gerekliliklerine uygun arıtılmış içme suyu",
    paragraphs: [
      "ANHEL Su Arıtma Serisi öncelikle çok daireli konut yapıları ve sitelerde — yeni inşaatlarda ve yenilemelerde — su arıtma için kullanılır. Ünite, binanın tesisat mahalinde basınç yükseltme pompa istasyonu öncesine yerleştirilir ve merkezi şebeke suyunu СанПиН 2.1.4.1074-01 (İçme suyu. Merkezi içme suyu sağlama sistemlerinin su kalitesine ilişkin hijyenik gereklilikler. Kalite kontrolü) gerekliliklerine uygun seviyeye getirir.",
      "Konutlar dışında seri; iş merkezlerinde, tıbbi ve kamu kurumlarında ve teknolojik su kalitesi gereksinimleri olan üretim tesislerinde de çalışır. Şart — kapalı ve ısıtılan bir mahal ile binanın su besleme sisteminde basınç yükseltme pompa istasyonu öncesine bağlantı.",
    ],
  },

  applications: {
    tag: "04 · UYGULAMA",
    title: "Seri nerelerde kullanılır",
    lede: "Birincil uygulama — çok daireli konut yapıları ve siteler. СанПиН 2.1.4.1074-01 gereksinimleri olan diğer tesislerde de kullanılır.",
    items: [
      {
        id: "residential",
        mono: "01",
        title: "Çok daireli konut yapıları",
        example: "Yeni inşaat ve yenileme — birincil kullanım senaryosu",
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
        title: "Her bina için model yelpazesi",
        body: "Seride 4 modifikasyon — küçük bir çok daireli binadan büyük bir konut sitesine. Kapasite 22-56 m³/saat, tesisin gerçek debisine göre seçilir.",
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
        body: "Modüler tasarım — ünite sahaya bağlantıya hazır gelir. Borulama, vanalar ve kontrol panosu fabrikada monte edilip test edilir. Yeni inşaatın devreye alma süresini kısaltır ve mevcut tesislerin tesisat mahali yenilemesini kolaylaştırır.",
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
  headerStation: "Tip",
  headerFlow: "Maks. debi",
  headerDimensions: "Boyutlar Y × G × D, mm",
  headerLamps: "UV lamba",
  footnote:
    "Kurulu güç ve ağırlık modifikasyona göre değişir ve boyutlandırma sırasında belirlenir. Anket formu, model seçimi için gereken tüm parametreleri içerir.",
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

export const quickQuote: QuickQuoteContent = {
  tag: "02 · HIZLI TEKLİF",
  title: "30 saniyede e-postaya PDF teklif",
  lede: "Gerekli debiyi girin — sistem modifikasyonu eşleştirir ve PDF olarak ticari teklif oluşturur.",
  flowLabel: "Debi",
  flowPlaceholder: "25",
  flowUnit: "m³/saat",
  matchedTag: "EŞLEŞTİ",
  emptyLabel: "Debiyi girin — modifikasyon otomatik olarak eşleşecek",
  oversizeTitle: "Debi tipik aralığın üstünde",
  oversizeBody:
    "Seri 55,9 m³/saate kadar tasarlanmıştır. Standart dışı konfigürasyon için bizimle iletişime geçin — tesisiniz için ölçeklendireceğiz.",
  oversizeCtaLabel: "İletişime geç",
  oversizeCtaHref: "/contacts",
  ctaPrimaryLabel: "Teklif al",
  ctaSecondaryLabel: "Anket formu (PDF)",
  ctaSecondaryHref: "/docs/water-treatment/oprosnyi-list-tr.pdf",
  divider: "veya",
  formTitle: "Teklif için bilgiler",
  fieldName: "Yetkili kişi",
  fieldNamePlaceholder: "Ad Soyad",
  fieldPhone: "Telefon",
  fieldPhonePlaceholder: "+90 ...",
  fieldEmail: "E-posta",
  fieldEmailPlaceholder: "ad@sirket.com",
  fieldCompany: "Şirketiniz",
  fieldCompanyPlaceholder: "Tasarım firması veya serbest çalışan",
  fieldDeveloper: "Geliştirici",
  fieldDeveloperPlaceholder: "Yapı sahibi / geliştirici",
  fieldObject: "Tesis (adres)",
  fieldObjectPlaceholder: "Şehir, proje adı, blok...",
  fieldCadastral: "Kadastro № (varsa)",
  fieldCadastralPlaceholder: "47:07:0000000:00000",
  fieldCadastralHint: "Opsiyonel. Belirtirseniz teklif kapak sayfasında görünür.",
  consentLabel:
    "Kişisel verilerimin gizlilik politikasına uygun olarak işlenmesini kabul ediyorum.",
  submitLabel: "Teklif oluştur",
  submitting: "Oluşturuluyor…",
  successTitle: "Teklif satış ekibine gönderildi ve indirildi",
  successBody:
    "PDF teklif otomatik olarak indirildi. Aynı parametrelerle bir kopya ANHEL satış ekibine gönderildi — bir iş günü içinde sizi arayacağız.",
  errorTitle: "Gönderim başarısız",
  errorGeneric: "Bir şeyler ters gitti. Lütfen tekrar deneyin veya doğrudan iletişime geçin.",
  errorPhone: "Geçersiz telefon — 7–15 rakam gerekli (artı, boşluk, tire kullanılabilir)",
  errorEmail: "Geçersiz e-posta — adresi kontrol edin",
  previewTitle: "Teklif önizlemesini inceleyin",
  previewBody:
    "Bu, ANHEL satış ekibine gönderilecek ve cihazınıza indirilecek ticari teklif. E-posta yalnızca onayladıktan sonra gönderilir.",
  previewConfirmLabel: "Onayla — satışa gönder ve indir",
  previewCancelLabel: "Gönderim yapmadan kapat",
  previewSending: "Gönderiliyor…",
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
