"use client";
/* eslint-disable */


import { useState } from "react";
import { useUsers, useCreateUser, useUpdateUser, useDeleteUser } from "@/services/queries";
import { MoreHorizontal, ShieldAlert, Search, Filter, Plus, ChevronDown, Download, Users as UsersIcon, Edit, Trash2, Key } from "lucide-react";
import { motion } from "framer-motion";
import { Loader } from "@/components/ui/Loader";
import { Modal } from "@/components/ui/Modal";
import { User, Role } from "@/types";
import { toast } from "sonner";

export default function UsersPage() {
  const { data: users, isLoading, error } = useUsers();
  
  const { mutate: createUser, isPending: isCreating } = useCreateUser();
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  // Form States
  const [formData, setFormData] = useState({ name: "", email: "", role: "CLIENT", password: "", is_active: true });
  const [passwordForm, setPasswordForm] = useState({ password: "" });

  if (isLoading) {
    return (
      <div className="h-[600px] flex items-center justify-center">
        <Loader message="Loading users..." />
      </div>
    );
  }

  if (error || !users) {
    return (
      <div className="flex items-center justify-center h-64 bg-white/60 backdrop-blur-lg rounded-3xl shadow-xl text-red-500 font-bold border border-red-500/20 p-6">
        <div className="flex flex-col items-center gap-3">
          <UsersIcon className="w-10 h-10 text-red-500" />
          <span>Failed to load users. You might not have the correct permissions.</span>
        </div>
      </div>
    );
  }

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createUser(formData, {
      onSuccess: () => {
        toast.success("User successfully created!");
        setIsAddModalOpen(false);
        setFormData({ name: "", email: "", role: "CLIENT", password: "", is_active: true });
      },
      onError: (err: any) => {
        toast.error(err.response?.data?.detail || "Failed to create user");
      }
    });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    
    updateUser({ id: selectedUser.id, name: formData.name, email: formData.email, role: formData.role, is_active: formData.is_active }, {
      onSuccess: () => {
        toast.success("User updated successfully!");
        setIsEditModalOpen(false);
      },
      onError: (err: any) => {
        toast.error(err.response?.data?.detail || "Failed to update user");
      }
    });
  };

  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    
    updateUser({ id: selectedUser.id, password: passwordForm.password }, {
      onSuccess: () => {
        toast.success("User password updated successfully!");
        setIsPasswordModalOpen(false);
        setPasswordForm({ password: "" });
      },
      onError: (err: any) => {
        toast.error(err.response?.data?.detail || "Failed to update password");
      }
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to permanently delete this user?")) {
      deleteUser(id, {
        onSuccess: () => toast.success("User deleted successfully"),
        onError: () => toast.error("Failed to delete user")
      });
    }
  };

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setFormData({ name: user.name, email: user.email, role: user.role, is_active: user.is_active, password: "" });
    setIsEditModalOpen(true);
  };

  const openPasswordModal = (user: User) => {
    setSelectedUser(user);
    setPasswordForm({ password: "" });
    setIsPasswordModalOpen(true);
  };

  const getRoleBadge = (role: string) => {
    const styles: Record<string, string> = {
      "SUPER_ADMIN": "bg-gradient-to-r from-[#042B6B] to-[#007BFF] text-white border-transparent shadow-lg shadow-[#007BFF]/20",
      "ADMIN": "bg-[#007BFF]/10 text-[#007BFF] border-[#007BFF]/20 shadow-[#007BFF]/10",
      "RECRUITER": "bg-[#00B388]/10 text-[#00B388] border-[#00B388]/20 shadow-[#00B388]/10",
      "CLIENT": "bg-[#2F3440]/10 text-[#2F3440] border-[#2F3440]/20 shadow-gray-200/10",
    };
    const labels: Record<string, string> = {
      "SUPER_ADMIN": "Super Admin",
      "ADMIN": "Admin",
      "RECRUITER": "Recruiter",
      "CLIENT": "Client",
    };
    const style = styles[role] || "bg-gray-100 text-gray-600 border-gray-200";
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border shadow-sm backdrop-blur-sm ${style}`}>
        {role === "SUPER_ADMIN" && <ShieldAlert className="w-3.5 h-3.5" />}
        {labels[role] || role}
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
            User Management
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[#2F3440] mt-2 font-semibold opacity-70 text-lg"
          >
            Manage platform accounts, roles, and permissions.
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
            onClick={() => { setFormData({ name: "", email: "", role: "CLIENT", password: "", is_active: true }); setIsAddModalOpen(true); }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#007BFF] to-[#00B388] rounded-xl text-sm font-bold text-white hover:opacity-90 shadow-lg shadow-[#007BFF]/20 transition-all duration-300"
          >
            <Plus className="w-5 h-5" /> Invite User
          </button>
        </motion.div>
      </div>

      {/* Table Card Wrapper - Glassmorphic */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 overflow-hidden"
      >
        <div className="p-6 border-b border-white/60 flex flex-col md:flex-row justify-between gap-4 bg-white/40">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#042B6B] opacity-50" />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              className="w-full pl-12 pr-4 py-3 bg-white/80 border border-white/60 rounded-xl shadow-sm text-sm font-bold text-[#2F3440] outline-none focus:border-[#007BFF] focus:ring-4 focus:ring-[#007BFF]/10 transition-all placeholder:font-medium"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/60 bg-white/30 backdrop-blur-md">
                <th className="px-8 py-5 text-[11px] font-black text-[#042B6B] uppercase tracking-[0.15em] opacity-80">User Details</th>
                <th className="px-8 py-5 text-[11px] font-black text-[#042B6B] uppercase tracking-[0.15em] opacity-80">Email Address</th>
                <th className="px-8 py-5 text-[11px] font-black text-[#042B6B] uppercase tracking-[0.15em] opacity-80">Role</th>
                <th className="px-8 py-5 text-[11px] font-black text-[#042B6B] uppercase tracking-[0.15em] opacity-80">Status</th>
                <th className="px-8 py-5 text-[11px] font-black text-[#042B6B] uppercase tracking-[0.15em] opacity-80 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-24 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-[#007BFF]/10 flex items-center justify-center mb-4 border border-[#007BFF]/20">
                        <UsersIcon className="w-10 h-10 text-[#007BFF]" />
                      </div>
                      <p className="text-[#042B6B] font-black text-xl">No users found.</p>
                      <p className="text-[#2F3440] font-semibold opacity-60 mt-1">There are no users matching your criteria.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                users.map((user, i) => (
                  <motion.tr 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    key={user.id} 
                    className="group border-b border-white/40 hover:bg-white/60 transition-colors"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#042B6B] to-[#007BFF] flex items-center justify-center font-black text-white shadow-lg border border-white/20">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-black text-[#042B6B] text-[15px] group-hover:text-[#007BFF] transition-colors tracking-tight">{user.name}</p>
                          <p className="text-[11px] text-[#2F3440] font-bold opacity-50 uppercase tracking-widest mt-0.5">ID: {user.id.substring(0, 8)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <p className="text-[14px] text-[#2F3440] font-bold opacity-80">{user.email}</p>
                    </td>
                    <td className="px-8 py-5">
                      {getRoleBadge(user.role)}
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <div className={`w-2.5 h-2.5 rounded-full ${user.is_active ? "bg-[#00B388] shadow-[0_0_10px_rgba(0,179,136,0.5)]" : "bg-gray-400"}`} />
                        <span className={`text-[12px] font-black uppercase tracking-wider ${user.is_active ? "text-[#00B388]" : "text-gray-500"}`}>
                          {user.is_active ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => openPasswordModal(user)} className="p-2.5 bg-white/50 backdrop-blur-md shadow-sm border border-gray-100 hover:border-amber-500/30 hover:bg-amber-500/10 text-gray-400 hover:text-amber-500 rounded-xl transition-all" title="Change Password">
                          <Key className="w-4 h-4" />
                        </button>
                        <button onClick={() => openEditModal(user)} className="p-2.5 bg-white/50 backdrop-blur-md shadow-sm border border-gray-100 hover:border-[#007BFF]/30 hover:bg-[#007BFF]/10 text-gray-400 hover:text-[#007BFF] rounded-xl transition-all" title="Edit User">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(user.id)} className="p-2.5 bg-white/50 backdrop-blur-md shadow-sm border border-gray-100 hover:border-red-500/30 hover:bg-red-500/10 text-gray-400 hover:text-red-500 rounded-xl transition-all" title="Delete User">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Add User Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Invite New User">
        <form onSubmit={handleAddSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-black text-[#042B6B] uppercase tracking-wider mb-2">Full Name</label>
            <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-[#007BFF] focus:ring-4 focus:ring-[#007BFF]/10 outline-none bg-white/50 backdrop-blur-sm transition-all font-medium text-[#2F3440]" placeholder="John Doe" />
          </div>
          <div>
            <label className="block text-xs font-black text-[#042B6B] uppercase tracking-wider mb-2">Email Address</label>
            <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-[#007BFF] focus:ring-4 focus:ring-[#007BFF]/10 outline-none bg-white/50 backdrop-blur-sm transition-all font-medium text-[#2F3440]" placeholder="john@example.com" />
          </div>
          <div>
            <label className="block text-xs font-black text-[#042B6B] uppercase tracking-wider mb-2">Password</label>
            <input type="password" required minLength={8} value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-[#007BFF] focus:ring-4 focus:ring-[#007BFF]/10 outline-none bg-white/50 backdrop-blur-sm transition-all font-medium text-[#2F3440]" placeholder="••••••••" />
          </div>
          <div>
            <label className="block text-xs font-black text-[#042B6B] uppercase tracking-wider mb-2">Role</label>
            <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value as Role})} className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-[#007BFF] focus:ring-4 focus:ring-[#007BFF]/10 outline-none bg-white/50 backdrop-blur-sm transition-all font-medium text-[#2F3440]">
              <option value="SUPER_ADMIN">Super Admin</option>
              <option value="ADMIN">Admin</option>
              <option value="RECRUITER">Recruiter</option>
              <option value="CLIENT">Client</option>
            </select>
          </div>
          <button disabled={isCreating} type="submit" className="w-full py-4 mt-6 bg-gradient-to-r from-[#007BFF] to-[#00B388] text-white font-black uppercase tracking-widest text-sm rounded-2xl hover:opacity-90 shadow-lg shadow-[#007BFF]/20 transition-all duration-300 disabled:opacity-50">
            {isCreating ? "Processing..." : "Create User"}
          </button>
        </form>
      </Modal>

      {/* Edit User Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit User Profile">
        <form onSubmit={handleEditSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-black text-[#042B6B] uppercase tracking-wider mb-2">Full Name</label>
            <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-[#007BFF] focus:ring-4 focus:ring-[#007BFF]/10 outline-none bg-white/50 backdrop-blur-sm transition-all font-medium text-[#2F3440]" />
          </div>
          <div>
            <label className="block text-xs font-black text-[#042B6B] uppercase tracking-wider mb-2">Email Address</label>
            <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-[#007BFF] focus:ring-4 focus:ring-[#007BFF]/10 outline-none bg-white/50 backdrop-blur-sm transition-all font-medium text-[#2F3440]" />
          </div>
          <div>
            <label className="block text-xs font-black text-[#042B6B] uppercase tracking-wider mb-2">Role</label>
            <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value as Role})} className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-[#007BFF] focus:ring-4 focus:ring-[#007BFF]/10 outline-none bg-white/50 backdrop-blur-sm transition-all font-medium text-[#2F3440]">
              <option value="SUPER_ADMIN">Super Admin</option>
              <option value="ADMIN">Admin</option>
              <option value="RECRUITER">Recruiter</option>
              <option value="CLIENT">Client</option>
            </select>
          </div>
          <label className="flex items-center gap-3 py-2 cursor-pointer group">
            <input type="checkbox" checked={formData.is_active} onChange={e => setFormData({...formData, is_active: e.target.checked})} className="w-5 h-5 rounded text-[#00B388] focus:ring-[#00B388] border-gray-300" />
            <span className="text-sm font-black text-[#042B6B] group-hover:text-[#00B388] transition-colors">Account Active</span>
          </label>
          <button disabled={isUpdating} type="submit" className="w-full py-4 mt-6 bg-gradient-to-r from-[#007BFF] to-[#00B388] text-white font-black uppercase tracking-widest text-sm rounded-2xl hover:opacity-90 shadow-lg shadow-[#007BFF]/20 transition-all duration-300 disabled:opacity-50">
            {isUpdating ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </Modal>

      {/* Change Password Modal */}
      <Modal isOpen={isPasswordModalOpen} onClose={() => setIsPasswordModalOpen(false)} title={`Change Password: ${selectedUser?.name}`}>
        <form onSubmit={handleChangePasswordSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-black text-[#042B6B] uppercase tracking-wider mb-2">New Password</label>
            <input type="password" required minLength={8} value={passwordForm.password} onChange={e => setPasswordForm({password: e.target.value})} className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 outline-none bg-white/50 backdrop-blur-sm transition-all font-medium text-[#2F3440]" placeholder="Enter new password (min 8 chars)" />
          </div>
          <button disabled={isUpdating} type="submit" className="w-full py-4 mt-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black uppercase tracking-widest text-sm rounded-2xl hover:opacity-90 shadow-lg shadow-amber-500/20 transition-all duration-300 disabled:opacity-50">
            {isUpdating ? "Updating..." : "Update Password"}
          </button>
        </form>
      </Modal>

    </div>
  );
}
