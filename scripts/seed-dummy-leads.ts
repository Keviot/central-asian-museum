import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const dummyLeads = [
  {
    name: "Dr. Elena Rostova",
    email: "elena.rostova@oxford.ac.uk",
    subject: "Silk Road Textile Archives Access Request",
    intent: "research",
    status: "UNREAD" as const,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    message:
      "Dear Curatorial Team,\n\nI am currently heading a comparative textile conservation project at the Oxford Institute of Archaeology focusing on 16th to 18th-century Central Asian silk and wool weaves. We are planning a 10-day research visit to Leh in early November.\n\nWe would be immensely grateful if we could arrange supervised research access to examine your high-altitude fragment archives, specifically the brocade borders and mineral dye samples from the Khotan trade routes.\n\nPlease let us know what documentation, institutional endorsements, or protocols are required prior to our arrival. Looking forward to your guidance.",
  },
  {
    name: "Tashi Namgyal",
    email: "tashi.ladakh.heritage@gmail.com",
    subject: "School Excursion & Architecture Walkthrough",
    intent: "visits",
    status: "UNREAD" as const,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 22), // 22 hours ago
    message:
      "Respected Director and Curators,\n\nOn behalf of Lamdon Model Senior Secondary School, Leh, we are organizing a special cultural heritage excursion for our Class 11 and 12 humanities students (approx. 45 students with 4 faculty members).\n\nWe would like to book a 2-hour guided walkthrough of the Main Hall and the Caravan Kitchen exhibits on Friday, 16th October at 10:30 AM. Additionally, if possible, we would like to request a 20-minute Q&A session with one of your staff on traditional Ladakhi mud-brick architecture.\n\nPlease advise if this slot is available and what concessions or student passes apply for local educational institutions. Thank you very much.",
  },
  {
    name: "Arthur Pendelton",
    email: "arthur.pendelton@genevacollections.ch",
    subject: "Donation of 19th Century Caravan Saddle and Artifacts",
    intent: "donation",
    status: "READ" as const,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    message:
      "To the Board of Trustees and Chief Curator,\n\nMy late father was an avid mountaineer who traversed the Karakoram and Nubra valleys in the 1960s. During his journeys, he acquired a remarkably preserved late 19th-century Tibetan caravan pack saddle with embossed brass fittings, as well as three ceremonial tea churns.\n\nOur family wishes to formally donate these authentic items to the Central Asian Museum for public preservation and educational display in Leh.\n\nI have high-resolution photographs and provenance documentation ready for curatorial assessment. Please advise on your accession process and shipment protocols.",
  },
  {
    name: "Priya Sharma",
    email: "priya.sharma@delhitravels.in",
    subject: "Museum Opening Hours and Ticket Information",
    intent: "general",
    status: "UNREAD" as const,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
    message:
      "Hello team, could you please confirm the current ticket pricing for domestic and international visitors? Also, are you open on Sundays during the autumn season?",
  },
  {
    name: "Marcus Vance",
    email: "m.vance@smithsonian-fellows.org",
    subject: "Photography and High-Res Imaging Permissions",
    intent: "research",
    status: "READ" as const,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 96), // 4 days ago
    message:
      "Dear Curators at Central Asian Museum,\n\nI am compiling a visual monograph on Himalayan trade networks and architectural wood carvings for an upcoming academic publication with Princeton University Press.\n\nI will be in Leh from October 20th to 25th and wish to formally request permission to bring tripod equipment for photographing the courtyard facades, the prayer room woodwork, and selected stone inscriptions.\n\nAll imagery will be non-commercial, strictly credited to the Museum, and copies of all high-resolution digital scans will be gifted directly to your museum's permanent digital library.",
  },
  {
    name: "Kenji Takahashi",
    email: "kenji.takahashi@tokyo-arts.jp",
    subject: "Japanese Cultural Delegation Visit",
    intent: "visits",
    status: "UNREAD" as const,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 120), // 5 days ago
    message:
      "Greetings from Tokyo. We are arranging a cultural visit for 12 architects specializing in timber joinery on November 4th. Would a guided architecture walkthrough be possible?",
  },
  {
    name: "Stanzin Dolma",
    email: "stanzin.dolma99@gmail.com",
    subject: "Volunteer Curatorial Internship Inquiry",
    intent: "general",
    status: "READ" as const,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 144), // 6 days ago
    message:
      "Dear Sir/Madam, I am a recent graduate in History and Archaeology from Kashmir University and a resident of Leh. I am writing to inquire if the Central Asian Museum currently accepts volunteer research interns or gallery docents for the upcoming winter season. I would love to contribute to cataloging local folk artifacts and assisting visitors.",
  },
  {
    name: "David & Claire Sterling",
    email: "sterling.heritage.trust@gmail.com",
    subject: "Philanthropic Endowment for Gallery Lighting",
    intent: "donation",
    status: "UNREAD" as const,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 168), // 7 days ago
    message:
      "Dear Board of the Central Asian Museum,\n\nFollowing our deeply moving visit to your museum complex in Leh last August, our family trust would like to sponsor the installation of specialized UV-filtered conservation lighting for the manuscript and numismatic display cases on Level Two.\n\nWe are prepared to allocate a non-restricted grant of 3,500 GBP towards equipment purchase and local technician installation.\n\nPlease let us know the appropriate banking details or non-profit trust registration under which this donation can be remitted, along with your official receipt acknowledgment.",
  },
];

async function main() {
  console.log("Seeding dummy leads into database...");
  for (const lead of dummyLeads) {
    await prisma.contactInquiry.create({
      data: lead,
    });
  }
  const count = await prisma.contactInquiry.count();
  console.log(`Successfully seeded! Total inquiries in database: ${count}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
