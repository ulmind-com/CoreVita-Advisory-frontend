"use client";

import { useState } from "react";
import { useCompanies, useCreateCompany, useUpdateCompany, useDeleteCompany } from "@/services/queries";
import { Building2, ExternalLink, Globe, Plus, Search, ChevronDown, Download, Users, Edit, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Loader } from "@/components/ui/Loader";
import { Modal } from "@/components/ui/Modal";
import { Company } from "@/types";
import { toast } from "sonner";

export default function CompaniesPage() {
  const { data: companies, isLoading, error } = useCompanies();
  
  const { mutate: createCompany, isPending: isCreating } = useCreateCompany();
  const { mutate: updateCompany, isPending: isUpdating } = useUpdateCompany();
  const { mutate: deleteCompany, isPending: isDeleting } = useDeleteCompany();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const [formData, setFormData] = useState({
    name: "", domain: "", industry: "", description: ""
  });

  if (isLoading) {
    return (
      <div className="h-[600px] flex items-center justify-center">
        <Loader message="Loading company directory..." />
      </div>
    );
  }

  if (error || !companies) {
    return (
      <div className="flex items-center justify-center h-64 bg-white/60 backdrop-blur-lg rounded-3xl shadow-xl text-red-500 font-bold border border-red-500/20 p-6">
        <div className="flex flex-col items-center gap-3">
          <Building2 className="w-10 h-10 text-red-500" />
          <span>Failed to load companies. Ensure backend is running.</span>
        </div>
      </div>
    );
  }

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createCompany({ ...formData, managers: [] }, {
      onSuccess: () => {
        toast.success("Company added successfully!");
        setIsAddModalOpen(false);
        setFormData({ name: "", domain: "", industry: "", description: "" });
      },
      onError: () => toast.error("Failed to add company.")
    });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCompany) return;
    updateCompany({ id: selectedCompany.id, ...formData }, {
      onSuccess: () => {
        toast.success("Company updated successfully!");
        setIsEditModalOpen(false);
      },
      onError: () => toast.error("Failed to update company.")
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this company?")) {
      deleteCompany(id, {
        onSuccess: () => toast.success("Company deleted successfully!"),
        onError: () => toast.error("Failed to delete company.")
      });
    }
  };

  const openEditModal = (company: Company) => {
    setSelectedCompany(company);
    setFormData({ 
      name: company.name, 
      domain: company.domain, 
      industry: company.industry, 
      description: company.description || "" 
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
            Company Profiles
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[#2F3440] mt-2 font-semibold opacity-70 text-lg"
          >
            Manage partner organizations and client details.
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
            onClick={() => { setFormData({ name: "", domain: "", industry: "", description: "" }); setIsAddModalOpen(true); }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#007BFF] to-[#00B388] rounded-xl text-sm font-bold text-white hover:opacity-90 shadow-lg shadow-[#007BFF]/20 transition-all duration-300"
          >
            <Plus className="w-5 h-5" /> Add Company
          </button>
        </motion.div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.length === 0 ? (
          <div className="col-span-full py-24 flex flex-col items-center justify-center bg-white/60 backdrop-blur-xl rounded-3xl shadow-sm border border-white/60">
            <div className="w-24 h-24 rounded-full bg-[#007BFF]/10 flex items-center justify-center mb-6 border border-[#007BFF]/20 shadow-[0_0_30px_rgba(0,123,255,0.15)]">
              <Building2 className="w-10 h-10 text-[#007BFF]" />
            </div>
            <p className="text-[#042B6B] font-black text-2xl tracking-tight">No companies found.</p>
            <p className="text-[#2F3440] opacity-60 font-semibold mt-2 text-center max-w-sm">There are no client organizations in the system yet. Click "Add Company" to register one.</p>
          </div>
        ) : (
          companies.map((company, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              key={company.id} 
              className="group relative bg-white/60 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#007BFF]/0 to-[#00B388]/0 group-hover:from-[#007BFF]/5 group-hover:to-[#00B388]/5 transition-all duration-500 pointer-events-none" />

              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#042B6B] to-[#007BFF] text-white flex items-center justify-center font-black text-2xl shadow-lg border border-white/20">
                  {company.name.charAt(0)}
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEditModal(company)} className="p-2 bg-white/50 backdrop-blur-md shadow-sm border border-gray-100 hover:border-[#007BFF]/30 hover:bg-[#007BFF]/10 text-gray-400 hover:text-[#007BFF] rounded-xl transition-all">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(company.id)} className="p-2 bg-white/50 backdrop-blur-md shadow-sm border border-gray-100 hover:border-red-500/30 hover:bg-red-500/10 text-gray-400 hover:text-red-500 rounded-xl transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <h3 className="text-[22px] font-black text-[#042B6B] leading-tight mb-2 relative z-10 group-hover:text-[#007BFF] transition-colors">{company.name}</h3>
              <p className="text-[11px] text-[#00B388] font-black uppercase tracking-[0.15em] mb-6 relative z-10">
                {company.industry}
              </p>
              
              <div className="space-y-3 mb-6 flex-1 relative z-10">
                <div className="flex items-center gap-3 text-[13px] text-[#2F3440] font-bold bg-white/50 backdrop-blur-sm shadow-sm border border-gray-100 p-3 rounded-xl hover:bg-white transition-colors cursor-pointer group/link">
                  <Globe className="w-4 h-4 text-[#007BFF]" />
                  <a href={`https://${company.domain}`} target="_blank" rel="noopener noreferrer" className="group-hover/link:text-[#007BFF] transition-colors truncate">
                    {company.domain}
                  </a>
                  <ExternalLink className="w-3.5 h-3.5 ml-auto text-gray-400 group-hover/link:text-[#007BFF]" />
                </div>
                <div className="flex items-center gap-3 text-[13px] text-[#2F3440] font-bold bg-white/50 backdrop-blur-sm shadow-sm border border-gray-100 p-3 rounded-xl">
                  <Users className="w-4 h-4 text-[#00B388]" />
                  <span>{company.managers.length} Assigned Manager(s)</span>
                </div>
              </div>
              
              {company.description && (
                <p className="text-sm text-[#2F3440] font-medium opacity-70 line-clamp-2 mt-auto pt-5 border-t border-gray-200/50 relative z-10">
                  {company.description}
                </p>
              )}
            </motion.div>
          ))
        )}
      </div>

      {/* Add Company Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Company">
        <form onSubmit={handleAddSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-black text-[#042B6B] uppercase tracking-wider mb-2">Company Name</label>
            <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-[#007BFF] focus:ring-4 focus:ring-[#007BFF]/10 outline-none bg-white/50 backdrop-blur-sm transition-all font-medium text-[#2F3440]" />
          </div>
          <div>
            <label className="block text-xs font-black text-[#042B6B] uppercase tracking-wider mb-2">Domain (e.g. google.com)</label>
            <input type="text" required value={formData.domain} onChange={e => setFormData({...formData, domain: e.target.value})} className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-[#007BFF] focus:ring-4 focus:ring-[#007BFF]/10 outline-none bg-white/50 backdrop-blur-sm transition-all font-medium text-[#2F3440]" />
          </div>
          <div>
            <label className="block text-xs font-black text-[#042B6B] uppercase tracking-wider mb-2">Industry</label>
            <input type="text" required value={formData.industry} onChange={e => setFormData({...formData, industry: e.target.value})} className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-[#007BFF] focus:ring-4 focus:ring-[#007BFF]/10 outline-none bg-white/50 backdrop-blur-sm transition-all font-medium text-[#2F3440]" placeholder="e.g. Technology, Finance" />
          </div>
          <div>
            <label className="block text-xs font-black text-[#042B6B] uppercase tracking-wider mb-2">Description</label>
            <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-[#007BFF] focus:ring-4 focus:ring-[#007BFF]/10 outline-none bg-white/50 backdrop-blur-sm transition-all font-medium text-[#2F3440] custom-scrollbar" />
          </div>
          <button disabled={isCreating} type="submit" className="w-full py-4 mt-6 bg-gradient-to-r from-[#007BFF] to-[#00B388] text-white font-black uppercase tracking-widest text-sm rounded-2xl hover:opacity-90 shadow-lg shadow-[#007BFF]/20 transition-all duration-300 disabled:opacity-50">
            {isCreating ? "Processing..." : "Add Company"}
          </button>
        </form>
      </Modal>

      {/* Edit Company Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Company Profile">
        <form onSubmit={handleEditSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-black text-[#042B6B] uppercase tracking-wider mb-2">Company Name</label>
            <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-[#007BFF] focus:ring-4 focus:ring-[#007BFF]/10 outline-none bg-white/50 backdrop-blur-sm transition-all font-medium text-[#2F3440]" />
          </div>
          <div>
            <label className="block text-xs font-black text-[#042B6B] uppercase tracking-wider mb-2">Domain</label>
            <input type="text" required value={formData.domain} onChange={e => setFormData({...formData, domain: e.target.value})} className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-[#007BFF] focus:ring-4 focus:ring-[#007BFF]/10 outline-none bg-white/50 backdrop-blur-sm transition-all font-medium text-[#2F3440]" />
          </div>
          <div>
            <label className="block text-xs font-black text-[#042B6B] uppercase tracking-wider mb-2">Industry</label>
            <input type="text" required value={formData.industry} onChange={e => setFormData({...formData, industry: e.target.value})} className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-[#007BFF] focus:ring-4 focus:ring-[#007BFF]/10 outline-none bg-white/50 backdrop-blur-sm transition-all font-medium text-[#2F3440]" />
          </div>
          <div>
            <label className="block text-xs font-black text-[#042B6B] uppercase tracking-wider mb-2">Description</label>
            <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-[#007BFF] focus:ring-4 focus:ring-[#007BFF]/10 outline-none bg-white/50 backdrop-blur-sm transition-all font-medium text-[#2F3440] custom-scrollbar" />
          </div>
          <button disabled={isUpdating} type="submit" className="w-full py-4 mt-6 bg-gradient-to-r from-[#007BFF] to-[#00B388] text-white font-black uppercase tracking-widest text-sm rounded-2xl hover:opacity-90 shadow-lg shadow-[#007BFF]/20 transition-all duration-300 disabled:opacity-50">
            {isUpdating ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </Modal>

    </div>
  );
}
