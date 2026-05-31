"use client";

import { motion } from "framer-motion";
import { useCompanies } from "@/services/queries";
import { Building, ArrowRight, ExternalLink, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FeaturedCompanies() {
  const { data: companies, isLoading, isError } = useCompanies();

  // If the endpoint is protected and returns error (e.g. 401) for public users, we gracefully fallback
  const displayCompanies = (!isError && companies && companies.length > 0) 
    ? companies 
    : [
        { id: "1", name: "Acme Corporation", domain: "acme.com", industry: "Technology", description: "Leading global SaaS provider specializing in enterprise automation solutions." },
        { id: "2", name: "Innovate Financials", domain: "innovatefin.com", industry: "Finance", description: "Innovative boutique asset management and micro-lending consultancy." },
        { id: "3", name: "Stark Industries", domain: "stark.com", industry: "Manufacturing", description: "Global leader in advanced technology and manufacturing." }
      ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#042B6B]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#00B388]/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#007BFF]/10 text-[#007BFF] text-sm font-bold mb-6 tracking-wide">
            Global Partners <ArrowRight className="w-4 h-4" />
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-black text-[#042B6B] mb-6">
            Trusted By Industry Leaders
          </h2>
          <p className="text-lg text-[#2F3440]/70 font-medium">
            Join the world&apos;s most innovative companies who trust our platform to build their dream teams and scale their workforce globally.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-slate-50 rounded-3xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayCompanies.slice(0, 6).map((company, i) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group relative bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(4,43,107,0.1)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#007BFF] to-[#00B388] rounded-t-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gray-50/50 border border-gray-100 flex items-center justify-center shadow-inner group-hover:bg-[#007BFF]/5 transition-colors">
                      <Building className="w-8 h-8 text-[#042B6B]/40 group-hover:text-[#007BFF] transition-colors" />
                    </div>
                    <span className="px-3 py-1 bg-[#042B6B]/5 text-[#042B6B] text-xs font-bold rounded-full uppercase tracking-wider group-hover:bg-[#042B6B] group-hover:text-white transition-colors">
                      {company.industry || "Enterprise"}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-[#042B6B] mb-3">{company.name}</h3>
                  <p className="text-[#2F3440]/70 text-sm font-medium leading-relaxed line-clamp-3">
                    {company.description || "Leading global enterprise driving innovation and setting industry standards in their respective field."}
                  </p>
                </div>
                
                <div className="mt-8 flex items-center justify-between pt-6 border-t border-gray-100">
                  <div className="flex items-center text-sm font-bold text-[#00B388]">
                    <Users className="w-4 h-4 mr-1.5" /> Actively Hiring
                  </div>
                  <Button variant="ghost" size="sm" className="text-[#007BFF] hover:text-white hover:bg-[#007BFF] rounded-full font-semibold transition-colors">
                    View Profile <ExternalLink className="ml-1.5 w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
