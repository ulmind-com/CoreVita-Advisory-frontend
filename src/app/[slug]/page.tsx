/* eslint-disable */
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, FileText } from "lucide-react";

async function getPageData(slug: string) {
  try {
    const res = await fetch(`https://project-for-prem-backend.onrender.com/api/v1/cms/pages/${slug}`, {
      next: { revalidate: 60 }
    });
    
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error("Failed to fetch page");
    }
    
    return await res.json();
  } catch (error) {
    // Premium fallback for demonstration
    const mockPages: Record<string, any> = {
      "privacy-policy": {
        title: "Privacy Policy",
        content: `
          <h2>1. Introduction</h2>
          <p>We are committed to safeguarding the privacy of our website visitors and service users. This policy applies where we are acting as a data controller with respect to the personal data of such persons.</p>
          <h2>2. How we use your personal data</h2>
          <p>We may process data about your use of our website and services ("usage data"). The usage data may include your IP address, geographical location, browser type and version, operating system, referral source, length of visit, page views and website navigation paths.</p>
          <h2>3. Providing your personal data to others</h2>
          <p>We may disclose your personal data to any member of our group of companies insofar as reasonably necessary for the purposes, and on the legal bases, set out in this policy.</p>
        `
      },
      "terms-of-service": {
        title: "Terms of Service",
        content: `
          <h2>1. Acceptance of terms</h2>
          <p>By using our services, you agree to these terms. If you do not agree to these terms, you may not use our services.</p>
        `
      }
    };
    
    return mockPages[slug] || null;
  }
}

export default async function CMSPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const pageData = await getPageData(resolvedParams.slug);

  if (!pageData) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans selection:bg-blue-600 selection:text-white">
      <Header />
      
      <main className="flex-1 w-full pt-32 pb-24">
        
        {/* Dynamic Hero Header */}
        <div className="bg-[#0b1b3d] py-20 relative overflow-hidden mb-16">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent pointer-events-none" />
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto">
              
              {/* Breadcrumbs */}
              <nav className="flex items-center gap-2 text-sm text-blue-200/60 mb-8 font-medium">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-white capitalize">{resolvedParams.slug.replace(/-/g, ' ')}</span>
              </nav>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center backdrop-blur-sm">
                  <FileText className="w-6 h-6" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                  {pageData.title}
                </h1>
              </div>
              
              <p className="text-blue-100/70 text-lg">
                Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-16 shadow-sm border border-slate-100">
            <div 
              className="prose prose-lg prose-slate prose-headings:text-[#0b1b3d] prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-p:text-slate-600 prose-p:leading-relaxed prose-a:text-blue-600 hover:prose-a:text-blue-700 max-w-none"
              dangerouslySetInnerHTML={{ __html: pageData.content }} 
            />
          </div>
        </div>

      </main>
      
      <Footer />
    </div>
  );
}
