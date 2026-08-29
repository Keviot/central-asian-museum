import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/home/Hero";
import { HeroInfoBar } from "@/components/home/HeroInfoBar";
import { AboutSection } from "@/components/home/AboutSection";
import { CollectionsSection } from "@/components/home/CollectionsSection";
import { ExhibitionsSection } from "@/components/home/ExhibitionsSection";
import { NewsEventsSection } from "@/components/home/NewsEventsSection";
import { SupportSection } from "@/components/home/SupportSection";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header variant="transparent" />
      <main className="flex-1">
        <Hero />
        <HeroInfoBar />
        <AboutSection />
        <CollectionsSection />
        <ExhibitionsSection />
        <NewsEventsSection />
        <SupportSection />
      </main>
      <Footer />
    </div>
  );
}




