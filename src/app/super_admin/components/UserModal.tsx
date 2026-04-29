import React, { useState, useEffect } from 'react';
import { X, Shield, Lock, Users, UserCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../../services/api';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  user?: any; // If provided, we are editing
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, onSave, user }) => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    password: '',
    role: 'USER',
    is_active: true
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name || '',
        email: user.email || '',
        phone: user.phone || '',
        password: '', // Don't show password
        role: user.role || 'USER',
        is_active: user.is_active ?? true
      });
    } else {
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        password: '',
        role: 'USER',
        is_active: true
      });
    }
  }, [user, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (user) {
        // Update
        const updateData: any = { ...formData };
        if (!updateData.password) delete updateData.password;
        await api.put(`/users/${user.id}`, updateData);
        toast.success('User updated successfully');
      } else {
        // Create
        await api.post('/users/', formData);
        toast.success('User created successfully');
      }
      onSave();
      onClose();
    } catch (error: any) {
      toast.error(error.response?.data?.detail || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200">
        <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
          <div>
            <h2 className="text-xl font-black text-slate-900">{user ? 'Modify User Profile' : 'Register New Personnel'}</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Master Authorization Hub</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200/50 rounded-xl transition-colors text-slate-400">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5 col-span-2">
              <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider ml-1">Full Name</label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-bold"
              />
            </div>

            <div className="space-y-1.5 col-span-2 sm:col-span-1">
              <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider ml-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={!!user}
                placeholder="john@example.com"
                className={`w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-bold ${user ? 'opacity-60' : ''}`}
              />
            </div>

            <div className="space-y-1.5 col-span-2 sm:col-span-1">
              <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider ml-1">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 9876543210"
                className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-bold"
              />
            </div>

            <div className="space-y-1.5 col-span-2 sm:col-span-1">
              <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider ml-1">Access Role</label>
              <div className="relative">
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-bold appearance-none"
                >
                  <option value="USER">Standard User</option>
                  <option value="ADMIN">Administrator</option>
                  <option value="AGENT">Insurance Agent</option>
                  <option value="CSR">Support (CSR)</option>
                  <option value="SUPER_ADMIN">Super Admin</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <ChevronDown size={16} />
                </div>
              </div>
            </div>

            <div className="space-y-1.5 col-span-2 sm:col-span-1">
              <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider ml-1">Account Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required={!user}
                placeholder={user ? "Leave blank to keep" : "••••••••"}
                className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-bold"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
             <div className="flex items-center h-5">
               <input
                 type="checkbox"
                 name="is_active"
                 checked={formData.is_active}
                 onChange={handleChange}
                 className="w-5 h-5 text-indigo-600 border-slate-300 rounded-lg focus:ring-indigo-500"
               />
             </div>
             <div className="ml-2 text-sm">
               <label className="font-bold text-slate-700">Set Account as Active</label>
               <p className="text-[10px] text-slate-500 font-medium">Active users can access the platform based on their roles</p>
             </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-4 border border-slate-200 text-slate-600 rounded-2xl text-sm font-bold hover:bg-slate-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-4 bg-indigo-600 text-white rounded-2xl text-sm font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                user ? 'Update Profile' : 'Authorize User'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ChevronDown = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
);

export default UserModal;
