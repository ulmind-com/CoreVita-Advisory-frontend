/* eslint-disable */
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { notFound } from "next/navigation";
import { Calendar, User, ArrowLeft, Clock, Share2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Since it's a dynamic server component, we fetch data on the server
async function getBlogData(slug: string) {
  try {
    const res = await fetch(`https://project-for-prem-backend.onrender.com/api/v1/cms/blogs/${slug}`, {
      next: { revalidate: 60 }
    });
    
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error("Failed to fetch blog");
    }
    
    return await res.json();
  } catch (error) {
    // Premium fallback for demonstration if API fails or admin hasn't created the blog
    const mockBlogs: Record<string, any> = {
      "future-of-workforce": {
        title: "The Future of Consulting Workforces in 2026",
        content: `
          <p>The global workforce is undergoing a massive transformation. As artificial intelligence becomes ubiquitous, the role of the human consultant is shifting from data processing to strategic empathy and high-level problem-solving.</p>
          <h2>The Rise of the Hybrid Professional</h2>
          <p>We are seeing an unprecedented demand for professionals who can blend technical acumen with emotional intelligence. This new breed of "hybrid professional" is becoming the gold standard in enterprise consulting.</p>
          <blockquote>"The companies that will win the next decade are those that treat talent acquisition as their primary strategic advantage."</blockquote>
          <h3>Key Takeaways</h3>
          <ul>
            <li>AI is augmenting, not replacing, strategic roles.</li>
            <li>Global compliance is the new battlefield for talent.</li>
            <li>Employee retention is heavily tied to purpose-driven work.</li>
          </ul>
        `,
        author: "Dr. Sarah Chen",
        created_at: "2026-10-24T00:00:00Z"
      }
    };
    
    return mockBlogs[slug] || null;
  }
}

export default async function BlogDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const blog = await getBlogData(resolvedParams.slug);

  if (!blog) {
    notFound();
  }

  // Calculate rough reading time
  const wordCount = blog.content ? blog.content.replace(/<[^>]*>?/gm, '').split(/\s+/).length : 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans selection:bg-blue-600 selection:text-white">
      <Header />
      
      <main className="flex-1 w-full pt-32 pb-24">
        
        {/* Article Header */}
        <div className="container mx-auto px-6 max-w-4xl mb-12">
          <Link href="/blog" className="inline-flex items-center text-[#007BFF] font-bold text-sm hover:text-[#042B6B] transition-colors mb-8 group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to all articles
          </Link>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight text-[#042B6B] leading-[1.1] mb-8">
            {blog.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-between gap-6 border-b border-gray-200 pb-8">
            <div className="flex items-center gap-6 text-sm font-semibold text-[#2F3440]/70">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#007BFF] to-[#00B388] p-[2px]">
                  <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-[#042B6B] font-bold">
                    {blog.author ? blog.author.charAt(0) : "A"}
                  </div>
                </div>
                <div>
                  <div className="text-[#042B6B] font-bold">{blog.author || "Admin"}</div>
                  <div className="text-xs font-medium uppercase tracking-wider text-[#007BFF]">Author</div>
                </div>
              </div>
              <div className="w-px h-8 bg-gray-200"></div>
              <span suppressHydrationWarning className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-[#007BFF]" /> {new Date(blog.created_at || Date.now()).toLocaleDateString()}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-[#00B388]" /> {readingTime} min read</span>
            </div>

            <Button variant="outline" size="sm" className="rounded-full shadow-sm">
              <Share2 className="w-4 h-4 mr-2" /> Share Article
            </Button>
          </div>
        </div>

        {/* Hero Image Placeholder */}
        <div className="container mx-auto px-6 max-w-5xl mb-16">
          <div className="w-full aspect-[21/9] rounded-[2rem] bg-gradient-to-br from-[#007BFF] to-[#042B6B] shadow-[0_20px_50px_rgba(4,43,107,0.2)] relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 max-w-3xl">
          <div 
            className="prose prose-lg prose-slate prose-headings:font-heading prose-headings:font-black prose-headings:text-[#042B6B] prose-a:text-[#007BFF] hover:prose-a:text-[#00B388] prose-a:transition-colors prose-blockquote:border-l-[#00B388] prose-blockquote:bg-[#00B388]/5 prose-blockquote:p-6 prose-blockquote:rounded-r-2xl prose-blockquote:not-italic prose-blockquote:text-[#042B6B] prose-blockquote:font-semibold max-w-none prose-p:text-[#2F3440]/80 prose-p:font-medium leading-relaxed"
            dangerouslySetInnerHTML={{ __html: blog.content || "<p>No content provided.</p>" }}
          />

          <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <span className="font-bold text-[#0b1b3d]">Share this article:</span>
              <div className="flex gap-2">
                {['Twitter', 'LinkedIn', 'Facebook'].map(network => (
                  <Button key={network} variant="outline" size="sm" className="rounded-full text-slate-500 hover:text-blue-600">
                    {network}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
