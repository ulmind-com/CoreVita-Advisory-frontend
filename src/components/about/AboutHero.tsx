"use client";
/* eslint-disable */


import { motion } from "framer-motion";

export function AboutHero() {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden bg-[#042B6B] text-white">
      {/* Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] right-[10%] w-[50%] h-[50%] rounded-full bg-[#007BFF]/20 blur-[120px]" />
        <div className="absolute top-[30%] -left-[10%] w-[40%] h-[40%] rounded-full bg-[#00B388]/15 blur-[120px]" />
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}
        />
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#007BFF]/10 via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-bold tracking-widest uppercase backdrop-blur-xl shadow-inner"
          >
            Our Story
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-heading font-black tracking-tight leading-[1.1] drop-shadow-lg"
          >
            Pioneering the Future of <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#007BFF] to-[#00B388]">
              Global Talent Acquisition
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-[#E8ECEF]/90 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            We are on a mission to dismantle the barriers of traditional recruitment. By combining AI-driven matching with human-centric advising, we build the world&apos;s most innovative teams.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
