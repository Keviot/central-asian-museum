export type TimelineEntry = {
  date: string;
  isTbdDate?: boolean;
  text: string;
};

export const timelineEntries: TimelineEntry[] = [
  {
    date: "17th century",
    text: "Ladakhi king Senge Namgyal gave permission to traders to build Leh's first mosque on the grounds where the caravans camped.",
  },
  {
    date: "Mid-20th century",
    text: "Political events in the region brought cross-border trade to an end, leaving Ladakh in relative geographic and cultural isolation.",
  },
  {
    date: "2007",
    text: "Tibet Heritage Fund (THF), in cooperation with the Anjuman Moin-ul-Islam society, restored the mosque.",
  },
  {
    date: "2007",
    text: "The idea for a museum was launched by Saleem Beg, Director of J&K Tourism, and the eminent Ladakhi historian Abdul Ghani Sheikh, to commemorate this facet of Ladakh's history and to educate the public about it. The project was mainly sponsored by the Ministry of Culture and Tourism, Jammu & Kashmir State.",
  },
  {
    date: "22 August 2008",
    text: "The foundation stone was laid and construction began. Ladakh's building season runs from April to October.",
  },
  {
    date: "June 2011",
    text: "The affiliated Trans-Himalayan Research Library opened.",
  },
  {
    date: "23–24 August 2011",
    text: "The Central Asian Museum opened to the public for a special preview, with its first artefacts and a photographic exhibition.",
  },
  {
    date: "7 October 2015",
    text: "A completion ceremony marked the finished museum complex.",
  },
  {
    date: "2026",
    text: "A committee was formed to run the museum, registered as the Society for the Preservation of Trans-Himalayan Art and Culture. THF/LOTI were asked to design and build the museum.",
  },
];

export type MissionData = {
  vision: string;
  aims: string[];
};

export const missionData: MissionData = {
  vision:
    "Our vision is to preserve and celebrate Ladakh’s diverse heritage and its historic connections with Central Asia, Tibet and the Himalayan world, while making it accessible and meaningful for future generations.",
  aims: [
    "Preserve and document material evidence of Ladakh's historical connections with Central Asia and neighbouring regions.",
    "Make the history of trade, travel and cultural exchange accessible to local communities, visitors, students and researchers.",
    "Encourage greater understanding of Ladakh's diverse cultural heritage.",
    "Support research, documentation and interpretation of the museum's collections.",
    "Promote responsible care and conservation of cultural objects.",
    "Create opportunities for education, dialogue, exhibitions, workshops and community engagement.",
    "Position Leh's Central Asian heritage within the broader history of the Himalayan and trans-Himalayan world.",
  ],
};

export type RoleItem = {
  role: string;
  name: string | string[] | null;
  description: string;
};

export type PeopleGroup = {
  name: string;
  intro: string | null;
  roles: RoleItem[];
};

export const peopleGroups: PeopleGroup[] = [
  {
    name: "Museum Committee",
    intro: null,
    roles: [
      {
        role: "Director",
        name: "Dr Noor Jahan Chunka",
        description:
          "Provides overall leadership and direction to the museum, oversees its programmes and activities, and works towards its institutional development and sustainability.",
      },
      {
        role: "Advisors",
        name: [
          "Shri Ghulam Mustafa (Sr. Advisor)",
          "Dr Noor Mohd.",
          "Shri Ghulam Mohd Kakpori",
        ],
        description:
          "Provide guidance and expertise on matters relating to the museum's collections, heritage, exhibitions, research, conservation and future initiatives.",
      },
      {
        role: "General Secretary",
        name: "Haji Mohd Amin Galwan",
        description:
          "Supports the administration and coordination of the museum's activities, facilitates communication between the committee and staff, and assists in implementing decisions.",
      },
      {
        role: "Treasurer",
        name: "Egr. Zeeshan Ahmad Mir",
        description:
          "Oversees the museum's financial administration, including accounts, expenditure and financial planning.",
      },
    ],
  },
  {
    name: "Museum Staff",
    intro: null,
    roles: [
      {
        role: "Museum Assistant",
        name: null,
        description:
          "Supports daily administration, collection care, documentation, visitor management, educational activities and general museum operations.",
      },
      {
        role: "Ticketing Staff",
        name: null,
        description:
          "Manages visitor entry, ticketing and basic visitor information, while also assisting with maintaining visitor records.",
      },
      {
        role: "Security Guard",
        name: null,
        description:
          "Ensures the safety and security of the museum building, collections, staff and visitors.",
      },
      {
        role: "Janitor",
        name: null,
        description:
          "Maintains the cleanliness and upkeep of the museum premises, ensuring that the galleries and public spaces remain clean, safe and welcoming.",
      },
    ],
  },
];
