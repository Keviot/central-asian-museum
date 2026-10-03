export interface NewsPost {
  id: string;
  slug?: string;
  title: string;
  category?: string;
  date: string;
  readTime?: string;
  time?: string;
  location?: string;
  image: string;
  alt: string;
  excerpt: string;
  body: string[];
}

export interface NewsSectionData {
  eyebrow: string;
  heading: string;
  lead: string;
  page_lead: string;
  posts: NewsPost[];
}

export const newsData: NewsSectionData = {
  eyebrow: "Lectures, Workshops & Updates",
  heading: "Museum News & Events",
  lead: "Milestones, programmes and events at the Central Asian Museum complex.",
  page_lead:
    "Milestones in the museum's story, and the programmes and events that bring the Tsas Soma Garden to life.",
  posts: [
    {
      id: "completion-2015",
      title: "Completion Ceremony for the Museum Complex",
      date: "7 October 2015",
      location: "Tsas Soma Garden",
      image: "/images/thf/caravan-garden.webp",
      alt: "The Caravan Garden at the centre of the museum complex, with willow trees and a stream",
      excerpt:
        "A ceremony on 7 October 2015 marked the completion of the Central Asian Museum and the complex around it.",
      body: [
        "On 7 October 2015, a completion ceremony marked the finished museum complex in the Tsas Soma Garden.",
        "Alongside the tower, Tibet Heritage Fund (THF/LOTI) built gates, a library, a kitchen museum and gardens, and renovated the old bakery next door.",
      ],
    },
    {
      id: "extension-2015",
      title: "The Old Bakery Becomes the Extension Building",
      date: "2014–15",
      location: "Extension Building",
      image: "/images/hall-timber-ceiling.webp",
      alt: "The multipurpose hall in the Extension Building, under a timber ceiling",
      excerpt:
        "The old bakery on the east side of the complex was renovated in 2014–15, with a multipurpose room upstairs.",
      body: [
        "The old bakery on the east side of the complex was renovated in 2014–15.",
        "The bakeries still serve the street. Upstairs are offices and a multipurpose room for conferences, talks and exhibitions.",
      ],
    },
    {
      id: "solar-2013",
      title: "Solar Power for the Complex",
      date: "2013",
      location: "Tsas Soma Garden",
      image: "/images/museum-garden-exterior.webp",
      alt: "The museum tower in the Tsas Soma Garden, with solar panels on its roof",
      excerpt:
        "Solar panels installed in 2013 supply the museum complex with electricity.",
      body: [
        "Solar panels were installed in 2013, and supply the museum complex with electricity.",
      ],
    },
    {
      id: "kitchen-2013",
      title: "The Ladakhi Kitchen Museum",
      date: "2012–13",
      location: "Ladakhi Kitchen Museum",
      image: "/images/thf/kitchen-museum.webp",
      alt: "The Ladakhi Kitchen Museum in the museum complex",
      excerpt:
        "A traditional Ladakhi kitchen with a clay stove at its heart, built in 2012–13 from an idea by Abdul Ghani Sheikh.",
      body: [
        "A traditional Ladakhi kitchen with a clay stove at its heart was built in 2012–13, from an idea by the historian Abdul Ghani Sheikh.",
        "It doubles as a tea house, with a rooftop terrace.",
      ],
    },
    {
      id: "preview-2011",
      title: "The Museum Opens for a Special Preview",
      date: "23–24 August 2011",
      location: "Central Asian Museum",
      image: "/images/gallery-floor3-archive.webp",
      alt: "The top-floor gallery with manuscripts in display cases and historic photographs",
      excerpt:
        "The Central Asian Museum opened to the public for a special preview, with its first artefacts and a photographic exhibition.",
      body: [
        "On 23 and 24 August 2011, the Central Asian Museum opened to the public for a special preview, with its first artefacts and a photographic exhibition.",
      ],
    },
    {
      id: "library-2011",
      title: "The Trans-Himalayan Research Library Opens",
      date: "9 June 2011",
      location: "Trans-Himalayan Research Library",
      image: "/images/thf/library.webp",
      alt: "Inside the Trans-Himalayan Research Library",
      excerpt:
        "The affiliated research library opened on 9 June 2011, built around Abdul Ghani Sheikh's donated book collection.",
      body: [
        "The affiliated Trans-Himalayan Research Library opened on 9 June 2011, after its completion in 2010.",
        "It is built around the historian Abdul Ghani Sheikh's donated book collection, and specialises in literature on the Himalayas and Central Asia.",
      ],
    },
    {
      id: "foundation-2008",
      title: "The Foundation Stone Is Laid",
      date: "22 August 2008",
      location: "Tsas Soma Garden",
      image: "/images/thf/foundation-prayers.webp",
      alt: "Prayers held at the laying of the museum's foundation stone",
      excerpt:
        "Prayers were held as the foundation stone was laid on 22 August 2008, and construction began.",
      body: [
        "Prayers were held as the foundation stone of the Central Asian Museum was laid on 22 August 2008, and construction began.",
        "Ladakh's building season runs from April to October.",
      ],
    },
  ],
};

export function parseEventDate(dateStr?: string | null): number {
  if (!dateStr) return 0;
  const trimmed = dateStr.trim();
  const parsed = Date.parse(trimmed);
  if (!isNaN(parsed)) return parsed;

  const parts = trimmed.match(/\d+/g);
  if (parts && parts.length >= 3) {
    if (parts[0].length === 4) {
      return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2])).getTime();
    }
    return new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0])).getTime();
  }

  const yearMatch = trimmed.match(/\b(19\d\d|20\d\d)\b/);
  if (yearMatch) {
    return new Date(Number(yearMatch[1]), 0, 1).getTime();
  }

  return 0;
}
