import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AboutHero } from "@/components/about/AboutHero";
import { MissionVision } from "@/components/about/MissionVision";
import { CoreValues } from "@/components/about/CoreValues";
import { GlobalPresence } from "@/components/about/GlobalPresence";
import { SuccessMetrics } from "@/components/home/SuccessMetrics";
import { FeaturedCompanies } from "@/components/home/FeaturedCompanies";
import { Testimonials } from "@/components/home/Testimonials";
import { CTASection } from "@/components/home/CTASection";

export const metadata = {
  title: "About Us | CoreVita Advisory",
  description: "Learn about our mission, vision, and the global team powering the future of enterprise recruitment.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans selection:bg-blue-600 selection:text-white">
      <Header />
      
      <main className="flex-1 w-full overflow-hidden">
        <AboutHero />
        <SuccessMetrics />
        <MissionVision />
        <CoreValues />
        <GlobalPresence />
        <FeaturedCompanies />
        <Testimonials />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
