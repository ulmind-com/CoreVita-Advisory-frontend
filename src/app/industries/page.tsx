"use client";
/* eslint-disable */


import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Monitor, HeartPulse, Building, ShoppingBag, PiggyBank, GraduationCap, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function IndustriesPage() {
  const industries = [
    {
      id: "it-technology",
      title: "IT & Technology",
      description: "From AI researchers to full-stack engineers, we source the top 1% of tech talent globally.",
      icon: Monitor,
      color: "blue",
      roles: ["Software Engineering", "Data Science & AI", "Cloud Architecture", "Cybersecurity", "Product Management"]
    },
    {
      id: "healthcare",
      title: "Healthcare & Lifesciences",
      description: "Connecting world-class medical professionals and biotech researchers with leading institutions.",
      icon: HeartPulse,
      color: "emerald",
      roles: ["Clinical Research", "Medical Directors", "Biotech Scientists", "Healthcare IT", "Nursing Leadership"]
    },
    {
      id: "finance",
      title: "Finance & Fintech",
      description: "Placing quantitative analysts, financial controllers, and investment bankers in elite firms.",
      icon: PiggyBank,
      color: "indigo",
      roles: ["Quantitative Analysis", "Investment Banking", "Risk Management", "Fintech Engineering", "Compliance"]
    },
    {
      id: "real-estate",
      title: "Real Estate & Construction",
      description: "Building the teams that build the world, from project managers to civil engineers.",
      icon: Building,
      color: "amber",
      roles: ["Project Management", "Civil Engineering", "Property Management", "Architecture", "Urban Planning"]
    },
    {
      id: "retail",
      title: "Retail & E-commerce",
      description: "Driving digital transformation in retail with top-tier supply chain and digital marketing experts.",
      icon: ShoppingBag,
      color: "rose",
      roles: ["Supply Chain", "Digital Marketing", "E-commerce Strategy", "Merchandising", "Operations"]
    },
    {
      id: "education",
      title: "Education & EdTech",
      description: "Shaping the future of learning by recruiting visionary educators and EdTech innovators.",
      icon: GraduationCap,
      color: "violet",
      roles: ["Instructional Design", "Academic Leadership", "EdTech Product", "Corporate Training", "Admissions"]
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return { bg: 'bg-blue-50', text: 'text-blue-600', hover: 'hover:border-blue-200 group-hover:text-blue-600' };
      case 'emerald': return { bg: 'bg-emerald-50', text: 'text-emerald-600', hover: 'hover:border-emerald-200 group-hover:text-emerald-600' };
      case 'indigo': return { bg: 'bg-indigo-50', text: 'text-indigo-600', hover: 'hover:border-indigo-200 group-hover:text-indigo-600' };
      case 'amber': return { bg: 'bg-amber-50', text: 'text-amber-600', hover: 'hover:border-amber-200 group-hover:text-amber-600' };
      case 'rose': return { bg: 'bg-rose-50', text: 'text-rose-600', hover: 'hover:border-rose-200 group-hover:text-rose-600' };
      case 'violet': return { bg: 'bg-violet-50', text: 'text-violet-600', hover: 'hover:border-violet-200 group-hover:text-violet-600' };
      default: return { bg: 'bg-slate-50', text: 'text-slate-600', hover: 'hover:border-slate-200 group-hover:text-slate-600' };
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-600 selection:text-white flex flex-col">
      <Header />
      
      {/* Premium Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#007BFF]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#00B388]/5 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#007BFF]/10 text-[#007BFF] font-bold text-[10px] uppercase tracking-widest mb-6 border border-[#007BFF]/20 shadow-sm"
          >
            <Building className="w-4 h-4" /> Global Industry Expertise
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-heading font-black text-[#042B6B] tracking-tight mb-6 leading-[1.1] max-w-4xl mx-auto drop-shadow-sm"
          >
            Specialized Recruitment Across <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#007BFF] to-[#00B388]">Key Sectors.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-[#2F3440]/80 mb-10 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            We don't just fill roles; we understand your industry's DNA. Our sector-specific recruiters speak your language and know where the top talent lives.
          </motion.p>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-20 relative z-10 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((ind, index) => {
              const colors = getColorClasses(ind.color);
              return (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  key={ind.id}
                  className={`group bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(4,43,107,0.1)] transition-all duration-300 hover:-translate-y-2 relative overflow-hidden flex flex-col justify-between`}
                >
                  <div>
                    <div className={`absolute top-0 right-0 w-32 h-32 ${colors.bg} rounded-bl-full opacity-50 group-hover:scale-110 transition-transform duration-500`} />
                    
                    <div className={`w-14 h-14 rounded-2xl ${colors.bg} flex items-center justify-center mb-6 relative z-10 border border-white shadow-inner group-hover:scale-110 transition-transform`}>
                      <ind.icon className={`w-7 h-7 ${colors.text}`} />
                    </div>
                    
                    <h3 className={`text-2xl font-heading font-black text-[#042B6B] mb-3 relative z-10 transition-colors ${colors.hover.split(' ')[1]}`}>
                      {ind.title}
                    </h3>
                    <p className="text-[#2F3440]/70 font-medium mb-8 relative z-10 h-16 leading-relaxed">
                      {ind.description}
                    </p>
                    
                    <div className="space-y-3 mb-8 relative z-10">
                      {ind.roles.slice(0,4).map((role, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm font-semibold text-[#2F3440]/80">
                          <CheckCircle2 className={`w-4 h-4 ${colors.text} shrink-0`} />
                          {role}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link href={`/jobs?industry=${ind.id}`} className="relative z-10">
                    <button className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gray-50 text-[#042B6B] font-bold group-hover:bg-gradient-to-r group-hover:from-[#007BFF] group-hover:to-[#00B388] group-hover:text-white transition-all shadow-sm">
                      View Open Roles <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#0b1b3d] to-blue-900 rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/30 rounded-full blur-[120px] pointer-events-none" />
            
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 relative z-10 tracking-tight">Don't see your industry?</h2>
            <p className="text-blue-200 font-medium text-lg max-w-2xl mx-auto mb-10 relative z-10">
              Our executive search network spans across multiple niche verticals. Contact our principal consultants to discuss your specific requirements.
            </p>
            <Link href="/contact" className="relative z-10">
              <button className="bg-white text-[#0b1b3d] px-10 py-4 rounded-xl font-black hover:bg-blue-50 transition-colors hover:scale-105 transform duration-200 shadow-xl">
                Contact Our Consultants
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
