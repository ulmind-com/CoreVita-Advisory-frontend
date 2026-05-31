"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, Briefcase, MapPin, Sparkles, Star } from "lucide-react";
import { Input } from "@/components/ui/input";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden bg-[#042B6B]">
      {/* Premium Liquid Glass Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#007BFF]/20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-[#00B388]/15 blur-[150px] animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#042B6B_100%)] opacity-70" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          
          {/* Left: Typography & Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[55%] space-y-6"
          >
            {/* Pill Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-xl relative top-6 shadow-[0_0_20px_rgba(0,123,255,0.15)]"
            >
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-[#007BFF] to-[#00B388] shadow-inner">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-[#FFFFFF] text-[13px] font-bold uppercase tracking-wider drop-shadow-md">
                The Next Generation of Hiring
              </span>
            </motion.div>

            {/* Headline */}
            <div className="space-y-4 pt-12">
              <h1 className="text-5xl sm:text-6xl lg:text-[80px] font-heading font-black tracking-[-0.03em] text-white leading-[1.05] drop-shadow-2xl">
                Unlock Global<br/>
                <span className="relative">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#007BFF] via-[#4DA3FF] to-[#00B388]">
                    Potential,
                  </span>
                </span> One Hire<br/> At A Time.
              </h1>
              <p className="text-lg sm:text-2xl text-[#E8ECEF]/90 max-w-2xl leading-relaxed font-medium">
                Transform your workforce with AI-driven recruitment, seamless onboarding, and dynamic talent management. Build your dream team today.
              </p>
            </div>

            {/* Premium Floating Search Widget */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="bg-white/10 backdrop-blur-2xl border border-white/20 p-2 rounded-[2rem] max-w-3xl flex flex-col sm:flex-row shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] relative z-20"
            >
              <div className="flex-1 flex items-center px-6 py-4 sm:py-0 group cursor-text rounded-[1.5rem] hover:bg-white/5 transition-colors">
                <Search className="w-5 h-5 text-[#007BFF] shrink-0 mr-3" />
                <input 
                  type="text" 
                  placeholder="Job title, keywords, or company" 
                  className="w-full bg-transparent border-none text-white placeholder:text-white/60 focus:outline-none focus:ring-0 p-0 text-[16px] font-medium"
                />
              </div>
              
              <div className="hidden sm:block w-px bg-white/20 my-3 self-stretch"></div>
              
              <div className="flex-1 flex items-center px-6 py-4 sm:py-0 border-t sm:border-t-0 border-white/10 group cursor-text rounded-[1.5rem] hover:bg-white/5 transition-colors">
                <MapPin className="w-5 h-5 text-[#00B388] shrink-0 mr-3" />
                <input 
                  type="text" 
                  placeholder="City, state, or remote" 
                  className="w-full bg-transparent border-none text-white placeholder:text-white/60 focus:outline-none focus:ring-0 p-0 text-[16px] font-medium"
                />
              </div>

              <Button className="h-auto min-h-[60px] sm:min-w-[160px] bg-gradient-to-r from-[#007BFF] to-[#00B388] hover:opacity-90 text-white rounded-full px-8 font-bold text-[16px] shadow-[0_0_30px_rgba(0,123,255,0.3)] border border-white/20 transition-all shrink-0 mt-2 sm:mt-0">
                Search Jobs
              </Button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-4"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-[#042B6B] bg-gray-200 overflow-hidden relative">
                    <Image src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" fill className="object-cover" />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-[#042B6B] bg-[#2F3440] flex items-center justify-center z-10 text-[10px] font-bold text-white">
                  +10k
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-[13px] text-[#E8ECEF]/60 font-medium">Loved by 10,000+ HR professionals</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: 3D Illustration */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[45%] relative flex justify-center lg:justify-end"
          >
            {/* Wrapper for both image and badges to establish relative positioning */}
            <div className="relative w-full max-w-[650px] aspect-[4/3] group">
              
              {/* Image Container with Mask */}
              <div 
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{
                  maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 50%, transparent 100%)',
                  WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 50%, transparent 100%)'
                }}
              >
                <Image 
                  src="/images/hero_transparent.png" 
                  alt="CoreVita HR Professionals" 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-auto"
                  priority
                  quality={100}
                />
              </div>
              
              {/* Glassmorphism floating badge - Left */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-[8%] -left-[25%] z-20 bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-[0_20px_40px_rgba(0,0,0,0.3)] flex items-center gap-3 border border-white/20"
              >
                <div className="w-12 h-12 rounded-xl bg-[#00B388]/20 flex items-center justify-center text-[#00B388] border border-[#00B388]/30">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">New Hire Placed</p>
                  <p className="text-xs text-[#E8ECEF]/70 font-medium">Sarah joined TechCorp</p>
                </div>
              </motion.div>

              {/* Glassmorphism floating badge - Right */}
              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-[10%] right-[0%] z-20 bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-[0_20px_40px_rgba(0,0,0,0.3)] flex items-center gap-3 border border-white/20"
              >
                <div className="w-12 h-12 rounded-xl bg-[#007BFF]/20 flex items-center justify-center text-[#007BFF] border border-[#007BFF]/30">
                  <span className="text-lg font-black">2k+</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Open Positions</p>
                  <p className="text-xs text-[#E8ECEF]/70 font-medium">Live globally right now</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
