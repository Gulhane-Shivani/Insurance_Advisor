import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Trash2, 
  Eye, 
  Search, 
  Filter, 
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal
} from 'lucide-react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import PolicyDetailView from '../super_admin/sections/PolicyDetailView';

interface User {
  id: number;
  full_name: string;
  email: string;
  created_at: string;
  role: string;
  status?: 'Active' | 'Inactive';
}

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewingUserPolicy, setViewingUserPolicy] = useState<string | null>(null);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/admin/users');
      const fetchedUsers = response.data
        .filter((u: any) => u.role !== 'ADMIN' && u.role !== 'SUPER_ADMIN')
        .map((u: any) => ({
          ...u,
          created_at: new Date(u.created_at).toLocaleDateString(),
          status: 'Active',
        }));
      setUsers(fetchedUsers);
    } catch (error) {
      toast.error('Failed to fetch users');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await api.delete(`/admin/users/${id}`);
      setUsers(users.filter(u => u.id !== id));
      toast.success('User deleted successfully');
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  const filteredUsers = users.filter(user => 
    user.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const currentUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (viewingUserPolicy) {
    return <PolicyDetailView policyId={viewingUserPolicy} onBack={() => setViewingUserPolicy(null)} />;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Card */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-6 rounded-[24px] border border-slate-200 shadow-sm">
         <div>
            <h2 className="text-xl font-black text-slate-900">User Management</h2>
            <p className="text-sm font-bold text-slate-400">View and manage all registered customers on the platform</p>
         </div>
         <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shadow-inner">
            <Users className="w-6 h-6" />
         </div>
      </div>

      {/* Main Table Section */}
      <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
         <div className="p-6 border-b border-slate-100 flex flex-col lg:flex-row justify-between items-center gap-4 bg-slate-50/30">
            <div className="flex items-center gap-3 w-full lg:w-auto">
               <div className="flex-1 lg:w-80 bg-white border border-slate-200 rounded-2xl px-5 py-2.5 flex items-center gap-3 focus-within:ring-4 focus-within:ring-indigo-500/5 focus-within:border-indigo-500 transition-all shadow-sm">
                  <Search className="w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search customers..." 
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                    className="bg-transparent border-none outline-none text-sm font-bold w-full text-slate-700" 
                  />
               </div>
               <button 
                 onClick={fetchUsers}
                 className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-indigo-600 hover:border-indigo-200 transition-all shadow-sm"
               >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
               </button>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                     <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Customer Identity</th>
                     <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Email Address</th>
                     <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Registration Date</th>
                     <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                     <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {isLoading ? (
                    <tr>
                      <td colSpan={5} className="px-8 py-20 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-10 h-10 border-4 border-slate-100 border-t-indigo-600 rounded-full animate-spin"></div>
                          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Loading Records...</p>
                        </div>
                      </td>
                    </tr>
                  ) : currentUsers.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-8 py-20 text-center">
                        <p className="text-sm font-bold text-slate-400">No customers found.</p>
                      </td>
                    </tr>
                  ) : currentUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50/80 transition-colors group">
                       <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                             <div className="w-11 h-11 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-black shadow-inner border border-white">
                                {user.full_name?.substring(0, 2).toUpperCase()}
                             </div>
                             <div>
                                <p className="text-sm font-black text-slate-800">{user.full_name}</p>
                                <p className="text-[10px] text-slate-400 font-bold">ID: #{user.id}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-8 py-6">
                          <p className="text-sm font-bold text-slate-500">{user.email}</p>
                       </td>
                       <td className="px-8 py-6">
                          <p className="text-sm font-bold text-slate-500">{user.created_at}</p>
                       </td>
                       <td className="px-8 py-6">
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 border border-emerald-100">
                             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                             Authorized
                          </div>
                       </td>
                       <td className="px-8 py-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                             <button 
                               onClick={() => setViewingUserPolicy('IA-HLTH-992')}
                               className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all border border-transparent hover:border-indigo-100"
                               title="View Profile"
                             >
                               <Eye className="w-4 h-4" />
                             </button>
                             <button 
                               onClick={() => handleDelete(user.id)}
                               className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all border border-transparent hover:border-rose-100"
                               title="Delete User"
                             >
                               <Trash2 className="w-4 h-4" />
                             </button>
                             <button className="p-2.5 text-slate-400 hover:bg-slate-100 rounded-xl transition-all">
                               <MoreHorizontal className="w-4 h-4" />
                             </button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>

         {/* Pagination */}
         <div className="px-8 py-5 border-t border-slate-50 flex items-center justify-between bg-slate-50/30">
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
               Page {currentPage} of {totalPages || 1}
            </p>
            <div className="flex items-center gap-2">
               <button 
                 disabled={currentPage === 1}
                 onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                 className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-slate-900 transition-all disabled:opacity-40"
               >
                  <ChevronLeft className="w-4 h-4" />
               </button>
               <button 
                 disabled={currentPage === totalPages || totalPages === 0}
                 onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                 className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-slate-900 transition-all disabled:opacity-40"
               >
                  <ChevronRight className="w-4 h-4" />
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AdminUsers;
