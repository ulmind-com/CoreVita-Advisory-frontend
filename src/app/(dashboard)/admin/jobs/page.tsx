"use client";

import { useState } from "react";
import { useJobs, useCreateJob, useUpdateJob, useDeleteJob, useCompanies } from "@/services/queries";
import { Search, Filter, Plus, ChevronDown, Download, Briefcase, MapPin, DollarSign, Clock, Users, Target, Edit, Trash2 } from "lucide-react";
import { Job } from "@/types";
import { motion } from "framer-motion";
import { Loader } from "@/components/ui/Loader";
import { Modal } from "@/components/ui/Modal";
import { toast } from "sonner";

export default function JobsPage() {
  const { data: jobs, isLoading: isJobsLoading, error } = useJobs();
  const { data: companies, isLoading: isCompaniesLoading } = useCompanies();
  
  const { mutate: createJob, isPending: isCreating } = useCreateJob();
  const { mutate: updateJob, isPending: isUpdating } = useUpdateJob();
  const { mutate: deleteJob, isPending: isDeleting } = useDeleteJob();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const [formData, setFormData] = useState({
    title: "", description: "", company_id: "", recruiter_id: "", status: "OPEN" as "OPEN" | "CLOSED" | "DRAFT", salary_range: ""
  });

  if (isJobsLoading || isCompaniesLoading) {
    return (
      <div className="h-[600px] flex items-center justify-center">
        <Loader message="Loading job listings..." />
      </div>
    );
  }

  if (error || !jobs) {
    return (
      <div className="flex items-center justify-center h-64 bg-white/60 backdrop-blur-lg rounded-3xl shadow-xl text-red-500 font-bold border border-red-500/20 p-6">
        <div className="flex flex-col items-center gap-3">
          <Briefcase className="w-10 h-10 text-red-500" />
          <span>Failed to load jobs. Ensure backend is running.</span>
        </div>
      </div>
    );
  }

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createJob(formData, {
      onSuccess: () => {
        toast.success("Job created successfully!");
        setIsAddModalOpen(false);
        setFormData({ title: "", description: "", company_id: "", recruiter_id: "", status: "OPEN", salary_range: "" });
      },
      onError: () => toast.error("Failed to create job.")
    });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;
    updateJob({ id: selectedJob.id, ...formData }, {
      onSuccess: () => {
        toast.success("Job updated successfully!");
        setIsEditModalOpen(false);
      },
      onError: () => toast.error("Failed to update job.")
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this job posting?")) {
      deleteJob(id, {
        onSuccess: () => toast.success("Job deleted successfully!"),
        onError: () => toast.error("Failed to delete job.")
      });
    }
  };

  const openEditModal = (job: Job) => {
    setSelectedJob(job);
    setFormData({ 
      title: job.title, 
      description: job.description, 
      company_id: job.company_id, 
      recruiter_id: job.recruiter_id || "", 
      status: job.status,
      salary_range: job.salary_range || ""
    });
    setIsEditModalOpen(true);
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      "OPEN": "bg-[#00B388]/10 text-[#00B388] border-[#00B388]/20 shadow-[#00B388]/10",
      "CLOSED": "bg-gray-100/50 text-gray-500 border-gray-200/50 shadow-gray-200/10",
      "DRAFT": "bg-amber-500/10 text-amber-600 border-amber-500/20 shadow-amber-500/10",
    };
    return (
      <span className={`px-3 py-1.5 rounded-full text-[10px] font-black border uppercase tracking-[0.15em] shadow-sm backdrop-blur-sm ${styles[status] || "bg-gray-100 text-gray-700 border-gray-200"}`}>
        {status}
      </span>
    );
  };

  const getCompanyName = (companyId: string) => {
    return companies?.find(c => c.id === companyId)?.name || "Unknown Company";
  };

  return (
    <div className="space-y-8 pb-10 relative z-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative">
        <div className="relative">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-black tracking-tight text-[#042B6B] drop-shadow-sm"
          >
            Job Postings
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[#2F3440] mt-2 font-semibold opacity-70 text-lg"
          >
            Manage active recruitment pipelines and job requisitions.
          </motion.p>
        </div>
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <button className="flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-md border border-white/60 rounded-xl text-sm font-bold text-[#042B6B] hover:bg-white shadow-sm hover:shadow-md transition-all duration-300">
            <Filter className="w-4 h-4 text-[#007BFF]" /> Filter
          </button>
          <button 
            onClick={() => { setFormData({ title: "", description: "", company_id: "", recruiter_id: "", status: "OPEN", salary_range: "" }); setIsAddModalOpen(true); }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#007BFF] to-[#00B388] rounded-xl text-sm font-bold text-white hover:opacity-90 shadow-lg shadow-[#007BFF]/20 transition-all duration-300"
          >
            <Plus className="w-5 h-5" /> Post Job
          </button>
        </motion.div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {jobs.length === 0 ? (
          <div className="col-span-full py-24 flex flex-col items-center justify-center bg-white/60 backdrop-blur-xl rounded-3xl shadow-sm border border-white/60">
            <div className="w-24 h-24 rounded-full bg-[#007BFF]/10 flex items-center justify-center mb-6 border border-[#007BFF]/20 shadow-[0_0_30px_rgba(0,123,255,0.15)]">
              <Briefcase className="w-10 h-10 text-[#007BFF]" />
            </div>
            <p className="text-[#042B6B] font-black text-2xl tracking-tight">No active jobs found.</p>
            <p className="text-[#2F3440] opacity-60 font-semibold mt-2 text-center max-w-sm">You haven't posted any jobs yet. Click "Post Job" to create your first requisition.</p>
          </div>
        ) : (
          jobs.map((job, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              key={job.id} 
              className="group relative bg-white/60 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#007BFF]/0 to-[#00B388]/0 group-hover:from-[#007BFF]/5 group-hover:to-[#00B388]/5 transition-all duration-500 pointer-events-none" />

              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#042B6B] to-[#021840] flex items-center justify-center font-black text-white shadow-lg border border-white/10">
                    {getCompanyName(job.company_id).charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-[19px] font-black text-[#042B6B] leading-tight tracking-tight group-hover:text-[#007BFF] transition-colors">{job.title}</h3>
                    <p className="text-[11px] font-bold text-[#00B388] uppercase tracking-[0.15em] mt-1">{getCompanyName(job.company_id)}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-8 relative z-10">
                <div className="flex flex-wrap gap-2">
                  {getStatusBadge(job.status)}
                  {job.salary_range && (
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#007BFF]/10 text-[#007BFF] border border-[#007BFF]/20 text-[10px] font-black uppercase tracking-[0.1em] shadow-sm backdrop-blur-sm">
                      <DollarSign className="w-3 h-3" /> {job.salary_range}
                    </span>
                  )}
                </div>
                
                <p className="text-sm text-[#2F3440] font-medium opacity-70 line-clamp-3 leading-relaxed">
                  {job.description}
                </p>
              </div>
              
              <div className="pt-5 border-t border-gray-200/50 flex items-center justify-between mt-auto relative z-10">
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                  ID: {job.id.substring(0, 8)}
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEditModal(job)} className="p-2.5 bg-white shadow-sm border border-gray-100 hover:border-[#007BFF]/30 hover:bg-[#007BFF]/5 text-gray-400 hover:text-[#007BFF] rounded-xl transition-all">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(job.id)} className="p-2.5 bg-white shadow-sm border border-gray-100 hover:border-red-500/30 hover:bg-red-500/5 text-gray-400 hover:text-red-500 rounded-xl transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Add/Edit Job Modal */}
      <Modal isOpen={isAddModalOpen || isEditModalOpen} onClose={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }} title={isEditModalOpen ? "Edit Job Post" : "Post New Job"}>
        <form onSubmit={isEditModalOpen ? handleEditSubmit : handleAddSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-black text-[#042B6B] uppercase tracking-wider mb-2">Job Title</label>
            <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-[#007BFF] focus:ring-4 focus:ring-[#007BFF]/10 outline-none bg-white/50 backdrop-blur-sm transition-all font-medium text-[#2F3440]" />
          </div>
          <div>
            <label className="block text-xs font-black text-[#042B6B] uppercase tracking-wider mb-2">Company</label>
            <select required value={formData.company_id} onChange={e => setFormData({...formData, company_id: e.target.value})} className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-[#007BFF] focus:ring-4 focus:ring-[#007BFF]/10 outline-none bg-white/50 backdrop-blur-sm transition-all font-medium text-[#2F3440]">
              <option value="">Select a company</option>
              {companies?.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-black text-[#042B6B] uppercase tracking-wider mb-2">Salary Range</label>
            <input type="text" value={formData.salary_range} onChange={e => setFormData({...formData, salary_range: e.target.value})} className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-[#007BFF] focus:ring-4 focus:ring-[#007BFF]/10 outline-none bg-white/50 backdrop-blur-sm transition-all font-medium text-[#2F3440]" placeholder="e.g. $100k - $120k" />
          </div>
          <div>
            <label className="block text-xs font-black text-[#042B6B] uppercase tracking-wider mb-2">Description</label>
            <textarea required rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-[#007BFF] focus:ring-4 focus:ring-[#007BFF]/10 outline-none bg-white/50 backdrop-blur-sm transition-all font-medium text-[#2F3440] custom-scrollbar" />
          </div>
          <div>
            <label className="block text-xs font-black text-[#042B6B] uppercase tracking-wider mb-2">Status</label>
            <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as "OPEN" | "CLOSED" | "DRAFT"})} className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-[#007BFF] focus:ring-4 focus:ring-[#007BFF]/10 outline-none bg-white/50 backdrop-blur-sm transition-all font-medium text-[#2F3440]">
              <option value="OPEN">Open</option>
              <option value="CLOSED">Closed</option>
              <option value="DRAFT">Draft</option>
            </select>
          </div>
          <button disabled={isCreating || isUpdating} type="submit" className="w-full py-4 mt-6 bg-gradient-to-r from-[#007BFF] to-[#00B388] text-white font-black uppercase tracking-widest text-sm rounded-2xl hover:opacity-90 shadow-lg shadow-[#007BFF]/20 transition-all duration-300 disabled:opacity-50">
            {isCreating || isUpdating ? "Processing..." : (isEditModalOpen ? "Save Changes" : "Post Requisition")}
          </button>
        </form>
      </Modal>

    </div>
  );
}
