import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ServiceCategories } from "@/components/services/ServiceCategories";
import { RecruitmentSolutions } from "@/components/home/RecruitmentSolutions";
import { HiringProcess } from "@/components/home/HiringProcess";
import { FAQSection } from "@/components/services/FAQSection";
import { CTASection } from "@/components/home/CTASection";

export const metadata = {
  title: "Our Services | CoreVita Advisory",
  description: "Comprehensive workforce solutions powered by our proprietary matching technology and human expertise.",
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans selection:bg-blue-600 selection:text-white">
      <Header />
      
      <main className="flex-1 w-full overflow-hidden">
        <ServicesHero />
        <ServiceCategories />
        <RecruitmentSolutions />
        <HiringProcess />
        <FAQSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
