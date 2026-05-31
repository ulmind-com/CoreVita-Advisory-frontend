"use client";

import { useState } from "react";
import { useCRMLeads, useCreateCRMLead, useUpdateCRMLead, useDeleteCRMLead } from "@/services/queries";
import { Mail, Phone, TrendingUp, MoreHorizontal, Search, Filter, Plus, ChevronDown, Download, Building2, User, Edit, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Loader } from "@/components/ui/Loader";
import { Modal } from "@/components/ui/Modal";
import { CRMLead } from "@/types";
import { toast } from "sonner";

export default function CRMPage() {
  const { data: leads, isLoading, error } = useCRMLeads();
  
  const { mutate: createLead, isPending: isCreating } = useCreateCRMLead();
  const { mutate: updateLead, isPending: isUpdating } = useUpdateCRMLead();
  const { mutate: deleteLead, isPending: isDeleting } = useDeleteCRMLead();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<CRMLead | null>(null);

  const [formData, setFormData] = useState({
    company_name: "", contact_name: "", contact_email: "", contact_phone: "", status: "NEW"
  });

  if (isLoading) {
    return (
      <div className="h-[600px] flex items-center justify-center">
        <Loader message="Loading sales leads..." />
      </div>
    );
  }

  if (error || !leads) {
    return (
      <div className="flex items-center justify-center h-64 bg-white/60 backdrop-blur-lg rounded-3xl shadow-xl text-red-500 font-bold border border-red-500/20 p-6">
        <div className="flex flex-col items-center gap-3">
          <TrendingUp className="w-10 h-10 text-red-500" />
          <span>Failed to load CRM leads. Ensure backend is running.</span>
        </div>
      </div>
    );
  }

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createLead(formData, {
      onSuccess: () => {
        toast.success("Lead added successfully!");
        setIsAddModalOpen(false);
        setFormData({ company_name: "", contact_name: "", contact_email: "", contact_phone: "", status: "NEW" });
      },
      onError: () => toast.error("Failed to add lead.")
    });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead) return;
    updateLead({ id: selectedLead.id, status: formData.status }, {
      onSuccess: () => {
        toast.success("Lead status updated!");
        setIsEditModalOpen(false);
      },
      onError: () => toast.error("Failed to update lead.")
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this lead?")) {
      deleteLead(id, {
        onSuccess: () => toast.success("Lead deleted successfully!"),
        onError: () => toast.error("Failed to delete lead.")
      });
    }
  };

  const openEditModal = (lead: CRMLead) => {
    setSelectedLead(lead);
    setFormData({ 
      company_name: lead.company_name, 
      contact_name: lead.contact_name, 
      contact_email: lead.contact_email, 
      contact_phone: lead.contact_phone || "", 
      status: lead.status 
    });
    setIsEditModalOpen(true);
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      "NEW": "bg-blue-500/10 text-blue-600 border-blue-500/20 shadow-blue-500/10",
      "CONTACTED": "bg-amber-500/10 text-amber-600 border-amber-500/20 shadow-amber-500/10",
      "QUALIFIED": "bg-[#00B388]/10 text-[#00B388] border-[#00B388]/20 shadow-[#00B388]/10",
      "LOST": "bg-red-500/10 text-red-600 border-red-500/20 shadow-red-500/10",
    };
    return (
      <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] shadow-sm backdrop-blur-sm border ${styles[status] || "bg-gray-100/50 text-gray-500 border-gray-200/50 shadow-gray-200/10"}`}>
        {status}
      </span>
    );
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
            Sales & CRM
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[#2F3440] mt-2 font-semibold opacity-70 text-lg"
          >
            Track incoming leads and manage client relationships.
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
            onClick={() => { setFormData({ company_name: "", contact_name: "", contact_email: "", contact_phone: "", status: "NEW" }); setIsAddModalOpen(true); }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#007BFF] to-[#00B388] rounded-xl text-sm font-bold text-white hover:opacity-90 shadow-lg shadow-[#007BFF]/20 transition-all duration-300"
          >
            <Plus className="w-5 h-5" /> Add Lead
          </button>
        </motion.div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {leads.length === 0 ? (
          <div className="col-span-full py-24 flex flex-col items-center justify-center bg-white/60 backdrop-blur-xl rounded-3xl shadow-sm border border-white/60">
            <div className="w-24 h-24 rounded-full bg-[#007BFF]/10 flex items-center justify-center mb-6 border border-[#007BFF]/20 shadow-[0_0_30px_rgba(0,123,255,0.15)]">
              <TrendingUp className="w-10 h-10 text-[#007BFF]" />
            </div>
            <p className="text-[#042B6B] font-black text-2xl tracking-tight">No leads found.</p>
            <p className="text-[#2F3440] opacity-60 font-semibold mt-2 text-center max-w-sm">Your sales pipeline is empty. Click "Add Lead" to start tracking new opportunities.</p>
          </div>
        ) : (
          leads.map((lead, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              key={lead.id} 
              className="group relative bg-white/60 backdrop-blur-xl p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#007BFF]/0 to-[#00B388]/0 group-hover:from-[#007BFF]/5 group-hover:to-[#00B388]/5 transition-all duration-500 pointer-events-none" />

              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="p-3 bg-white/80 backdrop-blur-sm text-[#007BFF] rounded-2xl border border-[#007BFF]/20 shadow-[0_0_20px_rgba(0,123,255,0.1)] group-hover:scale-110 transition-transform">
                  <Building2 className="w-6 h-6" />
                </div>
                {getStatusBadge(lead.status)}
              </div>
              
              <h3 className="text-xl font-black text-[#042B6B] mb-1 relative z-10 group-hover:text-[#007BFF] transition-colors">{lead.company_name}</h3>
              <p className="text-[13px] text-[#042B6B] opacity-70 font-bold mb-5 flex items-center gap-1.5 relative z-10">
                <User className="w-3.5 h-3.5" /> {lead.contact_name}
              </p>
              
              <div className="space-y-3 mb-6 flex-1 relative z-10">
                <div className="flex items-center gap-3 text-[13px] text-[#2F3440] font-bold bg-white/50 backdrop-blur-sm shadow-sm border border-gray-100 p-2.5 rounded-xl">
                  <Mail className="w-4 h-4 text-[#007BFF]" />
                  <span className="truncate">{lead.contact_email}</span>
                </div>
                {lead.contact_phone && (
                  <div className="flex items-center gap-3 text-[13px] text-[#2F3440] font-bold bg-white/50 backdrop-blur-sm shadow-sm border border-gray-100 p-2.5 rounded-xl">
                    <Phone className="w-4 h-4 text-[#00B388]" />
                    <span>{lead.contact_phone}</span>
                  </div>
                )}
              </div>
              
              <div className="pt-5 border-t border-gray-200/50 flex items-center justify-between mt-auto relative z-10">
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">ID: {lead.id.substring(0, 8)}</p>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEditModal(lead)} className="p-2.5 bg-white/50 backdrop-blur-md shadow-sm border border-gray-100 hover:border-[#007BFF]/30 hover:bg-[#007BFF]/10 text-gray-400 hover:text-[#007BFF] rounded-xl transition-all">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(lead.id)} className="p-2.5 bg-white/50 backdrop-blur-md shadow-sm border border-gray-100 hover:border-red-500/30 hover:bg-red-500/10 text-gray-400 hover:text-red-500 rounded-xl transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Add Lead Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Lead">
        <form onSubmit={handleAddSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-black text-[#042B6B] uppercase tracking-wider mb-2">Company Name</label>
            <input type="text" required value={formData.company_name} onChange={e => setFormData({...formData, company_name: e.target.value})} className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-[#007BFF] focus:ring-4 focus:ring-[#007BFF]/10 outline-none bg-white/50 backdrop-blur-sm transition-all font-medium text-[#2F3440]" />
          </div>
          <div>
            <label className="block text-xs font-black text-[#042B6B] uppercase tracking-wider mb-2">Contact Person</label>
            <input type="text" required value={formData.contact_name} onChange={e => setFormData({...formData, contact_name: e.target.value})} className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-[#007BFF] focus:ring-4 focus:ring-[#007BFF]/10 outline-none bg-white/50 backdrop-blur-sm transition-all font-medium text-[#2F3440]" />
          </div>
          <div>
            <label className="block text-xs font-black text-[#042B6B] uppercase tracking-wider mb-2">Contact Email</label>
            <input type="email" required value={formData.contact_email} onChange={e => setFormData({...formData, contact_email: e.target.value})} className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-[#007BFF] focus:ring-4 focus:ring-[#007BFF]/10 outline-none bg-white/50 backdrop-blur-sm transition-all font-medium text-[#2F3440]" />
          </div>
          <div>
            <label className="block text-xs font-black text-[#042B6B] uppercase tracking-wider mb-2">Contact Phone</label>
            <input type="text" value={formData.contact_phone} onChange={e => setFormData({...formData, contact_phone: e.target.value})} className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-[#007BFF] focus:ring-4 focus:ring-[#007BFF]/10 outline-none bg-white/50 backdrop-blur-sm transition-all font-medium text-[#2F3440]" />
          </div>
          <div>
            <label className="block text-xs font-black text-[#042B6B] uppercase tracking-wider mb-2">Status</label>
            <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-[#007BFF] focus:ring-4 focus:ring-[#007BFF]/10 outline-none bg-white/50 backdrop-blur-sm transition-all font-medium text-[#2F3440]">
              <option value="NEW">New</option>
              <option value="CONTACTED">Contacted</option>
              <option value="QUALIFIED">Qualified</option>
              <option value="LOST">Lost</option>
            </select>
          </div>
          <button disabled={isCreating} type="submit" className="w-full py-4 mt-6 bg-gradient-to-r from-[#007BFF] to-[#00B388] text-white font-black uppercase tracking-widest text-sm rounded-2xl hover:opacity-90 shadow-lg shadow-[#007BFF]/20 transition-all duration-300 disabled:opacity-50">
            {isCreating ? "Processing..." : "Add Lead"}
          </button>
        </form>
      </Modal>

      {/* Edit Lead Status Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title={`Update Lead: ${selectedLead?.company_name}`}>
        <form onSubmit={handleEditSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-black text-[#042B6B] uppercase tracking-wider mb-2">New Status</label>
            <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-[#007BFF] focus:ring-4 focus:ring-[#007BFF]/10 outline-none bg-white/50 backdrop-blur-sm transition-all font-medium text-[#2F3440]">
              <option value="NEW">New</option>
              <option value="CONTACTED">Contacted</option>
              <option value="QUALIFIED">Qualified</option>
              <option value="LOST">Lost</option>
            </select>
          </div>
          <button disabled={isUpdating} type="submit" className="w-full py-4 mt-6 bg-gradient-to-r from-[#007BFF] to-[#00B388] text-white font-black uppercase tracking-widest text-sm rounded-2xl hover:opacity-90 shadow-lg shadow-[#007BFF]/20 transition-all duration-300 disabled:opacity-50">
            {isUpdating ? "Updating..." : "Update Status"}
          </button>
        </form>
      </Modal>

    </div>
  );
}
