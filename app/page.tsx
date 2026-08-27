import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/home/Hero";
import { AboutSection } from "@/components/home/AboutSection";
import { CollectionsSection } from "@/components/home/CollectionsSection";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header variant="transparent" />
      <main className="flex-1">
        <Hero />
        <AboutSection />
        <CollectionsSection />
      </main>
      <Footer />
    </div>
  );
}
