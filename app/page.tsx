import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/home/Hero";
import { HeroInfoBar } from "@/components/home/HeroInfoBar";
import { AboutSection } from "@/components/home/AboutSection";
import { FloorsSlider } from "@/components/home/FloorsSlider";
import { CurrentExhibitionSection } from "@/components/home/CurrentExhibitionSection";
import { NewsSection } from "@/components/home/NewsSection";
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
        <FloorsSlider />
        <CurrentExhibitionSection />
        <NewsSection />
        <SupportSection />
      </main>
      <Footer />
    </div>
  );
}




