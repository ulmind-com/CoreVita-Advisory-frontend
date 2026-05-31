"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTASection } from "@/components/home/CTASection";
import { FeaturedCompanies } from "@/components/home/FeaturedCompanies";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Users, Globe, BarChart3, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function EmployersPage() {
  const benefits = [
    { title: "Vetted Professionals", desc: "Every candidate goes through a rigorous 4-step technical and behavioral interview process.", icon: ShieldCheck, color: "text-blue-500", bg: "bg-blue-50" },
    { title: "Lightning Fast Hiring", desc: "Reduce your time-to-hire by 40% with our AI-powered candidate matching system.", icon: Zap, color: "text-emerald-500", bg: "bg-emerald-50" },
    { title: "Global Compliance", desc: "We handle local labor laws, payroll, and benefits across 150+ countries seamlessly.", icon: Globe, color: "text-indigo-500", bg: "bg-indigo-50" },
    { title: "Dedicated Account Team", desc: "A dedicated recruiting team works directly with your hiring managers 24/7.", icon: Users, color: "text-amber-500", bg: "bg-amber-50" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans selection:bg-blue-600 selection:text-white">
      <Header />
      
      <main className="flex-1 w-full pt-32">
        {/* Premium Hero Section */}
        <section className="py-20 lg:py-32 relative overflow-hidden bg-[#042B6B] text-white">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#007BFF]/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#00B388]/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#042B6B_100%)] opacity-80 pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#007BFF]/10 border border-[#007BFF]/20 text-[#007BFF] font-black text-[10px] uppercase tracking-widest mb-6 shadow-sm backdrop-blur-md"
                >
                  <BarChart3 className="w-4 h-4" /> B2B Enterprise Solutions
                </motion.div>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-5xl md:text-7xl font-heading font-black tracking-tight mb-8 leading-[1.1] drop-shadow-md"
                >
                  Build your dream team, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#007BFF] to-[#00B388]">
                    without borders.
                  </span>
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl text-[#E8ECEF]/80 mb-10 max-w-xl font-medium leading-relaxed"
                >
                  Join hundreds of enterprise companies that trust us to source, vet, and manage their global workforce with 100% compliance.
                </motion.p>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col sm:flex-row items-center gap-4"
                >
                  <Link href="/contact" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#007BFF] to-[#00B388] text-white font-bold rounded-full hover:opacity-90 transition-all shadow-[0_10px_30px_rgba(0,123,255,0.3)] flex items-center justify-center gap-2 group">
                    Start Hiring Today <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link href="/services" className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-full hover:bg-white/20 transition-all flex items-center justify-center">
                    Explore Services
                  </Link>
                </motion.div>
              </div>

              {/* Hiring Funnel Mockup */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="relative hidden lg:block"
              >
                <div className="bg-white/10 backdrop-blur-3xl rounded-[2.5rem] p-10 border border-white/20 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] relative z-10 group">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-[2.5rem] pointer-events-none" />
                  <h3 className="text-2xl font-heading font-black text-white mb-8">Our Proven Hiring Funnel</h3>
                  
                  <div className="space-y-4 relative z-10">
                    {[
                      { num: "10,000+", label: "Initial Applicants Sourced", color: "bg-[#007BFF]/20 text-[#007BFF]" },
                      { num: "500+", label: "Pass AI Screening", color: "bg-[#007BFF]/30 text-[#007BFF]" },
                      { num: "50+", label: "Pass Technical Interview", color: "bg-gradient-to-r from-[#007BFF]/40 to-[#00B388]/40 text-white" },
                      { num: "Top 3", label: "Presented to You", color: "bg-gradient-to-r from-[#00B388] to-[#008C73] text-white shadow-[0_0_20px_rgba(0,179,136,0.4)]" }
                    ].map((step, i) => (
                      <div key={i} className={`h-16 w-full ${step.color} rounded-[1.5rem] flex items-center px-6 justify-between transition-all hover:scale-[1.02] duration-300 backdrop-blur-md`}>
                        <span className="font-bold text-sm tracking-wide">{step.label}</span>
                        <span className="font-black text-xl drop-shadow-sm">{step.num}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-24 bg-slate-50 relative z-10 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00B388]/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-heading font-black text-[#042B6B] mb-4 tracking-tight">Why Enterprise Employers Choose Us</h2>
              <p className="text-lg text-[#2F3440]/80 font-medium leading-relaxed">We take the friction out of global recruitment and team scaling, allowing you to focus on building your product.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((val, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  key={i} 
                  className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(4,43,107,0.08)] transition-all duration-300 group hover:-translate-y-2 flex flex-col"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-[#007BFF]/10 text-[#007BFF] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#007BFF] group-hover:text-white transition-all duration-300 shadow-inner border border-[#007BFF]/20`}>
                    <val.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-[#042B6B] mb-3 leading-snug">{val.title}</h3>
                  <p className="text-[#2F3440]/70 font-medium leading-relaxed">{val.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ROI Section */}
        <section className="py-24 bg-white border-t border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00B388]/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-heading font-black text-[#042B6B] tracking-tight mb-6">Lower Costs, Higher Quality</h2>
                <p className="text-lg text-[#2F3440]/80 font-medium mb-8 leading-relaxed">
                  Stop wasting engineering hours on interviewing unqualified candidates. Our embedded recruitment model saves enterprise clients an average of $45,000 per hire.
                </p>
                <ul className="space-y-5 mb-10">
                  {[
                    "Zero upfront costs until successful placement",
                    "90-day replacement guarantee",
                    "Customized technical assessments",
                    "Full background and reference checks included"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#007BFF]/30 transition-colors">
                      <div className="w-6 h-6 rounded-full bg-[#007BFF]/20 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4 text-[#007BFF]" />
                      </div>
                      <span className="font-bold text-[#2F3440]/80">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact">
                  <button className="bg-gradient-to-r from-[#042B6B] to-[#007BFF] text-white px-8 py-4 rounded-full font-bold hover:opacity-90 transition-opacity shadow-[0_10px_30px_rgba(4,43,107,0.3)] border border-white/20">
                    Schedule a Consultation
                  </button>
                </Link>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white/50 backdrop-blur-3xl rounded-[3rem] p-10 md:p-12 border border-gray-200 shadow-[0_20px_50px_rgba(4,43,107,0.08)] grid grid-cols-2 gap-8 relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#007BFF]/5 to-[#00B388]/5 rounded-[3rem] pointer-events-none" />
                
                <div className="space-y-2 relative z-10 p-6 rounded-[2rem] bg-white border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                  <h4 className="text-4xl md:text-5xl font-black text-[#007BFF]">40%</h4>
                  <p className="font-bold text-[#2F3440]/70 text-sm">Faster Time-to-Hire</p>
                </div>
                <div className="space-y-2 relative z-10 p-6 rounded-[2rem] bg-white border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                  <h4 className="text-4xl md:text-5xl font-black text-[#042B6B]">98%</h4>
                  <p className="font-bold text-[#2F3440]/70 text-sm">Retention Rate</p>
                </div>
                <div className="space-y-2 relative z-10 p-6 rounded-[2rem] bg-white border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                  <h4 className="text-4xl md:text-5xl font-black text-[#00B388]">150+</h4>
                  <p className="font-bold text-[#2F3440]/70 text-sm">Countries Supported</p>
                </div>
                <div className="space-y-2 relative z-10 p-6 rounded-[2rem] bg-white border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                  <h4 className="text-4xl md:text-5xl font-black text-amber-500">24/7</h4>
                  <p className="font-bold text-[#2F3440]/70 text-sm">Dedicated Support</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Existing Components */}
        <FeaturedCompanies />
        <CTASection />

      </main>

      <Footer />
    </div>
  );
}
