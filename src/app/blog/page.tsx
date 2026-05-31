"use client";
/* eslint-disable */


import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useCMSBlogs } from "@/services/queries";
import { Calendar, User, ArrowRight, Search, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function BlogListingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: blogs, isLoading, isError } = useCMSBlogs();

  // Premium fallbacks in case admin hasn't added CMS blogs yet
  const displayBlogs = (!isError && blogs && blogs.length > 0)
    ? blogs
    : [
        { slug: "future-of-workforce", title: "The Future of Consulting Workforces in 2026", author: "Dr. Sarah Chen", created_at: "2026-10-24T00:00:00Z" },
        { slug: "global-compliance", title: "How to Build a Compliant Global Workforce in 30 Days", author: "Marcus Aurelius", created_at: "2026-10-21T00:00:00Z" },
        { slug: "top-hr-metrics", title: "Top 5 Metrics Every VP of HR Needs on Their Dashboard", author: "Elena Rodriguez", created_at: "2026-10-18T00:00:00Z" },
        { slug: "ai-in-recruitment", title: "Why AI Will Never Fully Replace Human Recruiters", author: "David Chen", created_at: "2026-10-15T00:00:00Z" },
      ];

  const filteredBlogs = displayBlogs.filter(blog => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return blog.title.toLowerCase().includes(q) || (blog.author && blog.author.toLowerCase().includes(q));
  });

  const categories = ["All", "Technology", "Compliance", "Analytics", "Culture"];
  const gradients = [
    "from-blue-500 to-indigo-600",
    "from-emerald-400 to-teal-600",
    "from-rose-400 to-red-600",
    "from-amber-400 to-orange-600",
    "from-purple-500 to-pink-600"
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans selection:bg-blue-600 selection:text-white">
      <Header />
      
      <main className="flex-1 w-full pt-32 pb-24">
        {/* Hero Section */}
        <div className="container mx-auto px-6 mb-16">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-heading font-black tracking-tight text-[#042B6B] mb-6">
              Insights & Intelligence
            </h1>
            <p className="text-xl text-[#2F3440]/70 max-w-2xl mx-auto font-medium leading-relaxed">
              Expert perspectives on the future of work, enterprise recruitment, and global talent acquisition.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white/80 backdrop-blur-xl p-4 rounded-full border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide px-2">
              {categories.map((cat, i) => (
                <button key={i} className={`px-6 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${i === 0 ? "bg-[#042B6B] text-white" : "bg-gray-50 text-gray-600 hover:bg-[#007BFF]/10 hover:text-[#007BFF]"}`}>
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex items-center w-full md:w-auto bg-gray-50 rounded-full px-4 h-12 border border-gray-200 focus-within:border-[#007BFF] focus-within:ring-1 focus-within:ring-[#007BFF] transition-all">
              <Search className="w-5 h-5 text-gray-400" />
              <Input 
                type="text" 
                placeholder="Search articles..." 
                className="bg-transparent border-none focus-visible:ring-0 shadow-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Featured Article */}
        <div className="container mx-auto px-6 mb-20">
          <div className="group relative bg-[#042B6B] rounded-[3rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(4,43,107,0.4)] flex flex-col md:flex-row min-h-[450px] cursor-pointer border border-[#042B6B]/50">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,transparent_0%,#042B6B_100%)] opacity-80 pointer-events-none z-0" />
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#007BFF]/30 via-transparent to-transparent pointer-events-none z-0" />
            
            <div className="w-full md:w-1/2 p-12 lg:p-16 flex flex-col justify-center relative z-10">
              <div className="flex items-center gap-2 mb-8">
                <span className="px-4 py-1.5 bg-[#007BFF]/20 text-[#007BFF] text-[10px] font-black rounded-full uppercase tracking-widest flex items-center gap-1.5 border border-[#007BFF]/30 backdrop-blur-md">
                  <TrendingUp className="w-3.5 h-3.5" /> Featured
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-heading font-black text-white leading-tight mb-6 group-hover:text-[#4DA3FF] transition-colors drop-shadow-md">
                {filteredBlogs[0]?.title || "The Future of Consulting Workforces"}
              </h2>
              <div className="flex items-center gap-4 text-sm font-bold text-[#E8ECEF]/70 mb-10">
                <span suppressHydrationWarning className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-[#007BFF]" /> {new Date(filteredBlogs[0]?.created_at || Date.now()).toLocaleDateString()}</span>
                <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-[#00B388]" /> {filteredBlogs[0]?.author || "Admin"}</span>
              </div>
              <Link href={`/blog/${filteredBlogs[0]?.slug}`}>
                <Button className="bg-gradient-to-r from-[#007BFF] to-[#00B388] text-white hover:opacity-90 rounded-full px-8 h-14 font-bold w-fit transition-all shadow-[0_10px_30px_rgba(0,123,255,0.3)] border border-white/20">
                  Read Article <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className={`w-full md:w-1/2 bg-gradient-to-br ${gradients[0]} relative z-10`}>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="container mx-auto px-6">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-[400px] bg-white rounded-3xl animate-pulse border border-slate-100 shadow-sm"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.slice(1).map((blog, i) => (
                <motion.div
                  key={blog.slug || i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(4,43,107,0.1)] hover:-translate-y-2 transition-all cursor-pointer flex flex-col"
                >
                  <Link href={`/blog/${blog.slug}`} className="flex flex-col h-full">
                    <div className={`w-full h-48 bg-gradient-to-br ${gradients[(i + 1) % gradients.length]} relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                    </div>
                    <div className="p-8 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-4 text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">
                          <span suppressHydrationWarning className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-[#007BFF]" /> {new Date(blog.created_at || Date.now()).toLocaleDateString()}</span>
                          <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-[#00B388]" /> {blog.author || "Admin"}</span>
                        </div>
                        <h3 className="text-xl font-heading font-black text-[#042B6B] mb-4 group-hover:text-[#007BFF] transition-colors leading-snug">
                          {blog.title}
                        </h3>
                      </div>
                      <div className="flex items-center text-[#007BFF] font-bold text-sm group-hover:translate-x-2 transition-transform mt-6 pt-6 border-t border-gray-100">
                        Read Article <ArrowRight className="ml-2 w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
