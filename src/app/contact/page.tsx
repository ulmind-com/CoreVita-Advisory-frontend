"use client";
/* eslint-disable */


import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Mail, Phone, MapPin, MessageSquare, ArrowRight, CheckCircle2 } from "lucide-react";

import { useForm as useHookForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateCRMLead } from "@/services/queries";
import { useState } from "react";

const formSchema = z.object({
  company_name: z.string().min(2, "Company name is required"),
  contact_name: z.string().min(2, "Full name is required"),
  contact_email: z.string().email("Invalid email address"),
  contact_phone: z.string().min(5, "Phone number is required"),
  message: z.string().optional()
});

export default function ContactPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const { mutateAsync: createLead, isPending } = useCreateCRMLead();
  
  const form = useHookForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company_name: "",
      contact_name: "",
      contact_email: "",
      contact_phone: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Map contact form submission directly into a CRM Lead!
      await createLead({
        company_name: values.company_name,
        contact_name: values.contact_name,
        contact_email: values.contact_email,
        contact_phone: values.contact_phone,
        status: "NEW"
      });
      setIsSuccess(true);
      form.reset();
    } catch (error) {
      console.error("Failed to submit inquiry", error);
    }
  }

  const channels = [
    { icon: Phone, title: "Sales Inquiries", text: "+1 (888) 123-4567", subtext: "Mon-Fri, 9am-6pm EST" },
    { icon: Mail, title: "Global Support", text: "support@corevita.com", subtext: "24/7 dedicated support" },
    { icon: MessageSquare, title: "Live Chat", text: "Available on platform", subtext: "For active enterprise clients" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans selection:bg-blue-600 selection:text-white">
      <Header />
      
      <main className="flex-1 w-full pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-6xl">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-5xl md:text-6xl font-heading font-black tracking-tight text-[#042B6B] mb-6 drop-shadow-sm">
              Get in Touch
            </h1>
            <p className="text-xl text-[#2F3440]/80 font-medium leading-relaxed">
              Whether you're looking to scale your engineering team or need enterprise workforce management, our experts are here to help.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-16 bg-white/80 backdrop-blur-xl rounded-[3rem] p-8 md:p-16 shadow-[0_20px_50px_rgba(4,43,107,0.1)] border border-gray-100 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#007BFF]/10 via-transparent to-transparent pointer-events-none z-0" />

            {/* Left side: Contact Form */}
            <div className="w-full lg:w-1/2 relative z-10">
              <h2 className="text-3xl font-heading font-black text-[#042B6B] mb-8">Send an Inquiry</h2>
              
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#00B388]/10 border border-[#00B388]/20 rounded-3xl p-8 text-center h-full flex flex-col items-center justify-center backdrop-blur-sm"
                >
                  <div className="w-20 h-20 bg-white text-[#00B388] rounded-full flex items-center justify-center mb-6 shadow-md border border-[#00B388]/20">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#042B6B] mb-4">Request Received!</h3>
                  <p className="text-[#2F3440]/80 font-medium mb-8">Thank you for reaching out. A dedicated account executive will contact you within 24 hours.</p>
                  <Button variant="outline" onClick={() => setIsSuccess(false)} className="rounded-full border-[#00B388] text-[#00B388] hover:bg-[#00B388] hover:text-white transition-colors">
                    Send another inquiry
                  </Button>
                </motion.div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="contact_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-semibold">Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" className="h-12 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-blue-600" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="company_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-semibold">Company</FormLabel>
                            <FormControl>
                              <Input placeholder="Acme Corp" className="h-12 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-blue-600" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="contact_email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 font-semibold">Work Email</FormLabel>
                          <FormControl>
                            <Input placeholder="john@acme.com" className="h-12 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-blue-600" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contact_phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 font-semibold">Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+1 (555) 000-0000" className="h-12 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-blue-600" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" disabled={isPending} className="w-full h-14 rounded-xl bg-gradient-to-r from-[#007BFF] to-[#00B388] hover:opacity-90 text-white font-bold text-lg shadow-[0_10px_30px_rgba(0,123,255,0.3)] transition-all">
                      {isPending ? "Sending..." : "Submit Inquiry"} <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </form>
                </Form>
              )}
            </div>

            {/* Right side: Contact Info */}
            <div className="w-full lg:w-1/2 space-y-10 relative z-10 lg:pl-10 lg:border-l border-gray-100">
              {channels.map((channel, i) => (
                <div key={i} className="flex gap-6 group cursor-pointer">
                  <div className="w-14 h-14 rounded-2xl bg-[#007BFF]/10 text-[#007BFF] flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-[#007BFF] group-hover:text-white transition-all shadow-sm border border-[#007BFF]/20">
                    <channel.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#042B6B] mb-1 group-hover:text-[#007BFF] transition-colors">{channel.title}</h4>
                    <p className="text-[#007BFF] font-semibold mb-1">{channel.text}</p>
                    <p className="text-sm text-[#2F3440]/60 font-medium">{channel.subtext}</p>
                  </div>
                </div>
              ))}

              <div className="pt-8 border-t border-gray-100">
                <h4 className="text-lg font-bold text-[#042B6B] mb-4">Global Headquarters</h4>
                <div className="flex gap-4">
                  <MapPin className="w-6 h-6 text-[#00B388] mt-1 flex-shrink-0" />
                  <p className="text-[#2F3440]/80 font-medium leading-relaxed">
                    100 Market St, Suite 400<br/>
                    San Francisco, CA 94103<br/>
                    United States
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
