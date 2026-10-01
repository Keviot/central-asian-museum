import { currentExhibitionData } from "./exhibitionData";

export type ExhibitionItem = {
  id: string;
  slug?: string;
  status: string;
  title: string;
  dates: string;
  where: string;
  curator?: string | null;
  image: string;
  alt: string;
  excerpt: string;
  body: string[];
  now?: boolean;
};

export type ExhibitionsPageData = {
  heading: string;
  page_lead: string;
  items: ExhibitionItem[];
};

const pastExhibitions: ExhibitionItem[] = [
  {
    id: "preview-photographs-2011",
    slug: "preview-photographs-2011",
    status: "Past exhibition",
    title: "Photographic Exhibition at the Preview Opening",
    dates: "23–24 August 2011",
    where: "Central Asian Museum, Leh",
    curator: null,
    image: "/images/museum-garden-exterior.webp",
    alt: "The museum tower in the Tsas Soma Garden",
    excerpt:
      "When the museum first opened to the public for a special preview, its first artefacts were shown with a photographic exhibition.",
    body: [
      "On 23 and 24 August 2011, the Central Asian Museum opened to the public for a special preview. Alongside its first artefacts, visitors saw a photographic exhibition.",
    ],
    now: false,
  },
];

const currentItem: ExhibitionItem = {
  id: currentExhibitionData.id || "archive-in-focus",
  slug: "archive-in-focus",
  status: currentExhibitionData.status,
  title: currentExhibitionData.title,
  dates:
    currentExhibitionData.details.find((d) => d.label === "Dates")?.value ||
    "Ongoing",
  where:
    currentExhibitionData.details.find((d) => d.label === "Where")?.value ||
    "Level Four · Floor 3",
  curator:
    currentExhibitionData.details.find((d) => d.label === "Curated by")
      ?.value || "The museum team",
  image: currentExhibitionData.image,
  alt: currentExhibitionData.alt,
  excerpt: currentExhibitionData.subtitle,
  body: currentExhibitionData.paragraphs,
  now: true,
};

export const exhibitionsData: ExhibitionsPageData = {
  heading: "Previous Exhibitions",
  page_lead:
    "Exhibitions held in the museum's gallery for temporary and changing exhibitions, on the top floor of the tower.",
  items: [currentItem, ...pastExhibitions],
};
