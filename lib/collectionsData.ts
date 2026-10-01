export interface CategoryItem {
  name: string;
  image: string;
  object: string;
  tone: string;
}

export interface CategoryGroup {
  name: string;
  items: CategoryItem[];
}

export interface CollectionsFloor {
  anchor: string;
  level: number;
  level_label: string;
  floor: string;
  name: string;
  image: string;
  alt: string;
  paragraphs: string[];
}

export const categoryGroups: CategoryGroup[] = [
  {
    name: "Daily Life",
    items: [
      {
        name: "Textiles",
        image: "/images/objects/textiles.webp",
        object: "Pair of knotted rugs",
        tone: "#eadbd6",
      },
      {
        name: "Costume",
        image: "/images/objects/costume.webp",
        object: "Leather boots",
        tone: "#eddcca",
      },
      {
        name: "Utensils",
        image: "/images/objects/utensils.webp",
        object: "Metal ewer",
        tone: "#e0dbd3",
      },
      {
        name: "Household Objects",
        image: "/images/objects/household.webp",
        object: "Wooden jug with iron bands",
        tone: "#e9e2d5",
      },
      {
        name: "Tools",
        image: "/images/objects/tools.webp",
        object: "Wooden churn",
        tone: "#dddad0",
      },
    ],
  },
  {
    name: "Trade & Travel",
    items: [
      {
        name: "Trade Objects",
        image: "/images/objects/trade.webp",
        object: "Samovar",
        tone: "#e0dbd3",
      },
      {
        name: "Caravan & Horse Gear",
        image: "/images/objects/saddle.webp",
        object: "Saddle with metal fittings",
        tone: "#e0d8d4",
      },
      {
        name: "Weapons",
        image: "/images/objects/weapons.webp",
        object: "Curved sword with brass hilt",
        tone: "#eddcca",
      },
      {
        name: "Metalwork",
        image: "/images/objects/metalwork.webp",
        object: "Engraved metal pot",
        tone: "#e9e2d5",
      },
    ],
  },
  {
    name: "Faith & Record",
    items: [
      {
        name: "Religious Objects",
        image: "/images/objects/religious.webp",
        object: "Metal lamp stand",
        tone: "#e0d8d4",
      },
      {
        name: "Manuscripts",
        image: "/images/objects/manuscripts.webp",
        object: "Calligraphic panel",
        tone: "#dcdedd",
      },
      {
        name: "Photographs",
        image: "/images/objects/photographs.webp",
        object: "Archival photograph",
        tone: "#e0dbd3",
      },
    ],
  },
];

export const categoryNote =
  "12 categories confirmed by the museum; still to confirm: the group names Daily Life and Trade & Travel, and the object shown for each category";

export const collectionsFloors: CollectionsFloor[] = [
  {
    anchor: "ground",
    level: 1,
    level_label: "Level One",
    floor: "Ground Floor",
    name: "Ladakh Section",
    image: "/images/gallery-ground-ladakh.webp",
    alt: "Ground floor gallery with Ladakhi objects, a brass vessel and carved stones",
    paragraphs: [
      "The ground floor introduces visitors to the cultural heritage of Ladakh. The collection reflects the region's diverse communities, traditions and ways of life, bringing together objects that offer an insight into everyday life, utensils, craftsmanship and material culture. The section explores the relationship between people and the landscape of Ladakh, while also highlighting the cultural diversity that has developed across the region over centuries. The objects on display provide a glimpse into the traditions and practices that continue to shape Ladakh's identity today.",
      "This floor serves as an introduction to the museum and provides the foundation for understanding Ladakh within its wider regional and historical context.",
    ],
  },
  {
    anchor: "floor-1",
    level: 2,
    level_label: "Level Two",
    floor: "Floor 1",
    name: "Central Asian Section",
    image: "/images/gallery-floor1-central-asia.webp",
    alt: "Central Asian gallery with a samovar, metal vessels and fluted columns",
    paragraphs: [
      "The Central Asian section explores the historic connections between Ladakh and the wider Central Asian world. For centuries, Leh served as an important point along networks of trade and travel linking the Indian subcontinent with Central Asia, Tibet and neighbouring regions.",
      "The objects displayed on this floor reflect the movement of goods, people, ideas and artistic traditions along these routes. Textiles, costumes, household objects, trade-related materials and other artefacts offer glimpses into the cultural exchanges that took place across geographical and political boundaries.",
      "Rather than presenting Central Asia as a distant or separate region, this section highlights the connections that existed between communities and demonstrates how these interactions influenced the material and cultural life of Ladakh.",
    ],
  },
  {
    anchor: "floor-2",
    level: 3,
    level_label: "Level Three",
    floor: "Floor 2",
    name: "Tibetan Section",
    image: "/images/gallery-floor2-tibet.webp",
    alt: "Tibetan gallery with carpets, copper vessels and carved capitals",
    paragraphs: [
      "The Tibetan section explores the longstanding cultural, religious and artistic connections between Ladakh and Tibet. The relationship between the two regions extends across centuries, shaped by shared Buddhist traditions, pilgrimage, scholarship, artistic exchange, trade and movement across the Himalayan landscape.",
      "The collection presents objects that reflect aspects of Tibetan cultural and religious life and their connections with Ladakh. Visitors can explore traditions of craftsmanship, religious practice, visual culture and everyday life, while considering the ways in which ideas and artistic forms travelled across the region.",
      "The section also highlights the close cultural relationships that have existed across the Himalayas, demonstrating that historical boundaries did not prevent the movement of people, knowledge, objects and traditions.",
    ],
  },
  {
    anchor: "floor-3",
    level: 4,
    level_label: "Level Four",
    floor: "Floor 3",
    name: "Temporary & Changing Exhibitions",
    image: "/images/gallery-floor3-archive.webp",
    alt: "Archive gallery with manuscripts in display cases and historic photographs",
    paragraphs: [
      "The top floor hosts temporary and changing exhibitions, and is home to the museum's archival collection.",
      "The archival collection brings together documentary material that provides an important record of Ladakh's social, cultural and historical past. The collection includes manuscripts and archival records, offering researchers and visitors an opportunity to engage with historical sources beyond the museum's material collections.",
      "The archives complement the objects displayed throughout the museum by providing additional context about the people, places and events associated with them. They also document changing aspects of life in Leh and the wider region.",
      "The archival floor serves as a resource for research, education and documentation, while supporting the museum's broader commitment to preserving and making accessible the historical record of Ladakh and its connections with neighbouring regions.",
    ],
  },
];
