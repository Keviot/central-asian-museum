export interface BuildingFigure {
  image: string;
  alt: string;
  caption: string;
}

export interface BuildingDrawing {
  image: string;
  alt: string;
  caption: string;
}

export interface ConstructionEntry {
  image: string;
  label: string;
  text: string;
}

export interface BuildingLevel {
  level: number;
  title: string;
  subtitle: string;
  text: string;
  image: string;
  alt: string;
}

export interface ComplexCard {
  image: string;
  title: string;
  text: string;
}

export const designFigures: BuildingFigure[] = [
  {
    image: "/images/thf/model.webp",
    alt: "Architectural model of the museum tower and complex",
    caption: "The design model",
  },
  {
    image: "/images/thf/artisans-design.webp",
    alt: "Local artisans discussing the design around the model",
    caption: "Local artisans discussing the design",
  },
];

export const buildingDrawings: BuildingDrawing[] = [
  {
    image: "/images/thf/plan-ground.webp",
    alt: "Ground floor plan of the museum tower",
    caption: "Ground floor plan · design A. Alexander",
  },
  {
    image: "/images/thf/elevation-east.webp",
    alt: "East elevation drawing of the museum tower",
    caption: "East elevation · design A. Alexander and N. Weber",
  },
  {
    image: "/images/thf/site-plan.webp",
    alt: "Site plan of the museum complex in the Tsas Soma garden",
    caption: "Site plan of the complex · THF",
  },
];

export const constructionEntries: ConstructionEntry[] = [
  {
    image: "/images/thf/foundation-prayers.webp",
    label: "22 August 2008",
    text: "Prayers are held as the foundation stone is laid.",
  },
  {
    image: "/images/thf/foundation-dig.webp",
    label: "September 2008",
    text: "Digging the foundations.",
  },
  {
    image: "/images/thf/stone-walls-2008.webp",
    label: "October 2008",
    text: "The artisan team begins the solid stone walls.",
  },
  {
    image: "/images/thf/walls-inner-outer.webp",
    label: "Walls",
    text: "Inner and outer walls rise together.",
  },
  {
    image: "/images/thf/entrance-door.webp",
    label: "Entrance",
    text: "The carved parts of the main door are assembled.",
  },
  {
    image: "/images/thf/may-2009.webp",
    label: "May 2009",
    text: "The tower at the end of May 2009.",
  },
  {
    image: "/images/thf/timber-frame.webp",
    label: "Timber frame",
    text: "Carpenters assemble the pillars, brackets and beams.",
  },
  {
    image: "/images/thf/lantern.webp",
    label: "The lantern",
    text: "Fixing the wooden lantern that connects all floors.",
  },
];

export const buildingLevels: BuildingLevel[] = [
  {
    level: 1,
    title: "Level One · Ground Floor",
    subtitle: "Ladakh",
    text: "The cultural heritage of Ladakh. The interior is in early Ladakhi and Baltistani style, with capitals adapted from the Tsemo tower and a diamond ceiling at its centre, as in early Ladakhi temples.",
    image: "/images/gallery-ground-ladakh.webp",
    alt: "Ground floor gallery under the diamond ceiling",
  },
  {
    level: 2,
    title: "Level Two · Floor 1",
    subtitle: "Central Asia",
    text: "Objects that travelled the trade routes linking Ladakh with Central Asia: textiles, costume, household objects and trade materials.",
    image: "/images/gallery-floor1-central-asia.webp",
    alt: "Central Asian gallery with a samovar and metal vessels",
  },
  {
    level: 3,
    title: "Level Three · Floor 2",
    subtitle: "Tibet",
    text: "Centuries of shared Buddhist tradition, pilgrimage, scholarship and artistic exchange across the Himalayas.",
    image: "/images/gallery-floor2-tibet.webp",
    alt: "Tibetan gallery with carpets and copper vessels",
  },
  {
    level: 4,
    title: "Level Four · Floor 3",
    subtitle: "Temporary & Changing Exhibitions",
    text: "Temporary and changing exhibitions, alongside the museum's manuscripts and archival records.",
    image: "/images/gallery-floor3-archive.webp",
    alt: "Top floor gallery with display cases and historic photographs",
  },
];

export const levelsNote: string | null = null;

export const complexCards: ComplexCard[] = [
  {
    image: "/images/thf/ladakh-gate.webp",
    title: "Ladakh Gate",
    text: "The main gate on the south side, facing the Main Bazaar. In Ladakhi-Tibetan style: a large double door between stone walls, under a black frieze that carries the museum's signboard in three languages.",
  },
  {
    image: "/images/thf/kashmir-gate.webp",
    title: "Kashmir Gate",
    text: "The north gate, opening towards the residential quarter and the Shia mosque. It is in Islamic style, with finely carved timbers on a stone platform.",
  },
  {
    image: "/images/thf/iron-bridge.webp",
    title: "Iron Bridge",
    text: "Visitors leave the tower over an exit bridge inspired by Tibetan architecture, and step down into the garden.",
  },
  {
    image: "/images/thf/library.webp",
    title: "Trans-Himalayan Research Library",
    text: "Built around historian Abdul Ghani Sheikh's donated book collection, and specialising in literature on the Himalayas and Central Asia. Completed in 2010 and opened on 9 June 2011.",
  },
  {
    image: "/images/thf/kitchen-museum.webp",
    title: "Ladakhi Kitchen Museum",
    text: "A traditional Ladakhi kitchen with a clay stove at its heart, built in 2012–13 from an idea by Abdul Ghani Sheikh. It doubles as a tea house, with a rooftop terrace.",
  },
  {
    image: "/images/thf/caravan-garden.webp",
    title: "Caravan Garden",
    text: "The centre of the complex: willow trees, a stream crossed by two wooden bridges, slate paths, and an open space for a garden restaurant.",
  },
  {
    image: "/images/hall-timber-ceiling.webp",
    title: "Extension Building",
    text: "The old bakery on the east side, renovated in 2014–15. The bakeries still serve the street; upstairs are offices and a multipurpose room for conferences, talks and exhibitions.",
  },
];
