"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Landmark, Briefcase, TrendingUp, ArrowRight } from "lucide-react";

export default function FinanceIndustryPage() {
  const features = [
    { icon: Landmark, title: "Investment Banking", desc: "M&A, capital markets, and corporate restructuring professionals." },
    { icon: TrendingUp, title: "FinTech Innovation", desc: "Product managers, quant analysts, and blockchain experts." },
    { icon: Briefcase, title: "Corporate Finance", desc: "CFOs, controllers, and FP&A leaders driving fiscal strategy." },
  ];

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />
      
      {/* Premium Hero Section */}
      <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#042B6B]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[20%] w-[800px] h-[800px] rounded-full bg-[#042B6B]/40 blur-[130px] animate-pulse" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#021636_100%)] opacity-95" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-8"
            >
              <Landmark className="w-4 h-4 text-[#E8ECEF]" />
              <span className="text-[#E8ECEF] text-sm font-bold tracking-widest uppercase">Financial Services</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-7xl font-heading font-black text-white mb-8 leading-tight drop-shadow-xl"
            >
              Trust. Integrity. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400">Financial Excellence.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              className="text-xl text-[#E8ECEF]/80 max-w-2xl mx-auto leading-relaxed font-medium mb-12"
            >
              The financial sector demands professionals with impeccable credentials and absolute discretion. We secure the talent that safeguards and grows global capital.
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
                className="bg-white/80 backdrop-blur-2xl p-8 rounded-3xl border border-gray-200 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] hover:shadow-[0_30px_60px_-15px_rgba(4,43,107,0.15)] transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#042B6B]/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feat.icon className="w-7 h-7 text-[#042B6B]" />
                </div>
                <h3 className="text-2xl font-bold text-[#042B6B] mb-3">{feat.title}</h3>
                <p className="text-[#2F3440]/70 font-medium leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-32 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-heading font-black text-[#042B6B] mb-6">Uncompromising Standards</h2>
            <p className="text-lg text-[#2F3440]/80 mb-10 leading-relaxed">
              We leverage our extensive network to place high-impact financial leaders who navigate regulatory complexity and drive fiscal outperformance.
            </p>
            <button className="inline-flex items-center gap-2 bg-[#042B6B] hover:bg-[#021636] text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-[#042B6B]/20 transition-all hover:pr-6 group">
              Partner With Us <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
