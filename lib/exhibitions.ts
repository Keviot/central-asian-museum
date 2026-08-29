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

export type ArtifactHighlight = {
  id: string;
  title: string;
  provenance: string;
  date: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  material?: string;
  dimensions?: string;
  accessionNumber?: string;
};

export type TimelineMilestone = {
  era: string;
  heading: string;
  description: string;
};

export type AudioGuideTrack = {
  title: string;
  duration: string;
  narrator: string;
  transcriptSnippet: string;
};

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
  curatorialEssay: string;
  curator: string;
  status: ExhibitionStatus;
  badgeLabel: string;
  featuredOnHome?: boolean;
  highlights: ArtifactHighlight[];
  seoKeywords: string[];
  timeline?: TimelineMilestone[];
  audioGuide?: AudioGuideTrack;
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

// Sample JSON Blocks for Silk Road Transformed demonstrating Text, YouTube Video, Inline Image, and Data Table
const silkRoadSampleBlocks = JSON.stringify([
  {
    id: "b-1",
    type: "paragraph",
    text: "For over two millennia, the Silk Road was far more than a commercial conduit for raw silk and spices—it was an engine of artistic hybridity and technological exchange across Eurasia. This flagship exhibition brings together over 150 masterworks excavated from Sogdian citadel vaults, Khotan silk workshops, and Samarkand royal treasuries.",
  },
  {
    id: "b-quote",
    type: "quote",
    text: "The Sogdian merchants of Panjakent were the true heralds of Central Asia, synthesizing Hellenistic Greek metalwork with Tang dynasty silk patterns.",
    author: "Dr. Alisher Narzullaev, Senior Curator",
  },
  {
    id: "b-yt",
    type: "youtube",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    title: "Curatorial Walkthrough: Sogdian Trade Monopolies & Lapis Lazuli Crafting",
  },
  {
    id: "b-heading-1",
    type: "heading",
    level: 2,
    text: "Masterwork Specimen Inventory & Chemical Analysis",
  },
  {
    id: "b-tbl",
    type: "table",
    headers: ["Specimen Name", "Excavation Site", "Historical Era", "Material Composition"],
    rows: [
      ["Sogdian Silver Pitcher", "Panjakent, Tajikistan", "7th Century CE", "Hammered Silver & 24k Gold Gilding"],
      ["Samarkand Star Tile", "Registan, Uzbekistan", "14th Century CE", "Glazed Faience & Lapis Lazuli"],
      ["Fergana Golden Brocade", "Khujand Silk Vaults", "8th Century CE", "Mulberry Silk & Pure Gold Wire"],
    ],
  },
  {
    id: "b-2",
    type: "paragraph",
    text: "Visitors are guided through four thematic galleries exploring goldsmithing, cobalt ceramic glazing, manuscript illumination, and luxury textile weaving. Highlights include sacred Sogdian silver pitchforks engraved with Bactrian inscriptions and 8th-century lapis lazuli beads traded between Badakhshan epigraphists and Tang dynasty court envoys.",
  },
]);

