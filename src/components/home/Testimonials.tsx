"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { useEffect, useState } from "react";
import api from "@/services/api";

export function Testimonials() {
  const [cmsContent, setCmsContent] = useState<{ title: string; desc: string } | null>(null);

  useEffect(() => {
    api.get("/cms/pages/home-testimonials").then(res => {
      const div = document.createElement("div");
      div.innerHTML = res.data.content || "";
      const h2 = div.querySelector("h2")?.innerText || res.data.title;
      const p = div.querySelector("p")?.innerText;
      setCmsContent({ title: h2, desc: p || "Hear from the global leaders who have transformed their workforce with our platform." });
    }).catch(() => {
      // Fallback
    });
  }, []);

  const reviews = [
    {
      name: "Alexandra Wright",
      role: "VP of HR, TechFlow Enterprise",
      text: "The quality of candidates and the speed of the matching algorithm is unprecedented. We hired our entire engineering leadership team through this platform in under 3 weeks.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Founder & CEO, QuantStack",
      text: "As a boutique finance firm, we need highly specialized quants. CoreVita's vetting process is rigorous, and the candidates they deliver are truly top 1% globally.",
      rating: 5
    },
    {
      name: "Sarah Jenkins",
      role: "Director of Talent, Innovate Inc",
      text: "The automated pipeline and integrated interview scheduling saved my team hundreds of hours. It is the most premium SaaS recruitment tool we have ever used.",
      rating: 5
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-black text-[#042B6B] mb-6">
            {cmsContent?.title || "Client Experience"}
          </h2>
          <p className="text-lg text-slate-500">
            {cmsContent?.desc || "Hear from the global leaders who have transformed their workforce with our platform."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,123,255,0.15)] hover:-translate-y-2 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <Quote className="w-10 h-10 text-blue-100 mb-4" />
                <p className="text-slate-600 leading-relaxed font-medium mb-8">
                  &quot;{review.text}&quot;
                </p>
              </div>
              
              <div className="flex items-center gap-4 pt-6 border-t border-slate-50">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-lg shadow-inner">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-[#0b1b3d]">{review.name}</h4>
                  <p className="text-sm text-slate-500">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
