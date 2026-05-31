"use client";

import { motion } from "framer-motion";

export function ServicesHero() {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden bg-white">
      {/* Abstract Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -right-[5%] w-[40%] h-[40%] rounded-full bg-[#00B388]/10 blur-[120px]" />
        <div className="absolute top-[20%] -left-[10%] w-[30%] h-[30%] rounded-full bg-[#007BFF]/10 blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#00B388]/10 border border-[#00B388]/20 text-[#00B388] text-sm font-bold tracking-widest uppercase shadow-sm"
          >
            End-to-End Solutions
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-heading font-black tracking-tight text-[#042B6B] leading-[1.1] drop-shadow-sm"
          >
            Smarter Hiring, <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#007BFF] to-[#00B388]">
              Faster Scaling.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-[#2F3440]/80 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            From executive search to contingent workforce management, our comprehensive suite of services is designed to handle your most complex talent challenges.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
