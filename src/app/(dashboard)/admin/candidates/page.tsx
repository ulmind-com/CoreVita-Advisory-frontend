"use client";

import { useState } from "react";
import { useCandidates, useCreateCandidate, useUpdateCandidate, useDeleteCandidate } from "@/services/queries";
import { Mail, Phone, ExternalLink, Search, Filter, ChevronDown, Download, Plus, Users as UsersIcon, Edit, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Loader } from "@/components/ui/Loader";
import { Modal } from "@/components/ui/Modal";
import { Candidate } from "@/types";
import { toast } from "sonner";

export default function CandidatesPage() {
  const { data: candidates, isLoading, error } = useCandidates();
  
  const { mutate: createCandidate, isPending: isCreating } = useCreateCandidate();
  const { mutate: updateCandidate, isPending: isUpdating } = useUpdateCandidate();
  const { mutate: deleteCandidate, isPending: isDeleting } = useDeleteCandidate();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", skills: "", status: "AVAILABLE"
  });

  if (isLoading) {
    return (
      <div className="h-[600px] flex items-center justify-center">
        <Loader message="Loading candidates database..." />
      </div>
    );
  }

  if (error || !candidates) {
    return (
      <div className="flex items-center justify-center h-64 bg-white/60 backdrop-blur-lg rounded-3xl shadow-xl text-red-500 font-bold border border-red-500/20 p-6">
        <div className="flex flex-col items-center gap-3">
          <UsersIcon className="w-10 h-10 text-red-500" />
          <span>Failed to load candidates. Ensure backend is running.</span>
        </div>
      </div>
    );
  }

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const skillsList = formData.skills.split(",").map(s => s.trim()).filter(s => s);
    createCandidate({ ...formData, skills: skillsList }, {
      onSuccess: () => {
        toast.success("Candidate added successfully!");
        setIsAddModalOpen(false);
        setFormData({ name: "", email: "", phone: "", skills: "", status: "AVAILABLE" });
      },
      onError: () => toast.error("Failed to add candidate.")
    });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCandidate) return;
    const skillsList = formData.skills.split(",").map(s => s.trim()).filter(s => s);
    updateCandidate({ id: selectedCandidate.id, ...formData, skills: skillsList }, {
      onSuccess: () => {
        toast.success("Candidate updated successfully!");
        setIsEditModalOpen(false);
      },
      onError: () => toast.error("Failed to update candidate.")
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this candidate?")) {
      deleteCandidate(id, {
        onSuccess: () => toast.success("Candidate deleted successfully!"),
        onError: () => toast.error("Failed to delete candidate.")
      });
    }
  };

  const openEditModal = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setFormData({ 
      name: candidate.name, 
      email: candidate.email, 
      phone: candidate.phone || "", 
      skills: candidate.skills.join(", "), 
      status: candidate.status 
    });
    setIsEditModalOpen(true);
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
            Candidates CRM
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[#2F3440] mt-2 font-semibold opacity-70 text-lg"
          >
            Build and manage your elite talent pool.
          </motion.p>
        </div>
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <button className="flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-md border border-white/60 rounded-xl text-sm font-bold text-[#042B6B] hover:bg-white shadow-sm hover:shadow-md transition-all duration-300">
            <Download className="w-4 h-4 text-[#00B388]" /> Export
          </button>
          <button 
            onClick={() => { setFormData({ name: "", email: "", phone: "", skills: "", status: "AVAILABLE" }); setIsAddModalOpen(true); }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#007BFF] to-[#00B388] rounded-xl text-sm font-bold text-white hover:opacity-90 shadow-lg shadow-[#007BFF]/20 transition-all duration-300"
          >
            <Plus className="w-5 h-5" /> Add Candidate
          </button>
        </motion.div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {candidates.length === 0 ? (
          <div className="col-span-full py-24 flex flex-col items-center justify-center bg-white/60 backdrop-blur-xl rounded-3xl shadow-sm border border-white/60">
            <div className="w-24 h-24 rounded-full bg-[#042B6B]/10 flex items-center justify-center mb-6 border border-[#042B6B]/20 shadow-[0_0_30px_rgba(4,43,107,0.15)]">
              <UsersIcon className="w-10 h-10 text-[#042B6B]" />
            </div>
            <p className="text-[#042B6B] font-black text-2xl tracking-tight">No candidates found.</p>
            <p className="text-[#2F3440] opacity-60 font-semibold mt-2 text-center max-w-sm">Your candidate pool is empty. Click "Add Candidate" to start building your network.</p>
          </div>
        ) : (
          candidates.map((candidate, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              key={candidate.id} 
              className="group relative bg-white/60 backdrop-blur-xl p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#007BFF]/0 to-[#00B388]/0 group-hover:from-[#007BFF]/5 group-hover:to-[#00B388]/5 transition-all duration-500 pointer-events-none" />

              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#007BFF] to-[#00B388] text-white flex items-center justify-center font-black text-2xl shadow-lg border border-white/20">
                  {candidate.name.charAt(0)}
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEditModal(candidate)} className="p-2 bg-white/50 backdrop-blur-md shadow-sm border border-gray-100 hover:border-[#00B388]/30 hover:bg-[#00B388]/10 text-gray-400 hover:text-[#00B388] rounded-xl transition-all">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(candidate.id)} className="p-2 bg-white/50 backdrop-blur-md shadow-sm border border-gray-100 hover:border-red-500/30 hover:bg-red-500/10 text-gray-400 hover:text-red-500 rounded-xl transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <h3 className="text-[19px] font-black text-[#042B6B] mb-3 relative z-10 leading-tight group-hover:text-[#007BFF] transition-colors">{candidate.name}</h3>
              
              <div className="space-y-3 mb-6 flex-1 relative z-10">
                <div className="flex items-center gap-3 text-[13px] text-[#2F3440] font-bold bg-white/50 backdrop-blur-sm shadow-sm border border-gray-100 p-2.5 rounded-xl">
                  <Mail className="w-4 h-4 text-[#007BFF]" />
                  <span className="truncate">{candidate.email}</span>
                </div>
                {candidate.phone && (
                  <div className="flex items-center gap-3 text-[13px] text-[#2F3440] font-bold bg-white/50 backdrop-blur-sm shadow-sm border border-gray-100 p-2.5 rounded-xl">
                    <Phone className="w-4 h-4 text-[#00B388]" />
                    <span>{candidate.phone}</span>
                  </div>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2 mb-5 relative z-10">
                {candidate.skills.slice(0, 3).map((skill, index) => (
                  <span key={index} className="px-3 py-1.5 rounded-full bg-[#007BFF]/5 border border-[#007BFF]/10 text-[10px] font-black text-[#042B6B] uppercase tracking-wider backdrop-blur-sm shadow-sm">
                    {skill}
                  </span>
                ))}
                {candidate.skills.length > 3 && (
                  <span className="px-3 py-1.5 rounded-full bg-gray-100/50 border border-gray-200 text-[10px] font-black text-gray-500 backdrop-blur-sm shadow-sm">
                    +{candidate.skills.length - 3}
                  </span>
                )}
              </div>
              
              <div className="pt-5 border-t border-gray-200/50 flex items-center justify-between mt-auto relative z-10">
                <div className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] shadow-sm backdrop-blur-sm border ${
                  candidate.status === 'AVAILABLE' ? 'bg-[#00B388]/10 text-[#00B388] border-[#00B388]/20' :
                  candidate.status === 'PLACED' ? 'bg-[#007BFF]/10 text-[#007BFF] border-[#007BFF]/20' :
                  'bg-gray-100/50 text-gray-500 border-gray-200/50'
                }`}>
                  {candidate.status}
                </div>
                
                {candidate.cv_url && (
                  <button className="flex items-center gap-1.5 text-[11px] font-black text-[#007BFF] hover:text-[#042B6B] uppercase tracking-wider transition-colors">
                    <ExternalLink className="w-3.5 h-3.5" /> View CV
                  </button>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Add/Edit Candidate Modal */}
      <Modal isOpen={isAddModalOpen || isEditModalOpen} onClose={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }} title={isEditModalOpen ? "Edit Candidate Profile" : "Add New Candidate"}>
        <form onSubmit={isEditModalOpen ? handleEditSubmit : handleAddSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-black text-[#042B6B] uppercase tracking-wider mb-2">Full Name</label>
            <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-[#007BFF] focus:ring-4 focus:ring-[#007BFF]/10 outline-none bg-white/50 backdrop-blur-sm transition-all font-medium text-[#2F3440]" />
          </div>
          <div>
            <label className="block text-xs font-black text-[#042B6B] uppercase tracking-wider mb-2">Email Address</label>
            <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-[#007BFF] focus:ring-4 focus:ring-[#007BFF]/10 outline-none bg-white/50 backdrop-blur-sm transition-all font-medium text-[#2F3440]" />
          </div>
          <div>
            <label className="block text-xs font-black text-[#042B6B] uppercase tracking-wider mb-2">Phone Number</label>
            <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-[#007BFF] focus:ring-4 focus:ring-[#007BFF]/10 outline-none bg-white/50 backdrop-blur-sm transition-all font-medium text-[#2F3440]" />
          </div>
          <div>
            <label className="block text-xs font-black text-[#042B6B] uppercase tracking-wider mb-2">Skills (comma separated)</label>
            <input type="text" value={formData.skills} onChange={e => setFormData({...formData, skills: e.target.value})} className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-[#007BFF] focus:ring-4 focus:ring-[#007BFF]/10 outline-none bg-white/50 backdrop-blur-sm transition-all font-medium text-[#2F3440]" placeholder="e.g. React, Node.js, Python" />
          </div>
          <div>
            <label className="block text-xs font-black text-[#042B6B] uppercase tracking-wider mb-2">Status</label>
            <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-[#007BFF] focus:ring-4 focus:ring-[#007BFF]/10 outline-none bg-white/50 backdrop-blur-sm transition-all font-medium text-[#2F3440]">
              <option value="AVAILABLE">Available</option>
              <option value="PLACED">Placed</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>
          <button disabled={isCreating || isUpdating} type="submit" className="w-full py-4 mt-6 bg-gradient-to-r from-[#007BFF] to-[#00B388] text-white font-black uppercase tracking-widest text-sm rounded-2xl hover:opacity-90 shadow-lg shadow-[#007BFF]/20 transition-all duration-300 disabled:opacity-50">
            {isCreating || isUpdating ? "Processing..." : (isEditModalOpen ? "Save Changes" : "Add Candidate")}
          </button>
        </form>
      </Modal>

    </div>
  );
}
