"use client";
/* eslint-disable */


import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import api from "@/services/api";
import { Eye, EyeOff, ArrowRight, Shield, Lock, Mail, Sparkles } from "lucide-react";

const loginSchema = z.object({
  username: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true);
    try {
      // API expects URL encoded form data for OAuth2 password bearer
      const formData = new URLSearchParams();
      formData.append("username", values.username);
      formData.append("password", values.password);

      const { data } = await api.post("/auth/login", formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      localStorage.setItem("access_token", data.access_token);
      if (data.refresh_token) localStorage.setItem("refresh_token", data.refresh_token);
      
      // The API guide says user is returned, but backend code only returns tokens.
      // We must fetch the user profile explicitly to get the role.
      const userRes = await api.get("/users/me", {
        headers: { Authorization: `Bearer ${data.access_token}` }
      });
      
      const userData = userRes.data;
      localStorage.setItem("user", JSON.stringify(userData));

      toast.success("Login successful!");
      
      // Redirect based on role
      if (userData.role === "SUPER_ADMIN" || userData.role === "ADMIN") {
        router.push("/admin/dashboard");
      } else if (userData.role === "RECRUITER") {
        router.push("/jobs");
      } else {
        router.push("/jobs");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.detail || "Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-[#020B1A]">
      
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] rounded-full bg-[#007BFF]/15 blur-[150px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] rounded-full bg-[#00B388]/10 blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-[40%] right-[30%] w-[400px] h-[400px] rounded-full bg-[#042B6B]/30 blur-[100px] animate-pulse" style={{ animationDelay: "2s" }} />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.04]" 
          style={{ 
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px" 
          }} 
        />
        
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#020B1A_80%)]" />
      </div>

      {/* Left Branding Panel */}
      <div className="hidden lg:flex lg:w-[55%] relative flex-col justify-between p-8 lg:p-10 xl:p-12">
        
        {/* Logo */}
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-[1rem] bg-gradient-to-br from-[#007BFF] to-[#00B388] p-[1.5px] shadow-[0_10px_30px_rgba(0,123,255,0.3)] group-hover:scale-105 transition-all">
              <div className="w-full h-full bg-[#020B1A] rounded-[0.9rem] flex items-center justify-center font-black text-white text-xl">
                CV
              </div>
            </div>
            <span className="font-heading font-black text-3xl tracking-tight text-white drop-shadow-md">
              CoreVita
            </span>
          </Link>
        </div>

        {/* Center Content */}
        <div className="relative z-10 max-w-lg">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#007BFF]/10 border border-[#007BFF]/20 text-[#007BFF] text-[10px] font-black uppercase tracking-widest mb-6 backdrop-blur-md">
            <Sparkles className="w-4 h-4" />
            Enterprise Recruitment Platform
          </div>
          
          <h1 className="text-4xl xl:text-6xl font-heading font-black text-white leading-[1.05] tracking-tight mb-6 drop-shadow-lg">
            Welcome to your <br />
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#007BFF] to-[#00B388]">
              Talent Command Center.
            </span>
          </h1>
          
          <p className="text-base text-white/60 leading-relaxed mb-8 font-medium">
            Access your recruitment dashboard, manage candidates, track pipelines, and drive hiring decisions — all from one powerful platform.
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-col gap-4">
            {[
              { icon: Shield, text: "Enterprise-grade security & SOC 2 compliance" },
              { icon: Lock, text: "End-to-end encrypted data protection" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 text-white/50 bg-white/[0.03] p-3 pr-6 rounded-2xl border border-white/[0.05] w-fit backdrop-blur-sm">
                <div className="w-10 h-10 rounded-[0.8rem] bg-[#007BFF]/10 flex items-center justify-center shrink-0 border border-[#007BFF]/20">
                  <item.icon className="w-5 h-5 text-[#007BFF]" />
                </div>
                <span className="text-sm font-semibold tracking-wide">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="relative z-10">
          <p className="text-sm text-white/25">
            © {new Date().getFullYear()} CoreVita. All rights reserved.
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      </div>

      {/* Right Login Panel */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 relative z-10">
        <div 
          className={`w-full max-w-[440px] bg-white/[0.02] backdrop-blur-3xl border border-white/[0.08] p-8 sm:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-[1rem] bg-gradient-to-br from-[#007BFF] to-[#00B388] p-[1.5px] shadow-[0_10px_30px_rgba(0,123,255,0.3)]">
                <div className="w-full h-full bg-[#020B1A] rounded-[0.9rem] flex items-center justify-center font-black text-white text-xl">
                  CV
                </div>
              </div>
              <span className="font-heading font-black text-3xl tracking-tight text-white drop-shadow-md">
                CoreVita
              </span>
            </Link>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-heading font-black text-white tracking-tight mb-2">
              Sign in to your account
            </h2>
            <p className="text-white/40 text-sm font-medium">
              Enter your credentials to access the admin dashboard.
            </p>
          </div>

          {/* Login Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <label className="block text-sm font-semibold text-white/60 mb-2.5">Email Address</label>
                    <FormControl>
                      <div className={`relative group transition-all duration-300 rounded-[1.2rem] ${focusedField === "email" ? "ring-2 ring-[#007BFF]/40" : ""}`}>
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                          <Mail className={`w-5 h-5 transition-colors duration-300 ${focusedField === "email" ? "text-[#007BFF]" : "text-white/25"}`} />
                        </div>
                        <input 
                          placeholder="name@company.com" 
                          {...field}
                          onFocus={() => setFocusedField("email")}
                          onBlur={(e) => { field.onBlur(); setFocusedField(null); }}
                          className="w-full bg-[#020B1A]/50 hover:bg-[#020B1A]/80 focus:bg-[#020B1A]/80 border border-white/[0.08] focus:border-[#007BFF]/30 rounded-[1.2rem] h-[3.5rem] pl-12 pr-4 text-white placeholder:text-white/20 text-[15px] font-medium outline-none transition-all duration-300"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs mt-1.5 pl-1 font-medium" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between mb-2.5">
                      <label className="block text-sm font-semibold text-white/60">Password</label>
                      <button type="button" className="text-xs font-bold text-[#007BFF] hover:text-[#00B388] transition-colors">
                        Forgot password?
                      </button>
                    </div>
                    <FormControl>
                      <div className={`relative group transition-all duration-300 rounded-[1.2rem] ${focusedField === "password" ? "ring-2 ring-[#007BFF]/40" : ""}`}>
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                          <Lock className={`w-5 h-5 transition-colors duration-300 ${focusedField === "password" ? "text-[#007BFF]" : "text-white/25"}`} />
                        </div>
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          {...field}
                          onFocus={() => setFocusedField("password")}
                          onBlur={(e) => { field.onBlur(); setFocusedField(null); }}
                          className="w-full bg-[#020B1A]/50 hover:bg-[#020B1A]/80 focus:bg-[#020B1A]/80 border border-white/[0.08] focus:border-[#007BFF]/30 rounded-[1.2rem] h-[3.5rem] pl-12 pr-12 text-white placeholder:text-white/20 text-[15px] font-medium outline-none transition-all duration-300"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/70 transition-colors z-10"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs mt-1.5 pl-1 font-medium" />
                  </FormItem>
                )}
              />
              
              {/* Submit Button */}
              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="group relative w-full h-[3.5rem] rounded-[1.2rem] font-bold text-[16px] text-white overflow-hidden transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_10px_30px_rgba(0,123,255,0.3)]"
                >
                  {/* Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#007BFF] to-[#00B388] transition-opacity duration-300" />
                  
                  {/* Hover shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isLoading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Authenticating...
                      </>
                    ) : (
                      <>
                        Sign In
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </span>
                </button>
              </div>
            </form>
          </Form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/10" />
            <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/10" />
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-white/40 text-sm font-medium">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-[#007BFF] hover:text-[#00B388] font-bold transition-colors">
                Create account
              </Link>
            </p>
          </div>

          {/* Bottom Security Note */}
          <div className="mt-10 flex items-center justify-center gap-2 text-white/15 text-xs">
            <Shield className="w-3.5 h-3.5" />
            <span>Protected by 256-bit SSL encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
}
