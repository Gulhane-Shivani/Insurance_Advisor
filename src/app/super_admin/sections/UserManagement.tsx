import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserPlus, 
  Shield, 
  MoreHorizontal, 
  Search, 
  Filter, 
  Trash2, 
  Edit3,
  Lock,
  UserCheck,
  RefreshCw,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import api from '../../../services/api';
import toast from 'react-hot-toast';
import UserModal from '../components/UserModal';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All Users');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [limit] = useState(10);
  const [stats, setStats] = useState<any>({});

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      let activeFilter: boolean | undefined = undefined;

      if (activeTab === 'Active') activeFilter = true;
      if (activeTab === 'Inactive') activeFilter = false;

      const [usersRes, statsRes] = await Promise.all([
        api.get('/users/', {
          params: {
            skip: page * limit,
            limit: limit,
            is_active: activeFilter
          }
        }),
        api.get('/users/stats')
      ]);

      setUsers(usersRes.data);
      setStats(statsRes.data);
    } catch (error) {
      toast.error('Failed to fetch data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [activeTab, page]);

  const handleDelete = async (userId: number) => {
    if (!window.confirm('Are you sure you want to deactivate this user?')) return;
    try {
      await api.delete(`/users/${userId}`);
      toast.success('User deactivated');
      fetchUsers();
    } catch (error) {
      toast.error('Failed to deactivate user');
    }
  };

  const openEditModal = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const filteredUsers = users.filter(user => 
    user.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const roles = [
    { name: 'Super Admin', key: 'SUPER_ADMIN', icon: Shield, color: 'red' },
    { name: 'Admin', key: 'ADMIN', icon: Lock, color: 'indigo' },
    { name: 'Agent', key: 'AGENT', icon: Users, color: 'blue' },
    { name: 'CSR', key: 'CSR', icon: UserCheck, color: 'emerald' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <UserModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={fetchUsers} 
        user={selectedUser} 
      />

      {/* Action Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-6 rounded-[24px] border border-slate-200 shadow-sm">
         <div>
            <h2 className="text-xl font-black text-slate-900">Personnel Directory</h2>
            <p className="text-sm font-bold text-slate-400">Master Authority Hub • Manage access levels for platform personnel</p>
         </div>
         <button 
           onClick={openCreateModal}
           className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white rounded-2xl text-sm font-black hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2"
         >
            <UserPlus className="w-4 h-4" /> Add New Personnel
         </button>
      </div>

      {/* Role Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
         {roles.map((role, i) => (
           <div key={i} className="bg-white p-6 rounded-[24px] border border-slate-200 shadow-sm flex items-center gap-5 hover:border-indigo-200 transition-all group">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform ${
                role.color === 'red' ? 'bg-red-50 text-red-600' :
                role.color === 'indigo' ? 'bg-indigo-50 text-indigo-600' :
                role.color === 'blue' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'
              }`}>
                 <role.icon className="w-6 h-6" />
              </div>
              <div>
                 <h3 className="text-sm font-black text-slate-900">{role.name}</h3>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">{stats[role.key] || 0} Verified Personnel</p>
              </div>
           </div>
         ))}
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
         <div className="p-6 border-b border-slate-100 flex flex-col lg:flex-row justify-between items-center gap-4 bg-slate-50/30">
            <div className="flex bg-slate-100 p-1.5 rounded-2xl w-full lg:w-auto overflow-x-auto shadow-inner">
               {['All Users', 'Active', 'Inactive'].map(tab => (
                 <button 
                   key={tab}
                   onClick={() => { setActiveTab(tab); setPage(0); }}
                   className={`px-8 py-2.5 rounded-xl text-xs font-black transition-all whitespace-nowrap ${
                     activeTab === tab ? 'bg-white text-indigo-600 shadow-md shadow-indigo-100' : 'text-slate-500 hover:text-slate-900'
                   }`}
                 >
                    {tab}
                 </button>
               ))}
            </div>
            
            <div className="flex items-center gap-3 w-full lg:w-auto">
               <div className="flex-1 lg:w-80 bg-white border border-slate-200 rounded-2xl px-5 py-2.5 flex items-center gap-3 focus-within:ring-4 focus-within:ring-indigo-500/5 focus-within:border-indigo-500 transition-all shadow-sm">
                  <Search className="w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search personnel..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
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
                     <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Personnel Identity</th>
                     <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Access Level</th>
                     <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Current Status</th>
                     <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Master Control</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {isLoading ? (
                    <tr>
                      <td colSpan={4} className="px-8 py-20 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-10 h-10 border-4 border-slate-100 border-t-indigo-600 rounded-full animate-spin"></div>
                          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Accessing Directory...</p>
                        </div>
                      </td>
                    </tr>
                  ) : filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-8 py-20 text-center">
                        <p className="text-sm font-bold text-slate-400">No personnel records found.</p>
                      </td>
                    </tr>
                  ) : filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50/80 transition-colors group">
                       <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                             <div className="w-11 h-11 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-black shadow-inner border border-white">
                                {user.full_name?.substring(0, 2).toUpperCase()}
                             </div>
                             <div>
                                <p className="text-sm font-black text-slate-800">{user.full_name}</p>
                                <p className="text-[11px] text-slate-400 font-bold">{user.email}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-8 py-6">
                          <span className={`px-3 py-1 rounded-lg text-[10px] font-black tracking-widest uppercase ${
                            user.role === 'SUPER_ADMIN' ? 'bg-red-50 text-red-600 border border-red-100' :
                            user.role === 'ADMIN' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' :
                            user.role === 'AGENT' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-slate-50 text-slate-600 border border-slate-100'
                          }`}>
                            {user.role}
                          </span>
                       </td>
                       <td className="px-8 py-6">
                          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                            user.is_active ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-100 text-slate-500 border border-slate-200'
                          }`}>
                             <div className={`w-2 h-2 rounded-full shadow-sm ${user.is_active ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></div>
                             {user.is_active ? 'Authorized' : 'Restricted'}
                          </div>
                       </td>
                       <td className="px-8 py-6 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                             <button 
                               onClick={() => openEditModal(user)}
                               className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all border border-transparent hover:border-indigo-100"
                             >
                               <Edit3 className="w-4 h-4" />
                             </button>
                             <button 
                               onClick={() => handleDelete(user.id)}
                               className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-100"
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
               Page {page + 1} of Personnel Directory
            </p>
            <div className="flex items-center gap-2">
               <button 
                 disabled={page === 0}
                 onClick={() => setPage(p => Math.max(0, p - 1))}
                 className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-slate-900 transition-all disabled:opacity-40"
               >
                  <ChevronLeft className="w-4 h-4" />
               </button>
               <button 
                 disabled={users.length < limit}
                 onClick={() => setPage(p => p + 1)}
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

export default UserManagement;
