"use client";

import { useJobs } from "@/services/queries";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MapPin, Briefcase, ArrowLeft, Building2, Clock, CheckCircle2, ChevronRight, Share2, Bookmark, DollarSign } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { use } from "react";

export default function JobDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { data: jobs, isLoading } = useJobs();
  
  // In a real app with a GET /jobs/:id endpoint, we'd use that hook. 
  // For now, we find the job from the list.
  const job = jobs?.find(j => j.id === resolvedParams.id);

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-600 selection:text-white flex flex-col">
      <Header />
      
      {isLoading ? (
        <div className="flex-1 pt-32 pb-20 px-6 max-w-7xl mx-auto w-full">
          <div className="h-10 w-32 bg-slate-200 animate-pulse rounded-lg mb-8" />
          <div className="h-64 bg-white border border-slate-200 rounded-3xl animate-pulse mb-8" />
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 h-96 bg-white border border-slate-200 rounded-3xl animate-pulse" />
            <div className="h-96 bg-white border border-slate-200 rounded-3xl animate-pulse" />
          </div>
        </div>
      ) : !job ? (
        <div className="flex-1 pt-32 pb-20 px-6 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-black text-[#0b1b3d] mb-4">Job Not Found</h1>
            <p className="text-slate-500 mb-8">The role you are looking for may have been filled or removed.</p>
            <Link href="/jobs">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold">Back to Jobs</button>
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Job Header Hero */}
          <section className="pt-32 pb-12 bg-white border-b border-slate-200 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-blue-50/50 to-transparent pointer-events-none" />
            
            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <Link href="/jobs" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors mb-8">
                <ArrowLeft className="w-4 h-4" /> Back to all roles
              </Link>
              
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 rounded-2xl bg-white border-2 border-slate-100 shadow-sm flex items-center justify-center shrink-0">
                    <Building2 className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-[#0b1b3d] mb-3">{job.title}</h1>
                    <div className="flex flex-wrap items-center gap-4 text-[#2F3440]/70 font-bold mt-2">
                      {job.industry && <span className="flex items-center gap-1.5 text-[#00B388]"><Briefcase className="w-4 h-4" /> {job.industry}</span>}
                      <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4 text-[#007BFF]" /> Company ID: {job.company_id.substring(0,8)}</span>
                      <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-[#007BFF]" /> {job.location || 'Remote'}</span>
                      <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-[#00B388]" /> {job.job_type || 'Full-time'}</span>
                      <span className="flex items-center gap-1.5"><DollarSign className="w-4 h-4 text-[#00B388]" /> {job.salary_range || 'Competitive'}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                  <button className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
                    <Bookmark className="w-4 h-4" /> Save
                  </button>
                  <button className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
                    <Share2 className="w-4 h-4" /> Share
                  </button>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-bold transition-colors shadow-lg shadow-blue-600/20">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Job Content */}
          <section className="flex-1 py-12">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid lg:grid-cols-3 gap-10">
                
                {/* Left Content */}
                <div className="lg:col-span-2 space-y-10">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200/60 shadow-sm"
                  >
                    <h2 className="text-2xl font-black text-[#0b1b3d] mb-6">About the Role</h2>
                    <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-[#0b1b3d] prose-p:font-medium prose-p:text-slate-600 prose-li:text-slate-600 prose-li:font-medium">
                      <p>{job.description}</p>
                      
                      <h3>Key Responsibilities</h3>
                      <ul>
                        <li>Drive technical architecture and implementation for scalable distributed systems.</li>
                        <li>Collaborate with cross-functional teams to define, design, and ship new features.</li>
                        <li>Ensure the performance, quality, and responsiveness of applications.</li>
                        <li>Identify and correct bottlenecks and fix bugs in our systems.</li>
                        <li>Help maintain code quality, organization, and automatization.</li>
                      </ul>

                      <h3>Requirements</h3>
                      <ul>
                        <li>Proven experience as a senior contributor in a high-growth tech environment.</li>
                        <li>Strong knowledge of modern web development and system design.</li>
                        <li>Familiarity with cloud message APIs and push notifications.</li>
                        <li>Understanding of design principles and interface guidelines.</li>
                        <li>Proficient understanding of code versioning tools (e.g. Git).</li>
                      </ul>
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gradient-to-br from-[#0b1b3d] to-[#041E4F] rounded-3xl p-8 md:p-10 shadow-xl text-white relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[60px] pointer-events-none" />
                    <h2 className="text-2xl font-black mb-4 relative z-10">Ready to make an impact?</h2>
                    <p className="text-blue-200/80 font-medium mb-8 max-w-xl relative z-10">
                      Join a world-class team building the future. Submit your application today and our recruitment team will be in touch within 48 hours.
                    </p>
                    <button className="bg-white text-[#0b1b3d] hover:bg-blue-50 px-8 py-3.5 rounded-xl font-black transition-colors relative z-10 w-full md:w-auto">
                      Submit Application
                    </button>
                  </motion.div>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-6">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-3xl p-8 border border-slate-200/60 shadow-sm"
                  >
                    <h3 className="font-black text-[#0b1b3d] mb-6 text-lg">Job Overview</h3>
                    
                    <div className="space-y-6">
                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                          <DollarSign className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Salary Range</p>
                          <p className="font-bold text-[#0b1b3d]">{job.salary_range}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#00B388]/10 flex items-center justify-center shrink-0">
                          <Briefcase className="w-5 h-5 text-[#00B388]" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Job Type</p>
                          <p className="font-bold text-[#0b1b3d]">{job.job_type || 'Full-time'}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#007BFF]/10 flex items-center justify-center shrink-0">
                          <MapPin className="w-5 h-5 text-[#007BFF]" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Location</p>
                          <p className="font-bold text-[#0b1b3d]">{job.location || 'Remote'}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-slate-100/50 rounded-3xl p-8 border border-slate-200/60"
                  >
                    <h3 className="font-black text-[#0b1b3d] mb-4 text-lg">Benefits & Perks</h3>
                    <ul className="space-y-3">
                      {[
                        "Comprehensive Health Insurance",
                        "Unlimited PTO & Sick Days",
                        "Remote Work Setup Stipend",
                        "Annual Learning Budget",
                        "401(k) / Pension Matching"
                      ].map((perk, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm font-medium text-slate-600">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> {perk}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>

              </div>
            </div>
          </section>
        </>
      )}

      <Footer />
    </div>
  );
}
