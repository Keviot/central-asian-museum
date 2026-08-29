export type NewsEventCategory =
  | "All"
  | "Lecture & Symposium"
  | "Artisan Workshop"
  | "Curatorial News"
  | "Cultural Gala"
  | "Press Release";

export type NewsEventItem = {
  id: string;
  slug: string;
  title: string;
  category: NewsEventCategory;
  date: string;
  time?: string;
  location: string;
  imageSrc: string;
  imageAlt: string;
  summary: string;
  fullContent: string;
  rsvpRequired?: boolean;
  featuredOnHome?: boolean;
};

export const newsEventCategories: NewsEventCategory[] = [
  "All",
  "Lecture & Symposium",
  "Artisan Workshop",
  "Curatorial News",
  "Cultural Gala",
  "Press Release",
];

export const newsEventsData: NewsEventItem[] = [
  {
    id: "symposium-silk-road-preservation",
    slug: "symposium-silk-road-preservation",
    title: "International Symposium: Preserving Silk Road Architectural Ceramics",
    category: "Lecture & Symposium",
    date: "March 18, 2026",
    time: "2:00 PM – 5:30 PM",
    location: "Main Auditorium & Virtual Stream",
    imageSrc: "/images/events_and_news/symposium-silk-road-preservation.png",
    imageAlt: "International curators discussing ancient Timurid ceramic tile restoration",
    summary:
      "Renowned conservators from UNESCO and Samarkand State University gather to present breakthrough non-destructive laser techniques for restoring 14th-century glazed tiles.",
    fullContent:
      "Join world-leading architectural conservators, materials scientists, and art historians for a half-day symposium dedicated to the conservation of Timurid tilework. Panelists will share findings from recent field restorations at Shah-i-Zinda and Registan Square, detailing advanced climate monitoring, pigment analysis, and mortar stabilization methods.",
    rsvpRequired: true,
    featuredOnHome: true,
  },
  {
    id: "workshop-fergana-silk-weaving",
    slug: "workshop-fergana-silk-weaving",
    title: "Masterclass: Traditional Fergana Silk Weaving & Ikat Craft",
    category: "Artisan Workshop",
    date: "April 05, 2026",
    time: "10:30 AM – 3:00 PM",
    location: "Artisan Courtyard Studio",
    imageSrc: "/images/events_and_news/workshop-fergana-silk-weaving.png",
    imageAlt: "Master weaver demonstrating silk thread dyeing and loom setup",
    summary:
      "Experience a hands-on workshop led by 7th-generation Margilan master weavers demonstrating natural indigo dyeing and cloudband ikat pattern setup.",
    fullContent:
      "Immerse yourself in centuries of living textile heritage. Master weaver Alisher Nizamov guides participants through raw silk thread extraction, natural botanical dyeing techniques using madder root and walnut hulls, and traditional handloom weaving setup. All materials provided.",
    rsvpRequired: true,
    featuredOnHome: true,
  },
  {
    id: "news-bactrian-gold-acquisition",
    slug: "news-bactrian-gold-acquisition",
    title: "Curatorial Update: Museum Acquires Rare 2nd Century BCE Bactrian Pectoral",
    category: "Curatorial News",
    date: "May 12, 2026",
    time: "Press Announcement",
    location: "Treasury Gallery Hall",
    imageSrc: "/images/events_and_news/news-bactrian-gold-acquisition.png",
    imageAlt: "Ancient gold pectoral inlaid with lapis lazuli on display",
    summary:
      "The Central Asian Museum acquires an extraordinary gold repoussé ornament featuring winged gryphons inlaid with lapis lazuli and Persian turquoise.",
    fullContent:
      "Following a three-year international provenance authentication study, the Central Asian Museum is honored to unveil a newly acquired Hellenistic-Nomadic gold pectoral. The artifact represents one of the finest surviving examples of Greco-Bactrian goldsmithing, showcasing Hellenistic mythological motifs combined with Steppe animal style artistry.",
    rsvpRequired: false,
    featuredOnHome: true,
  },
  {
    id: "gala-spring-silk-road-cultural-night",
    slug: "gala-spring-silk-road-cultural-night",
    title: "Annual Spring Gala: Music & Poetry of the Pamirs",
    category: "Cultural Gala",
    date: "June 20, 2026",
    time: "7:00 PM – 10:30 PM",
    location: "Grand Museum Garden & Atrium",
    imageSrc: "/images/events_and_news/gala-spring-silk-road-cultural-night.png",
    imageAlt: "Evening illuminated museum courtyard with acoustic lute performance",
    summary:
      "An enchanting evening featuring live Rubab lutes, Sufi poetry recitations, and authentic Silk Road culinary tastings beneath illuminated garden canopy.",
    fullContent:
      "Celebrate the summer solstice at our annual cultural fundraising gala. The evening includes live acoustic performances by traditional Pamiri master musicians, classic Ghazal poetry recitations in Persian and Chagatai, an exclusive after-hours gallery tour, and seasonal Central Asian culinary pairings.",
    rsvpRequired: true,
    featuredOnHome: true,
  },
  {
    id: "news-leh-citadel-excavation",
    slug: "news-leh-citadel-excavation",
    title: "Press Release: Archaeologists Unearth 8th-Century Caravanserai Coin Hoard",
    category: "Press Release",
    date: "July 14, 2026",
    time: "Media Bulletin",
    location: "Leh Old Town Dig Site",
    imageSrc: "/images/events_and_news/news-leh-citadel-excavation.png",
    imageAlt: "Archaeological dig site revealing ancient stone walls and silver coins",
    summary:
      "Joint field excavations near the historic Leh Palace reveal a cached jar of Sogdian silver drachmas and Tibetan trade seals dating to the 8th century CE.",
    fullContent:
      "Archaeologists from the Central Asian Museum and the Archaeological Survey of India have uncovered a pristine caravanserai storehouse near the Leh Old Town citadel. The excavation yielded 142 Sogdian silver drachmas, silver trade ingots, and wooden seal stamps confirming direct commercial transit between Khotan and Leh.",
    rsvpRequired: false,
    featuredOnHome: true,
  },
  {
    id: "lecture-sogdian-merchant-ledgers",
    slug: "lecture-sogdian-merchant-ledgers",
    title: "Curator Talk: Deciphering Sogdian Letters & Silk Road Merchant Ledgers",
    category: "Lecture & Symposium",
    date: "August 28, 2026",
    time: "4:00 PM – 5:30 PM",
    location: "Manuscript Reading Room",
    imageSrc: "/images/events_and_news/lecture-sogdian-merchant-ledgers.png",
    imageAlt: "Rare ancient paper manuscript with black and red Sogdian ink script",
    summary:
      "Dr. Farrukh Tashkandi analyzes recent translations of paper letters found in Dunhuang watchtowers, offering an intimate look into Sogdian merchant lives.",
    fullContent:
      "Discover the private correspondence, contract disputes, and family affairs of Sogdian merchant guilds operating along the Silk Road 1,600 years ago. Senior epigraphist Dr. Tashkandi decodes rare paper fragments written in Sogdian script, shedding light on credit systems, spice prices, and caravan safety.",
    rsvpRequired: true,
    featuredOnHome: true,
  },
];
