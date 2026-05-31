"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { UserPlus, Award, FileText, CheckCircle2, TrendingUp, Sparkles, ArrowRight, ShieldCheck, HeartPulse, GraduationCap } from "lucide-react";
import Link from "next/link";

export default function CandidatesHubPage() {
  const benefits = [
    {
      icon: ShieldCheck,
      title: "Exclusive Opportunities",
      description: "Access unlisted executive roles and confidential searches at top-tier SaaS companies."
    },
    {
      icon: TrendingUp,
      title: "Career Mapping",
      description: "Work with our specialized consultants to build a 5-year strategic growth trajectory."
    },
    {
      icon: HeartPulse,
      title: "Comprehensive Well-being",
      description: "Our partner companies offer elite health, wellness, and mental health stipends."
    },
    {
      icon: GraduationCap,
      title: "Continuous Learning",
      description: "Get placed in roles that provide annual education budgets and conference allowances."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-600 selection:text-white flex flex-col">
      <Header />
      
      {/* Premium Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-[#042B6B]">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00B388]/50 to-transparent opacity-50" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00B388]/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#007BFF]/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#042B6B_100%)] opacity-80 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#00B388]/10 border border-[#00B388]/20 text-[#00B388] font-black text-[10px] uppercase tracking-widest mb-6 shadow-sm backdrop-blur-md"
              >
                <Sparkles className="w-4 h-4" /> For Elite Professionals
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-6xl font-heading font-black text-white tracking-tight mb-6 leading-[1.1] drop-shadow-md"
              >
                Accelerate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B388] to-[#007BFF]">Career Trajectory.</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-[#E8ECEF]/80 mb-10 font-medium leading-relaxed"
              >
                We partner with high-growth startups and Fortune 500 enterprises to place top talent. Let us negotiate your worth, refine your profile, and secure your dream role.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <Link href="/jobs">
                  <button className="bg-gradient-to-r from-[#007BFF] to-[#00B388] hover:opacity-90 text-white px-8 py-4 rounded-full font-bold transition-all shadow-[0_10px_30px_rgba(0,123,255,0.3)] flex items-center gap-2 group">
                    Browse Open Roles <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-full font-bold transition-all backdrop-blur-md">
                  Join Talent Network
                </button>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              {/* Premium Glass Card Mockup */}
              <div className="bg-white/10 backdrop-blur-3xl rounded-[2.5rem] p-10 border border-white/20 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] relative z-10 overflow-hidden group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#00B388]/30 rounded-full blur-[50px] pointer-events-none group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#007BFF]/30 rounded-full blur-[50px] pointer-events-none group-hover:scale-110 transition-transform duration-700" />
                
                <div className="flex items-center gap-6 mb-10 relative z-10">
                  <div className="w-20 h-20 rounded-[1.5rem] bg-gradient-to-br from-[#007BFF] to-[#00B388] p-[2px] shadow-lg">
                    <div className="w-full h-full bg-[#042B6B]/80 backdrop-blur-sm rounded-[1.4rem] flex items-center justify-center">
                      <UserPlus className="w-8 h-8 text-[#00B388]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-heading font-black text-white mb-1">Create Profile</h3>
                    <p className="text-[#00B388] font-bold text-sm tracking-wide">Join 50k+ professionals</p>
                  </div>
                </div>
                
                <div className="space-y-4 relative z-10">
                  <div className="h-14 w-full bg-white/5 rounded-2xl border border-white/10 flex items-center px-5 gap-4 shadow-inner">
                    <FileText className="w-5 h-5 text-[#007BFF]" />
                    <div className="h-4 w-32 bg-white/20 rounded-md" />
                  </div>
                  <div className="h-14 w-full bg-white/5 rounded-2xl border border-white/10 flex items-center px-5 gap-4 shadow-inner">
                    <Award className="w-5 h-5 text-[#007BFF]" />
                    <div className="h-4 w-48 bg-white/20 rounded-md" />
                  </div>
                  <div className="h-14 w-full bg-[#00B388]/20 rounded-2xl border border-[#00B388]/30 flex items-center px-5 gap-3 justify-center text-[#00B388] font-bold shadow-[0_0_15px_rgba(0,179,136,0.2)]">
                    <CheckCircle2 className="w-5 h-5" /> Profile Optimized
                  </div>
                </div>
              </div>
              
              {/* Floating Element */}
              <div className="absolute -bottom-8 -left-8 bg-white/90 backdrop-blur-xl rounded-[2rem] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.3)] border border-gray-100 z-20 flex items-center gap-5 animate-bounce" style={{ animationDuration: '4s' }}>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#007BFF] to-[#00B388] flex items-center justify-center shadow-inner">
                  <span className="text-2xl font-black text-white">3x</span>
                </div>
                <div>
                  <p className="text-sm font-black text-[#042B6B]">Higher Placement</p>
                  <p className="text-xs font-bold text-[#2F3440]/60 uppercase tracking-wider mt-1">vs industry average</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-slate-50 relative z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#007BFF]/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-black text-[#042B6B] tracking-tight mb-4">Why Partner With Us?</h2>
            <p className="text-lg text-[#2F3440]/80 font-medium leading-relaxed">We treat our candidates like our clients. Experience a white-glove recruitment process designed around your goals.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                key={i} 
                className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 border border-gray-100 hover:shadow-[0_20px_50px_rgba(4,43,107,0.08)] transition-all group hover:-translate-y-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#007BFF]/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#007BFF] transition-all shadow-inner border border-[#007BFF]/20">
                  <benefit.icon className="w-8 h-8 text-[#007BFF] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-[#042B6B] mb-3 leading-snug">{benefit.title}</h3>
                <p className="text-[#2F3440]/70 font-medium leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resume Services & Career Roadmap */}
      <section className="py-24 bg-white border-t border-gray-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-4xl md:text-5xl font-heading font-black text-[#042B6B] tracking-tight mb-6">Executive Resume Services</h2>
                <p className="text-lg text-[#2F3440]/80 font-medium leading-relaxed">Your resume is your ticket to the interview. Our expert writers specialize in transforming good CVs into compelling executive narratives.</p>
              </div>
              
              <ul className="space-y-5">
                {[
                  "ATS-Optimized Formatting (Applicant Tracking Systems)",
                  "Keyword Integration for Niche Technical Roles",
                  "LinkedIn Profile Overhaul & Brand Positioning",
                  "Cover Letter Creation & Follow-up Strategy"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#007BFF]/30 transition-colors">
                    <div className="w-6 h-6 rounded-full bg-[#00B388]/20 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-[#00B388]" />
                    </div>
                    <span className="font-bold text-[#2F3440]/80">{item}</span>
                  </li>
                ))}
              </ul>
              
              <button className="bg-gradient-to-r from-[#042B6B] to-[#007BFF] text-white px-8 py-4 rounded-full font-bold hover:opacity-90 transition-opacity shadow-[0_10px_30px_rgba(4,43,107,0.3)] border border-white/20">
                Request Resume Review
              </button>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white/50 backdrop-blur-3xl rounded-[3rem] p-10 md:p-12 border border-gray-200 shadow-[0_20px_50px_rgba(4,43,107,0.08)] relative"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#007BFF]/5 rounded-full blur-[60px] pointer-events-none" />
              <h3 className="text-3xl font-heading font-black text-[#042B6B] mb-10 relative z-10">The Placement Roadmap</h3>
              
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-[#007BFF]/20 before:via-[#00B388]/20 before:to-transparent z-10">
                {[
                  { title: "Initial Discovery Call", desc: "Understanding your goals, constraints, and target salary." },
                  { title: "Profile Optimization", desc: "Refining your CV and preparing your interview narrative." },
                  { title: "Curated Introductions", desc: "Direct pitches to hiring managers at target companies." },
                  { title: "Offer Negotiation", desc: "We negotiate the best total compensation package for you." }
                ].map((step, idx) => (
                  <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-14 h-14 rounded-full border-[4px] border-white bg-gradient-to-tr from-[#007BFF] to-[#00B388] text-white shadow-md shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 font-black z-10 group-hover:scale-110 transition-transform">
                      {idx + 1}
                    </div>
                    <div className="w-[calc(100%-4.5rem)] md:w-[calc(50%-3rem)] bg-white p-6 rounded-[1.5rem] border border-gray-100 shadow-sm group-hover:shadow-md group-hover:border-[#007BFF]/30 transition-all">
                      <h4 className="font-bold text-[#042B6B] mb-2">{step.title}</h4>
                      <p className="text-sm font-medium text-[#2F3440]/70 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
