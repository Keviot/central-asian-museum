export type CollectionCategory =
  | "All"
  | "Ceramics & Glaze"
  | "Textiles & Silks"
  | "Architecture & Tiles"
  | "Gold & Metallurgy"
  | "Manuscripts & Lore";

export type CollectionItem = {
  id: string;
  slug: string;
  title: string;
  category: CollectionCategory;
  period: string;
  origin: string;
  imageSrc: string;
  imageAlt: string;
  description: string;
  highlight?: string;
  aspectRatioClass: string;
  colSpanClass: string;
  rowSpanClass?: string;
  featuredOnHome?: boolean;
};

export const collectionCategories: CollectionCategory[] = [
  "All",
  "Ceramics & Glaze",
  "Textiles & Silks",
  "Architecture & Tiles",
  "Gold & Metallurgy",
  "Manuscripts & Lore",
];

export const collectionsData: CollectionItem[] = [
  {
    id: "samarkand-ceramic-vessel",
    slug: "samarkand-ceramic-vessel",
    title: "Cobalt Floral Amphora",
    category: "Ceramics & Glaze",
    period: "14th Century CE",
    origin: "Samarkand Workshop",
    imageSrc: "/images/collections/samarkand-ceramic.jpg",
    imageAlt: "Ceramic amphora with cobalt blue glaze and intricate floral calligraphy",
    description:
      "A masterpiece of early Timurid ceramic technology featuring deep cobalt and turquoise underglaze pigments with stylized lotus leaves and poetic inscriptions.",
    highlight: "Timurid Masterwork",
    aspectRatioClass: "aspect-3/4",
    colSpanClass: "lg:col-span-4",
    rowSpanClass: "lg:row-span-2",
    featuredOnHome: true,
  },
  {
    id: "timurid-muqarnas-tile",
    slug: "timurid-muqarnas-tile",
    title: "Shah-i-Zinda Azure Tile",
    category: "Architecture & Tiles",
    period: "Late 14th Century",
    origin: "Shah-i-Zinda Necropolis",
    imageSrc: "/images/collections/timurid-tile.jpg",
    imageAlt: "Carved and glazed geometric mosaic architectural tile in lapis lazuli and gold luster",
    description:
      "Intricately carved polychrome faience tile from the necropolis vaults, showcasing overlapping arabesques and 24-karat gold leaf luster over glaze.",
    highlight: "UNESCO Heritage Artifact",
    aspectRatioClass: "aspect-16/9",
    colSpanClass: "lg:col-span-8",
    featuredOnHome: true,
  },
  {
    id: "fergana-silk-suzani",
    slug: "fergana-silk-suzani",
    title: "Solar Pomegranate Suzani",
    category: "Textiles & Silks",
    period: "Early 18th Century",
    origin: "Fergana Valley",
    imageSrc: "/images/collections/suzani-textile.jpg",
    imageAlt: "Hand-embroidered silk suzani tapestry with crimson pomegranates and solar disks",
    description:
      "Embroidered on hand-spun cotton with vegetal-dyed silk threads using tambour stitching. The vibrant pomegranate and solar motifs symbolize abundance and cosmic protection.",
    highlight: "Nomadic Heritage",
    aspectRatioClass: "aspect-4/5",
    colSpanClass: "lg:col-span-4",
    featuredOnHome: true,
  },
  {
    id: "bactrian-gold-pendant",
    slug: "bactrian-gold-pendant",
    title: "Winged Gryphon Pectoral",
    category: "Gold & Metallurgy",
    period: "2nd Century BCE",
    origin: "Ancient Bactria",
    imageSrc: "/images/collections/bactrian-gold.jpg",
    imageAlt: "Ancient gold pectoral ornament depicting a winged mythological beast inlaid with turquoise",
    description:
      "Excavated from steppe burial mounds, this gold repoussé ornament is inlaid with authentic Afghan lapis lazuli and Persian turquoise, demonstrating Hellenistic-Nomadic synthesis.",
    highlight: "Pre-Islamic Gold",
    aspectRatioClass: "aspect-4/5",
    colSpanClass: "lg:col-span-4",
    featuredOnHome: true,
  },
  {
    id: "celestial-astronomy-manuscript",
    slug: "celestial-astronomy-manuscript",
    title: "Zij-i Sultani Star Catalogue",
    category: "Manuscripts & Lore",
    period: "circa 1437 CE",
    origin: "Ulugh Beg Observatory",
    imageSrc: "/images/collections/celestial-manuscript.jpg",
    imageAlt: "Illuminated astronomical chart with gilded constellation drawings and Arabic-Persian calligraphy",
    description:
      "One of the most accurate astronomical charts of the medieval world, containing coordinates for 1,018 stars measured from the great sextant of Samarkand.",
    highlight: "Scientific Milestone",
    aspectRatioClass: "aspect-16/10",
    colSpanClass: "lg:col-span-7",
    featuredOnHome: true,
  },
  {
    id: "chapan-royal-robe",
    slug: "chapan-royal-robe",
    title: "Bukhara Velvet Ikat Chapan",
    category: "Textiles & Silks",
    period: "19th Century CE",
    origin: "Emirate of Bukhara",
    imageSrc: "/images/collections/chapan-ikat.jpg",
    imageAlt: "Silk velvet chapan coat featuring bold red and saffron cloudband ikat patterns",
    description:
      "A ceremonial court robe tailored from silk-velvet abrbandi (cloud-bound) ikat, worn by aristocracy during diplomatic receptions along the northern trade route.",
    highlight: "Emirate Court Attire",
    aspectRatioClass: "aspect-4/5",
    colSpanClass: "lg:col-span-5",
    featuredOnHome: true,
  },
  {
    id: "sogdian-silver-ewer",
    slug: "sogdian-silver-ewer",
    title: "Sogdian Banquet Silver Ewer",
    category: "Gold & Metallurgy",
    period: "7th Century CE",
    origin: "Panjakent, Sogdiana",
    imageSrc: "/images/collections/sogdian-silver.jpg",
    imageAlt: "Repousse silver wine pitcher with engraved mythological musician figures",
    description:
      "Silver vessel with partial gilding depicting Dionysian dancers in Central Asian tunics, testifying to the cosmopolitan merchant culture of pre-Islamic Silk Road cities.",
    highlight: "Silk Road Trade Relic",
    aspectRatioClass: "aspect-4/3",
    colSpanClass: "lg:col-span-6",
    featuredOnHome: false,
  },
  {
    id: "khiva-carved-pillar",
    slug: "khiva-carved-pillar",
    title: "Juma Mosque Carved Elm Capital",
    category: "Architecture & Tiles",
    period: "15th–16th Century",
    origin: "Ichan Kala, Khiva",
    imageSrc: "/images/collections/khiva-wood.jpg",
    imageAlt: "Ornately relief-carved dark elmwood pillar capital with geometric calligraphy",
    description:
      "One of the iconic 218 relief-carved timber pillars that support the hypostyle prayer hall in Khiva, decorated with fluid vegetal arabesques and Kufic blessings.",
    highlight: "Master Woodcraft",
    aspectRatioClass: "aspect-4/3",
    colSpanClass: "lg:col-span-6",
    featuredOnHome: false,
  },
];
