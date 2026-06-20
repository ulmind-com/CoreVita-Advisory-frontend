"use client";
/* eslint-disable */

import { useEffect, useState } from "react";
import { PageLoader } from "@/components/ui/PageLoader";
import { motion } from "framer-motion";
import {
  MessageSquare, HeartHandshake, FileText, Briefcase,
  Newspaper, Users, Star, Building2, UserCog, TrendingUp,
  ArrowUpRight, Clock, CheckCircle2, AlertCircle, Plus,
} from "lucide-react";
import Link from "next/link";
import { getDashboardKPIs } from "@/services/admin-api";

const card = "bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200";

function StatCard({ title, value, icon: Icon, color, bg, href, subtitle }: any) {
  return (
    <Link href={href || "#"}>
      <motion.div
        whileHover={{ y: -2, scale: 1.01 }}
        className={`${card} p-6 cursor-pointer group relative overflow-hidden`}
      >
        <div className={`absolute -right-4 -top-4 w-20 h-20 rounded-full opacity-20 group-hover:opacity-40 transition-opacity ${bg}`} />
        <div className="flex items-start justify-between relative z-10">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${bg} ${color} border border-current/10 mb-4`}>
            <Icon className="w-5 h-5" />
          </div>
          <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
        </div>
        <p className="text-3xl font-black text-slate-800 relative z-10">{value ?? "—"}</p>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1 relative z-10">{title}</p>
        {subtitle && <p className="text-[11px] text-slate-400 mt-0.5 relative z-10">{subtitle}</p>}
      </motion.div>
    </Link>
  );
}

const statusColor: Record<string, string> = {
  NEW: "bg-blue-50 text-blue-700 border-blue-200",
  REVIEWING: "bg-amber-50 text-amber-700 border-amber-200",
  REPLIED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  CLOSED: "bg-slate-100 text-slate-500 border-slate-200",
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getDashboardKPIs()
      .then(setStats)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[500px]">
        <PageLoader />
      </div>
    );
  }

  const statCards = [
    { title: "Total Enquiries",          value: stats?.total_enquiries ?? 0,           icon: MessageSquare,  color: "text-blue-600",   bg: "bg-blue-50",   href: "/admin/enquiries" },
    { title: "Caregiver Enquiries",      value: stats?.total_caregiver_enquiries ?? 0, icon: HeartHandshake, color: "text-rose-500",   bg: "bg-rose-50",   href: "/admin/caregiver-enquiries" },
    { title: "Total Applications",       value: stats?.total_applications ?? 0,        icon: FileText,       color: "text-violet-600", bg: "bg-violet-50", href: "/admin/applications" },
    { title: "Active Jobs",              value: stats?.active_jobs ?? 0,               icon: Briefcase,      color: "text-emerald-600",bg: "bg-emerald-50",href: "/admin/jobs" },
    { title: "Published News",           value: stats?.published_news ?? 0,            icon: Newspaper,      color: "text-amber-600",  bg: "bg-amber-50",  href: "/admin/news" },
    { title: "Team Members",             value: stats?.team_members ?? 0,              icon: Users,          color: "text-sky-600",    bg: "bg-sky-50",    href: "/admin/team" },
    { title: "Testimonials",             value: stats?.total_testimonials ?? 0,        icon: Star,           color: "text-yellow-600", bg: "bg-yellow-50", href: "/admin/testimonials" },
    { title: "Client Logos",             value: stats?.total_client_logos ?? 0,        icon: Building2,      color: "text-indigo-600", bg: "bg-indigo-50", href: "/admin/logos" },
    { title: "Admin Users",              value: stats?.admin_users ?? 0,               icon: UserCog,        color: "text-slate-600",  bg: "bg-slate-100", href: "/admin/admins" },
  ];

  const quickActions = [
    { label: "Add News Article",  href: "/admin/news",     icon: Newspaper,  color: "bg-amber-500" },
    { label: "Post New Job",      href: "/admin/jobs",     icon: Briefcase,  color: "bg-emerald-600" },
    { label: "Add Team Member",   href: "/admin/team",     icon: Users,      color: "bg-sky-600" },
    { label: "View Enquiries",    href: "/admin/enquiries",icon: MessageSquare,color: "bg-blue-600" },
  ];

  return (
    <div className="space-y-7 pb-10">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-0.5 font-medium">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
          <Clock className="w-3.5 h-3.5" />
          <span>Last updated: just now</span>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center gap-3 text-red-700">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span className="text-sm font-semibold">{error} — Make sure the backend is running and you are logged in as Admin.</span>
        </div>
      )}

      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {statCards.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <StatCard {...s} />
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className={card + " p-6"}>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-blue-600" />
          <h2 className="text-sm font-black text-slate-700 uppercase tracking-wider">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickActions.map((a, i) => (
            <Link href={a.href} key={i}>
              <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50 transition-all group cursor-pointer">
                <div className={`w-8 h-8 rounded-lg ${a.color} flex items-center justify-center shrink-0`}>
                  <a.icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs font-bold text-slate-700 group-hover:text-blue-700 transition-colors">{a.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Grid: Recent Enquiries + Recent Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Recent Enquiries */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className={card + " p-6"}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-black text-slate-700 uppercase tracking-wider">Latest Enquiries</h2>
            <Link href="/admin/enquiries" className="text-xs font-semibold text-blue-600 hover:text-blue-700">View all →</Link>
          </div>
          {stats?.recent_enquiries?.length > 0 ? (
            <div className="space-y-3">
              {stats.recent_enquiries.map((e: any, i: number) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-black text-sm shrink-0">
                    {e.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-800 truncate">{e.name}</p>
                    <p className="text-xs text-slate-500 truncate">{e.service || e.email}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-black border ${statusColor[e.status] || statusColor.NEW}`}>
                    {e.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <MessageSquare className="w-8 h-8 text-slate-200 mx-auto mb-2" />
              <p className="text-sm text-slate-400 font-medium">No enquiries yet</p>
            </div>
          )}
        </motion.div>

        {/* Recent Applications */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className={card + " p-6"}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-black text-slate-700 uppercase tracking-wider">Latest Applications</h2>
            <Link href="/admin/applications" className="text-xs font-semibold text-blue-600 hover:text-blue-700">View all →</Link>
          </div>
          {stats?.recent_applications?.length > 0 ? (
            <div className="space-y-3">
              {stats.recent_applications.map((a: any, i: number) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4 text-violet-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-500 font-medium truncate">Job: {a.job_id?.slice(-8)}</p>
                    <p className="text-xs text-slate-400 truncate">Candidate: {a.candidate_id?.slice(-8)}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-violet-50 text-violet-700 border border-violet-200">
                    {a.stage}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="w-8 h-8 text-slate-200 mx-auto mb-2" />
              <p className="text-sm text-slate-400 font-medium">No applications yet</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Recent Activity */}
      {stats?.recent_activity?.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className={card + " p-6"}>
          <h2 className="text-sm font-black text-slate-700 uppercase tracking-wider mb-4">Recent Activity</h2>
          <div className="space-y-2">
            {stats.recent_activity.map((a: any, i: number) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-slate-50 last:border-0">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <p className="text-sm text-slate-700 font-medium flex-1">{a.title || a.event_type}</p>
                <span className="text-[11px] text-slate-400 shrink-0">{new Date(a.created_at).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
