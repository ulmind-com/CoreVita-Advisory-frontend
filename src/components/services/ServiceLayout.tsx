"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CheckCircle2, ArrowRight, PhoneCall, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ServiceLayoutProps {
  tag: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  description: string;
  features: string[];
  imageUrl: string;
  stats: { value: string; label: string }[];
  heroBadges: string[];
  benefits?: { title: string; description: string }[];
  process?: { title: string; description: string }[];
  sectionLabel?: string;
  sectionTitle: string;
  sectionHighlight?: string;
  sectionBody: string[];
  sectionCards?: { icon: string; title: string; description: string }[];
  sectionImageUrl: string;
}

export function ServiceLayout({
  tag,
  title,
  titleHighlight,
  subtitle,
  description,
  features,
  imageUrl,
  stats,
  heroBadges,
  benefits,
  process,
  sectionLabel,
  sectionTitle,
  sectionHighlight,
  sectionBody,
  sectionCards,
  sectionImageUrl,
}: ServiceLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-[#0B1628] font-sans selection:bg-blue-600 selection:text-white">
      <Header />

      <main className="flex-1 w-full overflow-hidden">

        {/* ── HERO SECTION ── */}
        {tag === "Industry Focus" ? (
          <section className="relative w-full overflow-hidden bg-[#161C24] flex items-center border-b border-white/5">
            {/* Background Image with Gradient Fade */}
            <div className="absolute right-0 top-0 bottom-0 w-full md:w-[85%] lg:w-[75%] z-0">
              <Image
                src={imageUrl}
                alt={title}
                fill
                priority
                className="object-cover object-center"
              />
              {/* Fade Gradient: Solid dark left -> transparent right */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#161C24] via-[#161C24]/90 md:via-[#161C24]/60 to-transparent" />
              {/* Bottom gradient fade for mobile if text gets too long */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#161C24] via-[#161C24]/50 to-transparent md:hidden" />
            </div>

            <div className="container mx-auto px-6 lg:px-10 relative z-10 pt-32 pb-16 lg:pt-40 lg:pb-24">
              <div className="flex flex-col md:flex-row items-start gap-5 md:gap-8 max-w-5xl">
                {/* Icon (Left side) */}
                <div className="shrink-0 md:mt-1">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#1A56DB] flex items-center justify-center shadow-[0_0_20px_rgba(26,86,219,0.4)]">
                    <Heart className="w-6 h-6 md:w-7 md:h-7 text-white" />
                  </div>
                </div>

                {/* Text Content (Right side) */}
                <div className="flex flex-col gap-4">
                  <h1 className="text-3xl md:text-4xl lg:text-[40px] font-heading font-normal text-[#3B82F6] tracking-tight">
                    {title}
                  </h1>

                  <p className="text-[#C1C8D1] text-sm md:text-[15px] leading-relaxed lg:leading-[1.8] font-light max-w-xl lg:max-w-[700px]">
                    {description}
                  </p>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 mt-2 md:mt-4 text-[#3B82F6] font-semibold hover:text-blue-400 transition-colors group text-sm"
                  >
                    Know more 
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="relative min-h-[90vh] flex items-center pt-28 pb-32 lg:pb-40 overflow-hidden">
          {/* Background blobs */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              animate={{ x: [0, 60, 0], y: [0, -40, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-[-10%] w-[700px] h-[700px] bg-blue-700/20 rounded-full blur-[130px]"
            />
            <motion.div
              animate={{ x: [0, -60, 0], y: [0, 60, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-0 right-[-10%] w-[500px] h-[500px] bg-sky-500/15 rounded-full blur-[110px]"
            />
          </div>

          <div className="container mx-auto px-6 lg:px-10 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

              {/* LEFT: Text */}
              <div className="flex flex-col gap-6">
                {/* Tag pill */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 backdrop-blur-md"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                  <span className="text-blue-300 text-xs font-semibold tracking-widest uppercase">{tag}</span>
                </motion.div>

                {/* Label */}
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  className="text-blue-400 text-xs font-bold tracking-[0.15em] uppercase"
                >
                  — {subtitle}
                </motion.p>

                {/* Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl md:text-5xl lg:text-[52px] font-heading font-bold text-white leading-[1.1] tracking-tight"
                >
                  {title}{" "}
                  <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">
                    {titleHighlight}
                  </span>
                </motion.h1>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="text-slate-400 text-sm md:text-base leading-relaxed max-w-lg"
                >
                  {description}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-wrap gap-3"
                >
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-all shadow-[0_0_24px_rgba(59,130,246,0.35)] hover:shadow-[0_0_32px_rgba(59,130,246,0.5)]"
                  >
                    <ArrowRight className="w-4 h-4" />
                    Get in Touch
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white text-sm font-semibold backdrop-blur-sm transition-all"
                  >
                    <PhoneCall className="w-4 h-4" />
                    Call Us
                  </Link>
                </motion.div>

                {/* Badge pills */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.28 }}
                  className="flex flex-wrap gap-2"
                >
                  {heroBadges.map((badge, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      {badge}
                    </span>
                  ))}
                </motion.div>
              </div>

              {/* RIGHT: Image + stats */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="relative"
              >
                {/* Rounded image */}
                <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
                  <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1628]/70 via-transparent to-transparent" />

                  {/* Stats bar inside image */}
                  <div className="absolute bottom-0 left-0 right-0 flex divide-x divide-white/10 backdrop-blur-md bg-white/5 border-t border-white/10">
                    {stats.map((stat, i) => (
                      <div key={i} className="flex-1 py-4 text-center">
                        <p className="text-white font-bold text-xl leading-none">{stat.value}</p>
                        <p className="text-slate-400 text-xs mt-1">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Feature list overlay card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  className="absolute -bottom-8 -left-6 bg-[#0F1E36]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl w-56"
                >
                  <p className="text-white/50 text-[10px] uppercase tracking-widest mb-3 font-semibold">Key Services</p>
                  <div className="flex flex-col gap-2">
                    {features.slice(0, 3).map((f, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span className="text-slate-300 text-xs">{f}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>

            </div>
          </div>

          {/* ── BOTTOM WAVE DIVIDER ── */}
          <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
            <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="w-full h-[80px] md:h-[120px] lg:h-[180px]">
              {/* 1. Yellow Ribbon (Top Right) */}
              <path d="M0,150 C400,230 1000,10 1440,30 L1440,200 L0,200 Z" className="fill-[#FFC107]" />
              {/* 2. Vibrant Blue Ribbon */}
              <path d="M0,80 C400,160 1000,40 1440,60 L1440,200 L0,200 Z" className="fill-[#0047AB]" />
              {/* 3. White Gap */}
              <path d="M0,110 C400,190 1000,70 1440,90 L1440,200 L0,200 Z" className="fill-white" />
              {/* 4. Orange Ribbon (Bottom Left) */}
              <path d="M0,125 C400,205 1000,100 1440,120 L1440,200 L0,200 Z" className="fill-[#FF4500]" />
              {/* 5. Final White Base */}
              <path d="M0,165 C400,245 1000,70 1440,90 L1440,200 L0,200 Z" className="fill-white" />
            </svg>
          </div>
        </section>
        )}

        {/* ── CONTENT SECTION (Image Left + Text Right, like Sukoon Care) ── */}
        <section className="py-20 bg-white relative overflow-hidden">
          <div className="container mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center max-w-6xl mx-auto">

              {/* LEFT: Image with floating cards */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
                  <Image
                    src={sectionImageUrl}
                    alt={sectionTitle}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Floating top-left card */}
                <div className="absolute top-6 left-6 bg-white rounded-2xl shadow-xl p-3.5 flex items-center gap-3 max-w-[180px]">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                    <span className="text-lg">✅</span>
                  </div>
                  <div>
                    <p className="text-slate-800 text-xs font-bold leading-tight">Dedicated Support</p>
                    <p className="text-slate-400 text-[10px]">Always reliable</p>
                  </div>
                </div>

                {/* Floating bottom-right card */}
                <div className="absolute bottom-6 right-6 bg-white rounded-2xl shadow-xl p-3.5 flex items-center gap-3 max-w-[180px]">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                    <span className="text-lg">⚡</span>
                  </div>
                  <div>
                    <p className="text-slate-800 text-xs font-bold leading-tight">Fast Turnaround</p>
                    <p className="text-slate-400 text-[10px]">Quick execution</p>
                  </div>
                </div>
              </motion.div>

              {/* RIGHT: Content */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col gap-5"
              >
                {sectionLabel && (
                  <p className="text-blue-600 text-xs font-bold tracking-[0.15em] uppercase flex items-center gap-2">
                    <span className="block w-6 h-px bg-blue-500" />
                    {sectionLabel}
                  </p>
                )}

                <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 leading-[1.2] tracking-tight">
                  {sectionTitle}{" "}
                  {sectionHighlight && (
                    <span className="italic text-blue-600">{sectionHighlight}</span>
                  )}
                </h2>

                <div className="flex flex-col gap-3">
                  {sectionBody.map((para, i) => (
                    <p key={i} className="text-slate-600 text-sm leading-relaxed">{para}</p>
                  ))}
                </div>

                {/* Feature cards */}
                {sectionCards && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                    {sectionCards.map((card, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                        className="p-4 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-blue-50 hover:border-blue-100 transition-all"
                      >
                        <span className="text-2xl mb-2 block">{card.icon}</span>
                        <h4 className="text-slate-800 text-sm font-semibold mb-1">{card.title}</h4>
                        <p className="text-slate-500 text-xs leading-relaxed">{card.description}</p>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── BENEFITS SECTION ── */}
        {benefits && benefits.length > 0 && (
          tag === "Industry Focus" ? (
            <section className="py-24 bg-slate-50 relative overflow-hidden">
              <div className="container mx-auto px-6 lg:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
                  
                  {/* Left: Text & Cards */}
                  <div>
                    <div className="mb-10 text-center lg:text-left">
                      <p className="text-blue-600 text-xs font-bold tracking-[0.2em] uppercase mb-3">Why We're Different</p>
                      <h3 className="text-4xl lg:text-5xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
                        Why Top Companies <br className="hidden lg:block"/>
                        <span className="italic font-light">Choose CoVian</span>
                      </h3>
                      <p className="mt-6 text-slate-600 text-lg max-w-lg mx-auto lg:mx-0">
                        We don't just fill positions — we provide strategic talent solutions backed by deep industry expertise and rigorous vetting.
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      {benefits.map((benefit, idx) => (
                        <motion.div 
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.1 }}
                          className="relative bg-white border border-slate-100 rounded-[1.5rem] p-6 lg:p-8 flex items-start gap-6 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:border-blue-100 transition-all duration-500 group overflow-hidden"
                        >
                          {/* Accent Gradient Line on Hover */}
                          <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-sky-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          
                          {/* Icon Box with Glow */}
                          <div className="relative w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-blue-50 group-hover:border-blue-200 transition-colors duration-500 z-10">
                            <div className="absolute inset-0 bg-blue-400 opacity-0 group-hover:opacity-20 blur-md rounded-2xl transition-opacity duration-500" />
                            <CheckCircle2 className="w-6 h-6 text-slate-400 group-hover:text-blue-600 transition-colors duration-500 relative z-10" />
                          </div>
                          
                          {/* Text Content */}
                          <div className="relative z-10 pt-1">
                            <h4 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors duration-300">{benefit.title}</h4>
                            <p className="text-slate-500 leading-relaxed text-sm md:text-base font-light group-hover:text-slate-600 transition-colors duration-300">{benefit.description}</p>
                          </div>

                          {/* Background subtle decoration */}
                          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-gradient-to-br from-blue-50 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Premium Image Collage */}
                  <div className="relative h-full min-h-[500px] lg:min-h-[750px] hidden lg:block w-full">
                    {/* Top Left: Tall */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="absolute left-0 top-0 w-[55%] h-[55%] rounded-[2rem] overflow-hidden shadow-lg z-10"
                    >
                      <Image src={imageUrl} alt="Industry" fill className="object-cover" />
                    </motion.div>
                    
                    {/* Top Right: Square */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.15 }}
                      className="absolute right-0 top-8 w-[40%] aspect-square rounded-[2rem] overflow-hidden shadow-lg z-10"
                    >
                      <Image src={sectionImageUrl} alt="Team" fill className="object-cover" />
                    </motion.div>

                    {/* Bottom: Wide */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="absolute bottom-4 left-0 right-0 h-[40%] rounded-[2rem] overflow-hidden shadow-lg z-0"
                    >
                      <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop" alt="Professionals" fill className="object-cover" />
                    </motion.div>

                    {/* Floating Badge */}
                    <motion.div 
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                      className="absolute bottom-12 right-10 bg-white p-5 lg:p-6 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.15)] flex items-center gap-4 z-20 border border-slate-100"
                    >
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">Industry Leaders Trust Us</h4>
                        <p className="text-xs text-slate-500 mt-0.5">Proven track record</p>
                      </div>
                    </motion.div>
                  </div>

                </div>
              </div>
            </section>
          ) : (
            <section className="py-16 bg-[#0B1628] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-30 pointer-events-none" />
              <div className="container mx-auto px-6 lg:px-10 relative z-10">
                <p className="text-blue-400 text-xs font-bold tracking-widest uppercase text-center mb-2">Why Choose Us</p>
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-white text-center mb-10">Key Benefits</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
                  {benefits.map((benefit, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.08 }}
                      className="p-6 rounded-2xl bg-white/5 border border-white/8 hover:bg-white/8 hover:border-blue-500/20 transition-all backdrop-blur-sm"
                    >
                      <h4 className="text-base font-bold text-blue-400 mb-2">{benefit.title}</h4>
                      <p className="text-slate-300 text-sm leading-relaxed">{benefit.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )
        )}

        {/* ── PROCESS SECTION ── */}
        {process && process.length > 0 && (
          tag === "Industry Focus" ? (
            <section className="py-24 bg-white relative overflow-hidden border-t border-slate-100">
              {/* Premium Light Background Accents */}
              <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[150px] pointer-events-none" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-sky-100/40 rounded-full blur-[150px] pointer-events-none" />

              <div className="container mx-auto px-6 lg:px-10 relative z-10">
                <div className="text-center mb-20">
                  <p className="text-blue-600 text-xs font-bold tracking-[0.2em] uppercase mb-3">Our Methodology</p>
                  <h3 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 tracking-tight">How We Deliver Value</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto">
                  {process.map((step, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                      className="relative p-8 rounded-[2rem] bg-slate-50 border border-slate-100 hover:bg-white hover:border-blue-200 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all duration-500 group overflow-hidden flex flex-col justify-start min-h-[300px]"
                    >
                      {/* Top Accent Gradient Line */}
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Large Background Number */}
                      <div className="absolute -right-6 -bottom-10 text-[150px] font-black text-slate-100 group-hover:text-blue-50 transition-colors duration-500 pointer-events-none select-none tracking-tighter">
                        0{idx + 1}
                      </div>

                      {/* Icon/Step Badge */}
                      <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 font-bold text-xl mb-8 group-hover:scale-110 group-hover:border-blue-200 group-hover:shadow-[0_10px_20px_rgba(59,130,246,0.1)] transition-all duration-500 z-10 relative shadow-sm">
                        {idx + 1}
                      </div>
                      
                      <div className="z-10 relative">
                        <h4 className="text-xl font-heading font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">{step.title}</h4>
                        <p className="text-slate-500 text-sm leading-relaxed font-light">{step.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          ) : (
            <section className="py-24 bg-slate-50 relative overflow-hidden">
              {/* Subtle mesh background */}
              <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50 pointer-events-none" />
              
              <div className="container mx-auto px-6 lg:px-10 relative z-10">
                <div className="text-center mb-20">
                  <p className="text-blue-600 text-xs font-bold tracking-[0.2em] uppercase mb-3 flex items-center justify-center gap-3">
                    <span className="w-8 h-[2px] bg-gradient-to-r from-transparent to-blue-600" /> 
                    How We Work 
                    <span className="w-8 h-[2px] bg-gradient-to-l from-transparent to-blue-600" />
                  </p>
                  <h3 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 tracking-tight">Our Approach</h3>
                </div>
              
              <div className="relative max-w-5xl mx-auto pt-4 pb-12">
                {/* Central Line */}
                <div className="absolute left-[28px] -translate-x-1/2 md:left-1/2 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-100 via-sky-200 to-blue-100 rounded-full" />

                <div className="flex flex-col gap-12 md:gap-0">
                  {process.map((step, idx) => {
                    const isEven = idx % 2 === 0;
                    return (
                      <div key={idx} className="relative flex items-center w-full md:min-h-[220px]">
                        
                        {/* Content Container */}
                        <div className={`w-full flex ${isEven ? 'md:justify-start' : 'md:justify-end'}`}>
                          <motion.div
                            initial={{ opacity: 0, x: isEven ? -40 : 40, y: 20 }}
                            whileInView={{ opacity: 1, x: 0, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className={`w-full md:w-[45%] pl-20 md:pl-0 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}
                          >
                            <div className="p-8 lg:p-10 rounded-[2rem] bg-white border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:border-blue-100 hover:-translate-y-1 transition-all duration-500 group relative overflow-hidden">
                              
                              {/* Hover Accent Line */}
                              <div className={`absolute top-0 ${isEven ? 'right-0 origin-right' : 'left-0 origin-left'} w-full h-1.5 bg-gradient-to-r from-blue-600 to-sky-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out`} />

                              <h4 className="text-xl lg:text-2xl font-heading font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{step.title}</h4>
                              <p className="text-slate-500 text-sm lg:text-base leading-relaxed font-light">{step.description}</p>
                            </div>
                          </motion.div>
                        </div>
                        
                        {/* Center Node / Step Number */}
                        <div className="absolute left-0 top-0 md:left-1/2 md:-translate-x-1/2 md:top-1/2 md:-translate-y-1/2 flex items-center justify-center">
                          <motion.div 
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
                            className="w-14 h-14 rounded-full bg-slate-50 border-[6px] border-white flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.06)] z-10 relative group"
                          >
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-sky-500 flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform shadow-[inset_0_2px_10px_rgba(255,255,255,0.3)]">
                              {idx + 1}
                            </div>
                            {/* Inner Glow */}
                            <div className="absolute inset-0 rounded-full bg-blue-500 blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />
                          </motion.div>
                        </div>
                        
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
          )
        )}

        {/* ── CTA ── */}
        <section className="py-16 bg-gradient-to-br from-blue-700 to-blue-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/mesh-texture.png')] opacity-10 pointer-events-none" />
          <div className="container mx-auto px-6 text-center relative z-10">
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-3">Ready to Get Started?</h3>
            <p className="text-blue-200 text-sm mb-7 max-w-lg mx-auto">Partner with CoVian Advisory to build your future-ready workforce today.</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-blue-700 font-bold text-sm hover:bg-blue-50 transition-all shadow-xl"
            >
              Contact Us Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
