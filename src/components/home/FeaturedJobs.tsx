"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useJobs } from "@/services/queries";
import { ArrowRight, MapPin, DollarSign, Clock, Building2, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FeaturedJobs() {
  const { data: jobs, isLoading, isError } = useJobs("OPEN");

  // Filter or slice to get top 6 for the homepage
  const featured = jobs?.slice(0, 6) || [];

  return (
    <section className="py-24 relative overflow-hidden bg-white">
      {/* Decorative gradient orb */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#007BFF]/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-heading font-black text-[#042B6B] mb-4">
              Featured Opportunities
            </h2>
            <p className="text-lg text-[#2F3440]/70 font-medium">
              Discover your next career move with our curated list of exclusive, high-impact roles at top global enterprises.
            </p>
          </div>
          <Link href="/jobs">
            <Button className="bg-white text-[#042B6B] border-2 border-gray-100 hover:border-[#007BFF]/30 hover:bg-[#007BFF]/5 rounded-full px-8 h-12 shadow-sm whitespace-nowrap font-bold transition-all">
              Explore All Jobs <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-[280px] bg-white rounded-3xl p-8 border border-slate-100 shadow-sm animate-pulse flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 bg-slate-100 rounded-2xl mb-6"></div>
                  <div className="h-6 bg-slate-100 rounded-md w-3/4 mb-3"></div>
                  <div className="h-4 bg-slate-100 rounded-md w-1/2"></div>
                </div>
                <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-100">
                  <div className="h-4 bg-slate-100 rounded-md w-1/3"></div>
                  <div className="h-10 w-24 bg-slate-100 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : isError || featured.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Briefcase className="w-10 h-10 text-blue-300" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">No Open Roles Right Now</h3>
            <p className="text-slate-500 max-w-md mx-auto">Check back later or join our talent network to be notified when new roles become available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,123,255,0.15)] transition-all group flex flex-col justify-between relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#007BFF]/5 rounded-bl-full transition-transform group-hover:scale-150 pointer-events-none" />
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 bg-[#007BFF]/10 text-[#007BFF] rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-[#007BFF] group-hover:text-white transition-all shadow-inner">
                      <Building2 className="w-7 h-7" />
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="px-3 py-1 bg-[#00B388]/10 text-[#00B388] text-xs font-bold rounded-full uppercase tracking-wider">
                        {job.status}
                      </span>
                      {job.industry && (
                        <span className="px-3 py-1 bg-[#042B6B]/5 text-[#042B6B] text-[10px] font-bold rounded-full uppercase tracking-wider">
                          {job.industry}
                        </span>
                      )}
                    </div>
                  </div>
                  <Link href={`/jobs/${job.id}`}>
                    <h3 className="text-xl font-bold text-[#042B6B] mb-3 line-clamp-2 leading-tight group-hover:text-[#007BFF] transition-colors cursor-pointer">
                      {job.title}
                    </h3>
                  </Link>
                  <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-[#2F3440]/70 font-medium mt-4">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-[#007BFF]" /> {job.location || "Remote"}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#00B388]" /> {job.job_type || "Full-Time"}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100 relative z-10">
                  <div className="flex items-center gap-1.5 text-[#042B6B] font-bold">
                    <DollarSign className="w-5 h-5 text-[#00B388]" />
                    {job.salary_range || "Competitive"}
                  </div>
                  <Link href={`/jobs/${job.id}`}>
                    <Button variant="ghost" className="text-[#007BFF] hover:text-white hover:bg-[#007BFF] rounded-full font-semibold transition-colors">
                      Apply <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
