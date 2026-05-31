"use client";
/* eslint-disable */


import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Cpu, Code2, Network, ArrowRight } from "lucide-react";

export default function TechnologyIndustryPage() {
  const features = [
    { icon: Code2, title: "Software Engineers", desc: "Full-stack, backend, and frontend developers across modern tech stacks." },
    { icon: Network, title: "Data & AI", desc: "Machine learning engineers, data scientists, and AI researchers." },
    { icon: Cpu, title: "Tech Leadership", desc: "CTOs, VP of Engineering, and senior technical architects." },
  ];

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />
      
      {/* Premium Hero Section */}
      <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#042B6B]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] right-[10%] w-[800px] h-[800px] rounded-full bg-[#007BFF]/20 blur-[130px] animate-pulse" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,transparent_0%,#042B6B_100%)] opacity-85" />
          
          {/* Grid overlay for tech feel */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-[#007BFF]/20 backdrop-blur-xl mb-8 shadow-[0_0_20px_rgba(0,123,255,0.2)]"
            >
              <Cpu className="w-4 h-4 text-[#007BFF]" />
              <span className="text-[#E8ECEF] text-sm font-bold tracking-widest uppercase">Technology Sector</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-7xl font-heading font-black text-white mb-8 leading-tight"
            >
              Building The Code Of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Tomorrow's Future.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              className="text-xl text-[#E8ECEF]/80 max-w-2xl mx-auto leading-relaxed font-medium mb-12"
            >
              In a rapidly evolving digital landscape, your product is only as strong as the team building it. We source elite technical talent that drives innovation.
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
                className="bg-white/80 backdrop-blur-2xl p-8 rounded-3xl border border-[#007BFF]/10 shadow-[0_20px_40px_-15px_rgba(0,123,255,0.1)] hover:shadow-[0_30px_60px_-15px_rgba(0,123,255,0.2)] transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#007BFF]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner">
                  <feat.icon className="w-7 h-7 text-[#007BFF]" />
                </div>
                <h3 className="text-2xl font-bold text-[#042B6B] mb-3">{feat.title}</h3>
                <p className="text-[#2F3440]/70 font-medium leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-32 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-heading font-black text-[#042B6B] mb-6">Fuel Your Tech Engine</h2>
            <p className="text-lg text-[#2F3440]/80 mb-10 leading-relaxed">
              From Series A startups to Fortune 500 enterprises, we understand the nuances of technical hiring. Partner with us to assemble engineering pods that ship faster and scale seamlessly.
            </p>
            <button className="inline-flex items-center gap-2 bg-[#007BFF] hover:bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-[#007BFF]/30 transition-all hover:pr-6 group">
              Hire Top Engineers <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
