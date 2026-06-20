"use client";
/* eslint-disable */

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, BarChart3, Newspaper, Users, Star,
  Building2, MessageSquare, HeartHandshake, Briefcase,
  FileText, UserCog, LogOut, Menu, X, Bell, ChevronRight,
} from "lucide-react";
import { PageLoader } from "@/components/ui/PageLoader";
import { GlobalLottie } from "@/components/ui/GlobalLottie";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: string[];
  badge?: string;
}

const navItems: NavItem[] = [
  { title: "Dashboard",          href: "/admin/dashboard",           icon: LayoutDashboard, roles: ["SUPER_ADMIN", "ADMIN", "EDITOR"] },
  { title: "Analytics",          href: "/admin/analytics",           icon: BarChart3,       roles: ["SUPER_ADMIN", "ADMIN"] },
  { title: "News",               href: "/admin/news",                icon: Newspaper,       roles: ["SUPER_ADMIN", "ADMIN", "EDITOR"] },
  { title: "Core Team",          href: "/admin/team",                icon: Users,           roles: ["SUPER_ADMIN", "ADMIN"] },
  { title: "Testimonials",       href: "/admin/testimonials",        icon: Star,            roles: ["SUPER_ADMIN", "ADMIN"] },
  { title: "Client Logos",       href: "/admin/logos",               icon: Building2,       roles: ["SUPER_ADMIN", "ADMIN"] },
  { title: "Enquiries",          href: "/admin/enquiries",           icon: MessageSquare,   roles: ["SUPER_ADMIN", "ADMIN"] },
  { title: "Caregiver Enquiries",href: "/admin/caregiver-enquiries", icon: HeartHandshake,  roles: ["SUPER_ADMIN", "ADMIN"] },
  { title: "Jobs",               href: "/admin/jobs",                icon: Briefcase,       roles: ["SUPER_ADMIN", "ADMIN", "EDITOR"] },
  { title: "Applications",       href: "/admin/applications",        icon: FileText,        roles: ["SUPER_ADMIN", "ADMIN"] },
  { title: "Manage Admins",      href: "/admin/admins",              icon: UserCog,         roles: ["SUPER_ADMIN"] },
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
    const t = setTimeout(() => setIsNavigating(false), 400);
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
    <div className="flex flex-col h-full overflow-hidden relative" style={{
      background: "linear-gradient(160deg, #050e1f 0%, #081428 50%, #040d1a 100%)",
      borderRight: "1px solid rgba(255,255,255,0.06)"
    }}>
      {/* Glass Orb Decorations */}
      <div className="absolute top-0 left-0 w-48 h-48 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)" }} />

      {/* Logo */}
      <div className="px-6 py-7 relative z-10 border-b border-white/5">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-lg"
            style={{ background: "linear-gradient(135deg, #2563eb, #059669)" }}>
            CV
          </div>
          <div>
            <span className="font-black text-lg text-white tracking-tight">Covian</span>
            <span className="block text-[9px] text-blue-400/80 font-semibold uppercase tracking-widest -mt-0.5">Admin Panel</span>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <div className="flex-1 py-4 px-3 overflow-y-auto relative z-10" style={{ scrollbarWidth: "none" }}>
        <p className="text-[9px] font-black text-white/25 uppercase tracking-[0.25em] mb-3 px-3">Navigation</p>
        <div className="space-y-0.5">
          {filteredNavItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                <motion.div
                  whileHover={{ x: 3 }}
                  className={`group flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "text-white"
                      : "text-white/50 hover:text-white/80 hover:bg-white/5"
                  }`}
                  style={isActive ? {
                    background: "linear-gradient(135deg, rgba(37,99,235,0.25), rgba(5,150,105,0.15))",
                    border: "1px solid rgba(37,99,235,0.3)",
                    backdropFilter: "blur(10px)",
                  } : {}}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                      isActive ? "bg-blue-600/30" : "bg-white/5 group-hover:bg-white/10"
                    }`}>
                      <item.icon className={`h-4 w-4 transition-colors ${isActive ? "text-blue-400" : "text-white/40 group-hover:text-white/70"}`} />
                    </div>
                    <span className={`text-[13px] font-semibold tracking-wide ${isActive ? "font-bold text-white" : ""}`}>{item.title}</span>
                  </div>
                  {isActive && (
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_6px_rgba(96,165,250,0.8)]" />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* User + Logout */}
      <div className="p-4 relative z-10 border-t border-white/5">
        <div className="flex items-center gap-3 p-3 rounded-xl mb-3" style={{ background: "rgba(255,255,255,0.04)" }}>
          <div className="w-9 h-9 rounded-full flex items-center justify-center font-black text-sm text-white shadow-md shrink-0"
            style={{ background: "linear-gradient(135deg, #2563eb, #059669)" }}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-white truncate">{user.name}</p>
            <p className="text-[10px] text-blue-400 font-semibold uppercase tracking-wider truncate">
              {user.role.replace("_", " ")}
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-white/50 hover:text-red-400 text-xs font-bold uppercase tracking-wider transition-all duration-200 hover:bg-red-500/10 border border-transparent hover:border-red-500/20"
        >
          <LogOut className="h-3.5 w-3.5" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-[#F0F4F8] font-sans text-[#1e293b] selection:bg-blue-600 selection:text-white">
      <GlobalLottie />
      {/* Subtle background gradient */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-30" style={{ background: "radial-gradient(circle, rgba(219,234,254,0.6) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-20" style={{ background: "radial-gradient(circle, rgba(209,250,229,0.6) 0%, transparent 70%)" }} />
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-[260px] flex-col fixed inset-y-0 z-20 shadow-2xl">
        <Sidebar />
      </aside>

      <main className="flex-1 flex flex-col lg:pl-[260px] overflow-hidden relative z-10">
        {/* Top Header */}
        <header className="h-16 flex items-center justify-between px-6 lg:px-8 sticky top-0 z-20 border-b"
          style={{ background: "rgba(240,244,248,0.85)", backdropFilter: "blur(20px)", borderColor: "rgba(203,213,225,0.5)" }}>
          {/* Mobile: Menu button */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
            >
              <Menu className="h-4 w-4" />
            </button>
            <span className="font-black text-lg text-slate-800 tracking-tight">Covian</span>
          </div>

          {/* Desktop: Page title / breadcrumb area */}
          <div className="hidden lg:flex items-center gap-2 text-sm text-slate-500">
            <span className="font-semibold text-slate-400">Admin</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="font-bold text-slate-700 capitalize">
              {pathname.split("/admin/")[1]?.split("/")[0]?.replace("-", " ") || "Dashboard"}
            </span>
          </div>

          {/* Right: Notif + link to site */}
          <div className="flex items-center gap-3">
            <Link href="/" target="_blank" className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
              View Site →
            </Link>
            <button className="relative p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 border border-white" />
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 lg:p-8 relative" style={{ scrollbarWidth: "thin", scrollbarColor: "#cbd5e1 transparent" }}>
          <div className="max-w-[1600px] mx-auto">
            {isNavigating ? (
                <PageLoader />
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                {children}
              </motion.div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 250 }}
              className="fixed top-0 left-0 bottom-0 w-[260px] z-50 lg:hidden shadow-2xl"
            >
              <div className="absolute top-4 right-4 z-50">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <Sidebar />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
