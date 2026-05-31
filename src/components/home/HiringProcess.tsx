"use client";

import { motion } from "framer-motion";
import { UserPlus, FileSearch, UserCheck, PartyPopper } from "lucide-react";

export function HiringProcess() {
  const steps = [
    {
      icon: UserPlus,
      title: "1. Create Profile",
      desc: "Sign up and complete your comprehensive talent or company profile in under 5 minutes."
    },
    {
      icon: FileSearch,
      title: "2. Smart Matching",
      desc: "Our AI immediately begins matching you with the perfect opportunities or candidates."
    },
    {
      icon: UserCheck,
      title: "3. Interview & Vet",
      desc: "Conduct seamless interviews through our platform with integrated scheduling."
    },
    {
      icon: PartyPopper,
      title: "4. Hire & Onboard",
      desc: "Send offers, sign contracts digitally, and onboard your new team member instantly."
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00B388]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-heading font-black text-[#042B6B] mb-6">
            Streamlined Hiring Process
          </h2>
          <p className="text-lg text-[#2F3440]/70 font-medium">
            We&apos;ve removed the friction from traditional recruitment. Experience a seamless, end-to-end hiring pipeline designed for modern teams.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-[48px] left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#007BFF]/20 to-transparent z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                className="relative flex flex-col items-center text-center group"
              >
                <div className="w-24 h-24 rounded-full bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex items-center justify-center mb-8 relative z-10 group-hover:scale-110 group-hover:border-[#007BFF]/30 group-hover:shadow-[0_20px_40px_rgba(0,123,255,0.2)] transition-all duration-300">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#007BFF]/10 to-[#00B388]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <step.icon className="w-10 h-10 text-[#007BFF] group-hover:text-[#042B6B] transition-colors relative z-10" />
                </div>
                <h3 className="text-xl font-bold text-[#042B6B] mb-3">{step.title}</h3>
                <p className="text-[#2F3440]/70 font-medium text-sm leading-relaxed max-w-xs">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
