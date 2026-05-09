import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  Trash2, 
  Edit3,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Eye,
  ShieldCheck as ShieldIcon,
  Phone,
  Mail,
  Zap,
  ArrowLeft,
  MapPinIcon,
  Briefcase,
  Star,
  Settings,
  HeartPulse
} from 'lucide-react';
import api from '../../../services/api';
import toast from 'react-hot-toast';
import UserModal from '../components/UserModal';

interface UserManagementProps {
  viewType?: 'staff' | 'customers' | 'all';
}

const UserProfileContent = ({ user, onBack }: any) => {
  const [userPolicies, setUserPolicies] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
       const mockData = [
         { id: 'POL-8829', type: 'Life Insurance', premium: '₹12,400', due: '2026-05-12', status: 'Active', icon: ShieldIcon, theme: 'indigo' },
         { id: 'POL-8828', type: 'Health Insurance', premium: '₹8,200', due: '2026-06-15', status: 'Renewal Due', icon: HeartPulse, theme: 'indigo' },
       ];
       setUserPolicies(mockData);
    }
  }, [user]);

  if (!user) return null;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
       {/* Breadcrumb Bar */}
       <div className="flex items-center justify-between bg-white/60 backdrop-blur-md p-4 rounded-[24px] border border-slate-100 shadow-sm">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-indigo-600 transition-all uppercase tracking-[0.2em]"
          >
             <ArrowLeft size={16} /> Back to Customer List
          </button>
       </div>

       {user.role === 'USER' ? (
          /* High-Fidelity Customer Profile (Exact replica of Rajesh Kumar style) */
          <div className="bg-white rounded-[40px] border border-slate-100 shadow-2xl overflow-hidden min-h-[70vh]">
             {/* Compact Banner Identity */}
             <div className="h-32 bg-slate-900 p-6 flex items-end relative overflow-hidden shrink-0">
                <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-[80px] -mr-32 -mt-32"></div>
                <div className="flex items-center gap-5 relative z-10 translate-y-8 ml-4">
                   <div className="w-24 h-24 rounded-[32px] bg-white p-1.5 shadow-2xl border border-slate-50">
                      <div className="w-full h-full rounded-[24px] bg-indigo-50 flex items-center justify-center text-indigo-600 font-black text-2xl">
                         {user.full_name?.split(' ').map((n: any) => n[0]).join('')}
                      </div>
                   </div>
                   <div className="pb-2">
                      <h2 className="text-xl font-black text-white tracking-tight mb-1">{user.full_name}</h2>
                      <div className="flex items-center gap-2.5">
                         <span className="px-2.5 py-1 bg-emerald-500 text-white rounded-lg text-[8px] font-black uppercase tracking-widest shadow-sm">Active</span>
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">CU-{user.id}</span>
                      </div>
                   </div>
                </div>
             </div>

             <div className="pt-16 px-8 pb-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                   {/* Left Column: Compact Contact & Status (Span 4) */}
                   <div className="lg:col-span-4 space-y-8">
                      <div>
                         <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Contact Information</h4>
                         <div className="space-y-4">
                            <div className="flex items-center gap-3.5 group">
                               <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400">
                                  <Phone size={18} />
                               </div>
                               <div>
                                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Mobile Number</p>
                                  <p className="text-sm font-black text-slate-800">{user.phone_number || '+91 98XXX XXXXX'}</p>
                               </div>
                            </div>
                            <div className="flex items-center gap-3.5 group">
                               <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400">
                                  <Mail size={18} />
                               </div>
                               <div>
                                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Email Address</p>
                                  <p className="text-sm font-black text-slate-800 lowercase">{user.email}</p>
                               </div>
                            </div>
                         </div>
                      </div>

                      {/* Compact Relationship Status Card */}
                      <div className="p-6 bg-slate-900 rounded-[32px] text-white shadow-xl relative overflow-hidden">
                         <p className="text-[9px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-4">Relationship Status</p>
                         <div className="space-y-3">
                            <div className="flex items-center justify-between pb-3 border-b border-white/5">
                               <span className="text-[10px] font-bold text-slate-400">Since</span>
                               <span className="text-xs font-black text-white">2024-01-15</span>
                            </div>
                            <div className="flex items-center justify-between">
                               <span className="text-[10px] font-bold text-slate-400">Value</span>
                               <span className="text-xs font-black text-white">₹2,45,000</span>
                            </div>
                         </div>
                      </div>
                   </div>

                   {/* Right Column: Compact Portfolio (Span 8) */}
                   <div className="lg:col-span-8 space-y-6">
                      <div className="flex items-center justify-between">
                         <h4 className="text-lg font-black text-slate-900 tracking-tight">Active Insurance Portfolio</h4>
                         <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{userPolicies.length} Total</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         {userPolicies.map((policy) => (
                           <div key={policy.id} className="p-4 bg-white border border-slate-100 rounded-[24px] shadow-sm hover:shadow-md transition-all group">
                              <div className="flex justify-between items-start mb-4">
                                 <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                    <policy.icon size={20} />
                                 </div>
                                 <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest ${
                                   policy.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                                 }`}>
                                   {policy.status}
                                 </span>
                              </div>
                              <div className="mb-4">
                                 <h5 className="text-sm font-black text-slate-800 mb-0.5">{policy.type}</h5>
                                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{policy.id}</p>
                              </div>
                              <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                                 <div>
                                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Premium</p>
                                    <p className="text-xs font-black text-slate-800">{policy.premium}</p>
                                 </div>
                                 <div className="text-right">
                                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Renewal</p>
                                    <p className="text-xs font-black text-slate-800">{policy.due}</p>
                                 </div>
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
             </div>
          </div>
       ) : (
          /* Staff Profile ( advisor Style) */
          <div className="space-y-4">
             <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl overflow-hidden pb-6">
                <div className="h-28 bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] relative">
                   <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                </div>
                <div className="px-8 flex flex-wrap items-end justify-between -translate-y-8 gap-4">
                   <div className="flex items-end gap-6">
                      <div className="w-28 h-28 rounded-[32px] bg-white p-1.5 shadow-2xl relative">
                         <div className="w-full h-full rounded-[26px] bg-slate-50 flex items-center justify-center text-slate-400 font-black text-2xl border border-slate-100">
                            {user.full_name?.split(' ').map((n: any) => n[0]).join('')}
                         </div>
                         <div className="absolute bottom-1 right-1 w-6 h-6 bg-emerald-500 border-[3px] border-white rounded-full flex items-center justify-center shadow-lg">
                            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                         </div>
                      </div>
                      <div className="pb-1">
                         <div className="flex items-center gap-2.5 mb-1.5">
                            <h2 className="text-xl font-black text-slate-900 tracking-tight">{user.full_name}</h2>
                            <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-md text-[8px] font-black uppercase tracking-[0.15em] border border-indigo-100">
                               Verified Staff
                            </span>
                         </div>
                         <div className="flex flex-wrap items-center gap-4 text-slate-400">
                            <div className="flex items-center gap-1.5">
                               <MapPinIcon size={12} className="text-indigo-500" />
                               <span className="text-[10px] font-bold uppercase tracking-widest">Mumbai Central, MH</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                               <Briefcase size={12} className="text-indigo-500" />
                               <span className="text-[10px] font-bold uppercase tracking-widest">8+ Yrs Exp</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                               <Star size={12} className="text-amber-500 fill-amber-500" />
                               <span className="text-[10px] font-black text-slate-800 tracking-widest">4.9</span>
                            </div>
                         </div>
                      </div>
                   </div>
                   <div className="flex items-center gap-2 pb-1">
                      <button className="w-10 h-10 bg-white rounded-xl border border-slate-100 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:shadow-lg transition-all">
                         <Settings size={18} />
                      </button>
                   </div>
                </div>
             </div>
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
                   <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.15em] mb-5">Performance Snapshot</h4>
                   <div className="space-y-3">
                      {[
                         { label: 'Policies', value: '120', icon: ShieldIcon, color: 'indigo' },
                         { label: 'Clients', value: '95', icon: Users, color: 'blue' },
                         { label: 'Tier', value: user.role === 'USER' ? 'Customer' : user.role === 'SUPER_ADMIN' ? 'Admin' : user.role, icon: Zap, color: 'amber' },
                      ].map((stat, i) => (
                         <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-[24px] border border-slate-50 group hover:bg-white hover:shadow-md transition-all cursor-pointer">
                            <div className="w-10 h-10 rounded-xl bg-white text-indigo-600 flex items-center justify-center shadow-sm">
                               <stat.icon size={18} />
                            </div>
                            <div>
                               <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                               <p className="text-base font-black text-slate-900">{stat.value}</p>
                            </div>
                         </div>
                      ))}
                   </div>
                </div>
                <div className="lg:col-span-2 bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
                   <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.15em] mb-4">About {user.full_name?.split(' ')[0]}</h4>
                   <p className="text-xs font-bold text-slate-500 leading-relaxed mb-6">
                      Passionate insurance professional dedicated to helping families and businesses secure their future. Specialist in {user.role === 'USER' ? 'Portfolio Management' : user.role + ' operations'}.
                   </p>
                   <div className="grid grid-cols-2 gap-8">
                      <div>
                         <h5 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">Contact Information</h5>
                         <div className="space-y-3">
                            <div className="flex items-center gap-3">
                               <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                                  <Mail size={16} />
                               </div>
                               <p className="text-[11px] font-black text-slate-800">{user.email}</p>
                            </div>
                            <div className="flex items-center gap-3">
                               <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                                  <Phone size={16} />
                               </div>
                               <p className="text-[11px] font-black text-slate-800">{user.phone_number || '+91 98XXX XXXXX'}</p>
                            </div>
                         </div>
                      </div>
                      <div>
                         <h5 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">Regional Assignment</h5>
                         <div className="space-y-3">
                            <div className="flex items-center gap-3">
                               <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                                  <MapPinIcon size={16} />
                               </div>
                               <p className="text-[11px] font-black text-slate-800">Mumbai Central, MH</p>
                            </div>
                            <div className="flex items-center gap-3">
                               <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                                  <RefreshCw size={16} />
                               </div>
                               <p className="text-[11px] font-black text-slate-800">Joined {new Date(user.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       )}
    </div>
  );
};

const UserManagement: React.FC<UserManagementProps> = ({ viewType = 'all' }) => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [viewType]);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users/');
      let filtered = response.data;
      if (viewType === 'staff') {
        filtered = response.data.filter((u: any) => u.role !== 'USER');
      } else if (viewType === 'customers') {
        filtered = response.data.filter((u: any) => u.role === 'USER');
      }
      setUsers(filtered);
    } catch (error) {
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await api.delete(`/users/${id}`);
      toast.success('User deleted successfully');
      fetchUsers();
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  const handleEdit = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleViewProfile = (user: any) => {
    setSelectedUser(user);
    setIsProfileOpen(true);
  };

  const filteredUsers = users.filter(u => 
    u.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isProfileOpen && selectedUser) {
    return (
      <UserProfileContent 
        user={selectedUser} 
        onBack={() => setIsProfileOpen(false)} 
      />
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="bg-white p-6 rounded-[28px] border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-inner">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-800 tracking-tight">
              {viewType === 'staff' ? 'Staff Directory' : viewType === 'customers' ? 'Customer Database' : 'User Management'}
            </h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">
              Manage permissions and identities
            </p>
          </div>
        </div>
        <button 
          onClick={() => { setSelectedUser(null); setIsModalOpen(true); }}
          className="px-6 py-3 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 flex items-center gap-2"
        >
          <UserPlus size={16} /> Add New User
        </button>
      </div>

      <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 bg-slate-50/30">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-3 py-1 bg-slate-100 rounded-lg">
              Total {viewType}: {filteredUsers.length}
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">User Identity</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Role & Access</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Account Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Administrative Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-20 text-center">
                    <RefreshCw className="w-8 h-8 text-indigo-500 animate-spin mx-auto mb-4" />
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Securely loading database...</p>
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-20 text-center">
                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                       <Search className="w-8 h-8 text-slate-300" />
                    </div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No matching records found</p>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-xs shadow-inner">
                          {user.full_name?.split(' ').map((n: any) => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-800">{user.full_name}</p>
                          <p className="text-[10px] font-bold text-slate-400 lowercase">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        user.role === 'SUPER_ADMIN' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                        user.role === 'ADMIN' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                        user.role === 'AGENT' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                        'bg-slate-50 text-slate-600 border-slate-100'
                      }`}>
                        {user.role === 'USER' ? 'CUSTOMER' : user.role}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${user.is_active ? 'bg-emerald-500 shadow-lg shadow-emerald-200' : 'bg-slate-300'}`}></div>
                        <span className={`text-[10px] font-black uppercase tracking-widest ${user.is_active ? 'text-emerald-600' : 'text-slate-400'}`}>
                          {user.is_active ? 'Operational' : 'Disabled'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button 
                          onClick={() => handleViewProfile(user)}
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" 
                          title="View Profile"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          onClick={() => handleEdit(user)}
                          className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all" 
                          title="Edit Identity"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(user.id)}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all" 
                          title="Revoke Access"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Institutional Directory Records</p>
           <div className="flex items-center gap-2">
              <button className="p-2 text-slate-400 hover:bg-white rounded-lg transition-all disabled:opacity-40" disabled>
                <ChevronLeft size={16} />
              </button>
              <span className="text-[10px] font-black text-slate-800 px-3 py-1 bg-white rounded-md shadow-sm border border-slate-200">1</span>
              <button className="p-2 text-slate-400 hover:bg-white rounded-lg transition-all disabled:opacity-40" disabled>
                <ChevronRight size={16} />
              </button>
           </div>
        </div>
      </div>

      <UserModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={selectedUser}
        onSave={fetchUsers}
      />
    </div>
  );
};

export default UserManagement;
