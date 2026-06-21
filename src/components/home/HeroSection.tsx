"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, Star, Briefcase, Search, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const heroImages = [
    "/images/hero_transparent.png",
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(timer);
  }, [heroImages.length]);

  return (
    <section className="relative min-h-[100vh] flex items-center pt-32 lg:pt-28 pb-32 lg:pb-40 overflow-hidden bg-[#0A1220]">
      {/* Background with subtle dots or gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] rounded-full bg-[#1E3A8A]/30 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#0F172A]/50 blur-[100px]" />
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-6 mt-6 lg:mt-12">
          
          {/* Left: Content */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[50%] space-y-5"
          >
            {/* Top Badge */}
            <div className="flex items-center gap-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#0F172A] border border-[#1E293B]"
              >
                <div className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse" />
                <span className="text-[#60A5FA] text-xs font-medium tracking-wide">
                  Global Reach — Local Expertise
                </span>
              </motion.div>
              <div className="h-px w-8 bg-[#1E293B]" />
              <span className="text-[#64748B] text-[10px] font-bold tracking-[0.2em] uppercase">
                Recruitment & Staffing
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-heading font-medium leading-[1.1] text-white tracking-tight">
                Strategic <br />
                Workforce & <span className="text-[#60A5FA] italic font-medium pr-2">Talent</span> <br />
                <span className="text-[#d9a05b]">Solutions</span>
              </h1>
              <p className="text-base text-[#94A3B8] max-w-[580px] leading-relaxed pt-1">
                CoVian Advisory Pvt Ltd is a leading workforce solutions and business
                advisory company specializing in talent acquisition, staffing, workforce
                management, and recruitment consulting. We partner with organizations to
                build agile, future-ready teams by delivering customized hiring strategies,
                quality talent pipelines, and workforce solutions that drive long-term
                business success.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-1">
              <Link href="/contact" className="h-12 px-8 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-[15px] transition-all flex items-center justify-center gap-2 shadow-lg">
                <Briefcase className="w-5 h-5 fill-white" />
                Hire Talent Now
              </Link>
              <Link href="/jobs" className="h-12 px-8 rounded-full border border-[#334155] bg-transparent hover:bg-white/5 text-white font-semibold text-[15px] transition-all flex items-center justify-center gap-2">
                <Search className="w-4 h-4 text-[#94A3B8]" />
                Apply for Jobs
              </Link>
            </div>

            {/* Contact Info Pills */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
              <div className="flex items-center gap-4 px-5 py-3 rounded-full bg-[#111827] border border-[#1F2937] hover:bg-[#1F2937] transition-colors cursor-pointer">
                <Phone className="w-4 h-4 text-[#64748B]" />
                <div className="flex flex-col">
                  <span className="text-white font-semibold text-[13px] leading-tight">+91 98765 43210</span>
                  <span className="text-[#F43F5E] text-[11px] hover:underline decoration-[#F43F5E] leading-tight mt-0.5">Call or WhatsApp</span>
                </div>
              </div>
              <div className="flex items-center gap-4 px-5 py-3 rounded-full bg-[#111827] border border-[#1F2937] hover:bg-[#1F2937] transition-colors cursor-pointer">
                <Mail className="w-4 h-4 text-[#64748B]" />
                <div className="flex flex-col">
                  <span className="text-white font-semibold text-[13px] leading-tight">contact@covian.com</span>
                  <span className="text-[#F43F5E] text-[11px] hover:underline decoration-[#F43F5E] leading-tight mt-0.5">Email us anytime</span>
                </div>
              </div>
            </div>

            {/* Bottom Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-[#1E293B] mt-6">
              <div>
                <div className="text-[32px] font-heading font-medium text-white mb-1 leading-none tracking-tight">
                  500<span className="text-[#d9a05b] font-sans text-2xl">+</span>
                </div>
                <div className="text-[#64748B] text-[10px] font-bold uppercase tracking-wider">Placements Made</div>
              </div>
              <div>
                <div className="text-[32px] font-heading font-medium text-white mb-1 leading-none tracking-tight">
                  100<span className="text-[#d9a05b] font-sans text-2xl">+</span>
                </div>
                <div className="text-[#64748B] text-[10px] font-bold uppercase tracking-wider">Corporate Clients</div>
              </div>
              <div>
                <div className="text-[32px] font-heading font-medium text-white mb-1 leading-none tracking-tight flex items-baseline">
                  24<span className="text-[#d9a05b] font-sans text-[26px]">/</span>7
                </div>
                <div className="text-[#64748B] text-[10px] font-bold uppercase tracking-wider">Support Available</div>
              </div>
              <div>
                <div className="text-[32px] font-heading font-medium text-white mb-1 leading-none tracking-tight">
                  99<span className="text-[#d9a05b] font-sans text-2xl">%</span>
                </div>
                <div className="text-[#64748B] text-[10px] font-bold uppercase tracking-wider">Success Rate</div>
              </div>
            </div>
          </motion.div>

          {/* Right: Image Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[45%] relative flex justify-center lg:justify-start mt-10 lg:mt-0 lg:pl-10"
          >
            <div className="relative w-full max-w-[420px] aspect-[3/4]">
              {/* Inner container for image and gradient with overflow-hidden */}
              <div className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-2xl bg-[#0F172A]">
                
                <AnimatePresence>
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <Image 
                      src={heroImages[currentImageIndex]} 
                      alt="HR Professionals" 
                      fill 
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 500px"
                      priority={currentImageIndex === 0}
                    />
                  </motion.div>
                </AnimatePresence>
                
                {/* Inner Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1220] via-[#0A1220]/10 to-transparent pointer-events-none" />

                {/* Bottom Card Text */}
                <div className="absolute bottom-8 left-8 right-8 z-20">
                  <h3 className="text-[26px] font-heading font-medium text-white mb-2">Connecting Talent, Building Futures</h3>
                  <div className="flex items-center gap-2 text-[#94A3B8] text-[13px]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#60A5FA]" />
                    <span>Verified Professionals — Deployed Fast</span>
                  </div>
                </div>
              </div>

              {/* Floating Badge Top Left */}
              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-6 left-6 z-20 bg-[#1E3A8A]/80 backdrop-blur-md rounded-[1.25rem] px-5 py-4 shadow-lg border border-white/10"
              >
                <div className="text-[28px] font-heading text-white leading-none mb-1 tracking-tight">
                  500<span className="text-[#d9a05b] font-sans text-xl">+</span>
                </div>
                <p className="text-[10px] text-white/80 font-medium tracking-wide uppercase">Placements</p>
              </motion.div>

              {/* Floating Badge Bottom Right */}
              <motion.div 
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-[55%] right-[-5%] lg:right-[-8%] z-20 bg-white rounded-2xl p-3 shadow-[0_20px_40px_rgba(0,0,0,0.2)] flex items-center gap-3 w-[160px]"
              >
                <div className="w-10 h-10 rounded-full bg-[#FFFBEB] flex items-center justify-center shrink-0">
                  <Star className="w-5 h-5 fill-[#F59E0B] text-[#F59E0B]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-[#0F172A] leading-tight">4.9</span>
                  <span className="text-[10px] text-[#64748B] font-medium leading-tight">Average Rating</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
      
      {/* ── BOTTOM WAVE DIVIDER ── */}
      <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-[50px] md:h-[80px] lg:h-[120px]">
          {/* Subtle back wave */}
          <path 
            d="M0,90 C320,150 420,30 720,30 C1020,30 1120,150 1440,90 L1440,120 L0,120 Z" 
            className="fill-slate-50/10" 
          />
          {/* Main front wave matching the next section's background */}
          <path 
            d="M0,60 C320,120 420,0 720,0 C1020,0 1120,120 1440,60 L1440,120 L0,120 Z" 
            className="fill-slate-50" 
          />
        </svg>
      </div>

    </section>
  );
}
