"use client";

import { motion } from "framer-motion";
import { useCMSServices } from "@/services/queries";
import { Layers, Briefcase, Users, Cog, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ServiceCategories() {
  const { data: services, isLoading, isError } = useCMSServices();

  // Premium fallbacks in case admin hasn't added CMS services yet
  const displayServices = (!isError && services && services.length > 0)
    ? services
    : [
        { id: "1", name: "Executive Search", description: "Retained search for C-suite and VP level executives with guaranteed placements.", price: 15000 },
        { id: "2", name: "Contract Staffing", description: "Flexible workforce solutions tailored to your project needs and timelines.", price: 5000 },
        { id: "3", name: "Permanent Hiring", description: "End-to-end recruitment process outsourcing for permanent full-time roles.", price: 8000 },
        { id: "4", name: "HR Consulting", description: "Strategic advisory on workforce planning, compliance, and compensation.", price: 12000 }
      ];

  const icons = [Layers, Briefcase, Users, Cog, Sparkles];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#007BFF]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-black text-[#042B6B] mb-6">Our Services</h2>
          <p className="text-lg text-[#2F3440]/70 font-medium">Comprehensive workforce solutions powered by our proprietary matching technology and human expertise.</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 bg-white/50 backdrop-blur-md rounded-3xl animate-pulse shadow-sm border border-gray-100"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {displayServices.map((service, i) => {
              const Icon = icons[i % icons.length];
              return (
                <motion.div
                  key={service.id || i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-10 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,123,255,0.15)] hover:-translate-y-2 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-16 h-16 rounded-2xl bg-[#007BFF]/10 text-[#007BFF] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-[#007BFF] group-hover:text-white transition-all duration-300 shadow-inner border border-[#007BFF]/20">
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#042B6B] mb-4 group-hover:text-[#007BFF] transition-colors">{service.name}</h3>
                    <p className="text-[#2F3440]/70 font-medium leading-relaxed mb-8">{service.description}</p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <div>
                      {service.price ? (
                        <div className="text-[#042B6B] font-black text-lg">
                          ${service.price.toLocaleString()} <span className="text-sm font-semibold text-[#2F3440]/50">/ engagement</span>
                        </div>
                      ) : (
                        <div className="text-[#2F3440]/50 font-bold uppercase tracking-wider text-sm">Custom Pricing</div>
                      )}
                    </div>
                    <Button variant="outline" className="border-[#007BFF]/30 text-[#007BFF] hover:bg-[#007BFF] hover:text-white rounded-full font-bold transition-colors">
                      Learn More
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
