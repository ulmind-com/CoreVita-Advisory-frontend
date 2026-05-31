"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How fast can you fill an open position?",
      a: "For standard roles, we typically present qualified, pre-vetted candidates within 48 hours. Executive searches average 14-21 days for the first slate of candidates."
    },
    {
      q: "Do you handle global compliance and payroll?",
      a: "Yes. Through our Employer of Record (EOR) service, we manage all local labor laws, taxes, benefits, and payroll for your international hires."
    },
    {
      q: "What is your candidate vetting process?",
      a: "Our proprietary AI pre-screens candidates for baseline skills, followed by a rigorous human-led technical and behavioral interview process by our domain experts."
    },
    {
      q: "What happens if a new hire doesn't work out?",
      a: "We offer a comprehensive 90-day replacement guarantee for permanent placements. If a candidate leaves or is let go, we will replace them at no additional cost."
    }
  ];

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#007BFF]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#00B388]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-black text-[#042B6B] mb-4">Frequently Asked Questions</h2>
          <p className="text-[#2F3440]/70 font-medium">Everything you need to know about our enterprise services and pricing.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border border-gray-200 rounded-[2rem] overflow-hidden bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,123,255,0.08)] transition-all group"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-8 text-left focus:outline-none"
              >
                <span className="text-lg font-bold text-[#042B6B] pr-8 group-hover:text-[#007BFF] transition-colors">{faq.q}</span>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${openIndex === i ? 'bg-[#007BFF] text-white shadow-md' : 'bg-[#007BFF]/10 text-[#007BFF] group-hover:bg-[#007BFF]/20'}`}>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`} />
                </div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-8 pb-8 text-[#2F3440]/80 font-medium leading-relaxed border-t border-gray-100 pt-6 mt-2">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
