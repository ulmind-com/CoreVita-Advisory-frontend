"use client";

import { useState } from "react";
import { useInvoices, useCreateInvoice, useUpdateInvoice, useDeleteInvoice, useCompanies } from "@/services/queries";
import { Download, IndianRupee, FileText, Search, Filter, Plus, ChevronDown, Receipt, Building2, Edit, Trash2 } from "lucide-react";
import { Invoice } from "@/types";
import { motion } from "framer-motion";
import { Loader } from "@/components/ui/Loader";
import { Modal } from "@/components/ui/Modal";
import { toast } from "sonner";

export default function BillingPage() {
  const { data: invoices, isLoading: isBillingLoading, error } = useInvoices();
  const { data: companies, isLoading: isCompaniesLoading } = useCompanies();
  
  const { mutate: createInvoice, isPending: isCreating } = useCreateInvoice();
  const { mutate: updateInvoice, isPending: isUpdating } = useUpdateInvoice();
  const { mutate: deleteInvoice, isPending: isDeleting } = useDeleteInvoice();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const [formData, setFormData] = useState({
    invoice_number: "", company_id: "", amount: 0, due_date: "", status: "PENDING"
  });

  if (isBillingLoading || isCompaniesLoading) {
    return (
      <div className="h-[600px] flex items-center justify-center">
        <Loader message="Loading financial records..." />
      </div>
    );
  }

  if (error || !invoices) {
    return (
      <div className="flex items-center justify-center h-64 bg-white/60 backdrop-blur-lg rounded-3xl shadow-xl text-red-500 font-bold border border-red-500/20 p-6">
        <div className="flex flex-col items-center gap-3">
          <Receipt className="w-10 h-10 text-red-500" />
          <span>Failed to load billing records. Ensure backend is running.</span>
        </div>
      </div>
    );
  }

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createInvoice(formData, {
      onSuccess: () => {
        toast.success("Invoice generated successfully!");
        setIsAddModalOpen(false);
        setFormData({ invoice_number: "", company_id: "", amount: 0, due_date: "", status: "PENDING" });
      },
      onError: () => toast.error("Failed to generate invoice.")
    });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInvoice) return;
    updateInvoice({ id: selectedInvoice.id, status: formData.status }, {
      onSuccess: () => {
        toast.success("Invoice updated successfully!");
        setIsEditModalOpen(false);
      },
      onError: () => toast.error("Failed to update invoice.")
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this invoice?")) {
      deleteInvoice(id, {
        onSuccess: () => toast.success("Invoice deleted successfully!"),
        onError: () => toast.error("Failed to delete invoice.")
      });
    }
  };

  const openEditModal = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setFormData({ 
      invoice_number: invoice.invoice_number, 
      company_id: invoice.company_id, 
      amount: invoice.amount, 
      due_date: new Date(invoice.due_date).toISOString().split('T')[0], 
      status: invoice.status 
    });
    setIsEditModalOpen(true);
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      "PAID": "bg-[#00B388]/10 text-[#00B388] border-[#00B388]/20 shadow-[#00B388]/10",
      "PENDING": "bg-amber-500/10 text-amber-600 border-amber-500/20 shadow-amber-500/10",
      "OVERDUE": "bg-red-500/10 text-red-600 border-red-500/20 shadow-red-500/10",
    };
    return (
      <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] shadow-sm backdrop-blur-sm border ${styles[status] || "bg-gray-100/50 text-gray-500 border-gray-200/50 shadow-gray-200/10"}`}>
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
            Billing & Revenue
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[#2F3440] mt-2 font-semibold opacity-70 text-lg"
          >
            Manage invoices, payments, and financial reports.
          </motion.p>
        </div>
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <button className="flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-md border border-white/60 rounded-xl text-sm font-bold text-[#042B6B] hover:bg-white shadow-sm hover:shadow-md transition-all duration-300">
            <Filter className="w-4 h-4 text-[#042B6B]" /> Filter
          </button>
          <button 
            onClick={() => { setFormData({ invoice_number: `INV-${Date.now().toString().slice(-6)}`, company_id: "", amount: 0, due_date: "", status: "PENDING" }); setIsAddModalOpen(true); }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#007BFF] to-[#00B388] rounded-xl text-sm font-bold text-white hover:opacity-90 shadow-lg shadow-[#007BFF]/20 transition-all duration-300"
          >
            <Plus className="w-5 h-5" /> Generate Invoice
          </button>
        </motion.div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {invoices.length === 0 ? (
          <div className="col-span-full py-24 flex flex-col items-center justify-center bg-white/60 backdrop-blur-xl rounded-3xl shadow-sm border border-white/60">
            <div className="w-24 h-24 rounded-full bg-[#00B388]/10 flex items-center justify-center mb-6 border border-[#00B388]/20 shadow-[0_0_30px_rgba(0,179,136,0.15)]">
              <Receipt className="w-10 h-10 text-[#00B388]" />
            </div>
            <p className="text-[#042B6B] font-black text-2xl tracking-tight">No invoices found.</p>
            <p className="text-[#2F3440] opacity-60 font-semibold mt-2 text-center max-w-sm">No financial records generated yet. Click "Generate Invoice" to create one.</p>
          </div>
        ) : (
          invoices.map((invoice, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              key={invoice.id} 
              className="group relative bg-white/60 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Decorative background element */}
              <div className="absolute -right-12 -top-12 w-40 h-40 bg-gradient-to-br from-[#00B388]/5 to-transparent rounded-full blur-2xl group-hover:from-[#00B388]/10 transition-colors pointer-events-none" />
              
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-[#007BFF]" />
                    <span className="text-[11px] font-black text-[#042B6B] uppercase tracking-[0.15em]">{invoice.invoice_number}</span>
                  </div>
                  <h3 className="text-3xl font-black text-[#042B6B] flex items-center tracking-tight group-hover:text-[#00B388] transition-colors">
                    <IndianRupee className="w-6 h-6 mr-0.5 opacity-80" />
                    {invoice.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </h3>
                </div>
                {getStatusBadge(invoice.status)}
              </div>
              
              <div className="space-y-4 mb-8 relative z-10">
                <div className="flex items-center justify-between p-3.5 bg-white/50 backdrop-blur-sm shadow-sm border border-gray-100 rounded-xl hover:bg-white transition-colors cursor-pointer group/link">
                  <div className="flex items-center gap-3 text-[13px] text-[#2F3440] font-bold">
                    <Building2 className="w-4 h-4 text-[#007BFF]" />
                    Company
                  </div>
                  <span className="font-black text-[#042B6B] text-[13px] group-hover/link:text-[#007BFF] transition-colors truncate max-w-[120px]">{getCompanyName(invoice.company_id)}</span>
                </div>
                
                <div className="flex items-center justify-between p-3.5 bg-white/50 backdrop-blur-sm shadow-sm border border-gray-100 rounded-xl">
                  <div className="flex items-center gap-3 text-[13px] text-[#2F3440] font-bold">
                    <Receipt className="w-4 h-4 text-[#00B388]" />
                    Due Date
                  </div>
                  <span className="font-black text-[#042B6B] text-[13px]">
                    {new Date(invoice.due_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </div>
              
              <div className="pt-5 border-t border-gray-200/50 flex items-center justify-between mt-auto relative z-10">
                <button className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-[#00B388] hover:text-[#042B6B] transition-colors">
                  <Download className="w-3.5 h-3.5" /> Download PDF
                </button>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEditModal(invoice)} className="p-2.5 bg-white/50 backdrop-blur-md shadow-sm border border-gray-100 hover:border-[#007BFF]/30 hover:bg-[#007BFF]/10 text-gray-400 hover:text-[#007BFF] rounded-xl transition-all">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(invoice.id)} className="p-2.5 bg-white/50 backdrop-blur-md shadow-sm border border-gray-100 hover:border-red-500/30 hover:bg-red-500/10 text-gray-400 hover:text-red-500 rounded-xl transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Add Invoice Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Generate Invoice">
        <form onSubmit={handleAddSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-black text-[#042B6B] uppercase tracking-wider mb-2">Invoice Number</label>
            <input type="text" required value={formData.invoice_number} onChange={e => setFormData({...formData, invoice_number: e.target.value})} className="w-full px-5 py-3 rounded-2xl border border-gray-200 bg-gray-50 outline-none text-gray-500 font-medium" readOnly />
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
            <label className="block text-xs font-black text-[#042B6B] uppercase tracking-wider mb-2">Amount (₹)</label>
            <input type="number" step="0.01" required value={formData.amount} onChange={e => setFormData({...formData, amount: parseFloat(e.target.value)})} className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-[#007BFF] focus:ring-4 focus:ring-[#007BFF]/10 outline-none bg-white/50 backdrop-blur-sm transition-all font-medium text-[#2F3440]" />
          </div>
          <div>
            <label className="block text-xs font-black text-[#042B6B] uppercase tracking-wider mb-2">Due Date</label>
            <input type="datetime-local" required value={formData.due_date} onChange={e => setFormData({...formData, due_date: e.target.value})} className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-[#007BFF] focus:ring-4 focus:ring-[#007BFF]/10 outline-none bg-white/50 backdrop-blur-sm transition-all font-medium text-[#2F3440]" />
          </div>
          <button disabled={isCreating} type="submit" className="w-full py-4 mt-6 bg-gradient-to-r from-[#007BFF] to-[#00B388] text-white font-black uppercase tracking-widest text-sm rounded-2xl hover:opacity-90 shadow-lg shadow-[#007BFF]/20 transition-all duration-300 disabled:opacity-50">
            {isCreating ? "Generating..." : "Generate Invoice"}
          </button>
        </form>
      </Modal>

      {/* Edit Invoice Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Update Invoice Status">
        <form onSubmit={handleEditSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-black text-[#042B6B] uppercase tracking-wider mb-2">Status</label>
            <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-[#007BFF] focus:ring-4 focus:ring-[#007BFF]/10 outline-none bg-white/50 backdrop-blur-sm transition-all font-medium text-[#2F3440]">
              <option value="PENDING">Pending</option>
              <option value="PAID">Paid</option>
              <option value="OVERDUE">Overdue</option>
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
