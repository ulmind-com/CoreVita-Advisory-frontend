"use client";
/* eslint-disable */


import { useState } from "react";
import { useJobs } from "@/services/queries";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Search, MapPin, Briefcase, Filter, ArrowRight, Building2, Clock, ChevronDown, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function JobsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { data: rawJobs, isLoading, error } = useJobs(activeTab === "all" ? undefined : activeTab.toUpperCase());

  // Functional Frontend Filtering
  const jobs = rawJobs?.filter(job => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return job.title.toLowerCase().includes(q) || 
           job.description.toLowerCase().includes(q) ||
           (job.location || "").toLowerCase().includes(q) ||
           (job.industry || "").toLowerCase().includes(q);
  });

  const categories = [
    { id: "all", label: "All Jobs" },
    { id: "engineering", label: "Engineering & Tech" },
    { id: "finance", label: "Finance & Legal" },
    { id: "sales", label: "Sales & Marketing" },
    { id: "design", label: "Product & Design" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-600 selection:text-white flex flex-col">
      <Header />
      
      {/* Premium Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-[#042B6B]">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#007BFF]/50 to-transparent opacity-50" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#007BFF]/30 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-40 -left-20 w-72 h-72 bg-[#00B388]/20 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white font-semibold text-sm mb-6 shadow-inner"
            >
              <Briefcase className="w-4 h-4 text-[#00B388]" /> Over 10,000+ Premium Roles Available
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-heading font-black text-white tracking-tight mb-6 leading-[1.1] drop-shadow-2xl"
            >
              Find Your Next <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#007BFF] to-[#00B388]">Dream Job.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-white/80 mb-10 font-medium"
            >
              Discover elite opportunities at top global companies. We connect world-class talent with world-class teams.
            </motion.p>
            
            {/* Search Widget */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/10 backdrop-blur-xl p-2 rounded-2xl border border-white/20 flex flex-col md:flex-row gap-2 shadow-2xl"
            >
              <div className="flex-1 flex items-center bg-white/5 rounded-xl px-4 py-3 border border-transparent focus-within:border-[#007BFF]/50 focus-within:bg-white/10 transition-colors">
                <Search className="w-5 h-5 text-white/50 mr-3 shrink-0" />
                <input 
                  type="text" 
                  placeholder="Job title, keywords, or company..." 
                  className="bg-transparent border-none outline-none text-white placeholder:text-white/50 w-full font-medium"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex-1 flex items-center bg-white/5 rounded-xl px-4 py-3 border border-transparent focus-within:border-[#007BFF]/50 focus-within:bg-white/10 transition-colors hidden md:flex">
                <MapPin className="w-5 h-5 text-white/50 mr-3 shrink-0" />
                <input 
                  type="text" 
                  placeholder="City, state, or 'Remote'" 
                  className="bg-transparent border-none outline-none text-white placeholder:text-white/50 w-full font-medium"
                />
              </div>
              <button className="bg-[#007BFF] hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-bold transition-colors shadow-lg shadow-[#007BFF]/30 w-full md:w-auto">
                Search Roles
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-1 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left Sidebar Filters */}
            <div className="w-full lg:w-72 shrink-0">
              <div className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-sm sticky top-28">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-black text-[#0b1b3d] text-lg">Filters</h3>
                  <button className="text-sm font-semibold text-blue-600">Clear all</button>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-slate-700 mb-3 text-sm">Job Type</h4>
                    <div className="space-y-2">
                      {["Full-time", "Part-time", "Contract", "Freelance"].map((type) => (
                        <label key={type} className="flex items-center gap-3 cursor-pointer group">
                          <div className="w-5 h-5 rounded border border-slate-300 group-hover:border-blue-500 transition-colors flex items-center justify-center">
                            <CheckCircle2 className="w-3.5 h-3.5 text-white opacity-0 transition-opacity" />
                          </div>
                          <span className="text-slate-600 font-medium text-sm group-hover:text-[#0b1b3d] transition-colors">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-700 mb-3 text-sm">Experience Level</h4>
                    <div className="space-y-2">
                      {["Entry Level", "Mid Level", "Senior Level", "Director / Executive"].map((level) => (
                        <label key={level} className="flex items-center gap-3 cursor-pointer group">
                          <div className="w-5 h-5 rounded border border-slate-300 group-hover:border-blue-500 transition-colors flex items-center justify-center">
                            <CheckCircle2 className="w-3.5 h-3.5 text-white opacity-0 transition-opacity" />
                          </div>
                          <span className="text-slate-600 font-medium text-sm group-hover:text-[#0b1b3d] transition-colors">{level}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-slate-700 mb-3 text-sm">Salary Range</h4>
                    <input type="range" className="w-full accent-blue-600" min="0" max="200000" />
                    <div className="flex justify-between text-xs font-semibold text-slate-500 mt-2">
                      <span>$0</span>
                      <span>$200k+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Listings */}
            <div className="flex-1">
              
              {/* Category Tabs */}
              <div className="flex gap-2 overflow-x-auto pb-4 custom-scrollbar mb-4">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                      activeTab === cat.id
                        ? "bg-[#042B6B] text-white shadow-md"
                        : "bg-white text-[#2F3440]/80 border border-gray-200 hover:border-[#007BFF]/30 hover:bg-[#007BFF]/5 hover:text-[#007BFF]"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Sorting Bar */}
              <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-2xl border border-gray-200/60 shadow-sm">
                <p className="font-semibold text-gray-500 text-sm">
                  Showing <span className="text-[#042B6B] font-bold">{jobs?.length || 0}</span> open roles
                </p>
                <div className="flex items-center gap-2 text-sm font-bold text-gray-600 cursor-pointer hover:text-[#042B6B]">
                  Sort by: <span className="text-[#007BFF]">Most Relevant</span> <ChevronDown className="w-4 h-4" />
                </div>
              </div>

              {/* Listings Grid */}
              <div className="space-y-4">
                {isLoading ? (
                  Array(5).fill(0).map((_, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm h-40 animate-pulse" />
                  ))
                ) : error ? (
                  <div className="bg-red-50 text-red-500 font-bold p-6 rounded-3xl border border-red-100 text-center">
                    Failed to load jobs. Check backend connection.
                  </div>
                ) : jobs?.length === 0 ? (
                  <div className="bg-white p-12 rounded-3xl border border-slate-200/60 text-center shadow-sm">
                    <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-xl font-black text-[#0b1b3d] mb-2">No roles found</h3>
                    <p className="text-slate-500 font-medium max-w-md mx-auto">We couldn't find any roles matching your current search criteria. Try adjusting your filters.</p>
                  </div>
                ) : (
                  <AnimatePresence>
                    {jobs?.map((job, i) => (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: i * 0.05 }}
                        key={job.id}
                        className="group bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                      >
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-14 h-14 rounded-2xl bg-[#007BFF]/5 flex items-center justify-center border border-[#007BFF]/10 shrink-0 overflow-hidden relative shadow-inner">
                            {/* Company logo placeholder */}
                            <Building2 className="w-6 h-6 text-[#007BFF]/60 absolute" />
                          </div>
                          <div>
                            <div className="flex flex-col gap-1 mb-1">
                               {job.industry && (
                                 <span className="text-[10px] font-bold text-[#00B388] uppercase tracking-wider">{job.industry}</span>
                               )}
                               <h3 className="text-lg font-black text-[#042B6B] group-hover:text-[#007BFF] transition-colors">
                                 <Link href={`/jobs/${job.id}`}>{job.title}</Link>
                               </h3>
                            </div>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold text-gray-500 mb-3">
                              <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4 text-gray-400" /> {job.company_id.substring(0,6)} Corp</span>
                              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-gray-400" /> {job.location || "Remote"}</span>
                              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-gray-400" /> {job.job_type || "Full-Time"}</span>
                            </div>
                            <div className="flex gap-2">
                              <span className="px-3 py-1 rounded-lg bg-[#00B388]/10 text-[#00B388] text-xs font-bold border border-[#00B388]/20">{job.salary_range || 'Competitive'}</span>
                              <span className="px-3 py-1 rounded-lg bg-[#007BFF]/10 text-[#007BFF] text-xs font-bold border border-[#007BFF]/20">{job.status}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="shrink-0 flex items-center md:flex-col justify-between md:justify-center gap-4 border-t md:border-t-0 border-gray-100 pt-4 md:pt-0">
                          <p className="text-xs font-bold text-gray-400">Actively Recruiting</p>
                          <Link href={`/jobs/${job.id}`}>
                            <button className="bg-[#042B6B] hover:bg-[#007BFF] text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-colors flex items-center gap-2">
                              View Role <ArrowRight className="w-4 h-4" />
                            </button>
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
