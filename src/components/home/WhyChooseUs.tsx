"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, Globe2, LineChart } from "lucide-react";
import { useEffect, useState } from "react";
import api from "@/services/api";

export function WhyChooseUs() {
  const [cmsContent, setCmsContent] = useState<{ title: string; desc: string } | null>(null);

  useEffect(() => {
    // Attempt to fetch from the CMS if admin has configured the "home-features" slug
    api.get("/cms/pages/home-features").then(res => {
      // Basic extraction of text from CMS HTML assuming standard h1/p tags
      const div = document.createElement("div");
      div.innerHTML = res.data.content || "";
      const h1 = div.querySelector("h1")?.innerText || res.data.title;
      const p = div.querySelector("p")?.innerText || "Experience the next generation of workforce management.";
      setCmsContent({ title: h1, desc: p });
    }).catch(() => {
      // Fallback
    });
  }, []);

  const features = [
    {
      icon: ShieldCheck,
      title: "Enterprise Grade Security",
      desc: "Bank-level encryption and compliance with GDPR, SOC2, and global data protection standards.",
      color: "text-emerald-500",
      bg: "bg-emerald-50",
      border: "hover:border-emerald-200"
    },
    {
      icon: Zap,
      title: "AI-Powered Matching",
      desc: "Our proprietary machine learning models match the perfect candidates with your open roles in seconds.",
      color: "text-amber-500",
      bg: "bg-amber-50",
      border: "hover:border-amber-200"
    },
    {
      icon: Globe2,
      title: "Global Talent Pool",
      desc: "Access pre-vetted professionals from over 150 countries without the legal and compliance overhead.",
      color: "text-blue-500",
      bg: "bg-blue-50",
      border: "hover:border-blue-200"
    },
    {
      icon: LineChart,
      title: "Actionable Analytics",
      desc: "Make data-driven hiring decisions with our comprehensive real-time dashboards and reporting suite.",
      color: "text-purple-500",
      bg: "bg-purple-50",
      border: "hover:border-purple-200"
    }
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-black text-[#042B6B] mb-6">
            {cmsContent?.title || "Why Enterprises Choose Us"}
          </h2>
          <p className="text-lg text-[#2F3440]/70 font-medium">
            {cmsContent?.desc || "We've rebuilt the entire recruitment pipeline from the ground up, eliminating friction and maximizing talent quality."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`p-8 rounded-3xl border border-gray-100 bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,123,255,0.15)] hover:-translate-y-2 transition-all duration-300 ${feat.border} group`}
            >
              <div className={`w-16 h-16 rounded-2xl ${feat.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
                <feat.icon className={`w-8 h-8 ${feat.color}`} />
              </div>
              <h3 className="text-xl font-bold text-[#042B6B] mb-3">{feat.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                {feat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
