"use client";

import { motion } from "framer-motion";
import { Heart, Zap, Shield, Users, Trophy, Globe } from "lucide-react";

export function CoreValues() {
  const values = [
    { title: "Radical Transparency", desc: "No hidden fees, no black-box algorithms. We build trust through absolute clarity.", icon: Shield, color: "text-blue-500", bg: "bg-blue-50" },
    { title: "Relentless Innovation", desc: "We constantly push the boundaries of what HR technology can achieve.", icon: Zap, color: "text-amber-500", bg: "bg-amber-50" },
    { title: "Human-Centric", desc: "AI powers our platform, but human empathy drives our decisions.", icon: Heart, color: "text-rose-500", bg: "bg-rose-50" },
    { title: "Global Inclusion", desc: "Talent is everywhere. We break down borders to build diverse teams.", icon: Globe, color: "text-emerald-500", bg: "bg-emerald-50" },
    { title: "Shared Success", desc: "We only win when our clients build the teams they've always dreamed of.", icon: Trophy, color: "text-purple-500", bg: "bg-purple-50" },
    { title: "Community First", desc: "We nurture a vibrant ecosystem of professionals who lift each other up.", icon: Users, color: "text-indigo-500", bg: "bg-indigo-50" },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-[#007BFF]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-[-10%] w-[500px] h-[500px] bg-[#00B388]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-black text-[#042B6B] mb-6">Our Core Values</h2>
          <p className="text-lg text-[#2F3440]/70 font-medium">These are the principles that guide every feature we build and every relationship we forge.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((val, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,123,255,0.15)] hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className={`w-14 h-14 rounded-2xl ${val.bg} ${val.color} flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform`}>
                <val.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#042B6B] mb-3">{val.title}</h3>
              <p className="text-[#2F3440]/70 text-sm font-medium leading-relaxed">{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
