export type ExhibitionStatus = "Current" | "Upcoming" | "Special" | "Permanent";

export type ExhibitionCategory =
  | "All"
  | "Current"
  | "Upcoming"
  | "Special Exhibitions"
  | "Architecture & Tilework"
  | "Textile Art & Culture"
  | "Gold & Metallurgy"
  | "Manuscripts & Astronomy";

export type ExhibitionItem = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  dateRange: string;
  location: string;
  imageSrc: string;
  imageAlt: string;
  description: string;
  status: ExhibitionStatus;
  badgeLabel: string;
  featuredOnHome?: boolean;
};

export const exhibitionCategories: ExhibitionCategory[] = [
  "All",
  "Current",
  "Upcoming",
  "Special Exhibitions",
  "Architecture & Tilework",
  "Textile Art & Culture",
  "Gold & Metallurgy",
  "Manuscripts & Astronomy",
];

export const exhibitionsData: ExhibitionItem[] = [
  {
    id: "silk-road-transformed",
    slug: "silk-road-transformed",
    title: "The Silk Road Transformed: Gold, Silk & Lapis",
    subtitle: "Cross-Cultural Mastery Along the Ancient Trade Routes",
    category: "Special Exhibitions",
    dateRange: "October 15, 2025 – April 30, 2026",
    location: "Main Exhibition Hall A",
    imageSrc: "/images/exhibitions/silk-road-transformed.png",
    imageAlt: "Intricate golden and lapis blue Central Asian ceramic tiles and silver pitchers",
    description:
      "Experience over 150 rare gold artifacts, Sogdian silver pitchforks, and Samarkand cobalt ceramics that reveal the vibrant commercial and artistic exchanges of medieval Asia.",
    status: "Current",
    badgeLabel: "Featured Current Exhibition",
    featuredOnHome: true,
  },
  {
    id: "azure-horizons-timurid",
    slug: "azure-horizons-timurid",
    title: "Azure Horizons: Masterpieces of Timurid Architecture",
    subtitle: "Sacred Geometry, Muqarnas & Cobalt Glazes",
    category: "Architecture & Tilework",
    dateRange: "November 1, 2025 – May 20, 2026",
    location: "East Wing Pavilion",
    imageSrc: "/images/exhibitions/azure-horizons-timurid.png",
    imageAlt: "Magnificent turquoise tiled domes and muqarnas arches of Samarkand madrasas",
    description:
      "A monumental survey of 14th-century architectural innovations, featuring scaled 3D reconstructions, original mosaic tile fragments from Registan, and curatorial archives.",
    status: "Current",
    badgeLabel: "Must See",
    featuredOnHome: true,
  },
  {
    id: "echoes-of-the-nomads",
    slug: "echoes-of-the-nomads",
    title: "Echoes of the Nomads: Tribal Textiles & Suzani",
    subtitle: "Hand-Woven Traditions of the Fergana Valley",
    category: "Textile Art & Culture",
    dateRange: "June 1, 2026 – December 15, 2026",
    location: "Grand Atrium Gallery",
    imageSrc: "/images/exhibitions/echoes-of-the-nomads.png",
    imageAlt: "Traditional hand-embroidered Central Asian suzani tapestry with pomegranate motifs",
    description:
      "An intimate celebration of nomadic ceremonial tapestries, ikat court robes, and silver jewelry crafted by legendary master artisans across the Pamir and Tian Shan mountains.",
    status: "Upcoming",
    badgeLabel: "Upcoming Highlight",
    featuredOnHome: true,
  },
  {
    id: "bactrian-gold-hoard",
    slug: "bactrian-gold-hoard",
    title: "The Gold Hoard of Ancient Bactria",
    subtitle: "Sacred Crowns & Mythological Pectorals",
    category: "Gold & Metallurgy",
    dateRange: "January 10, 2026 – July 31, 2026",
    location: "Treasury Gallery Hall B",
    imageSrc: "/images/exhibitions/bactrian-gold-hoard.png",
    imageAlt: "Ancient gold crown inlay with lapis lazuli and turquoise gems",
    description:
      "Displaying over 20,000 gold foil elements and turquoise-inlaid crowns excavated from 2,000-year-old nomadic burial mounds across Northern Afghanistan.",
    status: "Current",
    badgeLabel: "Royal Treasury Display",
    featuredOnHome: true,
  },
  {
    id: "celestial-charts-ulugh-beg",
    slug: "celestial-charts-ulugh-beg",
    title: "Mapping the Heavens: Astronomical Codexes of Samarkand",
    subtitle: "Islamic Astronomy & Star Charts of the 15th Century",
    category: "Manuscripts & Astronomy",
    dateRange: "September 5, 2026 – March 20, 2027",
    location: "Scholarly Archive Wing",
    imageSrc: "/images/exhibitions/celestial-charts-ulugh-beg.png",
    imageAlt: "Illuminated astronomical star charts and Arabic manuscripts with gold leaf",
    description:
      "Rare manuscripts from Ulugh Beg Observatory detailing star coordinates measured with medieval giant sextants, preserved in 24k gold leaf calligraphy.",
    status: "Upcoming",
    badgeLabel: "Scholarly Retrospective",
    featuredOnHome: false,
  },
  {
    id: "emirate-royal-robes",
    slug: "emirate-royal-robes",
    title: "Splendors of Bukhara: Royal Robes & Ikat Velvets",
    subtitle: "Ceremonial Court Garments of the 19th Century",
    category: "Textile Art & Culture",
    dateRange: "August 1, 2026 – January 30, 2027",
    location: "Textile Heritage Gallery",
    imageSrc: "/images/exhibitions/emirate-royal-robes.png",
    imageAlt: "Vibrant silk velvet chapan coat featuring saffron and crimson cloudband patterns",
    description:
      "A magnificent display of silk velvet court robes, gold-wire embroideries, and ceremonial headwear worn by aristocrats during diplomatic receptions in Bukhara.",
    status: "Upcoming",
    badgeLabel: "Court Heritage Display",
    featuredOnHome: false,
  },
];
