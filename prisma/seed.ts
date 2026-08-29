import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { exhibitionsData } from "../lib/exhibitions";
import { newsEventsData } from "../lib/newsEvents";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting Central Asian Museum Database Seeding...");

  // 1. Seed Default Admin User
  const adminEmail = "admin@centralasianmuseum.org";
  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const passwordHash = await hash("MuseumAdmin2026!", 12);
    await prisma.adminUser.create({
      data: {
        email: adminEmail,
        passwordHash,
        name: "Chief Curator",
        role: "ADMIN",
      },
    });
    console.log(`✅ Created Admin User: ${adminEmail}`);
  } else {
    console.log(`ℹ️ Admin User already exists: ${adminEmail}`);
  }

  // 2. Seed Exhibitions & Relic Highlights
  for (const item of exhibitionsData) {
    const existingExhibition = await prisma.exhibition.findUnique({
      where: { slug: item.slug },
    });

    if (!existingExhibition) {
      await prisma.exhibition.create({
        data: {
          slug: item.slug,
          title: item.title,
          subtitle: item.subtitle,
          category: item.category,
          dateRange: item.dateRange,
          location: item.location,
          imageSrc: item.imageSrc,
          imageAlt: item.imageAlt,
          description: item.description,
          curatorialEssay: item.curatorialEssay,
          curator: item.curator,
          status: item.status,
          badgeLabel: item.badgeLabel,
          featuredOnHome: item.featuredOnHome ?? false,
          seoKeywords: item.seoKeywords,
          highlights: {
            create: item.highlights.map((h) => ({
              title: h.title,
              provenance: h.provenance,
              date: h.date,
              material: h.material,
              dimensions: h.dimensions,
              accessionNumber: h.accessionNumber,
              description: h.description,
              imageSrc: h.imageSrc,
              imageAlt: h.imageAlt,
            })),
          },
        },
      });
      console.log(`✅ Seeded Exhibition: ${item.title}`);
    }
  }

  // 3. Seed News & Events
  for (const news of newsEventsData) {
    const existingNews = await prisma.newsEvent.findUnique({
      where: { slug: news.slug },
    });

    if (!existingNews) {
      await prisma.newsEvent.create({
        data: {
          slug: news.slug,
          title: news.title,
          category: news.category,
          date: news.date,
          readTime: "5 min read",
          location: news.location,
          imageSrc: news.imageSrc,
          imageAlt: news.imageAlt,
          summary: news.summary,
          content: news.fullContent || news.summary,
          status: "Published",
          seoKeywords: [news.category, news.title, "Central Asian Museum"],
        },
      });
      console.log(`✅ Seeded News Event: ${news.title}`);
    }
  }

  console.log("🎉 Database Seeding Completed Successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error Seeding Database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
