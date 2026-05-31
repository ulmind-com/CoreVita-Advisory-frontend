"use client";
/* eslint-disable */

import { useAdminStats } from "@/services/queries";
import { Users, Briefcase, FileText, IndianRupee, TrendingUp, Activity, ArrowUpRight, ArrowDownRight, UserPlus, Star } from "lucide-react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";

import { Loader } from "@/components/ui/Loader";

export default function AdminDashboardPage() {
  const { data: stats, isLoading, error } = useAdminStats();

  if (isLoading) {
    return (
      <div className="h-[600px] flex items-center justify-center">
        <Loader message="Loading dashboard metrics..." />
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="flex items-center justify-center h-64 bg-white/60 backdrop-blur-lg rounded-3xl shadow-xl text-red-500 font-bold border border-red-500/20 p-6">
        <div className="flex flex-col items-center gap-3">
          <Activity className="w-10 h-10 text-red-500" />
          <span>Failed to load dashboard metrics. Ensure backend is running and you have Admin access.</span>
        </div>
      </div>
    );
  }

  const statCards = [
    { title: "Total Revenue", value: `₹${stats.total_revenue.toLocaleString()}`, icon: IndianRupee, color: "text-[#00B388]", bg: "bg-[#00B388]/10", border: "border-[#00B388]/20", trend: "+12.5%", isPositive: true },
    { title: "Active Jobs", value: stats.open_jobs_count, icon: Briefcase, color: "text-[#007BFF]", bg: "bg-[#007BFF]/10", border: "border-[#007BFF]/20", trend: "+5.2%", isPositive: true },
    { title: "New CRM Leads", value: stats.new_leads_count, icon: TrendingUp, color: "text-[#042B6B]", bg: "bg-[#042B6B]/10", border: "border-[#042B6B]/20", trend: "+18.1%", isPositive: true },
    { title: "Total Users", value: stats.total_users, icon: Users, color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20", trend: "-2.4%", isPositive: false },
  ];

  const revenueData = [
    { name: "Jan", total: 2400 },
    { name: "Feb", total: 3600 },
    { name: "Mar", total: 4200 },
    { name: "Apr", total: 5800 },
    { name: "May", total: 6200 },
    { name: "Jun", total: 7400 },
    { name: "Jul", total: 8900 },
  ];

  const recruitmentData = [
    { name: "Tech", applications: 120, hired: 20 },
    { name: "Finance", applications: 85, hired: 15 },
    { name: "Health", applications: 65, hired: 10 },
    { name: "Retail", applications: 90, hired: 25 },
  ];

  return (
    <div className="space-y-8 pb-10 relative z-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative">
        <div className="relative">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-black tracking-tight text-[#042B6B] drop-shadow-sm"
          >
            Dashboard Overview
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[#2F3440] mt-2 font-semibold opacity-70 text-lg"
          >
            Welcome back. Here's what's happening with your platform today.
          </motion.p>
        </div>
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <button className="px-6 py-3 bg-white/80 backdrop-blur-md border border-white/60 rounded-xl text-sm font-bold text-[#042B6B] hover:bg-white shadow-sm hover:shadow-md transition-all duration-300">
            Download Report
          </button>
          <button className="px-6 py-3 bg-gradient-to-r from-[#007BFF] to-[#00B388] rounded-xl text-sm font-bold text-white hover:opacity-90 shadow-lg shadow-[#007BFF]/20 transition-all duration-300">
            New Campaign
          </button>
        </motion.div>
      </div>

      {/* KPI Grid - Glassmorphic Style */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-white/60 backdrop-blur-xl rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 hover:shadow-xl hover:-translate-y-1 hover:bg-white/80 transition-all duration-300 overflow-hidden"
          >
            {/* Subtle background glow based on brand colors */}
            <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full blur-[40px] opacity-20 group-hover:opacity-40 transition-opacity ${stat.bg}`} />
            
            <div className="flex items-start justify-between mb-6 relative z-10">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color} ${stat.border} border shadow-sm`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className={`flex items-center gap-1.5 text-xs font-black px-3 py-1.5 rounded-full backdrop-blur-md shadow-sm border ${stat.isPositive ? "bg-[#00B388]/10 text-[#00B388] border-[#00B388]/20" : "bg-red-500/10 text-red-600 border-red-500/20"}`}>
                {stat.isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                {stat.trend}
              </div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-[#2F3440] text-sm font-bold mb-1 opacity-70 uppercase tracking-wider">{stat.title}</h3>
              <p className="text-4xl font-black text-[#042B6B] tracking-tight">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section - Glassmorphic Style */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        
        {/* Revenue Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white/60 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 hover:bg-white/80 transition-all duration-300 relative overflow-hidden"
        >
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-[#007BFF]/5 blur-[60px] rounded-full pointer-events-none" />
          
          <div className="flex items-center justify-between mb-8 relative z-10">
            <div>
              <h3 className="text-xl font-black text-[#042B6B] tracking-tight">Revenue Overview</h3>
              <p className="text-sm font-bold text-[#2F3440] opacity-60 uppercase tracking-wider mt-1">Monthly recurring revenue (MRR)</p>
            </div>
            <select className="bg-white/50 backdrop-blur-md border border-white/60 shadow-sm text-sm rounded-xl px-4 py-2.5 outline-none font-bold text-[#042B6B] focus:ring-2 focus:ring-[#007BFF] transition-all cursor-pointer">
              <option>Last 7 months</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-[320px] w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#007BFF" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#007BFF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8ECEF" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#2F3440', opacity: 0.6, fontWeight: 700 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#2F3440', opacity: 0.6, fontWeight: 700 }} dx={-10} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: '1px solid rgba(255,255,255,0.6)', backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                  itemStyle={{ color: '#042B6B', fontWeight: '900', fontSize: '16px' }}
                />
                <Area type="monotone" dataKey="total" stroke="#007BFF" strokeWidth={4} fillOpacity={1} fill="url(#colorTotal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recruitment Pipeline */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 hover:bg-white/80 transition-all duration-300 relative overflow-hidden"
        >
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-[#00B388]/5 blur-[60px] rounded-full pointer-events-none" />

          <h3 className="text-xl font-black text-[#042B6B] mb-1 relative z-10 tracking-tight">Pipeline Metrics</h3>
          <p className="text-sm font-bold text-[#2F3440] opacity-60 uppercase tracking-wider mb-8 relative z-10">Applications vs Hired</p>
          
          <div className="h-[320px] w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={recruitmentData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8ECEF" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#2F3440', opacity: 0.6, fontWeight: 700 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#2F3440', opacity: 0.6, fontWeight: 700 }} />
                <Tooltip cursor={{ fill: 'rgba(232, 236, 239, 0.5)' }} contentStyle={{ borderRadius: '16px', border: '1px solid rgba(255,255,255,0.6)', backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '13px', paddingTop: '10px', fontWeight: 'bold' }} />
                <Bar dataKey="applications" name="Applications" fill="#042B6B" radius={[6, 6, 0, 0]} barSize={16} />
                <Bar dataKey="hired" name="Hired" fill="#00B388" radius={[6, 6, 0, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Activity Feed & Recent Data - Glassmorphic Style */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 hover:bg-white/80 transition-all duration-300 relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-8 relative z-10">
            <h3 className="text-xl font-black text-[#042B6B] tracking-tight">Recent Activity</h3>
            <button className="text-sm font-bold text-[#007BFF] hover:text-[#042B6B] hover:underline transition-colors uppercase tracking-wider">View All</button>
          </div>
          <div className="space-y-6 relative z-10">
            {[
              { icon: UserPlus, color: "text-[#007BFF]", bg: "bg-[#007BFF]/10 border border-[#007BFF]/20", text: "New candidate registered", time: "2 hours ago" },
              { icon: FileText, color: "text-[#00B388]", bg: "bg-[#00B388]/10 border border-[#00B388]/20", text: "Stripe LLC submitted a new job requirement", time: "4 hours ago" },
              { icon: Star, color: "text-amber-500", bg: "bg-amber-500/10 border border-amber-500/20", text: "Sarah Connor advanced to Interview stage", time: "6 hours ago" },
              { icon: IndianRupee, color: "text-[#042B6B]", bg: "bg-[#042B6B]/10 border border-[#042B6B]/20", text: "Invoice #INV-2024 paid by Client", time: "Yesterday" },
            ].map((activity, i) => (
              <motion.div 
                whileHover={{ x: 5 }}
                key={i} 
                className="flex items-start gap-4 p-3 -mx-3 rounded-2xl hover:bg-white/60 transition-colors"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${activity.bg} ${activity.color}`}>
                  <activity.icon className="w-5 h-5" />
                </div>
                <div className="pt-1">
                  <p className="text-[15px] font-bold text-[#042B6B]">{activity.text}</p>
                  <p className="text-xs font-bold text-[#2F3440] opacity-50 mt-1 uppercase tracking-wider">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-br from-[#042B6B] to-[#021840] p-8 rounded-3xl shadow-xl shadow-[#042B6B]/20 border border-white/10 flex flex-col items-center justify-center text-center relative overflow-hidden"
        >
          {/* Subtle noise/glow for dark card */}
          <div className="absolute inset-0 bg-[#007BFF]/10 blur-[80px] pointer-events-none" />

          <div className="w-24 h-24 rounded-full bg-[#00B388]/20 flex items-center justify-center mb-6 relative z-10 border border-[#00B388]/30 shadow-[0_0_30px_rgba(0,179,136,0.3)]">
            <Activity className="w-12 h-12 text-[#00B388]" />
          </div>
          <h3 className="text-3xl font-black text-white mb-3 relative z-10 tracking-tight">Platform Health Optimal</h3>
          <p className="text-white/70 max-w-sm mb-8 text-lg font-medium relative z-10">All systems are running smoothly. APIs are connected and latency is incredibly low.</p>
          <button className="px-8 py-3.5 bg-white text-[#042B6B] font-black rounded-xl hover:bg-gray-100 hover:scale-105 transition-all shadow-lg relative z-10">
            View System Logs
          </button>
        </motion.div>
      </div>

    </div>
  );
}
