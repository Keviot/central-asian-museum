import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Cleaning old exhibitions and news events...");

  // Delete all artifact highlights first due to cascade / relations
  await prisma.artifactHighlight.deleteMany({});
  await prisma.exhibition.deleteMany({});
  await prisma.newsEvent.deleteMany({});

  console.log("Seeding exactly 2 exhibitions...");

  const exhibitions = [
    {
      slug: "archive-in-focus",
      title: "Archive in Focus",
      subtitle: "Manuscripts and archival records from the museum's collection",
      category: "",
      status: "Current" as const,
      dateRange: "Ongoing",
      location: "Level Four · Floor 3",
      curator: "The museum team",
      imageSrc: "/images/gallery-floor3-archive.webp",
      imageAlt: "The top-floor gallery: display cases of manuscripts and framed historic photographs around the lantern opening",
      descriptionHeading: "About the Exhibition",
      description:
        "On the top floor of the tower, the museum's gallery for temporary and changing exhibitions currently draws on its own archive: manuscripts and archival records that document Ladakh's social, cultural and historical past.",
      curatorialEssayHeading: "Historical Context",
      curatorialEssay:
        "Seen after the objects on the floors below, they add the people, places and events behind the collection, and record how life in Leh and the wider region has changed.",
      badgeLabel: "Current Exhibition",
      featuredOnHome: true,
      seoKeywords: ["Archive in Focus", "Central Asian Museum", "Ladakh manuscripts"],
    },
    {
      slug: "preview-photographs-2011",
      title: "Photographic Exhibition at the Preview Opening",
      subtitle: "When the museum first opened to the public for a special preview, its first artefacts were shown with a photographic exhibition.",
      category: "",
      status: "Permanent" as const,
      dateRange: "23–24 August 2011",
      location: "Central Asian Museum, Leh",
      curator: "The museum team",
      imageSrc: "/images/museum-garden-exterior.webp",
      imageAlt: "The museum tower in the Tsas Soma Garden",
      descriptionHeading: "About the Exhibition",
      description:
        "On 23 and 24 August 2011, the Central Asian Museum opened to the public for a special preview. Alongside its first artefacts, visitors saw a photographic exhibition.",
      curatorialEssayHeading: "Historical Context",
      curatorialEssay:
        "When the museum first opened to the public for a special preview, its first artefacts were shown with a photographic exhibition.",
      badgeLabel: "Past Exhibition",
      featuredOnHome: false,
      seoKeywords: ["Preview Opening 2011", "Central Asian Museum", "Historic Photographs"],
    },
  ];

  for (const ex of exhibitions) {
    await prisma.exhibition.create({ data: ex });
  }

  console.log("Seeding exactly 7 news events...");

  const newsItems = [
    {
      slug: "completion-2015",
      title: "Completion Ceremony for the Museum Complex",
      category: "Event",
      date: "7 October 2015",
      readTime: "3 min read",
      location: "Tsas Soma Garden",
      imageSrc: "/images/thf/caravan-garden.webp",
      imageAlt: "The Caravan Garden at the centre of the museum complex, with willow trees and a stream",
      summary: "A ceremony on 7 October 2015 marked the completion of the Central Asian Museum and the complex around it.",
      content:
        "On 7 October 2015, a completion ceremony marked the finished museum complex in the Tsas Soma Garden.\n\nAlongside the tower, Tibet Heritage Fund (THF/LOTI) built gates, a library, a kitchen museum and gardens, and renovated the old bakery next door.",
      status: "Published",
      seoKeywords: ["Completion Ceremony", "Central Asian Museum", "Tsas Soma Garden"],
    },
    {
      slug: "extension-2015",
      title: "The Old Bakery Becomes the Extension Building",
      category: "Milestone",
      date: "2014–15",
      readTime: "2 min read",
      location: "Extension Building",
      imageSrc: "/images/hall-timber-ceiling.webp",
      imageAlt: "The multipurpose hall in the Extension Building, under a timber ceiling",
      summary: "The old bakery on the east side of the complex was renovated in 2014–15, with a multipurpose room upstairs.",
      content:
        "The old bakery on the east side of the complex was renovated in 2014–15.\n\nThe bakeries still serve the street. Upstairs are offices and a multipurpose room for conferences, talks and exhibitions.",
      status: "Published",
      seoKeywords: ["Extension Building", "Old Bakery", "Central Asian Museum"],
    },
    {
      slug: "solar-2013",
      title: "Solar Power for the Complex",
      category: "Update",
      date: "2013",
      readTime: "1 min read",
      location: "Tsas Soma Garden",
      imageSrc: "/images/museum-garden-exterior.webp",
      imageAlt: "The museum tower in the Tsas Soma Garden, with solar panels on its roof",
      summary: "Solar panels installed in 2013 supply the museum complex with electricity.",
      content:
        "Solar panels were installed in 2013, and supply the museum complex with electricity.",
      status: "Published",
      seoKeywords: ["Solar Power", "Green Energy", "Tsas Soma"],
    },
    {
      slug: "kitchen-2013",
      title: "The Ladakhi Kitchen Museum",
      category: "Milestone",
      date: "2012–13",
      readTime: "2 min read",
      location: "Ladakhi Kitchen Museum",
      imageSrc: "/images/thf/kitchen-museum.webp",
      imageAlt: "The Ladakhi Kitchen Museum in the museum complex",
      summary: "A traditional Ladakhi kitchen with a clay stove at its heart, built in 2012–13 from an idea by Abdul Ghani Sheikh.",
      content:
        "A traditional Ladakhi kitchen with a clay stove at its heart was built in 2012–13, from an idea by the historian Abdul Ghani Sheikh.\n\nIt doubles as a tea house, with a rooftop terrace.",
      status: "Published",
      seoKeywords: ["Kitchen Museum", "Traditional Ladakh", "Abdul Ghani Sheikh"],
    },
    {
      slug: "preview-2011",
      title: "The Museum Opens for a Special Preview",
      category: "Event",
      date: "23–24 August 2011",
      readTime: "2 min read",
      location: "Central Asian Museum",
      imageSrc: "/images/gallery-floor3-archive.webp",
      imageAlt: "The top-floor gallery with manuscripts in display cases and historic photographs",
      summary: "The Central Asian Museum opened to the public for a special preview, with its first artefacts and a photographic exhibition.",
      content:
        "On 23 and 24 August 2011, the Central Asian Museum opened to the public for a special preview, with its first artefacts and a photographic exhibition.",
      status: "Published",
      seoKeywords: ["Special Preview 2011", "Central Asian Museum", "Opening"],
    },
    {
      slug: "library-2011",
      title: "The Trans-Himalayan Research Library Opens",
      category: "Milestone",
      date: "9 June 2011",
      readTime: "2 min read",
      location: "Trans-Himalayan Research Library",
      imageSrc: "/images/thf/library.webp",
      imageAlt: "Inside the Trans-Himalayan Research Library",
      summary: "The affiliated research library opened on 9 June 2011, built around Abdul Ghani Sheikh's donated book collection.",
      content:
        "The affiliated Trans-Himalayan Research Library opened on 9 June 2011, after its completion in 2010.\n\nIt is built around the historian Abdul Ghani Sheikh's donated book collection, and specialises in literature on the Himalayas and Central Asia.",
      status: "Published",
      seoKeywords: ["Research Library", "Trans-Himalayan", "Central Asia Books"],
    },
    {
      slug: "foundation-2008",
      title: "The Foundation Stone Is Laid",
      category: "Milestone",
      date: "22 August 2008",
      readTime: "2 min read",
      location: "Tsas Soma Garden",
      imageSrc: "/images/thf/foundation-prayers.webp",
      imageAlt: "Prayers held at the laying of the museum's foundation stone",
      summary: "Prayers were held as the foundation stone was laid on 22 August 2008, and construction began.",
      content:
        "Prayers were held as the foundation stone of the Central Asian Museum was laid on 22 August 2008, and construction began.\n\nLadakh's building season runs from April to October.",
      status: "Published",
      seoKeywords: ["Foundation Stone", "2008", "THF LOTI", "Tsas Soma"],
    },
  ];

  for (const item of newsItems) {
    await prisma.newsEvent.create({ data: item });
  }

  console.log("Successfully seeded 2 exhibitions and 7 news events!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
