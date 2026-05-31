"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, User, FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCMSBlogs } from "@/services/queries";

export function BlogSection() {
  const { data: blogs, isLoading, isError } = useCMSBlogs();

  // Fallback to static data if API is empty/fails
  const displayBlogs = (!isError && blogs && blogs.length > 0) 
    ? blogs.slice(0, 3)
    : [
        {
          slug: "future-of-ai-recruitment",
          title: "The Future of AI in Enterprise Recruitment Strategies",
          category: "Technology",
          created_at: "2026-10-24",
          author: "Dr. Sarah Chen",
          image: "bg-gradient-to-br from-[#007BFF] to-[#042B6B]"
        },
        {
          slug: "compliant-global-workforce",
          title: "How to Build a Compliant Global Workforce in 30 Days",
          category: "Compliance",
          created_at: "2026-10-21",
          author: "Marcus Aurelius",
          image: "bg-gradient-to-br from-[#00B388] to-[#042B6B]"
        },
        {
          slug: "hr-metrics-dashboard",
          title: "Top 5 Metrics Every VP of HR Needs on Their Dashboard",
          category: "Analytics",
          created_at: "2026-10-18",
          author: "Elena Rodriguez",
          image: "bg-gradient-to-br from-indigo-500 to-[#042B6B]"
        }
      ];

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateString;
    }
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#00B388]/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00B388]/10 text-[#00B388] text-sm font-bold mb-6 tracking-wide">
              Explore & Learn <ArrowRight className="w-4 h-4" />
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-black text-[#042B6B] mb-4">
              Latest Industry Insights
            </h2>
          </div>
          <Link href="/blog">
            <Button className="bg-[#042B6B] hover:bg-[#007BFF] text-white rounded-full px-8 h-12 shadow-[0_10px_30px_rgba(4,43,107,0.2)] font-bold transition-all hover:pr-6 group">
              View All Articles <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 bg-slate-50 rounded-3xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayBlogs.map((blog, i) => (
              <Link key={blog.id || i} href={`/blog/${blog.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,123,255,0.15)] hover:-translate-y-2 transition-all cursor-pointer flex flex-col h-full"
                >
                  <div className={`w-full h-48 ${blog.image || 'bg-gradient-to-br from-slate-200 to-slate-300'} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#042B6B]/80 to-transparent opacity-80" />
                    
                    {/* Placeholder icon if no real image */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:scale-110 transition-transform duration-700">
                      <FileText className="w-24 h-24 text-white" />
                    </div>

                    <span className="absolute bottom-4 left-6 px-3 py-1 bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                      {blog.category || "Insight"}
                    </span>
                  </div>
                  <div className="p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-4 text-xs font-bold text-slate-400 mb-4">
                        <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-[#007BFF]" /> {formatDate(blog.created_at)}</span>
                        <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-[#00B388]" /> {blog.author}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-[#042B6B] mb-4 group-hover:text-[#007BFF] transition-colors leading-snug line-clamp-3">
                        {blog.title}
                      </h3>
                    </div>
                    <div className="flex items-center text-[#007BFF] font-bold text-sm group-hover:translate-x-2 transition-transform mt-6 pt-6 border-t border-gray-100">
                      Read Full Article <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
