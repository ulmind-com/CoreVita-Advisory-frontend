"use client";
/* eslint-disable */

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, Users, Building2, Briefcase, 
  FileText, CreditCard, LogOut, Menu, X, Settings, Bell, Search
} from "lucide-react";
import { Loader } from "@/components/ui/Loader";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: string[];
}

const navItems: NavItem[] = [
  { title: "Dashboard Overview", href: "/admin/dashboard", icon: LayoutDashboard, roles: ["SUPER_ADMIN", "ADMIN"] },
  { title: "Job Sourcing", href: "/admin/jobs", icon: Briefcase, roles: ["SUPER_ADMIN", "ADMIN", "RECRUITER", "CLIENT"] },
  { title: "Candidates CRM", href: "/admin/candidates", icon: Users, roles: ["SUPER_ADMIN", "ADMIN", "RECRUITER", "CLIENT"] },
  { title: "Company Profiles", href: "/admin/companies", icon: Building2, roles: ["SUPER_ADMIN", "ADMIN", "RECRUITER"] },
  { title: "Sales Leads", href: "/admin/crm", icon: FileText, roles: ["SUPER_ADMIN", "ADMIN"] },
  { title: "Billing & Revenue", href: "/admin/billing", icon: CreditCard, roles: ["SUPER_ADMIN", "ADMIN", "CLIENT"] },
  { title: "User Management", href: "/admin/users", icon: Users, roles: ["SUPER_ADMIN", "ADMIN"] },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    setIsNavigating(true);
    const t = setTimeout(() => setIsNavigating(false), 500);
    return () => clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      router.push("/login");
      return;
    }
    setUser(JSON.parse(userStr));
    setMounted(true);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (!mounted || !user) return null;

  const filteredNavItems = navItems.filter((item) => item.roles.includes(user.role));

  const Sidebar = () => (
    <div className="flex flex-col h-full bg-[#020B1A] text-white overflow-hidden relative shadow-2xl border-r border-white/5">
      {/* Decorative Orbs inside Sidebar */}
      <div className="absolute top-0 left-0 w-full h-64 bg-[#007BFF]/10 blur-[60px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#00B388]/10 blur-[60px] rounded-full pointer-events-none" />

      <div className="p-8 relative z-10 border-b border-white/5">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#007BFF] to-[#00B388] flex items-center justify-center font-black text-xl shadow-lg shadow-[#007BFF]/30">
            CV
          </div>
          <span className="font-heading font-black text-2xl tracking-tight text-white drop-shadow-sm">
            CoreVita
          </span>
        </Link>
      </div>
      
      <div className="flex-1 py-6 px-4 space-y-2 overflow-y-auto relative z-10 custom-scrollbar">
        <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-4 px-4">
          Main Menu
        </div>
        {filteredNavItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
              <motion.div 
                whileHover={{ x: 4 }}
                className={`group flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? "bg-white/10 backdrop-blur-md text-white border border-white/10 shadow-lg shadow-black/20" 
                    : "text-white/60 hover:bg-white/5 hover:text-white border border-transparent"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`transition-colors ${isActive ? "text-[#00B388]" : "text-white/40 group-hover:text-white"}`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span className={`font-semibold text-[14px] tracking-wide ${isActive ? "font-bold" : ""}`}>{item.title}</span>
                </div>
                {isActive && (
                  <motion.div layoutId="active-indicator" className="w-1.5 h-1.5 rounded-full bg-[#00B388] shadow-[0_0_8px_#00B388]" />
                )}
              </motion.div>
            </Link>
          );
        })}
      </div>
      
      <div className="p-6 relative z-10 border-t border-white/5 bg-black/20 backdrop-blur-xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#007BFF] to-[#00B388] flex items-center justify-center font-black text-lg shadow-md border border-white/10">
            {user.name.charAt(0)}
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-bold text-white truncate">{user.name}</span>
            <span className="text-[10px] font-bold text-[#00B388] truncate uppercase tracking-wider mt-0.5">{user.role.replace('_', ' ')}</span>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 hover:bg-red-500/20 text-white/70 hover:text-red-400 font-bold text-xs uppercase tracking-wider transition-all duration-300 border border-white/5 hover:border-red-500/30 group"
        >
          <LogOut className="h-4 w-4 group-hover:scale-110 transition-transform" />
          Secure Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-[#F4F7F9] font-sans text-[#2F3440] selection:bg-[#007BFF] selection:text-white">
      {/* Decorative Background for Main Body */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-[#007BFF]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-[#00B388]/5 blur-[120px] rounded-full" />
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-[280px] flex-col fixed inset-y-0 z-20">
        {Sidebar()}
      </aside>
      
      <main className="flex-1 flex flex-col lg:pl-[280px] overflow-hidden relative z-10">
        {/* Top Navbar - Glassmorphic */}
        <header className="h-20 flex items-center justify-between px-6 lg:px-10 bg-white/70 backdrop-blur-2xl shadow-sm sticky top-0 z-20 border-b border-white/50">
          <div className="flex items-center gap-4 lg:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2.5 rounded-xl bg-white shadow-sm border border-gray-100 text-[#042B6B] hover:bg-gray-50 transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
            <span className="font-black text-xl text-[#042B6B] tracking-tight">CoreVita</span>
          </div>

          <div className="hidden lg:flex items-center bg-white border border-gray-200/60 focus-within:border-[#007BFF]/50 focus-within:shadow-[0_0_15px_rgba(0,123,255,0.1)] rounded-xl px-5 py-2.5 w-[400px] transition-all duration-300">
            <Search className="w-4 h-4 text-gray-400 mr-3" />
            <input 
              type="text" 
              placeholder="Search across platform..." 
              className="bg-transparent border-none outline-none text-sm font-medium text-[#2F3440] w-full placeholder:text-gray-400"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2.5 rounded-xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all text-[#042B6B] group">
              <Bell className="w-5 h-5 group-hover:text-[#007BFF] transition-colors" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#00B388] border-2 border-white shadow-sm" />
            </button>
            <button className="p-2.5 rounded-xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all text-[#042B6B] group">
              <Settings className="w-5 h-5 group-hover:text-[#007BFF] transition-colors" />
            </button>
          </div>
        </header>
        
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10 relative custom-scrollbar">
          <div className="max-w-[1600px] mx-auto h-full relative z-0">
            {isNavigating ? (
              <div className="h-[600px] flex items-center justify-center">
                <Loader message="Loading dashboard module..." />
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {children}
              </motion.div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#020B1A]/80 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[280px] z-50 lg:hidden flex flex-col shadow-2xl border-r border-white/10"
            >
              <div className="absolute top-4 right-4 z-50">
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors backdrop-blur-md border border-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {Sidebar()}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
