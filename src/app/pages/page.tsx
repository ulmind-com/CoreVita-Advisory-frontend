"use client";
/* eslint-disable */


import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useCMSPages } from "@/services/queries";
import { FileText, ArrowRight, ShieldCheck, Scale, HelpCircle, Briefcase, TrendingUp, Building } from "lucide-react";
import Link from "next/link";

export default function PagesListing() {
  const { data: pages, isLoading, isError } = useCMSPages();

  // Premium fallbacks in case admin hasn't added CMS pages yet
  const displayPages = (!isError && pages && pages.length > 0)
    ? pages
    : [
        { slug: "privacy-policy", title: "Privacy Policy", icon: ShieldCheck, color: "text-emerald-500", bg: "bg-emerald-50" },
        { slug: "terms-of-service", title: "Terms of Service", icon: Scale, color: "text-blue-500", bg: "bg-blue-50" },
        { slug: "faq", title: "Frequently Asked Questions", icon: HelpCircle, color: "text-purple-500", bg: "bg-purple-50" },
        { slug: "careers", title: "Careers at CoreVita", icon: Briefcase, color: "text-orange-500", bg: "bg-orange-50" },
        { slug: "success-stories", title: "Success Stories", icon: TrendingUp, color: "text-rose-500", bg: "bg-rose-50" },
        { slug: "industries", title: "Industries Served", icon: Building, color: "text-indigo-500", bg: "bg-indigo-50" },
      ];

  const getIconForSlug = (slug: string, index: number) => {
    const defaultIcons = [
      { icon: FileText, color: "text-blue-500", bg: "bg-blue-50" },
      { icon: ShieldCheck, color: "text-emerald-500", bg: "bg-emerald-50" },
      { icon: Scale, color: "text-indigo-500", bg: "bg-indigo-50" },
      { icon: HelpCircle, color: "text-purple-500", bg: "bg-purple-50" },
    ];
    return defaultIcons[index % defaultIcons.length];
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans selection:bg-blue-600 selection:text-white">
      <Header />
      
      <main className="flex-1 w-full pt-32 pb-24">
        
        {/* Hero Header */}
        <div className="container mx-auto px-6 mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium mb-6"
            >
              Resources & Legal
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold tracking-tight text-[#0b1b3d] mb-6"
            >
              Platform Resources
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed"
            >
              Access our policies, terms, and additional company resources.
            </motion.p>
          </div>
        </div>

        {/* Grid Container */}
        <div className="container mx-auto px-6 max-w-5xl">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-40 bg-white rounded-3xl animate-pulse shadow-sm"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayPages.map((page: any, i: number) => {
                const IconComp = page.icon || getIconForSlug(page.slug, i).icon;
                const colorClass = page.color || getIconForSlug(page.slug, i).color;
                const bgClass = page.bg || getIconForSlug(page.slug, i).bg;

                return (
                  <motion.div
                    key={page.slug || i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link href={`/${page.slug}`}>
                      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group h-full flex flex-col justify-between">
                        <div className={`w-14 h-14 rounded-2xl ${bgClass} ${colorClass} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                          <IconComp className="w-7 h-7" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-[#0b1b3d] mb-2 group-hover:text-blue-600 transition-colors">
                            {page.title}
                          </h3>
                          <div className="flex items-center text-sm font-semibold text-slate-400 group-hover:text-blue-500 transition-colors mt-4">
                            View Page <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

      </main>
      
      <Footer />
    </div>
  );
}
