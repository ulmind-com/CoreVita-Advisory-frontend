"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeartPulse, Stethoscope, Microscope, ArrowRight } from "lucide-react";

export default function HealthcareIndustryPage() {
  const features = [
    { icon: Stethoscope, title: "Clinical Staffing", desc: "Physicians, registered nurses, and specialized healthcare practitioners." },
    { icon: Microscope, title: "Life Sciences & R&D", desc: "Researchers, lab directors, and clinical trial managers." },
    { icon: HeartPulse, title: "Health-Tech Leadership", desc: "Executives bridging the gap between medical care and digital innovation." },
  ];

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />
      
      {/* Premium Hero Section */}
      <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#042B6B]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[900px] h-[900px] rounded-full bg-[#00B388]/15 blur-[150px] animate-pulse" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,transparent_0%,#042B6B_100%)] opacity-85" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-[#00B388]/30 backdrop-blur-xl mb-8 shadow-[0_0_20px_rgba(0,179,136,0.15)]"
            >
              <HeartPulse className="w-4 h-4 text-[#00B388]" />
              <span className="text-[#E8ECEF] text-sm font-bold tracking-widest uppercase">Healthcare & Life Sciences</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-7xl font-heading font-black text-white mb-8 leading-tight"
            >
              Empowering Care. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B388] to-teal-200">Advancing Science.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              className="text-xl text-[#E8ECEF]/80 max-w-2xl mx-auto leading-relaxed font-medium mb-12"
            >
              The future of global health relies on brilliant minds. We connect leading medical institutions and biotech firms with the talent that saves lives.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Glassmorphic Features Section */}
      <section className="py-24 relative bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto -mt-32 relative z-20">
            {features.map((feat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + (idx * 0.1) }}
                className="bg-white/80 backdrop-blur-2xl p-8 rounded-3xl border border-[#00B388]/10 shadow-[0_20px_40px_-15px_rgba(0,179,136,0.08)] hover:shadow-[0_30px_60px_-15px_rgba(0,179,136,0.2)] transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#00B388]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feat.icon className="w-7 h-7 text-[#00B388]" />
                </div>
                <h3 className="text-2xl font-bold text-[#042B6B] mb-3">{feat.title}</h3>
                <p className="text-[#2F3440]/70 font-medium leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-32 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-heading font-black text-[#042B6B] mb-6">Precision and Compliance</h2>
            <p className="text-lg text-[#2F3440]/80 mb-10 leading-relaxed">
              Healthcare staffing requires rigorous credentialing and an unwavering commitment to quality. Our bespoke process ensures every placement meets the highest clinical standards.
            </p>
            <button className="inline-flex items-center gap-2 bg-[#00B388] hover:bg-[#008C73] text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-[#00B388]/30 transition-all hover:pr-6 group">
              Source Medical Talent <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