const emirateRobesSampleBlocks = JSON.stringify([
  {
    id: "e-1",
    type: "paragraph",
    text: "The Emirate of Bukhara was world-renowned for its lavish court regalia. Emirs presented ceremonial silk velvet robes (chapans) to visiting ambassadors, Russian envoys, and high-ranking dignitaries as emblems of royal favor.",
  },
  {
    id: "e-yt",
    type: "youtube",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    title: "Documentary Feature: Royal Zardozi Gold-Wire Embroidery of Bukhara",
  },
  {
    id: "e-2",
    type: "paragraph",
    text: "This collection features 25 royal chapans woven with natural saffron, madder root, and indigo dyes, trimmed with gold metallic thread coils (Zardozi) hand-embroidered by royal guild workshops.",
  },
]);

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
    curatorialEssay: silkRoadSampleBlocks,
    curator: "Dr. Alisher Narzullaev, Senior Fellow in Silk Road Archaeology",
    status: "Current",
    badgeLabel: "Featured Current Exhibition",
    featuredOnHome: true,
    audioGuide: {
      title: "Gallery Walkthrough: Sogdian Merchant Guilds & Lapis Trade",
      duration: "14:20",
      narrator: "Dr. Alisher Narzullaev & Curator Elena Vance",
      transcriptSnippet:
        "Welcome to Gallery A. As you step in front of Display Case 4, notice the silver pitcher crafted in Panjakent around 650 CE. Notice how the winged griffin motif fuses Hellenistic Greek mythology with nomadic Eurasian animal art...",
    },
    timeline: [
      {
        era: "2nd Century BCE",
        heading: "Opening of the Northern Oasis Routes",
        description:
          "Han Dynasty envoy Zhang Qian establishes formal diplomatic contact with Fergana and Sogdiana, launching international silk and jade commerce.",
      },
      {
        era: "7th Century CE",
        heading: "Golden Era of Sogdian Trade Guilds",
        description:
          "Sogdian merchants construct caravanserai networks from Samarkand to Chang'an, dominating precious metal, lapis lazuli, and spice monopolies.",
      },
      {
        era: "14th Century CE",
        heading: "Timurid Renaissance & Glazed Architectural Tilework",
        description:
          "Emperor Timur gathers master artisans from across Asia to build Samarkand's turquoise domes, creating revolutionary cobalt glaze techniques.",
      },
      {
        era: "19th Century CE",
        heading: "Bukhara Emirate Gold-Wire Zardozi & Abrbandi Ikat",
        description:
          "Royal guilds under the Emirs of Bukhara perfect gold bullion wire embroidery and silk velvet cloud-binding ikat weaving.",
      },
    ],
    seoKeywords: [
      "Silk Road Exhibition",
      "Sogdian Gold Artifacts",
      "Samarkand Cobalt Ceramics",
      "Central Asian Museum Leh",
    ],
    highlights: [
      {
        id: "h1-1",
        title: "Sogdian Silver Pitcher with Gilded Mythological Griffin",
        provenance: "Panjakent Excavations, Tajikistan",
        date: "7th Century CE",
        material: "Hammered Silver & 24k Gold Foil Gilding",
        dimensions: "34 cm (Height) x 18 cm (Diameter)",
        accessionNumber: "CAM-704-SILVER",
        description:
          "Hammered silver vessel featuring high-relief gilded winged griffins and Sogdian cursive inscriptions around the neck.",
        imageSrc: "/images/exhibitions/silk-road-transformed.png",
        imageAlt: "Gilded silver pitcher with Sogdian inscriptions",
      },
      {
        id: "h1-2",
        title: "Samarkand Cobalt Glazed Star Tile",
        provenance: "Registan Square Complex, Uzbekistan",
        date: "14th Century CE",
        material: "Glazed Faience & Lapis Lazuli Pigment",
        dimensions: "28 cm x 28 cm x 4 cm",
        accessionNumber: "CAM-1390-TILE",
        description:
          "Eight-pointed star ceramic tile rendered in deep lapis lazuli blue and gold luster overglaze, bearing Quranic calligraphy.",
        imageSrc: "/images/exhibitions/azure-horizons-timurid.png",
        imageAlt: "Cobalt blue architectural tile with gold calligraphy",
      },
      {
        id: "h1-3",
        title: "Fergana Golden Brocade Fragment",
        provenance: "Silk Vaults of Khujand",
        date: "8th Century CE",
        material: "Mulberry Silk & Pure Gold Thread",
        dimensions: "45 cm x 30 cm",
        accessionNumber: "CAM-802-TEXTILE",
        description:
          "Woven silk brocade woven with pure gold foil threads depicting stylized pomegranate trees and celestial pearl roundels.",
        imageSrc: "/images/exhibitions/echoes-of-the-nomads.png",
        imageAlt: "Golden silk brocade fabric fragment",
      },
    ],
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
    curatorialEssay:
      "Under the patronage of Emperor Timur and his descendants, the 14th and 15th centuries witnessed a golden age of monumental Islamic architecture across Central Asia. Characterized by soaring turquoise ribbed domes, intricate tile mosaic faience, and honeycombed muqarnas vaulting, Timurid construction fused Persian mathematics with nomadic grandeur.\n\nThis exhibition presents architectural scale models, original tile panels retrieved during 20th-century conservation initiatives, and interactive architectural projections illuminating the sacred geometry of the Gur-e-Amir mausoleum.",
    curator: "Prof. Dilnoza Tashpulatova, Department of Architectural History",
    status: "Current",
    badgeLabel: "Must See",
    featuredOnHome: true,
    seoKeywords: [
      "Timurid Architecture",
      "Samarkand Tilework",
      "Muqarnas Vaulting",
      "Central Asian Tile Art",
    ],
    highlights: [
      {
        id: "h2-1",
        title: "Turquoise Mosaic Faience Panel from Shah-i-Zinda",
        provenance: "Necropolis of Shah-i-Zinda, Samarkand",
        date: "1390 CE",
        description:
          "Carved glazed terracotta panel incorporating cobalt blue, turquoise, and white ceramic tesserae forming complex geometric rosettes.",
        imageSrc: "/images/exhibitions/azure-horizons-timurid.png",
        imageAlt: "Turquoise mosaic faience panel",
      },
      {
        id: "h2-2",
        title: "Muqarnas Vaulting Architectural Blueprint Codex",
        provenance: "Bukhara Curatorial Archive",
        date: "15th Century CE",
        description:
          "Rare grid-paper manuscript codex detailing mathematical calculations for 3D corbelled muqarnas vaulting construction.",
        imageSrc: "/images/exhibitions/celestial-charts-ulugh-beg.png",
        imageAlt: "Architectural manuscript codex with grid drawings",
      },
    ],
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
    curatorialEssay:
      "Textiles served as both shelter and sacred heraldry for the nomadic pastoralists of Central Asia. Embroidered suzani wall hangings were crafted by young brides and their mothers over years, incorporating protective motifs of pomegranates, iris blossoms, and solar disks.\n\nFeaturing 60 pristine 18th- and 19th-century textiles from Tashkent, Nurata, and Shahrisabz, this gallery highlights natural madder root and indigo dye recipes alongside silk velvet Abrbandi (cloud-binding) ikat techniques.",
    curator: "Gulnora Karimova, Curator of Ethnic Textile Heritage",
    status: "Upcoming",
    badgeLabel: "Upcoming Highlight",
    featuredOnHome: true,
    seoKeywords: [
      "Suzani Embroidery",
      "Nomadic Textiles Central Asia",
      "Fergana Ikat Robes",
      "Pamiri Handwoven Tapestry",
    ],
    highlights: [
      {
        id: "h3-1",
        title: "Nurata Silk Suzani Bridal Canopy",
        provenance: "Nurata Oasis, Uzbekistan",
        date: "c. 1840 CE",
        description:
          "Hand-stitched silk thread embroidery on linen base featuring flowering vines, nightingales, and central pomegranate rosettes.",
        imageSrc: "/images/exhibitions/echoes-of-the-nomads.png",
        imageAlt: "Nurata silk suzani bridal canopy",
      },
      {
        id: "h3-2",
        title: "Bukhara Golden Silk Velvet Chapan Coat",
        provenance: "Emirate Court Archives, Bukhara",
        date: "c. 1880 CE",
        description:
          "Men's ceremonial court robe crafted from gold-wire embroidery over saffron and indigo ikat-dyed silk velvet.",
        imageSrc: "/images/exhibitions/emirate-royal-robes.png",
        imageAlt: "Golden silk velvet chapan coat",
      },
    ],
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
    curatorialEssay:
      "Excavated at Tillia Tepe ('The Golden Hill') in 1978, the Bactrian Gold Hoard is regarded as one of the single greatest archaeological discoveries of the 20th century. Burial mounds of nomadic princes and noblewomen contained over 20,000 gold ornaments dating from the 1st century BCE to 1st century CE.\n\nThe artifacts demonstrate a breathtaking synthesis of Hellenistic Greek, Persian Achaemenid, Indian, and steppe nomadic animal-style metallurgy.",
    curator: "Dr. Iskandar Rahim, Curator of Ancient Metallurgy",
    status: "Current",
    badgeLabel: "Royal Treasury Display",
    featuredOnHome: true,
    seoKeywords: [
      "Bactrian Gold Hoard",
      "Tillia Tepe Gold",
      "Nomadic Gold Crown",
      "Ancient Metallurgy Central Asia",
    ],
    highlights: [
      {
        id: "h4-1",
        title: "Foldable Gold Crown with Trees of Life and Turquoise Birds",
        provenance: "Tillia Tepe Burial Mound 6",
        date: "1st Century BCE",
        description:
          "Collapsible gold crown constructed of five openwork trees populated by heart-shaped turquoise leaves and repoussé golden birds.",
        imageSrc: "/images/exhibitions/bactrian-gold-hoard.png",
        imageAlt: "Foldable gold crown with turquoise inlay",
      },
    ],
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
    curatorialEssay:
      "In 1420 CE, Sultan Ulugh Beg erected a monumental three-story astronomical observatory on the hills of Samarkand. Equipped with a 40-meter meridional arc sextant embedded into the rock, Ulugh Beg and his team cataloged 1,018 stars with unprecedented mathematical accuracy, published in the Zij-i Sultani.\n\nThis exhibition presents illuminated 15th-century manuscripts, celestial globes cast in brass, and astrolabes used by Silk Road navigators.",
    curator: "Dr. Farrukh Astronomer, Manuscript Epigraphist",
    status: "Upcoming",
    badgeLabel: "Scholarly Retrospective",
    featuredOnHome: false,
    seoKeywords: [
      "Ulugh Beg Observatory",
      "Samarkand Star Charts",
      "Zij-i Sultani Codex",
      "Islamic Astronomy Manuscripts",
    ],
    highlights: [
      {
        id: "h5-1",
        title: "Zij-i Sultani Astronomical Tables Manuscript",
        provenance: "Ulugh Beg Observatory Library, Samarkand",
        date: "1437 CE",
        description:
          "Illuminated stellar coordinate tables written in Naskh script with lapis lazuli borders and gold-leaf constellation diagrams.",
        imageSrc: "/images/exhibitions/celestial-charts-ulugh-beg.png",
        imageAlt: "Astronomical manuscript with gold leaf constellation diagrams",
      },
    ],
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
    curatorialEssay: emirateRobesSampleBlocks,
    curator: "Svetlana Rozhkova, Chief Conservator of Royal Costumes",
    status: "Upcoming",
    badgeLabel: "Court Heritage Display",
    featuredOnHome: false,
    seoKeywords: [
      "Bukhara Royal Robes",
      "Emirate Ceremonial Chapans",
      "Zardozi Gold Embroidery",
      "Silk Velvet Central Asia",
    ],
    highlights: [
      {
        id: "h6-1",
        title: "Emirate Royal Gold-Thread Zardozi Chapan",
        provenance: "Ark Citadel of Bukhara",
        date: "c. 1875 CE",
        description:
          "High-collared silk velvet ceremonial robe embroidered with heavy gold bullion wire depicting cypress trees and royal palmettes.",
        imageSrc: "/images/exhibitions/emirate-royal-robes.png",
        imageAlt: "Gold bullion wire embroidered ceremonial robe",
      },
    ],
  },
];
