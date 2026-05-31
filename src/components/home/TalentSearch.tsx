"use client";

import { motion } from "framer-motion";
import { useCandidates } from "@/services/queries";
import { ArrowRight, UserCheck, Star, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TalentSearch() {
  const { data: candidates, isLoading, isError } = useCandidates();

  const displayCandidates = (!isError && candidates && candidates.length > 0)
    ? candidates
    : [
        { id: "1", name: "Sarah Miller", skills: ["Python", "FastAPI", "React", "AWS"], status: "AVAILABLE" },
        { id: "2", name: "David Chen", skills: ["Quantitative Modeling", "Statistics", "Python"], status: "AVAILABLE" },
        { id: "3", name: "Elena Rodriguez", skills: ["Product Management", "Agile", "UX Design"], status: "AVAILABLE" },
        { id: "4", name: "Marcus Johnson", skills: ["DevOps", "Kubernetes", "CI/CD", "Go"], status: "AVAILABLE" }
      ];

  return (
    <section className="py-24 bg-[#042B6B] text-white relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-[#007BFF]/15 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-[#00B388]/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white text-sm font-bold mb-6 backdrop-blur-md uppercase tracking-wider">
              <Star className="w-4 h-4 text-yellow-400" fill="currentColor" /> Top 1% Talent
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-black mb-4 text-white drop-shadow-sm">
              Hire World-Class <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#007BFF] to-[#00B388]">Professionals</span>
            </h2>
            <p className="text-lg text-[#E8ECEF]/80 font-medium leading-relaxed">
              Skip the noise. Connect directly with pre-vetted, highly skilled professionals ready to make an immediate impact on your business.
            </p>
          </div>
          <Button className="bg-white hover:bg-slate-50 text-[#042B6B] rounded-full px-8 h-14 font-bold shadow-[0_10px_30px_rgba(255,255,255,0.1)] transition-all">
            Browse Talent Pool <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-[300px] bg-white/5 rounded-3xl p-6 border border-white/10 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayCandidates.slice(0, 4).map((candidate, i) => (
              <motion.div
                key={candidate.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -8 }}
                className="bg-white/5 backdrop-blur-2xl rounded-3xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] hover:shadow-[0_30px_60px_-15px_rgba(0,123,255,0.2)] group cursor-pointer"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#007BFF] to-[#00B388] p-[2px] shadow-lg group-hover:scale-110 transition-transform">
                    <div className="w-full h-full rounded-full bg-[#042B6B] flex items-center justify-center text-xl font-bold text-white">
                      {candidate.name.charAt(0)}
                    </div>
                  </div>
                  <span className="px-2.5 py-1 bg-[#00B388]/20 text-[#00B388] text-[10px] font-bold rounded-full uppercase tracking-wider border border-[#00B388]/20">
                    {candidate.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#007BFF] transition-colors">
                  {candidate.name}
                </h3>
                <p className="text-[#E8ECEF]/60 text-sm mb-6 flex items-center gap-1.5 font-medium">
                  <UserCheck className="w-4 h-4 text-[#00B388]" /> Pre-vetted Professional
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {candidate.skills.slice(0, 3).map((skill: string, j: number) => (
                    <span key={j} className="px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[11px] font-bold text-white uppercase tracking-wider">
                      {skill}
                    </span>
                  ))}
                  {candidate.skills.length > 3 && (
                    <span className="px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[11px] font-bold text-white/50 uppercase tracking-wider">
                      +{candidate.skills.length - 3}
                    </span>
                  )}
                </div>

                <Button variant="ghost" className="w-full justify-between text-[#007BFF] font-bold hover:text-white hover:bg-[#007BFF] h-12 px-6 rounded-xl group/btn transition-colors">
                  View Profile 
                  <FileText className="w-4 h-4 opacity-50 group-hover/btn:opacity-100 transition-opacity group-hover/btn:translate-x-1" />
                </Button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
