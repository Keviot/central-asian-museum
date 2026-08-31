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
      "Renowned conservators from UNESCO, Samarkand State University, and the Louvre gather to present breakthrough non-destructive laser techniques for restoring 14th-century glazed tiles. Attendees will explore field case studies from Shah-i-Zinda and Registan Square.",
    fullContent:
      "Join world-leading architectural conservators, materials scientists, and art historians for a half-day international symposium dedicated to the conservation of Timurid tilework and glazed ceramic facades.\n\nPanelists will share findings from recent field restorations at Shah-i-Zinda and Registan Square, detailing advanced micro-laser cleaning, non-invasive pigment analysis, and climate monitoring in desert environments. The session concludes with a live Q&A with master ceramic conservator Dr. Alisher Narzullaev.",
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
      "Experience a hands-on workshop led by 7th-generation Margilan master weavers demonstrating natural indigo dyeing and cloudband ikat pattern setup. Participants will craft their own silk sample to take home.",
    fullContent:
      "Immerse yourself in centuries of living textile heritage. Master weaver Alisher Nizamov guides participants through raw silk thread extraction, natural botanical dyeing techniques using madder root, walnut hulls, and pomegranate rinds, and traditional handloom weaving setup.\n\nParticipants will learn the intricate binding technique of Abrbandi (cloud-binding) that gives Fergana ikat its distinctive feathered edges. All workshop materials, silk threads, and protective aprons are provided.",
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
      "The Central Asian Museum acquires an extraordinary gold repoussé ornament featuring winged gryphons inlaid with lapis lazuli and Persian turquoise. This landmark acquisition will anchor the upcoming Treasury Gallery display.",
    fullContent:
      "Following a three-year international provenance authentication study, the Central Asian Museum is honored to unveil a newly acquired Hellenistic-Nomadic gold pectoral ornament dating to the 2nd century BCE.\n\nThe artifact represents one of the finest surviving examples of Greco-Bactrian goldsmithing, showcasing Hellenistic mythological motifs combined with Steppe animal style artistry. Metallurgical testing confirms pure 24k gold foil repoussé construction inlaid with genuine Badakhshan lapis lazuli and Nishapur turquoise.",
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
      "An enchanting evening featuring live Rubab lutes, Sufi poetry recitations, and authentic Silk Road culinary tastings beneath an illuminated garden canopy. All proceeds support archaeological field grants for young scholars.",
    fullContent:
      "Celebrate the summer solstice at our annual cultural fundraising gala beneath the starlit sky of our Grand Museum Courtyard.\n\nThe evening includes live acoustic performances by traditional Pamiri master musicians playing the Rubab and Tanbur lutes, classic Ghazal poetry recitations in Persian and Chagatai, an exclusive curator-led after-hours gallery tour, and seasonal Central Asian culinary pairings prepared by guest chefs from Tashkent.",
    rsvpRequired: true,
    featuredOnHome: true,
  },
  {
    id: "news-leh-citadel-excavation",
    slug: "news-leh-citadel-excavation",
    title: "Archaeological Report: High-Altitude Trade Outpost Uncovered in Ladakh",
    category: "Press Release",
    date: "July 08, 2026",
    time: "11:00 AM Press Briefing",
    location: "Lecture Hall B & Online Press Room",
    imageSrc: "/images/events_and_news/news-leh-citadel-excavation.png",
    imageAlt: "Archaeologists excavating mountain trade outpost site in Leh Ladakh",
    summary:
      "Joint expedition team discovers 8th-century caravan shelter artifacts, including Sogdian silver coins, Chinese silk fragments, and Tibetan birch-bark manuscripts at 4,000 meters elevation in the Ladakh Range.",
    fullContent:
      "A collaborative archaeological expedition led by the Central Asian Museum and Leh Archaeological Survey has uncovered a remarkably preserved 8th-century high-altitude caravanserai complex in the Upper Ladakh Range.\n\nArtifacts recovered from the site include silver coins minted in Panjakent, fragments of Tang dynasty damask silk, dried medicinal botanicals, and birch-bark manuscripts written in Khotanese Saka and Classical Tibetan. These finds confirm the vital role of trans-Himalayan mountain passes in connecting Sogdian merchants with Tibetan traders.",
    rsvpRequired: false,
    featuredOnHome: false,
  },
  {
    id: "lecture-sogdian-merchant-ledgers",
    slug: "lecture-sogdian-merchant-ledgers",
    title: "Public Lecture: Deciphering the Ancient Sogdian Letters",
    category: "Lecture & Symposium",
    date: "August 22, 2026",
    time: "4:00 PM – 5:30 PM",
    location: "Main Auditorium",
    imageSrc: "/images/events_and_news/lecture-sogdian-merchant-ledgers.png",
    imageAlt: "Linguist presenting ancient Sogdian manuscript translation slides",
    summary:
      "Distinguished epigraphist Dr. Nicholas Sims-Williams presents new translations of the early 4th-century Sogdian Ancient Letters discovered near Dunhuang, revealing intimate accounts of Silk Road commerce.",
    fullContent:
      "Step back into the 4th century CE as world-renowned Sogdian linguist Dr. Nicholas Sims-Williams deciphers business ledgers, family letters, and trade receipts written by Sogdian merchants traveling between Samarkand and Western China.\n\nThe lecture illuminates how merchant guilds managed currency exchanges, insurance contracts for desert expeditions, and diplomatic alliances across multi-ethnic Silk Road oases. A reception with tea and regional sweets will follow the presentation.",
    rsvpRequired: true,
    featuredOnHome: false,
  },
  {
    id: "workshop-bukhara-woodcarving",
    slug: "workshop-bukhara-woodcarving",
    title: "Artisan Workshop: Traditional Uzbek Relief Woodcarving",
    category: "Artisan Workshop",
    date: "September 14, 2026",
    time: "1:00 PM – 4:30 PM",
    location: "Woodcraft Studio Annex",
    imageSrc: "/images/events_and_news/symposium-silk-road-preservation.png",
    imageAlt: "Master woodcarver demonstrating floral relief chisel techniques on walnut panel",
    summary:
      "Learn traditional geometric and floral woodcarving techniques under the guidance of Khiva master woodcarver Olimjon Usta. Practice carving Islamic arabesques into seasoned walnut wood panels.",
    fullContent:
      "Discover the tactile art of Central Asian architectural woodcarving. Master artisan Olimjon Usta demonstrates historic chisel sharpening methods, geometric layout transferring using compasses, and deep relief carving into native walnut and elm timbers.\n\nEach participant will carve a decorative 20x20 cm wooden relief panel featuring traditional Islimi floral scrolls to take home. Tools, timber blocks, and protective gear are included.",
    rsvpRequired: true,
    featuredOnHome: false,
  },
  {
    id: "news-pamir-silver-hoard-donation",
    slug: "news-pamir-silver-hoard-donation",
    title: "Curatorial News: Major Donation of 19th-Century Pamiri Bridal Silver",
    category: "Curatorial News",
    date: "October 03, 2026",
    time: "Curatorial Briefing",
    location: "Special Exhibits Gallery",
    imageSrc: "/images/events_and_news/news-bactrian-gold-acquisition.png",
    imageAlt: "Collection of handcrafted Pamiri silver headpieces and carnelian chest pendants",
    summary:
      "The museum receives a rare private collection of 45 silver bridal headdresses, temple pendants, and carnelian amulets collected across Badakhshan and Khorog over five decades.",
    fullContent:
      "The Central Asian Museum is thrilled to announce the generous donation of the Olimov Ethnographic Collection, comprising 45 exquisite silver bridal jewelry pieces from the high Pamir Mountains.\n\nThe collection spans 19th-century silver crowns, temple ornaments (tuman), and carnelian-inlaid chest pendants. Chief Ethnographic Curator Gulnora Karimova notes that these pieces offer unparalleled insights into silver alloy techniques and protective symbolic iconography of high-mountain communities.",
    rsvpRequired: false,
    featuredOnHome: false,
  },
  {
    id: "symposium-celestial-navigation-silk-road",
    slug: "symposium-celestial-navigation-silk-road",
    title: "Colloquium: Celestial Navigation Along Ancient Desert Routes",
    category: "Lecture & Symposium",
    date: "November 12, 2026",
    time: "1:30 PM – 5:00 PM",
    location: "Planetarium & Auditorium A",
    imageSrc: "/images/events_and_news/lecture-sogdian-merchant-ledgers.png",
    imageAlt: "Astronomer explaining brass astrolabe and nocturnal star charts",
    summary:
      "Historians of science and astronomers explore how Silk Road caravans navigated night desert crossings across the Taklamakan using astrolabes and star coordinates recorded in Samarkand.",
    fullContent:
      "Join astronomers, navigators, and Silk Road historians for a fascinating exploration of night travel across Central Asian deserts and high steppe mountain passes.\n\nSpeakers will demonstrate historical brass astrolabes, armillary spheres, and celestial maps produced at Ulugh Beg Observatory in Samarkand. Live planetarium dome projections will simulate the night sky as seen by 15th-century caravan leaders crossing the Kyzylkum Desert.",
    rsvpRequired: true,
    featuredOnHome: false,
  },
  {
    id: "press-virtual-museum-launch",
    slug: "press-virtual-museum-launch",
    title: "Press Release: Launch of High-Resolution 3D Interactive Artifact Archive",
    category: "Press Release",
    date: "December 01, 2026",
    time: "Global Digital Launch",
    location: "Museum Digital Portal",
    imageSrc: "/images/events_and_news/news-leh-citadel-excavation.png",
    imageAlt: "Digital screen displaying 3D rotatable model of Sogdian silver vessel",
    summary:
      "The museum launches a digital 3D portal featuring 200 ultra-high-resolution rotatable 3D scans of rare artifacts, complete with multi-lingual audio guides and downloadable scholarly metadata.",
    fullContent:
      "The Central Asian Museum announces the public launch of its global 3D Digital Archive Portal, powered by photogrammetry and laser scanning technology.\n\nStudents, researchers, and art lovers worldwide can now interactively rotate, zoom, and inspect over 200 rare gold, ceramic, textile, and manuscript artifacts in 4K resolution. The portal features curatorial audio commentary in English, Hindi, Russian, and Persian, bringing Central Asian heritage to a global audience.",
    rsvpRequired: false,
    featuredOnHome: false,
  },
];
