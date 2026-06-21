"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, Send, User, Briefcase, Building, ChevronDown, MessageSquare, Loader2 } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Lottie from "lottie-react";
import successAnimation from "../../../public/Lottie/Verified Icon Animation.json";

// We use the same hardcoded BASE_URL as admin-api.ts for simplicity
const isProd = process.env.NODE_ENV === "production";
const BASE_URL = isProd ? "https://project-for-prem-backend.onrender.com/api/v1" : "http://localhost:8000/api/v1";

export function ContactContent() {
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    company: "",
    email: "",
    phone: "",
    service_interest: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      // Concatenate designation into the message since the backend schema doesn't have a designation field
      const fullMessage = `[Designation: ${formData.designation}]\n\n${formData.message}`;
      
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        service_interest: formData.service_interest,
        message: fullMessage
      };

      const res = await fetch(`${BASE_URL}/content/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error("Failed to submit enquiry");
      }

      setIsSuccess(true);
    } catch (err) {
      setErrorMsg("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#061124] selection:bg-sky-500 selection:text-white">
      <Header />

      <main className="flex-1 w-full pt-32 pb-24 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] bg-sky-500/10 rounded-full blur-[120px]" />
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
        </div>

        <div className="container mx-auto px-6 relative z-10 max-w-7xl">
          
          {/* Header */}
          <div className="text-center mb-16 lg:mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 backdrop-blur-md mb-6"
            >
              <div className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              <span className="text-sky-300 text-xs font-bold tracking-[0.2em] uppercase">
                Contact Us
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl lg:text-5xl font-heading font-black text-white tracking-tight leading-[1.15] mb-6"
            >
              Let's Build Your <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">
                Workforce Together
              </span>
            </motion.h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            
            {/* ── LEFT: CONTACT INFORMATION ── */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="lg:col-span-5 flex flex-col gap-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Get in Touch</h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                  Whether you're looking for top talent or exploring workforce solutions, our team at CoVian Advisory is ready to assist you.
                </p>
              </div>

              {/* Info Cards */}
              <div className="flex flex-col gap-5">
                {/* Phone */}
                <a href="tel:+919876543210" className="group p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-sky-500/30 transition-all backdrop-blur-md flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-sky-500/10 flex items-center justify-center shrink-0 group-hover:bg-sky-500 group-hover:text-white text-sky-400 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Call / WhatsApp</p>
                    <p className="text-lg font-semibold text-white group-hover:text-sky-300 transition-colors">+91 98765 43210</p>
                  </div>
                </a>

                {/* Email */}
                <a href="mailto:contact@covianadvisory.com" className="group p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-sky-500/30 transition-all backdrop-blur-md flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-sky-500/10 flex items-center justify-center shrink-0 group-hover:bg-sky-500 group-hover:text-white text-sky-400 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Mail Us</p>
                    <p className="text-lg font-semibold text-white group-hover:text-sky-300 transition-colors">contact@covianadvisory.com</p>
                  </div>
                </a>

                {/* Address */}
                <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-sky-500/10 flex items-center justify-center shrink-0 text-sky-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Office Address</p>
                    <p className="text-base font-medium text-white leading-relaxed">
                      CoVian Advisory Pvt Ltd<br />
                      House No 03, Gokul Dham Construction,<br />
                      Chira Chas, Bokaro Steel City,<br />
                      Jharkhand, 827013
                    </p>
                  </div>
                </div>
              </div>

              {/* Map embedded */}
              <div className="h-[200px] w-full rounded-3xl overflow-hidden border border-white/10 mt-2 relative">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14631.115865201103!2d86.1384024!3d23.630045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f423ab6306ddb3%3A0xc3f606db97dcbc19!2sChira%20Chas%2C%20Bokaro%20Steel%20City%2C%20Jharkhand!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, filter: "grayscale(1) contrast(1.2) opacity(0.8)" }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="CoVian Advisory Location"
                ></iframe>
              </div>
            </motion.div>

            {/* ── RIGHT: GLASSMORPHISM FORM ── */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="lg:col-span-7"
            >
              <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-[0_0_50px_rgba(14,165,233,0.05)] relative overflow-hidden min-h-[600px] flex flex-col justify-center">
                {/* Internal Glow for glassmorphism */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-sky-400 to-blue-600" />
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-sky-500/20 rounded-full blur-[80px] pointer-events-none" />

                <AnimatePresence mode="wait">
                  {!isSuccess ? (
                    <motion.div 
                      key="form"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                      transition={{ duration: 0.3 }}
                      className="w-full relative z-10"
                    >
                      <h2 className="text-3xl font-bold text-white mb-2">Send a Message</h2>
                      <p className="text-slate-400 text-sm mb-10">Fill out the form below and our team will get back to you shortly.</p>

                      {errorMsg && (
                        <div className="p-4 mb-6 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium">
                          {errorMsg}
                        </div>
                      )}

                      <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Grid for Name & Designation */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-sky-200 uppercase tracking-wider ml-1">Full Name *</label>
                            <div className="relative">
                              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                              <input 
                                type="text" 
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="John Doe"
                                className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-400 focus:bg-sky-400/5 transition-all"
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-sky-200 uppercase tracking-wider ml-1">Designation *</label>
                            <div className="relative">
                              <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                              <input 
                                type="text" 
                                name="designation"
                                value={formData.designation}
                                onChange={handleChange}
                                required
                                placeholder="HR Manager"
                                className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-400 focus:bg-sky-400/5 transition-all"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Grid for Company & Email */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-sky-200 uppercase tracking-wider ml-1">Company Name *</label>
                            <div className="relative">
                              <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                              <input 
                                type="text" 
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                required
                                placeholder="Acme Corp"
                                className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-400 focus:bg-sky-400/5 transition-all"
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-sky-200 uppercase tracking-wider ml-1">Email Address *</label>
                            <div className="relative">
                              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                              <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="john@acmecorp.com"
                                className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-400 focus:bg-sky-400/5 transition-all"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Phone & Service */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-sky-200 uppercase tracking-wider ml-1">Phone Number *</label>
                            <div className="relative">
                              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                              <input 
                                type="tel" 
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                placeholder="+91 90000 00000"
                                className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-400 focus:bg-sky-400/5 transition-all"
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-sky-200 uppercase tracking-wider ml-1">Service Required *</label>
                            <div className="relative">
                              <select 
                                name="service_interest"
                                value={formData.service_interest}
                                onChange={handleChange}
                                required
                                className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-4 pr-12 text-white appearance-none focus:outline-none focus:border-sky-400 focus:bg-sky-400/5 transition-all cursor-pointer"
                              >
                                <option value="" disabled className="text-slate-800">Select a service</option>
                                <option value="Permanent Hiring" className="text-slate-800">Permanent Hiring</option>
                                <option value="Temporary / Contract Staffing" className="text-slate-800">Temporary / Contract Staffing</option>
                                <option value="Executive Search" className="text-slate-800">Executive Search</option>
                                <option value="Business Advisory" className="text-slate-800">Business Advisory</option>
                                <option value="Other Services" className="text-slate-800">Other Services</option>
                              </select>
                              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                            </div>
                          </div>
                        </div>

                        {/* Message */}
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-sky-200 uppercase tracking-wider ml-1">Message</label>
                          <div className="relative">
                            <MessageSquare className="absolute left-4 top-5 w-5 h-5 text-slate-400" />
                            <textarea 
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              rows={4}
                              placeholder="How can we help you?"
                              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-400 focus:bg-sky-400/5 transition-all resize-none"
                            ></textarea>
                          </div>
                        </div>

                        {/* Submit Button */}
                        <button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="w-full h-14 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(14,165,233,0.4)] transition-all flex items-center justify-center gap-2 group mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <Loader2 className="w-6 h-6 animate-spin" />
                          ) : (
                            <>
                              Submit Inquiry 
                              <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </>
                          )}
                        </button>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", damping: 20, stiffness: 100 }}
                      className="w-full h-full flex flex-col items-center justify-center text-center relative z-10"
                    >
                      <div className="w-64 h-64 mb-8">
                        <Lottie animationData={successAnimation} loop={false} />
                      </div>
                      <h2 className="text-3xl font-black text-white mb-4">Request Sent Successfully!</h2>
                      <p className="text-sky-200/80 text-lg max-w-sm mx-auto leading-relaxed">
                        Thank you for reaching out, {formData.name.split(" ")[0]}. Our team will review your details and get back to you shortly.
                      </p>
                      
                      <button 
                        onClick={() => {
                          setFormData({ name: "", designation: "", company: "", email: "", phone: "", service_interest: "", message: "" });
                          setIsSuccess(false);
                        }}
                        className="mt-10 px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white font-semibold transition-all"
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
