import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { SuccessMetrics } from "@/components/home/SuccessMetrics";
import { FeaturedJobs } from "@/components/home/FeaturedJobs";
import { FeaturedCompanies } from "@/components/home/FeaturedCompanies";
import { TalentSearch } from "@/components/home/TalentSearch";
import { RecruitmentSolutions } from "@/components/home/RecruitmentSolutions";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { HiringProcess } from "@/components/home/HiringProcess";
import { Testimonials } from "@/components/home/Testimonials";
import { BlogSection } from "@/components/home/BlogSection";
import { CTASection } from "@/components/home/CTASection";

export const metadata = {
  title: "CoreVita Advisory | The #1 Enterprise Recruitment Platform",
  description: "Transform your workforce with AI-driven recruitment, seamless onboarding, and dynamic talent management. Build your dream team today.",
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans selection:bg-blue-600 selection:text-white">
      <Header />
      
      <main className="flex-1 w-full overflow-hidden">
        {/* Core Architecture - Ordered for maximum conversion and storytelling */}
        <HeroSection />
        <SuccessMetrics />
        <FeaturedCompanies />
        <TalentSearch />
        <RecruitmentSolutions />
        <FeaturedJobs />
        <HiringProcess />
        <WhyChooseUs />
        <Testimonials />
        <BlogSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
