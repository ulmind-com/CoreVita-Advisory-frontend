"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-[#042B6B] rounded-[3rem] p-12 md:p-20 shadow-[0_30px_60px_-15px_rgba(4,43,107,0.4)] flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden border border-[#042B6B]/50"
        >
          {/* Background Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,transparent_0%,#042B6B_100%)] opacity-80 pointer-events-none" />
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#007BFF]/30 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#00B388]/20 blur-[100px] animate-pulse pointer-events-none" />

          <div className="w-full md:w-3/5 space-y-8 relative z-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white leading-tight drop-shadow-md">
              Ready to transform your hiring process?
            </h2>
            
            <p className="text-[#E8ECEF]/90 text-lg md:text-xl max-w-xl font-medium">
              Join thousands of leading enterprises building their global dream teams faster, smarter, and with zero friction.
            </p>

            <ul className="space-y-3 pb-4">
              {['No credit card required', '14-day premium free trial', 'Cancel anytime'].map((item, i) => (
                <li key={i} className="flex items-center text-white font-medium">
                  <CheckCircle2 className="w-5 h-5 text-[#00B388] mr-3 drop-shadow-sm" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register">
                <Button size="lg" className="bg-gradient-to-r from-[#007BFF] to-[#00B388] hover:opacity-90 text-white rounded-full px-8 h-14 text-[16px] font-bold shadow-[0_10px_30px_rgba(0,123,255,0.3)] w-full sm:w-auto transition-all border border-white/20">
                  Get Started For Free <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 h-14 text-[16px] font-bold w-full sm:w-auto bg-white/5 backdrop-blur-sm transition-all">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="w-full md:w-2/5 relative h-[400px] lg:h-[500px] flex justify-center lg:justify-end z-10">
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full max-w-[400px] h-full"
            >
              <Image 
                src="/images/cta_character.png" 
                alt="App Download" 
                fill 
                className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
              />
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
